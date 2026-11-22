export const colorImageMap: Record<string, string> = {
  "Frosty White Oak": "/spinning-box-dark-walnut.jpg",
  "Brown Oak": "/spinning-box-dark-walnut.jpg",
  "Walnut Supreme": "/spinning-box-dark-walnut.jpg",
  "Pine Wood": "/spinning-box-pine-premium.jpg",
};

export const products = [
  {
    id: 1,
    name: "Spinning Box Premium",
    titleFormatted: "Spinning Box Premium",
    badge: "Koleksi Unggulan",
    tag: "Best Seller",
    desc: "Kotak putar foto kayu solid premium dengan mekanisme putar halus, lampu LED & charger Type-C",
    price: 279000,
    normalPrice: 309000,
    imageUrl: "/spinning-box-pine-premium.jpg",
    lineupUrl: "/spinning-box-lineup.jpg",
    material: "Kayu solid premium",
    capacity: "15 foto",
    charger: "Charger Type-C",
    features: [
      "15 foto kenangan",
      "Kayu solid premium alami",
      "Port charger Type-C",
      "Urutan foto bisa request",
      "Bisa Grafir/Ukir Tulisan Sesuai Request",
    ],
  },
  {
    id: 2,
    name: "Spinning Box Lite",
    titleFormatted: "Spinning Box Lite",
    badge: "Edisi Minimalis",
    tag: "Pilihan Ekonomis",
    desc: "Kotak putar foto 16 kenangan dengan 3 pilihan warna estetik berkualitas",
    price: 229000,
    normalPrice: 259000,
    imageUrl: "/spinning-box-dark-walnut.jpg",
    lineupUrl: "/spinning-box-lineup.jpg",
    material: "Bahan: HPL & Plywood",
    capacity: "16 foto",
    charger: "Charger Type-C",
    colors: [
      {
        id: "Frosty White Oak",
        name: "Frosty White Oak",
        label: "Frosty White Oak",
        hex: "#EFECE6",
        borderHex: "#D5CEC5",
        tone: "Putih Minimalis",
        desc: "Serat kayu putih cerah bersih bernuansa Skandinavia",
        img: "/spinning-box-dark-walnut.jpg",
      },
      {
        id: "Walnut Supreme",
        name: "Walnut Supreme",
        label: "Walnut Supreme",
        hex: "#2B211B",
        borderHex: "#1E1612",
        tone: "Espresso Mewah",
        desc: "Cokelat tua pekat premium yang hangat & elegan",
        img: "/spinning-box-dark-walnut.jpg",
      },
      {
        id: "Brown Oak",
        name: "Brown Oak",
        label: "Brown Oak",
        hex: "#7A593B",
        borderHex: "#5E4228",
        tone: "Cokelat Natural",
        desc: "Warna kayu oak alami dengan tekstur hangat",
        img: "/spinning-box-dark-walnut.jpg",
      },
    ],
    features: [
      "16 foto kenangan",
      "Bahan: HPL & Plywood",
      "Port charger Type-C",
      "Free Photo Printing & Cutting",
      "5–8 hari pengerjaan",
    ],
  },
];

export const moments = [
  "Anniversary",
  "Ulang Tahun",
  "Wisuda",
  "Valentine",
  "Pernikahan",
  "Hari Ibu / Ayah",
  "Kenang-kenangan Sahabat",
];

export const couriers = [
  { id: "jne", name: "JNE REG", est: "2–3 hari", price: 18000 },
  { id: "jnt", name: "J&T Express", est: "1–2 hari", price: 21000 },
  { id: "sicepat", name: "SiCepat REG", est: "2–3 hari", price: 19000 },
];

export const rupiah = (n: number) => "Rp" + (n || 0).toLocaleString("id-ID");

export const statuses = [
  "Menunggu Bayar",
  "Kedaluwarsa",
  "Lunas",
  "Desain",
  "Review Draft",
  "Revisi Diminta",
  "Desain Disetujui",
  "Produksi",
  "Packing",
  "Dikirim",
  "Diterima",
] as const;

export type Status = (typeof statuses)[number];

export interface OrderLog {
  time: string;
  lane: "Pelanggan" | "Sistem Website" | "Admin & Keuangan" | "Tim Grafis" | "Produksi & Packing";
  message: string;
}

export interface KSGOrder {
  id: string;
  name: string;
  phone: string;
  address: string;
  street?: string;
  benchmark?: string;
  province?: string;
  city?: string;
  district?: string;
  subdistrict?: string;
  postalCode?: string;
  courierNote?: string;
  product: string;
  variantColor?: string;
  moment: string;
  customText: string;
  card: boolean;
  cardMsg?: string;
  total: number;
  price: number;
  ongkir: number;
  courier: string;
  status: Status;
  date: string;
  photoUrl: string;
  photos?: string[];
  draftUrl?: string;
  revisionNotes?: string[];
  resi?: string;
  paymentMethod?: string;
  driveFolder?: string;
  sheetRow?: number;
  hasReviewed?: boolean;
  logs: OrderLog[];
}

export interface KSGReview {
  id: string;
  orderId?: string;
  userName: string;
  productName: string;
  rating: number; // 1-5
  date: string;
  comment: string;
  photoUrl?: string;
  verifiedBuyer: boolean;
}

export const initialReviews: KSGReview[] = [
  {
    id: "REV-101",
    orderId: "KSG-0136",
    userName: "Lala & Rio",
    productName: "Spinning Box Premium",
    rating: 5,
    date: "14 Nov 2026",
    comment:
      "Bagus bangettt aslinya! Waktu box-nya diputar fotonya jalan mulus dan lampunya hangat banget. Kayu solid premiumnya kerasa tebal dan kokoh. Pasangannya suka banget!",
    photoUrl: "/spinning-box-pine-premium.jpg",
    verifiedBuyer: true,
  },
  {
    id: "REV-102",
    orderId: "KSG-0141",
    userName: "Andi Pratama",
    productName: "Spinning Box Premium",
    rating: 5,
    date: "15 Nov 2026",
    comment:
      "Bisa grafir teks ukir sesuai request rapi banget. Colokan Type-C-nya praktis tanpa ribet ganti baterai. Sebelum diproduksi ada review draft desain dulu, mantap!",
    photoUrl: "/spinning-box-pine-premium.jpg",
    verifiedBuyer: true,
  },
  {
    id: "REV-103",
    orderId: "KSG-0140",
    userName: "Salsa Nur",
    productName: "Spinning Box Lite",
    rating: 5,
    date: "15 Nov 2026",
    comment:
      "Spinning Box Lite warna Brown Oak estetik parah! 16 fotonya dicetak jernih dan potongannya pas. Lampu LED-nya menyala terang dan hangat.",
    photoUrl: "/spinning-box-dark-walnut.jpg",
    verifiedBuyer: true,
  },
  {
    id: "REV-104",
    orderId: "KSG-0138",
    userName: "Maya Putri",
    productName: "Spinning Box Premium",
    rating: 5,
    date: "16 Nov 2026",
    comment:
      "Kado buat hari ulang tahun Ibu. 15 foto kenangan masa kecil tersusun rapi sesuai urutan yang saya minta. Pelayanannya cepat dan packing bubble wrap sangat tebal.",
    photoUrl: "/spinning-box-pine-premium.jpg",
    verifiedBuyer: true,
  },
];

export const default8Photos = [
  "/spinning-box-pine-premium.jpg",
  "/spinning-box-dark-walnut.jpg",
  "/spinning-box-pine-premium.jpg",
  "/spinning-box-dark-walnut.jpg",
  "/spinning-box-lineup.jpg",
  "/catalog-kayu-story.jpg",
  "/spinning-box-pine-premium.jpg",
  "/spinning-box-dark-walnut.jpg",
];

export const initialOrders: KSGOrder[] = [
  {
    id: "KSG-0144",
    name: "Keisya Lanika",
    phone: "081234567890",
    address: "Jl. Soekarno Hatta No. 45, RT 03/RW 07, Kel. Jatimulyo, Kec. Lowokwaru, Kota Malang, Jawa Timur 65141 (Patokan: Pagar hitam kayu, seberang Indomaret Lowokwaru)",
    street: "Jl. Soekarno Hatta No. 45, RT 03 / RW 07",
    benchmark: "Pagar hitam kayu, seberang Indomaret Lowokwaru, samping toko bunga",
    subdistrict: "Jatimulyo",
    district: "Lowokwaru",
    city: "Kota Malang",
    province: "Jawa Timur",
    postalCode: "65141",
    courierNote: "Barang kado kayu pecah belah / fragile. Hubungi via WA bila rumah sedang kosong.",
    product: "Spinning Box Lite",
    variantColor: "Frosty White Oak",
    moment: "Kenang-kenangan Sahabat",
    customText: "Friends Forever · Besties 2026",
    card: true,
    cardMsg: "Semoga sukses di tempat baru ya sahabatku tercinta!",
    price: 229000,
    ongkir: 18000,
    courier: "J&T Express",
    total: 257000,
    status: "Menunggu Bayar",
    date: "17 Nov 2026",
    photoUrl: "/spinning-box-dark-walnut.jpg",
    photos: default8Photos,
    paymentMethod: "QRIS",
    driveFolder: "/KSG-0144/8-foto-sahabat/",
    sheetRow: 145,
    revisionNotes: [],
    logs: [
      { time: "17 Nov 11:00", lane: "Pelanggan", message: "Checkout 8 foto kenangan Spinning Box Lite Frosty White Oak" },
      { time: "17 Nov 11:01", lane: "Sistem Website", message: "Menunggu pembayaran QRIS Rp257.000 (Batas waktu 24 jam)" },
    ],
  },
  {
    id: "KSG-0143",
    name: "Keisya Lanika",
    phone: "081234567890",
    address: "Jl. Soekarno Hatta No. 45, RT 03/RW 07, Kel. Jatimulyo, Kec. Lowokwaru, Kota Malang, Jawa Timur 65141 (Patokan: Pagar hitam kayu, seberang Indomaret Lowokwaru)",
    street: "Jl. Soekarno Hatta No. 45, RT 03 / RW 07",
    benchmark: "Pagar hitam kayu, seberang Indomaret Lowokwaru, samping gerai fotokopi",
    subdistrict: "Jatimulyo",
    district: "Lowokwaru",
    city: "Kota Malang",
    province: "Jawa Timur",
    postalCode: "65141",
    courierNote: "Kado pernikahan kayu, mohon jangan ditindih beban berat.",
    product: "Spinning Box Premium",
    moment: "Anniversary",
    customText: "us ♡ thank you, 2025",
    card: true,
    cardMsg: "Selamat hari jadi kita yang ke-3 tahun sayang!",
    price: 279000,
    ongkir: 18000,
    courier: "JNE REG",
    total: 307000,
    status: "Review Draft",
    date: "16 Nov 2026",
    photoUrl: "/spinning-box-pine-premium.jpg",
    photos: default8Photos,
    draftUrl: "/spinning-box-pine-premium.jpg",
    paymentMethod: "QRIS",
    driveFolder: "/KSG-0143/8-foto-keisya-lanika/",
    sheetRow: 144,
    revisionNotes: [],
    logs: [
      { time: "16 Nov 10:15", lane: "Pelanggan", message: "Checkout pesanan 8 foto dari link bio Instagram" },
      { time: "16 Nov 10:16", lane: "Sistem Website", message: "Kode pesanan KSG-0143 dibuat, total Rp307.000" },
      { time: "16 Nov 10:20", lane: "Sistem Website", message: "Pembayaran QRIS Rp307.000 diverifikasi otomatis (Lunas)" },
      { time: "16 Nov 10:20", lane: "Sistem Website", message: "8 Foto tersimpan di Google Drive /KSG-0143/ & baris Sheets #144 tercatat" },
      { time: "16 Nov 11:30", lane: "Tim Grafis", message: "Draft desain v1 selesai disusun & diunggah ke sistem" },
    ],
  },
  {
    id: "KSG-0142",
    name: "Keisya Lanika",
    phone: "081234567890",
    address: "Jl. Kaliurang KM 5, No. 18, Sleman, Yogyakarta 55281 (Patokan: Depan Toko Cat Warna Abadi)",
    street: "Jl. Kaliurang KM 5, No. 18",
    benchmark: "Depan Toko Cat Warna Abadi, pagar hijau",
    subdistrict: "Caturtunggal",
    district: "Depok",
    city: "Kabupaten Sleman",
    province: "DI Yogyakarta",
    postalCode: "55281",
    courierNote: "Titipkan ke satpam perumahan jika tidak ada orang di rumah.",
    product: "Spinning Box Premium",
    moment: "Anniversary",
    customText: "Together is our favorite place",
    card: false,
    price: 279000,
    ongkir: 18000,
    courier: "JNE REG",
    total: 297000,
    status: "Revisi Diminta",
    date: "16 Nov 2026",
    photoUrl: "/spinning-box-pine-premium.jpg",
    photos: default8Photos,
    draftUrl: "/spinning-box-pine-premium.jpg",
    paymentMethod: "Virtual Account BCA",
    driveFolder: "/KSG-0142/8-foto-keisya-anniv/",
    sheetRow: 143,
    revisionNotes: ["Mohon ukuran font nama kami diperbesar 15% dan posisi digeser sedikit ke tengah."],
    logs: [
      { time: "16 Nov 09:00", lane: "Sistem Website", message: "Pembayaran VA BCA terverifikasi" },
      { time: "16 Nov 10:00", lane: "Tim Grafis", message: "Draft desain v1 diunggah" },
      { time: "16 Nov 11:10", lane: "Pelanggan", message: "Pelanggan mengajukan revisi: perbesar ukuran font" },
    ],
  },
  {
    id: "KSG-0141",
    name: "Keisya Lanika",
    phone: "081234567890",
    address: "Jl. Tebet Barat Dalam No. 12, RT 05/RW 02, Tebet, Jakarta Selatan 12810 (Patokan: Samping Masjid Al-Huda)",
    street: "Jl. Tebet Barat Dalam No. 12, RT 05 / RW 02",
    benchmark: "Samping Masjid Al-Huda, rumah cat putih pintu abu-abu",
    subdistrict: "Tebet Barat",
    district: "Tebet",
    city: "Jakarta Selatan",
    province: "DKI Jakarta",
    postalCode: "12810",
    courierNote: "Kado kelulusan wisuda. Harap jangan dibanting.",
    product: "Spinning Box Premium",
    moment: "Wisuda",
    customText: "Happy Graduation, S.Kom!",
    card: false,
    price: 279000,
    ongkir: 18000,
    courier: "JNE REG",
    total: 297000,
    status: "Dikirim",
    date: "15 Nov 2026",
    photoUrl: "/spinning-box-pine-premium.jpg",
    photos: default8Photos,
    resi: "JNE881203991",
    paymentMethod: "QRIS",
    driveFolder: "/KSG-0141/8-foto-keisya-wisuda/",
    sheetRow: 142,
    logs: [
      { time: "15 Nov 08:30", lane: "Sistem Website", message: "Pembayaran lunas terverifikasi" },
      { time: "15 Nov 11:00", lane: "Pelanggan", message: "Draft desain disetujui tanpa revisi" },
      { time: "15 Nov 14:00", lane: "Produksi & Packing", message: "Ukir laser kayu & finishing selesai" },
      { time: "15 Nov 16:30", lane: "Produksi & Packing", message: "Packing selesai & diserahkan ke kurir JNE" },
      { time: "15 Nov 17:00", lane: "Admin & Keuangan", message: "No. resi JNE881203991 diinput ke sistem" },
    ],
  },
  {
    id: "KSG-0140",
    name: "Keisya Lanika",
    phone: "081234567890",
    address: "Komp. Dago Asri B-7, RT 02/RW 09, Coblong, Bandung 40135 (Patokan: Dekat Pos Satpam Blok B)",
    street: "Komp. Dago Asri Blok B-7",
    benchmark: "Dekat Pos Satpam Blok B, ada pohon mangga di depan",
    subdistrict: "Dago",
    district: "Coblong",
    city: "Kota Bandung",
    province: "Jawa Barat",
    postalCode: "40135",
    courierNote: "Kado ulang tahun, hubungi nomor HP bila penerima sedang kuliah.",
    product: "Spinning Box Lite",
    variantColor: "Brown Oak",
    moment: "Ulang Tahun",
    customText: "21 Years of Blessing",
    card: true,
    cardMsg: "Selamat ulang tahun Salsa, semoga makin sukses dan bahagia selalu!",
    price: 229000,
    ongkir: 18000,
    courier: "JNE REG",
    total: 257000,
    status: "Produksi",
    date: "15 Nov 2026",
    photoUrl: "/spinning-box-dark-walnut.jpg",
    photos: default8Photos,
    paymentMethod: "Virtual Account Mandiri",
    driveFolder: "/KSG-0140/8-foto-keisya-ultah/",
    sheetRow: 141,
    logs: [
      { time: "15 Nov 10:00", lane: "Pelanggan", message: "Draft desain disetujui" },
      { time: "15 Nov 13:30", lane: "Produksi & Packing", message: "Produksi kayu selesai, sedang dirakit mekanisme putar & lampu LED" },
    ],
  },
  {
    id: "KSG-0136",
    name: "Keisya Lanika",
    phone: "081234567890",
    address: "Jl. Veteran No. 20, Klojen, Kota Malang 65111 (Patokan: Sebelah Kafe Kopi Soe)",
    street: "Jl. Veteran No. 20",
    benchmark: "Sebelah Kafe Kopi Soe Veteran, gerbang cokelat",
    subdistrict: "Penanggungan",
    district: "Klojen",
    city: "Kota Malang",
    province: "Jawa Timur",
    postalCode: "65111",
    courierNote: "Paket kado kayu diterima dengan baik.",
    product: "Spinning Box Premium",
    moment: "Valentine",
    customText: "Love You to the Moon",
    card: true,
    cardMsg: "Happy Valentine's day my dear!",
    price: 279000,
    ongkir: 18000,
    courier: "JNE REG",
    total: 307000,
    status: "Diterima",
    date: "13 Nov 2026",
    resi: "JNE880991122",
    photoUrl: "/spinning-box-pine-premium.jpg",
    photos: default8Photos,
    paymentMethod: "QRIS",
    driveFolder: "/KSG-0136/8-foto-keisya-val/",
    sheetRow: 137,
    hasReviewed: true,
    logs: [
      { time: "13 Nov 10:00", lane: "Pelanggan", message: "Paket kado 8 foto diterima dengan selamat di alamat tujuan" },
    ],
  },
];

const STORAGE_KEY = "ksg_blueprint_orders_v9";
const REVIEWS_KEY = "ksg_store_reviews_v4";
const AUTH_KEY = "ksg_auth_session_v4";

export interface UserSession {
  role: "customer" | "admin";
  name: string;
  email: string;
  orderId?: string;
}

export function getCurrentUser(): UserSession {
  if (typeof window === "undefined") {
    return {
      role: "customer",
      name: "Keisya Lanika",
      email: "keisya.lanika@gmail.com",
      orderId: "KSG-0143",
    };
  }
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) {
      const def: UserSession = {
        role: "customer",
        name: "Keisya Lanika",
        email: "keisya.lanika@gmail.com",
        orderId: "KSG-0143",
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(def));
      return def;
    }
    return JSON.parse(raw) as UserSession;
  } catch {
    return {
      role: "customer",
      name: "Keisya Lanika",
      email: "keisya.lanika@gmail.com",
      orderId: "KSG-0143",
    };
  }
}

export function setCurrentUser(user: UserSession) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    window.dispatchEvent(new CustomEvent("ksg_auth_updated", { detail: user }));
  } catch (e) {
    console.error("Failed to save session to localStorage", e);
  }
}

export function logoutUser() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(AUTH_KEY);
    window.dispatchEvent(new CustomEvent("ksg_auth_updated", { detail: null }));
  } catch (e) {
    console.error("Failed to logout", e);
  }
}

export function getStoredOrders(): KSGOrder[] {
  if (typeof window === "undefined") return initialOrders;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialOrders));
      return initialOrders;
    }
    return JSON.parse(raw) as KSGOrder[];
  } catch (e) {
    console.error("Failed to read orders from localStorage", e);
    return initialOrders;
  }
}

export function saveOrders(orders: KSGOrder[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    window.dispatchEvent(new CustomEvent("ksg_orders_updated", { detail: orders }));
  } catch (e) {
    console.error("Failed to save orders to localStorage", e);
  }
}

export function getStoredReviews(): KSGReview[] {
  if (typeof window === "undefined") return initialReviews;
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    if (!raw) {
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(initialReviews));
      return initialReviews;
    }
    return JSON.parse(raw) as KSGReview[];
  } catch (e) {
    console.error("Failed to read reviews from localStorage", e);
    return initialReviews;
  }
}

export function saveReviews(reviews: KSGReview[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
    window.dispatchEvent(new CustomEvent("ksg_reviews_updated", { detail: reviews }));
  } catch (e) {
    console.error("Failed to save reviews to localStorage", e);
  }
}

export function addReview(params: {
  orderId?: string;
  userName: string;
  productName: string;
  rating: number;
  comment: string;
  photoUrl?: string;
}): KSGReview {
  const current = getStoredReviews();
  const now = new Date();
  const dateStr = `${now.getDate()} Nov 2026`;
  const newRev: KSGReview = {
    id: `REV-${Date.now().toString().slice(-4)}`,
    orderId: params.orderId,
    userName: params.userName || "Pelanggan Terverifikasi",
    productName: params.productName,
    rating: params.rating,
    date: dateStr,
    comment: params.comment,
    photoUrl: params.photoUrl,
    verifiedBuyer: true,
  };
  const next = [newRev, ...current];
  saveReviews(next);

  // If tied to an order, mark hasReviewed = true
  if (params.orderId) {
    const orders = getStoredOrders();
    const updated = orders.map((o) =>
      o.id === params.orderId ? { ...o, hasReviewed: true } : o
    );
    saveOrders(updated);
  }

  return newRev;
}

export function resetDefaultData(): KSGOrder[] {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(REVIEWS_KEY);
  }
  saveOrders(initialOrders);
  saveReviews(initialReviews);
  return initialOrders;
}

export function createNewOrder(params: {
  name: string;
  phone: string;
  address: string;
  street?: string;
  benchmark?: string;
  province?: string;
  city?: string;
  district?: string;
  subdistrict?: string;
  postalCode?: string;
  courierNote?: string;
  product: string;
  variantColor?: string;
  moment: string;
  customText: string;
  card: boolean;
  cardMsg?: string;
  price: number;
  ongkir: number;
  courier: string;
  photoUrl: string;
  photos?: string[];
  paymentMethod: string;
}): KSGOrder {
  const current = getStoredOrders();
  const nextNum = current.length + 144;
  const newId = `KSG-0${nextNum}`;
  const total = params.price + params.ongkir + (params.card ? 10000 : 0);
  const now = new Date();
  const dateStr = `${now.getDate()} Nov 2026`;
  const timeStr = `${now.getHours()}:${now.getMinutes() < 10 ? "0" : ""}${now.getMinutes()}`;

  const order: KSGOrder = {
    id: newId,
    name: params.name,
    phone: params.phone,
    address: params.address,
    street: params.street,
    benchmark: params.benchmark,
    province: params.province,
    city: params.city,
    district: params.district,
    subdistrict: params.subdistrict,
    postalCode: params.postalCode,
    courierNote: params.courierNote,
    product: params.product,
    variantColor: params.variantColor,
    moment: params.moment,
    customText: params.customText,
    card: params.card,
    cardMsg: params.cardMsg,
    price: params.price,
    ongkir: params.ongkir,
    courier: params.courier,
    total,
    status: "Menunggu Bayar",
    date: dateStr,
    photoUrl: params.photoUrl,
    photos: params.photos || (params.photoUrl ? [params.photoUrl] : default8Photos),
    paymentMethod: params.paymentMethod,
    driveFolder: `/${newId}/8-foto-upload/`,
    sheetRow: nextNum,
    revisionNotes: [],
    logs: [
      {
        time: `${dateStr} ${timeStr}`,
        lane: "Pelanggan",
        message: "Membuat pesanan kustom 8 foto di website via IG/TikTok link",
      },
      {
        time: `${dateStr} ${timeStr}`,
        lane: "Sistem Website",
        message: `Hitung harga Rp${params.price.toLocaleString("id-ID")} + ongkir Rp${params.ongkir.toLocaleString("id-ID")} & generate kode ${newId}`,
      },
    ],
  };

  saveOrders([order, ...current]);
  return order;
}
