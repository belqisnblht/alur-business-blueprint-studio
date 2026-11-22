import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
const defaultProductPhoto = "/spinning-box-pine-premium.jpg";
import {
  getStoredOrders,
  saveOrders,
  resetDefaultData,
  rupiah,
  statuses,
  getCurrentUser,
  logoutUser,
  type Status,
  type KSGOrder,
  type UserSession,
} from "@/lib/ksg-data";
import {
  BarChart3,
  Package,
  Palette,
  Hammer,
  Truck,
  DollarSign,
  Search,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  HardDrive,
  LogOut,
  ExternalLink,
  Sparkles,
  RotateCcw,
  Clock,
  Eye,
  Check,
  ShieldCheck,
  ChevronRight,
  Filter,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Sistem Manajemen Toko — Kayu Story Gift" },
      {
        name: "description",
        content:
          "Panel ERP manajemen operasional internal Kayu Story Gift: pesanan, studio desain grafis, workshop produksi, ekspedisi & keuangan.",
      },
    ],
  }),
  component: AdminPage,
});

type AdminModule =
  | "overview"
  | "orders"
  | "design"
  | "production"
  | "shipping"
  | "finance";

const statusTones: Record<Status, string> = {
  "Menunggu Bayar": "bg-amber-100 text-amber-900 border border-amber-300",
  Kedaluwarsa: "bg-destructive/15 text-destructive border border-destructive/30",
  Lunas: "bg-blue-100 text-blue-900 border border-blue-300",
  Desain: "bg-purple-100 text-purple-900 border border-purple-300",
  "Review Draft": "bg-indigo-100 text-indigo-900 border border-indigo-300",
  "Revisi Diminta": "bg-rose-100 text-rose-900 border border-rose-300",
  "Desain Disetujui": "bg-emerald-100 text-emerald-900 border border-emerald-300",
  Produksi: "bg-amber-100 text-amber-950 border border-amber-400",
  Packing: "bg-orange-100 text-orange-950 border border-orange-300",
  Dikirim: "bg-cyan-100 text-cyan-900 border border-cyan-300",
  Diterima: "bg-accent text-accent-foreground",
};

export function AdminPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [activeModule, setActiveModule] = useState<AdminModule>("overview");
  const [orders, setOrders] = useState<KSGOrder[]>([]);
  const [statusFilter, setStatusFilter] = useState<Status | "Semua">("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
    setOrders(getStoredOrders());

    const handleOrders = (e: any) => setOrders(e.detail || getStoredOrders());
    const handleAuth = (e: any) => setCurrentUser(e.detail || getCurrentUser());

    window.addEventListener("ksg_orders_updated", handleOrders);
    window.addEventListener("ksg_auth_updated", handleAuth);
    return () => {
      window.removeEventListener("ksg_orders_updated", handleOrders);
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

  // Helper to mutate order and append log
  const mutateOrder = (
    id: string,
    patch: Partial<KSGOrder>,
    logMessage: string,
    lane: KSGOrder["logs"][0]["lane"]
  ) => {
    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes() < 10 ? "0" : ""}${now.getMinutes()}`;
    const nextOrders = orders.map((o) => {
      if (o.id === id) {
        return {
          ...o,
          ...patch,
          logs: [
            ...o.logs,
            {
              time: `Hari ini ${timeStr}`,
              lane,
              message: logMessage,
            },
          ],
        };
      }
      return o;
    });
    setOrders(nextOrders);
    saveOrders(nextOrders);
  };

  const selectedOrder = orders.find((o) => o.id === selectedOrderId);
  const paidOrders = orders.filter(
    (o) => o.status !== "Menunggu Bayar" && o.status !== "Kedaluwarsa"
  );
  const totalOmset = paidOrders.reduce((sum, o) => sum + o.total, 0);
  const totalHppKayu = paidOrders.length * 55000;
  const totalOngkir = paidOrders.reduce((sum, o) => sum + o.ongkir, 0);
  const labaBersih = totalOmset - totalHppKayu - totalOngkir;

  return (
    <div className="flex min-h-screen bg-background font-sans text-foreground">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-2xl bg-foreground px-4 py-3 text-xs font-bold text-background shadow-soft">
          <Sparkles className="size-4 text-amber-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Internal Management Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col bg-sidebar p-5 text-sidebar-foreground md:flex">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-sidebar-primary text-sm font-bold text-sidebar-primary-foreground shadow-xs">
            KSG
          </span>
          <div>
            <div className="font-display text-base font-bold text-sidebar-primary leading-tight">
              Kayu Story Gift
            </div>
            <div className="text-[10px] text-sidebar-foreground/70">
              Sistem Manajemen Toko
            </div>
          </div>
        </div>

        {/* Navigation Modules */}
        <nav className="mt-8 space-y-1.5 flex-1">
          {[
            { id: "overview", label: "Dashboard Penjualan", icon: BarChart3 },
            { id: "orders", label: "Manajemen Pesanan", icon: Package },
            { id: "design", label: "Studio Desain Grafis", icon: Palette },
            { id: "production", label: "Workshop Produksi", icon: Hammer },
            { id: "shipping", label: "Pengiriman & Resi", icon: Truck },
            { id: "finance", label: "Laporan Keuangan", icon: DollarSign },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveModule(m.id as AdminModule)}
              className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold transition ${
                activeModule === m.id
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-xs"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent"
              }`}
            >
              <m.icon className="size-4" />
              <span>{m.label}</span>
            </button>
          ))}
        </nav>

        {/* Integration Status Footer */}
        <div className="mt-auto space-y-3 pt-4 border-t border-sidebar-border text-xs">
          <div className="rounded-xl bg-sidebar-accent p-3 space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between font-bold text-sidebar-primary">
              <span>Status Integrasi:</span>
              <span className="size-2 rounded-full bg-accent animate-pulse" />
            </div>
            <div className="flex items-center justify-between text-sidebar-foreground/80">
              <span>Google Sheets:</span>
              <span className="text-accent font-semibold">Tersinkron</span>
            </div>
            <div className="flex items-center justify-between text-sidebar-foreground/80">
              <span>Google Drive:</span>
              <span className="text-accent font-semibold">Aktif</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-sidebar-foreground">
                {currentUser?.name || "Admin Operasional"}
              </span>
              <span className="text-[10px] text-sidebar-foreground/60">Staff Toko</span>
            </div>

            <button
              onClick={handleLogout}
              title="Keluar dari Panel Admin"
              className="flex size-8 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-foreground/80 hover:bg-destructive/20 hover:text-destructive transition"
            >
              <LogOut className="size-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Administrative Workplace */}
      <main className="flex-1 overflow-x-hidden flex flex-col">
        {/* Top Header */}
        <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <div>
            <h1 className="font-display text-xl font-bold capitalize">
              {activeModule === "overview"
                ? "Dashboard Penjualan & Alur Kerja"
                : activeModule === "orders"
                ? "Semua Pesanan Kado Kayu"
                : activeModule === "design"
                ? "Studio Desain Grafis (Draft & Revisi)"
                : activeModule === "production"
                ? "Workshop Produksi & Pengemasan"
                : activeModule === "shipping"
                ? "Pengiriman & Ekspedisi Kurir"
                : "Laporan Keuangan & Arus Kas"}
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Portal operasional internal Kayu Story Gift
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const reset = resetDefaultData();
                setOrders(reset);
                showToast("Data pesanan berhasil di-refresh!");
              }}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted"
            >
              <RotateCcw className="size-3" /> Muat Ulang Data
            </button>
          </div>
        </header>

        {/* Mobile Tabs */}
        <div className="flex gap-2 overflow-x-auto border-b border-border bg-card px-4 py-2 md:hidden">
          {[
            { id: "overview", label: "Dashboard" },
            { id: "orders", label: "Pesanan" },
            { id: "design", label: "Desain" },
            { id: "production", label: "Produksi" },
            { id: "shipping", label: "Pengiriman" },
            { id: "finance", label: "Keuangan" },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveModule(m.id as AdminModule)}
              className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ${
                activeModule === m.id
                  ? "bg-wood text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1">
          {/* MODULE: OVERVIEW */}
          {activeModule === "overview" && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <div className="text-xs font-bold uppercase text-muted-foreground">
                    Total Pesanan
                  </div>
                  <div className="mt-1 font-display text-2xl font-bold">{orders.length}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    {orders.filter((o) => o.status === "Menunggu Bayar").length} menunggu bayar
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <div className="text-xs font-bold uppercase text-muted-foreground">
                    Total Omset Penjualan
                  </div>
                  <div className="mt-1 font-display text-2xl font-bold text-primary">
                    {rupiah(totalOmset)}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    Tersinkron ke Google Sheets
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <div className="text-xs font-bold uppercase text-muted-foreground">
                    Antrean Desain Grafis
                  </div>
                  <div className="mt-1 font-display text-2xl font-bold text-purple-700">
                    {orders.filter((o) => ["Lunas", "Desain", "Revisi Diminta"].includes(o.status)).length}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    Perlu upload / revisi draft
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <div className="text-xs font-bold uppercase text-muted-foreground">
                    Antrean Workshop Produksi
                  </div>
                  <div className="mt-1 font-display text-2xl font-bold text-amber-700">
                    {orders.filter((o) => ["Desain Disetujui", "Produksi", "Packing"].includes(o.status)).length}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    Siap ukir laser & packing
                  </div>
                </div>
              </div>

              {/* Order Flow Funnel */}
              <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                <h3 className="font-display text-base font-bold">
                  Status Alur Pemesanan Aktif
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Klik status untuk membuka daftar pesanan terkait:
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                  {statuses.map((s) => {
                    const count = orders.filter((o) => o.status === s).length;
                    return (
                      <button
                        key={s}
                        onClick={() => {
                          setStatusFilter(s);
                          setActiveModule("orders");
                        }}
                        className="flex items-center justify-between rounded-xl border border-border bg-secondary/30 p-3 text-left transition hover:bg-secondary"
                      >
                        <span className="text-xs font-bold text-foreground">{s}</span>
                        <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* MODULE: ALL ORDERS */}
          {activeModule === "orders" && (
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-base font-bold">Semua Pesanan Masuk</h3>
                  <p className="text-xs text-muted-foreground">
                    Data transaksi otomatis tersinkron ke Google Sheets & folder Drive
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 size-3.5 text-muted-foreground" />
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari kode atau nama..."
                      className="input pl-8 py-1.5 text-xs w-48"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-semibold"
                  >
                    <option value="Semua">Semua Status ({orders.length})</option>
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s} ({orders.filter((o) => o.status === s).length})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead className="bg-muted text-[11px] uppercase text-muted-foreground font-semibold">
                    <tr>
                      <th className="p-3">Kode KSG</th>
                      <th className="p-3">Pelanggan</th>
                      <th className="p-3">Kado & Teks Ukiran</th>
                      <th className="p-3">Total Biaya</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">No. Resi</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {orders
                      .filter(
                        (o) =>
                          (statusFilter === "Semua" || o.status === statusFilter) &&
                          (o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            o.name.toLowerCase().includes(searchQuery.toLowerCase()))
                      )
                      .map((o) => (
                        <tr key={o.id} className="hover:bg-muted/40 transition">
                          <td className="p-3 font-bold">{o.id}</td>
                          <td className="p-3">
                            <div className="font-semibold">{o.name}</div>
                            <div className="text-[11px] text-muted-foreground">{o.phone}</div>
                          </td>
                          <td className="p-3">
                            <div className="font-semibold">{o.product}</div>
                            <div className="text-[11px] text-primary truncate max-w-[180px]">
                              "{o.customText}"
                            </div>
                          </td>
                          <td className="p-3 font-semibold">{rupiah(o.total)}</td>
                          <td className="p-3">
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${statusTones[o.status]}`}
                            >
                              {o.status}
                            </span>
                          </td>
                          <td className="p-3 font-mono">
                            {o.resi ? (
                              <span className="font-bold text-accent">{o.resi}</span>
                            ) : (
                              <span className="text-muted-foreground text-[11px]">Belum terbit</span>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => setSelectedOrderId(o.id)}
                              className="rounded-lg bg-secondary px-3 py-1 font-semibold text-primary hover:bg-muted"
                            >
                              Detail →
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MODULE: DESIGN STUDIO */}
          {activeModule === "design" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-base font-bold">Studio Desain Grafis</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Pesanan lunas yang membutuhkan pembuatan mockup ukiran laser dan persetujuan pelanggan.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {orders
                  .filter((o) =>
                    ["Lunas", "Desain", "Review Draft", "Revisi Diminta"].includes(o.status)
                  )
                  .map((o) => (
                    <div
                      key={o.id}
                      className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative aspect-video bg-black/5">
                          <img
                            src={o.draftUrl || o.photoUrl || defaultProductPhoto}
                            alt="Foto"
                            className="h-full w-full object-cover"
                          />
                          <span
                            className={`absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${statusTones[o.status]}`}
                          >
                            {o.status}
                          </span>
                        </div>

                        <div className="p-4 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-sm">#{o.id}</span>
                            <span className="text-[11px] text-muted-foreground">{o.date}</span>
                          </div>
                          <div className="text-xs font-semibold">{o.name} · {o.product}</div>
                          <div className="text-xs text-primary font-bold">
                            Teks: "{o.customText}"
                          </div>
                          <div className="text-[11px] text-muted-foreground">
                            📁 File Google Drive: {o.driveFolder}
                          </div>

                          {o.revisionNotes && o.revisionNotes.length > 0 && (
                            <div className="rounded-xl bg-rose-50 p-2.5 text-[11px] text-rose-900 border border-rose-200 mt-2">
                              <b>Catatan Revisi Pelanggan:</b> "{o.revisionNotes[o.revisionNotes.length - 1]}"
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="p-4 pt-0 space-y-2 border-t border-border/60">
                        {o.status === "Lunas" && (
                          <button
                            onClick={() => {
                              mutateOrder(
                                o.id,
                                { status: "Desain" },
                                "Desainer mulai mengerjakan layout mockup ukir kayu.",
                                "Tim Grafis"
                              );
                              showToast(`Mulai mendesain #${o.id}`);
                            }}
                            className="w-full rounded-xl bg-purple-600 py-2 text-xs font-bold text-white hover:bg-purple-700 shadow-xs"
                          >
                            Mulai Buat Draft Desain
                          </button>
                        )}

                        {o.status === "Desain" && (
                          <button
                            onClick={() => {
                              mutateOrder(
                                o.id,
                                { status: "Review Draft", draftUrl: o.photoUrl },
                                "Draft desain selesai & diunggah ke halaman pelanggan untuk ditinjau.",
                                "Tim Grafis"
                              );
                              showToast(`Draft #${o.id} berhasil diunggah ke pelanggan!`);
                            }}
                            className="w-full rounded-xl bg-wood py-2 text-xs font-bold text-primary-foreground shadow-xs"
                          >
                            Unggah Draft ke Pelanggan →
                          </button>
                        )}

                        {o.status === "Revisi Diminta" && (
                          <button
                            onClick={() => {
                              mutateOrder(
                                o.id,
                                { status: "Review Draft" },
                                "Revisi desain selesai diperbaiki & dikirim ulang ke pelanggan.",
                                "Tim Grafis"
                              );
                              showToast(`Revisi #${o.id} berhasil diunggah ulang!`);
                            }}
                            className="w-full rounded-xl bg-rose-600 py-2 text-xs font-bold text-white hover:bg-rose-700 shadow-xs"
                          >
                            Kirim Ulang Hasil Revisi →
                          </button>
                        )}

                        {o.status === "Review Draft" && (
                          <div className="rounded-lg bg-muted p-2 text-center text-[11px] text-muted-foreground">
                            Menunggu persetujuan pelanggan di portal...
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* MODULE: PRODUCTION WORKSHOP */}
          {activeModule === "production" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-base font-bold">Workshop Produksi & Pengemasan</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Pesanan yang telah disetujui desainnya oleh pelanggan, siap dipotong, diukir laser, dan dikemas.
                </p>
              </div>

              <div className="space-y-4">
                {orders
                  .filter((o) =>
                    ["Desain Disetujui", "Produksi", "Packing"].includes(o.status)
                  )
                  .map((o) => (
                    <div
                      key={o.id}
                      className="rounded-2xl border border-border bg-card p-5 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-display font-bold text-base">#{o.id}</span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${statusTones[o.status]}`}
                          >
                            {o.status}
                          </span>
                          {o.card && (
                            <span className="rounded bg-secondary px-2 py-0.5 text-[10px] font-bold text-primary">
                              💌 Ada Kartu Ucapan
                            </span>
                          )}
                        </div>
                        <div className="text-xs font-semibold">
                          {o.name} · {o.product} ({o.moment})
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Alamat Kirim: {o.address} ({o.courier})
                        </div>
                        {o.card && o.cardMsg && (
                          <div className="text-[11px] text-primary italic">
                            Ucapan: "{o.cardMsg}"
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {o.status === "Desain Disetujui" && (
                          <button
                            onClick={() => {
                              mutateOrder(
                                o.id,
                                { status: "Produksi" },
                                "Mulai proses ukir laser kayu pinus di workshop.",
                                "Produksi & Packing"
                              );
                              showToast(`Produksi kayu #${o.id} dimulai`);
                            }}
                            className="rounded-xl bg-wood px-4 py-2 text-xs font-bold text-primary-foreground shadow-xs"
                          >
                            Mulai Ukir Laser Kayu
                          </button>
                        )}

                        {o.status === "Produksi" && (
                          <button
                            onClick={() => {
                              mutateOrder(
                                o.id,
                                { status: "Packing" },
                                "Produksi selesai. Paket sedang dibungkus bubble wrap & kartu ucapan.",
                                "Produksi & Packing"
                              );
                              showToast(`Lanjut packing #${o.id}`);
                            }}
                            className="rounded-xl bg-orange-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-orange-700"
                          >
                            Produksi Selesai → Packing
                          </button>
                        )}

                        {o.status === "Packing" && (
                          <button
                            onClick={() => {
                              setSelectedOrderId(o.id);
                              setActiveModule("shipping");
                              showToast(`Paket #${o.id} siap kirim. Silakan masukkan resi kurir.`);
                            }}
                            className="rounded-xl bg-accent px-4 py-2 text-xs font-bold text-accent-foreground shadow-xs"
                          >
                            Siap Kirim & Input Resi →
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* MODULE: SHIPPING */}
          {activeModule === "shipping" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-base font-bold">Pengiriman & Resi Ekspedisi</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Input nomor resi kurir (JNE / J&T / SiCepat) untuk paket yang telah diserahkan ke kurir.
                </p>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-4">
                <div className="overflow-x-auto text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-muted text-[11px] uppercase text-muted-foreground font-semibold">
                      <tr>
                        <th className="p-3">Kode</th>
                        <th className="p-3">Penerima & Alamat</th>
                        <th className="p-3">Kurir</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Nomor Resi</th>
                        <th className="p-3 text-right">Kelola Resi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {orders
                        .filter((o) =>
                          ["Packing", "Dikirim", "Diterima"].includes(o.status)
                        )
                        .map((o) => (
                          <tr key={o.id} className="hover:bg-muted/40 transition">
                            <td className="p-3 font-bold">{o.id}</td>
                            <td className="p-3">
                              <div className="font-semibold">{o.name}</div>
                              <div className="text-[11px] text-muted-foreground truncate max-w-[200px]">
                                {o.address}
                              </div>
                            </td>
                            <td className="p-3 font-semibold">{o.courier}</td>
                            <td className="p-3">
                              <span
                                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${statusTones[o.status]}`}
                              >
                                {o.status}
                              </span>
                            </td>
                            <td className="p-3 font-mono">
                              {o.resi ? (
                                <span className="font-bold text-accent">{o.resi}</span>
                              ) : (
                                <span className="text-rose-600 font-semibold text-[11px]">
                                  Perlu Input Resi
                                </span>
                              )}
                            </td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => setSelectedOrderId(o.id)}
                                className="rounded-lg bg-wood px-3 py-1 text-xs font-bold text-primary-foreground shadow-xs"
                              >
                                {o.resi ? "Ubah Resi" : "Input Resi"}
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* MODULE: FINANCE */}
          {activeModule === "finance" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-base font-bold">Laporan Keuangan & Mutasi</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Rekap omset penjualan, biaya bahan baku, ongkir ekspedisi, dan laba bersih.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <div className="text-xs font-bold uppercase text-muted-foreground">
                    Total Pemasukan (Omset)
                  </div>
                  <div className="mt-1 font-display text-2xl font-bold text-accent">
                    +{rupiah(totalOmset)}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    {paidOrders.length} transaksi pembayaran lunas
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <div className="text-xs font-bold uppercase text-muted-foreground">
                    Biaya Bahan Baku & Ongkir
                  </div>
                  <div className="mt-1 font-display text-2xl font-bold text-destructive">
                    -{rupiah(totalHppKayu + totalOngkir)}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    Kayu pinus solid, laser & kurir
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <div className="text-xs font-bold uppercase text-muted-foreground">
                    Laba Bersih Real-time
                  </div>
                  <div className="mt-1 font-display text-2xl font-bold text-primary">
                    {rupiah(labaBersih)}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    Tersinkron otomatis ke Google Sheets
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Order Detail & Resi Modal Drawer */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs"
          onClick={() => setSelectedOrderId(null)}
        >
          <div
            className="h-full w-full max-w-lg overflow-y-auto bg-card p-6 shadow-soft"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h3 className="font-display text-xl font-bold">#{selectedOrder.id}</h3>
                <span
                  className={`inline-block mt-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${statusTones[selectedOrder.status]}`}
                >
                  {selectedOrder.status}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrderId(null)}
                className="flex size-8 items-center justify-center rounded-full hover:bg-muted font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 space-y-5 text-xs">
              {/* Product Image */}
              <div className="overflow-hidden rounded-2xl border border-border">
                <img
                  src={selectedOrder.draftUrl || selectedOrder.photoUrl || defaultProductPhoto}
                  alt="Pesanan"
                  className="aspect-video w-full object-cover"
                />
              </div>

              {/* Order Info */}
              <div className="rounded-2xl bg-muted/40 p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pelanggan:</span>
                  <span className="font-bold">{selectedOrder.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">WhatsApp:</span>
                  <span className="font-mono">{selectedOrder.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Alamat:</span>
                  <span className="font-medium text-right max-w-[200px]">{selectedOrder.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Kado:</span>
                  <span className="font-semibold">{selectedOrder.product}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Teks Ukiran:</span>
                  <span className="font-bold text-primary">"{selectedOrder.customText}"</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Tagihan:</span>
                  <span className="font-bold text-primary">{rupiah(selectedOrder.total)}</span>
                </div>
              </div>

              {/* Form Input Resi */}
              <div className="rounded-2xl border border-border p-4 space-y-3 bg-secondary/30">
                <div className="font-bold text-sm flex items-center gap-1.5">
                  <Truck className="size-4 text-primary" /> Input / Perbarui Nomor Resi Kurir
                </div>

                <div className="flex gap-2">
                  <input
                    defaultValue={selectedOrder.resi || ""}
                    placeholder="Cth: JNE88291038"
                    id="modal-resi-input"
                    className="input py-2 text-xs font-mono font-bold uppercase"
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById("modal-resi-input") as HTMLInputElement;
                      if (input && input.value.trim()) {
                        mutateOrder(
                          selectedOrder.id,
                          { resi: input.value.trim(), status: "Dikirim" },
                          `Nomor resi ${input.value.trim()} diinput oleh staff. Paket diserahkan ke ${selectedOrder.courier}.`,
                          "Admin & Keuangan"
                        );
                        showToast(`Resi ${input.value.trim()} disimpan! Status: Dikirim`);
                        setSelectedOrderId(null);
                      }
                    }}
                    className="rounded-xl bg-wood px-4 py-2 text-xs font-bold text-primary-foreground shadow-xs"
                  >
                    Simpan Resi
                  </button>
                </div>
              </div>

              {/* Timeline Logs */}
              <div>
                <div className="font-bold mb-3">Riwayat Log Pesanan</div>
                <div className="space-y-0 relative border-l-2 border-border ml-2">
                  {selectedOrder.logs.map((log, i) => (
                    <div key={i} className="relative pl-5 pb-3 last:pb-0">
                      <span className="absolute -left-1.5 top-1 size-2.5 rounded-full bg-primary ring-2 ring-card" />
                      <div className="font-bold text-[11px]">{log.time}</div>
                      <p className="text-muted-foreground mt-0.5">{log.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
