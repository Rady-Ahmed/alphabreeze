"use client";

import { motion } from "framer-motion";
import { Search, Send, FileSpreadsheet, CheckCircle2, Truck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const journeySteps = [
  {
    step: "01",
    title_ar: "استكشاف الخامات",
    title_en: "Discover Raw Materials",
    desc: "تصفح الكتالوج المعتمد واختر المواد ومستويات النقاء المناسبة لتركيبتك.",
    icon: Search,
  },
  {
    step: "02",
    title_ar: "إرسال قائمة المتطلبات (RFQ)",
    title_en: "Submit Requirements",
    desc: "حدد الكميات المستهدفة والمواصفات الفنية عبر الموقع أو واتساب المبيعات.",
    icon: Send,
  },
  {
    step: "03",
    title_ar: "استلام العرض الفني والتجاري",
    title_en: "Receive Technical Quote",
    desc: "نرسل لكم عرض أسعار رسمي تفصيلي مرفقاً به شهادات التحليل المخبري (COA).",
    icon: FileSpreadsheet,
  },
  {
    step: "04",
    title_ar: "اعتماد العينات وتأكيد الأمر",
    title_en: "Confirm the Order",
    desc: "تجربة العينات المعملية لخط الإنتاج، ثم تأكيد أمر الشراء وجدول التسليم.",
    icon: CheckCircle2,
  },
  {
    step: "05",
    title_ar: "التجهيز والتوريد الصناعي",
    title_en: "Supply & Delivery",
    desc: "تعبئة مطابقة لاشتراطات السلامة وشحن سريع ومباشر لمستودع مصنعك.",
    icon: Truck,
  },
];

export default function ProcurementJourneySection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="how-we-work">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold mb-4">
            <span>آلية العمل والشراكة الصناعية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight mb-4">
            رحلة التوريد خطوة بخطوة
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            منظومة عمل متقنة تضمن وصول خاماتكم بأقصى سرعة ومطابقة تامة للمواصفات الفنية دون أي تعطيل لخطوط إنتاجكم.
          </p>
        </div>

        {/* 5 Connected Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
          {journeySteps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="relative bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-sky-300 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Step Number + Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-black font-mono text-sky-500/30 group-hover:text-sky-500 transition-colors">
                      {s.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-sky-600 flex items-center justify-center shadow-sm group-hover:bg-navy-950 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-navy-950 mb-1 leading-snug">
                    {s.title_ar}
                  </h3>
                  <p className="text-[10px] font-mono text-slate-400 mb-3 uppercase tracking-wider">
                    {s.title_en}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span>المرحلة {s.step}</span>
                  <div className="w-2 h-2 rounded-full bg-sky-400" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="text-center mt-12">
          <a
            href="https://wa.me/201119446474?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A5%D8%B1%D8%B3%D8%A7%D9%84%20%D9%82%D8%A7%D8%A6%D9%85%D8%A9%20%D8%AE%D8%A7%D9%85%D8%A7%D8%AA%20(RFQ)%20%D9%84%D9%85%D8%B5%D9%86%D8%B9%D9%86%D8%A7"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-navy-950 hover:bg-sky-600 text-white font-bold px-8 h-12 rounded-xl text-xs sm:text-sm shadow-md transition-colors">
              ابدأ الآن وأرسل قائمة احتياجات مصنعك
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Button>
          </a>
        </div>

      </div>
    </section>
  );
}
