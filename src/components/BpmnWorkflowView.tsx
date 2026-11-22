import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  ExternalLink,
  Layers,
  Sparkles,
  Maximize2,
  ZoomIn,
} from "lucide-react";

export interface BpmnStepDetail {
  id: string;
  name: string;
  lane: "Pelanggan" | "Sistem Website" | "Admin & Keuangan" | "Tim Grafis" | "Produksi & Packing";
  type: "start" | "task" | "gateway" | "catch" | "end";
  input: string;
  process: string;
  output: string;
  description: string;
  tryRoute?: "/toko" | "/admin";
  tryParam?: string;
}

export const bpmnSteps: BpmnStepDetail[] = [
  // Pelanggan
  {
    id: "p1",
    name: "Butuh produk custom",
    lane: "Pelanggan",
    type: "start",
    input: "Kebutuhan hadiah personal (anniversary, wisuda, ultah)",
    process: "Calon pembeli mencari inspirasi kado kayu personal di media sosial",
    output: "Menemukan profil IG/TikTok Kayu Story Gift",
    description: "Titik mula perjalanan pelanggan saat mencari kado kayu ukir personal.",
    tryRoute: "/toko",
  },
  {
    id: "p2",
    name: "Buka website dari IG/TikTok",
    lane: "Pelanggan",
    type: "task",
    input: "Klik link bio di profil @kayustorygift",
    process: "Browser memuat landing page toko pemesanan kado kayu terintegrasi",
    output: "Katalog produk & form kustomisasi",
    description: "Pelanggan langsung bertransaksi di website tanpa harus dialihkan ke chat WA.",
    tryRoute: "/toko",
  },
  {
    id: "p3",
    name: "Pilih produk & isi kustomisasi",
    lane: "Pelanggan",
    type: "task",
    input: "Pilihan produk kayu, momen, teks ukiran kustom",
    process: "Memilih varian kado kayu, mengetikkan teks kenangan, dan melihat preview langsung",
    output: "Data konfigurasi produk",
    description: "Pelanggan memilih jenis kayu dan mengetikkan kata-kata ukiran dengan pratinjau real-time.",
    tryRoute: "/toko",
  },
  {
    id: "p4",
    name: "Unggah foto & cek ongkir otomatis",
    lane: "Pelanggan",
    type: "task",
    input: "File foto pelanggan (JPG/PNG), alamat tujuan",
    process: "Upload foto ke sistem, sistem mengkalkulasi ongkos kirim otomatis",
    output: "Pesanan siap bayar dengan total biaya akurat",
    description: "Pelanggan mengunggah foto kenangan dan memilih kurir ekspedisi dengan tarif otomatis.",
    tryRoute: "/toko",
  },
  {
    id: "p5",
    name: "Bayar via QRIS/VA",
    lane: "Pelanggan",
    type: "task",
    input: "Instruksi bayar (QR code QRIS atau nomor VA)",
    process: "Pelanggan memindai QRIS di aplikasi mobile banking / e-wallet atau bayar via VA",
    output: "Pembayaran terkirim ke payment gateway",
    description: "Pembayaran lunas di muka tanpa perlu kirim bukti transfer secara manual.",
    tryRoute: "/toko",
  },
  {
    id: "p6",
    name: "Review draft desain",
    lane: "Pelanggan",
    type: "task",
    input: "Notifikasi draft siap & gambar pratinjau draft dari Tim Grafis",
    process: "Pelanggan mengecek kesesuaian layout ukiran teks dan foto",
    output: "Keputusan: Sesuai (Ya) atau Tidak Sesuai (Revisi)",
    description: "Pelanggan melihat hasil rancangan ukiran kayu sebelum masuk proses fisik laser/kayu.",
    tryRoute: "/toko",
  },
  {
    id: "p7",
    name: "Sesuai desain? (Gateway)",
    lane: "Pelanggan",
    type: "gateway",
    input: "Pertimbangan pelanggan terhadap draft",
    process: "Percabangan keputusan pelanggan (Ya = Setujui, Tidak = Ajukan Revisi)",
    output: "Jika Ya -> Setujui desain; Jika Tidak -> Ajukan revisi",
    description: "Titik keputusan pelanggan untuk memastikan hasil akhir memuaskan dan bebas salah ukir.",
    tryRoute: "/toko",
  },
  {
    id: "p8",
    name: "Ajukan revisi",
    lane: "Pelanggan",
    type: "task",
    input: "Catatan koreksi (posisi foto, font, ejaan teks)",
    process: "Pelanggan mengetikkan instruksi perubahan di sistem",
    output: "Status pesanan berubah 'Revisi Diminta' & notifikasi ke Tim Grafis",
    description: "Mengajukan poin perbaikan yang langsung masuk ke dashboard Tim Grafis.",
    tryRoute: "/toko",
  },
  {
    id: "p9",
    name: "Setujui desain",
    lane: "Pelanggan",
    type: "task",
    input: "Klik tombol 'Setujui Desain'",
    process: "Sistem menandai desain disetujui (Approved) & mengirimkan ke antrean Produksi",
    output: "Status pesanan berubah 'Desain Disetujui'",
    description: "Persetujuan final dari pelanggan agar tim produksi dapat memotong dan mengukir kayu.",
    tryRoute: "/toko",
  },
  {
    id: "p10",
    name: "Lacak resi",
    lane: "Pelanggan",
    type: "task",
    input: "Nomor resi ekspedisi (JNE/J&T) yang diinput Admin",
    process: "Pelanggan melihat status kurir dan tracking perjalanan paket",
    output: "Info perjalanan paket real-time",
    description: "Pelanggan dapat melacak posisi kiriman paket kado hingga tiba di rumah.",
    tryRoute: "/toko",
  },
  {
    id: "p11",
    name: "Pesanan diterima",
    lane: "Pelanggan",
    type: "end",
    input: "Paket kado kayu sampai di alamat tujuan",
    process: "Pelanggan menerima paket dan mengonfirmasi pesanan selesai",
    output: "Status akhir 'Diterima' (Transaksi Selesai)",
    description: "Titik akhir perjalanan pemesanan: kado kayu siap diberikan kepada orang tercinta.",
    tryRoute: "/toko",
  },

  // Sistem Website
  {
    id: "s1",
    name: "Pesanan kustom masuk",
    lane: "Sistem Website",
    type: "catch",
    input: "Payload formulir kustomisasi dari browser pelanggan",
    process: "Sistem menerima data formulir & file foto yang diunggah",
    output: "Entri pesanan sementara",
    description: "Sistem mendeteksi adanya formulir kustomisasi baru yang dikirim pelanggan.",
    tryRoute: "/admin",
  },
  {
    id: "s2",
    name: "Hitung harga + ongkir",
    lane: "Sistem Website",
    type: "task",
    input: "Harga produk + add-on kartu + tarif API kurir ekspedisi",
    process: "Kalkulasi otomatis total biaya secara akurat",
    output: "Nominal tagihan pembayaran unik",
    description: "Perhitungan otomatis tanpa perlu admin mengecek ongkir manual di aplikasi kurir.",
    tryRoute: "/toko",
  },
  {
    id: "s3",
    name: "Buat kode pesanan unik",
    lane: "Sistem Website",
    type: "task",
    input: "Urutan transaksi (auto-increment sequence)",
    process: "Menghasilkan kode unik seperti 'KSG-0143' yang mengikat seluruh file dan baris data",
    output: "ID Pesanan Unik KSG-XXXX",
    description: "Mencegah foto dan detail kado tertukar antar pelanggan.",
    tryRoute: "/admin",
  },
  {
    id: "s4",
    name: "Pembayaran masuk",
    lane: "Sistem Website",
    type: "catch",
    input: "Webhook callback dari Payment Gateway",
    process: "Sistem menerima notifikasi pembayaran dari QRIS/Bank",
    output: "Data transaksi dana masuk",
    description: "Event tangkapan saat dana berhasil dikirimkan pelanggan.",
    tryRoute: "/admin",
  },
  {
    id: "s5",
    name: "Verifikasi pembayaran otomatis",
    lane: "Sistem Website",
    type: "task",
    input: "Nominal pembayaran & status gateway",
    process: "Mencocokkan jumlah bayar dengan tagihan pesanan secara otomatis",
    output: "Status valid atau tidak valid",
    description: "Menghilangkan beban tim keuangan memeriksa mutasi bank satu per satu secara manual.",
    tryRoute: "/admin",
  },
  {
    id: "s6",
    name: "Pembayaran valid? (Gateway)",
    lane: "Sistem Website",
    type: "gateway",
    input: "Hasil verifikasi sistem",
    process: "Jika valid -> lanjut pemrosesan; Jika tidak valid / timeout -> kedaluwarsa",
    output: "Cabang status (Lunas atau Kedaluwarsa)",
    description: "Decision gateway penentu kelanjutan proses pesanan.",
    tryRoute: "/admin",
  },
  {
    id: "s7",
    name: "Pesanan kedaluwarsa",
    lane: "Sistem Website",
    type: "end",
    input: "Waktu pembayaran melewati batas (misal 15 menit) atau gagal",
    process: "Sistem membatalkan pesanan dan mengosongkan antrean",
    output: "Status 'Kedaluwarsa'",
    description: "Pesanan dibatalkan otomatis jika pelanggan tidak menyelesaikan pembayaran tepat waktu.",
    tryRoute: "/admin",
  },
  {
    id: "s8",
    name: "Simpan foto ke folder Drive pesanan",
    lane: "Sistem Website",
    type: "task",
    input: "File foto unggahan pelanggan",
    process: "Google Drive API otomatis membuat folder /KSG-XXXX/ dan mengunggah foto ke dalamnya",
    output: "Link folder Drive terhubung di pesanan",
    description: "Otomatisasi pengarsipan file beresolusi tinggi langsung ke Google Drive toko.",
    tryRoute: "/admin",
  },
  {
    id: "s9",
    name: "Rekap otomatis ke Google Sheets",
    lane: "Sistem Website",
    type: "task",
    input: "Data pesanan lunas (nama, no HP, alamat, produk, nominal)",
    process: "Google Sheets API menambahkan baris baru pada sheet 'Pesanan' dan 'Keuangan'",
    output: "Baris data tercatat rapi di Google Sheets",
    description: "Data transaksi tersinkronisasi otomatis sehingga admin tidak perlu rekap manual.",
    tryRoute: "/admin",
  },
  {
    id: "s10",
    name: "Kirim notifikasi status ke pelanggan",
    lane: "Sistem Website",
    type: "task",
    input: "Status pesanan terbaru & no. WhatsApp pelanggan",
    process: "Bot WhatsApp API mengirim pesan otomatis status pesanan",
    output: "Pesan WhatsApp terkirim ke pelanggan",
    description: "Pelanggan mendapat kepastian instan bahwa pembayaran telah diterima.",
    tryRoute: "/admin",
  },

  // Admin & Keuangan
  {
    id: "a1",
    name: "Pantau dashboard pesanan",
    lane: "Admin & Keuangan",
    type: "task",
    input: "Data pesanan dari Google Sheets / Sistem Website",
    process: "Admin memonitor status seluruh pesanan dalam satu tampilan terpusat",
    output: "Visibilitas alur pesanan real-time",
    description: "Memantau pesanan yang masuk tanpa harus buka banyak aplikasi chat.",
    tryRoute: "/admin",
  },
  {
    id: "a2",
    name: "Cek laporan keuangan otomatis",
    lane: "Admin & Keuangan",
    type: "task",
    input: "Mutasi pemasukan dari gateway & rekap pengeluaran",
    process: "Mengecek total omset, laba kotor, dan saldo kas yang dihitung otomatis",
    output: "Laporan keuangan real-time",
    description: "Laporan keuangan selalu up-to-date tanpa selisih hitung.",
    tryRoute: "/admin",
  },
  {
    id: "a3",
    name: "Input resi ekspedisi",
    lane: "Admin & Keuangan",
    type: "task",
    input: "Resi pengiriman fisik dari kurir ekspedisi (JNE/J&T)",
    process: "Admin menginput nomor resi pada sistem website",
    output: "Resi tercatat di sistem & terkirim ke pelacak pesanan pelanggan",
    description: "Admin memasukkan nomor resi sehingga pelanggan bisa melacak paketnya secara mandiri.",
    tryRoute: "/admin",
  },

  // Tim Grafis
  {
    id: "g1",
    name: "Terima pesanan berstatus Lunas",
    lane: "Tim Grafis",
    type: "task",
    input: "Pesanan masuk dengan status 'Lunas' + link folder Drive foto",
    process: "Tim grafis membuka folder Drive pelanggan dan mengunduh foto mentah",
    output: "Bahan desain siap olah",
    description: "Hanya pesanan yang sudah lunas yang dikerjakan oleh tim grafis.",
    tryRoute: "/admin",
  },
  {
    id: "g2",
    name: "Buat draft desain",
    lane: "Tim Grafis",
    type: "task",
    input: "Foto pelanggan & teks ukiran kustom",
    process: "Menyusun layout vektor ukiran laser dan tipografi pada mockup kayu",
    output: "File draft desain (JPG/PNG mockup)",
    description: "Menyesuaikan foto agar kontras dan tajam saat diukir pada kayu.",
    tryRoute: "/admin",
  },
  {
    id: "g3",
    name: "Unggah draft ke sistem",
    lane: "Tim Grafis",
    type: "task",
    input: "File draft desain yang telah siap",
    process: "Mengunggah draft ke dashboard, sistem otomatis mengubah status jadi 'Review Draft'",
    output: "Draft tampil di halaman pelacakan pelanggan",
    description: "Draft dikirimkan ke pelanggan secara otomatis untuk ditinjau.",
    tryRoute: "/admin",
  },
  {
    id: "g4",
    name: "Respons pelanggan (Catch)",
    lane: "Tim Grafis",
    type: "catch",
    input: "Tindakan pelanggan (Setujui atau Minta Revisi)",
    process: "Menangkap hasil review pelanggan",
    output: "Sinyal alur: Lanjut ke produksi atau masuk proses revisi",
    description: "Tim grafis memantau apakah pelanggan puas atau membutuhkan perbaikan.",
    tryRoute: "/admin",
  },
  {
    id: "g5",
    name: "Revisi diminta? (Gateway)",
    lane: "Tim Grafis",
    type: "gateway",
    input: "Status respons pelanggan",
    process: "Jika Ya -> lakukan revisi desain; Jika Tidak -> serahkan ke tim Produksi",
    output: "Keputusan alur grafis",
    description: "Percabangan untuk menangani permintaan revisi atau melanjutkan ke produksi.",
    tryRoute: "/admin",
  },
  {
    id: "g6",
    name: "Revisi desain",
    lane: "Tim Grafis",
    type: "task",
    input: "Catatan revisi dari pelanggan",
    process: "Memperbaiki layout font / foto sesuai instruksi, lalu unggah ulang draft",
    output: "Draft revisi baru",
    description: "Tim grafis menyempurnakan rancangan sesuai catatan pelanggan.",
    tryRoute: "/admin",
  },

  // Produksi & Packing
  {
    id: "pr1",
    name: "Terima desain disetujui",
    lane: "Produksi & Packing",
    type: "task",
    input: "Desain yang sudah disetujui (Approved) & file vektor final",
    process: "Tim produksi menerima instruksi kerja dan menyiapkan bahan kayu",
    output: "Antrean siap produksi",
    description: "Memastikan kayu hanya diukir setelah ada persetujuan resmi dari pelanggan.",
    tryRoute: "/admin",
  },
  {
    id: "pr2",
    name: "Produksi kayu",
    lane: "Produksi & Packing",
    type: "task",
    input: "Papan kayu pinus solid & mesin laser engraving",
    process: "Pemotongan kayu presisi, ukir laser mendalam, pengamplasan, dan perakitan",
    output: "Produk kado kayu jadi",
    description: "Proses pembuatan fisik produk kayu bernilai estetika tinggi.",
    tryRoute: "/admin",
  },
  {
    id: "pr3",
    name: "Packing + kartu ucapan",
    lane: "Produksi & Packing",
    type: "task",
    input: "Produk jadi, kartu ucapan kustom, bubble wrap, box kado eksklusif",
    process: "Mencetak kartu ucapan, melapisi kado dengan pelindung benturan, menyegel box",
    output: "Paket siap kirim berlabel alamat",
    description: "Pengemasan aman agar kado kayu sampai tanpa cacat.",
    tryRoute: "/admin",
  },
  {
    id: "pr4",
    name: "Serahkan ke ekspedisi",
    lane: "Produksi & Packing",
    type: "task",
    input: "Paket siap kirim",
    process: "Menyerahkan paket ke kurir JNE/J&T (pickup atau drop point)",
    output: "Mendapatkan nomor resi fisik & notifikasi ke Admin",
    description: "Paket diserahkan ke kurir untuk diantar ke alamat pelanggan.",
    tryRoute: "/admin",
  },
];

export function BpmnWorkflowView() {
  const [selectedStep, setSelectedStep] = useState<BpmnStepDetail>(bpmnSteps[0]);
  const [activeTab, setActiveTab] = useState<"diagram" | "image" | "raci">("diagram");
  const [selectedLane, setSelectedLane] = useState<string>("Semua");

  const lanes = [
    {
      name: "Pelanggan",
      role: "Eksternal / Pembeli",
      color: "border-amber-500 bg-amber-500/10 text-amber-900 dark:text-amber-200",
      badge: "bg-amber-100 text-amber-800",
      steps: [
        { id: "p1", name: "Butuh produk custom", type: "start" },
        { id: "p2", name: "Buka website dari IG/TikTok", type: "task" },
        { id: "p3", name: "Pilih produk & isi kustomisasi", type: "task" },
        { id: "p4", name: "Unggah foto & cek ongkir otomatis", type: "task", toMsg: "s1" },
        { id: "p5", name: "Bayar via QRIS/VA", type: "task", toMsg: "s4" },
        { id: "p6", name: "Review draft desain", type: "task" },
        { id: "p7", name: "Sesuai desain?", type: "gateway" },
        { id: "p8", name: "Ajukan revisi", type: "task" },
        { id: "p9", name: "Setujui desain", type: "task" },
        { id: "p10", name: "Lacak resi", type: "task" },
        { id: "p11", name: "Pesanan diterima", type: "end" },
      ],
    },
    {
      name: "Sistem Website",
      role: "Otomasi Backend & Integrasi",
      color: "border-blue-500 bg-blue-500/10 text-blue-900 dark:text-blue-200",
      badge: "bg-blue-100 text-blue-800",
      steps: [
        { id: "s1", name: "Pesanan kustom masuk", type: "catch" },
        { id: "s2", name: "Hitung harga + ongkir", type: "task" },
        { id: "s3", name: "Buat kode pesanan unik", type: "task" },
        { id: "s4", name: "Pembayaran masuk", type: "catch" },
        { id: "s5", name: "Verifikasi pembayaran otomatis", type: "task" },
        { id: "s6", name: "Pembayaran valid?", type: "gateway" },
        { id: "s7", name: "Pesanan kedaluwarsa", type: "end" },
        { id: "s8", name: "Simpan foto ke folder Drive pesanan", type: "task" },
        { id: "s9", name: "Rekap otomatis ke Google Sheets", type: "task" },
        { id: "s10", name: "Kirim notifikasi status ke pelanggan", type: "task" },
      ],
    },
    {
      name: "Admin & Keuangan",
      role: "Internal Toko Kayu Story Gift",
      color: "border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200",
      badge: "bg-emerald-100 text-emerald-800",
      steps: [
        { id: "a1", name: "Pantau dashboard pesanan", type: "task" },
        { id: "a2", name: "Cek laporan keuangan otomatis", type: "task" },
        { id: "a3", name: "Input resi ekspedisi", type: "task" },
      ],
    },
    {
      name: "Tim Grafis",
      role: "Internal Toko Kayu Story Gift",
      color: "border-purple-500 bg-purple-500/10 text-purple-900 dark:text-purple-200",
      badge: "bg-purple-100 text-purple-800",
      steps: [
        { id: "g1", name: "Terima pesanan berstatus Lunas", type: "task" },
        { id: "g2", name: "Buat draft desain", type: "task" },
        { id: "g3", name: "Unggah draft ke sistem", type: "task" },
        { id: "g4", name: "Respons pelanggan", type: "catch" },
        { id: "g5", name: "Revisi diminta?", type: "gateway" },
        { id: "g6", name: "Revisi desain", type: "task" },
      ],
    },
    {
      name: "Produksi & Packing",
      role: "Internal Toko Kayu Story Gift",
      color: "border-amber-700 bg-amber-700/10 text-amber-950 dark:text-amber-100",
      badge: "bg-amber-200 text-amber-900",
      steps: [
        { id: "pr1", name: "Terima desain disetujui", type: "task" },
        { id: "pr2", name: "Produksi kayu", type: "task" },
        { id: "pr3", name: "Packing + kartu ucapan", type: "task" },
        { id: "pr4", name: "Serahkan ke ekspedisi", type: "task" },
      ],
    },
  ];

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-wood text-xs font-bold text-primary-foreground">
              BPMN
            </span>
            <h3 className="font-display text-2xl font-bold">
              Blueprint Proses Bisnis Swimlane (To-Be)
            </h3>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Berdasarkan rancangan alur resmi Kelompok 4 · T3B MSI Kayu Story Gift
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl bg-muted p-1">
          <button
            onClick={() => setActiveTab("diagram")}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeTab === "diagram"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Diagram Alur Interaktif
          </button>
          <button
            onClick={() => setActiveTab("image")}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeTab === "image"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Lihat Gambar BPMN Asli
          </button>
          <button
            onClick={() => setActiveTab("raci")}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeTab === "raci"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Matriks Peran (RACI)
          </button>
        </div>
      </div>

      {/* Tab 1: Interactive Diagram */}
      {activeTab === "diagram" && (
        <div className="mt-6 space-y-6">
          {/* Quick Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">Filter Jalur:</span>
            {["Semua", ...lanes.map((l) => l.name)].map((name) => (
              <button
                key={name}
                onClick={() => setSelectedLane(name)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  selectedLane === name
                    ? "bg-wood text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-secondary"
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          {/* Swimlane Container */}
          <div className="space-y-4">
            {lanes
              .filter((l) => selectedLane === "Semua" || l.name === selectedLane)
              .map((lane) => (
                <div
                  key={lane.name}
                  className={`overflow-hidden rounded-2xl border-2 transition ${lane.color}`}
                >
                  <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between border-b border-border/40 bg-card/60">
                    <div className="flex items-center gap-3">
                      <div className="font-display text-base font-bold text-foreground">
                        {lane.name}
                      </div>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${lane.badge}`}>
                        {lane.role}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {lane.steps.length} simpul proses
                    </span>
                  </div>

                  {/* Horizontal Node Flow */}
                  <div className="overflow-x-auto p-4 scrollbar-thin">
                    <div className="flex min-w-max items-center gap-3 py-2">
                      {lane.steps.map((st, idx) => {
                        const detail = bpmnSteps.find((x) => x.id === st.id);
                        const isSelected = selectedStep.id === st.id;

                        return (
                          <div key={st.id} className="flex items-center gap-3">
                            {/* BPMN Node Item */}
                            <button
                              onClick={() => detail && setSelectedStep(detail)}
                              className={`group relative flex flex-col items-center justify-center rounded-xl p-3 text-left transition ${
                                isSelected
                                  ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary ring-offset-2"
                                  : "bg-card hover:bg-secondary text-card-foreground border border-border shadow-xs"
                              } ${
                                st.type === "start"
                                  ? "w-36 border-l-4 border-emerald-500"
                                  : st.type === "end"
                                  ? "w-36 border-r-4 border-destructive"
                                  : st.type === "gateway"
                                  ? "w-40 border-2 border-dashed border-amber-500 bg-amber-50/50 dark:bg-amber-950/20"
                                  : st.type === "catch"
                                  ? "w-40 border-2 border-blue-400"
                                  : "w-44"
                              }`}
                            >
                              {/* Node Type Indicator */}
                              <div className="flex w-full items-center justify-between text-[10px] font-semibold opacity-75">
                                <span className="uppercase">
                                  {st.type === "start"
                                    ? "● Start"
                                    : st.type === "end"
                                    ? "■ End"
                                    : st.type === "gateway"
                                    ? "◇ Gateway"
                                    : st.type === "catch"
                                    ? "◎ Catch"
                                    : "Task"}
                                </span>
                                <span>#{st.id}</span>
                              </div>

                              <div className="mt-1 font-semibold text-xs leading-snug line-clamp-2">
                                {st.name}
                              </div>

                              {isSelected && (
                                <span className="mt-1 text-[10px] font-bold underline">
                                  Klik untuk detail ▼
                                </span>
                              )}
                            </button>

                            {/* Arrow connector */}
                            {idx < lane.steps.length - 1 && (
                              <div className="flex items-center text-muted-foreground/60">
                                <span className="text-lg">→</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Selected Step Detail Panel */}
          {selectedStep && (
            <div className="rounded-2xl border-2 border-primary/40 bg-secondary/30 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-wood font-bold text-primary-foreground">
                    #{selectedStep.id}
                  </span>
                  <div>
                    <h4 className="font-display text-xl font-bold">{selectedStep.name}</h4>
                    <span className="text-xs font-semibold text-primary">
                      Jalur: {selectedStep.lane} · Tipe: {selectedStep.type.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {selectedStep.tryRoute && (
                    <Link
                      to={selectedStep.tryRoute}
                      className="inline-flex items-center gap-2 rounded-full bg-wood px-5 py-2 text-xs font-bold text-primary-foreground shadow-sm hover:opacity-95"
                    >
                      Buka di {selectedStep.tryRoute === "/toko" ? "Halaman Pelanggan" : "Dashboard Admin"}
                      <ExternalLink className="size-3.5" />
                    </Link>
                  )}
                </div>
              </div>

              <p className="mt-4 text-sm text-foreground/80 leading-relaxed">
                {selectedStep.description}
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="text-xs font-bold uppercase text-muted-foreground">
                    1. Masukan (Input)
                  </div>
                  <p className="mt-1 text-sm font-medium">{selectedStep.input}</p>
                </div>

                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="text-xs font-bold uppercase text-muted-foreground">
                    2. Proses Sistem (Processing)
                  </div>
                  <p className="mt-1 text-sm font-medium">{selectedStep.process}</p>
                </div>

                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="text-xs font-bold uppercase text-muted-foreground">
                    3. Keluaran (Output / Result)
                  </div>
                  <p className="mt-1 text-sm font-medium">{selectedStep.output}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Original BPMN Image View */}
      {activeTab === "image" && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-display text-lg font-bold">
                Gambar Diagram Alur Asli (MSI Kelompok 4)
              </h4>
              <p className="text-xs text-muted-foreground">
                Dokumentasi resmi pemodelan proses bisnis To-Be dalam notasi BPMN Swimlane.
              </p>
            </div>
            <a
              href="/bpmn-alur-kayu-story-gift.png"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold hover:bg-muted"
            >
              <ZoomIn className="size-3.5" /> Buka Resolusi Penuh
            </a>
          </div>

          <div className="overflow-auto rounded-2xl border border-border bg-black/5 p-3">
            <img
              src="/bpmn-alur-kayu-story-gift.png"
              alt="Diagram BPMN Alur Bisnis Kayu Story Gift"
              className="mx-auto max-h-[600px] w-auto rounded-xl object-contain shadow-md"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-5 text-xs text-muted-foreground">
            <div className="rounded-xl bg-muted p-3">
              <b>1. Pelanggan:</b> Memilih kado, kustomisasi teks, bayar QRIS/VA, review draft & lacak resi.
            </div>
            <div className="rounded-xl bg-muted p-3">
              <b>2. Sistem Website:</b> Menghitung tarif, kode KSG unik, verifikasi gateway, sync Sheets & Drive.
            </div>
            <div className="rounded-xl bg-muted p-3">
              <b>3. Admin & Keuangan:</b> Pantau pipeline pesanan, cek laporan keuangan, input nomor resi.
            </div>
            <div className="rounded-xl bg-muted p-3">
              <b>4. Tim Grafis:</b> Ambil foto dari Drive, susun layout draft ukir, kelola revisi pelanggan.
            </div>
            <div className="rounded-xl bg-muted p-3">
              <b>5. Produksi & Packing:</b> Ukir laser kayu pinus, packing aman + kartu ucapan, serahkan ke kurir.
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: RACI Matrix */}
      {activeTab === "raci" && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary text-secondary-foreground uppercase font-bold">
              <tr>
                <th className="p-3">Tahap / Aktivitas Bisnis</th>
                <th className="p-3">Pelanggan</th>
                <th className="p-3">Sistem Website</th>
                <th className="p-3">Admin & Keuangan</th>
                <th className="p-3">Tim Grafis</th>
                <th className="p-3">Produksi & Packing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { t: "Pemesanan & Kustomisasi Produk", p: "R (Responsible)", s: "A (Accountable)", a: "I (Informed)", g: "I", pr: "I" },
                { t: "Kalkulasi Ongkir & Kode Unik", p: "I (Informed)", s: "R / A", a: "I", g: "I", pr: "I" },
                { t: "Verifikasi Pembayaran QRIS/VA", p: "C (Consulted)", s: "R / A (Otomatis)", a: "I (Informed)", g: "I", pr: "I" },
                { t: "Arsip Foto ke Google Drive", p: "I", s: "R / A (Otomatis)", a: "I", g: "C (Unduh)", pr: "I" },
                { t: "Sinkronisasi Google Sheets", p: "I", s: "R / A (Otomatis)", a: "C (Monitoring)", g: "I", pr: "I" },
                { t: "Penyusunan Draft Desain Ukir", p: "C (Review)", s: "I (Host)", a: "I", g: "R / A (Pelaksana)", pr: "I" },
                { t: "Approval & Penanganan Revisi", p: "A (Decision)", s: "I (Notifikasi)", a: "I", g: "R (Perbaiki)", pr: "I" },
                { t: "Produksi Fisik Laser & Kayu", p: "I", s: "I", a: "I", g: "C", pr: "R / A (Pelaksana)" },
                { t: "Packing + Kartu Ucapan Personal", p: "I", s: "I", a: "I", g: "I", pr: "R / A" },
                { t: "Input Resi Ekspedisi & Lacak", p: "I (Lacak)", s: "A (Update)", a: "R (Input Resi)", g: "I", pr: "C (Serahkan)" },
                { t: "Laporan Keuangan Otomatis", p: "—", s: "R (Hitung)", a: "A (Verifikasi)", g: "—", pr: "—" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-muted/50">
                  <td className="p-3 font-semibold text-foreground">{row.t}</td>
                  <td className="p-3"><span className="rounded bg-amber-100 px-2 py-0.5 text-amber-900 font-bold">{row.p}</span></td>
                  <td className="p-3"><span className="rounded bg-blue-100 px-2 py-0.5 text-blue-900 font-bold">{row.s}</span></td>
                  <td className="p-3"><span className="rounded bg-emerald-100 px-2 py-0.5 text-emerald-900 font-bold">{row.a}</span></td>
                  <td className="p-3"><span className="rounded bg-purple-100 px-2 py-0.5 text-purple-900 font-bold">{row.g}</span></td>
                  <td className="p-3"><span className="rounded bg-amber-200 px-2 py-0.5 text-amber-950 font-bold">{row.pr}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-[11px] text-muted-foreground">
            Keterangan: <b>R</b> = Responsible (Pelaksana), <b>A</b> = Accountable (Penanggung jawab), <b>C</b> = Consulted (Pemberi masukan), <b>I</b> = Informed (Menerima info).
          </p>
        </div>
      )}
    </div>
  );
}
