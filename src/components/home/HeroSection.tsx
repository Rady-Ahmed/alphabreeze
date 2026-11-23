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
  ShieldCheck,
  Search,
  CheckCircle2,
  FileText,
  PhoneCall,
  Layers,
  ChevronDown,
} from "lucide-react";

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
    <section className="relative min-h-[96vh] flex items-center justify-center overflow-hidden bg-navy-950 text-white">
      {/* 1. Underlying Cinematic Photography (Lab & Specialty Chemical Supply) */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2000&auto=format&fit=crop"
          alt="مختبر كيميائي وصناعي لتوريد المواد الخام"
          className="w-full h-full object-cover object-center scale-105 filter brightness-90 contrast-110"
        />
      </div>

      {/* 2. Atmospheric Translucent Cyan Mist & Deep Blue Layered Gradients */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(10, 14, 42, 0.94) 0%, rgba(15, 22, 66, 0.88) 45%, rgba(14, 165, 233, 0.35) 85%, rgba(12, 74, 110, 0.8) 100%)",
        }}
      />

      {/* 3. Subtle Molecular Tech Diffusion */}
      <div
        className="absolute inset-0 z-[2] opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(56, 189, 248, 0.6) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* 4. Ambient Cyan Glows & Mist */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl pointer-events-none z-[2]" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none z-[2]" />

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10 pt-32 pb-24 lg:pt-36 lg:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Capability Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-sky-400/30 backdrop-blur-md mb-8 shadow-sm">
              <span className="flex h-2.5 w-2.5 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-sky-200">
                توريد المواد الخام ومكونات مستحضرات التجميل الصناعية B2B
              </span>
            </div>

            {/* Cinematic Editorial Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] font-black leading-[1.18] mb-6 tracking-tight">
              حلول متكاملة لتوريد{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-200 to-white drop-shadow-[0_0_35px_rgba(56,189,248,0.45)]">
                المواد الخام الكيميائية
              </span>
            </h1>

            {/* Editorial Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed mb-10 max-w-2xl mx-auto font-normal drop-shadow-sm">
              شريككم الاستراتيجي لتوريد خامات ومستحضرات التجميل، الكيماويات المتخصصة، والمواد الأولية الصناعية مع شهادات التحليل المخبري (COA) وصحائف الأمان (MSDS).
            </p>

            {/* Compact Search Bar for Raw Materials */}
            <form
              onSubmit={handleSearch}
              className="mb-10 p-1.5 sm:p-2 bg-white/10 backdrop-blur-2xl border border-sky-400/30 rounded-2xl shadow-2xl flex flex-col sm:flex-row gap-2 max-w-xl mx-auto"
            >
              <div className="relative flex-1 flex items-center pr-3">
                <Search className="w-5 h-5 text-sky-300 ml-3 shrink-0" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث باسم المادة، رقم CAS، أو التصنيف (مثل: سالسيلك، أرجان)..."
                  className="bg-transparent border-0 text-white placeholder:text-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0 text-xs sm:text-sm h-11"
                />
              </div>
              <Button
                type="submit"
                className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-sky-500/25 text-xs sm:text-sm shrink-0"
              >
                بحث في الكتالوج
                <ArrowLeft className="w-4 h-4 mr-2" />
              </Button>
            </form>

            {/* Primary & Secondary Dual CTAs */}
            <div className="flex flex-wrap justify-center items-center gap-4 mb-14">
              <Link href="/shop">
                <Button
                  size="lg"
                  className="bg-white text-navy-950 hover:bg-sky-50 font-black h-13 px-8 rounded-xl shadow-2xl shadow-white/15 text-sm sm:text-base group"
                >
                  <span>استكشف منتجاتنا</span>
                  <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
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
                  className="border-sky-400/40 text-sky-200 hover:bg-sky-500/15 hover:border-sky-400 font-bold h-13 px-7 rounded-xl text-sm sm:text-base backdrop-blur-sm"
                >
                  <PhoneCall className="w-4 h-4 ml-2 text-sky-400" />
                  <span>طلب عرض سعر (RFQ)</span>
                </Button>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-8 border-t border-white/10 text-center">
              <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5">
                <p className="text-xl sm:text-2xl font-black text-white font-mono">+430</p>
                <p className="text-[11px] text-slate-300 font-medium">مادة خام كيميائية</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5">
                <p className="text-xl sm:text-2xl font-black text-sky-400 font-mono">100%</p>
                <p className="text-[11px] text-slate-300 font-medium">شهادات COA معتمدة</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5">
                <p className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">+350</p>
                <p className="text-[11px] text-slate-300 font-medium">مصنع ومعمل نخدمه</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5">
                <p className="text-xl sm:text-2xl font-black text-cyan-300 font-mono">48H</p>
                <p className="text-[11px] text-slate-300 font-medium">شحن صناعي للمحافظات</p>
              </div>
            </div>

          </motion.div>

        </div>
      </div>

      {/* 5. Custom Fluid Organic Section Transition (Subtle Water/Liquid Line) */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none z-[3]">
        <svg
          className="relative block w-full h-8 sm:h-12 text-slate-50"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C150,90 350,-40 500,40 C650,120 900,20 1200,50 L1200,120 L0,120 Z"
            fill="currentColor"
            opacity="1"
          />
        </svg>
      </div>
    </section>
  );
}
