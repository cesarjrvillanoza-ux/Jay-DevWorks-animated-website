import { linkCount } from './security.js';

const ALLOWED_TYPES = [
  'Business website',
  'Web app',
  'Online store',
  'Fix or upgrade an existing site',
  'Not sure yet',
  'General inquiry',
  'Client message',
  'Contact inquiry',
  'Message',
  'Other',
];

// Strip ASCII control characters except newline (\n = \x0A) and tab (\t = \x09)
function sanitizeText(value, maxLength, singleLine = false) {
  if (typeof value !== 'string') return '';
  // Strip control chars except \n and \t
  let cleaned = value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  if (singleLine) {
    cleaned = cleaned.replace(/[\r\n\t]+/g, ' ');
  }
  return cleaned.trim().slice(0, maxLength);
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInquiry(body) {
  const raw = body || {};

  const name = sanitizeText(raw.name, 100, true);
  const email = sanitizeText(raw.email, 200, true);
  const company = sanitizeText(raw.company, 120, true);
  const site = sanitizeText(raw.site, 200, true);
  const type = sanitizeText(raw.type || 'General inquiry', 60, true);
  const timeline = sanitizeText(raw.timeline, 60, true);
  const budget = sanitizeText(raw.budget, 80, true);
  const details = sanitizeText(raw.details || raw.message, 5000, false);
  const websiteHoneypot = typeof raw.website === 'string' ? raw.website.trim() : '';

  const errors = {};

  if (!name || name.length < 2) {
    errors.name = 'Please provide your name (at least 2 characters).';
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!type || !ALLOWED_TYPES.includes(type)) {
    errors.type = 'Please select a valid project type.';
  }

  if (!details || details.length < 10) {
    errors.details = 'Please provide more details (at least 10 characters).';
  }

  const isLinkSpam = linkCount(details) > 2;
  const isHoneypotTriggered = websiteHoneypot.length > 0;
  const spam = isHoneypotTriggered || isLinkSpam;

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    spam,
    data: {
      name,
      email,
      company,
      site,
      type,
      timeline,
      budget,
      details,
    },
  };
}
