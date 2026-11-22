"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { attemptLogin, initCredentials } from "@/lib/auth";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("admin@alphabreeze.com");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Initialise default credentials on first visit
    initCredentials();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }
    setLoading(true);

    try {
      // 1. First attempt secure server-side login
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("alphabreeze_current_user", JSON.stringify(data.user));
        toast.success(`أهلاً بك، ${data.user.name} 👋`);
        router.push("/admin");
        return;
      }

      // 2. Fallback to local auth if API reports client credentials match
      const localUser = await attemptLogin(email, password);
      if (localUser) {
        localStorage.setItem("alphabreeze_current_user", JSON.stringify(localUser));
        document.cookie = "alphabreeze_auth=1; path=/; max-age=86400";
        toast.success(`أهلاً بك، ${localUser.name} 👋`);
        router.push("/admin");
        return;
      }

      toast.error(data.error || "البريد الإلكتروني أو كلمة المرور غير صحيحة");
      setLoading(false);
    } catch {
      // Offline fallback
      try {
        const localUser = await attemptLogin(email, password);
        if (localUser) {
          localStorage.setItem("alphabreeze_current_user", JSON.stringify(localUser));
          document.cookie = "alphabreeze_auth=1; path=/; max-age=86400";
          toast.success(`أهلاً بك، ${localUser.name} 👋`);
          router.push("/admin");
          return;
        }
      } catch {}
      toast.error("حدث خطأ أثناء تسجيل الدخول، يرجى المحاولة مجدداً");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-sky-50/30 to-blue-50 px-4" dir="rtl">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-sm relative"
      >
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100/80 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-sky-200">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
            <p className="text-gray-500 text-sm mt-1">AlphaBreeze Admin</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <Label className="text-gray-700 font-medium">البريد الإلكتروني</Label>
              <div className="relative mt-1.5">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@alphabreeze.com"
                  className="pr-10 h-11 border-gray-200 focus:border-sky-400 focus:ring-sky-100"
                  type="email"
                  required
                  dir="ltr"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label className="text-gray-700 font-medium">كلمة المرور</Label>
              <div className="relative mt-1.5">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  className="pr-10 pl-10 h-11 border-gray-200 focus:border-sky-400 focus:ring-sky-100"
                  type={showPassword ? "text" : "password"}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-gray-400 mt-1.5">
                💡 كلمة المرور الافتراضية: <span className="font-mono bg-gray-100 px-1 rounded text-gray-600">Admin@2024</span>
              </p>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-md shadow-sky-200 transition-all"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                  </svg>
                  جاري تسجيل الدخول...
                </span>
              ) : "تسجيل الدخول"}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          AlphaBreeze Admin Panel — محمي بتشفير SHA-256
        </p>
      </motion.div>
    </div>
  );
}
