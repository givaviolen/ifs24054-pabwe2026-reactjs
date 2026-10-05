import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IconEye, IconEyeOff, IconLoader2, IconLogin } from "@tabler/icons-react";
import useInput from "../../../hooks/useInput";
import { asyncLogin } from "../states/action";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const dispatch = useDispatch();
  const email = useInput("");
  const password = useInput("");
  const [reveal, setReveal] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const found = {};
    if (!EMAIL_PATTERN.test(email.value)) found.email = "Format email tidak valid";
    if (password.value.length < 6) found.password = "Kata sandi minimal 6 karakter";
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    await dispatch(asyncLogin({ email: email.value, password: password.value }));
    setSubmitting(false);
  };

  return (
    <div className="w-full">
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Masuk</h1>
        <p className="mt-3 text-slate-500">Lanjutkan untuk melihat dan mengelola laporan barang.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div>
          <label htmlFor="login-email-input" className="mb-2 block text-sm font-semibold text-slate-700">
            Email
          </label>
          <input
            id="login-email-input"
            type="email"
            autoComplete="email"
            placeholder="nama@del.ac.id"
            value={email.value}
            onChange={email.onChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
          {errors.email && <p className="mt-2 text-sm font-medium text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="login-password-input" className="mb-2 block text-sm font-semibold text-slate-700">
            Kata sandi
          </label>
          <div className="relative">
            <input
              id="login-password-input"
              type={reveal ? "text" : "password"}
              autoComplete="current-password"
              value={password.value}
              onChange={password.onChange}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-12 text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
            <button
              type="button"
              aria-label={reveal ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
              onClick={() => setReveal((value) => !value)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition"
            >
              {reveal ? <IconEyeOff size={20} /> : <IconEye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-2 text-sm font-medium text-red-500">{errors.password}</p>
          )}
        </div>

        <button
          id="login-submit-button"
          type="submit"
          disabled={submitting}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 hover:shadow disabled:opacity-70"
        >
          {submitting ? (
            <>
              <IconLoader2 size={20} className="animate-spin" /> Memproses…
            </>
          ) : (
            <>
              <IconLogin size={20} /> Masuk
            </>
          )}
        </button>
      </form>

      <p className="mt-8 text-center text-sm font-medium text-slate-500 lg:text-left">
        Belum punya akun?{" "}
        <Link to="/auth/register" className="text-blue-600 hover:text-blue-700 hover:underline">
          Daftar sekarang
        </Link>
      </p>
    </div>
  );
}
