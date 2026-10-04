# Studi Kasus PABWE 2026: Aplikasi Web dengan Delcom Open API

Dokumen ini menjelaskan dua proyek studi kasus yang memanfaatkan **Delcom Open API** sebagai sumber data:

| No | Proyek | Framework | Bahasa | API |
|----|--------|-----------|--------|-----|
| 2.1 | Aplikasi **Lost & Founds** | ReactJS (Vite) | JavaScript | [api-lost-founds](https://open-api.delcom.org/docs/1.0/api-lost-founds) |
| 2.2 | Aplikasi **Postingan** | NextJS (App Router) | TypeScript | [api-posts](https://open-api.delcom.org/docs/1.0/api-posts) |

**Ketentuan umum kedua proyek:**

- Runtime & package manager: **Bun**
- UI: **Tailwind CSS v4**, ikon dengan **react-icons** atau **tabler-icons**
- Tipografi: **Google Fonts** (misalnya Plus Jakarta Sans atau Inter)
- State management: **Redux Toolkit** + **react-redux**
- Dialog notifikasi: **SweetAlert2**
- Pengujian: **Vitest** + **Testing Library** + **jsdom**

**Daftar Isi**

- [Bagian 1: Lost & Founds (ReactJS)](#bagian-1-lost--founds-reactjs)
- [Bagian 2: Postingan (NextJS)](#bagian-2-postingan-nextjs)
- [Catatan Penamaan Proyek](#catatan-penamaan-proyek)

---

# Bagian 1: Lost & Founds (ReactJS)

Aplikasi pelaporan barang hilang dan barang temuan berbasis **ReactJS + JavaScript**. Pengguna dapat mendaftar, login, membuat laporan, mengunggah foto cover, mengelola status penyelesaian laporan, serta melihat statistik harian dan bulanan.

## 1.1 Inisialisasi Proyek & Konfigurasi Lingkungan

### Penamaan proyek

Format: `{username}-pabwer2026-reactjs`
Contoh: `ifs18005-pabwe2026-reactjs`

### Langkah inisialisasi

```bash
# 1. Buat proyek Vite dengan template React JavaScript
bun create vite {username}-pabwer2026-reactjs --template react

# 2. Masuk ke direktori proyek
cd {username}-pabwer2026-reactjs

# 3. Pasang dependensi bawaan
bun install

# 4. Pasang dependensi aplikasi
bun add react-router-dom @reduxjs/toolkit react-redux sweetalert2 react-icons
bun add tailwindcss @tailwindcss/vite

# 5. Pasang dependensi pengujian
bun add -d vitest jsdom @vitest/coverage-v8 \
  @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### Konfigurasi Tailwind CSS v4

Pada `vite.config.js` tambahkan plugin `@tailwindcss/vite`, lalu impor Tailwind pada berkas CSS utama:

```css
/* src/index.css */
@import "tailwindcss";
```

### Konfigurasi Google Fonts

Hubungkan Google Fonts pada `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

### Konfigurasi `vite.config.js`

Berkas ini mengatur:

1. **Port lokal** dari variabel environment `APP_PORT`.
2. **Define konstanta** `DELCOM_BASEURL` yang mengarah ke `https://open-api.delcom.org/api/v1`.
3. **Test runner Vitest** (environment `jsdom`, `setupFiles`, dan `globals`).
4. **Coverage threshold** menggunakan provider `v8`.

Contoh kerangka:

```js
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    server: { port: Number(env.APP_PORT) || 5173 },
    define: {
      DELCOM_BASEURL: JSON.stringify(
        env.DELCOM_BASEURL || "https://open-api.delcom.org/api/v1"
      ),
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.js",
      coverage: {
        provider: "v8",
        reporter: ["text", "html"],
        thresholds: { lines: 100, functions: 100, branches: 100, statements: 100 },
      },
    },
  };
});
```

### Berkas environment

Siapkan `.env` dan `.env.example` dengan isi:

```env
DELCOM_BASEURL=https://open-api.delcom.org/api/v1
APP_PORT=5173
```

> Berkas `.env` jangan di-commit ke repositori. Gunakan `.env.example` sebagai templat.

## 1.2 Struktur Direktori

```text
{username}-pabwer2026-reactjs/
├── index.html
├── vite.config.js
├── .env
├── .env.example
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── store.js
    ├── setupTests.js
    ├── test-utils.jsx
    ├── helpers/
    │   ├── apiHelper.js
    │   └── toolsHelper.js
    ├── hooks/
    │   └── useInput.js
    └── features/
        ├── auth/
        │   ├── api/authApi.js
        │   ├── states/
        │   ├── layouts/AuthLayout.jsx
        │   └── pages/
        │       ├── LoginPage.jsx
        │       └── RegisterPage.jsx
        ├── users/
        │   ├── api/userApi.js
        │   ├── states/
        │   └── pages/
        │       ├── UsersPage.jsx
        │       └── ProfilePage.jsx
        └── lost-founds/
            ├── api/lostFoundApi.js
            ├── states/
            ├── layouts/LostFoundLayout.jsx
            ├── components/
            │   ├── NavbarComponent.jsx
            │   ├── SidebarComponent.jsx
            │   └── modals/
            │       ├── AddModal.jsx
            │       ├── ChangeModal.jsx
            │       └── ChangeCoverModal.jsx
            └── pages/
                ├── HomePage.jsx
                └── DetailPage.jsx
```

## 1.3 Modul Helper & Custom Hooks

| Berkas | Deskripsi |
|--------|-----------|
| `src/helpers/apiHelper.js` | Wrapper `fetch` ke REST API Delcom. Menangani query params, otomatisasi header `Authorization: Bearer <token>`, serta penyimpanan dan pengambilan token di `localStorage` (`getAccessToken`, `putAccessToken`). |
| `src/helpers/toolsHelper.js` | Utilitas dialog SweetAlert2: `showSuccessDialog`, `showErrorDialog`, `showConfirmDialog`, serta pemformatan tanggal/waktu `formatDate`. |
| `src/hooks/useInput.js` | Custom hook reusable untuk two-way data binding dan penanganan perubahan nilai pada elemen formulir. |

## 1.4 Fitur Autentikasi (`src/features/auth/`)

- **`api/authApi.js`**: integrasi `POST /auth/login` dan `POST /auth/register`.
- **`states/`**: action types, action creators, async thunks, dan slice reducers untuk `isAuthLogin`, `isAuthRegister`, dan `isAuthLogout`.
- **`layouts/AuthLayout.jsx`**: shell layout halaman autentikasi (kontainer form responsif, visual banner, dan pengalihan jika pengguna sudah terautentikasi).
- **`pages/LoginPage.jsx`** dan **`pages/RegisterPage.jsx`**: formulir login dan registrasi lengkap dengan validasi.

## 1.5 Fitur Profil & Pengguna (`src/features/users/`)

- **`api/userApi.js`**:

  | Fungsi | Endpoint |
  |--------|----------|
  | Daftar pengguna | `GET /users` |
  | Profil pengguna aktif | `GET /users/me` |
  | Perbarui profil | `PUT /users/me` |
  | Unggah foto avatar | `POST /users/me/photo` |
  | Ganti kata sandi | `PUT /users/me/password` |

- **`states/`**: action creators, async thunks, dan reducers untuk data pengguna (`users`, `user`), data profil (`profile`, `isProfile`), serta status mutasi akun (`isChangeProfile`, `isChangeProfilePhoto`, `isChangeProfilePassword`).
- **`pages/UsersPage.jsx`**: eksplorasi daftar semua pengguna sistem.
- **`pages/ProfilePage.jsx`**: manajemen profil pengguna.

## 1.6 Fitur Utama Lost & Founds (`src/features/lost-founds/`)

### API (`api/lostFoundApi.js`)

| Fungsi | Endpoint | Keterangan |
|--------|----------|------------|
| Daftar laporan | `GET /lost-founds` | Filter `status` (`lost`/`found`), `is_completed` (`1`/`0`), dan `is_me=1` |
| Detail laporan | `GET /lost-founds/:id` | Rincian lengkap laporan |
| Tambah laporan | `POST /lost-founds` | Laporan kehilangan atau penemuan baru |
| Ubah laporan | `PUT /lost-founds/:id` | Termasuk status penyelesaian |
| Unggah/ganti cover | `POST /lost-founds/:id/cover` | Foto bukti atau cover barang |
| Hapus laporan | `DELETE /lost-founds/:id` | |
| Statistik harian | `GET /lost-founds/stats/daily` | |
| Statistik bulanan | `GET /lost-founds/stats/monthly` | |

### State (`states/`)

Action types, action creators, async thunks, dan reducers untuk:

- **Koleksi data laporan**: `lostFounds`, `lostFound`, `isLostFound`
- **Pelacakan proses aksi**:
  - Tambah: `isLostFoundAdd`, `isLostFoundAdded`
  - Ubah data: `isLostFoundChange`, `isLostFoundChanged`
  - Ubah cover: `isLostFoundChangeCover`, `isLostFoundChangedCover`
  - Hapus: `isLostFoundDelete`, `isLostFoundDeleted`
- **Metrik statistik**: `lostFoundStats`

### Layout

**`layouts/LostFoundLayout.jsx`**: shell layout utama dengan `NavbarComponent`, `SidebarComponent`, mekanisme **Route Guarding** (verifikasi token dan pemuatan sesi profil pengguna), serta area konten dinamis `<Outlet />`.

### Komponen

| Komponen | Deskripsi |
|----------|-----------|
| `NavbarComponent.jsx` | Logo aplikasi, judul, status sesi, dropdown profil, dan tombol logout. |
| `SidebarComponent.jsx` | Navigasi utama (Dashboard/Laporan, Statistik, Pengguna, Profil Saya) dengan drawer responsif untuk mobile. |
| `modals/AddModal.jsx` | Formulir tambah laporan (judul, deskripsi, jenis laporan: hilang/ditemukan). |
| `modals/ChangeModal.jsx` | Formulir ubah laporan beserta toggle status selesai (`is_completed`). |
| `modals/ChangeCoverModal.jsx` | Unggah/ganti cover dengan pratinjau langsung sebelum diunggah. |

### Halaman

- **`HomePage.jsx`**: dashboard ringkasan metrik (Total, Barang Hilang, Barang Ditemukan, Selesai), filter interaktif status laporan, pencarian kata kunci (*live search*), tabel/kartu daftar barang, dan aksi cepat.
- **`DetailPage.jsx`**: rincian laporan (foto cover dengan rasio adaptif, identitas pelapor, status penyelesaian, tanggal lapor, deskripsi lengkap, serta tombol edit cover, edit data, dan hapus).

## 1.7 Integrasi Redux Store

- **`src/store.js`**: single store dengan `configureStore` dari `@reduxjs/toolkit`, menggabungkan slice reducers dari fitur `auth`, `users`, dan `lost-founds`.
- **`src/main.jsx`**: membungkus aplikasi dengan `<Provider store={store}>` (react-redux) dan `<BrowserRouter>` (react-router-dom).

## 1.8 Rute Aplikasi & Route Guarding (`src/App.jsx`)

Routing dikonfigurasi menggunakan `react-router-dom`.

**Auth Routes** (`/auth` membungkus `AuthLayout`)

| Path | Halaman |
|------|---------|
| `/auth/login` | Login |
| `/auth/register` | Registrasi |

**Protected Dashboard Routes** (`/` membungkus `LostFoundLayout`)

| Path | Halaman |
|------|---------|
| `/` | Beranda (daftar & filter laporan Lost & Found) |
| `/lost-founds/:id` | Detail laporan |
| `/users` | Daftar pengguna |
| `/profile` | Profil & pengaturan akun |

## 1.9 Pengujian Otomatis

- **`src/setupTests.js`**: konfigurasi Vitest + jsdom dengan `@testing-library/jest-dom`.
- **`src/test-utils.jsx`**: helper `renderWithProviders` untuk me-render komponen yang terhubung ke Redux Store dan memory router.
- Skenario pengujian mencakup setiap modul: helper, custom hooks, API callers, action creators, reducers, komponen navigasi, modals, layouts, pages, integrasi `App.test.jsx`, dan verifikasi `store.test.js`.

## 1.10 Menjalankan Aplikasi

```bash
cp .env.example .env     # lalu sesuaikan nilainya
bun install
bun run dev              # jalankan mode pengembangan
bun run build            # build produksi
bun run preview          # pratinjau hasil build
bun run test             # jalankan pengujian
bun run test -- --coverage   # pengujian dengan laporan coverage
```

---

# Bagian 2: Postingan (NextJS)

Aplikasi linimasa postingan berbasis **NextJS (App Router) + TypeScript**. Pengguna dapat membuat postingan, mengunggah cover, memberi like, serta berkomentar.

## 2.1 Inisialisasi Proyek & Konfigurasi Lingkungan

### Penamaan proyek

Format: `{username}-pabwer2026-nextjs`
Contoh: `ifs18005-pabwe2026-nextjs`

### Langkah inisialisasi

```bash
# 1. Buat proyek Next.js (pilih TypeScript, ESLint, App Router, Tailwind)
bun create next-app {username}-pabwer2026-nextjs

# 2. Masuk ke direktori proyek
cd {username}-pabwer2026-nextjs

# 3. Pasang dependensi aplikasi
bun add @reduxjs/toolkit react-redux sweetalert2 react-icons

# 4. Pasang dependensi pengujian
bun add -d vitest jsdom @vitejs/plugin-react @vitest/coverage-v8 \
  @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### Konfigurasi Tailwind CSS v4

Gunakan `@tailwindcss/postcss` dan `tailwindcss`, lalu impor pada `src/app/globals.css`:

```css
@import "tailwindcss";
```

### Konfigurasi `next.config.ts`

Aktifkan **Turbopack** dan optimasi bawaan Next.js (misalnya `reactStrictMode`, optimasi gambar, dan `optimizePackageImports`).

### Server launcher (`src/server.ts`)

Launcher berbasis TypeScript yang membaca port secara dinamis dari variabel `APP_PORT` pada `.env` atau `.env.example`, lalu menjalankan server Next.js.

### Berkas environment

Siapkan `.env` dan `.env.example` dengan isi:

```env
NEXT_PUBLIC_DELCOM_BASEURL=https://open-api.delcom.org/api/v1
APP_PORT=3000
```

### Konfigurasi Vitest (`vitest.config.mts`)

- Environment `jsdom`
- Plugin React (`@vitejs/plugin-react`)
- Laporan cakupan kode berbasis **v8**
- **Threshold minimum 100%** (lines, functions, branches, statements)

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      thresholds: { lines: 100, functions: 100, branches: 100, statements: 100 },
    },
  },
});
```

## 2.2 Struktur Direktori

```text
{username}-pabwer2026-nextjs/
├── next.config.ts
├── vitest.config.mts
├── .env
├── .env.example
├── package.json
└── src/
    ├── server.ts
    ├── store.ts
    ├── setupTests.ts
    ├── test-utils.tsx
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── auth/
    │   │   ├── layout.tsx
    │   │   ├── login/page.tsx
    │   │   └── register/page.tsx
    │   └── (dashboard)/
    │       ├── layout.tsx
    │       ├── page.tsx
    │       ├── posts/[postId]/page.tsx
    │       ├── users/page.tsx
    │       └── profile/page.tsx
    ├── components/
    │   └── Providers.tsx
    ├── helpers/
    │   ├── apiHelper.ts
    │   └── toolsHelper.ts
    ├── hooks/
    │   ├── useInput.ts
    │   └── redux.ts
    ├── lib/
    │   └── config.ts
    ├── types/
    │   ├── action.ts
    │   └── index.ts
    └── features/
        ├── auth/
        │   ├── api/authApi.ts
        │   ├── states/ (action.ts, reducer.ts, ...)
        │   ├── layouts/AuthLayout.tsx
        │   └── pages/ (LoginPage.tsx, RegisterPage.tsx)
        ├── users/
        │   ├── api/userApi.ts
        │   ├── states/ (action.ts, reducer.ts, ...)
        │   └── pages/ (UsersPage.tsx, ProfilePage.tsx)
        └── posts/
            ├── api/postApi.ts
            ├── states/ (action.ts, reducer.ts, ...)
            ├── layouts/PostLayout.tsx
            ├── components/
            │   ├── NavbarComponent.tsx
            │   ├── SidebarComponent.tsx
            │   └── modals/ (AddModal.tsx, ChangeModal.tsx, ChangeCoverModal.tsx)
            └── pages/ (HomePage.tsx, DetailPage.tsx)
```

## 2.3 Modul Helper & Custom Hooks

| Berkas | Deskripsi |
|--------|-----------|
| `src/helpers/apiHelper.ts` | Wrapper `fetch` ke REST API Delcom: query parameters, otomatisasi bearer token, serta penyimpanan dan penghapusan token di `localStorage` (`getAccessToken`, `putAccessToken`). |
| `src/helpers/toolsHelper.ts` | Dialog SweetAlert2 (`showSuccessDialog`, `showErrorDialog`, `showWarningDialog`, `showConfirmDialog`) dan helper `formatDate`. |
| `src/hooks/useInput.ts` | Custom hook untuk two-way data binding dan change handler formulir. |
| `src/hooks/redux.ts` | Typed hooks `useAppDispatch` dan `useAppSelector` untuk akses Redux store yang aman tipe. |
| `src/lib/config.ts` | Konfigurasi konstanta terpusat (`DELCOM_BASEURL` dan `APP_PORT`). |
| `src/server.ts` | Launcher server Next.js yang membaca `APP_PORT` dari `.env`. |

## 2.4 Fitur Autentikasi (`src/features/auth/`)

- **`api/authApi.ts`**: `POST /auth/login` dan `POST /auth/register`.
- **`states/`**: action types, action creators (`action.ts`), async thunks, dan slice reducers (`reducer.ts`) untuk `isAuthLogin`, `isAuthRegister`, `isAuthLogout`.
- **`layouts/AuthLayout.tsx`**: shell layout autentikasi dengan visual banner responsif dan proteksi pengalihan ke dashboard jika sesi aktif.
- **`pages/LoginPage.tsx`** dan **`pages/RegisterPage.tsx`**: validasi formulir dan dialog umpan balik.

## 2.5 Fitur Profil & Pengguna (`src/features/users/`)

- **`api/userApi.ts`**:

  | Fungsi | Endpoint |
  |--------|----------|
  | Daftar pengguna | `GET /users` |
  | Profil pengguna aktif | `GET /users/me` |
  | Perbarui profil | `PUT /users/me` |
  | Unggah foto avatar | `POST /users/me/photo` |
  | Ubah kata sandi | `PUT /users/me/password` |

- **`states/`**: state `users`, `user`, `profile`, `isProfile`, `isChangeProfile`, `isChangeProfilePhoto`, `isChangeProfilePassword`.
- **`pages/UsersPage.tsx`**: daftar seluruh pengguna dengan fitur pencarian.
- **`pages/ProfilePage.tsx`**: pembaruan bio, foto profil, dan kata sandi.

## 2.6 Fitur Utama Manajemen Postingan (`src/features/posts/`)

### API (`api/postApi.ts`)

| Fungsi | Endpoint |
|--------|----------|
| Daftar postingan (+ filter milik sendiri `is_me=1`) | `GET /posts` |
| Detail postingan | `GET /posts/:id` |
| Tambah postingan | `POST /posts` |
| Ubah deskripsi postingan | `PUT /posts/:id` |
| Unggah/ganti cover | `POST /posts/:id/cover` |
| Hapus postingan | `DELETE /posts/:id` |
| Like / batalkan like | `POST /posts/:id/likes` |
| Tambah komentar | `POST /posts/:id/comments` |
| Hapus komentar | `DELETE /posts/:id/comments` |
| Hapus seluruh postingan milik pengguna | `DELETE /posts` |

### State (`states/`)

Action types, action creators (`action.ts`), async thunks, dan slice reducers (`reducer.ts`) untuk:

- **Koleksi data**: `posts`, `post`, `isPost`
- **Status mutasi aksi**:
  - Tambah postingan: `isPostAdd`, `isPostAdded`
  - Ubah postingan: `isPostChange`, `isPostChanged`
  - Ganti cover: `isPostChangeCover`, `isPostChangedCover`
  - Hapus postingan: `isPostDelete`, `isPostDeleted`
  - Like/unlike: `isPostLike`, `isPostLiked`
  - Tambah komentar: `isPostAddComment`, `isPostAddedComment`
  - Hapus komentar: `isPostDeleteComment`, `isPostDeletedComment`
  - Hapus semua postingan: `isPostDeleteAll`, `isPostDeletedAll`

### Layout

**`layouts/PostLayout.tsx`**: shell dashboard dengan `NavbarComponent`, `SidebarComponent`, mekanisme **Route Guarding** (verifikasi token dan pemuatan sesi profil), serta area konten utama.

### Komponen

| Komponen | Deskripsi |
|----------|-----------|
| `NavbarComponent.tsx` | Avatar pengguna, identitas profil aktif, dropdown navigasi, dan tombol logout. |
| `SidebarComponent.tsx` | Navigasi (Semua Postingan, Postingan Saya, Daftar Pengguna, Profil Saya) dengan drawer responsif untuk mobile. |
| `modals/AddModal.tsx` | Modal publikasi postingan baru (input deskripsi). |
| `modals/ChangeModal.tsx` | Modal pembaruan deskripsi postingan. |
| `modals/ChangeCoverModal.tsx` | Modal pilih, pratinjau, dan unggah cover baru. |

### Halaman

- **`HomePage.tsx`**: linimasa postingan publik dan tab filter postingan saya (`is_me`), pencarian *live search*, kartu postingan (cover, nama pembuat, deskripsi, tanggal, jumlah likes & komentar), serta aksi pintas tambah postingan.
- **`DetailPage.tsx`**: gambar cover, profil pembuat, deskripsi lengkap, tanggal publikasi, tombol like, daftar komentar, formulir kirim komentar, aksi hapus komentar, serta tombol ubah cover, ubah postingan, dan hapus postingan (jika milik pengguna).

## 2.7 Redux Store & Providers

- **`src/store.ts`**: `configureStore` dari `@reduxjs/toolkit` yang menggabungkan reducer `auth`, `users`, dan `posts`, serta mengekspor tipe `RootState` dan `AppDispatch`.
- **`src/types/`**:
  - `action.ts`: tipe payload action.
  - `index.ts`: interface model data `Post`, `PostAuthor`, `PostComment`, `User`, dan `ApiResult`.
- **`src/components/Providers.tsx`**: Client Component yang membungkus aplikasi dengan `<Provider store={store}>`.
- **`src/app/layout.tsx`**: Root Layout yang mengintegrasikan font Google, `globals.css`, metadata, dan `Providers`.

## 2.8 Rute Aplikasi (Next.js App Router)

| Berkas | Fungsi |
|--------|--------|
| `src/app/layout.tsx` | Root layout (font, metadata, `Providers`) |
| `src/app/auth/layout.tsx` | Layout autentikasi, membungkus `AuthLayout.tsx` |
| `src/app/auth/login/page.tsx` | Halaman login (`LoginPage.tsx`) |
| `src/app/auth/register/page.tsx` | Halaman registrasi (`RegisterPage.tsx`) |
| `src/app/(dashboard)/layout.tsx` | Layout dashboard terproteksi, membungkus `PostLayout.tsx` |
| `src/app/(dashboard)/page.tsx` | Linimasa postingan (`HomePage.tsx`) |
| `src/app/(dashboard)/posts/[postId]/page.tsx` | Detail postingan (`DetailPage.tsx`) |
| `src/app/(dashboard)/users/page.tsx` | Direktori pengguna (`UsersPage.tsx`) |
| `src/app/(dashboard)/profile/page.tsx` | Pengaturan akun dan profil (`ProfilePage.tsx`) |

## 2.9 Pengujian Otomatis

- **`src/setupTests.ts`**: konfigurasi Vitest + jsdom dengan `@testing-library/jest-dom`.
- **`src/test-utils.tsx`**: helper `renderWithProviders` untuk me-render komponen yang terhubung ke Redux Store dan navigasi Next.js.
- **Standar cakupan kode: 100%.**

| Modul | Berkas pengujian |
|-------|------------------|
| Helper & Hooks | `apiHelper.test.ts`, `toolsHelper.test.ts`, `useInput.test.ts` |
| Auth | `authApi.test.ts`, `action.test.ts`, `reducer.test.ts`, `AuthLayout.test.tsx`, `LoginPage.test.tsx`, `RegisterPage.test.tsx` |
| Posts | `postApi.test.ts`, `action.test.ts`, `reducer.test.ts`, `NavbarComponent.test.tsx`, `SidebarComponent.test.tsx`, `AddModal.test.tsx`, `ChangeModal.test.tsx`, `ChangeCoverModal.test.tsx`, `PostLayout.test.tsx`, `HomePage.test.tsx`, `DetailPage.test.tsx` |
| Users | `userApi.test.ts`, `action.test.ts`, `reducer.test.ts`, `UsersPage.test.tsx`, `ProfilePage.test.tsx` |
| Store | `src/store.test.ts` |

## 2.10 Menjalankan Aplikasi

```bash
cp .env.example .env     # lalu sesuaikan nilainya
bun install
bun run dev              # mode pengembangan (Turbopack)
bun run build            # build produksi
bun run start            # jalankan hasil build
bun run test             # jalankan pengujian (atau: npm test)
bun run test -- --coverage   # laporan coverage (threshold 100%)
```

---

# Catatan Penamaan Proyek

| Proyek | Format | Contoh |
|--------|--------|--------|
| ReactJS | `{username}-pabwer2026-reactjs` | `ifs18005-pabwe2026-reactjs` |
| NextJS | `{username}-pabwer2026-nextjs` | `ifs18005-pabwe2026-nextjs` |

Ganti `{username}` dengan username masing-masing mahasiswa.

---

## Referensi

- [Delcom Open API: Lost & Founds](https://open-api.delcom.org/docs/1.0/api-lost-founds)
- [Delcom Open API: Posts](https://open-api.delcom.org/docs/1.0/api-posts)
- [Bun](https://bun.sh) · [Vite](https://vite.dev) · [Next.js](https://nextjs.org) · [Tailwind CSS](https://tailwindcss.com)
- [Redux Toolkit](https://redux-toolkit.js.org) · [React Router](https://reactrouter.com) · [Vitest](https://vitest.dev) · [SweetAlert2](https://sweetalert2.github.io)