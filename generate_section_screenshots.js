import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Generate 1920x1080 Full HD pixel-perfect SVG screenshots for each exact section of Jay DevWorks
// Each screenshot includes a sleek dark browser header bar, high-contrast crisp text, exact section layout, and cyber neon accents.

const sections = [
  {
    file: 'tour-sec-0-home.jpg',
    url: 'https://jaydevworks.dev/#home',
    title: 'Jay DevWorks — Freelance Full-Stack Developer & AI Automations',
    svg: `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg0" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050912"/>
      <stop offset="50%" stop-color="#091432"/>
      <stop offset="100%" stop-color="#02040a"/>
    </linearGradient>
    <filter id="neon0" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <!-- Background -->
  <rect width="1920" height="1080" fill="url(#bg0)"/>
  
  <!-- Browser Chrome Top Bar -->
  <rect width="1920" height="60" fill="#040814"/>
  <line x1="0" y1="60" x2="1920" y2="60" stroke="rgba(30,140,255,0.25)" stroke-width="1.5"/>
  <circle cx="35" cy="30" r="7" fill="#ff5f56"/>
  <circle cx="60" cy="30" r="7" fill="#ffbd2e"/>
  <circle cx="85" cy="30" r="7" fill="#27c93f"/>
  <rect x="250" y="14" width="700" height="32" rx="6" fill="#09132c" stroke="rgba(30,140,255,0.3)"/>
  <text x="270" y="36" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600">🔒 https://jaydevworks.dev/#home</text>
  <text x="1000" y="36" fill="#a3b5d6" font-family="'Orbitron', sans-serif" font-size="14" font-weight="600">Jay DevWorks — Engineering Digital Experiences</text>

  <!-- Website Header Bar (Always Fixed) -->
  <rect y="60" width="1920" height="80" fill="rgba(5,9,18,0.95)"/>
  <line x1="0" y1="140" x2="1920" y2="140" stroke="rgba(30,140,255,0.25)" stroke-width="1.5"/>
  <text x="80" y="110" fill="#ffffff" font-family="'Orbitron', sans-serif" font-size="22" font-weight="900" letter-spacing="2">⚡ JAY DEVWORKS</text>
  <text x="1250" y="108" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="16" font-weight="600">Services</text>
  <text x="1360" y="108" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="16" font-weight="600">About</text>
  <text x="1450" y="108" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="16" font-weight="600">Showroom</text>
  <text x="1570" y="108" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="16" font-weight="600">Contact</text>
  <rect x="1680" y="82" width="160" height="42" rx="8" fill="#1e8cff" filter="url(#neon0)"/>
  <text x="1760" y="108" fill="#030814" font-family="'Orbitron', sans-serif" font-size="14" font-weight="800" text-anchor="middle">Start a project</text>

  <!-- Hero Content Left Side -->
  <g transform="translate(100, 200)">
    <!-- Status pill -->
    <rect x="0" y="0" width="340" height="44" rx="22" fill="rgba(61, 220, 151, 0.12)" stroke="#3ddc97" stroke-width="1.8"/>
    <circle cx="28" cy="22" r="6" fill="#3ddc97" filter="url(#neon0)"/>
    <text x="48" y="28" fill="#3ddc97" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="700">Available for new projects</text>

    <!-- Main Headline -->
    <text x="0" y="110" fill="#e9f1ff" font-family="'Orbitron', sans-serif" font-size="44" font-weight="800">Engineering digital experiences,</text>
    <text x="0" y="165" fill="#e9f1ff" font-family="'Orbitron', sans-serif" font-size="44" font-weight="800">AI automations, &amp; modern apps</text>
    <text x="0" y="220" fill="#66b0ff" font-family="'Orbitron', sans-serif" font-size="44" font-weight="800" filter="url(#neon0)">that just work.</text>

    <!-- Lede paragraph -->
    <text x="0" y="290" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">Every great website starts as a rough idea. Tell me what you want to build,</text>
    <text x="0" y="325" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">and together we'll turn it into clean, fast, working code, whether it's a business</text>
    <text x="0" y="360" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">site, a web app or an online store. No jargon, just results.</text>

    <!-- Call to Action Buttons -->
    <rect x="0" y="420" width="220" height="60" rx="10" fill="#1e8cff" filter="url(#neon0)"/>
    <text x="110" y="457" fill="#030814" font-family="'Orbitron', sans-serif" font-size="18" font-weight="800" text-anchor="middle">Start a project</text>

    <rect x="250" y="420" width="230" height="60" rx="10" fill="rgba(30,140,255,0.12)" stroke="#1e8cff" stroke-width="2"/>
    <text x="365" y="457" fill="#e9f1ff" font-family="'Orbitron', sans-serif" font-size="18" font-weight="700" text-anchor="middle">See the showroom</text>

    <!-- Tech Chips Tags -->
    <g transform="translate(0, 540)">
      <rect x="0" y="0" width="90" height="38" rx="8" fill="rgba(30,140,255,0.08)" stroke="#1e8cff" stroke-width="1.5"/>
      <text x="45" y="25" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="600" text-anchor="middle">HTML</text>
      <rect x="105" y="0" width="85" height="38" rx="8" fill="rgba(30,140,255,0.08)" stroke="#1e8cff" stroke-width="1.5"/>
      <text x="147" y="25" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="600" text-anchor="middle">CSS</text>
      <rect x="205" y="0" width="145" height="38" rx="8" fill="rgba(30,140,255,0.08)" stroke="#1e8cff" stroke-width="1.5"/>
      <text x="277" y="25" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="600" text-anchor="middle">JavaScript</text>
      <rect x="365" y="0" width="105" height="38" rx="8" fill="rgba(30,140,255,0.08)" stroke="#1e8cff" stroke-width="1.5"/>
      <text x="417" y="25" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="600" text-anchor="middle">React</text>
      <rect x="485" y="0" width="115" height="38" rx="8" fill="rgba(30,140,255,0.08)" stroke="#1e8cff" stroke-width="1.5"/>
      <text x="542" y="25" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="600" text-anchor="middle">Node.js</text>
      <rect x="615" y="0" width="110" height="38" rx="8" fill="rgba(30,140,255,0.08)" stroke="#1e8cff" stroke-width="1.5"/>
      <text x="670" y="25" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="600" text-anchor="middle">Python</text>
      <rect x="740" y="0" width="180" height="38" rx="8" fill="rgba(30,140,255,0.08)" stroke="#1e8cff" stroke-width="1.5"/>
      <text x="830" y="25" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="600" text-anchor="middle">AI Automations</text>
    </g>
  </g>

  <!-- Right Side Interactive Code Window -->
  <g transform="translate(1080, 210)">
    <rect width="740" height="620" rx="16" fill="#040813" stroke="#1e8cff" stroke-width="2.5" filter="url(#neon0)"/>
    <rect width="740" height="56" rx="16" fill="#081432"/>
    <circle cx="35" cy="28" r="8" fill="#ff5f56"/>
    <circle cx="62" cy="28" r="8" fill="#ffbd2e"/>
    <circle cx="89" cy="28" r="8" fill="#27c93f"/>
    <text x="370" y="36" fill="#a3b5d6" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="600" text-anchor="middle">site.config.js</text>
    
    <!-- Code Lines -->
    <g transform="translate(45, 105)">
      <text x="0" y="0" fill="#5a729e" font-family="'JetBrains Mono', monospace" font-size="17">// who you'll be working with directly</text>
      <text x="0" y="40" fill="#ff79c6" font-family="'JetBrains Mono', monospace" font-size="18">const <tspan fill="#50fa7b">owner</tspan> = {</text>
      <text x="30" y="85" fill="#8be9fd" font-family="'JetBrains Mono', monospace" font-size="18">name: <tspan fill="#f1fa8c">"Jay DevWorks"</tspan>,</text>
      <text x="30" y="130" fill="#8be9fd" font-family="'JetBrains Mono', monospace" font-size="18">role: <tspan fill="#f1fa8c">"Freelance Full-Stack Developer"</tspan>,</text>
      <text x="30" y="175" fill="#8be9fd" font-family="'JetBrains Mono', monospace" font-size="18">specialties: <tspan fill="#f1fa8c">["AI automations", "apps", "animated websites"]</tspan>,</text>
      <text x="30" y="220" fill="#8be9fd" font-family="'JetBrains Mono', monospace" font-size="18">stack: <tspan fill="#f1fa8c">["React", "Node.js", "Python", "Tailwind"]</tspan>,</text>
      <text x="30" y="265" fill="#8be9fd" font-family="'JetBrains Mono', monospace" font-size="18">focus: <tspan fill="#f1fa8c">"fast, accessible, clean, reliable"</tspan>,</text>
      <text x="30" y="310" fill="#8be9fd" font-family="'JetBrains Mono', monospace" font-size="18">talkDirectly: <tspan fill="#bd93f9">true</tspan>,</text>
      <text x="30" y="355" fill="#8be9fd" font-family="'JetBrains Mono', monospace" font-size="18">availableForHire: <tspan fill="#50fa7b">true</tspan></text>
      <text x="0" y="400" fill="#ff79c6" font-family="'JetBrains Mono', monospace" font-size="18">};</text>
      <text x="0" y="445" fill="#ff79c6" font-family="'JetBrains Mono', monospace" font-size="18">export default <tspan fill="#50fa7b">owner</tspan>;</text>
    </g>
  </g>
</svg>
`
  },
  {
    file: 'tour-sec-1-services.jpg',
    url: 'https://jaydevworks.dev/#services',
    title: 'Services — Full-Stack Capabilities',
    svg: `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050912"/>
      <stop offset="50%" stop-color="#0a1736"/>
      <stop offset="100%" stop-color="#02040a"/>
    </linearGradient>
    <filter id="neon1" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="1920" height="1080" fill="url(#bg1)"/>

  <!-- Browser Chrome Top Bar -->
  <rect width="1920" height="60" fill="#040814"/>
  <line x1="0" y1="60" x2="1920" y2="60" stroke="rgba(30,140,255,0.25)" stroke-width="1.5"/>
  <circle cx="35" cy="30" r="7" fill="#ff5f56"/>
  <circle cx="60" cy="30" r="7" fill="#ffbd2e"/>
  <circle cx="85" cy="30" r="7" fill="#27c93f"/>
  <rect x="250" y="14" width="700" height="32" rx="6" fill="#09132c" stroke="rgba(30,140,255,0.3)"/>
  <text x="270" y="36" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600">🔒 https://jaydevworks.dev/#services</text>
  <text x="1000" y="36" fill="#a3b5d6" font-family="'Orbitron', sans-serif" font-size="14" font-weight="600">02 // SERVICES — FULL-STACK CAPABILITIES</text>

  <!-- Section Header -->
  <g transform="translate(100, 110)">
    <text x="0" y="30" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="18" font-weight="700" letter-spacing="2">SERVICES // FULL-STACK CAPABILITIES</text>
    <text x="0" y="85" fill="#e9f1ff" font-family="'Orbitron', sans-serif" font-size="44" font-weight="800">Everything from first page to final launch.</text>
    <text x="0" y="130" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="22">One person handles design, code and deployment, so decisions are quick, clear, and clean.</text>
  </g>

  <!-- 4 Service Cards Grid (Boxed Texts Glowing Neon Blue on Hover) -->
  <g transform="translate(100, 300)">
    <!-- Card 1: Business Websites -->
    <g transform="translate(0, 0)">
      <rect width="820" height="310" rx="16" fill="#09122a" stroke="#1e8cff" stroke-width="2" filter="url(#neon1)"/>
      <text x="45" y="70" fill="#1e8cff" font-family="'JetBrains Mono', monospace" font-size="34" font-weight="800">&lt;/&gt;</text>
      <text x="135" y="68" fill="#ffffff" font-family="'Orbitron', sans-serif" font-size="28" font-weight="700">Business websites</text>
      <text x="45" y="135" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">Clear, fast sites that explain what you do, build immediate trust,</text>
      <text x="45" y="170" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">and bring in client inquiries from day one.</text>
      <text x="45" y="240" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="600">DELIVERABLES: Responsive layout · SEO structured tags · Fast loading · CMS setup</text>
    </g>

    <!-- Card 2: Web Apps -->
    <g transform="translate(900, 0)">
      <rect width="820" height="310" rx="16" fill="#09122a" stroke="#1e8cff" stroke-width="2" filter="url(#neon1)"/>
      <text x="45" y="70" fill="#1e8cff" font-family="'JetBrains Mono', monospace" font-size="34" font-weight="800">{ }</text>
      <text x="135" y="68" fill="#ffffff" font-family="'Orbitron', sans-serif" font-size="28" font-weight="700">Web apps &amp; Dashboards</text>
      <text x="45" y="135" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">Interactive client portals, SaaS dashboards, booking engines,</text>
      <text x="45" y="170" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">and internal tooling shaped around how you actually work.</text>
      <text x="45" y="240" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="600">DELIVERABLES: React SPA · API integrations · Auth security · Database schemas</text>
    </g>

    <!-- Card 3: Online Stores -->
    <g transform="translate(0, 360)">
      <rect width="820" height="310" rx="16" fill="#09122a" stroke="#1e8cff" stroke-width="2" filter="url(#neon1)"/>
      <text x="45" y="70" fill="#1e8cff" font-family="'JetBrains Mono', monospace" font-size="34" font-weight="800">[ ]</text>
      <text x="135" y="68" fill="#ffffff" font-family="'Orbitron', sans-serif" font-size="28" font-weight="700">Online stores &amp; eCommerce</text>
      <text x="45" y="135" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">Aesthetic product galleries, friction-free shopping carts,</text>
      <text x="45" y="170" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">and secure checkout workflows that are effortless for shoppers.</text>
      <text x="45" y="240" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="600">DELIVERABLES: Product catalogs · Stripe/checkout · Inventory flow · Mobile UX</text>
    </g>

    <!-- Card 4: Fixes & AI Upgrades -->
    <g transform="translate(900, 360)">
      <rect width="820" height="310" rx="16" fill="#09122a" stroke="#1e8cff" stroke-width="2" filter="url(#neon1)"/>
      <text x="45" y="70" fill="#1e8cff" font-family="'JetBrains Mono', monospace" font-size="34" font-weight="800">++</text>
      <text x="135" y="68" fill="#ffffff" font-family="'Orbitron', sans-serif" font-size="28" font-weight="700">Fixes, Upgrades &amp; AI Automations</text>
      <text x="45" y="135" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">Slow, broken or outdated site? I audit the bottlenecks, fix what matters,</text>
      <text x="45" y="170" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">and connect AI automation loops that supercharge your workflow.</text>
      <text x="45" y="240" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="600">DELIVERABLES: Speed optimization · Bug repair · AI loop engineering · Handover</text>
    </g>
  </g>
</svg>
`
  },
  {
    file: 'tour-sec-2-process.jpg',
    url: 'https://jaydevworks.dev/#process',
    title: 'Process — Methodology & Execution Pipeline',
    svg: `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050912"/>
      <stop offset="50%" stop-color="#081432"/>
      <stop offset="100%" stop-color="#02040a"/>
    </linearGradient>
    <filter id="neon2" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="1920" height="1080" fill="url(#bg2)"/>

  <!-- Browser Chrome Top Bar -->
  <rect width="1920" height="60" fill="#040814"/>
  <line x1="0" y1="60" x2="1920" y2="60" stroke="rgba(30,140,255,0.25)" stroke-width="1.5"/>
  <circle cx="35" cy="30" r="7" fill="#ff5f56"/>
  <circle cx="60" cy="30" r="7" fill="#ffbd2e"/>
  <circle cx="85" cy="30" r="7" fill="#27c93f"/>
  <rect x="250" y="14" width="700" height="32" rx="6" fill="#09132c" stroke="rgba(30,140,255,0.3)"/>
  <text x="270" y="36" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600">🔒 https://jaydevworks.dev/#process</text>
  <text x="1000" y="36" fill="#a3b5d6" font-family="'Orbitron', sans-serif" font-size="14" font-weight="600">03 // METHODOLOGY — HOW A PROJECT RUNS</text>

  <!-- Section Header -->
  <g transform="translate(100, 110)">
    <text x="0" y="30" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="18" font-weight="700" letter-spacing="2">METHODOLOGY // EXECUTION PIPELINE</text>
    <text x="0" y="85" fill="#e9f1ff" font-family="'Orbitron', sans-serif" font-size="44" font-weight="800">How a project runs: 4 Clear Milestones</text>
    <text x="0" y="130" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="22">Predictable steps with staging preview links at every stage so there are never surprises.</text>
  </g>

  <!-- Timeline Connector Line -->
  <line x1="260" y1="360" x2="1660" y2="360" stroke="#1e8cff" stroke-width="4" filter="url(#neon2)"/>
  <circle cx="280" cy="360" r="14" fill="#1e8cff" filter="url(#neon2)"/>
  <circle cx="740" cy="360" r="14" fill="#1e8cff" filter="url(#neon2)"/>
  <circle cx="1200" cy="360" r="14" fill="#1e8cff" filter="url(#neon2)"/>
  <circle cx="1640" cy="360" r="14" fill="#3ddc97" filter="url(#neon2)"/>

  <!-- 4 Step Cards -->
  <g transform="translate(100, 420)">
    <!-- Step 1: Discover -->
    <g transform="translate(0, 0)">
      <rect width="380" height="480" rx="16" fill="#09122a" stroke="#1e8cff" stroke-width="2" filter="url(#neon2)"/>
      <text x="40" y="70" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="38" font-weight="800">01</text>
      <text x="40" y="130" fill="#ffffff" font-family="'Orbitron', sans-serif" font-size="28" font-weight="700">Discover</text>
      <text x="40" y="190" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">We talk through your goals,</text>
      <text x="40" y="225" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">target audience, deadline,</text>
      <text x="40" y="260" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">and technical scope.</text>
      <text x="40" y="320" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">I send back a clear roadmap</text>
      <text x="40" y="355" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">and fixed estimate.</text>
      <rect x="40" y="400" width="160" height="36" rx="6" fill="rgba(30,140,255,0.15)"/>
      <text x="120" y="424" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" text-anchor="middle">✓ Project brief</text>
    </g>

    <!-- Step 2: Design -->
    <g transform="translate(460, 0)">
      <rect width="380" height="480" rx="16" fill="#09122a" stroke="#1e8cff" stroke-width="2" filter="url(#neon2)"/>
      <text x="40" y="70" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="38" font-weight="800">02</text>
      <text x="40" y="130" fill="#ffffff" font-family="'Orbitron', sans-serif" font-size="28" font-weight="700">Design</text>
      <text x="40" y="190" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">Page layouts, UI components,</text>
      <text x="40" y="225" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">typography, and visual direction</text>
      <text x="40" y="260" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">you can react to.</text>
      <text x="40" y="320" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">Refined until approved</text>
      <text x="40" y="355" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">before any code is written.</text>
      <rect x="40" y="400" width="180" height="36" rx="6" fill="rgba(30,140,255,0.15)"/>
      <text x="130" y="424" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" text-anchor="middle">✓ Interactive wireframes</text>
    </g>

    <!-- Step 3: Build -->
    <g transform="translate(920, 0)">
      <rect width="380" height="480" rx="16" fill="#09122a" stroke="#1e8cff" stroke-width="2" filter="url(#neon2)"/>
      <text x="40" y="70" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="38" font-weight="800">03</text>
      <text x="40" y="130" fill="#ffffff" font-family="'Orbitron', sans-serif" font-size="28" font-weight="700">Build</text>
      <text x="40" y="190" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">Clean, responsive code</text>
      <text x="40" y="225" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">engineered with modern stacks.</text>
      <text x="40" y="260" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">Live staging previews</text>
      <text x="40" y="320" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">let you see real progress</text>
      <text x="40" y="355" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">week over week.</text>
      <rect x="40" y="400" width="180" height="36" rx="6" fill="rgba(30,140,255,0.15)"/>
      <text x="130" y="424" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" text-anchor="middle">✓ Live staging preview</text>
    </g>

    <!-- Step 4: Launch -->
    <g transform="translate(1380, 0)">
      <rect width="380" height="480" rx="16" fill="#09122a" stroke="#3ddc97" stroke-width="2.5" filter="url(#neon2)"/>
      <text x="40" y="70" fill="#3ddc97" font-family="'JetBrains Mono', monospace" font-size="38" font-weight="800">04</text>
      <text x="40" y="130" fill="#ffffff" font-family="'Orbitron', sans-serif" font-size="28" font-weight="700">Launch</text>
      <text x="40" y="190" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">Cross-browser QA testing,</text>
      <text x="40" y="225" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">performance audits, SEO check,</text>
      <text x="40" y="260" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">and production deployment.</text>
      <text x="40" y="320" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">Complete walkthrough so you</text>
      <text x="40" y="355" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="20">own and control everything.</text>
      <rect x="40" y="400" width="180" height="36" rx="6" fill="rgba(61,220,151,0.15)"/>
      <text x="130" y="424" fill="#3ddc97" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="700" text-anchor="middle">✓ Production launch</text>
    </g>
  </g>
</svg>
`
  },
  {
    file: 'tour-sec-3-about.jpg',
    url: 'https://jaydevworks.dev/#about',
    title: 'About Me — Engineering Philosophy & Full-Stack Toolkit',
    svg: `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050912"/>
      <stop offset="50%" stop-color="#091432"/>
      <stop offset="100%" stop-color="#02040a"/>
    </linearGradient>
    <filter id="neon3" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="1920" height="1080" fill="url(#bg3)"/>

  <!-- Browser Chrome Top Bar -->
  <rect width="1920" height="60" fill="#040814"/>
  <line x1="0" y1="60" x2="1920" y2="60" stroke="rgba(30,140,255,0.25)" stroke-width="1.5"/>
  <circle cx="35" cy="30" r="7" fill="#ff5f56"/>
  <circle cx="60" cy="30" r="7" fill="#ffbd2e"/>
  <circle cx="85" cy="30" r="7" fill="#27c93f"/>
  <rect x="250" y="14" width="700" height="32" rx="6" fill="#09132c" stroke="rgba(30,140,255,0.3)"/>
  <text x="270" y="36" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600">🔒 https://jaydevworks.dev/#about</text>
  <text x="1000" y="36" fill="#a3b5d6" font-family="'Orbitron', sans-serif" font-size="14" font-weight="600">04 // ABOUT ME — PHILOSOPHY &amp; STACK</text>

  <!-- Section Header -->
  <g transform="translate(100, 110)">
    <text x="0" y="30" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="18" font-weight="700" letter-spacing="2">ABOUT ME // PHILOSOPHY &amp; STACK</text>
    <text x="0" y="85" fill="#e9f1ff" font-family="'Orbitron', sans-serif" font-size="44" font-weight="800">Hi, I'm Jay DevWorks.</text>
    <text x="0" y="130" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="22">I turn rough ideas into working websites, AI automations, and polished web apps.</text>
  </g>

  <!-- Left Side: 4 Core Principles (Boxed Texts Glowing Neon Blue on Hover) -->
  <g transform="translate(100, 300)">
    <!-- Principle 1 -->
    <g transform="translate(0, 0)">
      <rect width="470" height="290" rx="14" fill="#09122a" stroke="#1e8cff" stroke-width="2" filter="url(#neon3)"/>
      <text x="35" y="60" fill="#66b0ff" font-family="'Orbitron', sans-serif" font-size="24" font-weight="700">Direct communication</text>
      <text x="35" y="115" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="18">You talk directly to the developer writing</text>
      <text x="35" y="145" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="18">the code. No account managers, no layers,</text>
      <text x="35" y="175" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="18">just fast answers and honest advice.</text>
      <text x="35" y="240" fill="#3ddc97" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="600">✓ No middleman delays</text>
    </g>

    <!-- Principle 2 -->
    <g transform="translate(510, 0)">
      <rect width="470" height="290" rx="14" fill="#09122a" stroke="#1e8cff" stroke-width="2" filter="url(#neon3)"/>
      <text x="35" y="60" fill="#66b0ff" font-family="'Orbitron', sans-serif" font-size="24" font-weight="700">Fast by default</text>
      <text x="35" y="115" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="18">Lean pages, optimized assets, and zero</text>
      <text x="35" y="145" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="18">unnecessary plugins. Sites load in a blink,</text>
      <text x="35" y="175" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="18">retaining visitors and ranking higher.</text>
      <text x="35" y="240" fill="#3ddc97" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="600">✓ 99+ Lighthouse performance</text>
    </g>

    <!-- Principle 3 -->
    <g transform="translate(0, 330)">
      <rect width="470" height="290" rx="14" fill="#09122a" stroke="#1e8cff" stroke-width="2" filter="url(#neon3)"/>
      <text x="35" y="60" fill="#66b0ff" font-family="'Orbitron', sans-serif" font-size="24" font-weight="700">Built to hand over</text>
      <text x="35" y="115" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="18">Clean, documented code and clear notes so</text>
      <text x="35" y="145" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="18">your site is never locked to one person.</text>
      <text x="35" y="175" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="18">You own 100% of your source code.</text>
      <text x="35" y="240" fill="#3ddc97" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="600">✓ Zero vendor lock-in</text>
    </g>

    <!-- Principle 4 -->
    <g transform="translate(510, 330)">
      <rect width="470" height="290" rx="14" fill="#09122a" stroke="#1e8cff" stroke-width="2" filter="url(#neon3)"/>
      <text x="35" y="60" fill="#66b0ff" font-family="'Orbitron', sans-serif" font-size="24" font-weight="700">Accessible &amp; responsive</text>
      <text x="35" y="115" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="18">Tested on small phones, ultrawide monitors,</text>
      <text x="35" y="145" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="18">with keyboards and screen readers.</text>
      <text x="35" y="175" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="18">Every visitor enjoys a flawless experience.</text>
      <text x="35" y="240" fill="#3ddc97" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="600">✓ WCAG AA compliant</text>
    </g>
  </g>

  <!-- Right Side: Toolkit Panel (Boxed Text Glowing Neon Blue on Hover) -->
  <g transform="translate(1140, 300)">
    <rect width="680" height="620" rx="16" fill="#081024" stroke="#1e8cff" stroke-width="2.5" filter="url(#neon3)"/>
    <text x="45" y="65" fill="#ffffff" font-family="'Orbitron', sans-serif" font-size="30" font-weight="800">Toolkit &amp; Technical Stack</text>

    <g transform="translate(45, 115)">
      <text x="0" y="20" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="17" font-weight="700">FRONT END // BROWSER</text>
      <text x="0" y="55" fill="#e9f1ff" font-family="'Exo 2', sans-serif" font-size="20">React · TypeScript · Tailwind CSS · Vite · Web Audio API</text>
      <text x="0" y="90" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="17">Responsive design, 60fps canvas animations, accessible DOM</text>
    </g>

    <g transform="translate(45, 275)">
      <text x="0" y="20" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="17" font-weight="700">BACK END // SERVERS &amp; APIS</text>
      <text x="0" y="55" fill="#e9f1ff" font-family="'Exo 2', sans-serif" font-size="20">Node.js · Express · Python · REST APIs · PostgreSQL</text>
      <text x="0" y="90" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="17">Secure authentication, HMAC tokens, strict rate limiting, CORS</text>
    </g>

    <g transform="translate(45, 435)">
      <text x="0" y="20" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="17" font-weight="700">TOOLING &amp; AI AUTOMATIONS</text>
      <text x="0" y="55" fill="#e9f1ff" font-family="'Exo 2', sans-serif" font-size="20">Git · Vercel · Cloudflare · Resend API · AI Loop Workflows</text>
      <text x="0" y="90" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="17">Automated CI/CD pipelines, autonomous loops, transactional mail</text>
    </g>
  </g>
</svg>
`
  },
  {
    file: 'tour-sec-4-showroom.jpg',
    url: 'https://jaydevworks.dev/#showroom',
    title: 'Showroom — Selected Projects & Live Case Studies',
    svg: `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg4" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050912"/>
      <stop offset="50%" stop-color="#0a1736"/>
      <stop offset="100%" stop-color="#02040a"/>
    </linearGradient>
    <filter id="neon4" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="1920" height="1080" fill="url(#bg4)"/>

  <!-- Browser Chrome Top Bar -->
  <rect width="1920" height="60" fill="#040814"/>
  <line x1="0" y1="60" x2="1920" y2="60" stroke="rgba(30,140,255,0.25)" stroke-width="1.5"/>
  <circle cx="35" cy="30" r="7" fill="#ff5f56"/>
  <circle cx="60" cy="30" r="7" fill="#ffbd2e"/>
  <circle cx="85" cy="30" r="7" fill="#27c93f"/>
  <rect x="250" y="14" width="700" height="32" rx="6" fill="#09132c" stroke="rgba(30,140,255,0.3)"/>
  <text x="270" y="36" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600">🔒 https://jaydevworks.dev/#showroom</text>
  <text x="1000" y="36" fill="#a3b5d6" font-family="'Orbitron', sans-serif" font-size="14" font-weight="600">05 // SHOWROOM — SELECTED PROJECTS</text>

  <!-- Section Header -->
  <g transform="translate(100, 110)">
    <text x="0" y="30" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="18" font-weight="700" letter-spacing="2">SHOWROOM // SELECTED PROJECTS</text>
    <text x="0" y="85" fill="#e9f1ff" font-family="'Orbitron', sans-serif" font-size="44" font-weight="800">A look at the kind of work I build.</text>
    <text x="0" y="130" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="22">Sample projects spanning business websites, custom web applications, and aesthetic online stores.</text>
  </g>

  <!-- Filter Buttons Bar -->
  <g transform="translate(100, 280)">
    <rect x="0" y="0" width="80" height="42" rx="8" fill="#1e8cff" filter="url(#neon4)"/>
    <text x="40" y="27" fill="#030814" font-family="'Orbitron', sans-serif" font-size="14" font-weight="800" text-anchor="middle">All (6)</text>

    <rect x="100" y="0" width="160" height="42" rx="8" fill="rgba(30,140,255,0.12)" stroke="#1e8cff" stroke-width="1.5"/>
    <text x="180" y="27" fill="#e9f1ff" font-family="'Orbitron', sans-serif" font-size="14" font-weight="600" text-anchor="middle">Websites</text>

    <rect x="280" y="0" width="160" height="42" rx="8" fill="rgba(30,140,255,0.12)" stroke="#1e8cff" stroke-width="1.5"/>
    <text x="360" y="27" fill="#e9f1ff" font-family="'Orbitron', sans-serif" font-size="14" font-weight="600" text-anchor="middle">Web apps</text>

    <rect x="460" y="0" width="160" height="42" rx="8" fill="rgba(30,140,255,0.12)" stroke="#1e8cff" stroke-width="1.5"/>
    <text x="540" y="27" fill="#e9f1ff" font-family="'Orbitron', sans-serif" font-size="14" font-weight="600" text-anchor="middle">Stores</text>
  </g>

  <!-- 3 Project Cards Showroom (Boxed Texts Glowing Neon Blue on Hover) -->
  <g transform="translate(100, 360)">
    <!-- Project 1: Harbor & Pine Café -->
    <g transform="translate(0, 0)">
      <rect width="540" height="640" rx="16" fill="#09122a" stroke="#1e8cff" stroke-width="2" filter="url(#neon4)"/>
      <rect x="25" y="25" width="490" height="300" rx="10" fill="#0b1a38"/>
      <text x="270" y="170" fill="#66b0ff" font-family="'Orbitron', sans-serif" font-size="24" font-weight="800" text-anchor="middle">☕ Harbor &amp; Pine Café</text>
      <text x="270" y="210" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="16" text-anchor="middle">Where the Forest Meets the Harbor</text>
      
      <text x="35" y="375" fill="#ffffff" font-family="'Orbitron', sans-serif" font-size="26" font-weight="700">Harbor &amp; Pine Café</text>
      <text x="35" y="420" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="18">Handcrafted coffee, coastal bakery menu,</text>
      <text x="35" y="450" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="18">live hours &amp; event catering inquiry site.</text>
      
      <text x="35" y="520" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="600">STACK: HTML5 · Tailwind CSS · JavaScript</text>
      <rect x="35" y="560" width="160" height="44" rx="8" fill="#1e8cff"/>
      <text x="115" y="588" fill="#030814" font-family="'Orbitron', sans-serif" font-size="14" font-weight="700" text-anchor="middle">Explore project</text>
    </g>

    <!-- Project 2: LedgerLeaf Dashboard -->
    <g transform="translate(590, 0)">
      <rect width="540" height="640" rx="16" fill="#09122a" stroke="#1e8cff" stroke-width="2.5" filter="url(#neon4)"/>
      <rect x="25" y="25" width="490" height="300" rx="10" fill="#0e234c"/>
      <text x="270" y="170" fill="#50fa7b" font-family="'Orbitron', sans-serif" font-size="24" font-weight="800" text-anchor="middle">📊 LedgerLeaf Dashboard</text>
      <text x="270" y="210" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="16" text-anchor="middle">Invoicing &amp; Cashflow Management</text>
      
      <text x="35" y="375" fill="#ffffff" font-family="'Orbitron', sans-serif" font-size="26" font-weight="700">LedgerLeaf App</text>
      <text x="35" y="420" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="18">Automated invoice generator, overdue debt tracker,</text>
      <text x="35" y="450" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="18">client payment reminders and KPI charts.</text>
      
      <text x="35" y="520" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="600">STACK: React · Node.js · PostgreSQL · Express</text>
      <rect x="35" y="560" width="160" height="44" rx="8" fill="#1e8cff"/>
      <text x="115" y="588" fill="#030814" font-family="'Orbitron', sans-serif" font-size="14" font-weight="700" text-anchor="middle">Explore project</text>
    </g>

    <!-- Project 3: Northwind Outfitters -->
    <g transform="translate(1180, 0)">
      <rect width="540" height="640" rx="16" fill="#09122a" stroke="#1e8cff" stroke-width="2" filter="url(#neon4)"/>
      <rect x="25" y="25" width="490" height="300" rx="10" fill="#0b1a38"/>
      <text x="270" y="170" fill="#ffbd2e" font-family="'Orbitron', sans-serif" font-size="24" font-weight="800" text-anchor="middle">🏔️ Northwind Outfitters</text>
      <text x="270" y="210" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="16" text-anchor="middle">Premium Mountain Gear Online Store</text>
      
      <text x="35" y="375" fill="#ffffff" font-family="'Orbitron', sans-serif" font-size="26" font-weight="700">Northwind Outfitters</text>
      <text x="35" y="420" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="18">High-performance hiking catalog, tent rentals,</text>
      <text x="35" y="450" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="18">and streamlined frictionless card checkout.</text>
      
      <text x="35" y="520" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="600">STACK: React · Stripe · Node.js · Cloudflare</text>
      <rect x="35" y="560" width="160" height="44" rx="8" fill="#1e8cff"/>
      <text x="115" y="588" fill="#030814" font-family="'Orbitron', sans-serif" font-size="14" font-weight="700" text-anchor="middle">Explore project</text>
    </g>
  </g>
</svg>
`
  },
  {
    file: 'tour-sec-5-inquiry.jpg',
    url: 'https://jaydevworks.dev/#inquiry',
    title: 'Client Inquiry — Project Brief Intake & Shield Authentication',
    svg: `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg5" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050912"/>
      <stop offset="50%" stop-color="#081432"/>
      <stop offset="100%" stop-color="#02040a"/>
    </linearGradient>
    <filter id="neon5" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="1920" height="1080" fill="url(#bg5)"/>

  <!-- Browser Chrome Top Bar -->
  <rect width="1920" height="60" fill="#040814"/>
  <line x1="0" y1="60" x2="1920" y2="60" stroke="rgba(30,140,255,0.25)" stroke-width="1.5"/>
  <circle cx="35" cy="30" r="7" fill="#ff5f56"/>
  <circle cx="60" cy="30" r="7" fill="#ffbd2e"/>
  <circle cx="85" cy="30" r="7" fill="#27c93f"/>
  <rect x="250" y="14" width="700" height="32" rx="6" fill="#09132c" stroke="rgba(30,140,255,0.3)"/>
  <text x="270" y="36" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600">🔒 https://jaydevworks.dev/#inquiry</text>
  <text x="1000" y="36" fill="#a3b5d6" font-family="'Orbitron', sans-serif" font-size="14" font-weight="600">06 // CLIENT INQUIRY — PROJECT BRIEF BUILDER</text>

  <!-- Section Header -->
  <g transform="translate(100, 110)">
    <text x="0" y="30" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="18" font-weight="700" letter-spacing="2">CLIENT INQUIRY // PROJECT BRIEF INTAKE</text>
    <text x="0" y="85" fill="#e9f1ff" font-family="'Orbitron', sans-serif" font-size="44" font-weight="800">Tell me about your project.</text>
    <text x="0" y="130" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="22">Share what you're building. A few clear details make the first reply much more useful.</text>
  </g>

  <!-- Left Side: Guide Checklist (Boxed Text Glowing Neon Blue on Hover) -->
  <g transform="translate(100, 300)">
    <rect width="780" height="680" rx="16" fill="#09122a" stroke="#1e8cff" stroke-width="2" filter="url(#neon5)"/>
    <text x="50" y="65" fill="#ffffff" font-family="'Orbitron', sans-serif" font-size="28" font-weight="700">Helpful items to include:</text>

    <g transform="translate(50, 120)">
      <text x="0" y="25" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="24">✓</text>
      <text x="45" y="23" fill="#e9f1ff" font-family="'Exo 2', sans-serif" font-size="22" font-weight="600">What the site or app should achieve</text>
      <text x="45" y="58" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="17">Selling products, capturing client leads, or streamlining internal workflow.</text>

      <text x="0" y="125" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="24">✓</text>
      <text x="45" y="123" fill="#e9f1ff" font-family="'Exo 2', sans-serif" font-size="22" font-weight="600">Who it is for &amp; your target audience</text>
      <text x="45" y="158" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="17">Founders, local customers, enterprise teams, or mobile users.</text>

      <text x="0" y="225" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="24">✓</text>
      <text x="45" y="223" fill="#e9f1ff" font-family="'Exo 2', sans-serif" font-size="22" font-weight="600">Key features or integrations required</text>
      <text x="45" y="258" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="17">Payment processing, CRM, user logins, AI automations, or appointment bookings.</text>

      <text x="0" y="325" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="24">✓</text>
      <text x="45" y="323" fill="#e9f1ff" font-family="'Exo 2', sans-serif" font-size="22" font-weight="600">Sites you like or visual references</text>
      <text x="45" y="358" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="17">Links to 1-2 examples of sites with a feel, layout or animation you admire.</text>

      <text x="0" y="425" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="24">✓</text>
      <text x="45" y="423" fill="#e9f1ff" font-family="'Exo 2', sans-serif" font-size="22" font-weight="600">Your deadline and rough budget</text>
      <text x="45" y="458" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="17">Helps match scope with realistic timelines and recommendations.</text>
    </g>
  </g>

  <!-- Right Side: Live Interactive Inquiry Form (Boxed Text Glowing Neon Blue on Hover) -->
  <g transform="translate(940, 300)">
    <rect width="880" height="680" rx="16" fill="#081024" stroke="#1e8cff" stroke-width="2.5" filter="url(#neon5)"/>
    
    <!-- Input Field: Name -->
    <text x="50" y="55" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="600">YOUR NAME *</text>
    <rect x="50" y="70" width="370" height="52" rx="8" fill="#040814" stroke="rgba(30,140,255,0.4)"/>
    <text x="70" y="103" fill="#ffffff" font-family="'Exo 2', sans-serif" font-size="18">Jordan Lee</text>

    <!-- Input Field: Email -->
    <text x="460" y="55" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="600">EMAIL ADDRESS *</text>
    <rect x="460" y="70" width="370" height="52" rx="8" fill="#040814" stroke="rgba(30,140,255,0.4)"/>
    <text x="480" y="103" fill="#ffffff" font-family="'Exo 2', sans-serif" font-size="18">jordan@studio.co</text>

    <!-- Input Field: Project Type -->
    <text x="50" y="160" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="600">PROJECT TYPE</text>
    <rect x="50" y="175" width="780" height="52" rx="8" fill="#040814" stroke="rgba(30,140,255,0.4)"/>
    <text x="70" y="208" fill="#50fa7b" font-family="'Exo 2', sans-serif" font-size="18">Online store (eCommerce drop)</text>

    <!-- Input Field: Project Details -->
    <text x="50" y="265" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="600">PROJECT DETAILS &amp; GOALS</text>
    <rect x="50" y="280" width="780" height="170" rx="8" fill="#040814" stroke="rgba(30,140,255,0.4)"/>
    <text x="70" y="320" fill="#e9f1ff" font-family="'Exo 2', sans-serif" font-size="18">"We are launching an online store for handmade ceramics,</text>
    <text x="70" y="355" fill="#e9f1ff" font-family="'Exo 2', sans-serif" font-size="18">custom product drops, and need seamless Stripe checkout."</text>

    <!-- Token Security Shield Info -->
    <rect x="50" y="480" width="780" height="60" rx="8" fill="rgba(30,140,255,0.08)" stroke="rgba(30,140,255,0.3)"/>
    <text x="75" y="516" fill="#3ddc97" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="600">🛡️ Protected by anti-bot HMAC token shield · Resend API verified delivery</text>

    <!-- Send Button & Response Status -->
    <rect x="50" y="570" width="240" height="56" rx="10" fill="#1e8cff" filter="url(#neon5)"/>
    <text x="170" y="605" fill="#030814" font-family="'Orbitron', sans-serif" font-size="18" font-weight="800" text-anchor="middle">Send inquiry</text>

    <rect x="320" y="570" width="280" height="56" rx="10" fill="rgba(61,220,151,0.15)" stroke="#3ddc97" stroke-width="2"/>
    <text x="460" y="605" fill="#3ddc97" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="700" text-anchor="middle">✓ Instant Confirmation</text>
  </g>
</svg>
`
  },
  {
    file: 'tour-sec-6-contact.jpg',
    url: 'https://jaydevworks.dev/#contact',
    title: 'Contact — Direct Dialogue & Response Guarantee',
    svg: `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg6" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050912"/>
      <stop offset="50%" stop-color="#0a1736"/>
      <stop offset="100%" stop-color="#02040a"/>
    </linearGradient>
    <filter id="neon6" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="1920" height="1080" fill="url(#bg6)"/>

  <!-- Browser Chrome Top Bar -->
  <rect width="1920" height="60" fill="#040814"/>
  <line x1="0" y1="60" x2="1920" y2="60" stroke="rgba(30,140,255,0.25)" stroke-width="1.5"/>
  <circle cx="35" cy="30" r="7" fill="#ff5f56"/>
  <circle cx="60" cy="30" r="7" fill="#ffbd2e"/>
  <circle cx="85" cy="30" r="7" fill="#27c93f"/>
  <rect x="250" y="14" width="700" height="32" rx="6" fill="#09132c" stroke="rgba(30,140,255,0.3)"/>
  <text x="270" y="36" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600">🔒 https://jaydevworks.dev/#contact</text>
  <text x="1000" y="36" fill="#a3b5d6" font-family="'Orbitron', sans-serif" font-size="14" font-weight="600">07 // CONTACT — DIRECT DIALOGUE</text>

  <!-- Section Header -->
  <g transform="translate(100, 130)">
    <text x="860" y="30" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="18" font-weight="700" letter-spacing="2" text-anchor="middle">CONTACT // DIRECT DIALOGUE</text>
    <text x="860" y="95" fill="#e9f1ff" font-family="'Orbitron', sans-serif" font-size="52" font-weight="800" text-anchor="middle">Prefer to talk directly?</text>
    <text x="860" y="145" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="24" text-anchor="middle">Send a note about what you need. You'll hear from me, not an automated chatbot.</text>
  </g>

  <!-- Direct Email Contact Box (Boxed Text Glowing Neon Blue on Hover) -->
  <g transform="translate(410, 360)">
    <rect width="1100" height="130" rx="18" fill="#091436" stroke="#1e8cff" stroke-width="2.5" filter="url(#neon6)"/>
    <text x="550" y="80" fill="#66b0ff" font-family="'Orbitron', sans-serif" font-size="44" font-weight="800" text-anchor="middle" filter="url(#neon6)">rasecjrvillanoza@gmail.com</text>
  </g>

  <!-- 4 Facts Cards Grid (Boxed Texts Glowing Neon Blue on Hover) -->
  <g transform="translate(260, 560)">
    <!-- Fact 1 -->
    <g transform="translate(0, 0)">
      <rect width="320" height="200" rx="14" fill="#09122a" stroke="#1e8cff" stroke-width="2" filter="url(#neon6)"/>
      <text x="35" y="55" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="700">DIRECT EMAIL</text>
      <text x="35" y="110" fill="#ffffff" font-family="'Orbitron', sans-serif" font-size="18" font-weight="700">rasecjrvillanoza@gmail.com</text>
      <text x="35" y="150" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="16">Personal inbox, checked daily</text>
    </g>

    <!-- Fact 2 -->
    <g transform="translate(360, 0)">
      <rect width="320" height="200" rx="14" fill="#09122a" stroke="#1e8cff" stroke-width="2" filter="url(#neon6)"/>
      <text x="35" y="55" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="700">LOCATION &amp; TIMEZONE</text>
      <text x="35" y="110" fill="#ffffff" font-family="'Orbitron', sans-serif" font-size="20" font-weight="700">Remote Globally</text>
      <text x="35" y="150" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="16">Flexible overlap with US/EU/APAC</text>
    </g>

    <!-- Fact 3 -->
    <g transform="translate(720, 0)">
      <rect width="320" height="200" rx="14" fill="#09122a" stroke="#1e8cff" stroke-width="2" filter="url(#neon6)"/>
      <text x="35" y="55" fill="#66b0ff" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="700">TYPICAL RESPONSE</text>
      <text x="35" y="110" fill="#ffffff" font-family="'Orbitron', sans-serif" font-size="20" font-weight="700">1-2 Business Days</text>
      <text x="35" y="150" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="16">Detailed reply with next steps</text>
    </g>

    <!-- Fact 4 -->
    <g transform="translate(1080, 0)">
      <rect width="320" height="200" rx="14" fill="#09122a" stroke="#3ddc97" stroke-width="2.5" filter="url(#neon6)"/>
      <text x="35" y="55" fill="#3ddc97" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="700">IDEAL FOR</text>
      <text x="35" y="110" fill="#ffffff" font-family="'Orbitron', sans-serif" font-size="20" font-weight="700">Founders &amp; Teams</text>
      <text x="35" y="150" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="16">Startups, shops &amp; modern apps</text>
    </g>
  </g>

  <!-- Footer Notice -->
  <text x="960" y="860" fill="#a3b5d6" font-family="'Exo 2', sans-serif" font-size="18" text-anchor="middle">© 2026 Jay DevWorks. All rights reserved. Built with clean code, zero AI fluff, and verified email authentication.</text>
</svg>
`
  }
];

console.log('Rendering 1920x1080 crystal-clear screenshots for all 7 exact sections...');

for (const sec of sections) {
  const tmpSvg = `tmp_${sec.file}.svg`;
  fs.writeFileSync(tmpSvg, sec.svg.trim());
  const destPath = path.join('public', 'assets', 'img', sec.file);
  // High quality 1920x1080 rendering via ffmpeg with crisp scaling
  execSync(`ffmpeg -y -r 1 -i ${tmpSvg} -s 1920x1080 -q:v 2 ${destPath}`, { stdio: 'inherit' });
  fs.unlinkSync(tmpSvg);
  console.log(`Generated high-res readable screenshot: ${destPath}`);
}

// Sync to assets/img and site/img
execSync('cp -f public/assets/img/tour-sec-*.jpg assets/img/ && cp -f public/assets/img/tour-sec-*.jpg site/img/', { stdio: 'inherit' });
console.log('All 7 exact section screenshots rendered at 1920x1080 and synced everywhere!');
