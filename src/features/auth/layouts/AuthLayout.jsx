import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { IconSearch, IconShieldCheck } from "@tabler/icons-react";

export default function AuthLayout() {
  const token = useSelector((state) => state.auth.token);
  if (token) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-[2.5rem] bg-white shadow-2xl ring-1 ring-slate-200">
        {/* Left Panel - Banner */}
        <aside className="relative hidden w-1/2 flex-col justify-between bg-blue-600 p-12 text-white lg:flex">
          <div className="absolute -left-12 -top-12 size-64 rounded-full bg-blue-500/40 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 size-80 rounded-full bg-cyan-400/30 blur-3xl" />

          <div className="relative flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-2xl bg-white text-blue-600 shadow-sm">
              <IconSearch size={28} />
            </span>
            <span className="font-sans text-2xl font-bold tracking-tight">
              Lost & Found Hub
            </span>
          </div>

          <div className="relative">
            <h2 className="text-4xl font-extrabold leading-snug tracking-tight">
              Barang hilang? <br />
              <span className="text-blue-200">Biar kampus yang bantu cari.</span>
            </h2>
            <p className="mt-6 text-lg text-blue-100">
              Platform pelaporan barang hilang dan ditemukan terpusat untuk mahasiswa dan staf.
            </p>
          </div>

          <p className="relative flex items-center gap-2 text-sm font-medium text-blue-200">
            <IconShieldCheck size={20} /> Dibuat untuk praktikum PABWE 2026
          </p>
        </aside>

        {/* Right Panel - Form */}
        <main className="flex w-full items-center justify-center p-8 lg:w-1/2 lg:p-16">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
