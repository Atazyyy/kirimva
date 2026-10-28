import { Bike, Coffee, MapPin, UserRound } from "lucide-react";
import { COURIERS } from "../data/seed";

const STATUS_STYLE = {
  Aktif: "bg-emerald-50 text-emerald-700",
  Istirahat: "bg-amber-50 text-amber-700",
};

// Warna bar beban sesuai persentase
function loadColor(pct) {
  if (pct >= 85) return "bg-red-500";
  if (pct >= 60) return "bg-amber-400";
  return "bg-sea";
}

function initial(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

export default function Couriers() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-mute">
        Beban tugas hari ini per kurir — kapasitas ideal 20 paket/hari.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COURIERS.map((c) => {
          const pct = Math.round((c.tasks / c.capacity) * 100);
          return (
            <div
              key={c.id}
              className="rounded-2xl border border-edge bg-card p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sea-soft text-sm font-extrabold text-sea-deep">
                    {initial(c.name)}
                  </div>
                  <div>
                    <p className="font-bold text-ink">{c.name}</p>
                    <p className="inline-flex items-center gap-1 text-xs text-mute">
                      <MapPin className="h-3 w-3" /> {c.region}
                    </p>
                  </div>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${STATUS_STYLE[c.status] || "bg-canvas text-mute"}`}
                >
                  {c.status}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs font-semibold">
                <span className="inline-flex items-center gap-1.5 text-mute">
                  {c.status === "Istirahat" ? (
                    <Coffee className="h-3.5 w-3.5" />
                  ) : (
                    <Bike className="h-3.5 w-3.5 text-sea" />
                  )}
                  Tugas hari ini
                </span>
                <span className="text-ink">
                  {c.tasks}
                  <span className="text-mute">/{c.capacity} paket</span>
                </span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-canvas">
                <div
                  className={`h-full rounded-full ${c.status === "Istirahat" ? "bg-mute/40" : loadColor(pct)}`}
                  style={{ width: `${Math.min(pct, 100)}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-mute">
                Beban {pct}%{" "}
                {pct >= 85 ? (
                  <span className="font-bold text-red-500">· beban tinggi</span>
                ) : (
                  "· masih sehat"
                )}
              </p>
            </div>
          );
        })}

        {/* Kartu ringkasan */}
        <div className="flex flex-col justify-between rounded-2xl border border-dashed border-sea/40 bg-sea-soft/60 p-5">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sea text-white">
              <UserRound className="h-5 w-5" />
            </div>
            <p className="mt-3 font-bold text-ink">Rekrut kurir baru</p>
            <p className="mt-1 text-sm text-mute">
              Rata-rata beban kurir aktif 65%. Butuh 2 kurir tambahan untuk area
              Depok &amp; Cimahi sebelum musim ramai.
            </p>
          </div>
          <p className="mt-4 rounded-xl bg-card px-3 py-2 text-xs font-bold text-sea-deep ring-1 ring-sea/30">
            4 dari 5 kurir aktif hari ini
          </p>
        </div>
      </div>
    </div>
  );
}
