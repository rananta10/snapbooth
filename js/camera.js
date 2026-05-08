/**
 * camera.js — Webcam management & photo capture
 */

let stream = null;
let capturedPhotos = []; // array of HTMLImageElement
let photoCount = 0;
const MAX_PHOTOS = 4;

async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
      audio: false
    });
    const video = document.getElementById('videoFeed');
    video.srcObject = stream;
    await video.play();
  } catch (err) {
    alert('Tidak dapat mengakses kamera. Pastikan izin kamera sudah diberikan.\n\n' + err.message);
    console.error('Camera error:', err);
  }
}

function stopCamera() {
  if (stream) {
    stream.getTracks().forEach(t => t.stop());
    stream = null;
  }
}

function takePhoto() {
  if (photoCount >= MAX_PHOTOS) return;

  const btn = document.getElementById('btnShoot');
  btn.disabled = true;

  let count = 3;
  const countEl = document.getElementById('countdown');
  countEl.classList.remove('hidden');
  countEl.textContent = count;

  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      countEl.textContent = count;
    } else {
      clearInterval(interval);
      countEl.classList.add('hidden');
      captureFrame();
      btn.disabled = (photoCount >= MAX_PHOTOS);
    }
  }, 1000);
}

function captureFrame() {
  const video = document.getElementById('videoFeed');
  const canvas = document.getElementById('hiddenCanvas');
  canvas.width = video.videoWidth || 640;
  canvas.height = video.videoHeight || 480;

  const ctx = canvas.getContext('2d');
  // Mirror the capture (since video is mirrored via CSS)
  ctx.save();
  ctx.scale(-1, 1);
  ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
  ctx.restore();

  // Apply selected frame filter
  const frame = FRAMES.find(f => f.id === selectedFrameId);
  if (frame && frame.filter) {
    // We'll apply filter on the final render instead
  }

  // Flash effect
  const flash = document.createElement('div');
  flash.className = 'flash-overlay';
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 400);

  // Convert to image
  const img = new Image();
  img.src = canvas.toDataURL('image/jpeg', 0.9);
  img.onload = () => {
    capturedPhotos[photoCount] = img;
    photoCount++;
    document.getElementById('shotCount').textContent = photoCount;
    addStripPhoto(img);

    if (photoCount >= MAX_PHOTOS) {
      document.getElementById('btnShoot').disabled = true;
      setTimeout(() => goTo('screen-result'), 800);
    }
  };
}

function addStripPhoto(img) {
  const strip = document.getElementById('photoStrip');
  // Clear hint text on first photo
  const hint = strip.querySelector('.strip-hint');
  if (hint) hint.remove();

  const el = document.createElement('img');
  el.src = img.src;
  el.className = 'strip-photo';
  strip.appendChild(el);
}

function retakeAll() {
  capturedPhotos = [];
  photoCount = 0;
  document.getElementById('shotCount').textContent = '0';
  document.getElementById('btnShoot').disabled = false;

  const strip = document.getElementById('photoStrip');
  strip.innerHTML = '<p class="strip-hint">Foto akan muncul di sini</p>';
}
