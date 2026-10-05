import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import {
  IconChartBar,
  IconLayoutDashboard,
  IconMapPinSearch,
  IconUser,
  IconUsers,
  IconX,
} from "@tabler/icons-react";

const MENU = [
  { id: "reports", to: "/", label: "Laporan", icon: IconLayoutDashboard },
  { id: "stats", to: "/?tampilan=statistik", label: "Statistik", icon: IconChartBar },
  { id: "users", to: "/users", label: "Pengguna", icon: IconUsers },
  { id: "profile", to: "/profile", label: "Profil Saya", icon: IconUser },
];

const activeMenuId = ({ pathname, search }) => {
  if (pathname === "/users") return "users";
  if (pathname === "/profile") return "profile";
  return search.includes("statistik") ? "stats" : "reports";
};

export default function SidebarComponent({ open, onClose }) {
  const activeId = activeMenuId(useLocation());

  return (
    <>
      {open && (
        <div
          data-testid="sidebar-overlay"
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        aria-label="Navigasi utama"
        className={clsx(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-white border-r border-slate-200 p-6 transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-10 flex items-center justify-between">
          <Link to="/" onClick={onClose} className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-2xl bg-teal-700 text-white shadow-sm shadow-teal-600/30">
              <IconMapPinSearch size={22} />
            </span>
            <span className="font-sans text-xl font-bold tracking-tight text-slate-800">
              Temu<span className="text-teal-700">Balik</span>
            </span>
          </Link>
          <button
            type="button"
            aria-label="Tutup menu"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            <IconX size={20} />
          </button>
        </div>

        <p className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-slate-600">Menu</p>
        <nav className="flex flex-col gap-1">
          {MENU.map(({ id, to, label, icon: Icon }) => (
            <Link
              key={id}
              to={to}
              onClick={onClose}
              aria-current={activeId === id ? "page" : undefined}
              className={clsx(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition",
                activeId === id
                  ? "bg-teal-50 text-teal-700 ring-1 ring-teal-600/20"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
              )}
            >
              <Icon size={20} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto rounded-2xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-600 ring-1 ring-slate-200">
          <p className="font-bold text-teal-700">Tips cepat</p>
          <p className="mt-1">Sertakan foto dan ciri khusus barang agar pemilik lebih mudah mengenalinya.</p>
        </div>
      </aside>
    </>
  );
}