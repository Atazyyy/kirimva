Kategori: Web App — Ekspedisi/Logistik

# Kirimva — Lacak Resi & Dashboard Logistik

> **Kategori proyek: Web App — Ekspedisi/Logistik.**
> Pelanggan lacak resi dengan timeline 5 tahap; tim operasional memantau
> kiriman, kurir, dan gudang dari satu dashboard.

Aplikasi ekspedisi fiktif "Kirimva" — dari form lacak resi yang ramah
pelanggan sampai panel operasional harian. Proyek ini adalah **concept demo**
untuk portofolio jasa pembuatan web app — seluruh nama, resi, kurir, dan
angka bersifat fiktif. Nama "Kirimva" sengaja dibuat unik (belum dipakai
entitas mana pun di internet).

**Live:** https://kirimva.vercel.app

## Fitur

- **Lacak resi**: form pencarian dengan resi contoh yang bisa diklik untuk
  isi otomatis → timeline 5 tahap (Pickup → Masuk Gudang → Transit → Kurir
  Antar → Terkirim) lengkap dengan tanggal, jam, dan kota tiap peristiwa.
- **Riwayat lacak** tersimpan di **localStorage** (chip "baru dilacak").
- **Dashboard — tab Kiriman**: tabel 12 kiriman (resi, penerima, kota
  tujuan, layanan, badge status) + pencarian + filter status berjumlah +
  urutkan terbaru/terlama; klik resi langsung membuka detail perjalanan.
- **Dashboard — tab Kurir**: 5 kurir (wilayah, tugas hari ini, status
  aktif/istirahat) dengan bar beban yang berubah warna saat mendekati
  kapasitas.
- **Dashboard — tab Gudang**: okupansi 3 gudang (progress bar + status
  "hampir penuh"), paket masuk/keluar hari ini, dan grafik SVG buatan
  sendiri pergerakan paket 7 hari (masuk vs keluar).
- **Stat ringkas**: kiriman aktif, terkirim hari ini, dan rata-rata lama
  kirim — dihitung langsung dari data.
- Responsif desktop + mobile (tabel berubah jadi kartu), animasi halus
  Framer Motion, ikon Lucide, tanpa backend & tanpa library chart.

## Untuk siapa demo ini?

Perusahaan ekspedisi, kargo, kurir lokal, atau bisnis dengan armada
pengiriman yang butuh halaman lacak publik + dashboard operasional internal.

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4 (token tema `@theme`)
- Framer Motion
- Lucide Icons
- Grafik SVG custom (tanpa library chart)

## Menjalankan

```bash
npm install
npm run dev      # development
npm run build    # production build ke folder dist/
npm run preview  # preview hasil build
```

---

Dibuat oleh [Agni Miftah Fauzi](https://github.com/Atazyyy) — jasa pembuatan
website & web app.
