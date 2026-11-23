"use client";

import { motion } from "framer-motion";
import { FileCheck, ShieldAlert, Award, Microscope, Database, ThermometerSnowflake, CheckCircle2 } from "lucide-react";

const assurancePillars = [
  {
    icon: FileCheck,
    title: "شهادات تحليل مخبرية (COA) لكل دفعة",
    desc: "توثيق مخبري رسمي صادر مع كل تشغيلة يوضح نسب النقاء الفعلي، الكثافة، معامل الانكسار، درجة الانصهار، والرقم الهيدروجيني pH.",
    code: "COA-VERIFIED",
  },
  {
    icon: ShieldAlert,
    title: "صحائف بيانات سلامة المواد (SDS / MSDS)",
    desc: "وثائق أمان شاملة متوافقة مع النظام العالمي الموحد لتصنيف المواد الكيميائية (GHS) تحدد تعليمات المناولة والتخزين الآمن.",
    code: "GHS-COMPLIANT",
  },
  {
    icon: Database,
    title: "نظام تتبع أرقام التشغيلات (Batch Tracking)",
    desc: "أرشفة رقمية دقيقة لكافة أرقام اللوت (Lot Numbers) وسلاسل الإمداد لضمان التتبع الكامل من بلد المنشأ حتى خط إنتاج المصنع.",
    code: "LOT-TRACEABLE",
  },
  {
    icon: ThermometerSnowflake,
    title: "مستودعات تخزين صناعية معيارية",
    desc: "مخازن مجهزة وفق اشتراطات الرقابة على درجات الحرارة والرطوبة لحماية المواد الفعالة والزيوت من الأكسدة أو التحلل.",
    code: "CLIMATE-CONTROLLED",
  },
  {
    icon: Award,
    title: "مطابقة درجات الدساتير الدوائية (USP / BP)",
    desc: "خامات مستوردة مطابقة لاشتراطات الدساتير الصيدلانية وهيئة الدواء المصرية (EDA) ومصرح بها للاستخدام التجميلي والدوائي.",
    code: "PHARMA-COSMETIC",
  },
  {
    icon: Microscope,
    title: "عينات اختبار معملية مسبقة (Pre-order Samples)",
    desc: "نوفر لفرق الـ R&D عينات معملية للتشغيل التجريبي واختبارات الثبات والاستقرار قبل اعتماد أوامر الشراء الصناعية الكبرى.",
    code: "LAB-TESTED",
  },
];

export default function TechnicalAssuranceSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white relative overflow-hidden" id="quality">
      {/* Background Tech Grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(56, 189, 248, 0.4) 1px, transparent 0)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/25 text-sky-300 text-xs font-bold mb-4">
            <span>منظومة الرقابة والتوثيق المخبري</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4">
            معايير الجودة والاعتماد الفني
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            نلتزم بأعلى معايير المطابقة الكيميائية والصيدلانية لضمان أمان منتجاتكم وثباتها في الأسواق.
          </p>
        </div>

        {/* Structured 6 Technical Panels */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assurancePillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="p-7 rounded-3xl bg-white/5 border border-white/10 hover:border-sky-400/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/15 text-sky-400 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono text-sky-300 bg-navy-950/80 px-2 py-0.5 rounded-md border border-sky-400/20">
                      {item.code}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2.5 group-hover:text-sky-300 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-white/10 flex items-center gap-2 text-[11px] text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>معتمد وموثق رسمياً</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
