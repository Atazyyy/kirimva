import { useMemo, useState } from "react";
import { ArrowUpDown, MousePointerClick, Search, SearchX } from "lucide-react";
import { SHIPMENTS, STAGES, STATUS_STYLE, courierById } from "../data/seed";
import { fmtDateTime } from "../utils/format";

const FILTERS = [{ id: "semua", label: "Semua" }, ...STAGES.map((s) => ({ id: s.id, label: s.label }))];

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold ${STATUS_STYLE[status]}`}
    >
      {STAGES.find((s) => s.id === status)?.label}
    </span>
  );
}

function ServiceBadge({ service }) {
  return (
    <span className="whitespace-nowrap rounded-md bg-canvas px-2 py-1 text-[11px] font-bold text-sea-deep">
      {service}
    </span>
  );
}

export default function Shipments({ onTrack }) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("semua");
  const [sortNewest, setSortNewest] = useState(true);

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = SHIPMENTS.filter((s) => {
      const matchQ =
        !needle ||
        s.resi.toLowerCase().includes(needle) ||
        s.recipient.toLowerCase().includes(needle) ||
        s.dest.toLowerCase().includes(needle) ||
        s.origin.toLowerCase().includes(needle);
      const matchF = filter === "semua" || s.status === filter;
      return matchQ && matchF;
    });
    list = [...list].sort((a, b) =>
      sortNewest ? b.updatedAt - a.updatedAt : a.updatedAt - b.updatedAt
    );
    return list;
  }, [q, filter, sortNewest]);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mute" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari resi, penerima, atau kota…"
            className="w-full rounded-xl border-0 bg-card py-2.5 pl-10 pr-4 text-sm text-ink outline-none ring-1 ring-edge placeholder:text-mute/70 focus:ring-2 focus:ring-sea"
          />
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {FILTERS.map((f) => {
            const count =
              f.id === "semua"
                ? SHIPMENTS.length
                : SHIPMENTS.filter((s) => s.status === f.id).length;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                  filter === f.id
                    ? "bg-sea text-white"
                    : "bg-card text-mute ring-1 ring-edge hover:text-sea"
                }`}
              >
                {f.label} <span className="opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tabel desktop */}
      <div className="hidden overflow-hidden rounded-2xl border border-edge bg-card md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-edge bg-canvas text-xs uppercase tracking-wide text-mute">
              <th className="px-5 py-3 font-bold">
                <button
                  onClick={() => setSortNewest((v) => !v)}
                  className="inline-flex items-center gap-1 uppercase hover:text-sea"
                >
                  Diperbarui <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="px-5 py-3 font-bold">Resi</th>
              <th className="px-5 py-3 font-bold">Penerima</th>
              <th className="px-5 py-3 font-bold">Tujuan</th>
              <th className="px-5 py-3 font-bold">Layanan</th>
              <th className="px-5 py-3 font-bold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-edge">
            {rows.map((s) => (
              <tr key={s.resi} className="transition-colors hover:bg-canvas/60">
                <td className="px-5 py-3.5 text-xs text-mute">{fmtDateTime(s.updatedAt)}</td>
                <td className="px-5 py-3.5">
                  <button
                    onClick={() => onTrack(s.resi)}
                    title="Lacak resi ini"
                    className="font-extrabold text-sea hover:text-sea-deep hover:underline"
                  >
                    {s.resi}
                  </button>
                </td>
                <td className="px-5 py-3.5 font-semibold text-ink">
                  {s.recipient}
                  <span className="block text-xs font-normal text-mute">
                    asal {s.origin}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-ink">{s.dest}</td>
                <td className="px-5 py-3.5">
                  <ServiceBadge service={s.service} />
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={s.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length > 0 && (
          <p className="border-t border-edge bg-canvas px-5 py-2.5 text-xs text-mute">
            <MousePointerClick className="mr-1 inline h-3.5 w-3.5" />
            Klik nomor resi untuk membuka detail perjalanan di halaman Lacak.
          </p>
        )}
      </div>

      {/* Kartu mobile */}
      <div className="space-y-3 md:hidden">
        {rows.map((s) => (
          <div key={s.resi} className="rounded-2xl border border-edge bg-card p-4">
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => onTrack(s.resi)}
                className="font-extrabold text-sea hover:underline"
              >
                {s.resi}
              </button>
              <StatusBadge status={s.status} />
            </div>
            <p className="mt-2 font-semibold text-ink">{s.recipient}</p>
            <p className="text-xs text-mute">
              {s.origin} → {s.dest} · {s.service} · {s.weightKg} kg
            </p>
            <p className="mt-1 text-xs text-mute/70">
              Update {fmtDateTime(s.updatedAt)} · Kurir {courierById(s.courierId)?.name}
            </p>
          </div>
        ))}
      </div>

      {rows.length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-edge bg-card p-10 text-center">
          <SearchX className="h-8 w-8 text-mute" />
          <p className="font-bold text-ink">Tidak ada kiriman yang cocok.</p>
          <p className="text-sm text-mute">Coba ubah kata kunci atau filter status.</p>
        </div>
      )}
    </div>
  );
}
