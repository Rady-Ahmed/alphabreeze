"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, Loader2, Sparkles, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/ui/logo";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("admin@alphabreeze.com");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const isDev = process.env.NODE_ENV !== "production";

  const handleQuickFill = () => {
    setEmail("admin@alphabreeze.com");
    setPassword("Admin@2024");
    toast.info("تم تعبئة بيانات الحساب التجريبي الرئيسي");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("alphabreeze_current_user", JSON.stringify(data.user));
        toast.success(`مرحباً بك، ${data.user.name} 👋`);
        router.push("/admin");
        return;
      }

      toast.error(data.error || "البريد الإلكتروني أو كلمة المرور غير صحيحة");
      setLoading(false);
    } catch {
      toast.error("تعذر الاتصال بخادم المصادقة، يرجى المحاولة لاحقاً");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#070e22] via-[#0d1b3e] to-[#070e22] text-white p-4 sm:p-6" dir="rtl">
      
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-400 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-600 rounded-full blur-[100px]" />
      </div>

      {/* Top Bar Link */}
      <div className="relative z-10 flex items-center justify-between max-w-md mx-auto w-full pt-4">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowRight className="w-3.5 h-3.5" />
          <span>العودة للموقع الرئيسي</span>
        </Link>
        <span className="text-[11px] font-mono text-cyan-400/80 bg-cyan-400/10 px-2.5 py-1 rounded-full border border-cyan-400/20">
          v2.4 Secured Portal
        </span>
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md mx-auto my-auto relative z-10"
      >
        <div className="bg-[#0b1633]/90 backdrop-blur-2xl rounded-3xl border border-cyan-500/20 p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          
          {/* Brand Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-xl shadow-cyan-500/20 flex items-center justify-center mx-auto mb-4 p-2.5 border border-white/20">
              <Logo className="w-full h-full" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              لوحة إدارة <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-300 to-sky-400">ألفا بريز</span>
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              Alpha Breeze Chemicals Management System
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                البريد الإلكتروني للإدارة
              </label>
              <div className="relative">
                <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="email"
                  dir="ltr"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@alphabreeze.com"
                  className="w-full pr-10 pl-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  كلمة المرور
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  dir="ltr"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pr-10 pl-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Quick Fill Helper (dev only) */}
            {isDev && (
              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleQuickFill}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-medium border border-cyan-400/20 transition"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>تعبئة بيانات حساب الأدمن التجريبي (Admin@2024)</span>
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-l from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all duration-200 mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>جاري التحقق والاتصال...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>دخول إلى لوحة التحكم</span>
                </>
              )}
            </button>
          </form>

        </div>
      </motion.div>

      {/* ── Exact Requested Footer ── */}
      <footer className="relative z-10 text-center py-4 border-t border-white/5">
        <p className="text-xs text-slate-400">
          © 2026{" "}
          <Link
            href="/admin/login"
            className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-4"
          >
            AlphaBreeze
          </Link>
          . جميع الحقوق محفوظة.
        </p>
      </footer>

    </div>
  );
}
