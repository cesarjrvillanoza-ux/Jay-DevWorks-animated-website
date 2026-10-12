# Jay DevWorks - Portfolio Website & Inquiry Backend

Animated single-page developer portfolio and inquiry backend for **Jay DevWorks**, a freelance full-stack developer specializing in AI automations, loop engineering, full-stack applications, animated websites, aesthetic online stores, landing pages, UI/UX designs, hero sections, SaaS, and UGCs.

## Project Structure

```text
├── site/                     # Self-contained static site distribution
│   ├── index.html            # Single-page portfolio with inline CSS/JS and rich animations
│   ├── _headers              # Netlify / Cloudflare Pages security headers
│   └── vercel.json           # Vercel security headers
├── backend/                  # Hardened inquiry backend
│   ├── src/
│   │   ├── app.js            # Express app with rate limits & security pipeline
│   │   ├── security.js       # Signed token guard, duplicate hashes & throttling
│   │   ├── validate.js       # Field sanitation, link spam & honeypot check
│   │   ├── email.js          # Resend API integration with HTML escaping
│   │   └── captcha.js        # Cloudflare Turnstile verification
│   ├── security.test.js      # Zero-dependency security unit tests
│   ├── app.test.js           # End-to-end HTTP tests
│   ├── package.json
│   ├── .env.example
│   └── README.md
├── public/assets/            # Mockup assets and animated video clips
│   ├── img/                  # 6 Showroom project screenshots (Harbor & Pine, LedgerLeaf, Northwind, etc.)
│   └── vid/                  # Logo video, header logo video, and posters
└── server.ts                 # Full-stack server running Express backend & client
```

## Features

- **Floating Code Backdrop Canvas**: Multi-layer electric-blue drifting syntax stream with depth, sway, and dynamic particle scaling.
- **Magnetic Cursor Trail**: Neon-blue glowing cursor tail that leans toward interactive buttons and cards (mouse only, disabled on reduced motion).
- **Text & Transformation Loops**: Headings execute a choreographed word-by-word typing sequence, hold, and morph into interactive vector animation scenes.
- **Showroom Project Stack**: Interactive 6-card stack with touch swipe, dragging, automatic 3-second cycle, Ken Burns zooming, hotspot tags, and high-res lightbox.
- **Featured 3D Site Tour**: Rollercoaster-like 3D viewer through all 7 miniature website stages with speed gauges, camera lean/bank, and interactive stop markers.
- **Web Audio Sound Kit**: 100% synthesized sound effects generated dynamically via Web Audio API with zero external audio files.
- **Opening & Closing Overlays**: High-tech branded intro and outro featuring the glowing Jay DevWorks infinity-gear motif.
- **Client Inquiry Flow**: Secure project brief builder with anti-bot HMAC token generation, honeypot traps, clipboard brief copy, and direct mail client integration.

## Deployment Checklist

1. Configure `.env` using `.env.example` as a template. Never commit secrets.
2. In production, configure `ALLOWED_ORIGINS` to point directly to your portfolio domain.
3. If connecting to a remote backend, point `CONFIG.formEndpoint` in `site/index.html` to your backend URL + `/api/inquiry`.
4. Run `npm test` to verify all security layers.
