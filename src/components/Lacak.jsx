import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Clock,
  History,
  MapPin,
  Package,
  Search,
  Truck,
  User,
  Weight,
  XCircle,
} from "lucide-react";
import {
  EXAMPLE_RESIS,
  HERO_IMG,
  STAGES,
  STATUS_STYLE,
  courierById,
  findShipment,
  stageIndex,
} from "../data/seed";
import { fmtDateTime } from "../utils/format";
import { useTrackedHistory } from "../hooks/useTrackedHistory";
import { WA_LINK } from "./Navbar";

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${STATUS_STYLE[status]}`}
    >
      {STAGES.find((s) => s.id === status)?.label}
    </span>
  );
}

function ShipmentCard({ shipment }) {
  const cur = stageIndex(shipment.status);
  const courier = courierById(shipment.courierId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border border-edge bg-card p-5 shadow-sm md:p-6"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-mute">
            Nomor resi
          </p>
          <p className="text-xl font-extrabold tracking-tight text-ink md:text-2xl">
            {shipment.resi}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-sea-soft px-3 py-1 text-xs font-bold text-sea-deep">
            {shipment.service}
          </span>
          <StatusBadge status={shipment.status} />
        </div>
      </div>

      {/* Rute */}
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <span className="inline-flex items-center gap-1.5 font-semibold text-ink">
          <MapPin className="h-4 w-4 text-sea" /> {shipment.origin}
        </span>
        <ArrowRight className="h-4 w-4 text-mute" />
        <span className="inline-flex items-center gap-1.5 font-semibold text-ink">
          <MapPin className="h-4 w-4 text-accent" /> {shipment.dest}
        </span>
        <span className="text-mute">· {shipment.eta}</span>
      </div>

      {/* Meta */}
      <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-canvas p-4 text-sm md:grid-cols-4">
        <div>
          <p className="text-xs text-mute">Penerima</p>
          <p className="mt-0.5 inline-flex items-center gap-1.5 font-bold text-ink">
            <User className="h-3.5 w-3.5 text-mute" /> {shipment.recipient}
          </p>
        </div>
        <div>
          <p className="text-xs text-mute">Berat</p>
          <p className="mt-0.5 inline-flex items-center gap-1.5 font-bold text-ink">
            <Weight className="h-3.5 w-3.5 text-mute" /> {shipment.weightKg} kg
          </p>
        </div>
        <div>
          <p className="text-xs text-mute">Kurir</p>
          <p className="mt-0.5 inline-flex items-center gap-1.5 font-bold text-ink">
            <Truck className="h-3.5 w-3.5 text-mute" /> {courier?.name || "—"}
          </p>
        </div>
        <div>
          <p className="text-xs text-mute">Terakhir update</p>
          <p className="mt-0.5 inline-flex items-center gap-1.5 font-bold text-ink">
            <Clock className="h-3.5 w-3.5 text-mute" /> {fmtDateTime(shipment.updatedAt)}
          </p>
        </div>
      </div>

      {/* Timeline 5 tahap */}
      <h3 className="mt-6 font-bold text-ink">Perjalanan paket</h3>
      <ol className="mt-4">
        {STAGES.map((s, i) => {
          const state = i < cur ? "done" : i === cur ? "current" : "todo";
          const ev = shipment.timeline[i];
          return (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.3 }}
              className="relative flex gap-4 pb-6 last:pb-0"
            >
              {i < STAGES.length - 1 && (
                <span
                  className={`absolute left-[19px] top-11 h-[calc(100%-2.75rem)] w-0.5 rounded ${
                    state === "done" ? "bg-sea" : "bg-edge"
                  }`}
                />
              )}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${
                  state === "done"
                    ? "border-sea bg-sea text-white"
                    : state === "current"
                      ? "animate-pulse border-accent bg-accent text-white"
                      : "border-edge bg-canvas text-mute"
                }`}
              >
                {state === "done" ? (
                  <Check className="h-5 w-5" />
                ) : state === "current" ? (
                  <Truck className="h-5 w-5" />
                ) : (
                  <Package className="h-4 w-4" />
                )}
              </div>
              <div className="pt-1">
                <p
                  className={`font-bold ${
                    state === "todo" ? "text-mute" : "text-ink"
                  }`}
                >
                  {s.label}
                  {state === "current" && (
                    <span className="ml-2 rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-extrabold uppercase text-orange-700">
                      Posisi sekarang
                    </span>
                  )}
                </p>
                {ev ? (
                  <>
                    <p className="text-sm text-mute">{ev.place}</p>
                    <p className="text-xs text-mute/70">{fmtDateTime(ev.ts)}</p>
                  </>
                ) : (
                  <p className="text-sm text-mute/60">Menunggu pembaruan…</p>
                )}
              </div>
            </motion.li>
          );
        })}
      </ol>
    </motion.div>
  );
}

export default function Lacak({ initialQuery }) {
  const [input, setInput] = useState(initialQuery || "");
  const [result, setResult] = useState(null);
  const { history, add, clear } = useTrackedHistory();

  const track = (raw) => {
    const shipment = findShipment(raw);
    if (shipment) {
      add(shipment.resi);
      setResult({ ok: true, shipment });
    } else {
      setResult({ ok: false, resi: String(raw || "").trim().toUpperCase() });
    }
  };

  // Dipicu saat klik resi dari tabel dashboard
  useEffect(() => {
    if (initialQuery) {
      setInput(initialQuery);
      track(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  const submit = (e) => {
    e.preventDefault();
    if (input.trim()) track(input);
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center rounded-full bg-sea-soft px-3 py-1 text-xs font-bold text-sea-deep">
            Ekspedisi &amp; logistik · data demo fiktif
          </span>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl">
            Lacak kirimanmu,{" "}
            <span className="text-sea">dari pickup sampai tukang paket pulang.</span>
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-mute md:text-base">
            Masukkan nomor resi untuk melihat posisi paket di 5 tahap pengiriman —
            lengkap dengan tanggal, jam, dan kota terakhir.
          </p>

          {/* Form lacak */}
          <form onSubmit={submit} className="mt-6">
            <div className="flex flex-col gap-2 rounded-2xl border border-edge bg-card p-2 shadow-sm sm:flex-row">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ketik nomor resi, cth. KVA-284519"
                className="w-full rounded-xl border-0 bg-canvas px-4 py-3 text-sm font-semibold uppercase text-ink outline-none ring-1 ring-edge placeholder:font-normal placeholder:normal-case placeholder:text-mute/70 focus:ring-2 focus:ring-sea"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-600"
              >
                <Search className="h-4 w-4" />
                Lacak Paket
              </button>
            </div>
          </form>

          {/* Resi contoh — klik untuk isi otomatis */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-mute">Coba resi contoh:</span>
            {EXAMPLE_RESIS.map((ex) => (
              <button
                key={ex.resi}
                onClick={() => {
                  setInput(ex.resi);
                  track(ex.resi);
                }}
                title={ex.label}
                className="rounded-full border border-edge bg-card px-3 py-1 text-xs font-bold text-sea transition-colors hover:border-sea hover:bg-sea-soft"
              >
                {ex.resi}
              </button>
            ))}
          </div>

          {/* Riwayat lacak (localStorage) */}
          {history.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-mute">
                <History className="h-3.5 w-3.5" /> Baru dilacak:
              </span>
              {history.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setInput(r);
                    track(r);
                  }}
                  className="rounded-full bg-canvas px-3 py-1 text-xs font-bold text-mute transition-colors hover:bg-sea-soft hover:text-sea"
                >
                  {r}
                </button>
              ))}
              <button
                onClick={clear}
                className="text-xs font-semibold text-mute/70 underline hover:text-mute"
              >
                hapus
              </button>
            </div>
          )}
        </div>

        <div className="relative hidden lg:block">
          <img
            src={HERO_IMG}
            alt="Armada truk Kirimva berangkat dari gudang"
            className="h-80 w-full rounded-3xl object-cover shadow-md"
            loading="lazy"
          />
          <div className="absolute -bottom-5 left-6 rounded-2xl border border-edge bg-card px-5 py-3 shadow-lg">
            <p className="text-2xl font-extrabold text-sea">98,2%</p>
            <p className="text-xs font-semibold text-mute">terkirim tepat waktu (30 hari)</p>
          </div>
          <div className="absolute -top-4 right-6 rounded-2xl border border-edge bg-card px-4 py-2.5 shadow-lg">
            <p className="text-sm font-extrabold text-ink">12.480 paket</p>
            <p className="text-xs text-mute">terkirim minggu ini</p>
          </div>
        </div>
      </section>

      {/* Hasil */}
      {result && !result.ok && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-start gap-3 rounded-2xl border border-edge bg-card p-6 sm:flex-row sm:items-center"
        >
          <XCircle className="h-8 w-8 shrink-0 text-orange-600" />
          <div>
            <p className="font-bold text-ink">
              Resi {result.resi || "(kosong)"} tidak ditemukan.
            </p>
            <p className="mt-1 text-sm text-mute">
              Periksa kembali nomornya, atau coba salah satu resi contoh di atas.
              Butuh bantuan?{" "}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-sea hover:text-sea-deep"
              >
                Chat CS Kirimva
              </a>
              .
            </p>
          </div>
        </motion.div>
      )}
      {result && result.ok && <ShipmentCard shipment={result.shipment} />}
    </div>
  );
}
