"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Sparkles,
  FlaskConical,
  Atom,
  Shield,
  Award,
  Search,
  CheckCircle2,
  Droplets,
  Layers,
  FileCheck,
  Building2,
  PhoneCall,
} from "lucide-react";

const quickCategories = [
  { name: "الزيوت والمستخلصات", count: 82, slug: "oils-and-extracts" },
  { name: "البودرات والفعالة", count: 81, slug: "raw-powders-and-actives" },
  { name: "السوائل والسيليكون", count: 59, slug: "chemical-liquids-and-solvents" },
  { name: "الفيتامينات والمغذيات", count: 29, slug: "vitamins-and-nutrients" },
  { name: "الألوان والمايكا", count: 83, slug: "colors-and-pigments" },
  { name: "العطور المركزة", count: 68, slug: "fragrances-and-scents" },
];

export default function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/shop");
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-sky-950 text-white">
      {/* Background Tech Grid & Molecule Overlay */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(56, 189, 248, 0.4) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Ambient Gradient Glows */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 left-1/3 w-64 h-64 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 pt-28 pb-20 lg:pt-32 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Content (Right in RTL) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-sky-400/30 backdrop-blur-md mb-6 shadow-sm">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-medium text-sky-200">
                  التوريد الصناعي المعتمد B2B لمصانع ومعامل التجميل في مصر
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black leading-[1.2] mb-6 tracking-tight">
                شريككم الاستراتيجي في توريد{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-200 to-white drop-shadow-[0_0_25px_rgba(56,189,248,0.35)]">
                  المواد الخام الكيميائية
                </span>{" "}
                ومكونات مستحضرات التجميل
              </h1>

              {/* Sub-headline */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl font-normal">
                نوفر للمصانع، معامل التركيبات الكيميائية، ومطوري المنتجات أكثر من <strong className="text-white font-bold">430 مادة خام معتمدة</strong> (زيوت نقية، خلاصات، بودرات فعالة، مذيبات، وعطور مركزة) مع شهادات التحليل (COA) وصحائف الأمان (MSDS) مع خدمات التصنيع للغير (Private Label).
              </p>

              {/* Integrated B2B Catalog Search */}
              <form
                onSubmit={handleSearch}
                className="mb-8 p-1.5 sm:p-2 bg-white/10 backdrop-blur-xl border border-sky-400/25 rounded-2xl shadow-2xl flex flex-col sm:flex-row gap-2 max-w-2xl"
              >
                <div className="relative flex-1 flex items-center">
                  <Search className="w-5 h-5 text-sky-300 mr-3 shrink-0" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث باسم المادة الخام، رقم CAS، أو الفئة (مثال: سالسيلك، أرجان، كربابول)..."
                    className="bg-transparent border-0 text-white placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base h-11"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-sky-500/25 shrink-0"
                >
                  بحث في الكتالوج
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Button>
              </form>

              {/* Quick Category Launchers */}
              <div className="flex flex-wrap items-center gap-2 mb-8">
                <span className="text-xs text-slate-400 font-medium ml-1">الأقسام الأكثر طلباً:</span>
                {quickCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/shop?category=${cat.slug}`}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-sky-500/20 border border-white/10 hover:border-sky-400/40 text-slate-300 hover:text-sky-200 transition-all duration-200 flex items-center gap-1.5"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-sky-400 bg-sky-950/80 px-1.5 py-0.2 rounded-full border border-sky-800/50">
                      {cat.count}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/shop">
                  <Button
                    size="lg"
                    className="bg-white text-navy-950 hover:bg-sky-50 font-bold h-13 px-8 rounded-xl shadow-xl shadow-white/10 text-base"
                  >
                    استعراض الكتالوج (430+ مادة)
                    <ArrowLeft className="w-4 h-4 mr-2" />
                  </Button>
                </Link>
                <a
                  href="https://wa.me/201119446474?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%B7%D9%84%D8%A8%20%D8%B9%D8%B1%D8%B6%20%D8%B3%D8%B9%D8%B1%20%D8%AA%D9%88%D8%B1%D9%8A%D8%AF%20%D9%85%D9%88%D8%A7%D8%AF%20%D8%AE%D8%A7%D9%85%20(RFQ)%20%D9%84%D9%85%D8%B5%D9%86%D8%B9%D9%86%D8%A7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-sky-400/40 text-sky-200 hover:bg-sky-500/10 hover:border-sky-400 font-bold h-13 px-7 rounded-xl text-base"
                  >
                    <PhoneCall className="w-4 h-4 ml-2 text-sky-400" />
                    طلب تسعير فوري للمصانع (RFQ)
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Interactive Industrial Feature Showcase (Left in RTL) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              {/* Outer Glowing Frame */}
              <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-white/10 to-white/5 border border-white/20 backdrop-blur-2xl shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-400/20 rounded-full blur-2xl pointer-events-none" />

                {/* Card Header */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/30">
                      <FlaskConical className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">المواصفات القياسية للتوريد</h3>
                      <p className="text-xs text-sky-300 font-mono">INDUSTRIAL GRADE COMPLIANCE</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    معتمد للمصانع
                  </span>
                </div>

                {/* 4 B2B Technical Pillars */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-sky-400/30 transition-colors">
                    <FileCheck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">شهادات تحليل مخبرية (COA) مع كل شحنة</h4>
                      <p className="text-xs text-slate-300 mt-0.5">توثيق نسب النقاء، اللزوجة، الكثافة، والرقم الهيدروجيني pH.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-sky-400/30 transition-colors">
                    <Shield className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">صحائف بيانات أمان المواد (MSDS / SDS)</h4>
                      <p className="text-xs text-slate-300 mt-0.5">مطابقة للمواصفات القياسية المصرية وتوجيهات GHS العالمية.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-sky-400/30 transition-colors">
                    <Layers className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">مرونة أحجام التوريد الصناعي</h4>
                      <p className="text-xs text-slate-300 mt-0.5">من عبوات معملية 1 كجم إلى براميل 200 كجم وكونتينرات وأطنان.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-sky-400/30 transition-colors">
                    <Building2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">عقود توريد وتوفير مستمر للمصانع</h4>
                      <p className="text-xs text-slate-300 mt-0.5">ضمان ثبات أسعار الخامات واستقرار سلاسل الإمداد لخطوط الإنتاج.</p>
                    </div>
                  </div>
                </div>

                {/* Footer Metrics */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center">
                  <div className="p-2 rounded-lg bg-white/5">
                    <p className="text-lg font-black text-white font-mono">+430</p>
                    <p className="text-[11px] text-slate-400">مادة بالكتالوج</p>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5">
                    <p className="text-lg font-black text-sky-400 font-mono">100%</p>
                    <p className="text-[11px] text-slate-400">فحص مخبري</p>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5">
                    <p className="text-lg font-black text-emerald-400 font-mono">48H</p>
                    <p className="text-[11px] text-slate-400">توريد للمحافظات</p>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Modern Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none z-10">
        <svg
          className="relative block w-full h-8 sm:h-12 text-slate-50"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,121.31,201,114.65,241.6,110.8,282.16,92.87,321.39,56.44Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
