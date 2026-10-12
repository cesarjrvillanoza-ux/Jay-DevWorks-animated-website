/**
 * Instant Webhook Push Dispatcher for Jay DevWorks
 * Dispatches real-time client inquiry notifications to:
 * - Discord Webhooks (rich embeds with signature neon-blue color theme #00D4FF)
 * - Slack Webhooks (formatted blocks)
 * - Telegram Bot API
 * - Generic Webhooks (standard JSON payload)
 */

function escapeMarkdown(text) {
  if (typeof text !== 'string') return '';
  return text.replace(/([_*[\]()~`>#+=|{}.!-])/g, '\\$1');
}

/**
 * Format payload for Discord Webhooks
 */
export function buildDiscordPayload(data) {
  const fields = [
    { name: '👤 Client Name', value: data.name || 'Anonymous', inline: true },
    { name: '✉️ Email', value: `[${data.email}](mailto:${data.email})`, inline: true },
    { name: '🛠️ Project Type', value: data.type || 'General inquiry', inline: true },
  ];

  if (data.company) {
    fields.push({ name: '🏢 Company / Brand', value: data.company, inline: true });
  }
  if (data.site) {
    fields.push({ name: '🌐 Existing Website', value: data.site, inline: true });
  }
  if (data.timeline) {
    fields.push({ name: '⏳ Desired Timeline', value: data.timeline, inline: true });
  }
  if (data.budget) {
    fields.push({ name: '💰 Estimated Budget', value: data.budget, inline: true });
  }

  const detailsText = data.details ? data.details.slice(0, 1024) : 'No additional details provided.';
  fields.push({ name: '📝 Message / Brief', value: detailsText, inline: false });

  return {
    username: 'Jay DevWorks Lead Bot',
    avatar_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=256&q=80',
    embeds: [
      {
        title: `⚡ New Project Inquiry: ${data.name}`,
        description: `Incoming client brief received via **Jay DevWorks** portfolio.`,
        color: 0x00d4ff, // Signature neon electric-blue (#00D4FF)
        fields,
        footer: {
          text: 'Jay DevWorks • Instant Lead Push Notification',
        },
        timestamp: new Date().toISOString(),
      },
    ],
  };
}

/**
 * Format payload for Slack Webhooks
 */
export function buildSlackPayload(data) {
  const fields = [
    { type: 'mrkdwn', text: `*Email:*\n<mailto:${data.email}|${data.email}>` },
    { type: 'mrkdwn', text: `*Project Type:*\n${data.type || 'General inquiry'}` },
  ];

  if (data.company) {
    fields.push({ type: 'mrkdwn', text: `*Company:*\n${data.company}` });
  }
  if (data.budget) {
    fields.push({ type: 'mrkdwn', text: `*Budget:*\n${data.budget}` });
  }
  if (data.timeline) {
    fields.push({ type: 'mrkdwn', text: `*Timeline:*\n${data.timeline}` });
  }

  const detailsQuoted = (data.details || 'No details provided')
    .split('\n')
    .map((line) => `>${line}`)
    .join('\n');

  return {
    text: `⚡ New Project Inquiry from *${data.name}* (${data.type})`,
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `⚡ New Inquiry from ${data.name}`,
          emoji: true,
        },
      },
      {
        type: 'section',
        fields,
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Brief / Message:*\n${detailsQuoted}`,
        },
      },
    ],
  };
}

/**
 * Format payload for Telegram Bot API
 */
export function buildTelegramPayload(data, chatId) {
  const text = [
    `⚡ *New Project Inquiry from ${escapeMarkdown(data.name)}*`,
    `✉️ *Email:* \`${data.email}\``,
    `🛠️ *Type:* ${escapeMarkdown(data.type || 'General inquiry')}`,
    data.company ? `🏢 *Company:* ${escapeMarkdown(data.company)}` : null,
    data.site ? `🌐 *Website:* ${escapeMarkdown(data.site)}` : null,
    data.budget ? `💰 *Budget:* ${escapeMarkdown(data.budget)}` : null,
    data.timeline ? `⏳ *Timeline:* ${escapeMarkdown(data.timeline)}` : null,
    '',
    `📝 *Details:*`,
    escapeMarkdown(data.details || 'No details provided.'),
  ]
    .filter(Boolean)
    .join('\n');

  return {
    chat_id: chatId,
    text,
    parse_mode: 'MarkdownV2',
    disable_web_page_preview: true,
  };
}

/**
 * Detect webhook provider from URL or environment
 */
export function getWebhookTarget() {
  const discordUrl = process.env.DISCORD_WEBHOOK_URL;
  const slackUrl = process.env.SLACK_WEBHOOK_URL;
  const genericUrl = process.env.WEBHOOK_URL;
  const tgToken = process.env.TELEGRAM_BOT_TOKEN;
  const tgChatId = process.env.TELEGRAM_CHAT_ID;

  if (discordUrl) return { type: 'discord', url: discordUrl };
  if (slackUrl) return { type: 'slack', url: slackUrl };
  if (tgToken && tgChatId) {
    return {
      type: 'telegram',
      url: `https://api.telegram.org/bot${tgToken}/sendMessage`,
      chatId: tgChatId,
    };
  }

  if (genericUrl) {
    if (genericUrl.includes('discord.com/api/webhooks')) {
      return { type: 'discord', url: genericUrl };
    }
    if (genericUrl.includes('hooks.slack.com')) {
      return { type: 'slack', url: genericUrl };
    }
    return { type: 'generic', url: genericUrl };
  }

  return null;
}

/**
 * Dispatch instant push notification to configured webhook
 */
export async function sendWebhook(data, opts = {}) {
  const target = opts.target || getWebhookTarget();
  const isDryRun = process.env.DRY_RUN === 'true' || !target;

  if (isDryRun || !target) {
    console.log('\n[Instant Webhook Simulation] -----------------------------------------');
    console.log('⚡ Destination: Instant Push Webhook (Discord / Slack / Telegram)');
    console.log(`👤 Client: ${data.name} <${data.email}>`);
    console.log(`🛠️ Project: ${data.type}`);
    if (data.budget) console.log(`💰 Budget: ${data.budget}`);
    if (data.timeline) console.log(`⏳ Timeline: ${data.timeline}`);
    console.log(`📝 Details: ${(data.details || '').slice(0, 120)}...`);
    console.log('💡 Tip: Set DISCORD_WEBHOOK_URL in environment for live alerts.');
    console.log('--------------------------------------------------------------------\n');
    return { ok: true, simulated: true, provider: 'simulation' };
  }

  let body;
  if (target.type === 'discord') {
    body = buildDiscordPayload(data);
  } else if (target.type === 'slack') {
    body = buildSlackPayload(data);
  } else if (target.type === 'telegram') {
    body = buildTelegramPayload(data, target.chatId);
  } else {
    // Generic JSON payload
    body = {
      event: 'inquiry.received',
      timestamp: new Date().toISOString(),
      recipient: process.env.INQUIRY_TO || 'rasecjrvillanoza@gmail.com',
      data,
    };
  }

  console.log(`[Instant Webhook] Dispatching real-time lead notification via ${target.type}...`);
  const res = await fetch(target.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`[Instant Webhook Error] ${target.type} responded with ${res.status}: ${errText}`);
    throw new Error(`Webhook dispatch failed (${res.status}): ${errText}`);
  }

  console.log(`[Instant Webhook] Successfully sent lead alert to ${target.type}!`);
  return { ok: true, provider: target.type };
}
