# ifs18005-pabwe2026-reactjs

Praktik Framework JS: ReactJS & NextJS (pabwe-2026-p4)

Berkas pendukung praktikum (`src-latihan-p4.zip`) dapat diunduh dari: https://github.com/auxtern/itdel-praktikum/tree/main/pabwe/2026

## A. Bahan Bacaan

### 1.1 ReactJS

Pelajari ReactJS dari halaman berikut: https://react.dev/learn

## B. Latihan

### 2.1 ReactJS (JavaScript)

#### 2.1.1 Konfigurasi

1. Buat workspace VSCode baru dengan format penamaan `{username}-pabwe2026-p4`. Contoh: `abdullah_ubaid-pabwe2026-p4` atau `ifs18005-pabwe2026-p4`.
2. Buka terminal dan jalankan perintah `bun init`. Pada pilihan `project template` pilih `Blank`.
3. Modifikasi isi file `package.json`, seperti berikut (pada bagian `"name": "abdullah_ubaid-pabwe2026-p4"` ganti dengan username kamu):

```json
{
  "name": "ifs18005-pabwe2026-p4",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  },
  "dependencies": {
    "@reduxjs/toolkit": "^2.12.0",
    "@tabler/icons-react": "^3.48.0",
    "clsx": "^2.1.1",
    "react": "^19.3.0",
    "react-dom": "^19.3.0",
    "react-redux": "^9.3.0",
    "react-router-dom": "^7.18.4",
    "sweetalert2": "^11.26.25",
    "tailwind-merge": "^3.7.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.3.3",
    "@testing-library/jest-dom": "^7.0.1",
    "@testing-library/react": "^16.3.3",
    "@testing-library/user-event": "^14.6.7",
    "@vitejs/plugin-react": "^6.1.1",
    "@vitest/coverage-v8": "^5.0.2",
    "jsdom": "^30.1.1",
    "tailwindcss": "^4.3.3",
    "vite": "^8.3.1",
    "vitest": "^5.0.2"
  }
}
```

4. Buka terminal dan jalankan perintah `bun install`.
5. Hapus file `index.ts` dan `tsconfig.json`.
6. Tambahkan file `.env`, `.env.example`, `index.html` dan `vite.config.js`.
7. Modifikasi isi file `.env`, seperti berikut:

```env
VITE_DELCOM_BASEURL=https://open-api.delcom.org/api/v1
APP_PORT=3000
```

8. Modifikasi isi file `.env.example`, seperti berikut:

```env
VITE_DELCOM_BASEURL=http://localhost:8000/api/v1
APP_PORT=3000
```

9. Modifikasi isi file `index.html`, seperti berikut:

```html
<!doctype html>
<html lang="id">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/logo.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Delcom Todo</title>
  <!-- Google Fonts: Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap"
    rel="stylesheet" />
</head>

<body class="bg-slate-50 text-slate-900 font-sans antialiased min-h-screen">
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>

</html>
```

10. Modifikasi isi file `vite.config.js`, seperti berikut:

```js
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import process from "process";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: Number(env.APP_PORT) || 3000,
    },
    preview: {
      port: Number(env.APP_PORT) || 3000,
    },
    define: {
      DELCOM_BASEURL: JSON.stringify(
        env.VITE_DELCOM_BASEURL || "https://open-api.delcom.org/api/v1"
      ),
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.js",
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html", "lcov"],
        include: ["src/**/*.{js,jsx,ts,tsx}"],
        exclude: [
          "src/main.jsx",
          "src/setupTests.js",
          "src/test-utils.jsx",
          "**/*.test.{js,jsx}",
          "node_modules/**",
        ],
      },
    },
  };
});
```

11. Modifikasi isi file `.gitignore`, seperti berikut:

```gitignore
# dependencies (bun install)
node_modules

# output
out
dist
*.tgz

# code coverage
coverage
*.lcov

# logs
logs
_.log
report.[0-9]_.[0-9]_.[0-9]_.[0-9]_.json

# dotenv environment variable files
.env
.env.development.local
.env.test.local
.env.production.local
.env.local

# caches
.eslintcache
.cache
*.tsbuildinfo

# IntelliJ based IDEs
.idea

# Finder (MacOS) folder config
.DS_Store
```

12. Buat sendiri logo svg atau cari disini: https://www.svgrepo.com. Setelah itu simpan ke lokasi `public/logo.svg`.
13. Tambahkan folder baru dengan nama `src`. Di dalam folder tersebut tambahkan file baru dengan nama `index.css`.
14. Modifikasi isi file `index.css`, seperti berikut:

```css
@import "tailwindcss";

@layer base {
  body {
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  }

  button,
  a,
  [role="button"],
  select,
  label[for],
  label[data-testid],
  summary {
    cursor: pointer;
  }
}
```

#### 2.1.2 Logika Aplikasi

Buat struktur proyek seperti berikut:

```text
src/
├── App.jsx
├── App.test.jsx
├── index.css
├── main.jsx
├── setupTests.js
├── store.js
├── store.test.js
├── test-utils.jsx
├── features/
│   ├── auth/
│   │   ├── api/
│   │   │   ├── authApi.js
│   │   │   └── authApi.test.js
│   │   ├── layouts/
│   │   │   ├── AuthLayout.jsx
│   │   │   └── AuthLayout.test.jsx
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── LoginPage.test.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── RegisterPage.test.jsx
│   │   └── states/
│   │       ├── action.js
│   │       ├── action.test.js
│   │       ├── reducer.js
│   │       └── reducer.test.js
│   ├── todos/
│   │   ├── api/
│   │   │   ├── todoApi.js
│   │   │   └── todoApi.test.js
│   │   ├── components/
│   │   │   ├── NavbarComponent.jsx
│   │   │   ├── NavbarComponent.test.jsx
│   │   │   ├── SidebarComponent.jsx
│   │   │   └── SidebarComponent.test.jsx
│   │   ├── layouts/
│   │   │   ├── TodoLayout.jsx
│   │   │   └── TodoLayout.test.jsx
│   │   ├── modals/
│   │   │   ├── AddModal.jsx
│   │   │   ├── AddModal.test.jsx
│   │   │   ├── ChangeCoverModal.jsx
│   │   │   ├── ChangeCoverModal.test.jsx
│   │   │   ├── ChangeModal.jsx
│   │   │   └── ChangeModal.test.jsx
│   │   ├── pages/
│   │   │   ├── DetailPage.jsx
│   │   │   ├── DetailPage.test.jsx
│   │   │   ├── HomePage.jsx
│   │   │   └── HomePage.test.jsx
│   │   └── states/
│   │       ├── action.js
│   │       ├── action.test.js
│   │       ├── reducer.js
│   │       └── reducer.test.js
│   └── users/
│       ├── api/
│       │   ├── userApi.js
│       │   └── userApi.test.js
│       ├── pages/
│       │   ├── ProfilePage.jsx
│       │   ├── ProfilePage.test.jsx
│       │   ├── UsersPage.jsx
│       │   └── UsersPage.test.jsx
│       └── states/
│           ├── action.js
│           ├── action.test.js
│           ├── reducer.js
│           └── reducer.test.js
├── helpers/
│   ├── apiHelper.js
│   ├── apiHelper.test.js
│   ├── toolsHelper.js
│   └── toolsHelper.test.js
└── hooks/
    ├── useInput.js
    └── useInput.test.js
```

Tahapan pengerjaan:

Unduh file `src-latihan-p4.zip` pada link berikut: [Github](https://github.com/auxtern/itdel-praktikum/tree/main/pabwe/2026)

**a. Modul Helper & Custom Hooks:**

- `src/helpers/apiHelper.js`: Fungsi wrapper HTTP fetch ke backend REST API, otomatisasi header `Authorization: Bearer <token>`, serta penyimpanan/pengambilan token di `localStorage`.
- `src/helpers/toolsHelper.js`: Utilitas dialog notifikasi SweetAlert2 (`showSuccessDialog`, `showErrorDialog`, `showWarningDialog`, `showConfirmDialog`) dan helper formatting.
- `src/hooks/useInput.js`: Custom React hook reusable untuk mengelola `state` dan `change handler` pada input form.

**b. Modul Fitur (Feature-driven):**

- `src/features/auth/`: Modul autentikasi pengguna
  - `api/authApi.js`: Pemanggilan endpoint login (`/auth/login`) dan register (`/auth/register`).
  - `states/`: Action creators, async thunks, dan slice reducers (`isAuthLogin`, `isAuthRegister`, `isAuthLogout`).
  - `layouts/AuthLayout.jsx`: Shell layout antarmuka otentikasi.
  - `pages/`: Halaman formulir login (`LoginPage.jsx`) dan registrasi (`RegisterPage.jsx`).
- `src/features/todos/`: Modul manajemen tugas (Todo)
  - `api/todoApi.js`: Pemanggilan endpoint CRUD todo, status penyelesaian, dan unggah berkas cover todo.
  - `states/`: Action creators, async thunks, dan reducers (`todos`, `todo`, status tambah, ubah, cover, dan hapus).
  - `components/`: Komponen navigasi dashboard (`NavbarComponent.jsx` dan `SidebarComponent.jsx`).
  - `modals/`: Modal pop-up form tambah todo (`AddModal.jsx`), ubah todo (`ChangeModal.jsx`), dan unggah gambar cover (`ChangeCoverModal.jsx`).
  - `layouts/TodoLayout.jsx`: Shell layout dashboard yang menggabungkan navbar, sidebar, dan area konten utama.
  - `pages/`: Halaman daftar todo (`HomePage.jsx`) dan halaman rincian data todo (`DetailPage.jsx`).
- `src/features/users/`: Modul data pengguna & profil
  - `api/userApi.js`: Pemanggilan endpoint daftar pengguna (`/users`), profil saya (`/users/me`), ubah profil, unggah foto, dan ubah kata sandi.
  - `states/`: Action creators, async thunks, dan slice reducers profil & pengguna.
  - `pages/`: Halaman daftar pengguna (`UsersPage.jsx`) dan manajemen profil akun (`ProfilePage.jsx`).

**c. Konfigurasi State Management Terpusat (Redux Store):**

- Menyiapkan konfigurasi store utama pada `src/store.js` menggunakan `configureStore` dari `@reduxjs/toolkit` yang menggabungkan seluruh slice reducer dari fitur `auth`, `users`, dan `todos`.
- Mengintegrasikan `<Provider store={store}>` dan `<BrowserRouter>` pada `src/main.jsx` agar store dan router dapat diakses di seluruh hierarki komponen.

**d. Penataan Rute Aplikasi (`src/App.jsx`):**

- Auth Layout (`/auth`):
  - `/auth/login`: Halaman Login pengguna.
  - `/auth/register`: Halaman Registrasi pengguna baru.
- Todo Layout (`/`):
  - `/`: Halaman Home (Daftar koleksi Todo).
  - `/todos/:todoId`: Halaman Detail Todo berdasarkan ID.
  - `/users`: Halaman Daftar Seluruh Pengguna.
  - `/profile`: Halaman Pengaturan dan Profil Pengguna.

**e. Penulisan Pengujian Otomatis (Testing):**

- Mengonfigurasi `src/setupTests.js` dengan `@testing-library/jest-dom`.
- Membuat fungsi helper `renderWithProviders` pada `src/test-utils.jsx` untuk memfasilitasi render komponen bersama Redux Provider dan MemoryRouter.
- Menulis unit test komprehensif pada setiap modul: helper, hook, API caller, action creators, reducers, komponen antarmuka, modals, layouts, halaman (`pages`), integrasi `src/App.test.jsx`, dan `src/store.test.js`.

#### 2.1.3 Pengujian Aplikasi

1. Pada terminal jalankan perintah:

```bash
bun run test:coverage
```

2. Pada hasil pengujian akan terdapat informasi cakupan kode (coverage).
3. Pastikan pada hasil laporan coverage semuanya **100%**.

#### 2.1.4 Menjalankan Aplikasi

1. Pada terminal jalankan perintah:

```bash
bun run dev
```

2. Setelah berhasil berjalan lihat url pada bagian local. Klik pada link tersebut, yaitu: http://localhost:3000
3. Silahkan lakukan eksplorasi mandiri terkait fitur-fitur aplikasi.

## B. Studi Kasus

### 2.1 Aplikasi Lost & Founds menggunakan ReactJS (JavaScript)

Manfaatkan endpoint berikut: https://open-api.delcom.org/docs/1.0/api-lost-founds sebagai sumber data aplikasi. Aplikasi yang dibuat harus menggunakan bun dan framework JavaScript yaitu ReactJS. Bahasa yang digunakan adalah JavaScript. Gunakan tailwind untuk UI aplikasi, kamu juga dapat memanfaatkan react-icons atau tabler-icons. Gunakan Google Font untuk tipografi aplikasi.

#### 2.1.1 Inisialisasi Proyek & Konfigurasi Lingkungan

- Buat proyek dengan format penamaan `{username}-pabwer2026-reactjs`. Contoh: `ifs18005-pabwe2026-reactjs`.
- Inisialisasi proyek React menggunakan `bun create vite` dengan template React JavaScript.
- Konfigurasi Tailwind CSS v4 (`@tailwindcss/vite` atau Tailwind CSS) dan hubungkan Google Fonts (misal: Plus Jakarta Sans / Inter) pada berkas `index.html`.
- Konfigurasi `vite.config.js` untuk pengaturan port lokal (menggunakan variabel `APP_PORT` dari environment), define konstanta `DELCOM_BASEURL` (arah ke `https://open-api.delcom.org/api/v1`), serta konfigurasi test runner Vitest & coverage threshold.
- Siapkan berkas `.env` dan `.env.example` yang memuat konfigurasi `DELCOM_BASEURL` dan `APP_PORT`.

#### 2.1.2 Modul Helper & Custom Hooks

- `src/helpers/apiHelper.js`: Fungsi wrapper fetch HTTP ke REST API Delcom yang menangani query params, otomatisasi bearer token autentikasi (`Authorization: Bearer <token>`), serta utilitas penyimpanan dan pengambilan token di localStorage (`getAccessToken`, `putAccessToken`).
- `src/helpers/toolsHelper.js`: Utilitas dialog notifikasi interaktif (menggunakan SweetAlert2) seperti pesan sukses (`showSuccessDialog`), pesan error (`showErrorDialog`), dialog konfirmasi aksi (`showConfirmDialog`), serta helper pemformatan tanggal/waktu (`formatDate`).
- `src/hooks/useInput.js`: Custom hook reusable untuk mengelola two-way data binding dan penanganan perubahan nilai (state) pada elemen formulir input.

#### 2.1.3 Arsitektur Fitur Autentikasi (`src/features/auth/`)

- `api/authApi.js`: Integrasi pemanggilan API login (`POST /auth/login`) dan registrasi akun baru (`POST /auth/register`).
- `states/`: Action types, action creators, async thunks, dan slice reducers (`isAuthLogin`, `isAuthRegister`, `isAuthLogout`) untuk penanganan autentikasi berbasis Redux.
- `layouts/AuthLayout.jsx`: Shell layout khusus halaman autentikasi (pusat kontainer form yang responsif, visual banner, dan pengalihan jika pengguna sudah terautentikasi).
- `pages/`: Halaman formulir login (`LoginPage.jsx`) dan formulir registrasi pengguna (`RegisterPage.jsx`) lengkap dengan validasi form.

#### 2.1.4 Arsitektur Fitur Profil & Pengguna (`src/features/users/`)

- `api/userApi.js`: Integrasi endpoint daftar pengguna (`GET /users`), data profil pengguna aktif (`GET /users/me`), pembaruan informasi profil (`PUT /users/me`), unggah foto avatar (`POST /users/me/photo`), dan ganti kata sandi (`PUT /users/me/password`).
- `states/`: Action creators, async thunks, dan slice reducers untuk mengelola state data pengguna (`users`, `user`), data profil (`profile`, `isProfile`), serta status mutasi akun (`isChangeProfile`, `isChangeProfilePhoto`, `isChangeProfilePassword`).
- `pages/`: Halaman eksplorasi daftar semua pengguna sistem (`UsersPage.jsx`) dan halaman manajemen profil pengguna (`ProfilePage.jsx`).

#### 2.1.5 Arsitektur Fitur Utama Lost & Founds (`src/features/lost-founds/`)

- `api/lostFoundApi.js`: Integrasi fungsi API Lost & Founds:
  - Mengambil daftar barang hilang & temuan (`GET /lost-founds`) dengan dukungan filter status (`lost` / `found`), `is_completed` (`1` / `0`), serta kepemilikan `is_me=1`.
  - Melihat detail lengkap laporan barang (`GET /lost-founds/:id`).
  - Menambahkan laporan kehilangan atau penemuan baru (`POST /lost-founds`).
  - Memperbarui data laporan dan status penyelesaian (`PUT /lost-founds/:id`).
  - Mengunggah/mengganti foto bukti atau cover barang (`POST /lost-founds/:id/cover`).
  - Menghapus laporan barang (`DELETE /lost-founds/:id`).
  - Mengambil statistik harian (`GET /lost-founds/stats/daily`) dan bulanan (`GET /lost-founds/stats/monthly`).
- `states/`: Action types, action creators, async thunk functions, dan reducers untuk mengelola:
  - Koleksi data laporan (`lostFounds`, `lostFound`, `isLostFound`).
  - Pelacakan proses aksi: tambah (`isLostFoundAdd`, `isLostFoundAdded`), ubah data (`isLostFoundChange`, `isLostFoundChanged`), ubah cover (`isLostFoundChangeCover`, `isLostFoundChangedCover`), dan hapus (`isLostFoundDelete`, `isLostFoundDeleted`).
  - Pelacakan metrik statistik (`lostFoundStats`).
- `layouts/LostFoundLayout.jsx`: Shell layout utama dengan navigasi bilah atas (`NavbarComponent`), bilah samping (`SidebarComponent`), mekanisme Route Guarding (verifikasi token & pemuatan sesi profil pengguna), serta area konten dinamis (`<Outlet />`).
- `components/`: Komponen navigasi antarmuka:
  - `NavbarComponent.jsx`: Menampilkan logo aplikasi, judul, status sesi, dropdown profil, dan tombol logout.
  - `SidebarComponent.jsx`: Navigasi menu utama (Dashboard/Laporan, Statistik, Pengguna, Profil Saya) dengan dukungan drawer responsif untuk perangkat mobile.
- `modals/`: Komponen dialog modal pop-up:
  - `AddModal.jsx`: Formulir tambah laporan baru (judul, deskripsi, jenis laporan: hilang/ditemukan).
  - `ChangeModal.jsx`: Formulir ubah informasi laporan beserta toggle status selesai (`is_completed`).
  - `ChangeCoverModal.jsx`: Modal unggah/ganti gambar cover dengan fitur pratinjau langsung sebelum diunggah.
- `pages/`: Halaman utama aplikasi:
  - `HomePage.jsx`: Dashboard ringkasan metrik statistik (Total, Barang Hilang, Barang Ditemukan, Selesai), filter interaktif status laporan, pencarian kata kunci (live search), tabel/kartu daftar barang, dan aksi cepat.
  - `DetailPage.jsx`: Tampilan mendalam rincian laporan (foto cover rasio adaptif, identitas pelapor, status penyelesaian, tanggal lapor, deskripsi lengkap, serta tombol edit cover, edit data, dan hapus).

#### 2.1.6 Integrasi State Management Terpusat (Redux Store)

- `src/store.js`: Konfigurasi single store terpusat menggunakan `configureStore` dari `@reduxjs/toolkit` yang memadukan seluruh slice reducers dari fitur auth, users, dan lost-founds.
- `src/main.jsx`: Pembungkus hirarki komponen utama dengan `<Provider store={store}>` dari react-redux dan `<BrowserRouter>` dari react-router-dom.

#### 2.1.7 Penataan Rute Aplikasi & Route Guarding (`src/App.jsx`)

Mengonfigurasi deklarasi routing aplikasi menggunakan react-router-dom:

- Auth Routes (`/auth` membungkus `AuthLayout`):
  - `/auth/login`: Halaman Login.
  - `/auth/register`: Halaman Registrasi.
- Protected Dashboard Routes (`/` membungkus `LostFoundLayout`):
  - `/`: Halaman Beranda (Daftar & filter laporan Lost & Found).
  - `/lost-founds/:id`: Halaman Detail laporan Lost & Found.
  - `/users`: Halaman Daftar Pengguna.
  - `/profile`: Halaman Profil & Pengaturan Akun Pengguna.

#### 2.1.8 Pengujian Otomatis (Unit & Integration Testing)

- Penyiapan konfigurasi environment pengujian Vitest dan jsdom pada `src/setupTests.js` dengan `@testing-library/jest-dom`.
- `src/test-utils.jsx`: Helper utilitas pengujian khusus (`renderWithProviders`) untuk me-render komponen yang terhubung dengan Redux Store dan router memory.
- Penulisan skenario pengujian komprehensif pada setiap modul: helper, custom hooks, API callers, action creators, reducers, komponen navigasi, modals, layouts, pages, integrasi `App.test.jsx`, dan verifikasi `store.test.js`.