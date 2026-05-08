# 📸 SnapBooth — Digital Photobooth

Website photobooth digital dengan 6 tema frame yang bisa dipilih.

## Fitur
- 6 tema frame: Vintage, Calm Softly, Dark, Jeans Navy, Coklat Koran, F1 Grand Prix
- Strip foto 4 gambar (seperti photobox asli)
- Countdown timer sebelum capture
- Download hasil sebagai PNG
- Responsive (desktop & mobile)

---

## Struktur Folder

```
photobooth/
├── index.html          ← Entry point utama
├── README.md           ← Dokumentasi ini
├── css/
│   └── style.css       ← Semua styling
└── js/
    ├── frames.js       ← Definisi & render semua frame (Canvas 2D)
    ├── camera.js       ← Akses kamera & capture foto
    ├── render.js       ← Komposisi strip final & download
    └── app.js          ← Navigasi layar & state aplikasi
```

---

## Cara Menjalankan

### 1. Langsung buka (TIDAK disarankan)
Jangan buka `index.html` langsung dengan double-click karena browser akan **block akses kamera** (butuh HTTPS atau localhost).

### 2. Pakai Live Server (VS Code) — PALING MUDAH
1. Install ekstensi **Live Server** di VS Code
2. Klik kanan `index.html` → **Open with Live Server**
3. Browser otomatis buka di `http://127.0.0.1:5500`
4. Izinkan akses kamera saat diminta

### 3. Pakai Python (built-in)
```bash
# Python 3
cd photobooth
python -m http.server 8080

# Buka browser → http://localhost:8080
```

### 4. Pakai Node.js (npx serve)
```bash
cd photobooth
npx serve .

# Buka browser → http://localhost:3000
```

---

## Deploy ke Hosting (Opsional)

Karena ini pure HTML/CSS/JS (tidak ada backend), bisa deploy ke:

| Platform     | Cara                                                   |
|--------------|--------------------------------------------------------|
| **Netlify**  | Drag & drop folder ke netlify.com/drop                 |
| **Vercel**   | `npx vercel` dari folder project                       |
| **GitHub Pages** | Push ke repo, aktifkan Pages di Settings           |

> ⚠️ Hosting WAJIB HTTPS agar kamera bisa diakses di mobile!

---

## Cara Menggunakan Website

1. **Landing** → Klik "Mulai Sesi"
2. **Pilih Frame** → Klik salah satu dari 6 tema
3. **Kamera** → Klik tombol bulat untuk foto (ada countdown 3 detik)
   - Ambil 4 foto berturut-turut
   - Tombol "↺ Ulang" untuk mengulang dari awal
4. **Hasil** → Preview strip muncul, klik "⬇ Download" untuk simpan

---

## Kustomisasi Frame

Edit file `js/frames.js` untuk mengubah tampilan frame.

Setiap frame adalah fungsi dengan signature:
```javascript
function renderNamaFrame(ctx, w, h, photos) {
  // ctx  = Canvas 2D context
  // w, h = dimensi strip (400 x 1200 px)
  // photos = array 4 HTMLImageElement (bisa null jika belum ada foto)
}
```

Tambah frame baru:
```javascript
// 1. Tambah ke array FRAMES di frames.js
const FRAMES = [
  // ...frame yang ada...
  {
    id: 'my-frame',
    name: 'Nama Frame Baru',
    render: renderMyFrame,
    filter: 'none'
  }
];

// 2. Buat fungsi render-nya
function renderMyFrame(ctx, w, h, photos) {
  // Gambar background
  ctx.fillStyle = '#your-color';
  ctx.fillRect(0, 0, w, h);

  // Gambar foto di posisi bawaan
  const PHOTO_X = 40, PHOTO_W = 320, PHOTO_H = 240;
  const PHOTO_OFFSET_Y = 60, PHOTO_GAP = 20;
  
  photos.forEach((img, i) => {
    const py = PHOTO_OFFSET_Y + i * (PHOTO_H + PHOTO_GAP);
    if (img) ctx.drawImage(img, PHOTO_X, py, PHOTO_W, PHOTO_H);
  });
}
```

---

## Troubleshooting

| Masalah | Solusi |
|---------|--------|
| Kamera tidak muncul | Buka via localhost, bukan file:// |
| Izin kamera ditolak | Klik ikon kunci di URL bar → izinkan kamera |
| Foto hitam | Pastikan browser mendukung getUserMedia (Chrome/Firefox/Edge) |
| Layout berantakan di mobile | Gunakan Chrome mobile, rotasi ke portrait |

---

## Tech Stack

- **Vanilla HTML/CSS/JS** — tidak ada framework, tidak ada dependency
- **Canvas 2D API** — untuk render frame & komposisi foto
- **MediaDevices API** — untuk akses webcam
- **Google Fonts** — Bebas Neue, Playfair Display, DM Mono, Space Mono, Cormorant Garamond

