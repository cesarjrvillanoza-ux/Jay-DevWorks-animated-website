# Jay DevWorks - Inquiry Backend

Node.js + Express backend for receiving project inquiries, protected against spam, abuse, and automated scrapers.

## Features & Protections

- **Signed HMAC Tokens**: Timed nonce signature prevents bot-submits, replay attacks, and sub-second automated posting (`MIN_FILL_MS = 3000`).
- **Instant Webhook Push Alerts**: Zero-data-at-rest real-time dispatch to Discord (`#00D4FF` neon-blue embed), Slack, or Telegram with zero email deliverability issues.
- **IP Rate Limiting**: Max 5 inquiry submissions per hour and 30 token requests per minute per IP.
- **Honeypot Trap & Link Spam Filter**: Hidden form trap field and drop rule for messages with > 2 external links.
- **Email Throttling**: Max 3 inquiries per email per hour, and duplicate hash suppression for 10 minutes.
- **Daily Inbox Quota**: Sliding 24-hour cap (`DAILY_CAP = 50`) prevents inbox spam flooding.
- **Optional Turnstile CAPTCHA**: Native Cloudflare Turnstile token validation.
- **Hardened Security Headers**: Helmet with CSP and strict anti-clickjacking guards.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment template:
   ```bash
   cp .env.example .env
   ```

3. Set your variables in `.env`:
   - `TOKEN_SECRET`: Random 32-byte hex string (generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
   - `RESEND_API_KEY`: Your Resend API key
   - `INQUIRY_TO`: Recipient email (default: `rasecjrvillanoza@gmail.com`)
   - `ALLOWED_ORIGINS`: Comma-separated list of allowed origins (e.g. `http://localhost:3000,https://jaydevworks.dev`)

4. Run tests:
   ```bash
   npm test
   ```

5. Run server:
   ```bash
   npm start
   ```

## Deployment Checklist

1. Rotate email API key if ever exposed in public repos or screenshots.
2. Confirm `backend/.env` is never committed to Git.
3. Supply all variables through the hosting platform environment settings (Render, Railway, Cloud Run).
4. Set `ALLOWED_ORIGINS` to the exact live site URL without trailing slash.
5. Set `formEndpoint` on the client to `<DEPLOYED_BACKEND_URL>/api/inquiry`.
6. Update `connect-src` in `site/_headers` and `site/vercel.json`.
7. Keep `SEND_CONFIRMATION=false` until custom domain DNS (SPF, DKIM, DMARC) is verified in Resend.
8. Run `npm test` and `npm audit`.

## Known Limits

- Token state, rate-limits, and daily counters reside in memory; they reset upon server restart or multi-instance clustering without Redis.
- Without Turnstile CAPTCHA enabled, distributed botnets across rotating IP addresses can submit inquiries up to the daily cap.
