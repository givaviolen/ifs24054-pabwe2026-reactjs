# 🔎 Lost & Founds — ReactJS

Aplikasi web **Lost & Founds** untuk melaporkan, mencari, dan mengelola barang hilang maupun barang temuan. Dibangun dengan **ReactJS (JavaScript)**, **Redux Toolkit**, dan **Tailwind CSS v4**, serta menggunakan **Delcom Open API** sebagai sumber data.

> Nama repositori: `{username}-pabwer2026-reactjs` (contoh: `ifs18005-pabwer2026-reactjs`)

![React](https://img.shields.io/badge/React-JavaScript-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?logo=vite&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-Runtime-000000?logo=bun&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-State-764ABC?logo=redux&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-Testing-6E9F18?logo=vitest&logoColor=white)

---

## 📑 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Fitur Utama](#-fitur-utama)
- [Teknologi](#-teknologi)
- [Struktur Proyek](#-struktur-proyek)
- [Memulai](#-memulai)
- [Konfigurasi Environment](#-konfigurasi-environment)
- [Skrip yang Tersedia](#-skrip-yang-tersedia)
- [Arsitektur & Modul](#-arsitektur--modul)
- [Daftar Rute](#-daftar-rute)
- [Endpoint API](#-endpoint-api)
- [Pengujian](#-pengujian)
- [Catatan Penamaan](#-catatan-penamaan)

---

## 📖 Tentang Proyek

Aplikasi ini memungkinkan pengguna untuk:

- Membuat laporan **barang hilang** atau **barang ditemukan**.
- Memantau status penyelesaian laporan.
- Melihat statistik harian dan bulanan.
- Mengelola profil dan melihat daftar pengguna lain.

Seluruh data diambil dari REST API berikut:
👉 [https://open-api.delcom.org/docs/1.0/api-lost-founds](https://open-api.delcom.org/docs/1.0/api-lost-founds)

**Base URL API:** `https://open-api.delcom.org/api/v1`

---

## ✨ Fitur Utama

### 🔐 Autentikasi
- Login dan registrasi akun dengan validasi form.
- Penyimpanan token di `localStorage` dan otomatisasi header `Authorization: Bearer <token>`.
- Pengalihan otomatis jika pengguna sudah/belum terautentikasi.

### 📦 Lost & Founds
- Daftar laporan dengan filter **status** (`lost` / `found`), **penyelesaian** (`is_completed`), dan **kepemilikan** (`is_me`).
- **Live search** berdasarkan kata kunci.
- Dashboard ringkasan: *Total*, *Barang Hilang*, *Barang Ditemukan*, dan *Selesai*.
- Tambah, ubah, dan hapus laporan.
- Unggah/ganti foto cover dengan **pratinjau langsung**.
- Halaman detail lengkap (foto cover, pelapor, status, tanggal, deskripsi).
- Statistik harian dan bulanan.

### 👤 Pengguna & Profil
- Daftar seluruh pengguna sistem.
- Ubah informasi profil, unggah foto avatar, dan ganti kata sandi.

### 🎨 UI/UX
- Desain responsif dengan **Tailwind CSS v4**.
- Sidebar berbentuk *drawer* pada perangkat mobile.
- Dialog notifikasi interaktif dengan **SweetAlert2**.
- Tipografi menggunakan **Google Fonts** (Plus Jakarta Sans / Inter).

---

## 🛠 Teknologi

| Kategori | Teknologi |
|---|---|
| Runtime & Package Manager | [Bun](https://bun.sh) |
| Framework UI | [React](https://react.dev) (JavaScript) |
| Build Tool | [Vite](https://vite.dev) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) (`@tailwindcss/vite`) |
| Ikon | `react-icons` / `tabler-icons` |
| State Management | [Redux Toolkit](https://redux-toolkit.js.org) + `react-redux` |
| Routing | `react-router-dom` |
| Notifikasi | [SweetAlert2](https://sweetalert2.github.io) |
| Pengujian | [Vitest](https://vitest.dev), jsdom, Testing Library |

---

## 📁 Struktur Proyek

```
{username}-pabwer2026-reactjs/
├── index.html                  # Entry HTML + konfigurasi Google Fonts
├── vite.config.js              # Port, DELCOM_BASEURL, Vitest & coverage
├── .env                        # Konfigurasi lokal (jangan di-commit)
├── .env.example                # Contoh konfigurasi environment
└── src/
    ├── main.jsx                # Provider (Redux) + BrowserRouter
    ├── App.jsx                 # Deklarasi rute & route guarding
    ├── store.js                # Redux store terpusat
    ├── setupTests.js           # Setup Vitest + jest-dom
    ├── test-utils.jsx          # renderWithProviders
    │
    ├── helpers/
    │   ├── apiHelper.js        # Wrapper fetch, token, query params
    │   └── toolsHelper.js      # SweetAlert2 dialogs, formatDate
    │
    ├── hooks/
    │   └── useInput.js         # Custom hook form input
    │
    └── features/
        ├── auth/
        │   ├── api/authApi.js
        │   ├── states/         # actions, thunks, reducers
        │   ├── layouts/AuthLayout.jsx
        │   └── pages/          # LoginPage, RegisterPage
        │
        ├── users/
        │   ├── api/userApi.js
        │   ├── states/
        │   └── pages/          # UsersPage, ProfilePage
        │
        └── lost-founds/
            ├── api/lostFoundApi.js
            ├── states/
            ├── layouts/LostFoundLayout.jsx
            ├── components/     # NavbarComponent, SidebarComponent
            ├── modals/         # AddModal, ChangeModal, ChangeCoverModal
            └── pages/          # HomePage, DetailPage
```

---

## 🚀 Memulai

### Prasyarat

- [Bun](https://bun.sh) terbaru
- Git

### Instalasi

```bash
# 1. Clone repositori
git clone https://github.com/<username>/{username}-pabwer2026-reactjs.git
cd {username}-pabwer2026-reactjs

# 2. Install dependensi
bun install

# 3. Salin file environment
cp .env.example .env

# 4. Jalankan server development
bun run dev
```

Aplikasi akan berjalan di `http://localhost:<APP_PORT>`.

### Inisialisasi dari Nol (opsional)

```bash
bun create vite {username}-pabwer2026-reactjs --template react
cd {username}-pabwer2026-reactjs
bun install
bun add @reduxjs/toolkit react-redux react-router-dom sweetalert2 react-icons
bun add tailwindcss @tailwindcss/vite
bun add -d vitest jsdom @vitest/coverage-v8 @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

---

## ⚙️ Konfigurasi Environment

Buat berkas `.env` berdasarkan `.env.example`:

```env
DELCOM_BASEURL=https://open-api.delcom.org/api/v1
APP_PORT=5173
```

| Variabel | Deskripsi | Contoh |
|---|---|---|
| `DELCOM_BASEURL` | Base URL REST API Delcom | `https://open-api.delcom.org/api/v1` |
| `APP_PORT` | Port server development lokal | `5173` |

Kedua variabel dibaca oleh `vite.config.js`; `DELCOM_BASEURL` didefinisikan sebagai konstanta global (`define`) agar dapat diakses di seluruh aplikasi.

---

## 📜 Skrip yang Tersedia

| Perintah | Fungsi |
|---|---|
| `bun run dev` | Menjalankan server development |
| `bun run build` | Build produksi |
| `bun run preview` | Pratinjau hasil build |
| `bun run test` | Menjalankan seluruh pengujian (Vitest) |
| `bun run coverage` | Menjalankan pengujian dengan laporan coverage |

---

## 🧩 Arsitektur & Modul

Proyek menggunakan arsitektur **feature-based**: setiap fitur memiliki lapisan `api`, `states`, `pages`, dan (bila perlu) `layouts`, `components`, `modals`.

### Helper & Hooks

| Berkas | Fungsi |
|---|---|
| `helpers/apiHelper.js` | Wrapper `fetch` ke API Delcom (query params, bearer token), serta `getAccessToken` & `putAccessToken` |
| `helpers/toolsHelper.js` | `showSuccessDialog`, `showErrorDialog`, `showConfirmDialog`, `formatDate` |
| `hooks/useInput.js` | Hook reusable untuk two-way binding pada input form |

### State Management (Redux)

Semua *slice* digabungkan di `src/store.js` melalui `configureStore`.

| Fitur | State |
|---|---|
| **Auth** | `isAuthLogin`, `isAuthRegister`, `isAuthLogout` |
| **Users** | `users`, `user`, `profile`, `isProfile`, `isChangeProfile`, `isChangeProfilePhoto`, `isChangeProfilePassword` |
| **Lost & Founds** | `lostFounds`, `lostFound`, `isLostFound`, `isLostFoundAdd`, `isLostFoundAdded`, `isLostFoundChange`, `isLostFoundChanged`, `isLostFoundChangeCover`, `isLostFoundChangedCover`, `isLostFoundDelete`, `isLostFoundDeleted`, `lostFoundStats` |

### Layout

- **`AuthLayout`** — kontainer form responsif, visual banner, dan redirect bila sudah login.
- **`LostFoundLayout`** — Navbar, Sidebar, *route guard* (verifikasi token & pemuatan profil), serta `<Outlet />`.

### Komponen & Modal

| Komponen | Deskripsi |
|---|---|
| `NavbarComponent` | Logo, judul, status sesi, dropdown profil, tombol logout |
| `SidebarComponent` | Menu: Dashboard/Laporan, Statistik, Pengguna, Profil Saya (drawer di mobile) |
| `AddModal` | Form tambah laporan (judul, deskripsi, jenis: hilang/ditemukan) |
| `ChangeModal` | Form ubah laporan + toggle `is_completed` |
| `ChangeCoverModal` | Unggah/ganti cover dengan pratinjau langsung |

---

## 🗺 Daftar Rute

| Rute | Halaman | Akses |
|---|---|---|
| `/auth/login` | LoginPage | Publik |
| `/auth/register` | RegisterPage | Publik |
| `/` | HomePage (daftar & filter laporan) | 🔒 Terproteksi |
| `/lost-founds/:id` | DetailPage | 🔒 Terproteksi |
| `/users` | UsersPage | 🔒 Terproteksi |
| `/profile` | ProfilePage | 🔒 Terproteksi |

---

## 🌐 Endpoint API

Dokumentasi lengkap: [Delcom Lost & Founds API](https://open-api.delcom.org/docs/1.0/api-lost-founds)

### Autentikasi

| Method | Endpoint | Deskripsi |
|---|---|---|
| `POST` | `/auth/login` | Login |
| `POST` | `/auth/register` | Registrasi akun baru |

### Pengguna

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/users` | Daftar pengguna |
| `GET` | `/users/me` | Profil pengguna aktif |
| `PUT` | `/users/me` | Perbarui profil |
| `POST` | `/users/me/photo` | Unggah foto avatar |
| `PUT` | `/users/me/password` | Ganti kata sandi |

### Lost & Founds

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/lost-founds` | Daftar laporan (filter: `status`, `is_completed`, `is_me`) |
| `GET` | `/lost-founds/:id` | Detail laporan |
| `POST` | `/lost-founds` | Tambah laporan |
| `PUT` | `/lost-founds/:id` | Ubah laporan & status penyelesaian |
| `POST` | `/lost-founds/:id/cover` | Unggah/ganti cover |
| `DELETE` | `/lost-founds/:id` | Hapus laporan |
| `GET` | `/lost-founds/stats/daily` | Statistik harian |
| `GET` | `/lost-founds/stats/monthly` | Statistik bulanan |

> Semua endpoint selain login & register memerlukan header `Authorization: Bearer <token>`.

---

## 🧪 Pengujian

Pengujian menggunakan **Vitest** dengan environment **jsdom** dan **@testing-library/jest-dom** (dikonfigurasi di `src/setupTests.js`).

`src/test-utils.jsx` menyediakan `renderWithProviders` untuk me-render komponen dengan Redux Store dan memory router.

**Cakupan pengujian:**

- ✅ Helpers (`apiHelper`, `toolsHelper`)
- ✅ Custom hooks (`useInput`)
- ✅ API callers
- ✅ Action creators & reducers
- ✅ Komponen navigasi (Navbar, Sidebar)
- ✅ Modals
- ✅ Layouts
- ✅ Pages
- ✅ Integrasi `App.test.jsx`
- ✅ Verifikasi `store.test.js`

```bash
# Jalankan test
bun run test

# Jalankan test + coverage (mengikuti threshold di vite.config.js)
bun run coverage
```

---

## 🏷 Catatan Penamaan

Format nama proyek: **`{username}-pabwer2026-reactjs`**
Contoh: `ifs18005-pabwer2026-reactjs`

---

<p align="center">Dibuat untuk keperluan tugas Pengembangan Aplikasi Berbasis Web — 2026</p>\

