import { sendWebhook } from './webhook.js';

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function sendInquiry(data, opts = {}) {
  const apiKey = process.env.RESEND_API_KEY;
  const inquiryTo = opts.inquiryTo || opts.recipient || 'rasecjrvillanoza@gmail.com';
  const inquiryFrom = process.env.INQUIRY_FROM || 'Jay DevWorks <onboarding@resend.dev>';
  const sendConfirmation = process.env.SEND_CONFIRMATION === 'true';
  const isDryRun = process.env.DRY_RUN === 'true' || !apiKey;

  // 1. Dispatch Instant Push Notification via Webhook (Discord / Slack / Telegram)
  let webhookResult = null;
  try {
    webhookResult = await sendWebhook(data, opts);
  } catch (webhookErr) {
    console.warn('[Webhook Push Warning]:', webhookErr.message);
  }

  const htmlBody = `
    <h2>New Project Inquiry from ${escapeHtml(data.name)}</h2>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    ${data.company ? `<p><strong>Company / Project:</strong> ${escapeHtml(data.company)}</p>` : ''}
    ${data.site ? `<p><strong>Current Website:</strong> ${escapeHtml(data.site)}</p>` : ''}
    <p><strong>Project Type:</strong> ${escapeHtml(data.type)}</p>
    ${data.timeline ? `<p><strong>Timeline:</strong> ${escapeHtml(data.timeline)}</p>` : ''}
    ${data.budget ? `<p><strong>Budget:</strong> ${escapeHtml(data.budget)}</p>` : ''}
    <div style="margin-top: 1rem; padding: 1rem; background: #f4f6fa; border-radius: 6px;">
      <strong>Details / Message:</strong>
      <p style="white-space: pre-wrap;">${escapeHtml(data.details)}</p>
    </div>
  `;

  // 2. Dispatch Email via Resend if configured
  let emailResult = null;
  if (!isDryRun && apiKey) {
    try {
      console.log(`[Inquiry Send] Dispatching email to "${inquiryTo}"...`);
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: inquiryFrom,
          to: [inquiryTo],
          reply_to: data.email,
          subject: `Project Inquiry: ${data.name} (${data.type})`,
          html: htmlBody,
        }),
      });

      if (res.ok) {
        emailResult = await res.json();
        console.log(`[Inquiry Send] Email delivered to "${inquiryTo}"!`);
      } else {
        const errorData = await res.json().catch(() => ({ message: res.statusText }));
        console.warn('[Resend API Note]:', errorData.message || res.status);
      }
    } catch (err) {
      console.warn('[Inquiry Send Error]:', err.message);
    }
  } else {
    console.log('[Inquiry Simulation] Email recipient:', inquiryTo);
    emailResult = { id: 'simulated_' + Date.now() };
  }

  // Send confirmation if requested and allowed
  if (sendConfirmation && opts.confirm !== false && !isDryRun) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: inquiryFrom,
          to: [data.email],
          subject: 'Thank you for contacting Jay DevWorks',
          html: `<p>Hi ${escapeHtml(data.name)},</p><p>Thank you for reaching out! I have received your brief regarding "${escapeHtml(data.type)}". I will review the details and get back to you within 1 to 2 business days.</p><p>Best regards,<br>Jay DevWorks</p>`,
        }),
      });
    } catch (confErr) {
      console.warn('Confirmation email failed:', confErr.message);
    }
  }

  return {
    ok: true,
    id: emailResult?.id || 'lead_' + Date.now(),
    recipient: inquiryTo,
    provider: apiKey ? 'resend' : 'simulated_resend',
    webhook: webhookResult,
  };
}
