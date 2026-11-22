"use client";

import { motion } from "framer-motion";
import { Globe2, Award, ShieldCheck, Factory, CheckCircle2 } from "lucide-react";

const origins = [
  { country: "ألمانيا", desc: "خامات فعالة وبوليمرات استحلاب فائقة النقاء", flag: "🇩🇪", grade: "USP / EP Grade" },
  { country: "فرنسا", desc: "عطور وزيوت عطرية مركزة ومستخلصات نباتية", flag: "🇫🇷", grade: "IFRA Standards" },
  { country: "إسبانيا", desc: "زيوت نباتية عضوية ومستخلصات البحر المتوسط", flag: "🇪🇸", grade: "Ecocert / Bio" },
  { country: "إيطاليا", desc: "مكونات تجميلية نشطة وسلسلة سيليكونات متطورة", flag: "🇮🇹", grade: "Cosmetic Grade" },
  { country: "كوريا واليابان", desc: "مستخلصات التفتيح المبتكرة وأحماض الهيالورونيك", flag: "🇰🇷", grade: "K-Beauty Tech" },
  { country: "الهند ومصر", desc: "زيوت خام طبيعية نقية وأعشاب طبية وتوابل عطرية", flag: "🇪🇬", grade: "Pure Natural" },
];

export default function PartnersSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden" id="partners">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="text-sky-600 font-bold text-xs uppercase tracking-wider mb-2 block">
            سلاسل الإمداد العالمية
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 mb-4 tracking-tight">
            مناشئ استيراد معتمدة من كبرى المصانع الكيميائية
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            نستورد خاماتنا مباشرة من أرقى المنتجين والمختبرات العالمية المعتمدة لضمان أقصى درجات الثبات والفاعلية لمنتجاتكم.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {origins.map((origin, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group flex flex-col justify-between p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:shadow-xl hover:border-sky-300 transition-all duration-300 text-center"
            >
              <div>
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                  {origin.flag}
                </div>
                <h3 className="font-bold text-navy-950 text-base mb-1">{origin.country}</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-3">{origin.desc}</p>
              </div>
              <div className="pt-2 border-t border-slate-200/60">
                <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">
                  {origin.grade}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
