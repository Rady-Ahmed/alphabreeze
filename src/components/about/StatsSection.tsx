"use client";

import { motion } from "framer-motion";
import { Users, Package, Award, CheckCircle } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "عملاء سعداء", color: "text-sky-500", bg: "bg-sky-100" },
  { icon: Package, value: "200+", label: "منتج متوفر", color: "text-blue-500", bg: "bg-blue-100" },
  { icon: Award, value: "10+", label: "سنوات خبرة", color: "text-navy-700", bg: "bg-navy-100" },
  { icon: CheckCircle, value: "1000+", label: "مشروع مكتمل", color: "text-emerald-500", bg: "bg-emerald-100" },
];

export default function StatsSection() {
  return (
    <section className="py-20 gradient-accent relative overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)", backgroundSize: "30px 30px" }} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className={`w-14 h-14 rounded-2xl ${s.bg} flex items-center justify-center mx-auto mb-4`}>
                <s.icon className={`w-7 h-7 ${s.color}`} />
              </div>
              <p className="text-4xl font-bold text-white mb-1">{s.value}</p>
              <p className="text-white/60 text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
