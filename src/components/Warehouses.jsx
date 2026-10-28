import { ArrowDownToLine, ArrowUpFromLine, Warehouse as WarehouseIcon } from "lucide-react";
import { WAREHOUSES, weeklyFlow } from "../data/seed";
import { num } from "../utils/format";

// Grafik SVG buatan sendiri: batang ganda masuk vs keluar, 7 hari
function FlowChart({ data }) {
  const W = 560;
  const H = 230;
  const padX = 30;
  const topPad = 26;
  const bottomPad = 34;
  const groupGap = 18;
  const barGap = 4;
  const max = Math.max(...data.flatMap((d) => [d.masuk, d.keluar]), 1);
  const groupW = (W - padX * 2 - groupGap * (data.length - 1)) / data.length;
  const barW = (groupW - barGap) / 2;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label="Grafik paket masuk dan keluar 7 hari terakhir"
    >
      {data.map((d, i) => {
        const x = padX + i * (groupW + groupGap);
        const hMasuk = Math.max(4, ((d.masuk / max) * (H - topPad - bottomPad)) | 0);
        const hKeluar = Math.max(4, ((d.keluar / max) * (H - topPad - bottomPad)) | 0);
        const isToday = i === data.length - 1;
        return (
          <g key={d.label + i}>
            <title>{`${d.label}: masuk ${num(d.masuk)} · keluar ${num(d.keluar)}`}</title>
            <rect
              x={x}
              y={H - bottomPad - hMasuk}
              width={barW}
              height={hMasuk}
              rx={5}
              fill={isToday ? "#0c6fb0" : "#a9cbe8"}
            />
            <rect
              x={x + barW + barGap}
              y={H - bottomPad - hKeluar}
              width={barW}
              height={hKeluar}
              rx={5}
              fill={isToday ? "#f2730c" : "#f8cfa6"}
            />
            <text
              x={x + groupW / 2}
              y={H - 12}
              textAnchor="middle"
              fontSize="11"
              fontWeight={isToday ? "700" : "500"}
              fill={isToday ? "#0c6fb0" : "#5c7288"}
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function occupancyColor(pct) {
  if (pct >= 85) return "bg-red-500";
  if (pct >= 70) return "bg-amber-400";
  return "bg-sea";
}

export default function Warehouses() {
  const flow = weeklyFlow();
  const today = flow[flow.length - 1];
  const totalInToday = WAREHOUSES.reduce((s, w) => s + w.inToday, 0);
  const totalOutToday = WAREHOUSES.reduce((s, w) => s + w.outToday, 0);

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      {/* Okupansi gudang */}
      <div className="space-y-4 lg:col-span-3">
        <div className="grid gap-4 sm:grid-cols-2">
          {WAREHOUSES.map((w) => {
            const pct = Math.round((w.used / w.capacity) * 100);
            return (
              <div key={w.id} className="rounded-2xl border border-edge bg-card p-5 shadow-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sea-soft text-sea-deep">
                      <WarehouseIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-ink">{w.name}</p>
                      <p className="text-xs text-mute">{w.city}</p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-extrabold ${
                      pct >= 85
                        ? "bg-red-50 text-red-600"
                        : "bg-sea-soft text-sea-deep"
                    }`}
                  >
                    {pct}%
                  </span>
                </div>

                <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-canvas">
                  <div
                    className={`h-full rounded-full ${occupancyColor(pct)}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="mt-2 text-xs font-semibold text-mute">
                  {num(w.used)} / {num(w.capacity)} slot palet
                  {pct >= 85 && (
                    <span className="ml-1 font-bold text-red-500">· hampir penuh</span>
                  )}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2 border-t border-edge pt-3 text-center">
                  <div className="rounded-xl bg-canvas py-2">
                    <p className="inline-flex items-center gap-1 text-[11px] font-semibold text-mute">
                      <ArrowDownToLine className="h-3.5 w-3.5 text-sea" /> Masuk hari ini
                    </p>
                    <p className="text-lg font-extrabold text-ink">{num(w.inToday)}</p>
                  </div>
                  <div className="rounded-xl bg-canvas py-2">
                    <p className="inline-flex items-center gap-1 text-[11px] font-semibold text-mute">
                      <ArrowUpFromLine className="h-3.5 w-3.5 text-accent" /> Keluar hari ini
                    </p>
                    <p className="text-lg font-extrabold text-ink">{num(w.outToday)}</p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Ringkasan jaringan */}
          <div className="flex flex-col justify-center gap-3 rounded-2xl border border-dashed border-sea/40 bg-sea-soft/60 p-5">
            <p className="text-sm font-bold text-ink">Total jaringan hari ini</p>
            <div className="flex gap-3">
              <div className="flex-1 rounded-xl bg-card p-3 text-center ring-1 ring-sea/20">
                <p className="text-xs font-semibold text-mute">Paket masuk</p>
                <p className="text-xl font-extrabold text-sea-deep">{num(totalInToday)}</p>
              </div>
              <div className="flex-1 rounded-xl bg-card p-3 text-center ring-1 ring-accent/30">
                <p className="text-xs font-semibold text-mute">Paket keluar</p>
                <p className="text-xl font-extrabold text-orange-700">{num(totalOutToday)}</p>
              </div>
            </div>
            <p className="text-xs text-mute">
              Selisih +{num(totalInToday - totalOutToday)} paket — stok gudang naik,
              siapkan armada tambahan untuk antisipasi akhir pekan.
            </p>
          </div>
        </div>
      </div>

      {/* Grafik 7 hari */}
      <div className="rounded-2xl border border-edge bg-card p-5 shadow-sm lg:col-span-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-bold text-ink">Pergerakan paket 7 hari</h2>
          <span className="rounded-full bg-canvas px-3 py-1 text-xs font-bold text-mute">
            hari ini: {num(today.masuk)} masuk
          </span>
        </div>
        <div className="mt-3 flex items-center gap-4 text-xs font-semibold text-mute">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-sea" /> Masuk
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" /> Keluar
          </span>
        </div>
        <div className="mt-2">
          <FlowChart data={flow} />
        </div>
        <p className="mt-3 rounded-xl bg-canvas p-3 text-xs leading-relaxed text-mute">
          Volume naik konsisten 6 hari berturut-turut. Kapasitas gudang Cakung
          tinggal 17% — pertimbangkan overflow ke gudang Rungkut.
        </p>
      </div>
    </div>
  );
}
