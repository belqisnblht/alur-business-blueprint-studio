import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import hero from "@/assets/hero-gift.jpg";
import { products, moments, rupiah } from "@/lib/ksg-data";

export const Route = createFileRoute("/toko")({
  head: () => ({
    meta: [
      { title: "Toko Kayu Story Gift — Mockup Pelanggan" },
      { name: "description", content: "Mockup website pelanggan: pilih kado kayu, kustomisasi, bayar, dan lacak pesanan." },
      { property: "og:title", content: "Toko Kayu Story Gift — Mockup Pelanggan" },
      { property: "og:description", content: "Pesan kado kayu kustom langsung di website, tanpa pindah ke WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Toko,
});

const steps = ["Pilih Produk", "Kustomisasi", "Pengiriman", "Pembayaran", "Lacak Pesanan"];

function Toko() {
  const [step, setStep] = useState(0);
  const [prod, setProd] = useState(products[0]!);
  const [moment, setMoment] = useState(moments[0]!);
  const [text, setText] = useState("Better Together");
  const [photo, setPhoto] = useState(false);
  const [card, setCard] = useState(false);
  const [cardMsg, setCardMsg] = useState("");
  const [addr, setAddr] = useState({ nama: "", wa: "", alamat: "" });
  const [pay, setPay] = useState("QRIS");
  const [review, setReview] = useState<"wait" | "ok" | "rev">("wait");
  const ongkir = 18000;
  const total = prod.price + ongkir + (card ? 10000 : 0);
  const canNext = [true, photo && text.length > 0, !!(addr.nama && addr.wa && addr.alamat), true][step] ?? true;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <nav className="sticky top-0 z-10 border-b border-border bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-display text-xl font-bold text-primary">Kayu Story Gift</Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="rounded-full bg-secondary px-3 py-1 font-semibold">Tampilan Pelanggan</span>
            <Link to="/admin" className="text-muted-foreground underline">Ke Admin →</Link>
          </div>
        </div>
      </nav>

      {step === 0 && (
        <section className="bg-sidebar text-sidebar-foreground">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 py-12 md:grid-cols-[1.2fr_1fr]">
            <div>
              <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl">Kado kayu yang menyimpan <span className="text-sidebar-primary">ceritamu</span>.</h1>
              <p className="mt-3 opacity-80">Pesan, kustom, bayar, dan pantau — semuanya di sini. Tanpa pindah ke chat atau marketplace.</p>
              <div className="mt-5 flex flex-wrap gap-2">{moments.map((m) => <button key={m} onClick={() => setMoment(m)} className={`rounded-full px-4 py-1.5 text-sm ${moment === m ? "bg-sidebar-primary text-sidebar-primary-foreground" : "bg-sidebar-accent"}`}>{m}</button>)}</div>
            </div>
            <img src={hero} alt="Kotak foto kayu" width={1024} height={1024} className="mx-auto aspect-square w-72 rounded-3xl object-cover shadow-soft" />
          </div>
        </section>
      )}

      <div className="mx-auto max-w-6xl px-6 py-8">
        <ol className="mb-8 grid grid-cols-5 gap-2">
          {steps.map((s, i) => (
            <li key={s} className="text-center">
              <div className={`mx-auto flex size-9 items-center justify-center rounded-full text-sm font-bold ${i < step ? "bg-accent text-accent-foreground" : i === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{i < step ? "✓" : i + 1}</div>
              <div className={`mt-2 text-xs md:text-sm ${i === step ? "font-bold" : "text-muted-foreground"}`}>{s}</div>
            </li>
          ))}
        </ol>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            {step === 0 && (
              <>
                <h2 className="font-display text-2xl font-bold">Pilih kado untuk {moment}</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {products.map((p) => (
                    <button key={p.id} onClick={() => setProd(p)} className={`overflow-hidden rounded-2xl border-2 text-left transition ${prod.id === p.id ? "border-primary shadow-soft" : "border-transparent bg-muted"}`}>
                      <img src={hero} alt={p.name} loading="lazy" width={1024} height={1024} className="aspect-[4/3] w-full object-cover" />
                      <div className="p-3">
                        <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-primary">{p.tag}</span>
                        <div className="mt-1 font-semibold">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.desc}</div>
                        <div className="mt-1 font-bold text-primary">{rupiah(p.price)}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
            {step === 1 && (
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-bold">Buat jadi milikmu</h2>
                  <Field label="Unggah foto">
                    <button onClick={() => setPhoto(!photo)} className={`w-full rounded-xl border-2 border-dashed p-6 text-sm ${photo ? "border-accent bg-secondary text-foreground" : "border-input text-muted-foreground"}`}>{photo ? "✓ foto-kami.jpg terunggah (klik untuk ganti)" : "Klik untuk unggah foto (JPG/PNG)"}</button>
                  </Field>
                  <Field label={`Teks ukiran (${text.length}/25)`}><input maxLength={25} value={text} onChange={(e) => setText(e.target.value)} className="input" /></Field>
                  <label className="flex items-center gap-3 rounded-xl bg-muted p-3 text-sm"><input type="checkbox" checked={card} onChange={(e) => setCard(e.target.checked)} className="size-4 accent-primary" /> Tambah kartu ucapan <span className="ml-auto font-semibold">+Rp10.000</span></label>
                  {card && <textarea value={cardMsg} onChange={(e) => setCardMsg(e.target.value)} placeholder="Tulis pesan di kartu..." className="input min-h-20" />}
                </div>
                <div>
                  <div className="text-sm font-semibold text-muted-foreground">Pratinjau langsung</div>
                  <div className="relative mt-2 overflow-hidden rounded-2xl">
                    <img src={hero} alt="Pratinjau" loading="lazy" width={1024} height={1024} className={`w-full ${photo ? "" : "opacity-40 grayscale"}`} />
                    <span className="absolute right-4 top-4 rounded-lg bg-card/90 px-3 py-1 font-display text-lg">{text || "Teksmu"}</span>
                  </div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="font-display text-2xl font-bold">Kirim ke mana?</h2>
                <Field label="Nama penerima"><input value={addr.nama} onChange={(e) => setAddr({ ...addr, nama: e.target.value })} className="input" placeholder="cth. Rina" /></Field>
                <Field label="No. WhatsApp"><input value={addr.wa} onChange={(e) => setAddr({ ...addr, wa: e.target.value })} className="input" placeholder="08xx" /></Field>
                <Field label="Alamat lengkap"><textarea value={addr.alamat} onChange={(e) => setAddr({ ...addr, alamat: e.target.value })} className="input min-h-20" placeholder="Jalan, kota, kode pos" /></Field>
                <div className="flex items-center justify-between rounded-xl bg-secondary p-4 text-sm"><span>🚚 JNE REG · estimasi 2–3 hari</span><b>{rupiah(ongkir)}</b></div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="font-display text-2xl font-bold">Pilih pembayaran</h2>
                <p className="text-sm text-muted-foreground">Pembayaran lunas di awal. Dicek otomatis — tidak perlu kirim bukti transfer.</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {["QRIS", "Virtual Account", "E-Wallet"].map((m) => (
                    <button key={m} onClick={() => setPay(m)} className={`rounded-2xl border-2 p-4 font-semibold ${pay === m ? "border-primary bg-secondary" : "border-border"}`}>{m}</button>
                  ))}
                </div>
                {pay === "QRIS" && <div className="mx-auto grid size-40 grid-cols-8 gap-0.5 rounded-xl bg-card p-3 ring-1 ring-border">{Array.from({ length: 64 }).map((_, i) => <span key={i} className={(i * 7) % 3 ? "bg-foreground" : ""} />)}</div>}
              </div>
            )}
            {step === 4 && (
              <div>
                <div className="flex items-center gap-3 rounded-2xl bg-accent p-4 text-accent-foreground"><span className="text-2xl">✓</span><div><b>Pembayaran diterima!</b><div className="text-sm">Kode pesanan KSG-0143 · notifikasi dikirim ke WhatsApp</div></div></div>
                <h3 className="mt-6 font-semibold">Status pesanan</h3>
                <div className="mt-3 space-y-0">
                  {["Pembayaran lunas", "Desain dikerjakan tim grafis", "Review draft olehmu", "Produksi kayu", "Packing", "Dikirim"].map((s, i) => {
                    const cur = review === "ok" ? 3 : 2;
                    return (
                      <div key={s} className="flex gap-3">
                        <div className="flex flex-col items-center"><span className={`size-4 rounded-full ${i < cur ? "bg-accent" : i === cur ? "bg-primary ring-4 ring-secondary" : "bg-muted"}`} />{i < 5 && <span className="h-8 w-0.5 bg-border" />}</div>
                        <span className={`text-sm ${i === cur ? "font-bold" : i < cur ? "" : "text-muted-foreground"}`}>{s}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 grid gap-4 rounded-2xl border border-border p-4 md:grid-cols-[180px_1fr]">
                  <img src={hero} alt="Draft" loading="lazy" width={1024} height={1024} className="rounded-xl" />
                  <div>
                    <b>Draft desain siap ditinjau</b>
                    <p className="text-sm text-muted-foreground">Cek foto & teks “{text}”.</p>
                    {review === "wait" && <div className="mt-3 flex gap-2"><button onClick={() => setReview("ok")} className="btn-primary">Setujui</button><button onClick={() => setReview("rev")} className="btn-ghost">Minta Revisi</button></div>}
                    {review === "ok" && <p className="mt-3 font-semibold text-accent">Disetujui — masuk produksi 🎉</p>}
                    {review === "rev" && <div className="mt-3 space-y-2"><textarea className="input" placeholder="Apa yang perlu diubah?" /><button onClick={() => setReview("wait")} className="btn-primary">Kirim revisi</button></div>}
                  </div>
                </div>
              </div>
            )}
          </div>

          <aside className="h-fit rounded-3xl border border-border bg-card p-5 shadow-soft lg:sticky lg:top-24">
            <div className="font-display text-lg font-bold">Ringkasan</div>
            <div className="mt-3 space-y-2 text-sm">
              <Row a={prod.name} b={rupiah(prod.price)} />
              {step >= 1 && <Row a={`Ukiran: "${text}"`} b="" />}
              {card && <Row a="Kartu ucapan" b="Rp10.000" />}
              {step >= 2 && <Row a="Ongkir" b={rupiah(ongkir)} />}
              <div className="flex justify-between border-t border-border pt-2 text-base font-bold"><span>Total</span><span className="text-primary">{rupiah(step >= 2 ? total : total - ongkir)}</span></div>
            </div>
            {step < 4 && (
              <div className="mt-4 space-y-2">
                <button disabled={!canNext} onClick={() => setStep(step + 1)} className="w-full rounded-full bg-wood py-3 font-semibold text-primary-foreground disabled:opacity-40">{step === 3 ? `Bayar ${rupiah(total)}` : "Lanjut"}</button>
                {step > 0 && <button onClick={() => setStep(step - 1)} className="w-full py-2 text-sm text-muted-foreground">← Kembali</button>}
                {!canNext && <p className="text-center text-xs text-destructive">{step === 1 ? "Unggah foto dulu" : "Lengkapi data pengiriman"}</p>}
              </div>
            )}
            {step === 4 && <button onClick={() => { setStep(0); setReview("wait"); }} className="mt-4 w-full rounded-full border border-border py-2 text-sm">Pesan lagi</button>}
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-sm font-semibold">{label}<div className="mt-1 font-normal">{children}</div></label>;
}
function Row({ a, b }: { a: string; b: string }) {
  return <div className="flex justify-between gap-2"><span className="text-muted-foreground">{a}</span><span>{b}</span></div>;
}
