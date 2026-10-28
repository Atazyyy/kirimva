// Data contoh Kirimva — seluruh nama, resi, dan angka bersifat FIKTIF.
// Timestamp dihitung relatif terhadap waktu halaman dibuka supaya demo
// selalu terlihat "hidup" (ada kiriman hari ini, transit, dsb).

const H = 3600000; // satu jam dalam ms

export const WA_NUMBER = "6281234567890";

export const HERO_IMG =
  "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=70";

// ---------- Tahapan pengiriman ----------
export const STAGES = [
  { id: "pickup", label: "Pickup", desc: "Paket diambil dari pengirim" },
  { id: "gudang", label: "Masuk Gudang", desc: "Sorting di gudang asal" },
  { id: "transit", label: "Transit", desc: "Dalam perjalanan antar-kota" },
  { id: "antar", label: "Kurir Antar", desc: "Kurir mengantar ke penerima" },
  { id: "terkirim", label: "Terkirim", desc: "Paket diterima" },
];

export const STATUS_STYLE = {
  pickup: "bg-sky-50 text-sky-700",
  gudang: "bg-indigo-50 text-indigo-700",
  transit: "bg-amber-50 text-amber-700",
  antar: "bg-accent-soft text-orange-700",
  terkirim: "bg-emerald-50 text-emerald-700",
};

export const stageIndex = (id) => STAGES.findIndex((s) => s.id === id);
export const stageById = (id) => STAGES.find((s) => s.id === id) || STAGES[0];

// ---------- Kurir ----------
export const COURIERS = [
  { id: "c1", name: "Dedi Kurniawan", region: "Bandung Kota", status: "Aktif", tasks: 14, capacity: 20 },
  { id: "c2", name: "Rizal Fauzi", region: "Jakarta Selatan", status: "Aktif", tasks: 18, capacity: 20 },
  { id: "c3", name: "Sinta Melati", region: "Bekasi & Depok", status: "Aktif", tasks: 9, capacity: 20 },
  { id: "c4", name: "Agus Prasetyo", region: "Surabaya Timur", status: "Aktif", tasks: 11, capacity: 20 },
  { id: "c5", name: "Yanto Simanjuntak", region: "Bandung Timur", status: "Istirahat", tasks: 6, capacity: 20 },
];

export const courierById = (id) => COURIERS.find((c) => c.id === id);

// ---------- Gudang ----------
export const WAREHOUSES = [
  { id: "w1", name: "Gudang Cakung", city: "Jakarta", used: 2910, capacity: 3500, inToday: 412, outToday: 385 },
  { id: "w2", name: "Gudang Cimahi", city: "Bandung", used: 1840, capacity: 2500, inToday: 296, outToday: 301 },
  { id: "w3", name: "Gudang Rungkut", city: "Surabaya", used: 1120, capacity: 2000, inToday: 178, outToday: 165 },
];

// Pergerakan paket jaringan 7 hari terakhir: [masuk, keluar]
const FLOW_NUMS = [
  [612, 590],
  [655, 631],
  [702, 676],
  [668, 649],
  [741, 702],
  [830, 798],
  [886, 851],
];

export function weeklyFlow() {
  return FLOW_NUMS.map((v, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
      label: d.toLocaleDateString("id-ID", { weekday: "short" }),
      masuk: v[0],
      keluar: v[1],
    };
  });
}

// ---------- Kiriman ----------
const SPECS = [
  {
    resi: "KVA-284519", recipient: "Rina Kartika", origin: "Jakarta Selatan", dest: "Bandung",
    service: "Express", weight: 1.8, courierId: "c1", eta: "Estimasi tiba besok pagi",
    events: [
      { h: 27, place: "Tebet, Jakarta Selatan" },
      { h: 23, place: "Gudang Cakung, Jakarta" },
      { h: 5, place: "Hub Purwakarta" },
    ],
  },
  {
    resi: "KVA-307762", recipient: "Budi Santoso", origin: "Bandung", dest: "Surabaya",
    service: "Reguler", weight: 2.4, courierId: "c4", eta: "Estimasi tiba hari ini",
    events: [
      { h: 52, place: "Coblong, Bandung" },
      { h: 47, place: "Gudang Cimahi, Bandung" },
      { h: 26, place: "Hub Semarang" },
      { h: 4, place: "Surabaya" },
    ],
  },
  {
    resi: "KVA-411093", recipient: "Siti Rahmawati", origin: "Jakarta Selatan", dest: "Bekasi",
    service: "Same Day", weight: 0.8, courierId: "c3", eta: "Estimasi tiba hari ini",
    events: [
      { h: 6, place: "Kebayoran Baru, Jakarta Selatan" },
      { h: 5, place: "Sorting Cakung, Jakarta" },
      { h: 2.5, place: "Sorting Bekasi" },
      { h: 1, place: "Bekasi Selatan" },
    ],
  },
  {
    resi: "KVA-198340", recipient: "Andi Wijaya", origin: "Bandung", dest: "Bandung",
    service: "Same Day", weight: 1.2, courierId: "c1", eta: "Paket diterima",
    events: [
      { h: 8, place: "Cicadas, Bandung" },
      { h: 7, place: "Gudang Cimahi, Bandung" },
      { h: 5, place: "Hub Cimahi" },
      { h: 3, place: "Bandung Kota" },
      { h: 1.5, place: "Bandung Kota — diterima langsung" },
    ],
  },
  {
    resi: "KVA-635771", recipient: "Fajar Nugroho", origin: "Jakarta Selatan", dest: "Bekasi",
    service: "Same Day", weight: 2, courierId: "c3", eta: "Paket diterima",
    events: [
      { h: 7, place: "Pasar Minggu, Jakarta Selatan" },
      { h: 6, place: "Sorting Cakung, Jakarta" },
      { h: 4, place: "Sorting Bekasi" },
      { h: 3.5, place: "Bekasi Selatan" },
      { h: 3, place: "Bekasi Selatan — diterima di receptionis" },
    ],
  },
  {
    resi: "KVA-522618", recipient: "Dewi Lestari", origin: "Surabaya", dest: "Jakarta Selatan",
    service: "Express", weight: 1.5, courierId: "c2", eta: "Paket diterima",
    events: [
      { h: 30, place: "Gubeng, Surabaya" },
      { h: 28, place: "Gudang Rungkut, Surabaya" },
      { h: 12, place: "Hub Cikampek" },
      { h: 6, place: "Jakarta Selatan" },
      { h: 4, place: "Jakarta Selatan — diterima keluarga" },
    ],
  },
  {
    resi: "KVA-741025", recipient: "Mega Puspita", origin: "Bandung", dest: "Yogyakarta",
    service: "Ekonomi", weight: 3.6, courierId: "c1", eta: "Estimasi tiba 4–6 hari",
    events: [
      { h: 11, place: "Padalarang, Bandung" },
      { h: 6, place: "Gudang Cimahi, Bandung" },
    ],
  },
  {
    resi: "KVA-858204", recipient: "Hendra Gunawan", origin: "Jakarta Selatan", dest: "Medan",
    service: "Reguler", weight: 5.2, courierId: "c2", eta: "Estimasi tiba 3–5 hari",
    events: [
      { h: 49, place: "Mampang, Jakarta Selatan" },
      { h: 45, place: "Gudang Cakung, Jakarta" },
      { h: 8, place: "Pelabuhan Belawan, Medan" },
    ],
  },
  {
    resi: "KVA-917655", recipient: "Ayu Wulandari", origin: "Bandung", dest: "Semarang",
    service: "Reguler", weight: 1.1, courierId: "c1", eta: "Estimasi tiba 2–4 hari",
    events: [{ h: 2, place: "Buahbatu, Bandung" }],
  },
  {
    resi: "KVA-120988", recipient: "Rudi Hartono", origin: "Surabaya", dest: "Makassar",
    service: "Ekonomi", weight: 7.4, courierId: "c4", eta: "Estimasi tiba 5–7 hari",
    events: [
      { h: 74, place: "Rungkut, Surabaya" },
      { h: 70, place: "Gudang Rungkut, Surabaya" },
      { h: 48, place: "Pelabuhan Tanjung Perak" },
    ],
  },
  {
    resi: "KVA-230476", recipient: "Lina Marlina", origin: "Bandung", dest: "Cimahi",
    service: "Express", weight: 0.5, courierId: "c1", eta: "Estimasi tiba hari ini",
    events: [
      { h: 6, place: "Arcamanik, Bandung" },
      { h: 4.5, place: "Gudang Cimahi, Bandung" },
      { h: 3.5, place: "Hub Cimahi" },
      { h: 2, place: "Cimahi" },
    ],
  },
  {
    resi: "KVA-345910", recipient: "Tono Prasetyo", origin: "Bekasi", dest: "Bandung",
    service: "Reguler", weight: 2.2, courierId: "c3", eta: "Estimasi tiba 2–4 hari",
    events: [
      { h: 5, place: "Bekasi Timur" },
      { h: 2, place: "Sorting Bekasi" },
    ],
  },
];

function buildShipment(spec) {
  const now = Date.now();
  const timeline = spec.events.map((e, i) => ({
    stage: STAGES[i].id,
    place: e.place,
    ts: now - e.h * H,
  }));
  const last = timeline[timeline.length - 1];
  return {
    resi: spec.resi,
    recipient: spec.recipient,
    origin: spec.origin,
    dest: spec.dest,
    service: spec.service,
    weightKg: spec.weight,
    courierId: spec.courierId,
    eta: spec.eta,
    status: last.stage,
    bookedTs: timeline[0].ts,
    updatedAt: last.ts,
    deliveredTs: last.stage === "terkirim" ? last.ts : null,
    timeline,
  };
}

export const SHIPMENTS = SPECS.map(buildShipment).sort((a, b) => b.updatedAt - a.updatedAt);

export function findShipment(rawResi) {
  const clean = String(rawResi || "").trim().toUpperCase();
  if (!clean) return null;
  const withPrefix = clean.startsWith("KVA") ? clean : "KVA-" + clean.replace(/[^0-9]/g, "");
  return SHIPMENTS.find((s) => s.resi === withPrefix) || SHIPMENTS.find((s) => s.resi === clean) || null;
}

// Resi contoh untuk tombol isi-otomatis di form lacak
export const EXAMPLE_RESIS = [
  { resi: "KVA-284519", label: "Contoh — sedang transit" },
  { resi: "KVA-307762", label: "Contoh — kurir antar" },
  { resi: "KVA-198340", label: "Contoh — sudah terkirim" },
];
