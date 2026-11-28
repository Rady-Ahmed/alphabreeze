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
    <section className="py-6 sm:py-8 bg-slate-50 border-b border-slate-200/80 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                className="group flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/80 hover:bg-white border border-slate-200/70 hover:border-sky-300 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0 text-sky-600 group-hover:bg-sky-500 group-hover:text-white group-hover:scale-105 transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-navy-950 leading-snug group-hover:text-sky-700 transition-colors">
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
