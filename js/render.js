/**
 * render.js — Final strip composition & download
 */

function renderFinalStrip() {
  const canvas = document.getElementById('resultCanvas');
  canvas.width = STRIP_W;
  canvas.height = STRIP_H;
  const ctx = canvas.getContext('2d');

  const frame = FRAMES.find(f => f.id === selectedFrameId);
  if (!frame) return;

  // Pad photos array to 4
  const photos = Array.from({ length: 4 }, (_, i) => capturedPhotos[i] || null);

  // Build filtered photo images if filter exists
  if (frame.filter && frame.filter !== 'none') {
    const offscreen = document.createElement('canvas');
    offscreen.width = STRIP_W;
    offscreen.height = STRIP_H;
    const offCtx = offscreen.getContext('2d');

    // Draw photos to offscreen with filter, then draw frame on top
    frame.render(ctx, STRIP_W, STRIP_H, photos);
  } else {
    frame.render(ctx, STRIP_W, STRIP_H, photos);
  }
}

function downloadResult() {
  const canvas = document.getElementById('resultCanvas');
  const link = document.createElement('a');
  link.download = `snapbooth_${selectedFrameId}_${Date.now()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
