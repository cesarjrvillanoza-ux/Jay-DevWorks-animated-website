import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createGuard } from './security.js';
import { validateInquiry } from './validate.js';
import { sendInquiry } from './email.js';
import { verifyTurnstile } from './captcha.js';

export function createApp(opts = {}) {
  const app = express();

  const guard =
    opts.guard ||
    createGuard({
      secret: process.env.TOKEN_SECRET,
      minFillMs: process.env.MIN_FILL_MS ? parseInt(process.env.MIN_FILL_MS, 10) : 3000,
      dailyCap: process.env.DAILY_CAP ? parseInt(process.env.DAILY_CAP, 10) : 50,
      perEmailMax: process.env.PER_EMAIL_MAX ? parseInt(process.env.PER_EMAIL_MAX, 10) : 3,
    });

  const send = opts.send || sendInquiry;
  const inquiryRecipient = opts.inquiryTo || process.env.INQUIRY_TO || 'rasecjrvillanoza@gmail.com';
  const requireToken =
    opts.requireToken !== undefined
      ? opts.requireToken
      : process.env.REQUIRE_TOKEN !== 'false';
  const captchaVerifier = opts.verifyCaptcha || null;
  const turnstileSecret = process.env.TURNSTILE_SECRET;

  app.set('trust proxy', 1);

  // Helmet with security protections
  app.use(
    helmet({
      contentSecurityPolicy: false, // Managed per-route or headers file
    })
  );

  // Cache-Control: no-store on all responses
  app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
  });

  // CORS configuration
  const allowedOriginsStr = process.env.ALLOWED_ORIGINS || '';
  const allowedOrigins = allowedOriginsStr
    .split(',')
    .map((o) => o.trim().replace(/\/$/, ''))
    .filter(Boolean);

  app.use(
    cors({
      origin: (origin, callback) => {
        // If no origin (e.g. server-to-server or same-origin direct), or if origin list is empty, allow
        if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('CORS not allowed'));
        }
      },
      methods: ['GET', 'POST', 'OPTIONS'],
      maxAge: 86400,
    })
  );

  // Body parser with 20kb limit
  app.use(express.json({ limit: '20kb' }));

  // In-memory rate limit stores
  const ipTokenRequests = new Map(); // ip -> [timestamps]
  const ipInquiryRequests = new Map(); // ip -> [timestamps]

  function isIpRateLimited(map, ip, maxRequests, windowMs) {
    const now = Date.now();
    const timestamps = (map.get(ip) || []).filter((t) => now - t < windowMs);
    if (timestamps.length >= maxRequests) {
      return true;
    }
    timestamps.push(now);
    map.set(ip, timestamps);
    return false;
  }

  // GET /health
  app.get('/health', (req, res) => {
    res.json({ ok: true });
  });

  // GET /api/info & /api/recipient
  app.get(['/api/info', '/api/recipient'], (req, res) => {
    const hasResend = Boolean(process.env.RESEND_API_KEY);
    const hasWebhook = Boolean(
      process.env.DISCORD_WEBHOOK_URL ||
      process.env.SLACK_WEBHOOK_URL ||
      process.env.WEBHOOK_URL ||
      (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID)
    );
    res.json({
      ok: true,
      service: 'Jay DevWorks Inquiry & Messaging Service',
      provider: 'Resend',
      recipient: inquiryRecipient,
      resendStatus: hasResend ? 'active' : 'ready',
      instantWebhookPush: hasWebhook ? 'active' : 'simulated',
      status: 'operational',
    });
  });

  // GET /api/token
  app.get('/api/token', (req, res) => {
    const ip = req.ip || '127.0.0.1';
    // Rate limit: 30 per minute per IP
    if (isIpRateLimited(ipTokenRequests, ip, 30, 60 * 1000)) {
      return res.status(429).json({ ok: false, error: 'Too many requests. Please wait.' });
    }

    const token = guard.issueToken();
    res.json({ ok: true, token });
  });

  // POST /api/inquiry, /api/contact, /api/message
  app.post(['/api/inquiry', '/api/contact', '/api/message'], async (req, res) => {
    const ip = req.ip || '127.0.0.1';

    // 1. IP rate limit: 5 per hour
    if (isIpRateLimited(ipInquiryRequests, ip, 5, 60 * 60 * 1000)) {
      return res.status(429).json({
        ok: false,
        error: 'Too many inquiries. Please try again later.',
      });
    }

    // 2. Validate
    const valResult = validateInquiry(req.body);
    if (valResult.spam) {
      console.log('Inquiry dropped: spam trap');
      return res.status(200).json({ ok: true });
    }

    // 3. Field errors
    if (!valResult.valid) {
      return res.status(400).json({ ok: false, errors: valResult.errors });
    }

    const data = valResult.data;

    // 4. Token validation
    if (requireToken) {
      const token = req.body?.token;
      const tokenStatus = guard.checkToken(token);
      if (tokenStatus !== 'ok') {
        console.log(`Inquiry token rejected: ${tokenStatus}`);
        return res.status(400).json({
          ok: false,
          error: 'Please reload the page and try again.',
        });
      }
    }

    // 5. CAPTCHA verification
    if (captchaVerifier || turnstileSecret) {
      const captchaToken = req.body?.captcha;
      const verifyFn = captchaVerifier || ((secret, tok, clientIp) => verifyTurnstile(secret, tok, clientIp));
      const passed = await verifyFn(turnstileSecret, captchaToken, ip);
      if (!passed) {
        return res.status(400).json({
          ok: false,
          error: 'Please complete the human check and try again.',
        });
      }
    }

    // 6. Duplicate check
    if (guard.isDuplicate(data.email, data.details)) {
      return res.status(200).json({ ok: true });
    }

    // 7. Per-email limit
    if (!guard.allowEmail(data.email)) {
      return res.status(429).json({
        ok: false,
        error: 'Too many inquiries from this email. Please try again later.',
      });
    }

    // 8. Daily cap
    if (!guard.takeDailySlot()) {
      return res.status(503).json({
        ok: false,
        error: 'The inbox is busy right now. Please email directly instead.',
      });
    }

    // 9. Consume token and send
    if (requireToken && req.body?.token) {
      guard.consumeToken(req.body.token);
    }

    try {
      const result = await send(data, {
        confirm: guard.shouldConfirm(data.email),
        inquiryTo: inquiryRecipient,
      });
      const recipient = result?.recipient || inquiryRecipient;
      return res.status(200).json({
        ok: true,
        recipient,
        provider: result?.provider || 'resend',
        webhook: result?.webhook,
      });
    } catch (err) {
      guard.releaseDailySlot();
      console.error('Inquiry send failure:', err.message);
      return res.status(502).json({
        ok: false,
        error: 'Could not send your message right now.',
      });
    }
  });

  // Final error handling middleware
  app.use((err, req, res, next) => {
    if (err && (err.type === 'entity.too.large' || err.status === 413)) {
      return res.status(413).json({ ok: false, error: 'Message too large.' });
    }
    res.status(400).json({ ok: false, error: 'Bad request.' });
  });

  return app;
}
