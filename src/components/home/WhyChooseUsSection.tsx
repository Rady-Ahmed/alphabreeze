"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Truck, Clock, Layers, Sparkles, Award } from "lucide-react";

const b2bAdvantages = [
  {
    icon: ShieldCheck,
    title: "ضمان النقاء ومطابقة المواصفات",
    desc: "جميع الخامات مستوردة من مصادر معتمدة دولياً ومرفقة بشهادات تحليل مخبرية (COA) وصحائف أمان (MSDS).",
    color: "text-sky-500",
    bg: "bg-sky-50",
  },
  {
    icon: Layers,
    title: "مرونة أحجام التوريد الصناعي",
    desc: "نلبي متطلبات معامل R&D بدءاً من عبوات 1 كجم للتجارب، وحتى براميل 200 كجم وكونتينرات لخطوط الإنتاج.",
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
  {
    icon: Sparkles,
    title: "استشارات كيميائية وتطوير تركيبات",
    desc: "دعم فني متخصص من كيميائيين ذوي خبرة لحل مشاكل اللزوجة، الثبات، الاستحلاب، وتطوير بدائل فعالة.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    icon: Truck,
    title: "لوجستيات وشحن صناعي آمن",
    desc: "شبكة نقل وتوصيل سريعة ومجهزة للمواد الكيميائية تغطي جميع المناطق والمجمعات الصناعية في مصر خلال 24-48 ساعة.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: Clock,
    title: "استقرار التوريد وعقود التوريد الدوري",
    desc: "عقود توريد سنوية تضمن تثبيت الأسعار واستمرارية تدفق المواد الخام دون انقطاع لخطوط تصنيعك.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: Award,
    title: "خبرة +10 سنوات في السوق الكيميائي",
    desc: "فهم عميق لاحتياجات مصانع التجميل المصرية، اشتراطات هيئة الدواء (EDA)، وتطور متطلبات المستهلك النهائي.",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden" id="why-choose-us">
      {/* Background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-50/70 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50/70 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sky-600 font-bold text-xs uppercase tracking-wider mb-2 block">
            المزايا التنافسية لشركة ألفا بريز
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 mb-4 tracking-tight">
            لماذا تختار كبرى المصانع والشركات الشراكة معنا؟
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            نجمع بين القوة الاستيرادية، الموثوقية المخبرية، والدعم الفني الكيميائي المتخصص لتمكين علامتك التجارية من المنافسة والتوسع.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {b2bAdvantages.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="bg-slate-50/80 rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:bg-white hover:border-sky-300 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300`}
                >
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-navy-950 text-base mb-2 group-hover:text-sky-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
