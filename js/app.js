/**
 * app.js — Screen navigation & app state
 */

let selectedFrameId = null;

/* ===== SCREEN NAVIGATION ===== */
function goTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');

  if (screenId === 'screen-frame') {
    buildFrameGrid();
  }
  if (screenId === 'screen-camera') {
    startCamera();
    retakeAll();
  } else {
    stopCamera();
  }
  if (screenId === 'screen-result') {
    renderFinalStrip();
  }
}

/* ===== FRAME GRID BUILD ===== */
function buildFrameGrid() {
  const grid = document.getElementById('frameGrid');
  grid.innerHTML = '';

  FRAMES.forEach(frame => {
    const card = document.createElement('div');
    card.className = 'frame-card' + (frame.id === selectedFrameId ? ' selected' : '');
    card.dataset.frameId = frame.id;
    card.onclick = () => selectFrame(frame.id);

    const canvas = document.createElement('canvas');
    canvas.className = 'frame-preview-canvas';
    card.appendChild(canvas);

    const label = document.createElement('div');
    label.className = 'frame-label';
    label.textContent = frame.name;
    card.appendChild(label);

    const check = document.createElement('div');
    check.className = 'frame-check';
    check.textContent = '✓';
    card.appendChild(check);

    grid.appendChild(card);

    // Render preview asynchronously
    requestAnimationFrame(() => renderFramePreview(canvas, frame.id));
  });
}

function selectFrame(frameId) {
  selectedFrameId = frameId;
  document.querySelectorAll('.frame-card').forEach(card => {
    card.classList.toggle('selected', card.dataset.frameId === frameId);
  });
}

/* ===== CAMERA FLOW ===== */
function proceedToCamera() {
  if (!selectedFrameId) {
    // Auto-select first frame if none chosen
    if (FRAMES.length > 0) {
      selectedFrameId = FRAMES[0].id;
    }
  }
  goTo('screen-camera');
}

/* ===== RESTART ===== */
function restartSession() {
  selectedFrameId = null;
  capturedPhotos = [];
  photoCount = 0;
  goTo('screen-landing');
}

/* ===== INIT ===== */
window.addEventListener('DOMContentLoaded', () => {
  // Pre-select first frame
  if (FRAMES.length > 0) selectedFrameId = FRAMES[0].id;
});
