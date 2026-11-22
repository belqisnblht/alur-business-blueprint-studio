import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Lock,
  Mail,
  User,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  SlidersHorizontal,
  ChevronRight,
  Eye,
  EyeOff,
} from "lucide-react";
import kayuAsset from "@/assets/kayu-story.jpg.asset.json";
import { setCurrentUser, getCurrentUser } from "@/lib/ksg-data";

const hero = kayuAsset.url;

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Masuk Akun — Kayu Story Gift" },
      {
        name: "description",
        content:
          "Masuk ke akun pelanggan untuk memesan dan melacak kado kayu kustom, atau akses portal staff admin Kayu Story Gift.",
      },
    ],
  }),
  component: LoginPage,
});

export function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"customer" | "admin">("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    setTimeout(() => {
      setIsLoading(false);
      if (role === "customer") {
        setCurrentUser({
          role: "customer",
          name: email ? email.split("@")[0] : "Keisya Lanika",
          email: email || "keisya.lanika@gmail.com",
          orderId: "KSG-0143",
        });
        navigate({ to: "/toko" });
      } else {
        setCurrentUser({
          role: "admin",
          name: "Admin Operasional",
          email: email || "admin@kayustorygift.com",
        });
        navigate({ to: "/admin" });
      }
    }, 400);
  };

  const handleQuickCustomer = () => {
    setEmail("keisya.lanika@gmail.com");
    setPassword("••••••••");
    setRole("customer");
    setCurrentUser({
      role: "customer",
      name: "Keisya Lanika",
      email: "keisya.lanika@gmail.com",
      orderId: "KSG-0143",
    });
    navigate({ to: "/toko" });
  };

  const handleQuickAdmin = () => {
    setEmail("admin@kayustorygift.com");
    setPassword("••••••••");
    setRole("admin");
    setCurrentUser({
      role: "admin",
      name: "Admin Operasional",
      email: "admin@kayustorygift.com",
    });
    navigate({ to: "/admin" });
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex flex-col justify-between">
      {/* Top Simple Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur py-4 px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-xl bg-wood text-sm font-bold text-primary-foreground shadow-xs">
              KSG
            </span>
            <span className="font-display text-xl font-bold text-primary">Kayu Story Gift</span>
          </Link>
          <Link
            to="/"
            className="text-xs font-semibold text-muted-foreground hover:text-foreground transition"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </header>

      {/* Main Login Card Section */}
      <main className="my-auto py-12 px-6 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="font-display text-3xl font-bold">Selamat Datang</h1>
            <p className="text-sm text-muted-foreground">
              Pilih akses masuk untuk melanjutkan ke layanan Kayu Story Gift
            </p>
          </div>

          {/* Role Switcher Tabs */}
          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-muted p-1.5 border border-border">
            <button
              type="button"
              onClick={() => {
                setRole("customer");
                setErrorMsg(null);
              }}
              className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition ${
                role === "customer"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ShoppingBag className="size-4 text-primary" />
              <span>Pelanggan (User)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setRole("admin");
                setErrorMsg(null);
              }}
              className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition ${
                role === "admin"
                  ? "bg-sidebar text-sidebar-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ShieldCheck className="size-4 text-sidebar-primary" />
              <span>Admin / Staff</span>
            </button>
          </div>

          {/* Login Card */}
          <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-1.5">
                  {role === "customer" ? "Alamat Email / No. WhatsApp" : "Email Staff Internal"}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 size-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      role === "customer"
                        ? "cth: keisya.lanika@gmail.com atau 0812345678"
                        : "admin@kayustorygift.com"
                    }
                    className="input pl-10 text-sm"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase text-muted-foreground">
                    Kata Sandi
                  </label>
                  <a href="#" className="text-[11px] font-semibold text-primary hover:underline">
                    Lupa sandi?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 size-4 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi..."
                    className="input pl-10 pr-10 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {errorMsg && (
                <div className="rounded-xl bg-destructive/10 p-3 text-xs font-semibold text-destructive">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full rounded-2xl py-3.5 text-sm font-bold shadow-soft transition flex items-center justify-center gap-2 ${
                  role === "customer"
                    ? "bg-wood text-primary-foreground hover:opacity-95"
                    : "bg-sidebar text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                {isLoading ? (
                  <span>Memproses masuk...</span>
                ) : (
                  <>
                    <span>
                      {role === "customer"
                        ? "Masuk ke Toko Pelanggan"
                        : "Masuk ke Dashboard Internal"}
                    </span>
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick 1-Click Demo Logins */}
            <div className="mt-6 pt-5 border-t border-border space-y-2">
              <span className="block text-center text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Akses Cepat (Demo Langsung)
              </span>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <button
                  type="button"
                  onClick={handleQuickCustomer}
                  className="rounded-xl border border-border bg-secondary/50 p-2.5 text-left hover:bg-secondary transition"
                >
                  <div className="text-[10px] font-bold uppercase text-primary">Demo Pelanggan</div>
                  <div className="font-semibold text-xs text-foreground truncate">Keisya (User)</div>
                  <div className="text-[10px] text-muted-foreground">Pesan & Lacak</div>
                </button>

                <button
                  type="button"
                  onClick={handleQuickAdmin}
                  className="rounded-xl border border-border bg-sidebar/10 p-2.5 text-left hover:bg-sidebar/20 transition"
                >
                  <div className="text-[10px] font-bold uppercase text-sidebar-primary">
                    Demo Internal
                  </div>
                  <div className="font-semibold text-xs text-foreground truncate">Admin Toko</div>
                  <div className="text-[10px] text-muted-foreground">Kelola Pesanan</div>
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Belum punya akun pemesanan?{" "}
            <Link to="/toko" className="font-semibold text-primary underline">
              Pesan kado langsung tanpa registrasi
            </Link>
          </p>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © 2026 Kayu Story Gift · Crafting Memories in Solid Wood
      </footer>
    </div>
  );
}
