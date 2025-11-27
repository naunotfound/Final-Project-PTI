# SCELE-NG

SCELE-NG adalah evolusi dari website SCELE tercinta yang berbasis React + Tailwind yang menyatukan dashboard mahasiswa, katalog kursus, manajemen tugas, hingga profil dosen/pengajar dalam satu antarmuka responsif. Proyek ini dikembangkan sebagai Final Project SBF PTI.

## 🌟 Fitur Utama

- **Dashboard adaptif** – menampilkan kursus terbaru, kursus populer, statistik kemajuan, aktivitas terkini, serta daftar pengajar populer.
- **Katalog Kursus interaktif** – memuat data dari `src/temp/courses.json`, dilengkapi pencarian real-time, kartu responsif (`SmallCourseCard`), dan tampilan detail course penuh.
- **Manajemen Kursus Admin** – halaman profil memanfaatkan data `admin_courses.json` untuk menampilkan course yang diunggah, lengkap dengan modul upload/preview materi.
- **Detail Course reusable** – komponen `CourseDetailView` digunakan ulang pada dashboard dan katalog untuk konsistensi UI/UX.
- **Dark Mode global** – toggle tema tersimpan di `localStorage`, menerapkan CSS variable pada seluruh aplikasi.
- **Navigasi multi-device** – sidebar untuk desktop, bottom nav untuk mobile, masing-masing dengan ikon Lucide.
- **Autentikasi simulasi** – halaman Login/Register dengan alur berpindah halaman tanpa reload.

## 🧱 Struktur Proyek

```
src/
├── App.js             # Root layout, routing antar halaman, kontrol tema
├── index.js           # Entry point React
├── index.css          # Tailwind + global style + dark mode variables
├── components/
│   ├── home.js        # Dashboard utama
│   ├── courses.js     # Halaman katalog kursus
│   ├── assignments.js # PandaAI / tugas
│   ├── profile.js     # Profil + manajemen course admin
│   ├── sidebar.js     # Item navigasi (desktop)
│   └── subcomponents/
│       ├── interface-course.js # SmallCourseCard
│       ├── course-detail.js    # Tampilan detail course reusable
│       └── admin-course.js     # Daftar course milik admin
└── temp/
	├── courses.json        # Data kursus publik
	└── admin_courses.json  # Data kursus yang dibuat admin
```

## 🚀 Cara Menjalankan

Pastikan Node.js dan npm sudah terpasang.

```bash
git clone https://github.com/naunotfound/Final-Project-PTI.git
cd Final-Project-PTI
npm install
npm start
```

Aplikasi akan berjalan di `http://localhost:3000`.

## 🛠️ Stack Teknologi

- **React 18** – komponen fungsional dengan hooks (state, memo, effect).
- **Tailwind CSS** – styling utility-first + custom CSS variable untuk dark mode.
- **Lucide Icons** – ikon konsisten (header, sidebar, cards).
- **JSON sebagai data source** – memudahkan simulasi backend/REST API.

## 🔄 Alur Tema (Light/Dark)

1. App mendeteksi preferensi awal (`localStorage` → `prefers-color-scheme`).
2. State `theme` diset pada root `<div>` dan `document.documentElement.dataset.theme`.
3. `index.css` memakai CSS variable (`--surface-body`, `--text-primary`, dll.).
4. Toggle Sun/Moon di header mengubah state dan menyimpan preferensi.

## 📚 Panduan Pengembangan

- Tambahkan data kursus baru melalui `src/temp/*.json`.
- Gunakan komponen kecil (misal `SmallCourseCard`) untuk konsistensi UI.
- Ikuti pola hook yang ada (state/pencarian di dashboard dan courses).
- Saat menambah fitur, perhatikan dukungan dark mode (gunakan warna via CSS variable atau Tailwind neutral).

## 🧪 Rencana Pengujian Lanjut (opsional)

- Testing unit untuk komponen card/detail dengan React Testing Library.
- Snapshot test untuk memastikan tema tidak merusak layout.
- Integrasi data dinamis (misal fetch API) dapat ditambahkan dengan fallback JSON yang sudah ada.

---

Jika ada pertanyaan atau ingin berkontribusi, buat issue/pull request pada repository ini. Semoga dokumentasi ini membantu Anda memahami arsitektur SCELE-NG dan mempercepat pengembangan fitur berikutnya! ✨
