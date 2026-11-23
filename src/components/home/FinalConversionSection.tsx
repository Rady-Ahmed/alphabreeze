"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PhoneCall, Sparkles, FileText, CheckCircle2 } from "lucide-react";

export default function FinalConversionSection() {
  return (
    <section className="py-28 relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-sky-950 text-white">
      {/* Background Tech Grid & Molecule Overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(56, 189, 248, 0.4) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-8 border border-sky-400/30 text-xs font-bold text-sky-200">
              <Sparkles className="w-4 h-4 text-sky-300" />
              <span>جاهزون لتلبية احتياجات مصنعك فوراً</span>
            </div>

            {/* Editorial Headline */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
              لنبدأ في توريد{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-200 to-white drop-shadow-[0_0_35px_rgba(56,189,248,0.4)]">
                خط إنتاجك القادم
              </span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-sky-300/80 mb-6 uppercase tracking-widest">
              Let&apos;s Supply Your Next Production Line
            </p>

            {/* Supporting Text */}
            <p className="text-slate-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
              أخبرنا بما يحتاجه عملك. فريقنا الكيميائي والمبيعات الصناعية جاهز لمساعدتكم في اختيار المواد الخام الأنسب لتركيباتكم بأسعار استيرادية مباشرة.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
              <a
                href="https://wa.me/201119446474?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%B7%D9%84%D8%A8%20%D8%B9%D8%B1%D8%B6%20%D8%B3%D8%B9%D8%B1%20%D8%AA%D9%88%D8%B1%D9%8A%D8%AF%20%D9%85%D9%88%D8%A7%D8%AF%20%D8%AE%D8%A7%D9%85%20(RFQ)%20%D9%84%D9%85%D8%B5%D9%86%D8%B9%D9%86%D8%A7"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-white text-navy-950 hover:bg-sky-50 font-black h-14 px-9 rounded-2xl shadow-2xl text-sm sm:text-base group"
                >
                  <PhoneCall className="w-4 h-4 ml-2 text-sky-600" />
                  <span>طلب عرض سعر (Request a Quote)</span>
                </Button>
              </a>

              <Link href="/shop">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-sky-400/40 text-sky-200 hover:bg-white/10 font-bold h-14 px-8 rounded-2xl text-sm sm:text-base backdrop-blur-sm"
                >
                  <FileText className="w-4 h-4 ml-2 text-sky-400" />
                  <span>استكشاف الكتالوج (Explore Catalog)</span>
                </Button>
              </Link>
            </div>

            {/* Trust Checklist */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                استجابة وتجهيز عرض السعر خلال 30 دقيقة
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                شهادات تحليل مخبرية COA و MSDS مع كل شحنة
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                شحن لوجستي آمن لجميع المناطق الصناعية في مصر
              </span>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
