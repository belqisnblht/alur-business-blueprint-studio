import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  products,
  moments,
  couriers,
  rupiah,
  colorImageMap,
  getStoredOrders,
  saveOrders,
  createNewOrder,
  getStoredReviews,
  addReview,
  getCurrentUser,
  logoutUser,
  type KSGOrder,
  type KSGReview,
  type UserSession,
} from "@/lib/ksg-data";
import {
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Truck,
  RotateCcw,
  Check,
  Upload,
  CreditCard,
  QrCode,
  Clock,
  LogOut,
  User,
  Package,
  Layers,
  Heart,
  ChevronRight,
  Star,
  MessageSquare,
  CheckCircle2,
  Image as ImageIcon,
  ShieldCheck,
  Zap,
  ZoomIn,
  Instagram,
  Play,
  MapPin,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Eye,
  FileText,
  CheckCheck,
  RefreshCw,
  AlertCircle,
  Calendar,
} from "lucide-react";

export const Route = createFileRoute("/toko")({
  head: () => ({
    meta: [
      { title: "Pesan Kado Kayu Kustom — Kayu Story Gift" },
      {
        name: "description",
        content:
          "Katalog resmi Kayu Story: Spinning Box Premium & Spinning Box Lite. Ukir foto dan teks kenangan dengan lampu LED hangat.",
      },
    ],
  }),
  component: TokoPage,
});

export function TokoPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [activeTab, setActiveTab] = useState<"pesan" | "ulasan" | "pesanan-saya">("pesan");
  const [orders, setOrders] = useState<KSGOrder[]>([]);
  const [reviews, setReviews] = useState<KSGReview[]>([]);
  const [activeOrderId, setActiveOrderId] = useState<string>("KSG-0143");

  // Ordering Wizard States
  const [wizardStep, setWizardStep] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [selectedColor, setSelectedColor] = useState<string>("Brown Oak");
  const [selectedMoment, setSelectedMoment] = useState(moments[0]);
  const [customText, setCustomText] = useState("us ♡ thank you, 2025");
  
  // 8 Photos Upload State
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([
    "/spinning-box-pine-premium.jpg",
    "/spinning-box-dark-walnut.jpg",
    "/spinning-box-pine-premium.jpg",
    "/spinning-box-dark-walnut.jpg",
    "/spinning-box-lineup.jpg",
    "/catalog-kayu-story.jpg",
    "/spinning-box-pine-premium.jpg",
    "/spinning-box-dark-walnut.jpg",
  ]);
  const [activePreviewIndex, setActivePreviewIndex] = useState<number>(0);
  const [includeCard, setIncludeCard] = useState(true);
  const [cardMsg, setCardMsg] = useState("Selamat hari jadi kita yang ke-3 tahun sayang ❤️");
  
  // Specific Indonesian Shipping Info (Biar Kurir Ga Bingung)
  const [shippingDetails, setShippingDetails] = useState({
    name: "Keisya Lanika",
    phone: "081234567890",
    street: "Jl. Soekarno Hatta No. 45, RT 03 / RW 07",
    benchmark: "Pagar hitam kayu, seberang Indomaret Lowokwaru, samping gerai fotokopi",
    province: "Jawa Timur",
    city: "Kota Malang",
    district: "Lowokwaru",
    subdistrict: "Jatimulyo",
    postalCode: "65141",
    courierNote: "Barang kado kayu pecah belah / fragile. Hubungi via WA bila rumah sedang kosong.",
  });
  const [selectedCourier, setSelectedCourier] = useState(couriers[0]);
  const [paymentMethod, setPaymentMethod] = useState<"QRIS" | "Virtual Account BCA" | "Virtual Account Mandiri">("QRIS");
  const [showLineupModal, setShowLineupModal] = useState(false);

  // Sorting, Filtering & Search for "Pesanan Saya"
  const [orderSortBy, setOrderSortBy] = useState<"terbaru" | "terlama" | "progress" | "harga-tinggi" | "harga-rendah">("terbaru");
  const [orderFilterStatus, setOrderFilterStatus] = useState<string>("Semua");
  const [orderSearch, setOrderSearch] = useState<string>("");
  const [expandedLogs, setExpandedLogs] = useState<Record<string, boolean>>({});

  // Interactive Modals for Orders
  const [proofOrder, setProofOrder] = useState<KSGOrder | null>(null);
  const [payOrder, setPayOrder] = useState<KSGOrder | null>(null);
  const [zoomPhotoUrl, setZoomPhotoUrl] = useState<string | null>(null);

  // Design Proof Review State
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  const [revisionNote, setRevisionNote] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Review Form Modal State
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewOrderId, setReviewOrderId] = useState<string>("");
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>("");
  const [reviewProduct, setReviewProduct] = useState<string>("Spinning Box Premium");
  const [reviewFilter, setReviewFilter] = useState<string>("Semua");

  useEffect(() => {
    setCurrentUser(getCurrentUser());
    setOrders(getStoredOrders());
    setReviews(getStoredReviews());

    const handleOrders = (e: any) => setOrders(e.detail || getStoredOrders());
    const handleReviews = (e: any) => setReviews(e.detail || getStoredReviews());
    const handleAuth = (e: any) => setCurrentUser(e.detail || getCurrentUser());

    window.addEventListener("ksg_orders_updated", handleOrders);
    window.addEventListener("ksg_reviews_updated", handleReviews);
    window.addEventListener("ksg_auth_updated", handleAuth);
    return () => {
      window.removeEventListener("ksg_orders_updated", handleOrders);
      window.removeEventListener("ksg_reviews_updated", handleReviews);
      window.removeEventListener("ksg_auth_updated", handleAuth);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleLogout = () => {
    logoutUser();
    navigate({ to: "/login" });
  };

  const activeOrder = orders.find((o) => o.id === activeOrderId) || orders[0];

  const subtotal = selectedProduct.price;
  const ongkir = selectedCourier.price;
  const cardPrice = includeCard ? 10000 : 0;
  const grandTotal = subtotal + ongkir + cardPrice;

  // Handle Multi-Photo Upload (8 Photos)
  const handleMultiplePhotosSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const readers = files.slice(0, 8).map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then((newImgs) => {
      setUploadedPhotos((prev) => {
        const next = [...prev];
        newImgs.forEach((img, idx) => {
          if (idx < 8) next[idx] = img;
        });
        return next;
      });
      setActivePreviewIndex(0);
      showToast(`✓ Berhasil memuat ${newImgs.length} foto kenangan!`);
    });
  };

  // Handle Single Photo Slot Change
  const handleSinglePhotoSelect = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const next = [...uploadedPhotos];
        next[idx] = reader.result as string;
        setUploadedPhotos(next);
        setActivePreviewIndex(idx);
        showToast(`✓ Foto #${idx + 1} berhasil diperbarui!`);
      };
      reader.readAsDataURL(file);
    }
  };

  // Create Order in Store
  const handleSubmitOrder = () => {
    const fullAddress = `${shippingDetails.street}, Kel. ${shippingDetails.subdistrict}, Kec. ${shippingDetails.district}, ${shippingDetails.city}, ${shippingDetails.province} ${shippingDetails.postalCode} (Patokan: ${shippingDetails.benchmark})`;

    const created = createNewOrder({
      name: shippingDetails.name,
      phone: shippingDetails.phone,
      address: fullAddress,
      street: shippingDetails.street,
      benchmark: shippingDetails.benchmark,
      province: shippingDetails.province,
      city: shippingDetails.city,
      district: shippingDetails.district,
      subdistrict: shippingDetails.subdistrict,
      postalCode: shippingDetails.postalCode,
      courierNote: shippingDetails.courierNote,
      product: selectedProduct.name,
      variantColor: selectedProduct.name.includes("Lite") ? selectedColor : "Pine Wood",
      moment: selectedMoment,
      customText: customText,
      card: includeCard,
      cardMsg: includeCard ? cardMsg : undefined,
      price: selectedProduct.price,
      ongkir: selectedCourier.price,
      courier: selectedCourier.name,
      photoUrl: uploadedPhotos[0],
      photos: uploadedPhotos,
      paymentMethod,
    });
    setActiveOrderId(created.id);
    setWizardStep(3); // Go to payment
    showToast(`Pesanan #${created.id} berhasil dibuat!`);
  };

  // Confirm Payment (Callable for any order)
  const handleConfirmPayment = (targetId?: string) => {
    const idToPay = targetId || activeOrder?.id;
    if (!idToPay) return;
    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes() < 10 ? "0" : ""}${now.getMinutes()}`;
    const nextOrders = orders.map((o) => {
      if (o.id === idToPay) {
        return {
          ...o,
          status: "Lunas" as const,
          logs: [
            ...o.logs,
            {
              time: `Hari ini ${timeStr}`,
              lane: "Pelanggan" as const,
              message: `Pembayaran ${o.paymentMethod || "QRIS"} terverifikasi lunas.`,
            },
            {
              time: `Hari ini ${timeStr}`,
              lane: "Sistem Website" as const,
              message: `Pesanan diteruskan ke Tim Desain Grafis untuk pembuatan draft mockup ukiran.`,
            },
          ],
        };
      }
      return o;
    });
    setOrders(nextOrders);
    saveOrders(nextOrders);
    setPayOrder(null);
    showToast(`✓ Pembayaran #${idToPay} berhasil diverifikasi!`);
  };

  // Approve Draft (Callable for any order)
  const handleApproveDraft = (targetId?: string) => {
    const idToApprove = targetId || activeOrder?.id;
    if (!idToApprove) return;
    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes() < 10 ? "0" : ""}${now.getMinutes()}`;
    const nextOrders = orders.map((o) => {
      if (o.id === idToApprove) {
        return {
          ...o,
          status: "Desain Disetujui" as const,
          logs: [
            ...o.logs,
            {
              time: `Hari ini ${timeStr}`,
              lane: "Pelanggan" as const,
              message: "Pelanggan menyetujui draft desain ukiran kayu.",
            },
            {
              time: `Hari ini ${timeStr}`,
              lane: "Produksi & Packing" as const,
              message: "Masuk antrean workshop untuk pemotongan & ukir laser kayu pinus.",
            },
          ],
        };
      }
      return o;
    });
    setOrders(nextOrders);
    saveOrders(nextOrders);
    setProofOrder(null);
    showToast(`🎉 Desain #${idToApprove} disetujui! Kado mulai dikerjakan di workshop.`);
  };

  // Request Revision (Callable for any order)
  const handleSubmitRevision = (targetId?: string) => {
    const idToRevise = targetId || activeOrder?.id;
    if (!idToRevise || !revisionNote.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes() < 10 ? "0" : ""}${now.getMinutes()}`;
    const nextOrders = orders.map((o) => {
      if (o.id === idToRevise) {
        return {
          ...o,
          status: "Revisi Diminta" as const,
          revisionNotes: [...(o.revisionNotes || []), revisionNote.trim()],
          logs: [
            ...o.logs,
            {
              time: `Hari ini ${timeStr}`,
              lane: "Pelanggan" as const,
              message: `Catatan revisi dikirim: "${revisionNote.trim()}"`,
            },
            {
              time: `Hari ini ${timeStr}`,
              lane: "Tim Grafis" as const,
              message: "Desainer sedang menyesuaikan draft sesuai instruksi pembeli.",
            },
          ],
        };
      }
      return o;
    });
    setOrders(nextOrders);
    saveOrders(nextOrders);
    setRevisionNote("");
    setShowRevisionModal(false);
    setProofOrder(null);
    showToast(`Catatan revisi #${idToRevise} berhasil dikirim ke tim desainer.`);
  };

  // Confirm Received (Callable for any order)
  const handleMarkReceived = (targetId?: string) => {
    const idToReceive = targetId || activeOrder?.id;
    if (!idToReceive) return;
    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes() < 10 ? "0" : ""}${now.getMinutes()}`;
    const nextOrders = orders.map((o) => {
      if (o.id === idToReceive) {
        return {
          ...o,
          status: "Diterima" as const,
          logs: [
            ...o.logs,
            {
              time: `Hari ini ${timeStr}`,
              lane: "Pelanggan" as const,
              message: "Paket kado kayu telah sampai dan diterima dengan baik. Terima kasih!",
            },
          ],
        };
      }
      return o;
    });
    setOrders(nextOrders);
    saveOrders(nextOrders);
    showToast(`✓ Pesanan #${idToReceive} telah selesai diterima. Terima kasih!`);
  };

  // Toggle order log
  const toggleOrderLog = (id: string) => {
    setExpandedLogs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter & Sorting Logic for "Pesanan Saya"
  const filteredAndSortedOrders = orders
    .filter((o) => {
      if (orderFilterStatus === "Semua") return true;
      if (orderFilterStatus === "Menunggu Bayar") return o.status === "Menunggu Bayar";
      if (orderFilterStatus === "Review & Desain") {
        return o.status === "Desain" || o.status === "Review Draft" || o.status === "Revisi Diminta";
      }
      if (orderFilterStatus === "Produksi & Packing") {
        return o.status === "Desain Disetujui" || o.status === "Produksi" || o.status === "Packing";
      }
      if (orderFilterStatus === "Sedang Dikirim") return o.status === "Dikirim";
      if (orderFilterStatus === "Selesai") return o.status === "Diterima";
      return true;
    })
    .filter((o) => {
      if (!orderSearch.trim()) return true;
      const q = orderSearch.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.product.toLowerCase().includes(q) ||
        o.name.toLowerCase().includes(q) ||
        (o.resi && o.resi.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      if (orderSortBy === "terbaru") return b.id.localeCompare(a.id);
      if (orderSortBy === "terlama") return a.id.localeCompare(b.id);
      if (orderSortBy === "harga-tinggi") return b.total - a.total;
      if (orderSortBy === "harga-rendah") return a.total - b.total;
      if (orderSortBy === "progress") {
        const rank: Record<string, number> = {
          "Menunggu Bayar": 1,
          Lunas: 2,
          Desain: 3,
          "Review Draft": 4,
          "Revisi Diminta": 4.5,
          "Desain Disetujui": 5,
          Produksi: 6,
          Packing: 7,
          Dikirim: 8,
          Diterima: 9,
        };
        return (rank[b.status] || 0) - (rank[a.status] || 0);
      }
      return 0;
    });

  // Submit Review Form
  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    addReview({
      orderId: reviewOrderId || activeOrder?.id,
      userName: currentUser?.name || "Keisya Lanika",
      productName: reviewProduct,
      rating: reviewRating,
      comment: reviewComment.trim(),
      photoUrl: reviewProduct.includes("Lite")
        ? "/spinning-box-dark-walnut.jpg"
        : "/spinning-box-pine-premium.jpg",
    });

    setReviewComment("");
    setShowReviewModal(false);
    showToast("Terima kasih! Ulasan Anda berhasil diterbitkan.");
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex flex-col">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-2xl bg-foreground px-4 py-3 text-xs font-bold text-background shadow-soft">
          <Sparkles className="size-4 text-amber-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Store Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-wood text-sm font-bold text-primary-foreground shadow-xs">
              KSG
            </span>
            <div>
              <div className="font-display text-lg font-bold text-primary leading-none">
                Kayu Story
              </div>
              <div className="text-[10px] text-muted-foreground mt-0.5">
                Every Wood Tells a Story
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveTab("pesan")}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                activeTab === "pesan"
                  ? "bg-wood text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              Pesan Kado
            </button>

            {/* Tab Ulasan (Sebelum Beli) */}
            <button
              onClick={() => setActiveTab("ulasan")}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                activeTab === "ulasan"
                  ? "bg-wood text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Star className="size-3.5 fill-amber-400 text-amber-400" />
              <span>Ulasan Pembeli ({reviews.length})</span>
            </button>

            {/* Tab Pesanan Saya */}
            <button
              onClick={() => setActiveTab("pesanan-saya")}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                activeTab === "pesanan-saya"
                  ? "bg-wood text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Package className="size-3.5" />
              <span>Pesanan Saya</span>
              <span className="rounded-full bg-secondary px-1.5 py-0.2 text-[10px] text-primary font-bold">
                {orders.length}
              </span>
            </button>

            {/* Profile Menu */}
            <div className="flex items-center gap-2 pl-2 border-l border-border">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-bold text-foreground">
                  {currentUser?.name || "Keisya Lanika"}
                </span>
                <span className="text-[10px] text-muted-foreground">Pelanggan</span>
              </div>
              <button
                onClick={handleLogout}
                title="Keluar / Ganti Akun"
                className="flex size-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition"
              >
                <LogOut className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 mx-auto w-full max-w-6xl px-6 py-8">
        {/* VIEW 1: PESAN KADO BARU */}
        {activeTab === "pesan" && (
          <div>
            {/* Step Wizard Bar */}
            <div className="mb-8 max-w-3xl mx-auto">
              <div className="grid grid-cols-4 gap-2">
                {[
                  "1. Pilih Produk",
                  "2. Kustomisasi & Foto",
                  "3. Pengiriman",
                  "4. Pembayaran",
                ].map((s, idx) => (
                  <div
                    key={s}
                    onClick={() => setWizardStep(idx)}
                    className={`cursor-pointer rounded-2xl border p-2.5 text-center transition ${
                      wizardStep === idx
                        ? "border-primary bg-primary/10 shadow-xs"
                        : idx < wizardStep
                        ? "border-border bg-card hover:bg-secondary text-foreground"
                        : "border-transparent bg-muted/40 text-muted-foreground"
                    }`}
                  >
                    <div
                      className={`mx-auto flex size-6 items-center justify-center rounded-full text-xs font-bold mb-1 ${
                        idx < wizardStep
                          ? "bg-accent text-accent-foreground"
                          : idx === wizardStep
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {idx < wizardStep ? "✓" : idx + 1}
                    </div>
                    <span className="text-xs font-semibold block truncate">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              {/* Left Form Content */}
              <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-soft">
                {/* STEP 0: PILIH PRODUK KATALOG */}
                {wizardStep === 0 && (
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-primary mb-2">
                          <Sparkles className="size-3.5" /> Promo Hingga 30 November 2026
                        </div>
                        <h2 className="font-display text-2xl font-bold">
                          Pilih Model Spinning Box
                        </h2>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Kotak kayu ukir putar foto kenangan dengan lampu LED warm dan colokan Type-C.
                        </p>
                      </div>

                      {/* Quick Action Buttons */}
                      <div className="flex items-center gap-2">
                        <a
                          href="https://www.instagram.com/reel/DXesKOaE-Gl/?utm_source=ig_web_copy_link"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold hover:bg-muted text-foreground transition"
                        >
                          <Instagram className="size-3.5 text-pink-500" />
                          <span>Video Reel Produk ↗</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => setShowLineupModal(true)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold hover:bg-muted"
                        >
                          <ZoomIn className="size-3.5 text-primary" />
                          <span>Lihat 4 Warna</span>
                        </button>
                      </div>
                    </div>

                    {/* Products Grid - Exact 2 Catalog Products */}
                    <div className="grid gap-6 sm:grid-cols-2">
                      {products.map((p) => {
                        const isSelected = selectedProduct.id === p.id;
                        const displayImg =
                          p.id === 1
                            ? "/spinning-box-pine-premium.jpg"
                            : "/spinning-box-dark-walnut.jpg";

                        return (
                          <div
                            key={p.id}
                            onClick={() => {
                              setSelectedProduct(p);
                              if (p.id === 1) {
                                setPhotoPreview("/spinning-box-pine-premium.jpg");
                              } else {
                                setPhotoPreview("/spinning-box-dark-walnut.jpg");
                              }
                            }}
                            className={`cursor-pointer overflow-hidden rounded-3xl border-2 p-5 transition flex flex-col justify-between ${
                              isSelected
                                ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary/20"
                                : "border-border hover:border-primary/40 bg-card"
                            }`}
                          >
                            <div>
                              {/* Product Photo - Crisp Authentic High-Res Without Blurry Zoom */}
                              <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100 mb-4 border border-border/40">
                                <img
                                  src={displayImg}
                                  alt={p.name}
                                  className="h-full w-full object-cover object-center transition duration-500 hover:scale-102"
                                  loading="lazy"
                                />
                                <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-card/95 backdrop-blur-sm px-3 py-1 text-xs font-bold shadow-xs border border-border/40">
                                  <span className="size-1.5 rounded-full bg-primary" />
                                  <span>{p.tag}</span>
                                </div>
                                {p.id === 2 && isSelected && (
                                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-card/95 backdrop-blur-md px-3 py-1.5 text-xs border border-border/60 shadow-xs">
                                    <span className="text-[11px] font-semibold text-muted-foreground">Warna Terpilih:</span>
                                    <span className="font-bold text-foreground flex items-center gap-1.5">
                                      <span
                                        className="size-3 rounded-full border border-black/20"
                                        style={{
                                          backgroundColor:
                                            p.colors?.find((c: any) => c.id === selectedColor)?.hex || "#7A593B",
                                        }}
                                      />
                                      <span>{selectedColor}</span>
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Title & Price */}
                              <div className="space-y-1">
                                <h3 className="font-display text-lg font-bold">{p.name}</h3>
                                <div className="flex items-baseline gap-2">
                                  <span className="font-display text-xl font-bold text-primary">
                                    {rupiah(p.price)}
                                  </span>
                                  <span className="text-xs text-destructive line-through">
                                    {rupiah(p.normalPrice)}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground pt-1">{p.desc}</p>
                              </div>

                              {/* Modern Color Swatches for Lite (No Tacky Emojis) */}
                              {p.colors && (
                                <div className="mt-4 pt-3.5 border-t border-border">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-[11px] font-bold tracking-wider uppercase text-muted-foreground">
                                      Pilihan Warna Box
                                    </span>
                                    <span className="text-xs font-semibold text-foreground">
                                      {selectedColor}
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-3 gap-2">
                                    {p.colors.map((c: any) => {
                                      const colorId = typeof c === "string" ? c : c.id;
                                      const colorName = typeof c === "string" ? c : c.name || c.id;
                                      const colorHex =
                                        c.hex ||
                                        (colorId.includes("Frosty")
                                          ? "#EFECE6"
                                          : colorId.includes("Walnut")
                                          ? "#2B211B"
                                          : "#7A593B");
                                      const colorTone =
                                        c.tone ||
                                        (colorId.includes("Frosty")
                                          ? "Putih Minimalis"
                                          : colorId.includes("Walnut")
                                          ? "Espresso Mewah"
                                          : "Cokelat Natural");
                                      const isCurrentActive = selectedColor === colorId;

                                      return (
                                        <button
                                          key={colorId}
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedProduct(p);
                                            setSelectedColor(colorId);
                                            setPhotoPreview("/spinning-box-dark-walnut.jpg");
                                          }}
                                          className={`group flex flex-col items-center gap-1.5 rounded-2xl p-2.5 transition border text-left cursor-pointer ${
                                            isCurrentActive && isSelected
                                              ? "border-primary bg-primary/10 shadow-xs ring-1 ring-primary"
                                              : "border-border/80 bg-background/60 hover:bg-muted/70 hover:border-foreground/20"
                                          }`}
                                        >
                                          <div className="relative flex items-center justify-center">
                                            <span
                                              className="size-6 rounded-full border border-black/15 shadow-inner transition group-hover:scale-105"
                                              style={{ backgroundColor: colorHex }}
                                            />
                                            {isCurrentActive && isSelected && (
                                              <Check
                                                className={`absolute size-3 stroke-[3] ${
                                                  colorHex === "#EFECE6" || colorHex === "#FFFFFF"
                                                    ? "text-stone-900"
                                                    : "text-white"
                                                }`}
                                              />
                                            )}
                                          </div>
                                          <div className="text-center w-full">
                                            <span className="block text-[11px] font-bold leading-tight text-foreground truncate">
                                              {colorName}
                                            </span>
                                            <span className="block text-[10px] text-muted-foreground truncate">
                                              {colorTone}
                                            </span>
                                          </div>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}

                              {/* Bullet Features */}
                              <div className="mt-4 pt-3 border-t border-border space-y-1.5 text-xs text-muted-foreground">
                                {p.features.map((feat, i) => (
                                  <div key={i} className="flex items-center gap-1.5">
                                    <Check className="size-3.5 text-accent shrink-0" />
                                    <span>{feat}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="mt-5 pt-3 border-t border-border">
                              <span
                                className={`block w-full text-center rounded-xl py-2 text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                                  isSelected
                                    ? "bg-wood text-primary-foreground shadow-xs"
                                    : "border border-border text-foreground hover:bg-muted"
                                }`}
                              >
                                {isSelected ? (
                                  <>
                                    <Check className="size-3.5" />
                                    <span>Model Dipilih</span>
                                  </>
                                ) : (
                                  <span>Pilih Model Ini</span>
                                )}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Momen Selector */}
                    <div className="pt-2">
                      <div className="text-xs font-bold uppercase text-muted-foreground mb-2">
                        Pilihan Momen Kado:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {moments.map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setSelectedMoment(m)}
                            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                              selectedMoment === m
                                ? "bg-wood text-primary-foreground shadow-xs"
                                : "bg-muted text-muted-foreground hover:bg-secondary"
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 1: KUSTOMISASI TEKS & 8 FOTO */}
                {wizardStep === 1 && (
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h2 className="font-display text-2xl font-bold">Kustomisasi Tulisan & 8 Foto</h2>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Spinning box memuat 8 foto kenangan yang akan dicetak presisi dan dirakit berputar di dalam box.
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3.5 py-1 text-xs font-bold text-primary">
                        <Sparkles className="size-3.5" /> 8/8 Slot Foto Terisi
                      </div>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
                      <div className="space-y-6">
                        {/* Multi-Photo 8 Slot Uploader */}
                        <div className="rounded-3xl border border-border bg-card p-5 space-y-4 shadow-soft">
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                            <div>
                              <label className="text-xs font-bold uppercase tracking-wider text-foreground block">
                                Unggah 8 Foto Kenangan
                              </label>
                              <span className="text-[11px] text-muted-foreground">
                                Pilih 8 foto sekaligus dari galeri atau klik per slot foto di bawah
                              </span>
                            </div>

                            {/* Upload all 8 at once */}
                            <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-full bg-wood px-4 py-1.5 text-xs font-bold text-primary-foreground shadow-xs hover:opacity-95 transition">
                              <Upload className="size-3.5" />
                              <span>Pilih 8 Foto Sekaligus</span>
                              <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleMultiplePhotosSelect}
                                className="hidden"
                              />
                            </label>
                          </div>

                          {/* 8-Photo Grid */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {uploadedPhotos.map((photo, idx) => (
                              <div
                                key={idx}
                                onClick={() => setActivePreviewIndex(idx)}
                                className={`group relative aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer transition ${
                                  activePreviewIndex === idx
                                    ? "border-primary ring-2 ring-primary/30 scale-[1.02] shadow-md"
                                    : "border-border hover:border-primary/50"
                                }`}
                              >
                                <img
                                  src={photo}
                                  alt={`Foto ${idx + 1}`}
                                  className="h-full w-full object-cover"
                                />
                                <div className="absolute top-1.5 left-1.5 flex items-center justify-center size-5 rounded-full bg-black/80 text-[10px] font-bold text-white shadow-xs">
                                  {idx + 1}
                                </div>
                                {idx === 0 && (
                                  <span className="absolute bottom-1 left-1 right-1 rounded bg-black/75 px-1 py-0.5 text-[8px] font-bold text-white text-center truncate">
                                    Foto Depan
                                  </span>
                                )}
                                {/* Slot Hover Overlay for Change */}
                                <label
                                  onClick={(e) => e.stopPropagation()}
                                  className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[10px] font-bold transition cursor-pointer p-1 text-center"
                                >
                                  <Upload className="size-4 mb-1" />
                                  <span>Ganti Foto #{idx + 1}</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleSinglePhotoSelect(idx, e)}
                                    className="hidden"
                                  />
                                </label>
                              </div>
                            ))}
                          </div>

                          <div className="rounded-2xl bg-muted/40 p-3 text-[11px] text-muted-foreground flex items-center gap-2">
                            <Sparkles className="size-4 text-amber-500 shrink-0" />
                            <span>
                              <b>Urutan Foto:</b> Foto #1 adalah foto depan. Putar tuas box untuk melihat foto #2 hingga #8 berputar secara berurutan.
                            </span>
                          </div>
                        </div>

                        {/* Custom Text Engraving */}
                        <div className="rounded-3xl border border-border bg-card p-5 space-y-3 shadow-soft">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                              Teks Ukiran Grafir Laser di Tutup Box
                            </label>
                            <span className="text-[11px] text-muted-foreground">{customText.length}/35 Karakter</span>
                          </div>
                          <input
                            type="text"
                            maxLength={35}
                            value={customText}
                            onChange={(e) => setCustomText(e.target.value)}
                            placeholder="Cth: us ♡ thank you, 2025"
                            className="input text-sm"
                          />
                          <p className="text-[11px] text-muted-foreground">
                            Teks akan diukir laser presisi di atas tutup kayu solid. Anda dapat me-review draft ukirannya sebelum box mulai dipotong.
                          </p>
                        </div>

                        {/* Greeting Card with Wax Seal */}
                        <div className="rounded-3xl border border-border bg-card p-5 space-y-3 shadow-soft">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={includeCard}
                              onChange={(e) => setIncludeCard(e.target.checked)}
                              className="size-4 accent-primary rounded"
                            />
                            <div className="flex-1">
                              <span className="text-xs font-bold">Kartu Ucapan Berstempel Lilin Wax</span>
                              <span className="ml-2 rounded bg-secondary px-2 py-0.5 text-[10px] font-bold text-primary">
                                +Rp10.000
                              </span>
                              <p className="text-[11px] text-muted-foreground">
                                Kertas linen tebal dengan amplop segel lilin wax stempel eksklusif Kayu Story
                              </p>
                            </div>
                          </label>

                          {includeCard && (
                            <textarea
                              value={cardMsg}
                              onChange={(e) => setCardMsg(e.target.value)}
                              placeholder="Tuliskan isi pesan ucapan kado di sini..."
                              className="input min-h-20 text-xs"
                            />
                          )}
                        </div>
                      </div>

                      {/* Right Preview Column */}
                      <div className="space-y-4">
                        <div className="rounded-3xl border border-border bg-card p-5 shadow-soft space-y-3 lg:sticky lg:top-24">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase text-muted-foreground">
                              Pratinjau Foto #{activePreviewIndex + 1}
                            </span>
                            <span className="text-[10px] rounded-full bg-secondary px-2 py-0.5 font-bold text-primary">
                              {selectedProduct.name}
                            </span>
                          </div>

                          <div className="relative overflow-hidden rounded-2xl border border-border shadow-soft bg-black aspect-square flex items-center justify-center">
                            <img
                              src={uploadedPhotos[activePreviewIndex] || "/spinning-box-pine-premium.jpg"}
                              alt="Pratinjau"
                              className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-5 text-white">
                              <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
                                {selectedMoment} · Foto #{activePreviewIndex + 1}
                              </span>
                              <div className="font-display text-xl font-bold mt-1">
                                "{customText || "Teks Ukiran Kamu"}"
                              </div>
                              <span className="text-[11px] opacity-85 mt-1">
                                {selectedProduct.name} · {selectedProduct.material}
                              </span>
                            </div>
                          </div>

                          {/* Selector Dots / Mini Buttons */}
                          <div className="flex items-center justify-center gap-1.5 pt-1">
                            {uploadedPhotos.map((_, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => setActivePreviewIndex(i)}
                                className={`size-6 rounded-full text-[10px] font-bold transition ${
                                  activePreviewIndex === i
                                    ? "bg-wood text-primary-foreground shadow-xs"
                                    : "bg-muted text-muted-foreground hover:bg-secondary"
                                }`}
                              >
                                {i + 1}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: PENGIRIMAN SPESIFIK DENGAN PATOKAN KURIR */}
                {wizardStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-display text-2xl font-bold">Alamat Pengiriman Lengkap</h2>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Lengkapi detail alamat dan patokan rumah agar kurir ekspedisi tidak bingung saat mengantar kado.
                      </p>
                    </div>

                    <div className="space-y-5">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                            Nama Lengkap Penerima Kado *
                          </label>
                          <input
                            value={shippingDetails.name}
                            onChange={(e) => setShippingDetails({ ...shippingDetails, name: e.target.value })}
                            placeholder="Cth: Keisya Lanika"
                            className="input text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                            Nomor WhatsApp / HP Aktif *
                          </label>
                          <input
                            value={shippingDetails.phone}
                            onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
                            placeholder="Cth: 081234567890"
                            className="input text-sm"
                          />
                          <span className="text-[10px] text-muted-foreground mt-0.5 block">
                            Kurir akan menghubungi nomor ini saat paket tiba
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                          Alamat Jalan & Nomor Rumah / RT / RW *
                        </label>
                        <input
                          value={shippingDetails.street}
                          onChange={(e) => setShippingDetails({ ...shippingDetails, street: e.target.value })}
                          placeholder="Cth: Jl. Soekarno Hatta No. 45, RT 03 / RW 07"
                          className="input text-sm"
                        />
                      </div>

                      {/* Patokan Kurir (Biar kurir ga bingung) */}
                      <div className="rounded-2xl border-2 border-amber-400/70 bg-amber-500/10 p-4 space-y-1.5">
                        <label className="flex items-center gap-1.5 text-xs font-bold uppercase text-foreground">
                          <MapPin className="size-4 text-amber-500" />
                          <span>Patokan Lokasi Rumah (PENTING untuk Kurir) *</span>
                        </label>
                        <input
                          value={shippingDetails.benchmark}
                          onChange={(e) => setShippingDetails({ ...shippingDetails, benchmark: e.target.value })}
                          placeholder="Cth: Pagar hitam kayu, seberang Indomaret Lowokwaru, samping gerai fotokopi"
                          className="input text-sm bg-card"
                        />
                        <p className="text-[11px] text-muted-foreground">
                          Tuliskan warna pagar, seberang toko, masjid, pos satpam, atau ciri khas sekitar agar kurir langsung sampai tanpa tersasar.
                        </p>
                      </div>

                      {/* Provinsi, Kota, Kecamatan, Kelurahan, Kode Pos */}
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        <div>
                          <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                            Provinsi *
                          </label>
                          <input
                            value={shippingDetails.province}
                            onChange={(e) => setShippingDetails({ ...shippingDetails, province: e.target.value })}
                            placeholder="Cth: Jawa Timur"
                            className="input text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                            Kota / Kabupaten *
                          </label>
                          <input
                            value={shippingDetails.city}
                            onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
                            placeholder="Cth: Kota Malang"
                            className="input text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                            Kecamatan *
                          </label>
                          <input
                            value={shippingDetails.district}
                            onChange={(e) => setShippingDetails({ ...shippingDetails, district: e.target.value })}
                            placeholder="Cth: Lowokwaru"
                            className="input text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                            Kelurahan / Desa *
                          </label>
                          <input
                            value={shippingDetails.subdistrict}
                            onChange={(e) => setShippingDetails({ ...shippingDetails, subdistrict: e.target.value })}
                            placeholder="Cth: Jatimulyo"
                            className="input text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                            Kode Pos (5 Digit) *
                          </label>
                          <input
                            value={shippingDetails.postalCode}
                            maxLength={5}
                            onChange={(e) => setShippingDetails({ ...shippingDetails, postalCode: e.target.value })}
                            placeholder="Cth: 65141"
                            className="input text-xs font-mono font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                            Catatan untuk Kurir (Opsional)
                          </label>
                          <input
                            value={shippingDetails.courierNote}
                            onChange={(e) => setShippingDetails({ ...shippingDetails, courierNote: e.target.value })}
                            placeholder="Cth: Titip di pos satpam bila rumah sepi"
                            className="input text-xs"
                          />
                        </div>
                      </div>

                      {/* Courier Selection */}
                      <div className="pt-2">
                        <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">
                          Pilihan Ekspedisi
                        </label>
                        <div className="grid gap-3 sm:grid-cols-3">
                          {couriers.map((c) => (
                            <div
                              key={c.id}
                              onClick={() => setSelectedCourier(c)}
                              className={`cursor-pointer rounded-2xl border-2 p-3.5 transition ${
                                selectedCourier.id === c.id
                                  ? "border-primary bg-primary/5 shadow-xs ring-1 ring-primary/30"
                                  : "border-border hover:bg-secondary bg-card"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-xs">{c.name}</span>
                                <span className="font-bold text-primary text-xs">{rupiah(c.price)}</span>
                              </div>
                              <div className="text-[11px] text-muted-foreground mt-1">
                                Estimasi Sampai: {c.est}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: PEMBAYARAN */}
                {wizardStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-display text-2xl font-bold">Pembayaran Pesanan</h2>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Pilih metode pembayaran aman. Verifikasi otomatis tanpa perlu kirim struk.
                      </p>
                    </div>

                    {/* Method Selector */}
                    <div className="grid gap-3 sm:grid-cols-3">
                      {[
                        { id: "QRIS", name: "QRIS (GoPay/OVO/BCA/Dana)", icon: QrCode },
                        { id: "Virtual Account BCA", name: "BCA Virtual Account", icon: CreditCard },
                        { id: "Virtual Account Mandiri", name: "Mandiri Virtual Account", icon: CreditCard },
                      ].map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setPaymentMethod(m.id as any)}
                          className={`flex flex-col items-center justify-center rounded-2xl border-2 p-4 text-center transition ${
                            paymentMethod === m.id
                              ? "border-primary bg-primary/5 shadow-xs"
                              : "border-border hover:bg-secondary bg-card"
                          }`}
                        >
                          <m.icon className="size-6 text-primary mb-1.5" />
                          <span className="text-xs font-bold">{m.name}</span>
                        </button>
                      ))}
                    </div>

                    {/* QR Code / VA Number Display */}
                    {paymentMethod === "QRIS" ? (
                      <div className="rounded-2xl border border-border bg-muted/20 p-6 text-center">
                        <div className="mx-auto size-44 rounded-2xl bg-white p-3 shadow-md ring-1 ring-border flex items-center justify-center">
                          <div className="grid size-36 grid-cols-8 gap-0.5">
                            {Array.from({ length: 64 }).map((_, i) => (
                              <span
                                key={i}
                                className={`rounded-xs ${
                                  (i * 13 + 7) % 3 === 0 || (i >= 0 && i < 3) || (i >= 5 && i < 8)
                                    ? "bg-black"
                                    : "bg-transparent"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="font-display text-2xl font-bold text-primary">
                            {rupiah(grandTotal)}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Pindai kode QRIS menggunakan GoPay, OVO, ShopeePay, BCA Mobile, atau Livin Mandiri
                          </p>
                          <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
                            <Clock className="size-3.5" /> Batas waktu pembayaran: 14:52
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-border bg-muted/20 p-6 text-center space-y-2">
                        <div className="text-xs uppercase font-bold text-muted-foreground">
                          Nomor Virtual Account {paymentMethod}:
                        </div>
                        <div className="font-mono text-2xl font-bold tracking-widest text-primary">
                          8809 1142 9901 2831
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Total tagihan: <b>{rupiah(grandTotal)}</b>
                        </div>
                      </div>
                    )}

                    {/* Realistic Payment Confirmation Button */}
                    <div className="pt-2">
                      <button
                        onClick={handleConfirmPayment}
                        className="w-full rounded-2xl bg-accent p-4 text-center text-sm font-bold text-accent-foreground shadow-soft hover:opacity-95 transition flex items-center justify-center gap-2"
                      >
                        <Check className="size-5" />
                        <span>Saya Sudah Membayar (Verifikasi Otomatis)</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Bottom Step Actions */}
                <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
                  {wizardStep > 0 ? (
                    <button
                      onClick={() => setWizardStep(wizardStep - 1)}
                      className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-xs font-semibold hover:bg-muted"
                    >
                      <ArrowLeft className="size-3.5" /> Sebelumnya
                    </button>
                  ) : (
                    <div />
                  )}

                  {wizardStep < 2 ? (
                    <button
                      onClick={() => setWizardStep(wizardStep + 1)}
                      className="inline-flex items-center gap-2 rounded-full bg-wood px-6 py-2.5 text-xs font-bold text-primary-foreground shadow-soft"
                    >
                      Lanjut <ArrowRight className="size-3.5" />
                    </button>
                  ) : wizardStep === 2 ? (
                    <button
                      onClick={handleSubmitOrder}
                      className="inline-flex items-center gap-2 rounded-full bg-wood px-6 py-2.5 text-xs font-bold text-primary-foreground shadow-soft"
                    >
                      Buat Pesanan & Bayar <ArrowRight className="size-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveTab("pesanan-saya")}
                      className="inline-flex items-center gap-2 rounded-full bg-wood px-6 py-2.5 text-xs font-bold text-primary-foreground shadow-soft"
                    >
                      Buka Pesanan Saya & Lacak <ArrowRight className="size-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Sticky Summary Sidebar */}
              <aside className="space-y-6">
                <div className="rounded-3xl border border-border bg-card p-6 shadow-soft lg:sticky lg:top-24">
                  <h3 className="font-display text-base font-bold">Ringkasan Kado</h3>
                  <div className="mt-4 space-y-2.5 text-xs border-t border-border pt-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Model:</span>
                      <span className="font-semibold">{selectedProduct.name}</span>
                    </div>
                    {selectedProduct.colors && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Warna:</span>
                        <span className="font-semibold">{selectedColor}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Momen:</span>
                      <span className="font-semibold">{selectedMoment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Teks Grafir:</span>
                      <span className="font-semibold truncate max-w-[130px]">"{customText}"</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Harga Promo:</span>
                      <span className="font-semibold">{rupiah(subtotal)}</span>
                    </div>
                    {includeCard && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Kartu Ucapan Wax:</span>
                        <span className="font-semibold">{rupiah(cardPrice)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ongkir ({selectedCourier.name}):</span>
                      <span className="font-semibold">{rupiah(ongkir)}</span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-3 text-sm font-bold">
                      <span>Total:</span>
                      <span className="font-display text-base text-primary">{rupiah(grandTotal)}</span>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl bg-secondary/50 p-4 space-y-2 text-[11px] text-muted-foreground">
                    <div className="font-bold text-foreground flex items-center gap-1.5">
                      <Sparkles className="size-3.5 text-primary" /> Keunggulan Kayu Story:
                    </div>
                    <div>• 100% Kayu Pinus Solid / HPL Presisi</div>
                    <div>• Charger Type-C modern & Lampu LED</div>
                    <div>• Free Photo Printing & Cutting</div>
                    <div>• Review draft desain sebelum diukir</div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        )}

        {/* VIEW 2: FITUR ULASAN & REVIEW PEMBELI */}
        {activeTab === "ulasan" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl font-bold">Ulasan & Testimoni Pembeli</h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Lihat pengalaman nyata pelanggan sebelum memesan kado kayu kustom.
                </p>
              </div>

              <button
                onClick={() => {
                  setReviewOrderId("");
                  setReviewProduct(products[0].name);
                  setShowReviewModal(true);
                }}
                className="inline-flex items-center gap-1.5 rounded-full bg-wood px-5 py-2 text-xs font-bold text-primary-foreground shadow-xs hover:opacity-95"
              >
                <Star className="size-3.5 fill-amber-300 text-amber-300" />
                <span>+ Tulis Ulasan Pembeli</span>
              </button>
            </div>

            {/* Rating Summary Header */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft grid gap-6 sm:grid-cols-3 items-center">
              <div className="text-center sm:text-left space-y-1">
                <div className="font-display text-5xl font-bold text-primary">5.0</div>
                <div className="flex items-center gap-0.5 justify-center sm:justify-start">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="size-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">
                  Berdasarkan {reviews.length} ulasan terverifikasi
                </div>
              </div>

              <div className="sm:col-span-2 space-y-2 border-t sm:border-t-0 sm:border-l border-border sm:pl-6 pt-4 sm:pt-0 text-xs">
                <div className="font-bold text-foreground flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-accent" /> 100% Pembeli Puas dengan Hasil Ukir
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Semua kado dikerjakan dengan bahan kayu solid alami, dilengkapi lampu LED warm aesthetic, dan dikemas aman dengan bubble wrap tebal.
                </p>
              </div>
            </div>

            {/* Filter by Product */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground">Filter Produk:</span>
              {["Semua", "Spinning Box Premium", "Spinning Box Lite"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setReviewFilter(cat)}
                  className={`rounded-full px-3.5 py-1 text-xs font-semibold transition ${
                    reviewFilter === cat
                      ? "bg-wood text-primary-foreground shadow-xs"
                      : "bg-muted text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Reviews Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {reviews
                .filter(
                  (r) => reviewFilter === "Semua" || r.productName === reviewFilter
                )
                .map((rev) => (
                  <div
                    key={rev.id}
                    className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="flex size-9 items-center justify-center rounded-full bg-secondary font-bold text-primary text-xs">
                            {rev.userName.charAt(0)}
                          </span>
                          <div>
                            <div className="font-bold text-xs">{rev.userName}</div>
                            <div className="flex items-center gap-1 text-[10px] text-accent font-semibold">
                              <CheckCircle2 className="size-3" /> Pembeli Terverifikasi
                            </div>
                          </div>
                        </div>

                        <div className="text-right space-y-1">
                          <div className="flex items-center gap-0.5 justify-end">
                            {Array.from({ length: rev.rating }).map((_, si) => (
                              <Star key={si} className="size-3.5 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <span className="text-[10px] text-muted-foreground">{rev.date}</span>
                        </div>
                      </div>

                      <div className="inline-block rounded-md bg-secondary/60 px-2.5 py-0.5 text-[10px] font-bold text-primary">
                        Produk: {rev.productName}
                      </div>

                      <p className="text-xs text-foreground/85 leading-relaxed italic">
                        "{rev.comment}"
                      </p>
                    </div>

                    {rev.photoUrl && (
                      <div className="pt-2 border-t border-border/60">
                        <div className="flex items-center gap-3">
                          <div className="size-16 rounded-xl overflow-hidden bg-black/5 shrink-0 border border-border">
                            <img
                              src={rev.photoUrl}
                              alt="Foto Ulasan"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="text-[11px] text-muted-foreground">
                            Foto asli kado yang diterima pembeli
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* VIEW 3: PESANAN SAYA (SEMUA PESANAN & PROGRESS LENGKAP) */}
        {activeTab === "pesanan-saya" && (
          <div className="space-y-6">
            {/* Header & Subtitle */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl font-bold flex items-center gap-2">
                  <Package className="size-6 text-primary" />
                  <span>Pesanan Saya</span>
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-bold text-primary">
                    {orders.length} Total Pesanan
                  </span>
                </h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Lacak semua kado yang dipesan, review draft desain digital, pantau progress workshop, dan cek resi pengiriman.
                </p>
              </div>

              <button
                onClick={() => {
                  setWizardStep(0);
                  setActiveTab("pesan");
                }}
                className="inline-flex items-center gap-1.5 rounded-full bg-wood px-5 py-2 text-xs font-bold text-primary-foreground shadow-xs hover:opacity-95 transition"
              >
                <ShoppingBag className="size-3.5" />
                <span>+ Pesan Kado Baru</span>
              </button>
            </div>

            {/* Filter Status Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 border-b border-border pb-3">
              {[
                { id: "Semua", label: `Semua (${orders.length})` },
                {
                  id: "Menunggu Bayar",
                  label: `Menunggu Bayar (${orders.filter((o) => o.status === "Menunggu Bayar").length})`,
                },
                {
                  id: "Review & Desain",
                  label: `Review & Desain (${orders.filter((o) => o.status === "Desain" || o.status === "Review Draft" || o.status === "Revisi Diminta").length})`,
                },
                {
                  id: "Produksi & Packing",
                  label: `Produksi & Packing (${orders.filter((o) => o.status === "Desain Disetujui" || o.status === "Produksi" || o.status === "Packing").length})`,
                },
                {
                  id: "Sedang Dikirim",
                  label: `Sedang Dikirim (${orders.filter((o) => o.status === "Dikirim").length})`,
                },
                {
                  id: "Selesai",
                  label: `Selesai (${orders.filter((o) => o.status === "Diterima").length})`,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setOrderFilterStatus(tab.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                    orderFilterStatus === tab.id
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search & "Urutkan" Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-card border border-border p-3 shadow-xs">
              {/* Search Box */}
              <div className="relative flex-1 min-w-[240px]">
                <Search className="absolute left-3.5 top-2.5 size-4 text-muted-foreground" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Cari kode pesanan (cth: KSG-0143) atau nama produk..."
                  className="input pl-9 py-1.5 text-xs w-full"
                />
              </div>

              {/* Sort Selector ("Urutkan") */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                  <ArrowUpDown className="size-3.5" />
                  <span>Urutkan:</span>
                </span>
                <select
                  value={orderSortBy}
                  onChange={(e) => setOrderSortBy(e.target.value as any)}
                  className="rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-bold text-foreground cursor-pointer"
                >
                  <option value="terbaru">Pesanan Terbaru</option>
                  <option value="terlama">Pesanan Terlama</option>
                  <option value="progress">Status Alur Terdepan</option>
                  <option value="harga-tinggi">Total Belanja Tertinggi</option>
                  <option value="harga-rendah">Total Belanja Terendah</option>
                </select>
              </div>
            </div>

            {/* LIST OF ALL ORDERS (TAMPIL SEMUA, BUKAN CUMA 1) */}
            {filteredAndSortedOrders.length === 0 ? (
              <div className="rounded-3xl border border-border bg-card p-12 text-center space-y-3">
                <Package className="mx-auto size-12 text-muted-foreground/40" />
                <h3 className="font-display text-lg font-bold">Tidak ada pesanan ditemukan</h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  {orderSearch
                    ? `Tidak ada pesanan yang sesuai dengan kata kunci "${orderSearch}".`
                    : "Belum ada pesanan pada kategori ini."}
                </p>
                <button
                  onClick={() => {
                    setOrderFilterStatus("Semua");
                    setOrderSearch("");
                  }}
                  className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold hover:bg-muted"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredAndSortedOrders.map((o) => {
                  const isDelivered = o.status === "Diterima";
                  const isShipped = o.status === "Dikirim";
                  const isProofing = o.status === "Review Draft" || o.status === "Revisi Diminta";
                  const isPendingPay = o.status === "Menunggu Bayar";
                  const isLogsOpen = expandedLogs[o.id] || false;

                  // 6 Steps BPMN Progress Pipeline
                  const pipelineSteps = [
                    { num: 1, label: "Bayar", done: o.status !== "Menunggu Bayar" && o.status !== "Kedaluwarsa" },
                    { num: 2, label: "Draft Desain", done: ["Review Draft", "Revisi Diminta", "Desain Disetujui", "Produksi", "Packing", "Dikirim", "Diterima"].includes(o.status) },
                    { num: 3, label: "Desain Disetujui", done: ["Desain Disetujui", "Produksi", "Packing", "Dikirim", "Diterima"].includes(o.status) },
                    { num: 4, label: "Workshop Produksi", done: ["Produksi", "Packing", "Dikirim", "Diterima"].includes(o.status) },
                    { num: 5, label: "Dikirim Kurir", done: ["Dikirim", "Diterima"].includes(o.status) },
                    { num: 6, label: "Diterima", done: o.status === "Diterima" },
                  ];

                  // Status badge style
                  const statusColors: Record<string, string> = {
                    "Menunggu Bayar": "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200",
                    Lunas: "bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950 dark:text-blue-200",
                    Desain: "bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950 dark:text-purple-200",
                    "Review Draft": "bg-indigo-100 text-indigo-900 border-indigo-300 ring-2 ring-indigo-400/30 animate-pulse dark:bg-indigo-950 dark:text-indigo-200",
                    "Revisi Diminta": "bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950 dark:text-rose-200",
                    "Desain Disetujui": "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200",
                    Produksi: "bg-amber-100 text-amber-950 border-amber-400 dark:bg-amber-950 dark:text-amber-200",
                    Packing: "bg-orange-100 text-orange-950 border-orange-300 dark:bg-orange-950 dark:text-orange-200",
                    Dikirim: "bg-cyan-100 text-cyan-900 border-cyan-300 dark:bg-cyan-950 dark:text-cyan-200",
                    Diterima: "bg-emerald-600 text-white border-emerald-700 shadow-xs",
                  };

                  return (
                    <div
                      key={o.id}
                      className="rounded-3xl border border-border bg-card shadow-soft overflow-hidden transition hover:border-primary/40"
                    >
                      {/* CARD TOP BAR */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/20 px-6 py-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-mono text-base font-bold text-foreground">
                            #{o.id}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="size-3.5" /> {o.date}
                          </span>
                          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold text-primary">
                            {o.moment}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-bold ${
                              statusColors[o.status] || "bg-secondary text-primary"
                            }`}
                          >
                            {o.status}
                          </span>
                          <span className="font-display text-base font-bold text-primary">
                            {rupiah(o.total)}
                          </span>
                        </div>
                      </div>

                      {/* 6-STEP VISUAL PROGRESS TRACKER */}
                      <div className="border-b border-border bg-secondary/10 px-6 py-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                            Progress Tahapan Pesanan:
                          </span>
                          <span className="text-[11px] font-semibold text-primary">
                            Status Terkini: <b>{o.status}</b>
                          </span>
                        </div>

                        <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
                          {pipelineSteps.map((s) => (
                            <div key={s.num} className="text-center space-y-1">
                              <div
                                className={`h-2 rounded-full transition ${
                                  s.done ? "bg-accent" : "bg-muted"
                                }`}
                              />
                              <div className="hidden sm:block text-[10px] font-semibold text-muted-foreground truncate">
                                {s.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CARD BODY: DETAIL APA SAJA YANG DIPESAN */}
                      <div className="p-6 space-y-6">
                        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
                          {/* Left: Product Info & Laser Text */}
                          <div className="space-y-4">
                            <div className="flex gap-4 items-start">
                              <div className="relative size-24 shrink-0 rounded-2xl overflow-hidden border border-border bg-black/5">
                                <img
                                  src={o.photoUrl || "/spinning-box-pine-premium.jpg"}
                                  alt={o.product}
                                  className="h-full w-full object-cover"
                                />
                                {o.variantColor && (
                                  <span className="absolute bottom-1 left-1 right-1 rounded bg-black/75 px-1 py-0.2 text-[8px] font-bold text-white text-center truncate">
                                    {o.variantColor}
                                  </span>
                                )}
                              </div>

                              <div className="space-y-1 flex-1">
                                <h3 className="font-display text-base font-bold text-foreground">
                                  {o.product}
                                </h3>
                                {o.variantColor && (
                                  <div className="text-xs text-muted-foreground">
                                    Varian Warna: <b>{o.variantColor}</b>
                                  </div>
                                )}
                                <div className="text-xs text-muted-foreground">
                                  Metode Bayar: <b>{o.paymentMethod || "QRIS"}</b>
                                </div>
                                <div className="text-xs font-bold text-primary pt-0.5">
                                  Harga: {rupiah(o.price)} + Ongkir {rupiah(o.ongkir)}
                                </div>
                              </div>
                            </div>

                            {/* Teks Grafir Tutup Box */}
                            <div className="rounded-2xl bg-muted/30 p-3.5 space-y-1 border border-border">
                              <div className="text-[10px] font-bold uppercase text-muted-foreground">
                                Teks Ukiran Laser di Tutup Box:
                              </div>
                              <div className="font-display text-sm font-bold text-primary">
                                "{o.customText}"
                              </div>
                            </div>

                            {/* Kartu Ucapan Wax */}
                            {o.card && (
                              <div className="rounded-2xl bg-muted/30 p-3.5 space-y-1 border border-border">
                                <div className="flex items-center justify-between text-[10px] font-bold uppercase text-muted-foreground">
                                  <span>Kartu Ucapan Wax Seal:</span>
                                  <span className="text-accent font-bold">✓ Disertakan</span>
                                </div>
                                <div className="text-xs italic text-foreground/80">
                                  "{o.cardMsg || "Pesan ucapan kado spesial"}"
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Right: 8 Foto Kenangan & Alamat Spesifik Kurir */}
                          <div className="space-y-4">
                            {/* 8 Uploaded Photos Grid */}
                            <div className="rounded-2xl border border-border bg-card p-3.5 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold uppercase text-muted-foreground">
                                  8 Foto Kenangan dalam Spinning Box:
                                </span>
                                <span className="text-[10px] text-muted-foreground">
                                  Klik foto untuk perbesar
                                </span>
                              </div>

                              <div className="grid grid-cols-4 gap-2">
                                {(o.photos && o.photos.length > 0 ? o.photos : default8Photos).map((photo, pIdx) => (
                                  <div
                                    key={pIdx}
                                    onClick={() => setZoomPhotoUrl(photo)}
                                    className="group relative aspect-square rounded-xl overflow-hidden border border-border bg-black cursor-pointer hover:border-primary transition"
                                    title={`Klik untuk perbesar Foto #${pIdx + 1}`}
                                  >
                                    <img
                                      src={photo}
                                      alt={`Foto #${pIdx + 1}`}
                                      className="h-full w-full object-cover group-hover:scale-105 transition"
                                    />
                                    <div className="absolute top-1 left-1 flex size-4 items-center justify-center rounded-full bg-black/80 text-[8px] font-bold text-white">
                                      {pIdx + 1}
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition">
                                      <Eye className="size-3.5" />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Alamat Pengiriman Spesifik & Patokan Kurir */}
                            <div className="rounded-2xl bg-muted/30 p-3.5 space-y-2 border border-border text-xs">
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold uppercase text-muted-foreground">
                                  Alamat Pengiriman & Kurir:
                                </span>
                                <span className="font-bold text-primary">
                                  {o.courier}
                                </span>
                              </div>

                              <div className="space-y-1">
                                <div className="font-bold text-foreground">
                                  {o.name} ({o.phone})
                                </div>
                                <div className="text-muted-foreground leading-relaxed">
                                  {o.street || o.address}
                                </div>
                                {o.subdistrict && o.district && (
                                  <div className="text-muted-foreground">
                                    Kel. {o.subdistrict}, Kec. {o.district}, {o.city}, {o.province} {o.postalCode}
                                  </div>
                                )}
                              </div>

                              {/* Highlighted Patokan Kurir (Biar kurir ga bingung) */}
                              <div className="rounded-xl border border-amber-300 bg-amber-50 p-2.5 text-xs text-amber-950 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-200">
                                <div className="font-bold flex items-center gap-1.5 mb-0.5">
                                  <MapPin className="size-3.5 text-amber-600" />
                                  <span>Patokan Kurir:</span>
                                </div>
                                <div className="text-[11px] font-semibold">
                                  {o.benchmark || "Pagar hitam kayu, seberang Indomaret Lowokwaru"}
                                </div>
                                {o.courierNote && (
                                  <div className="text-[10px] text-amber-800/80 dark:text-amber-300/80 mt-1">
                                    Catatan: {o.courierNote}
                                  </div>
                                )}
                              </div>

                              {/* Nomor Resi */}
                              <div className="flex items-center justify-between pt-1 border-t border-border">
                                <span className="text-muted-foreground">Nomor Resi:</span>
                                <span className="font-mono font-bold text-primary">
                                  {o.resi ? o.resi : "Sedang disiapkan workshop"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* CARD ACTION BUTTONS */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border">
                          {/* Toggle System Logs */}
                          <button
                            type="button"
                            onClick={() => toggleOrderLog(o.id)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold hover:bg-muted transition"
                          >
                            <FileText className="size-3.5 text-primary" />
                            <span>Riwayat Log Alur ({o.logs.length})</span>
                            {isLogsOpen ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
                          </button>

                          {/* Primary Context Actions */}
                          <div className="flex flex-wrap items-center gap-2">
                            {/* If Draft Proof Ready for Review */}
                            {isProofing && (
                              <button
                                onClick={() => setProofOrder(o)}
                                className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-soft hover:bg-indigo-700 transition"
                              >
                                <Eye className="size-3.5" />
                                <span>Review Draft Desain Digital</span>
                              </button>
                            )}

                            {/* If Waiting for Payment */}
                            {isPendingPay && (
                              <button
                                onClick={() => setPayOrder(o)}
                                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2 text-xs font-bold text-accent-foreground shadow-soft hover:opacity-95 transition"
                              >
                                <CreditCard className="size-3.5" />
                                <span>Bayar Sekarang ({rupiah(o.total)})</span>
                              </button>
                            )}

                            {/* If Shipped: Confirm Receipt */}
                            {isShipped && (
                              <button
                                onClick={() => handleMarkReceived(o.id)}
                                className="inline-flex items-center gap-1.5 rounded-full bg-wood px-5 py-2 text-xs font-bold text-primary-foreground shadow-soft hover:opacity-95 transition"
                              >
                                <CheckCheck className="size-3.5" />
                                <span>Konfirmasi Paket Diterima</span>
                              </button>
                            )}

                            {/* If Delivered: Give Review */}
                            {isDelivered && (
                              <button
                                onClick={() => {
                                  setReviewOrderId(o.id);
                                  setReviewProduct(o.product);
                                  setShowReviewModal(true);
                                }}
                                className="inline-flex items-center gap-1.5 rounded-full bg-wood px-5 py-2 text-xs font-bold text-primary-foreground shadow-xs hover:opacity-95 transition"
                              >
                                <Star className="size-3.5 fill-amber-300 text-amber-300" />
                                <span>Beri Ulasan Produk Ini ⭐</span>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* ACCORDION SYSTEM TIMELINE LOGS */}
                        {isLogsOpen && (
                          <div className="rounded-2xl border border-border bg-muted/20 p-4 space-y-3">
                            <div className="text-xs font-bold text-foreground">
                              Log Alur Proses Bisnis (#{o.id})
                            </div>
                            <div className="space-y-0 relative border-l-2 border-border ml-2 text-xs">
                              {o.logs.map((log, lIdx) => (
                                <div key={lIdx} className="relative pl-5 pb-3 last:pb-0">
                                  <span className="absolute -left-1.5 top-1 size-2.5 rounded-full bg-primary ring-2 ring-card" />
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-foreground">{log.time}</span>
                                    <span className="rounded bg-secondary px-1.5 py-0.2 text-[9px] font-bold text-primary">
                                      {log.lane}
                                    </span>
                                  </div>
                                  <p className="text-muted-foreground mt-0.5 leading-relaxed">{log.message}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* MODAL 1: REVIEW DRAFT DESAIN DIGITAL */}
      {proofOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto"
          onClick={() => setProofOrder(null)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl bg-card p-6 sm:p-7 shadow-2xl border border-border space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-muted-foreground">
                  Draft Ukiran Digital #{proofOrder.id}
                </span>
                <h3 className="font-display text-xl font-bold">
                  Review Pratinjau Desain Ukiran Kayu
                </h3>
              </div>
              <button
                onClick={() => setProofOrder(null)}
                className="flex size-7 items-center justify-center rounded-full hover:bg-muted font-bold"
              >
                ✕
              </button>
            </div>

            {/* High Quality Design Mockup Display */}
            <div className="overflow-hidden rounded-2xl border border-border shadow-soft bg-black aspect-video relative flex items-center justify-center">
              <img
                src={proofOrder.draftUrl || proofOrder.photoUrl || "/spinning-box-pine-premium.jpg"}
                alt="Draft Desain"
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-3 left-3 rounded-lg bg-card/90 px-3 py-1 text-xs font-bold shadow-xs">
                {proofOrder.product} · Mockup Ukir Laser Presisi
              </div>
            </div>

            <div className="rounded-2xl bg-muted/30 p-4 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Teks Grafir Ukiran:</span>
                <span className="font-bold text-primary">"{proofOrder.customText}"</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Model Box:</span>
                <span className="font-semibold">{proofOrder.product}</span>
              </div>
              {proofOrder.variantColor && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pilihan Warna:</span>
                  <span className="font-semibold">{proofOrder.variantColor}</span>
                </div>
              )}
            </div>

            {/* Actions for Design Proof Review */}
            <div className="space-y-3 pt-2 border-t border-border">
              <div className="rounded-xl bg-amber-50 p-3 text-xs text-amber-900 border border-amber-200 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-200">
                <b>Perhatian Pembeli:</b> Silakan periksa ejaan kata dan posisi nama sebelum kado mulai dipotong dan diukir laser di workshop Kayu Story.
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  onClick={() => handleApproveDraft(proofOrder.id)}
                  className="rounded-2xl bg-accent p-3.5 text-center text-xs font-bold text-accent-foreground shadow-xs hover:opacity-95 transition"
                >
                  ✓ Setujui Desain & Mulai Produksi
                </button>
                <button
                  onClick={() => setShowRevisionModal(!showRevisionModal)}
                  className="rounded-2xl border border-border bg-card p-3.5 text-center text-xs font-bold hover:bg-muted transition"
                >
                  Minta Perubahan / Revisi
                </button>
              </div>

              {showRevisionModal && (
                <div className="rounded-2xl border border-border bg-card p-4 space-y-3 shadow-soft">
                  <label className="block text-xs font-bold">
                    Tuliskan catatan revisi untuk tim desainer:
                  </label>
                  <textarea
                    value={revisionNote}
                    onChange={(e) => setRevisionNote(e.target.value)}
                    placeholder="Cth: Tolong ukuran font diperbesar sedikit, posisi nama dibuat rata tengah."
                    className="input min-h-20 text-xs"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowRevisionModal(false)}
                      className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold"
                    >
                      Batal
                    </button>
                    <button
                      onClick={() => handleSubmitRevision(proofOrder.id)}
                      disabled={!revisionNote.trim()}
                      className="rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground disabled:opacity-40"
                    >
                      Kirim Revisi ke Desainer
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: PEMBAYARAN INSTAN (QRIS / VA) */}
      {payOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4"
          onClick={() => setPayOrder(null)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-card p-6 sm:p-7 shadow-2xl border border-border space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-muted-foreground">
                  Tagihan Pesanan #{payOrder.id}
                </span>
                <h3 className="font-display text-lg font-bold">Pembayaran {payOrder.paymentMethod || "QRIS"}</h3>
              </div>
              <button
                onClick={() => setPayOrder(null)}
                className="flex size-7 items-center justify-center rounded-full hover:bg-muted font-bold"
              >
                ✕
              </button>
            </div>

            <div className="rounded-2xl border border-border bg-muted/20 p-5 text-center space-y-3">
              <div className="mx-auto size-36 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-border flex items-center justify-center">
                <div className="grid size-30 grid-cols-8 gap-0.5">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <span
                      key={i}
                      className={`rounded-xs ${
                        (i * 13 + 7) % 3 === 0 || (i >= 0 && i < 3) || (i >= 5 && i < 8)
                          ? "bg-black"
                          : "bg-transparent"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-primary">
                  {rupiah(payOrder.total)}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {payOrder.paymentMethod === "QRIS"
                    ? "Pindai kode QRIS menggunakan e-wallet atau mobile banking apa saja"
                    : `Transfer ke Virtual Account ${payOrder.paymentMethod}: 8809 1142 9901 2831`}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleConfirmPayment(payOrder.id)}
              className="w-full rounded-2xl bg-accent py-3.5 text-xs font-bold text-accent-foreground shadow-soft hover:opacity-95 transition flex items-center justify-center gap-2"
            >
              <Check className="size-4" />
              <span>Saya Sudah Membayar (Verifikasi Instan)</span>
            </button>
          </div>
        </div>
      )}

      {/* MODAL 3: ZOOM FOTO KENANGAN */}
      {zoomPhotoUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs p-4"
          onClick={() => setZoomPhotoUrl(null)}
        >
          <div
            className="relative max-w-lg w-full rounded-3xl overflow-hidden bg-card border border-border shadow-2xl p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomPhotoUrl(null)}
              className="absolute top-4 right-4 z-10 flex size-8 items-center justify-center rounded-full bg-black/60 text-white font-bold hover:bg-black/90"
            >
              ✕
            </button>
            <img
              src={zoomPhotoUrl}
              alt="Perbesar Foto"
              className="w-full h-auto rounded-2xl object-cover max-h-[75vh]"
            />
            <div className="p-3 text-center text-xs text-muted-foreground">
              Foto Kenangan yang Dirakit di dalam Spinning Box
            </div>
          </div>
        </div>
      )}

      {/* Review Form Modal */}
      {showReviewModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
          onClick={() => setShowReviewModal(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-card p-6 sm:p-7 shadow-2xl border border-border space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="font-display text-lg font-bold">Tulis Ulasan Produk</h3>
                <p className="text-xs text-muted-foreground">
                  Bagikan kepuasanmu terhadap hasil kado Kayu Story
                </p>
              </div>
              <button
                onClick={() => setShowReviewModal(false)}
                className="flex size-7 items-center justify-center rounded-full hover:bg-muted font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                  Produk yang Diulas:
                </label>
                <select
                  value={reviewProduct}
                  onChange={(e) => setReviewProduct(e.target.value)}
                  className="input text-xs font-semibold"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Star Rating Selector */}
              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-1.5">
                  Beri Rating Bintang:
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-1 transition hover:scale-115 focus:outline-hidden"
                    >
                      <Star
                        className={`size-6 transition ${
                          star <= reviewRating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-transparent text-muted-foreground/30"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-xs font-bold text-primary">
                    {reviewRating === 5
                      ? "Sangat Puas! (5/5)"
                      : reviewRating === 4
                      ? "Bagus (4/5)"
                      : "Cukup (3/5)"}
                  </span>
                </div>
              </div>

              {/* Review Comment */}
              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                  Ceritakan Pengalamanmu:
                </label>
                <textarea
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Ceritakan tentang kualitas kayu, hasil ukiran laser, lampu LED, atau respon orang yang menerima kado ini..."
                  className="input min-h-24 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="rounded-full border border-border px-4 py-2 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={!reviewComment.trim()}
                  className="rounded-full bg-wood px-6 py-2 text-xs font-bold text-primary-foreground shadow-soft disabled:opacity-40"
                >
                  Kirim Ulasan Saya
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4 Variant Lineup Modal */}
      {showLineupModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4"
          onClick={() => setShowLineupModal(false)}
        >
          <div
            className="w-full max-w-3xl rounded-3xl bg-card p-6 shadow-2xl border border-border space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="font-display text-lg font-bold">
                  Perbandingan 4 Varian Warna Spinning Box
                </h3>
                <p className="text-xs text-muted-foreground">
                  Foto asli studio: Pine Wood, Brown Oak, Frosty White Oak, Walnut Supreme
                </p>
              </div>
              <button
                onClick={() => setShowLineupModal(false)}
                className="flex size-7 items-center justify-center rounded-full hover:bg-muted font-bold"
              >
                ✕
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-border">
              <img
                src="/spinning-box-lineup.jpg"
                alt="Perbandingan 4 Varian Warna Spinning Box"
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-center">
              <div className="rounded-xl bg-muted p-2.5">
                <div className="font-bold text-primary">Pine Wood</div>
                <div className="text-[10px] text-muted-foreground">100% Kayu Pinus Solid</div>
              </div>
              <div className="rounded-xl bg-muted p-2.5">
                <div className="font-bold">Brown Oak</div>
                <div className="text-[10px] text-muted-foreground">Serat Kayu Cokelat</div>
              </div>
              <div className="rounded-xl bg-muted p-2.5">
                <div className="font-bold">Frosty White Oak</div>
                <div className="text-[10px] text-muted-foreground">Putih Abu Minimalis</div>
              </div>
              <div className="rounded-xl bg-muted p-2.5">
                <div className="font-bold">Walnut Supreme</div>
                <div className="text-[10px] text-muted-foreground">Hitam Espresso Mewah</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-border bg-card py-6 text-center text-xs text-muted-foreground">
        © 2026 Kayu Story · Every Wood Tells a Story
      </footer>
    </div>
  );
}
