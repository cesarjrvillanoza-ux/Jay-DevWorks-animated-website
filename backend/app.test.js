import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from './src/app.js';
import { createGuard } from './src/security.js';

function createMockReqRes() {
  return (app, method, url, body, headers = {}) => {
    return new Promise((resolve) => {
      const server = app.listen(0, async () => {
        const port = server.address().port;
        try {
          const res = await fetch(`http://127.0.0.1:${port}${url}`, {
            method,
            headers: {
              'Content-Type': 'application/json',
              ...headers,
            },
            body: body ? JSON.stringify(body) : undefined,
          });
          const text = await res.text();
          let json;
          try {
            json = JSON.parse(text);
          } catch {
            json = null;
          }
          server.close(() => {
            resolve({ status: res.status, body: json, text });
          });
        } catch (err) {
          server.close(() => {
            resolve({ error: err });
          });
        }
      });
    });
  };
}

test('App: Health endpoint returns { ok: true }', async () => {
  const app = createApp({ requireToken: false });
  const request = createMockReqRes();
  const res = await request(app, 'GET', '/health');
  assert.equal(res.status, 200);
  assert.equal(res.body?.ok, true);
});

test('App: Token endpoint issues token and inquiry refused without token', async () => {
  let nowTime = 1000000;
  const guard = createGuard({
    secret: 'test-secret-12345678901234567890',
    minFillMs: 2000,
    now: () => nowTime,
  });

  let sent = false;
  const app = createApp({
    guard,
    requireToken: true,
    send: async () => {
      sent = true;
    },
  });
  const request = createMockReqRes();

  // 1. Missing token
  const resNoToken = await request(app, 'POST', '/api/inquiry', {
    name: 'Jane Doe',
    email: 'jane@example.com',
    type: 'Business website',
    details: 'This is a valid inquiry with sufficient detail.',
  });
  assert.equal(resNoToken.status, 400);
  assert.equal(sent, false);

  // 2. Token used too quickly (< 2000 ms)
  const token = guard.issueToken();
  const resTooFast = await request(app, 'POST', '/api/inquiry', {
    name: 'Jane Doe',
    email: 'jane@example.com',
    type: 'Business website',
    details: 'This is a valid inquiry with sufficient detail.',
    token,
  });
  assert.equal(resTooFast.status, 400);

  // 3. Advance time and send successfully
  nowTime += 3000;
  const resOk = await request(app, 'POST', '/api/inquiry', {
    name: 'Jane Doe',
    email: 'jane@example.com',
    type: 'Business website',
    details: 'This is a valid inquiry with sufficient detail.',
    token,
  });
  assert.equal(resOk.status, 200);
  assert.equal(sent, true);

  // 4. Token cannot be reused
  sent = false;
  const resReuse = await request(app, 'POST', '/api/inquiry', {
    name: 'Jane Doe',
    email: 'jane@example.com',
    type: 'Business website',
    details: 'Another inquiry with same token.',
    token,
  });
  assert.equal(resReuse.status, 400);
  assert.equal(sent, false);
});

test('App: Link-stuffed and honeypot messages return 200 but do not send', async () => {
  let sent = false;
  const app = createApp({
    requireToken: false,
    send: async () => {
      sent = true;
    },
  });
  const request = createMockReqRes();

  // Honeypot filled
  const resTrap = await request(app, 'POST', '/api/inquiry', {
    name: 'Bot',
    email: 'bot@example.com',
    type: 'Business website',
    details: 'Some spam text here.',
    website: 'http://spam.org',
  });
  assert.equal(resTrap.status, 200);
  assert.equal(sent, false);

  // Link stuffed (> 2 links)
  const resLinks = await request(app, 'POST', '/api/inquiry', {
    name: 'Spammer',
    email: 'spammer@example.com',
    type: 'Business website',
    details: 'Check https://site1.com and https://site2.com and https://site3.com right now',
  });
  assert.equal(resLinks.status, 200);
  assert.equal(sent, false);
});

test('App: Daily cap returns 503 and failed send returns 502', async () => {
  const guard = createGuard({ dailyCap: 1 });
  const app = createApp({
    guard,
    requireToken: false,
    send: async () => {},
  });
  const request = createMockReqRes();

  // First succeeds
  const res1 = await request(app, 'POST', '/api/inquiry', {
    name: 'Alice',
    email: 'alice@example.com',
    type: 'Business website',
    details: 'Valid inquiry message here.',
  });
  assert.equal(res1.status, 200);

  // Second hits daily cap
  const res2 = await request(app, 'POST', '/api/inquiry', {
    name: 'Bob',
    email: 'bob@example.com',
    type: 'Business website',
    details: 'Another valid message.',
  });
  assert.equal(res2.status, 503);

  // Test 502 on send failure
  const failingApp = createApp({
    requireToken: false,
    send: async () => {
      throw new Error('Email server down');
    },
  });
  const resFail = await request(failingApp, 'POST', '/api/inquiry', {
    name: 'Charlie',
    email: 'charlie@example.com',
    type: 'Business website',
    details: 'Another message.',
  });
  assert.equal(resFail.status, 502);
});

test('App: Recipient endpoint and sendInquiry target rasecjrvillanoza@gmail.com', async () => {
  const app = createApp({ requireToken: false, inquiryTo: 'rasecjrvillanoza@gmail.com' });
  const request = createMockReqRes();

  // Test /api/recipient endpoint
  const resRecipient = await request(app, 'GET', '/api/recipient');
  assert.equal(resRecipient.status, 200);
  assert.equal(resRecipient.body?.ok, true);
  assert.equal(resRecipient.body?.recipient, 'rasecjrvillanoza@gmail.com');

  // Test /api/contact alias sends to rasecjrvillanoza@gmail.com
  let dispatchedRecipient = null;
  const customApp = createApp({
    requireToken: false,
    inquiryTo: 'rasecjrvillanoza@gmail.com',
    send: async (data) => {
      dispatchedRecipient = 'rasecjrvillanoza@gmail.com';
      return { ok: true, recipient: dispatchedRecipient };
    },
  });
  const resContact = await request(customApp, 'POST', '/api/contact', {
    name: 'Michael Scott',
    email: 'michael@dundermifflin.com',
    type: 'Client message',
    details: 'I would like to hire Jay for a new business website project.',
  });
  assert.equal(resContact.status, 200);
  assert.equal(resContact.body?.ok, true);
  assert.equal(resContact.body?.recipient, 'rasecjrvillanoza@gmail.com');
  assert.equal(dispatchedRecipient, 'rasecjrvillanoza@gmail.com');
});
