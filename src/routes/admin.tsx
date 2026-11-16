import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import hero from "@/assets/hero-gift.jpg";
import { orders as seed, rupiah, statuses, type Status } from "@/lib/ksg-data";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Kayu Story Gift — Mockup Dashboard" },
      { name: "description", content: "Mockup dashboard admin: pesanan, review desain, keuangan, dan resi dengan rekap otomatis ke Google Sheets." },
      { property: "og:title", content: "Admin Kayu Story Gift — Mockup Dashboard" },
      { property: "og:description", content: "Kelola pesanan kado kayu kustom dari satu dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Admin,
});

const menus = [
  { k: "Ringkasan", i: "▦" },
  { k: "Pesanan", i: "☰" },
  { k: "Desain", i: "✎" },
  { k: "Pengiriman", i: "🚚" },
  { k: "Keuangan", i: "Rp" },
] as const;
type Menu = (typeof menus)[number]["k"];

const tone: Record<Status, string> = {
  "Menunggu Bayar": "bg-destructive/15 text-destructive",
  Lunas: "bg-chart-3/25 text-foreground",
  Desain: "bg-chart-1/20 text-primary",
  Review: "bg-primary/15 text-primary",
  Produksi: "bg-chart-4/20 text-foreground",
  Packing: "bg-chart-5/30 text-foreground",
  Dikirim: "bg-accent/20 text-accent",
  Diterima: "bg-accent text-accent-foreground",
};

function Badge({ s }: { s: Status }) {
  return <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${tone[s]}`}>{s}</span>;
}

function Admin() {
  const [menu, setMenu] = useState<Menu>("Ringkasan");
  const [orders, setOrders] = useState(seed);
  const [filter, setFilter] = useState<Status | "Semua">("Semua");
  const [sel, setSel] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const update = (id: string, patch: Partial<(typeof seed)[number]>) => setOrders((o) => o.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const next = (s: Status) => statuses[Math.min(statuses.indexOf(s) + 1, statuses.length - 1)]!;
  const selected = orders.find((o) => o.id === sel);
  const paid = orders.filter((o) => o.status !== "Menunggu Bayar");
  const income = paid.reduce((a, o) => a + o.total, 0);

  return (
    <div className="flex min-h-screen bg-background font-sans text-foreground">
      <aside className="hidden w-60 shrink-0 flex-col bg-sidebar p-5 text-sidebar-foreground md:flex">
        <Link to="/" className="font-display text-xl font-bold text-sidebar-primary">Kayu Story Gift</Link>
        <span className="mt-1 text-xs opacity-70">Panel Admin</span>
        <nav className="mt-8 space-y-1">
          {menus.map((m) => (
            <button key={m.k} onClick={() => setMenu(m.k)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${menu === m.k ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent"}`}>
              <span className="w-5 text-center">{m.i}</span>{m.k}
            </button>
          ))}
        </nav>
        <div className="mt-auto rounded-xl bg-sidebar-accent p-3 text-xs">
          <div className="flex items-center gap-2 font-semibold"><span className="size-2 rounded-full bg-accent" />Google Sheets tersinkron</div>
          <div className="mt-1 opacity-70">Update terakhir: baru saja</div>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden">
        <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <div>
            <h1 className="font-display text-2xl font-bold">{menu}</h1>
            <p className="text-xs text-muted-foreground">Senin, 16 November 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/toko" className="text-sm text-muted-foreground underline">Lihat toko →</Link>
            <span className="flex size-9 items-center justify-center rounded-full bg-wood font-bold text-primary-foreground">T</span>
          </div>
        </header>
        <div className="flex gap-2 overflow-x-auto border-b border-border bg-card px-4 py-2 md:hidden">
          {menus.map((m) => <button key={m.k} onClick={() => setMenu(m.k)} className={`rounded-full px-3 py-1 text-sm ${menu === m.k ? "bg-primary text-primary-foreground" : "bg-muted"}`}>{m.k}</button>)}
        </div>

        <div className="p-6">
          {menu === "Ringkasan" && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Stat label="Pesanan masuk" value={String(orders.length)} hint="+3 hari ini" />
                <Stat label="Pendapatan (lunas)" value={rupiah(income)} hint="otomatis dari pembayaran" />
                <Stat label="Perlu tindakan" value={String(orders.filter((o) => ["Lunas", "Review", "Packing"].includes(o.status)).length)} hint="desain, review, resi" />
                <Stat label="Belum bayar" value={String(orders.filter((o) => o.status === "Menunggu Bayar").length)} hint="pengingat terkirim" />
              </div>
              <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                <Card title="Penjualan 12 bulan" sub="Lonjakan di Februari & Desember">
                  <div className="flex h-40 items-end gap-2">
                    {[30, 95, 40, 35, 45, 38, 42, 50, 44, 48, 60, 100].map((h, i) => (
                      <div key={i} className="flex flex-1 flex-col items-center gap-1"><div className={`w-full rounded-t-md ${h > 90 ? "bg-primary" : "bg-chart-5"}`} style={{ height: `${h}%` }} /><span className="text-[10px] text-muted-foreground">{"JFMAMJJASOND"[i]}</span></div>
                    ))}
                  </div>
                </Card>
                <Card title="Alur pesanan saat ini" sub="Klik untuk melihat daftar">
                  <div className="space-y-2">
                    {statuses.map((s) => {
                      const n = orders.filter((o) => o.status === s).length;
                      return (
                        <button key={s} onClick={() => { setFilter(s); setMenu("Pesanan"); }} className="flex w-full items-center gap-3 text-sm">
                          <span className="w-28 text-left">{s}</span>
                          <span className="h-2 flex-1 rounded-full bg-muted"><span className="block h-2 rounded-full bg-primary" style={{ width: `${(n / orders.length) * 100}%` }} /></span>
                          <b className="w-4">{n}</b>
                        </button>
                      );
                    })}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {menu === "Pesanan" && (
            <Card title="Semua pesanan" sub="Setiap baris otomatis tersalin ke Google Sheets & punya folder Drive sendiri">
              <div className="mb-4 flex flex-wrap gap-2">
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari kode / nama..." className="input max-w-xs" />
                {(["Semua", ...statuses] as const).map((s) => (
                  <button key={s} onClick={() => setFilter(s)} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${filter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{s}</button>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-xs uppercase text-muted-foreground"><tr>{["Kode", "Pelanggan", "Produk", "Tanggal", "Total", "Status", ""].map((h) => <th key={h} className="px-3 py-2">{h}</th>)}</tr></thead>
                  <tbody>
                    {orders.filter((o) => (filter === "Semua" || o.status === filter) && (o.id + o.name).toLowerCase().includes(q.toLowerCase())).map((o) => (
                      <tr key={o.id} onClick={() => setSel(o.id)} className="cursor-pointer border-t border-border hover:bg-muted">
                        <td className="px-3 py-3 font-semibold">{o.id}</td><td className="px-3">{o.name}</td><td className="px-3">{o.product}</td><td className="px-3 text-muted-foreground">{o.date}</td><td className="px-3">{rupiah(o.total)}</td><td className="px-3"><Badge s={o.status} /></td><td className="px-3 text-primary">Detail →</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {menu === "Desain" && (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {orders.filter((o) => ["Lunas", "Desain", "Review"].includes(o.status)).map((o) => (
                <div key={o.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
                  <img src={hero} alt="Foto pelanggan" loading="lazy" width={1024} height={1024} className="aspect-video w-full object-cover" />
                  <div className="space-y-2 p-4">
                    <div className="flex items-center justify-between"><b>{o.id}</b><Badge s={o.status} /></div>
                    <div className="text-sm text-muted-foreground">{o.name} · {o.product}</div>
                    <div className="text-xs text-muted-foreground">📁 Drive /{o.id}/foto-pelanggan.jpg</div>
                    {o.status === "Lunas" && <button onClick={() => update(o.id, { status: "Desain" })} className="btn-primary w-full">Mulai desain</button>}
                    {o.status === "Desain" && <button onClick={() => update(o.id, { status: "Review" })} className="btn-primary w-full">Unggah draft ke pelanggan</button>}
                    {o.status === "Review" && <p className="rounded-lg bg-muted p-2 text-center text-xs">Menunggu persetujuan pelanggan…</p>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {menu === "Pengiriman" && (
            <Card title="Siap kirim & terkirim" sub="Masukkan resi — pelanggan otomatis mendapat notifikasi">
              <div className="space-y-3">
                {orders.filter((o) => ["Produksi", "Packing", "Dikirim", "Diterima"].includes(o.status)).map((o) => (
                  <ResiRow key={o.id} o={o} onSave={(resi) => update(o.id, { resi, status: "Dikirim" })} onPack={() => update(o.id, { status: next(o.status) })} />
                ))}
              </div>
            </Card>
          )}

          {menu === "Keuangan" && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <Stat label="Uang masuk" value={rupiah(income)} hint="terverifikasi gateway" />
                <Stat label="Uang keluar" value={rupiah(420000)} hint="bahan & ekspedisi" />
                <Stat label="Saldo" value={rupiah(income - 420000)} hint="dihitung otomatis" />
              </div>
              <Card title="Mutasi" sub="Sama persis dengan sheet ‘Keuangan’">
                <table className="w-full text-sm">
                  <tbody>
                    {paid.map((o) => <tr key={o.id} className="border-t border-border"><td className="py-2">{o.date}</td><td>Pembayaran {o.id}</td><td className="text-right font-semibold text-accent">+{rupiah(o.total)}</td></tr>)}
                    <tr className="border-t border-border"><td className="py-2">12 Nov</td><td>Beli papan kayu pinus</td><td className="text-right font-semibold text-destructive">−{rupiah(420000)}</td></tr>
                  </tbody>
                </table>
              </Card>
            </div>
          )}
        </div>
      </main>

      {selected && (
        <div className="fixed inset-0 z-20 flex justify-end bg-foreground/30" onClick={() => setSel(null)}>
          <div className="h-full w-full max-w-md overflow-y-auto bg-card p-6 shadow-soft" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between"><h2 className="font-display text-2xl font-bold">{selected.id}</h2><button onClick={() => setSel(null)} className="text-2xl">×</button></div>
            <div className="mt-2"><Badge s={selected.status} /></div>
            <img src={hero} alt="Foto pesanan" loading="lazy" width={1024} height={1024} className="mt-4 rounded-2xl" />
            <dl className="mt-4 space-y-2 text-sm">
              {[["Pelanggan", selected.name], ["Produk", selected.product], ["Kartu ucapan", selected.card ? "Ya" : "Tidak"], ["Total", rupiah(selected.total)], ["Folder Drive", `/${selected.id}`], ["Resi", selected.resi ?? "—"]].map(([k, v]) => <div key={k} className="flex justify-between"><dt className="text-muted-foreground">{k}</dt><dd className="font-semibold">{v}</dd></div>)}
            </dl>
            <div className="mt-6 text-sm font-semibold">Progres</div>
            <div className="mt-2 flex gap-1">{statuses.map((s, i) => <span key={s} title={s} className={`h-2 flex-1 rounded-full ${i <= statuses.indexOf(selected.status) ? "bg-primary" : "bg-muted"}`} />)}</div>
            {selected.status !== "Diterima" && <button onClick={() => update(selected.id, { status: next(selected.status) })} className="mt-6 w-full rounded-full bg-wood py-3 font-semibold text-primary-foreground">Pindahkan ke “{next(selected.status)}”</button>}
            {selected.status === "Diterima" && <p className="mt-6 rounded-xl bg-secondary p-3 text-center text-sm font-semibold text-accent">✓ Pesanan selesai — diterima pelanggan</p>}
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return <div className="rounded-2xl border border-border bg-card p-5 shadow-soft"><div className="text-xs font-semibold uppercase text-muted-foreground">{label}</div><div className="mt-1 font-display text-2xl font-bold">{value}</div><div className="text-xs text-muted-foreground">{hint}</div></div>;
}
function Card({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return <div className="rounded-2xl border border-border bg-card p-5 shadow-soft"><div className="font-display text-lg font-bold">{title}</div><div className="mb-4 text-xs text-muted-foreground">{sub}</div>{children}</div>;
}
function ResiRow({ o, onSave, onPack }: { o: (typeof seed)[number]; onSave: (r: string) => void; onPack: () => void }) {
  const [r, setR] = useState("");
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl bg-muted p-3 text-sm">
      <b className="w-20">{o.id}</b><span className="flex-1">{o.name}{o.card && " · 💌 kartu"}</span><Badge s={o.status} />
      {o.status === "Produksi" && <button onClick={onPack} className="btn-ghost">Tandai selesai → Packing</button>}
      {o.status === "Packing" && <><input value={r} onChange={(e) => setR(e.target.value)} placeholder="No. resi" className="input w-36" /><button disabled={!r} onClick={() => onSave(r)} className="btn-primary disabled:opacity-40">Simpan</button></>}
      {o.status === "Dikirim" && <><span className="font-semibold">{o.resi}</span><button onClick={onPack} className="btn-ghost">Tandai diterima ✓</button></>}
      {o.status === "Diterima" && <span className="font-semibold text-accent">✓ {o.resi} · selesai</span>}
    </div>
  );
}
