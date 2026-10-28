import { useState } from "react";
import { motion } from "framer-motion";
import { Bike, CheckCircle2, ClipboardList, Timer, Truck, Warehouse } from "lucide-react";
import { SHIPMENTS } from "../data/seed";
import { durLabel, fullDate, isSameDay } from "../utils/format";
import Shipments from "./Shipments";
import Couriers from "./Couriers";
import Warehouses from "./Warehouses";

const TABS = [
  { id: "kiriman", label: "Kiriman", icon: ClipboardList },
  { id: "kurir", label: "Kurir", icon: Bike },
  { id: "gudang", label: "Gudang", icon: Warehouse },
];

function StatCard({ icon: Icon, tone, value, label }) {
  const tones = {
    sea: "bg-sea-soft text-sea-deep",
    emerald: "bg-emerald-50 text-emerald-600",
    orange: "bg-accent-soft text-orange-600",
  };
  return (
    <div className="rounded-2xl border border-edge bg-card p-5">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tones[tone]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-4 text-2xl font-extrabold text-ink">{value}</p>
      <p className="mt-0.5 text-sm text-mute">{label}</p>
    </div>
  );
}

export default function Dashboard({ onTrack }) {
  const [tab, setTab] = useState("kiriman");

  const active = SHIPMENTS.filter((s) => s.status !== "terkirim").length;
  const deliveredToday = SHIPMENTS.filter(
    (s) => s.deliveredTs && isSameDay(s.deliveredTs, Date.now())
  ).length;
  const durations = SHIPMENTS.filter((s) => s.deliveredTs).map(
    (s) => (s.deliveredTs - s.bookedTs) / 3600000
  );
  const avgHours = durations.length
    ? durations.reduce((a, b) => a + b, 0) / durations.length
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink">
          Dashboard Operasional
        </h1>
        <p className="mt-1 text-sm text-mute">{fullDate()} · Jaringan Jawa–Sumatera–Sulawesi</p>
      </div>

      {/* Stat ringkas */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={Truck} tone="sea" label="Kiriman aktif" value={active} />
        <StatCard icon={CheckCircle2} tone="emerald" label="Terkirim hari ini" value={deliveredToday} />
        <StatCard icon={Timer} tone="orange" label="Rata-rata lama kirim" value={durLabel(avgHours)} />
      </div>

      {/* Sub-tab */}
      <div className="flex flex-wrap items-center gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
              tab === t.id
                ? "bg-sea text-white shadow-sm"
                : "border border-edge bg-card text-mute hover:border-sea hover:text-sea"
            }`}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {tab === "kiriman" && <Shipments onTrack={onTrack} />}
        {tab === "kurir" && <Couriers />}
        {tab === "gudang" && <Warehouses />}
      </motion.div>
    </div>
  );
}
