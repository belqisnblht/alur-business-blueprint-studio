import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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

const products = [
  { id: 1, name: "Wooden Photo Box", price: 185000 },
  { id: 2, name: "Engraved Photo Frame", price: 120000 },
  { id: 3, name: "Wooden Story Book", price: 245000 },
];

const rupiah = (n: number) => "Rp" + n.toLocaleString("id-ID");
const tabs = ["Katalog & Kustom", "Checkout", "Lacak Pesanan", "Dashboard Admin"] as const;

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
  const [tab, setTab] = useState<(typeof tabs)[number]>(tabs[0]);
  const [prod, setProd] = useState(products[0]);
  const [text, setText] = useState("Better Together");
  const [card, setCard] = useState(false);
  const [paid, setPaid] = useState(false);
  const [approved, setApproved] = useState<null | boolean>(null);
  const ongkir = 18000;
  const total = prod.price + ongkir + (card ? 10000 : 0);

  return (
    <section id="mockup" className="mx-auto max-w-6xl px-6 py-12">
      <h2 className="font-display text-3xl font-bold">3. Mockup Website</h2>
      <p className="mt-2 text-muted-foreground">Klik setiap tab untuk mencoba alurnya.</p>
      <div className="mt-6 overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
        <div className="flex items-center gap-2 border-b border-border bg-secondary px-4 py-3">
          <span className="size-3 rounded-full bg-destructive" /><span className="size-3 rounded-full bg-chart-3" /><span className="size-3 rounded-full bg-accent" />
          <span className="ml-3 rounded-md bg-card px-3 py-1 text-xs text-muted-foreground">kayustorygift.id</span>
        </div>
        <div className="flex flex-wrap gap-2 border-b border-border p-3">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`rounded-full px-4 py-2 text-sm font-semibold ${tab === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{t}</button>
          ))}
        </div>
        <div className="p-6">
          {tab === "Katalog & Kustom" && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                {products.map((p) => (
                  <button key={p.id} onClick={() => setProd(p)} className={`flex w-full items-center justify-between rounded-xl border p-4 text-left ${prod.id === p.id ? "border-primary bg-secondary" : "border-border"}`}>
                    <span className="font-semibold">{p.name}</span><span className="text-primary">{rupiah(p.price)}</span>
                  </button>
                ))}
                <label className="block text-sm font-semibold">Teks ukiran<input value={text} onChange={(e) => setText(e.target.value)} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 font-normal" /></label>
                <label className="block text-sm font-semibold">Unggah foto<div className="mt-1 rounded-lg border border-dashed border-input p-4 text-center font-normal text-muted-foreground">Tarik foto ke sini (tersimpan ke Drive: /KSG-0142)</div></label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={card} onChange={(e) => setCard(e.target.checked)} /> Tambah kartu ucapan (+Rp10.000)</label>
                <button onClick={() => setTab("Checkout")} className="w-full rounded-full bg-wood py-3 font-semibold text-primary-foreground">Lanjut ke Checkout</button>
              </div>
              <div className="relative">
                <img src={hero} alt="Pratinjau produk" loading="lazy" width={1024} height={1024} className="rounded-2xl" />
                <span className="absolute bottom-4 left-4 rounded-lg bg-card/90 px-3 py-1 font-display text-lg">{text || "—"}</span>
              </div>
            </div>
          )}
          {tab === "Checkout" && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                {["Nama penerima", "No. WhatsApp", "Alamat lengkap"].map((f) => (
                  <input key={f} placeholder={f} className="w-full rounded-lg border border-input bg-background px-3 py-2" />
                ))}
                <div className="rounded-lg bg-muted p-3 text-sm">Ekspedisi: JNE REG · ongkir dihitung otomatis {rupiah(ongkir)}</div>
                <div className="text-sm font-semibold">Metode bayar</div>
                <div className="grid grid-cols-3 gap-2 text-sm">{["QRIS", "VA BCA", "E-Wallet"].map((m) => <span key={m} className="rounded-lg border border-border p-2 text-center">{m}</span>)}</div>
              </div>
              <div className="rounded-2xl bg-secondary p-5">
                <div className="font-display text-xl font-bold">Ringkasan</div>
                <div className="mt-3 space-y-1 text-sm">
                  <div className="flex justify-between"><span>{prod.name}</span><span>{rupiah(prod.price)}</span></div>
                  {card && <div className="flex justify-between"><span>Kartu ucapan</span><span>Rp10.000</span></div>}
                  <div className="flex justify-between"><span>Ongkir</span><span>{rupiah(ongkir)}</span></div>
                  <div className="flex justify-between border-t border-border pt-2 font-bold"><span>Total (lunas)</span><span>{rupiah(total)}</span></div>
                </div>
                <button onClick={() => { setPaid(true); setTab("Lacak Pesanan"); }} className="mt-4 w-full rounded-full bg-wood py-3 font-semibold text-primary-foreground">Bayar Sekarang</button>
              </div>
            </div>
          )}
          {tab === "Lacak Pesanan" && (
            <div>
              <div className="font-display text-xl font-bold">Pesanan KSG-0142</div>
              <div className="mt-4 grid gap-2 md:grid-cols-6">
                {["Dibayar", "Desain", "Review", "Produksi", "Packing", "Dikirim"].map((s, i) => {
                  const done = paid && (i < 2 || (i === 2 && approved) || (i > 2 && approved && i < 3));
                  const active = paid && ((i === 2 && !approved) || (i === 3 && approved));
                  return <div key={s} className={`rounded-lg p-3 text-center text-sm font-semibold ${done ? "bg-accent text-accent-foreground" : active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{s}</div>;
                })}
              </div>
              {!paid ? <p className="mt-4 text-muted-foreground">Belum ada pembayaran — selesaikan checkout dulu.</p> : (
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <img src={hero} alt="Draft desain" loading="lazy" width={1024} height={1024} className="rounded-2xl" />
                  <div>
                    <div className="font-semibold">Draft desain dari tim grafis</div>
                    <p className="mt-1 text-sm text-muted-foreground">Periksa foto & teks “{text}”. Setujui agar produk masuk produksi.</p>
                    {approved === null ? (
                      <div className="mt-4 flex gap-3">
                        <button onClick={() => setApproved(true)} className="rounded-full bg-accent px-5 py-2 font-semibold text-accent-foreground">Setujui</button>
                        <button onClick={() => setApproved(false)} className="rounded-full border border-border px-5 py-2 font-semibold">Minta Revisi</button>
                      </div>
                    ) : approved ? <p className="mt-4 font-semibold text-accent">Disetujui — pesanan masuk produksi.</p> : (
                      <div className="mt-4 space-y-2"><textarea placeholder="Tulis catatan revisi..." className="w-full rounded-lg border border-input bg-background p-3" /><button onClick={() => setApproved(null)} className="rounded-full bg-primary px-5 py-2 font-semibold text-primary-foreground">Kirim Revisi</button></div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          {tab === "Dashboard Admin" && (
            <div>
              <div className="grid gap-4 md:grid-cols-4">
                {[["Pesanan bulan ini", "128"], ["Pendapatan", "Rp24,6 jt"], ["Menunggu review", "9"], ["Siap kirim", "14"]].map(([k, v]) => (
                  <div key={k} className="rounded-2xl bg-sidebar p-4 text-sidebar-foreground"><div className="text-xs">{k}</div><div className="font-display text-2xl font-bold text-sidebar-primary">{v}</div></div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-sm"><span className="font-semibold">Rekap otomatis → Google Sheets “Pesanan 2026”</span><span className="rounded-full bg-accent px-3 py-1 text-accent-foreground">Tersinkron</span></div>
              <div className="mt-3 overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-secondary text-left"><tr>{["Kode", "Pelanggan", "Produk", "Total", "Bayar", "Status", "Folder Drive", "Resi"].map((h) => <th key={h} className="px-3 py-2">{h}</th>)}</tr></thead>
                  <tbody>
                    {[
                      ["KSG-0142", "Rina & Dimas", prod.name, rupiah(total), paid ? "Lunas" : "Menunggu", paid ? (approved ? "Produksi" : "Review") : "—", "/KSG-0142", ""],
                      ["KSG-0141", "Andi P.", "Engraved Photo Frame", "Rp138.000", "Lunas", "Dikirim", "/KSG-0141", "JNE8812…"],
                      ["KSG-0140", "Salsa", "Wooden Story Book", "Rp263.000", "Lunas", "Packing", "/KSG-0140", ""],
                    ].map((r) => (
                      <tr key={r[0]} className="border-t border-border">{r.map((c, i) => <td key={i} className="px-3 py-2">{i === 7 && !c ? <input placeholder="Input resi" className="w-24 rounded border border-input bg-background px-2 py-1" /> : c}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
