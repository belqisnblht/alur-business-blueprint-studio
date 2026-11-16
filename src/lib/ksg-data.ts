export const products = [
  { id: 1, name: "Wooden Photo Box", desc: "Kotak kayu ukir foto + teks", price: 185000, tag: "Terlaris" },
  { id: 2, name: "Engraved Photo Frame", desc: "Bingkai kayu ukir laser", price: 120000, tag: "Hemat" },
  { id: 3, name: "Wooden Story Book", desc: "Buku kayu 6 halaman cerita", price: 245000, tag: "Premium" },
];
export const moments = ["Anniversary", "Ulang Tahun", "Wisuda", "Valentine", "Natal"];
export const rupiah = (n: number) => "Rp" + n.toLocaleString("id-ID");
export const statuses = ["Menunggu Bayar", "Lunas", "Desain", "Review", "Produksi", "Packing", "Dikirim"] as const;
export type Status = (typeof statuses)[number];
export const orders: { id: string; name: string; product: string; total: number; status: Status; date: string; resi?: string; card: boolean }[] = [
  { id: "KSG-0142", name: "Rina & Dimas", product: "Wooden Photo Box", total: 203000, status: "Review", date: "16 Nov", card: false },
  { id: "KSG-0141", name: "Andi Pratama", product: "Engraved Photo Frame", total: 138000, status: "Dikirim", date: "15 Nov", resi: "JNE881203", card: false },
  { id: "KSG-0140", name: "Salsa Nur", product: "Wooden Story Book", total: 273000, status: "Packing", date: "15 Nov", card: true },
  { id: "KSG-0139", name: "Bagas", product: "Wooden Photo Box", total: 203000, status: "Desain", date: "14 Nov", card: false },
  { id: "KSG-0138", name: "Maya Putri", product: "Engraved Photo Frame", total: 148000, status: "Produksi", date: "14 Nov", card: true },
  { id: "KSG-0137", name: "Fajar", product: "Wooden Story Book", total: 263000, status: "Menunggu Bayar", date: "13 Nov", card: false },
  { id: "KSG-0136", name: "Lala & Rio", product: "Wooden Photo Box", total: 213000, status: "Lunas", date: "13 Nov", card: true },
];
