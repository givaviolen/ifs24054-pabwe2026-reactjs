import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IconLoader2, IconUserPlus } from "@tabler/icons-react";
import useInput from "../../../hooks/useInput";
import { asyncRegister } from "../states/action";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useInput("");
  const email = useInput("");
  const password = useInput("");
  const confirm = useInput("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const found = {};
    if (name.value.trim().length < 3) found.name = "Nama minimal 3 karakter";
    if (!EMAIL_PATTERN.test(email.value)) found.email = "Format email tidak valid";
    if (password.value.length < 6) found.password = "Kata sandi minimal 6 karakter";
    if (confirm.value !== password.value) found.confirm = "Konfirmasi kata sandi tidak sama";
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    const success = await dispatch(
      asyncRegister({ name: name.value, email: email.value, password: password.value })
    );
    setSubmitting(false);
    if (success) navigate("/auth/login");
  };

  return (
    <div className="w-full">
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Buat akun</h1>
        <p className="mt-3 text-slate-500">Daftarkan diri Anda untuk mulai menggunakan layanan ini.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label htmlFor="register-name-input" className="mb-2 block text-sm font-semibold text-slate-700">
            Nama lengkap
          </label>
          <input
            id="register-name-input"
            type="text"
            autoComplete="name"
            placeholder="John Doe"
            value={name.value}
            onChange={name.onChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
          {errors.name && <p className="mt-2 text-sm font-medium text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="register-email-input" className="mb-2 block text-sm font-semibold text-slate-700">
            Email
          </label>
          <input
            id="register-email-input"
            type="email"
            autoComplete="email"
            placeholder="nama@del.ac.id"
            value={email.value}
            onChange={email.onChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
          {errors.email && <p className="mt-2 text-sm font-medium text-red-500">{errors.email}</p>}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="register-password-input" className="mb-2 block text-sm font-semibold text-slate-700">
              Kata sandi
            </label>
            <input
              id="register-password-input"
              type="password"
              autoComplete="new-password"
              value={password.value}
              onChange={password.onChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
            {errors.password && <p className="mt-2 text-sm font-medium text-red-500">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="register-confirm-input" className="mb-2 block text-sm font-semibold text-slate-700">
              Ulangi kata sandi
            </label>
            <input
              id="register-confirm-input"
              type="password"
              autoComplete="new-password"
              value={confirm.value}
              onChange={confirm.onChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
            {errors.confirm && <p className="mt-2 text-sm font-medium text-red-500">{errors.confirm}</p>}
          </div>
        </div>

        <button
          id="register-submit-button"
          type="submit"
          disabled={submitting}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 hover:shadow disabled:opacity-70"
        >
          {submitting ? (
            <>
              <IconLoader2 size={20} className="animate-spin" /> Memproses…
            </>
          ) : (
            <>
              <IconUserPlus size={20} /> Daftar
            </>
          )}
        </button>
      </form>

      <p className="mt-8 text-center text-sm font-medium text-slate-500 lg:text-left">
        Sudah punya akun?{" "}
        <Link to="/auth/login" className="text-blue-600 hover:text-blue-700 hover:underline">
          Masuk di sini
        </Link>
      </p>
    </div>
  );
}
