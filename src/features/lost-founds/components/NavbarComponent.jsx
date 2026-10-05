import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IconChevronDown, IconLogout, IconMenu2, IconUser } from "@tabler/icons-react";
import Avatar from "../../../components/Avatar";
import { asyncLogout } from "../../auth/states/action";

export default function NavbarComponent({ onOpenMenu }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.users.profile);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const signOut = () => {
    navigate("/auth/login");
    dispatch(asyncLogout());
  };

  if (!profile) return null;

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Buka menu"
          onClick={onOpenMenu}
          className="rounded-xl bg-white p-2 text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 lg:hidden"
        >
          <IconMenu2 size={20} />
        </button>
        <div>
          <h1 className="text-base font-bold leading-tight text-slate-900 sm:text-lg">
            Pusat Lost &amp; Found
          </h1>
          <p className="flex items-center gap-1.5 text-xs font-semibold text-teal-700">
            <span className="size-2 rounded-full bg-teal-700" />
            Sesi aktif
          </p>
        </div>
      </div>

      <div className="relative">
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={dropdownOpen}
          onClick={() => setDropdownOpen((value) => !value)}
          className="flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-3 ring-1 ring-slate-200 transition hover:ring-teal-300"
        >
          <Avatar name={profile.name} photo={profile.photo} className="size-8 text-xs" />
          <span className="hidden max-w-32 truncate text-sm font-bold text-slate-700 sm:block">
            {profile.name}
          </span>
          <IconChevronDown size={16} className="text-slate-500" />
        </button>

        {dropdownOpen && (
          <div
            role="menu"
            className="absolute right-0 mt-2 w-60 rounded-2xl bg-white p-2 shadow-xl ring-1 ring-slate-200"
          >
            <div className="px-3 py-2">
              <p className="truncate text-sm font-bold text-slate-900">{profile.name}</p>
              <p className="truncate text-xs text-slate-600">{profile.email}</p>
            </div>
            <Link
              role="menuitem"
              to="/profile"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <IconUser size={18} /> Profil saya
            </Link>
            <button
              type="button"
              role="menuitem"
              onClick={signOut}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50"
            >
              <IconLogout size={18} /> Keluar
            </button>
          </div>
        )}
      </div>
    </header>
  );
}