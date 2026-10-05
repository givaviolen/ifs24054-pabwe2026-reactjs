import clsx from "clsx";
import { Link } from "react-router-dom";
import { IconCalendar, IconCircleCheck, IconPackage, IconRotate2, IconTrash } from "@tabler/icons-react";
import { formatDate, isDone, resolveMediaUrl } from "../../../helpers/toolsHelper";

export const StatusPill = ({ status }) => (
  <span
    className={clsx(
      "rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
      status === "lost" ? "bg-rose-50 text-rose-700 ring-1 ring-rose-700/20" : "bg-teal-50 text-teal-700 ring-1 ring-teal-600/20",
    )}
  >
    {status === "lost" ? "Hilang" : "Ditemukan"}
  </span>
);

export default function ItemCard({ item, onToggleDone, onDelete }) {
  const cover = resolveMediaUrl(item.cover);
  const done = isDone(item);

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-900/5">
      <div className="relative h-44 bg-slate-100">
        {cover ? (
          <img src={cover} alt={`Cover ${item.title}`} className="size-full object-cover" />
        ) : (
          <span className="grid size-full place-items-center text-slate-400">
            <IconPackage size={44} />
          </span>
        )}
        <div className="absolute left-3 top-3 flex gap-2">
          <StatusPill status={item.status} />
          {done && (
            <span className="flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 text-xs font-bold text-teal-300 ring-1 ring-slate-900/5">
              <IconCircleCheck size={14} /> Selesai
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-lg font-bold text-slate-900">{item.title}</h3>
        <p className="mt-1 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600">{item.description}</p>
        <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-slate-600">
          <IconCalendar size={14} /> {formatDate(item.created_at)}
        </p>

        <div className="mt-5 flex items-center gap-2">
          <Link
            to={`/lost-founds/${item.id}`}
            className="flex-1 rounded-xl bg-slate-50 py-2.5 text-center text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Lihat detail
          </Link>
          <button
            type="button"
            aria-label={done ? `Buka kembali ${item.title}` : `Tandai selesai ${item.title}`}
            onClick={() => onToggleDone(item)}
            className="rounded-xl bg-teal-50 p-2.5 text-teal-600 transition hover:bg-teal-100 hover:text-teal-700"
          >
            {done ? <IconRotate2 size={18} /> : <IconCircleCheck size={18} />}
          </button>
          <button
            type="button"
            aria-label={`Hapus ${item.title}`}
            onClick={() => onDelete(item)}
            className="rounded-xl bg-rose-50 p-2.5 text-rose-700 transition hover:bg-rose-100 hover:text-rose-700"
          >
            <IconTrash size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}