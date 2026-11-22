"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, PhoneCall, FileText, CheckCircle2 } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-sky-950 text-white">
      {/* Background Decor */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-6 border border-sky-400/30 text-xs font-bold text-sky-200">
              <Sparkles className="w-4 h-4 text-sky-300" />
              <span>جاهزون لتلبية احتياجات مصنعك فوراً</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tight">
              هل تبحث عن مورد كيميائي موثوق يضمن{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-200">
                استقرار خطوط إنتاجك؟
              </span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              تواصل مباشرة مع قسم المبيعات الصناعية وكيميائيي التطوير للحصول على عروض أسعار تنافسية، شهادات تحليل مخبرية (COA)، وعينات فنية للمصانع والمعامل.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
              <a
                href="https://wa.me/201119446474?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%B7%D9%84%D8%A8%20%D8%B9%D8%B1%D8%B6%20%D8%B3%D8%B9%D8%B1%20%D8%AA%D9%88%D8%B1%D9%8A%D8%AF%20%D9%85%D9%88%D8%A7%D8%AF%20%D8%AE%D8%A7%D9%85%20(RFQ)%20%D9%84%D9%85%D8%B5%D9%86%D8%B9%D9%86%D8%A7"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-white text-navy-950 hover:bg-sky-50 font-black h-13 px-8 rounded-xl shadow-2xl text-base"
                >
                  <PhoneCall className="w-4 h-4 ml-2 text-sky-600" />
                  طلب تسعير عاجل للمصانع عبر واتساب
                </Button>
              </a>

              <Link href="/shop">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-sky-400/40 text-sky-200 hover:bg-white/10 font-bold h-13 px-8 rounded-xl text-base"
                >
                  <FileText className="w-4 h-4 ml-2 text-sky-400" />
                  تصفح كتالوج المواد الخام (+430 مادة)
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                رد سريع خلال 30 دقيقة في أوقات العمل
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                شهادات تحليل COA و MSDS معتمدة
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                توريد مباشر لكافة المحافظات والمناطق الصناعية
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
