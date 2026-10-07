import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./features/auth/layouts/AuthLayout";
import LostFoundLayout from "./features/lost-founds/layouts/LostFoundLayout";
import HomePage from "./features/lost-founds/pages/HomePage";

const LoginPage = lazy(() => import("./features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("./features/auth/pages/RegisterPage"));
const DetailPage = lazy(() => import("./features/lost-founds/pages/DetailPage"));
const UsersPage = lazy(() => import("./features/users/pages/UsersPage"));
const ProfilePage = lazy(() => import("./features/users/pages/ProfilePage"));

function Fallback() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-50 text-slate-700">
      <div role="status" aria-label="Memuat" className="font-semibold animate-pulse">Memuat halaman...</div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<Suspense fallback={<Fallback />}><LoginPage /></Suspense>} />
        <Route path="register" element={<Suspense fallback={<Fallback />}><RegisterPage /></Suspense>} />
      </Route>

      <Route path="/" element={<LostFoundLayout />}>
        <Route index element={<HomePage />} />
        <Route path="lost-founds/:id" element={<Suspense fallback={<Fallback />}><DetailPage /></Suspense>} />
        <Route path="users" element={<Suspense fallback={<Fallback />}><UsersPage /></Suspense>} />
        <Route path="profile" element={<Suspense fallback={<Fallback />}><ProfilePage /></Suspense>} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}