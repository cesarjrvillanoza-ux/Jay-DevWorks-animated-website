import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const WIDTH = 960;
const HEIGHT = 540;
const FPS = 24;
const DURATION = 8;
const TOTAL_FRAMES = FPS * DURATION;

const tmpDir = path.resolve('tmp_frames');
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

function createGearSVG(cx, cy, rOut, rIn, teeth, angle, color1, color2) {
  let d = '';
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a0 = angle + i * step;
    const a1 = a0 + step * 0.28;
    const a2 = a0 + step * 0.5;
    const a3 = a0 + step * 0.78;

    const x0 = cx + rOut * Math.cos(a0);
    const y0 = cy + rOut * Math.sin(a0);
    const x1 = cx + rOut * Math.cos(a1);
    const y1 = cy + rOut * Math.sin(a1);
    const x2 = cx + rIn * Math.cos(a2);
    const y2 = cy + rIn * Math.sin(a2);
    const x3 = cx + rIn * Math.cos(a3);
    const y3 = cy + rIn * Math.sin(a3);

    if (i === 0) d += `M ${x0} ${y0} `;
    d += `L ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} `;
  }
  d += 'Z';

  // Spokes
  let spokes = '';
  for (let s = 0; s < 6; s++) {
    const sa = angle + s * (Math.PI / 3);
    const sx1 = cx + (rIn * 0.4) * Math.cos(sa);
    const sy1 = cy + (rIn * 0.4) * Math.sin(sa);
    const sx2 = cx + (rIn * 0.95) * Math.cos(sa);
    const sy2 = cy + (rIn * 0.95) * Math.sin(sa);
    spokes += `<line x1="${sx1}" y1="${sy1}" x2="${sx2}" y2="${sy2}" stroke="${color1}" stroke-width="3"/>`;
  }

  return `
    <path d="${d}" fill="rgba(8, 20, 50, 0.85)" stroke="${color1}" stroke-width="2.5" />
    <circle cx="${cx}" cy="${cy}" r="${rIn * 0.95}" fill="none" stroke="${color2}" stroke-width="2" />
    <circle cx="${cx}" cy="${cy}" r="${rIn * 0.4}" fill="#040916" stroke="${color1}" stroke-width="3" />
    <circle cx="${cx}" cy="${cy}" r="${rIn * 0.18}" fill="${color2}" />
    ${spokes}
  `;
}

console.log(`Generating ${TOTAL_FRAMES} SVG frames...`);

for (let i = 0; i < TOTAL_FRAMES; i++) {
  const t = i / FPS;
  const rotLeft = (t * 1.5);
  const rotRight = (-t * 1.5);
  const rotCenter = (-t * 3.0);

  // Left gear: cyan
  const leftGear = createGearSVG(350, 230, 95, 78, 14, rotLeft, '#1e8cff', '#66b0ff');
  // Right gear: magenta/purple
  const rightGear = createGearSVG(610, 230, 95, 78, 14, rotRight, '#d250ff', '#f080ff');
  // Center gear
  const centerGear = createGearSVG(480, 280, 42, 34, 10, rotCenter, '#38bdf8', '#818cf8');

  // Energy pulses along infinity curve
  const dashOffset = -((t * 300) % 1200);

  // Sweeping lens flare
  const flareProgress = ((t - 0.5) % 3.0) / 3.0;
  let flareX = -200 + flareProgress * (WIDTH + 400);
  let flareOpacity = 0.85;

  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="infGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00f0ff" />
      <stop offset="50%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#e040fb" />
    </linearGradient>
    <linearGradient id="flareGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="transparent" />
      <stop offset="50%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="transparent" />
    </linearGradient>
    <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="8" result="blur1" />
      <feGaussianBlur stdDeviation="20" result="blur2" />
      <feMerge>
        <feMergeNode in="blur2" />
        <feMergeNode in="blur1" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- Black Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#02040a" />

  <!-- Grid lines -->
  <g stroke="#091836" stroke-width="1">
    ${Array.from({ length: 24 }, (_, k) => `<line x1="${k * 40}" y1="0" x2="${k * 40}" y2="${HEIGHT}" />`).join('')}
    ${Array.from({ length: 14 }, (_, k) => `<line x1="0" y1="${k * 40}" x2="${WIDTH}" y2="${k * 40}" />`).join('')}
  </g>

  <!-- Circuit lines -->
  <path d="M 120 230 L 220 230 M 740 230 L 840 230 M 480 80 L 480 140" stroke="#0e2a5c" stroke-width="2" />
  <circle cx="120" cy="230" r="4" fill="#1e8cff" />
  <circle cx="840" cy="230" r="4" fill="#d250ff" />

  <!-- Animated Gears -->
  <g>${leftGear}</g>
  <g>${rightGear}</g>
  <g>${centerGear}</g>

  <!-- Infinity Loop Outer Neon Ribbon -->
  <path d="M 480 230 C 550 110, 730 110, 730 230 C 730 350, 550 350, 480 230 C 410 110, 230 110, 230 230 C 230 350, 410 350, 480 230 Z"
        fill="none"
        stroke="url(#infGrad)"
        stroke-width="14"
        stroke-linecap="round"
        stroke-linejoin="round"
        filter="url(#neonGlow)" />

  <path d="M 480 230 C 550 110, 730 110, 730 230 C 730 350, 550 350, 480 230 C 410 110, 230 110, 230 230 C 230 350, 410 350, 480 230 Z"
        fill="none"
        stroke="#ffffff"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round" />

  <!-- Flowing Energy Pulse Stream -->
  <path d="M 480 230 C 550 110, 730 110, 730 230 C 730 350, 550 350, 480 230 C 410 110, 230 110, 230 230 C 230 350, 410 350, 480 230 Z"
        fill="none"
        stroke="#ffffff"
        stroke-width="6"
        stroke-dasharray="60 300"
        stroke-dashoffset="${dashOffset}"
        filter="url(#neonGlow)" />

  <!-- Jay DevWorks Typography -->
  <text x="480" y="445"
        text-anchor="middle"
        font-family="sans-serif"
        font-weight="900"
        font-size="52"
        letter-spacing="2"
        fill="#ffffff"
        filter="url(#neonGlow)">Jay DevWorks</text>

  <!-- Horizontal Lens Flare Streak -->
  <g opacity="${flareOpacity}">
    <line x1="${flareX - 220}" y1="465" x2="${flareX + 220}" y2="465" stroke="url(#flareGrad)" stroke-width="4" filter="url(#neonGlow)" />
    <circle cx="${flareX}" cy="465" r="8" fill="#ffffff" filter="url(#neonGlow)" />
  </g>
</svg>`;

  const pad = String(i).padStart(4, '0');
  fs.writeFileSync(path.join(tmpDir, `frame_${pad}.svg`), svgContent);
}

console.log('Encoding frames to public/assets/vid/logo.mp4...');

const ffmpeg = spawn('ffmpeg', [
  '-y',
  '-r', String(FPS),
  '-i', path.join(tmpDir, 'frame_%04d.svg'),
  '-c:v', 'libx264',
  '-pix_fmt', 'yuv420p',
  '-crf', '18',
  'public/assets/vid/logo.mp4'
]);

ffmpeg.stderr.on('data', (d) => process.stdout.write(d.toString()));
ffmpeg.on('close', (code) => {
  if (code !== 0) {
    console.error('ffmpeg failed with code', code);
    process.exit(1);
  }
  console.log('Encoding header logo...');
  const headerFF = spawn('ffmpeg', [
    '-y',
    '-i', 'public/assets/vid/logo.mp4',
    '-vf', 'crop=in_w:in_w*(128/290):0:(in_h-in_w*(128/290))/2,scale=290:128',
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-crf', '18',
    'public/assets/vid/logo-header.mp4'
  ]);

  headerFF.on('close', () => {
    // Generate posters
    spawn('ffmpeg', ['-y', '-ss', '00:00:03.0', '-i', 'public/assets/vid/logo.mp4', '-vframes', '1', 'public/assets/vid/logo-poster.jpg']).on('close', () => {
      spawn('ffmpeg', ['-y', '-ss', '00:00:03.0', '-i', 'public/assets/vid/logo-header.mp4', '-vframes', '1', 'public/assets/vid/logo-header-poster.jpg']).on('close', () => {
        // Copy to other locations
        fs.cpSync('public/assets/vid', 'assets/vid', { recursive: true });
        fs.cpSync('public/assets/vid', 'site/vid', { recursive: true });
        // Clean up tmp_frames
        fs.rmSync(tmpDir, { recursive: true, force: true });
        console.log('COMPLETE! Truly animated logo videos and posters created!');
      });
    });
  });
});
