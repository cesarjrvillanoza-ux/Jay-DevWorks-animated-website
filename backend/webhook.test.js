import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import {
  buildDiscordPayload,
  buildSlackPayload,
  buildTelegramPayload,
  getWebhookTarget,
  sendWebhook,
} from './src/webhook.js';

test('Webhook: buildDiscordPayload formats rich embed with neon-blue color (#00D4FF)', () => {
  const data = {
    name: 'Sarah Connor',
    email: 'sarah@skynet-defense.com',
    type: 'Web app',
    company: 'Resistance Ops',
    site: 'https://resistance.org',
    timeline: '3 months',
    budget: '$15,000 - $25,000',
    details: 'Need a resilient command and control dashboard with live telemetry.',
  };

  const payload = buildDiscordPayload(data);
  assert.equal(payload.username, 'Jay DevWorks Lead Bot');
  assert.ok(payload.embeds && payload.embeds.length === 1);

  const embed = payload.embeds[0];
  assert.equal(embed.color, 0x00d4ff); // Signature neon-blue
  assert.ok(embed.title.includes('Sarah Connor'));

  const fieldNames = embed.fields.map((f) => f.name);
  assert.ok(fieldNames.some((n) => n.includes('Client Name')));
  assert.ok(fieldNames.some((n) => n.includes('Email')));
  assert.ok(fieldNames.some((n) => n.includes('Project Type')));
  assert.ok(fieldNames.some((n) => n.includes('Company')));
  assert.ok(fieldNames.some((n) => n.includes('Website')));
  assert.ok(fieldNames.some((n) => n.includes('Timeline')));
  assert.ok(fieldNames.some((n) => n.includes('Budget')));
  assert.ok(fieldNames.some((n) => n.includes('Message')));
});

test('Webhook: buildSlackPayload formats blocks and mrkdwn', () => {
  const data = {
    name: 'Alex Rivera',
    email: 'alex@designlab.io',
    type: 'Business website',
    budget: '$5,000 - $10,000',
    details: 'Looking for a brand website redesign with animations.',
  };

  const payload = buildSlackPayload(data);
  assert.ok(payload.blocks && payload.blocks.length >= 3);
  assert.ok(payload.text.includes('Alex Rivera'));
});

test('Webhook: buildTelegramPayload formats markdown and target chatId', () => {
  const data = {
    name: 'Ken Adams',
    email: 'ken@example.com',
    type: 'Online store',
    details: 'Shopify / custom headless store inquiry.',
  };

  const payload = buildTelegramPayload(data, '123456789');
  assert.equal(payload.chat_id, '123456789');
  assert.equal(payload.parse_mode, 'MarkdownV2');
  assert.ok(payload.text.includes('Ken Adams'));
});

test('Webhook: sendWebhook handles dry-run simulation cleanly', async () => {
  const data = {
    name: 'Test Client',
    email: 'test@example.com',
    type: 'General inquiry',
    details: 'Checking simulation mode.',
  };

  // With no target specified and DRY_RUN, it returns ok simulation
  const result = await sendWebhook(data, { target: null });
  assert.equal(result.ok, true);
  assert.equal(result.simulated, true);
});

test('Webhook: sendWebhook dispatches HTTP POST payload to configured endpoint', async () => {
  let receivedBody = null;
  let receivedHeader = null;

  const mockServer = http.createServer((req, res) => {
    receivedHeader = req.headers['content-type'];
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
    });
    req.on('end', () => {
      try {
        receivedBody = JSON.parse(raw);
      } catch {
        receivedBody = raw;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
    });
  });

  await new Promise((resolve) => mockServer.listen(0, resolve));
  const port = mockServer.address().port;
  const mockUrl = `http://127.0.0.1:${port}/webhook-test`;

  try {
    const data = {
      name: 'Elena Rostova',
      email: 'elena@cyber.io',
      type: 'Web app',
      budget: '$20,000',
      details: 'Full stack AI dashboard.',
    };

    const res = await sendWebhook(data, {
      target: { type: 'discord', url: mockUrl },
    });

    assert.equal(res.ok, true);
    assert.equal(res.provider, 'discord');
    assert.equal(receivedHeader, 'application/json');
    assert.ok(receivedBody.embeds);
    assert.equal(receivedBody.embeds[0].color, 0x00d4ff);
    assert.ok(receivedBody.embeds[0].title.includes('Elena Rostova'));
  } finally {
    await new Promise((resolve) => mockServer.close(resolve));
  }
});
