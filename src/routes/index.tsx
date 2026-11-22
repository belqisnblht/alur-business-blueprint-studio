import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  products,
  moments,
  rupiah,
  getStoredReviews,
  type KSGReview,
} from "@/lib/ksg-data";
import { BpmnWorkflowView } from "@/components/BpmnWorkflowView";
import {
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Star,
  CheckCircle2,
  Truck,
  Heart,
  ShieldCheck,
  Search,
  ExternalLink,
  Layers,
  ChevronRight,
  User,
  Package,
  Check,
  ZoomIn,
  Play,
  Instagram,
  RotateCcw,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kayu Story — Every Wood Tells a Story · Toko Kado Kayu Kustom" },
      {
        name: "description",
        content:
          "Official Store Kayu Story: Spinning Box Premium & Spinning Box Lite. Kotak foto kayu ukir putar dengan lampu LED dan charger Type-C.",
      },
    ],
  }),
  component: HomePage,
});

export function HomePage() {
  const navigate = useNavigate();
  const [trackCode, setTrackCode] = useState("");
  const [reviews, setReviews] = useState<KSGReview[]>([]);
  const [showDocModal, setShowDocModal] = useState(false);
  const [showLineupModal, setShowLineupModal] = useState(false);

  useEffect(() => {
    setReviews(getStoredReviews());
    const handleRev = (e: any) => setReviews(e.detail || getStoredReviews());
    window.addEventListener("ksg_reviews_updated", handleRev);
    return () => window.removeEventListener("ksg_reviews_updated", handleRev);
  }, []);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackCode.trim()) {
      navigate({ to: "/toko" });
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex flex-col">
      {/* Top Banner */}
      <div className="border-b border-border bg-sidebar px-6 py-2 text-xs text-sidebar-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-sidebar-primary px-2.5 py-0.5 text-[10px] font-bold text-sidebar-primary-foreground">
              Promo Spesial
            </span>
            <span>Spinning Box diskon hingga 30 November 2026! Free photo printing & cutting.</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-sidebar-foreground/80">
            <span>Charger Type-C & Lampu LED Warm</span>
            <span>•</span>
            <Link to="/login" className="hover:underline font-semibold">
              Masuk Akun
            </Link>
          </div>
        </div>
      </div>

      {/* Main Brand Navigation */}
      <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-wood text-sm font-bold text-primary-foreground shadow-xs">
              KSG
            </span>
            <div>
              <div className="font-display text-xl font-bold text-primary leading-none">
                Kayu Story
              </div>
              <div className="text-[10px] text-muted-foreground mt-0.5">
                Every Wood Tells a Story
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-muted-foreground">
            <a href="#video" className="hover:text-foreground transition flex items-center gap-1 text-primary">
              <Play className="size-3 fill-primary/30 text-primary" />
              <span>Video Demo</span>
            </a>
            <a href="#koleksi" className="hover:text-foreground transition">
              Katalog Produk
            </a>
            <a href="#lineup" className="hover:text-foreground transition">
              Varian Warna
            </a>
            <a href="#cara-pesan" className="hover:text-foreground transition">
              Cara Kerja
            </a>
            <a href="#lacak" className="hover:text-foreground transition">
              Lacak Pesanan
            </a>
            <a href="#testimoni" className="hover:text-foreground transition">
              Ulasan ({reviews.length})
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-full border border-border px-4 py-2 text-xs font-semibold hover:bg-muted transition"
            >
              Masuk Akun
            </Link>
            <Link
              to="/toko"
              className="inline-flex items-center gap-1.5 rounded-full bg-wood px-5 py-2 text-xs font-bold text-primary-foreground shadow-soft hover:opacity-95 transition"
            >
              <ShoppingBag className="size-3.5" />
              <span>Pesan Sekarang</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 py-14 md:py-20 grid items-center gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3.5 py-1 text-xs font-bold text-primary">
            <Sparkles className="size-3.5" /> Product Catalog Resmi Kayu Story
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Spinning Box: <span className="text-primary">Putar Kenangan</span> dalam Kilau Lampu Hangat.
          </h1>

          <p className="text-base text-muted-foreground leading-relaxed">
            Kotak kayu foto putar aesthetic dengan lampu LED dan colokan modern Type-C.
            Pesan langsung, kustomisasi teks grafir ucapan, preview draft sebelum dipotong, dan terima kado siap berikan ke orang tercinta.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/toko"
              className="inline-flex items-center gap-2 rounded-full bg-wood px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-soft hover:opacity-95 transition"
            >
              <span>Pilih Spinning Box Kamu</span>
              <ArrowRight className="size-4" />
            </Link>

            <a
              href="#video"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3.5 text-sm font-semibold hover:bg-muted transition text-foreground"
            >
              <Play className="size-4 text-primary fill-primary/30" />
              <span>Tonton Video Produk</span>
            </a>

            <a
              href="#koleksi"
              className="inline-flex items-center gap-2 rounded-full border border-transparent px-3 py-3.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition"
            >
              Katalog & Harga
            </a>
          </div>

          {/* Social Proof */}
          <div className="pt-2 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="size-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span>
              Rating <b>5.0 / 5</b> dari <b>{reviews.length}+ ulasan pembeli terverifikasi</b>
            </span>
          </div>
        </div>

        {/* Hero Image - Real Photo with Warm LED & Flowers */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-border shadow-soft bg-black/5 aspect-square">
            <img
              src="/spinning-box-pine-premium.jpg"
              alt="Spinning Box Premium Kayu Story"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-4 -left-4 rounded-2xl border border-border bg-card/95 p-4 shadow-soft backdrop-blur text-xs space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-accent">
              <CheckCircle2 className="size-4" /> 100% Kayu Pinus Solid Alami
            </div>
            <div className="text-muted-foreground">
              Lampu LED Warm · Charger Type-C · Free Photo Printing
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: VIDEO DEMO PRODUK (INSTAGRAM REEL) */}
      <section id="video" className="border-t border-border bg-card/60 py-16">
        <div className="mx-auto max-w-6xl px-6 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3.5 py-1 text-xs font-bold text-primary">
              <Play className="size-3.5 fill-primary text-primary" /> Video Demo Nyata
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">
              Lihat Spinning Box Berputar Nyata
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Saksikan bagaimana kotak kayu kado berputar mulus, memancarkan cahaya LED warm yang syahdu, serta menampilkan foto-foto kenangan berharga Anda.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[380px_1fr] items-center max-w-5xl mx-auto">
            {/* Phone Mockup Frame for Instagram Reel */}
            <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px]">
              {/* Outer Phone Shell */}
              <div className="relative rounded-[40px] border-4 border-foreground/15 bg-card p-3 shadow-2xl ring-1 ring-border">
                {/* Phone Speaker Notch */}
                <div className="mx-auto mb-2 h-1.5 w-16 rounded-full bg-foreground/20" />

                {/* Reel Iframe Container */}
                <div className="relative aspect-[9/16] min-h-[520px] w-full overflow-hidden rounded-[28px] bg-black">
                  <iframe
                    src="https://www.instagram.com/reel/DXesKOaE-Gl/embed"
                    className="h-full w-full border-0"
                    scrolling="no"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    title="Video Demo Reel Spinning Box Kayu Story"
                  />
                </div>

                {/* Bottom Bar Indicator */}
                <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-foreground/20" />
              </div>

              {/* Floating Instagram Reel Badge */}
              <a
                href="https://www.instagram.com/reel/DXesKOaE-Gl/?utm_source=ig_web_copy_link"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute -bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-card/95 px-3.5 py-1.5 text-xs font-bold text-foreground shadow-soft backdrop-blur hover:bg-muted transition"
              >
                <Instagram className="size-4 text-pink-500" />
                <span>Buka di Instagram ↗</span>
              </a>
            </div>

            {/* Video Description & Highlights */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Official Instagram Reels Showcase
                </span>
                <h3 className="font-display text-2xl font-bold">
                  Bukan Sekadar Foto, Tapi Kenangan yang Bergerak Hidup
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Video di samping memperlihatkan mekanisme putar presisi hand-crafted dari workshop Kayu Story. Tuas kayu dapat diputar 360 derajat untuk memperlihatkan urutan foto spesial bersama pasangan, sahabat, atau keluarga.
                </p>
              </div>

              {/* Feature Highlights Grid */}
              <div className="grid gap-4 sm:grid-cols-2 text-xs">
                <div className="rounded-2xl border border-border bg-secondary/40 p-4 space-y-1.5">
                  <div className="font-bold flex items-center gap-2 text-foreground">
                    <RotateCcw className="size-4 text-primary" />
                    <span>Mekanisme Putar Halus</span>
                  </div>
                  <p className="text-muted-foreground text-[11px] leading-relaxed">
                    Tuas samping kayu mulus, dapat menampung hingga 15–16 cetakan foto kenangan tanpa macet.
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-secondary/40 p-4 space-y-1.5">
                  <div className="font-bold flex items-center gap-2 text-foreground">
                    <Sparkles className="size-4 text-amber-500" />
                    <span>Lampu LED Warm White</span>
                  </div>
                  <p className="text-muted-foreground text-[11px] leading-relaxed">
                    Pendaran lampu estetik di dalam box menciptakan suasana hangat dan romantis di ruangan tidur atau meja kerja.
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-secondary/40 p-4 space-y-1.5">
                  <div className="font-bold flex items-center gap-2 text-foreground">
                    <Zap className="size-4 text-accent" />
                    <span>Charger Port Type-C</span>
                  </div>
                  <p className="text-muted-foreground text-[11px] leading-relaxed">
                    Praktis dan modern! Cukup hubungkan kabel charger Type-C untuk menyalakan lampu LED.
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-secondary/40 p-4 space-y-1.5">
                  <div className="font-bold flex items-center gap-2 text-foreground">
                    <CheckCircle2 className="size-4 text-primary" />
                    <span>Gratis Cetak & Potong Foto</span>
                  </div>
                  <p className="text-muted-foreground text-[11px] leading-relaxed">
                    Kirimkan foto Anda, tim kami akan mencetak kertas foto tajam dan memasangnya langsung di dalam box.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to="/toko"
                  className="inline-flex items-center gap-2 rounded-full bg-wood px-6 py-3 text-xs font-bold text-primary-foreground shadow-soft hover:opacity-95 transition"
                >
                  <ShoppingBag className="size-4" />
                  <span>Pesan Spinning Box Sekarang</span>
                </Link>

                <a
                  href="https://www.instagram.com/reel/DXesKOaE-Gl/?utm_source=ig_web_copy_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-xs font-semibold text-foreground hover:bg-muted transition"
                >
                  <Instagram className="size-4 text-pink-600" />
                  <span>Tonton di Instagram Reels ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: KOLEKSI RESMI (SPINNING BOX PREMIUM & LITE) */}
      <section id="koleksi" className="border-t border-border bg-secondary/30 py-16">
        <div className="mx-auto max-w-6xl px-6 space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Katalog Produk
            </span>
            <h2 className="font-display text-3xl font-bold">Koleksi Resmi Spinning Box</h2>
            <p className="text-xs text-muted-foreground">
              Setiap box dilengkapi mekanisme putar halus, lampu LED hangat, dan colokan charger Type-C.
            </p>
          </div>

          {/* 2 Main Product Cards */}
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {products.map((p) => (
              <div
                key={p.id}
                className="overflow-hidden rounded-3xl border-2 border-border bg-card shadow-soft flex flex-col justify-between transition hover:-translate-y-1 hover:border-primary/50"
              >
                <div>
                  <div className="aspect-[4/3] bg-black/5 overflow-hidden relative">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="h-full w-full object-cover hover:scale-105 transition duration-300"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-card/90 px-3 py-1 text-xs font-bold shadow-xs">
                      {p.tag}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-display text-xl font-bold">{p.name}</h3>
                      <div className="text-right">
                        <div className="font-display text-2xl font-bold text-primary">
                          {rupiah(p.price)}
                        </div>
                        <div className="text-xs text-destructive line-through">
                          {rupiah(p.normalPrice)}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>

                    <div className="space-y-2 pt-3 border-t border-border text-xs text-muted-foreground">
                      {p.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check className="size-3.5 text-accent shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to="/toko"
                    className="w-full rounded-2xl bg-wood py-3 text-center text-xs font-bold text-primary-foreground shadow-xs flex items-center justify-center gap-2 hover:opacity-95 transition"
                  >
                    <span>Pesan {p.name} Sekarang</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: 4 VARIAN WARNA LINEUP SHOWCASE */}
      <section id="lineup" className="mx-auto max-w-6xl px-6 py-16 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Perbandingan Varian
          </span>
          <h2 className="font-display text-3xl font-bold">4 Pilihan Varian Kayu & Warna</h2>
          <p className="text-xs text-muted-foreground">
            Disesuaikan dengan selera estetika dan nuansa ruangan kamar atau meja kerjamu.
          </p>
        </div>

        {/* Real Lineup Photo Banner */}
        <div className="rounded-3xl border-2 border-border bg-card p-6 shadow-soft space-y-6">
          <div className="rounded-2xl overflow-hidden border border-border bg-black/5">
            <img
              src="/spinning-box-lineup.jpg"
              alt="Perbandingan 4 Varian Spinning Box"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="rounded-2xl bg-secondary/50 p-4 space-y-1">
              <span className="text-[10px] font-bold text-primary uppercase">Model Premium</span>
              <div className="font-display font-bold text-sm text-foreground">Pine Wood</div>
              <p className="text-[11px] text-muted-foreground">
                100% Kayu Pinus Solid alami bertekstur hangat
              </p>
              <div className="pt-2 font-bold text-primary">{rupiah(279000)}</div>
            </div>

            <div className="rounded-2xl bg-secondary/50 p-4 space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Model Lite</span>
              <div className="font-display font-bold text-sm text-foreground">Brown Oak</div>
              <p className="text-[11px] text-muted-foreground">
                Nuansa cokelat kayu klasik elegan
              </p>
              <div className="pt-2 font-bold text-primary">{rupiah(229000)}</div>
            </div>

            <div className="rounded-2xl bg-secondary/50 p-4 space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Model Lite</span>
              <div className="font-display font-bold text-sm text-foreground">Frosty White Oak</div>
              <p className="text-[11px] text-muted-foreground">
                Warna putih abu bersih minimalis modern
              </p>
              <div className="pt-2 font-bold text-primary">{rupiah(229000)}</div>
            </div>

            <div className="rounded-2xl bg-secondary/50 p-4 space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Model Lite</span>
              <div className="font-display font-bold text-sm text-foreground">Walnut Supreme</div>
              <p className="text-[11px] text-muted-foreground">
                Nuansa hitam espresso mewah berkelas
              </p>
              <div className="pt-2 font-bold text-primary">{rupiah(229000)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: CARA PEMESANAN */}
      <section id="cara-pesan" className="border-t border-border bg-secondary/30 py-16 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Cara Pesan
          </span>
          <h2 className="font-display text-3xl font-bold">4 Langkah Mudah Memesan</h2>
          <p className="text-xs text-muted-foreground">
            Pesan langsung tanpa bolak-balik chat WhatsApp. Cek ongkir otomatis dan review desain online.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              num: "01",
              title: "Pilih Model Box",
              desc: "Pilih Spinning Box Premium (Kayu Pinus Solid) atau Spinning Box Lite (Plywood 3 warna).",
            },
            {
              num: "02",
              title: "Teks Grafir & Foto",
              desc: "Ketik ucapan kenangan untuk diukir di tutup box dan unggah foto terbaikmu.",
            },
            {
              num: "03",
              title: "Review Draft Desain",
              desc: "Desainer kami menyusun layout mockup kayu. Kamu bisa setujui langsung atau minta revisi.",
            },
            {
              num: "04",
              title: "Produksi & Kirim Aman",
              desc: "Kayu dirakit presisi, dites lampu LED-nya, dikemas bubble wrap tebal, dan dikirim via JNE/J&T.",
            },
          ].map((step) => (
            <div
              key={step.num}
              className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-3 relative overflow-hidden"
            >
              <span className="font-display text-4xl font-bold text-primary/20">
                {step.num}
              </span>
              <h3 className="font-display text-base font-bold text-foreground">
                {step.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: TRACK ORDER WIDGET */}
      <section id="lacak" className="mx-auto max-w-3xl px-6 py-16 text-center space-y-6">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          Lacak Pesanan
        </span>
        <h2 className="font-display text-3xl font-bold">Lacak Status Pesananmu</h2>
        <p className="text-xs text-muted-foreground">
          Masukkan kode pesanan (contoh: <b>KSG-0143</b>) untuk melihat progress desain dan nomor resi pengiriman.
        </p>

        <form
          onSubmit={handleTrackSubmit}
          className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
        >
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-3 size-4 text-muted-foreground" />
            <input
              type="text"
              value={trackCode}
              onChange={(e) => setTrackCode(e.target.value)}
              placeholder="Masukkan Kode Pesanan (cth: KSG-0143)"
              className="input pl-10 text-xs font-mono font-bold"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto rounded-full bg-wood px-6 py-2.5 text-xs font-bold text-primary-foreground shadow-soft hover:opacity-95 whitespace-nowrap"
          >
            Lacak Pesanan →
          </button>
        </form>
      </section>

      {/* SECTION: ULASAN PEMBELI */}
      <section id="testimoni" className="border-t border-border bg-secondary/30 py-16 space-y-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Ulasan Pembeli
              </span>
              <h2 className="font-display text-3xl font-bold">Kata Mereka yang Sudah Membeli</h2>
            </div>

            <Link
              to="/toko"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2 text-xs font-semibold hover:bg-muted"
            >
              Lihat Semua Ulasan di Toko →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {reviews.slice(0, 4).map((rev) => (
              <div
                key={rev.id}
                className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: rev.rating }).map((_, si) => (
                      <Star key={si} className="size-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="inline-block rounded bg-secondary px-2 py-0.5 text-[10px] font-bold text-primary">
                    {rev.productName}
                  </div>
                  <p className="text-xs text-foreground/80 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-border/60">
                  <div className="font-bold text-xs">{rev.userName}</div>
                  <div className="text-[10px] text-muted-foreground">{rev.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-border bg-card py-12 text-xs text-muted-foreground">
        <div className="mx-auto max-w-6xl px-6 grid gap-8 md:grid-cols-4">
          <div className="space-y-3 md:col-span-2">
            <div className="font-display text-lg font-bold text-primary">Kayu Story</div>
            <p className="text-xs leading-relaxed max-w-sm">
              Every Wood Tells a Story. Studio kerajinan kado kayu personal berbasis di Malang, Jawa Timur. Menghadirkan Spinning Box kayu pinus solid presisi tinggi.
            </p>
            <div className="text-[11px] text-muted-foreground">
              WhatsApp: 0857-1933-6790 · Jam Operasional: 08.00 - 17.00 WIB
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-foreground uppercase text-[11px]">Navigasi</div>
            <div><a href="#video" className="hover:underline">Video Produk (Reel)</a></div>
            <div><a href="#koleksi" className="hover:underline">Katalog Produk</a></div>
            <div><a href="#lineup" className="hover:underline">Varian Warna</a></div>
            <div><a href="#cara-pesan" className="hover:underline">Cara Pemesanan</a></div>
            <div><Link to="/toko" className="hover:underline">Pesan Kado</Link></div>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-foreground uppercase text-[11px]">Akses Portal</div>
            <div><Link to="/login" className="hover:underline">Login Pelanggan</Link></div>
            <div><Link to="/login" className="hover:underline">Login Staff Admin</Link></div>
            <div>
              <button
                onClick={() => setShowDocModal(true)}
                className="text-left text-primary font-semibold hover:underline"
              >
                Dokumentasi Alur BPMN (MSI)
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <span>© 2026 Kayu Story. All rights reserved.</span>
          <button
            onClick={() => setShowDocModal(true)}
            className="text-muted-foreground hover:text-foreground underline"
          >
            Lihat Diagram BPMN Swimlane Resmi
          </button>
        </div>
      </footer>

      {/* BPMN Documentation Modal */}
      {showDocModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto"
          onClick={() => setShowDocModal(false)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-3xl bg-card p-6 sm:p-8 shadow-2xl border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
              <div>
                <h3 className="font-display text-xl font-bold">
                  Dokumentasi Pemodelan Proses Bisnis (BPMN 2.0)
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Tugas Besar Manajemen Sistem Informasi (MSI) · Kelompok 4 · Kelas T3B
                </p>
              </div>
              <button
                onClick={() => setShowDocModal(false)}
                className="flex size-8 items-center justify-center rounded-full hover:bg-muted font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <BpmnWorkflowView />
          </div>
        </div>
      )}
    </div>
  );
}
