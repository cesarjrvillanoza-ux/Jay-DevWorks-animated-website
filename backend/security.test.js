import test from 'node:test';
import assert from 'node:assert/strict';
import { createGuard, linkCount } from './src/security.js';
import { validateInquiry } from './src/validate.js';
import { verifyTurnstile } from './src/captcha.js';

test('1. Token is too fast at first, ok after minimum fill time, then reused after consumption', () => {
  let currentTime = 1000000;
  const guard = createGuard({
    secret: 'test-secret-12345678901234567890',
    minFillMs: 3000,
    maxAgeMs: 7200000,
    now: () => currentTime,
  });

  const token = guard.issueToken();

  // Check immediately (0 ms elapsed): too-fast
  assert.equal(guard.checkToken(token), 'too-fast');

  // Advance time by 3500 ms (past 3000 ms minFillMs)
  currentTime += 3500;
  assert.equal(guard.checkToken(token), 'ok');

  // Consume the token
  guard.consumeToken(token);
  assert.equal(guard.checkToken(token), 'reused');
});

test('2. Tampered, malformed, missing and expired tokens are rejected', () => {
  let currentTime = 1000000;
  const guard = createGuard({
    secret: 'test-secret-12345678901234567890',
    minFillMs: 3000,
    maxAgeMs: 10000,
    now: () => currentTime,
  });

  // Missing
  assert.equal(guard.checkToken(null), 'missing');
  assert.equal(guard.checkToken(''), 'missing');
  assert.equal(guard.checkToken('a'.repeat(250)), 'missing');

  // Malformed
  assert.equal(guard.checkToken('badtoken'), 'malformed');
  assert.equal(guard.checkToken('123.abc'), 'malformed');

  // Tampered signature
  const validToken = guard.issueToken();
  const parts = validToken.split('.');
  const tamperedToken = `${parts[0]}.${parts[1]}.invalidsignature`;
  currentTime += 4000;
  assert.equal(guard.checkToken(tamperedToken), 'bad-signature');

  // Expired
  currentTime += 20000; // Past maxAgeMs (10s)
  assert.equal(guard.checkToken(validToken), 'expired');
});

test('3. A token signed with another secret is rejected', () => {
  let currentTime = 1000000;
  const guard1 = createGuard({
    secret: 'secret-alpha-123456789012345678',
    now: () => currentTime,
  });
  const guard2 = createGuard({
    secret: 'secret-bravo-123456789012345678',
    now: () => currentTime,
  });

  const tokenFrom1 = guard1.issueToken();
  currentTime += 5000;

  assert.equal(guard1.checkToken(tokenFrom1), 'ok');
  assert.equal(guard2.checkToken(tokenFrom1), 'bad-signature');
});

test('4. The daily cap blocks after limit and a released slot can be reused', () => {
  let currentTime = 1000000;
  const guard = createGuard({
    dailyCap: 2,
    now: () => currentTime,
  });

  assert.equal(guard.takeDailySlot(), true);
  assert.equal(guard.takeDailySlot(), true);
  assert.equal(guard.takeDailySlot(), false); // Capped

  guard.releaseDailySlot();
  assert.equal(guard.takeDailySlot(), true); // Re-acquired
  assert.equal(guard.takeDailySlot(), false); // Capped again
});

test('5. The daily window resets after 24 hours', () => {
  let currentTime = 1000000;
  const guard = createGuard({
    dailyCap: 1,
    now: () => currentTime,
  });

  assert.equal(guard.takeDailySlot(), true);
  assert.equal(guard.takeDailySlot(), false);

  // Advance time by 24h + 1s
  currentTime += 24 * 60 * 60 * 1000 + 1000;
  assert.equal(guard.takeDailySlot(), true);
});

test('6. Per-email limit (case-insensitive), duplicate suppression and confirmation throttling', () => {
  let currentTime = 1000000;
  const guard = createGuard({
    perEmailMax: 2,
    now: () => currentTime,
  });

  // Per-email limit
  assert.equal(guard.allowEmail('Client@Example.com'), true);
  assert.equal(guard.allowEmail('client@example.com'), true);
  assert.equal(guard.allowEmail('CLIENT@EXAMPLE.COM'), false);

  // Duplicate check
  assert.equal(guard.isDuplicate('client@example.com', 'Hello project brief'), false);
  assert.equal(guard.isDuplicate('CLIENT@example.com', 'Hello project brief'), true);

  // Confirmation throttling
  assert.equal(guard.shouldConfirm('client@example.com'), true);
  assert.equal(guard.shouldConfirm('CLIENT@example.com'), false);
  // Advance 24 hours
  currentTime += 24 * 60 * 60 * 1000 + 100;
  assert.equal(guard.shouldConfirm('client@example.com'), true);
});

test('7. Link counting; more than 2 links or filled trap field counts as spam; one reference link does not', () => {
  assert.equal(linkCount('Check out my site at https://example.com'), 1);
  assert.equal(
    linkCount('See https://a.com and http://b.org and www.c.net for references'),
    3
  );

  // Valid inquiry with 1 link
  const valid = validateInquiry({
    name: 'Sarah Connor',
    email: 'sarah@skynet.com',
    type: 'Business website',
    details: 'Looking for a redesign, see our current site https://skynet.com',
    website: '',
  });
  assert.equal(valid.valid, true);
  assert.equal(valid.spam, false);

  // Spam due to > 2 links
  const linkSpam = validateInquiry({
    name: 'Spam Bot',
    email: 'bot@spam.com',
    type: 'Business website',
    details: 'Buy now: https://a.com http://b.com and http://c.com immediately',
    website: '',
  });
  assert.equal(linkSpam.spam, true);

  // Spam due to honeypot
  const honeypot = validateInquiry({
    name: 'Bot Runner',
    email: 'bot@runner.com',
    type: 'Business website',
    details: 'Genuine looking text with no links here.',
    website: 'http://trap.com',
  });
  assert.equal(honeypot.spam, true);
});

test('8. Turnstile trusts only an explicit success, and fails closed on network error, missing token or missing secret', async () => {
  // Missing secret or token
  assert.equal(await verifyTurnstile(null, 'valid_tok'), false);
  assert.equal(await verifyTurnstile('sec', null), false);
  assert.equal(await verifyTurnstile('sec', 'x'.repeat(2500)), false);

  // Network error (fetch rejects)
  const failingFetch = async () => {
    throw new Error('Network failure');
  };
  assert.equal(await verifyTurnstile('secret', 'tok', '127.0.0.1', failingFetch), false);

  // Non-success response
  const unsuccessfulFetch = async () => ({
    ok: true,
    json: async () => ({ success: false, 'error-codes': ['invalid-input-response'] }),
  });
  assert.equal(await verifyTurnstile('secret', 'tok', '127.0.0.1', unsuccessfulFetch), false);

  // Success response
  const successfulFetch = async () => ({
    ok: true,
    json: async () => ({ success: true }),
  });
  assert.equal(await verifyTurnstile('secret', 'tok', '127.0.0.1', successfulFetch), true);
});
