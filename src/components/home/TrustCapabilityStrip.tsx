"use client";

import { motion } from "framer-motion";
import { Package, FlaskConical, Globe, Truck, Factory, ShieldCheck } from "lucide-react";

const capabilities = [
  {
    icon: Package,
    title_ar: "توريد المواد الخام",
    title_en: "Raw Material Supply",
    desc: "أكثر من 430 مادة معتمدة",
  },
  {
    icon: FlaskConical,
    title_ar: "دعم فني واستشارات",
    title_en: "Technical Support",
    desc: "كيميائيون لحل مشاكل التركيبات",
  },
  {
    icon: Globe,
    title_ar: "توفير واستيراد الخامات",
    title_en: "Product Sourcing",
    desc: "مناشئ عالمية موثوقة",
  },
  {
    icon: Truck,
    title_ar: "توزيع صناعي شامل",
    title_en: "Industrial Distribution",
    desc: "توصيل للمحافظات والمناطق الصناعية",
  },
  {
    icon: Factory,
    title_ar: "حلول التصنيع للغير",
    title_en: "Private Label Solutions",
    desc: "من الفكرة إلى المنتج التام",
  },
];

export default function TrustCapabilityStrip() {
  return (
    <section className="py-7 bg-slate-50 border-b border-slate-200/80 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-slate-200/70">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`flex items-center gap-3.5 px-3 py-2 ${i > 0 ? "pt-3 md:pt-2" : ""}`}
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0 text-sky-600">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-navy-950 leading-snug">
                    {cap.title_ar}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                    {cap.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
