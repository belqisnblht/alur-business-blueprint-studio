import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-gift.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kayu Story Gift — Solusi Proses Bisnis & Mockup" },
      { name: "description", content: "Usulan proses bisnis To-Be dan mockup website pemesanan kado kayu kustom Kayu Story Gift." },
      { property: "og:title", content: "Kayu Story Gift — Solusi Proses Bisnis & Mockup" },
      { property: "og:description", content: "Proses bisnis To-Be dan mockup website pemesanan terintegrasi untuk Kayu Story Gift." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const problems = [
  { p: "Pelanggan harus pindah manual dari website ke WhatsApp/Shopee/Tokopedia", s: "Checkout langsung di website: pilih produk, kustomisasi, unggah foto, bayar dalam satu alur" },
  { p: "Data transaksi website belum otomatis masuk ke Google Sheets", s: "Setiap pesanan lunas otomatis tercatat ke Google Sheets (pesanan, pelanggan, keuangan)" },
  { p: "Validasi pembayaran dicek manual oleh tim keuangan", s: "Payment gateway (QRIS/VA) memverifikasi dana otomatis dan mengubah status menjadi Lunas" },
  { p: "Foto & detail kustom rawan tertukar, dipisah manual per nama", s: "Kode pesanan unik (KSG-xxxx) menautkan foto di Drive, baris Sheets, dan draft desain" },
  { p: "Review draft & revisi lewat chat yang tersebar", s: "Halaman lacak pesanan: pelanggan melihat draft lalu klik Setujui / Minta Revisi" },
  { p: "Penjualan sepi di luar Valentine & Natal", s: "Kategori momen sepanjang tahun (ulang tahun, wisuda, anniversary), promo & pengingat tanggal spesial" },
];

const lanes = [
  { name: "Pelanggan", steps: ["Buka website dari IG/TikTok", "Pilih produk & isi kustomisasi", "Unggah foto & cek ongkir otomatis", "Bayar via QRIS/VA", "Review draft → Setujui/Revisi", "Lacak resi"] },
  { name: "Sistem Website", steps: ["Hitung harga + ongkir", "Buat kode pesanan unik", "Verifikasi pembayaran otomatis", "Simpan foto ke folder Drive pesanan", "Rekap otomatis ke Google Sheets", "Kirim notifikasi status ke pelanggan"] },
  { name: "Admin & Keuangan", steps: ["Pantau dashboard pesanan", "Cek laporan keuangan otomatis", "Input resi ekspedisi"] },
  { name: "Tim Grafis", steps: ["Terima pesanan berstatus Lunas", "Buat draft desain", "Unggah draft ke sistem", "Revisi jika diminta"] },
  { name: "Produksi & Packing", steps: ["Terima desain disetujui", "Produksi kayu", "Packing + kartu ucapan", "Serahkan ke ekspedisi"] },
];


function Index() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Kelompok 4 · T3B · MSI</p>
          <h1 className="mt-3 font-display text-5xl font-bold leading-tight">Kayu Story Gift: Proses Bisnis To-Be & Mockup</h1>
          <p className="mt-4 text-lg text-muted-foreground">Solusi website pemesanan terintegrasi — transaksi langsung di website dan data otomatis terekap ke Google Sheets.</p>
          <div className="mt-6 flex gap-3">
            <a href="#solusi" className="rounded-full bg-wood px-6 py-3 font-semibold text-primary-foreground shadow-soft">Lihat Solusi</a>
            <a href="#mockup" className="rounded-full border border-border px-6 py-3 font-semibold">Coba Mockup</a>
          </div>
        </div>
        <img src={hero} alt="Kotak foto kayu ukir" width={1024} height={1024} className="rounded-3xl shadow-soft" />
      </header>

      <section id="solusi" className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="font-display text-3xl font-bold">1. Masalah → Solusi</h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          <div className="grid grid-cols-2 bg-secondary px-5 py-3 text-sm font-bold"><span>Kondisi As-Is</span><span>Solusi To-Be</span></div>
          {problems.map((r) => (
            <div key={r.p} className="grid grid-cols-2 gap-6 border-t border-border px-5 py-4 text-sm">
              <span className="text-muted-foreground">{r.p}</span><span className="font-medium">{r.s}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="font-display text-3xl font-bold">2. Proses Bisnis Usulan (To-Be)</h2>
        <p className="mt-2 text-muted-foreground">Swimlane alur pemesanan kustom setelah website terintegrasi.</p>
        <div className="mt-6 space-y-3">
          {lanes.map((l) => (
            <div key={l.name} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 md:flex-row md:items-center">
              <div className="w-44 shrink-0 font-display text-lg font-bold text-primary">{l.name}</div>
              <div className="flex flex-wrap items-center gap-2">
                {l.steps.map((s, i) => (
                  <span key={s} className="flex items-center gap-2">
                    <span className="rounded-lg bg-secondary px-3 py-2 text-sm">{s}</span>
                    {i < l.steps.length - 1 && <span className="text-primary">→</span>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[["Satu kanal", "Tidak ada perpindahan ke WhatsApp/marketplace"], ["Otomatis", "Pembayaran, rekap Sheets & folder Drive tanpa input manual"], ["Terlacak", "Status pesanan transparan dari bayar hingga resi"]].map(([t, d]) => (
            <div key={t} className="rounded-2xl bg-sidebar p-5 text-sidebar-foreground"><div className="font-display text-xl font-bold text-sidebar-primary">{t}</div><p className="mt-1 text-sm">{d}</p></div>
          ))}
        </div>
      </section>

      <Mockup />
      <footer className="py-10 text-center text-sm text-muted-foreground">Kayu Story Gift · Teknologi Informasi, Fakultas Vokasi UB 2026</footer>
    </div>
  );
}

function Mockup() {
  return (
    <section id="mockup" className="mx-auto max-w-6xl px-6 py-12">
      <h2 className="font-display text-3xl font-bold">3. Mockup Website</h2>
      <p className="mt-2 text-muted-foreground">Dua tampilan terpisah — coba keduanya.</p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Link to="/toko" className="group rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1">
          <div className="text-4xl">🛍️</div>
          <div className="mt-3 font-display text-2xl font-bold">Tampilan Pelanggan</div>
          <p className="mt-1 text-sm text-muted-foreground">Pilih produk → kustom & unggah foto → alamat → bayar → lacak & setujui draft.</p>
          <span className="mt-4 inline-block font-semibold text-primary">Buka toko →</span>
        </Link>
        <Link to="/admin" className="group rounded-3xl bg-sidebar p-6 text-sidebar-foreground shadow-soft transition hover:-translate-y-1">
          <div className="text-4xl">📊</div>
          <div className="mt-3 font-display text-2xl font-bold">Tampilan Admin</div>
          <p className="mt-1 text-sm opacity-80">Ringkasan, pesanan, desain, pengiriman & resi, keuangan — tersinkron Google Sheets.</p>
          <span className="mt-4 inline-block font-semibold text-sidebar-primary">Buka dashboard →</span>
        </Link>
      </div>
    </section>
  );
}
