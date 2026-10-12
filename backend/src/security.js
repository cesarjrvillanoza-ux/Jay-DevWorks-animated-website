import crypto from 'node:crypto';

export function linkCount(text) {
  if (!text || typeof text !== 'string') return 0;
  const matches = text.match(/(https?:\/\/|www\.)\S+/gi);
  return matches ? matches.length : 0;
}

export function createGuard(options = {}) {
  const secret = options.secret || crypto.randomBytes(32).toString('hex');
  const minFillMs = options.minFillMs ?? 3000;
  const maxAgeMs = options.maxAgeMs ?? 2 * 60 * 60 * 1000; // 2 hours
  const dailyCap = options.dailyCap ?? 50;
  const perEmailMax = options.perEmailMax ?? 3;
  const now = options.now || (() => Date.now());

  // Nonce storage: Map of nonce -> expiresAt
  const consumedNonces = new Map();

  // Daily sliding window: timestamps of accepted inquiries
  let dailyWindowStart = now();
  let dailyCount = 0;

  // Per-email tracking: lowercase email -> array of timestamps within last 1 hour
  const emailInquiries = new Map();

  // Duplicate tracking: hash -> expiresAt (10 minutes)
  const duplicates = new Map();

  // Confirmation email tracking: lowercase email -> nextAllowedTimestamp
  const confirmations = new Map();

  function sweep() {
    const currentTime = now();
    for (const [nonce, expiresAt] of consumedNonces.entries()) {
      if (currentTime > expiresAt) {
        consumedNonces.delete(nonce);
      }
    }
    for (const [hash, expiresAt] of duplicates.entries()) {
      if (currentTime > expiresAt) {
        duplicates.delete(hash);
      }
    }
    for (const [em, times] of emailInquiries.entries()) {
      const fresh = times.filter((t) => currentTime - t < 60 * 60 * 1000);
      if (fresh.length === 0) {
        emailInquiries.delete(em);
      } else {
        emailInquiries.set(em, fresh);
      }
    }
  }

  function sign(payload) {
    return crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('base64url');
  }

  function issueToken() {
    const timestamp = now().toString();
    const nonce = crypto.randomBytes(8).toString('hex'); // 16 hex characters
    const signature = sign(`${timestamp}.${nonce}`);
    return `${timestamp}.${nonce}.${signature}`;
  }

  function checkToken(token) {
    sweep();
    if (!token || typeof token !== 'string' || token.length > 200) {
      return 'missing';
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      return 'malformed';
    }

    const [timestampStr, nonce, signature] = parts;
    const timestamp = parseInt(timestampStr, 10);
    if (isNaN(timestamp) || !nonce || !signature) {
      return 'malformed';
    }

    const expectedSig = sign(`${timestampStr}.${nonce}`);
    const sigBuf = Buffer.from(signature);
    const expectedBuf = Buffer.from(expectedSig);

    if (sigBuf.length !== expectedBuf.length) {
      return 'bad-signature';
    }
    if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) {
      return 'bad-signature';
    }

    const currentTime = now();
    const age = currentTime - timestamp;

    if (age < minFillMs) {
      return 'too-fast';
    }
    if (age > maxAgeMs) {
      return 'expired';
    }
    if (consumedNonces.has(nonce)) {
      return 'reused';
    }

    return 'ok';
  }

  function consumeToken(token) {
    if (!token || typeof token !== 'string') return;
    const parts = token.split('.');
    if (parts.length === 3) {
      const nonce = parts[1];
      consumedNonces.set(nonce, now() + maxAgeMs);
    }
  }

  function takeDailySlot() {
    const currentTime = now();
    if (currentTime - dailyWindowStart >= 24 * 60 * 60 * 1000) {
      dailyWindowStart = currentTime;
      dailyCount = 0;
    }
    if (dailyCount >= dailyCap) {
      return false;
    }
    dailyCount += 1;
    return true;
  }

  function releaseDailySlot() {
    if (dailyCount > 0) {
      dailyCount -= 1;
    }
  }

  function allowEmail(email) {
    if (!email || typeof email !== 'string') return false;
    const em = email.toLowerCase().trim();
    const currentTime = now();
    sweep();

    const history = emailInquiries.get(em) || [];
    const recent = history.filter((t) => currentTime - t < 60 * 60 * 1000);

    if (recent.length >= perEmailMax) {
      return false;
    }

    recent.push(currentTime);
    emailInquiries.set(em, recent);
    return true;
  }

  function isDuplicate(email, details) {
    if (!email || !details) return false;
    sweep();
    const em = email.toLowerCase().trim();
    const det = String(details).trim();
    const hash = crypto.createHash('sha256').update(`${em}|${det}`).digest('hex');

    if (duplicates.has(hash)) {
      return true;
    }

    duplicates.set(hash, now() + 10 * 60 * 1000); // 10 minutes
    return false;
  }

  function shouldConfirm(email) {
    if (!email || typeof email !== 'string') return false;
    const em = email.toLowerCase().trim();
    const currentTime = now();
    const nextAllowed = confirmations.get(em) || 0;

    if (currentTime >= nextAllowed) {
      confirmations.set(em, currentTime + 24 * 60 * 60 * 1000);
      return true;
    }
    return false;
  }

  return {
    issueToken,
    checkToken,
    consumeToken,
    takeDailySlot,
    releaseDailySlot,
    allowEmail,
    isDuplicate,
    shouldConfirm,
    getDailyCount: () => dailyCount,
  };
}
