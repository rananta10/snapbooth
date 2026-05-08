/**
 * frames.js — Frame definitions & canvas rendering
 * Each frame is rendered programmatically using Canvas 2D API
 */

const FRAMES = [
  {
    id: 'vintage',
    name: 'Vintage',
    render: renderVintage,
    filter: 'sepia(0.6) contrast(1.1) brightness(0.95)'
  },
  {
    id: 'calm-softly',
    name: 'Calm Softly',
    render: renderCalmSoftly,
    filter: 'saturate(0.7) brightness(1.05) hue-rotate(5deg)'
  },
  {
    id: 'dark',
    name: 'Dark',
    render: renderDark,
    filter: 'brightness(0.8) contrast(1.2)'
  },
  {
    id: 'jeans-navy',
    name: 'Jeans Navy',
    render: renderJeansNavy,
    filter: 'saturate(1.2) hue-rotate(-10deg) brightness(0.9)'
  },
  {
    id: 'coklat-koran',
    name: 'Coklat Koran',
    render: renderCoklatKoran,
    filter: 'sepia(0.8) contrast(1.15) grayscale(0.2)'
  },
  {
    id: 'f1',
    name: 'F1 Grand Prix',
    render: renderF1,
    filter: 'saturate(1.3) contrast(1.1)'
  }
];

/* ---- Canvas strip dimensions ---- */
const STRIP_W = 400;
const STRIP_H = 1200;
const PHOTO_W = 320;
const PHOTO_H = 240;
const PHOTO_X = 40;
const PHOTO_GAP = 20;
const PHOTO_OFFSET_Y = 60;

/* ============================================================
   VINTAGE FRAME
   Warm cream border, ornate corners, aged look
   ============================================================ */
function renderVintage(ctx, w, h, photos) {
  // Background — warm parchment
  ctx.fillStyle = '#e8dcc8';
  ctx.fillRect(0, 0, w, h);

  // Aged texture grain
  for (let i = 0; i < 4000; i++) {
    ctx.fillStyle = `rgba(80,50,20,${Math.random() * 0.04})`;
    ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
  }

  // Border — double rule
  ctx.strokeStyle = '#8b6a3a';
  ctx.lineWidth = 3;
  ctx.strokeRect(12, 12, w - 24, h - 24);
  ctx.lineWidth = 1;
  ctx.strokeRect(18, 18, w - 36, h - 36);

  // Photo slots
  photos.forEach((img, i) => {
    const py = PHOTO_OFFSET_Y + i * (PHOTO_H + PHOTO_GAP);
    if (img) {
      // Sepia overlay on photo area
      ctx.save();
      ctx.filter = 'sepia(0.5) contrast(1.1)';
      ctx.drawImage(img, PHOTO_X, py, PHOTO_W, PHOTO_H);
      ctx.restore();
    } else {
      ctx.fillStyle = '#d5c4a8';
      ctx.fillRect(PHOTO_X, py, PHOTO_W, PHOTO_H);
      ctx.strokeStyle = '#b8a07a';
      ctx.lineWidth = 1;
      ctx.strokeRect(PHOTO_X, py, PHOTO_W, PHOTO_H);
    }
    // Photo shadow/edge
    ctx.fillStyle = 'rgba(80,50,20,0.15)';
    ctx.fillRect(PHOTO_X, py + PHOTO_H - 6, PHOTO_W, 6);
  });

  // Ornate corner flourishes
  const corners = [[24,24], [w-24,24], [24,h-24], [w-24,h-24]];
  corners.forEach(([cx, cy]) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.strokeStyle = '#8b6a3a';
    ctx.lineWidth = 1.5;
    // Diamond shape
    ctx.beginPath();
    ctx.moveTo(0, -12); ctx.lineTo(12, 0); ctx.lineTo(0, 12); ctx.lineTo(-12, 0);
    ctx.closePath(); ctx.stroke();
    ctx.fillStyle = '#c9a96e';
    ctx.fill();
    ctx.restore();
  });

  // Title text
  ctx.fillStyle = '#5a3e1b';
  ctx.font = 'italic 20px "Playfair Display", serif';
  ctx.textAlign = 'center';
  ctx.fillText('✦ Memories ✦', w / 2, 45);

  // Bottom date area
  const now = new Date();
  const dateStr = now.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
  ctx.font = '11px "DM Mono", monospace';
  ctx.fillStyle = '#7a5c30';
  ctx.fillText(dateStr, w / 2, h - 28);
}

/* ============================================================
   CALM SOFTLY FRAME
   Pastel lavender/mint, rounded, airy & dreamy
   ============================================================ */
function renderCalmSoftly(ctx, w, h, photos) {
  // Soft gradient bg
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#e8e0f0');
  grad.addColorStop(0.5, '#d8eff0');
  grad.addColorStop(1, '#f0e8f5');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Subtle dot pattern
  for (let x = 0; x < w; x += 18) {
    for (let y = 0; y < h; y += 18) {
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(150,130,200,0.12)';
      ctx.fill();
    }
  }

  // Border — soft rounded
  ctx.save();
  roundRect(ctx, 10, 10, w - 20, h - 20, 16);
  ctx.strokeStyle = 'rgba(170,140,210,0.5)';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();

  // Photo slots
  photos.forEach((img, i) => {
    const py = PHOTO_OFFSET_Y + i * (PHOTO_H + PHOTO_GAP);
    ctx.save();
    roundRect(ctx, PHOTO_X, py, PHOTO_W, PHOTO_H, 8);
    ctx.clip();
    if (img) {
      ctx.drawImage(img, PHOTO_X, py, PHOTO_W, PHOTO_H);
    } else {
      ctx.fillStyle = '#d8d0e8';
      ctx.fillRect(PHOTO_X, py, PHOTO_W, PHOTO_H);
    }
    ctx.restore();
    // Photo border
    ctx.save();
    roundRect(ctx, PHOTO_X, py, PHOTO_W, PHOTO_H, 8);
    ctx.strokeStyle = 'rgba(160,130,200,0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  });

  // Header
  ctx.fillStyle = '#8a70b0';
  ctx.font = '16px "Cormorant Garamond", serif';
  ctx.textAlign = 'center';
  ctx.fillText('softly captured', w / 2, 42);

  // Small stars/hearts
  const decor = ['✦', '♡', '✦'];
  decor.forEach((d, i) => {
    ctx.fillStyle = 'rgba(160,130,200,0.5)';
    ctx.font = '10px serif';
    ctx.fillText(d, w / 2 - 30 + i * 30, h - 24);
  });

  const now = new Date();
  ctx.fillStyle = '#a090c0';
  ctx.font = '10px "DM Mono", monospace';
  ctx.fillText(now.toLocaleDateString('id-ID'), w / 2, h - 12);
}

/* ============================================================
   DARK FRAME
   Deep black, neon accent lines, moody editorial
   ============================================================ */
function renderDark(ctx, w, h, photos) {
  ctx.fillStyle = '#080808';
  ctx.fillRect(0, 0, w, h);

  // Subtle grid
  ctx.strokeStyle = 'rgba(255,255,255,0.03)';
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 20) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
  }
  for (let y = 0; y < h; y += 20) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }

  // Neon border
  ctx.strokeStyle = 'rgba(220,50,120,0.7)';
  ctx.lineWidth = 1;
  ctx.strokeRect(8, 8, w - 16, h - 16);
  ctx.strokeStyle = 'rgba(220,50,120,0.2)';
  ctx.lineWidth = 8;
  ctx.strokeRect(8, 8, w - 16, h - 16);

  // Glow corners
  [[8,8],[w-8,8],[8,h-8],[w-8,h-8]].forEach(([cx,cy]) => {
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
    g.addColorStop(0, 'rgba(220,50,120,0.3)');
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.fillRect(cx-40, cy-40, 80, 80);
  });

  // Photos
  photos.forEach((img, i) => {
    const py = PHOTO_OFFSET_Y + i * (PHOTO_H + PHOTO_GAP);
    if (img) {
      ctx.drawImage(img, PHOTO_X, py, PHOTO_W, PHOTO_H);
    } else {
      ctx.fillStyle = '#181818';
      ctx.fillRect(PHOTO_X, py, PHOTO_W, PHOTO_H);
    }
    // Neon edge
    ctx.strokeStyle = 'rgba(220,50,120,0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(PHOTO_X, py, PHOTO_W, PHOTO_H);
  });

  // Header text
  ctx.fillStyle = '#dc3278';
  ctx.font = '700 22px "Space Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('DARK ROOM', w / 2, 44);

  const now = new Date();
  ctx.fillStyle = 'rgba(220,50,120,0.5)';
  ctx.font = '9px "Space Mono", monospace';
  ctx.fillText(now.toISOString().slice(0, 10), w / 2, h - 20);
}

/* ============================================================
   JEANS NAVY FRAME
   Denim texture look, white stitching, casual cool
   ============================================================ */
function renderJeansNavy(ctx, w, h, photos) {
  // Deep navy bg
  ctx.fillStyle = '#1a2744';
  ctx.fillRect(0, 0, w, h);

  // Denim weave texture
  for (let x = 0; x < w; x += 3) {
    for (let y = 0; y < h; y += 3) {
      const v = (x + y) % 6 < 3 ? 0.06 : 0.02;
      ctx.fillStyle = `rgba(255,255,255,${v})`;
      ctx.fillRect(x, y, 2, 2);
    }
  }

  // White stitching border (dashed)
  ctx.strokeStyle = 'rgba(255,255,255,0.8)';
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 6]);
  ctx.strokeRect(14, 14, w - 28, h - 28);
  ctx.setLineDash([]);

  // Photo slots
  photos.forEach((img, i) => {
    const py = PHOTO_OFFSET_Y + i * (PHOTO_H + PHOTO_GAP);
    if (img) {
      ctx.drawImage(img, PHOTO_X, py, PHOTO_W, PHOTO_H);
    } else {
      ctx.fillStyle = '#253660';
      ctx.fillRect(PHOTO_X, py, PHOTO_W, PHOTO_H);
    }
    // White stitch frame for each photo
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(PHOTO_X - 4, py - 4, PHOTO_W + 8, PHOTO_H + 8);
    ctx.setLineDash([]);
  });

  // Header — patch label style
  ctx.fillStyle = 'rgba(255,255,255,0.12)';
  ctx.fillRect(w/2 - 80, 18, 160, 36);
  ctx.fillStyle = '#e0e8ff';
  ctx.font = '700 16px "Space Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('DENIM DAYS', w / 2, 41);

  // Rivet dots
  [[20,20],[w-20,20],[20,h-20],[w-20,h-20]].forEach(([rx,ry]) => {
    ctx.beginPath();
    ctx.arc(rx, ry, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#c0a060';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(rx, ry, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#e8c880';
    ctx.fill();
  });

  const now = new Date();
  ctx.fillStyle = 'rgba(200,210,255,0.5)';
  ctx.font = '9px "DM Mono", monospace';
  ctx.fillText(now.toLocaleDateString('id-ID'), w / 2, h - 18);
}

/* ============================================================
   COKLAT KORAN (Newspaper Brown)
   Aged newsprint, serif headlines, editorial columns
   ============================================================ */
function renderCoklatKoran(ctx, w, h, photos) {
  // Newsprint bg
  ctx.fillStyle = '#d4c8a8';
  ctx.fillRect(0, 0, w, h);

  // Aged stain blotches
  for (let i = 0; i < 8; i++) {
    const bx = Math.random() * w;
    const by = Math.random() * h;
    const gr = ctx.createRadialGradient(bx, by, 0, bx, by, 60 + Math.random() * 80);
    gr.addColorStop(0, 'rgba(120,80,30,0.06)');
    gr.addColorStop(1, 'transparent');
    ctx.fillStyle = gr;
    ctx.fillRect(0, 0, w, h);
  }

  // Vertical column lines
  ctx.strokeStyle = 'rgba(80,50,20,0.2)';
  ctx.lineWidth = 0.5;
  [PHOTO_X - 10, PHOTO_X + PHOTO_W + 10].forEach(x => {
    ctx.beginPath(); ctx.moveTo(x, 30); ctx.lineTo(x, h - 30); ctx.stroke();
  });

  // Header rule lines
  ctx.strokeStyle = '#5a3a15';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(20, 30); ctx.lineTo(w - 20, 30); ctx.stroke();
  ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(20, 34); ctx.lineTo(w - 20, 34); ctx.stroke();

  // Masthead
  ctx.fillStyle = '#2a1a08';
  ctx.font = '700 28px "Playfair Display", serif';
  ctx.textAlign = 'center';
  ctx.fillText('THE PHOTO GAZETTE', w / 2, 26);

  // Subline
  ctx.font = '9px "DM Mono", monospace';
  ctx.fillStyle = '#5a3a15';
  const now = new Date();
  ctx.fillText(`VOL. I  ·  ${now.toLocaleDateString('id-ID', { dateStyle: 'long' }).toUpperCase()}  ·  EDISI KHUSUS`, w / 2, h - 28);

  // Bottom rule
  ctx.strokeStyle = '#5a3a15';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(20, h - 34); ctx.lineTo(w - 20, h - 34); ctx.stroke();
  ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(20, h - 38); ctx.lineTo(w - 20, h - 38); ctx.stroke();

  // Photos
  photos.forEach((img, i) => {
    const py = PHOTO_OFFSET_Y + i * (PHOTO_H + PHOTO_GAP);
    ctx.save();
    if (img) {
      ctx.filter = 'grayscale(0.6) sepia(0.4) contrast(1.1)';
      ctx.drawImage(img, PHOTO_X, py, PHOTO_W, PHOTO_H);
    } else {
      ctx.fillStyle = '#c8ba98';
      ctx.fillRect(PHOTO_X, py, PHOTO_W, PHOTO_H);
    }
    ctx.restore();
    ctx.strokeStyle = '#8a6030';
    ctx.lineWidth = 1;
    ctx.strokeRect(PHOTO_X, py, PHOTO_W, PHOTO_H);

    // Caption line
    ctx.fillStyle = 'rgba(60,35,10,0.6)';
    ctx.font = 'italic 8px "Playfair Display", serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Fig. ${i + 1}  —  Dokumentasi Pribadi`, PHOTO_X + 4, py + PHOTO_H + 12);
    ctx.textAlign = 'center';
  });
}

/* ============================================================
   F1 GRAND PRIX FRAME
   Racing red/black, speed lines, circuit-board style
   ============================================================ */
function renderF1(ctx, w, h, photos) {
  // Carbon fiber bg
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, w, h);

  // Carbon weave
  for (let x = 0; x < w; x += 8) {
    for (let y = 0; y < h; y += 8) {
      const isAlt = ((Math.floor(x / 8) + Math.floor(y / 8)) % 2) === 0;
      ctx.fillStyle = isAlt ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.1)';
      ctx.fillRect(x, y, 8, 8);
    }
  }

  // Red speed stripe — left
  ctx.fillStyle = '#e10600';
  ctx.fillRect(0, 0, 8, h);
  // Thinner accent stripe
  ctx.fillStyle = '#ff4433';
  ctx.fillRect(9, 0, 3, h);

  // Right stripe
  ctx.fillStyle = '#e10600';
  ctx.fillRect(w - 8, 0, 8, h);
  ctx.fillStyle = '#ff4433';
  ctx.fillRect(w - 11, 0, 3, h);

  // Checkered flag top bar
  const checkSize = 12;
  const checkCount = Math.floor(w / checkSize);
  for (let c = 0; c < checkCount; c++) {
    for (let r = 0; r < 3; r++) {
      ctx.fillStyle = (c + r) % 2 === 0 ? '#ffffff' : '#000000';
      ctx.fillRect(c * checkSize, r * checkSize, checkSize, checkSize);
    }
  }

  // Header
  ctx.fillStyle = '#e10600';
  ctx.font = '700 26px "Bebas Neue", sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '0.2em';
  ctx.fillText('GRAND PRIX MOMENTS', w / 2, 72);

  // Speed lines behind photos
  ctx.strokeStyle = 'rgba(225,6,0,0.15)';
  ctx.lineWidth = 1;
  for (let sl = 0; sl < 20; sl++) {
    const slY = 80 + sl * 58;
    ctx.beginPath();
    ctx.moveTo(0, slY);
    ctx.lineTo(w, slY);
    ctx.stroke();
  }

  // Photos
  photos.forEach((img, i) => {
    const py = PHOTO_OFFSET_Y + 36 + i * (PHOTO_H + PHOTO_GAP);
    if (img) {
      ctx.drawImage(img, PHOTO_X, py, PHOTO_W, PHOTO_H);
    } else {
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(PHOTO_X, py, PHOTO_W, PHOTO_H);
    }
    // Red border with corner tabs
    ctx.strokeStyle = '#e10600';
    ctx.lineWidth = 2;
    ctx.strokeRect(PHOTO_X, py, PHOTO_W, PHOTO_H);
    // Corner markers
    [[PHOTO_X, py],[PHOTO_X+PHOTO_W, py],[PHOTO_X, py+PHOTO_H],[PHOTO_X+PHOTO_W, py+PHOTO_H]].forEach(([mx,my]) => {
      ctx.fillStyle = '#e10600';
      ctx.fillRect(mx - 5, my - 5, 10, 10);
    });
    // Lap number
    ctx.fillStyle = 'rgba(225,6,0,0.8)';
    ctx.font = '700 10px "Space Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`LAP ${i + 1}`, PHOTO_X + 6, py + 16);
    ctx.textAlign = 'center';
  });

  // Checkered bottom
  for (let c = 0; c < checkCount; c++) {
    for (let r = 0; r < 3; r++) {
      ctx.fillStyle = (c + r) % 2 === 0 ? '#ffffff' : '#000000';
      ctx.fillRect(c * checkSize, h - 36 + r * checkSize, checkSize, checkSize);
    }
  }

  // Bottom text
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.font = '9px "Space Mono", monospace';
  ctx.textAlign = 'center';
  const now = new Date();
  ctx.fillText(`RACE DAY  ·  ${now.getFullYear()}  ·  PODIUM FINISH`, w / 2, h - 6);
}

/* ============================================================
   UTILITY: roundRect path helper
   ============================================================ */
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/* ============================================================
   Generate preview thumbnail for frame card
   ============================================================ */
function renderFramePreview(canvas, frameId) {
  const frame = FRAMES.find(f => f.id === frameId);
  if (!frame) return;
  const ctx = canvas.getContext('2d');
  canvas.width = 200;
  canvas.height = 300;
  const scaleX = 200 / STRIP_W;
  const scaleY = 300 / STRIP_H;
  ctx.save();
  ctx.scale(scaleX, scaleY);
  frame.render(ctx, STRIP_W, STRIP_H, [null, null, null, null]);
  ctx.restore();
}
