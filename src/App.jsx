import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// Eager: halaman utama (route "/") dimuat langsung supaya rantai request
// tetap pendek (HTML -> index.js) dan First Paint tidak tertunda.
import LostFoundLayout from "./features/lost-founds/layouts/LostFoundLayout";
import HomePage from "./features/lost-founds/pages/HomePage";

// Lazy: semua yang tidak dibutuhkan saat halaman utama pertama kali dibuka
// dipisah jadi chunk sendiri, sehingga tidak ikut terunduh di bundle utama.
const AuthLayout = lazy(() => import("./features/auth/layouts/AuthLayout"));
const LoginPage = lazy(() => import("./features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("./features/auth/pages/RegisterPage"));
const DetailPage = lazy(() => import("./features/lost-founds/pages/DetailPage"));
const UsersPage = lazy(() => import("./features/users/pages/UsersPage"));
const ProfilePage = lazy(() => import("./features/users/pages/ProfilePage"));

function Fallback() {
  return (
    <main className="flex h-screen w-screen items-center justify-center bg-slate-50 text-slate-500">
      <h1 className="font-semibold animate-pulse">Memuat halaman...</h1>
    </main>
  );
}

export default function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Navigate to="login" replace />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route path="/" element={<LostFoundLayout />}>
          <Route index element={<HomePage />} />
          <Route path="lost-founds/:id" element={<DetailPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}