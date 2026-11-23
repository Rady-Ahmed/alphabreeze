"use client";

import { motion } from "framer-motion";
import { Package, FlaskConical, Globe2, Layers, Headphones, ShieldCheck } from "lucide-react";

const strengths = [
  {
    icon: Package,
    title_ar: "شمولية الكتالوج الصناعي (+430 مادة)",
    title_en: "Comprehensive Product Range",
    desc: "تغطية كاملة لاحتياجات مصانع التجميل من الزيوت، المستخلصات، البودرات الفعالة، المذيبات، السيليكونات، الفيتامينات، الشموع، والألوان.",
  },
  {
    icon: FlaskConical,
    title_ar: "دعم فني كيميائي وتطبيقي متخصص",
    title_en: "Formulation Technical Support",
    desc: "فريق من الكيميائيين ومطوري المنتجات لمساعدتك في ضبط اللزوجة، التوافقية، الاستحلاب، واقتراح بدائل كيميائية موفرة للتكلفة.",
  },
  {
    icon: Globe2,
    title_ar: "قدرات استيراد وسلاسل إمداد عالمية",
    title_en: "Global Sourcing Capabilities",
    desc: "استيراد مباشر من كبرى المجمعات الكيميائية في ألمانيا، فرنسا، إسبانيا، إيطاليا، ماليزيا، والصين بشهادات منشأ وتحليل رسمية.",
  },
  {
    icon: Layers,
    title_ar: "مرونة أحجام التوريد وكميات التشغيل",
    title_en: "Supply Volume Flexibility",
    desc: "نوفر عبوات اختبار معملية من 1 كجم لمعامل الـ R&D، وعبوات نصف جملة (25 كجم)، وحتى براميل 200 كجم وأطنان لخطوط الإنتاج الكبرى.",
  },
  {
    icon: Headphones,
    title_ar: "خدمة عملاء ومتابعة لوجستية للمصانع",
    title_en: "Dedicated B2B Support",
    desc: "مسؤول مبيعات مخصص لمصنعك يتابع معك احتياجات المخزون الدوري وجداول التسليم الفوري لمنع أي انقطاع في التشغيل.",
  },
  {
    icon: ShieldCheck,
    title_ar: "ثبات الجودة والالتزام بالاشتراطات (EDA)",
    title_en: "Quality Consistency & Compliance",
    desc: "خامات مطابقة للمواصفات القياسية المصرية وتسهيل كامل لملفات الترخيص والتسجيل لدى هيئة الدواء المصرية.",
  },
];

export default function WhyAlphaBreezeSection() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden" id="why-us">
      <div className="container mx-auto px-4">
        
        {/* Editorial Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-100 text-navy-900 border border-navy-200 text-xs font-bold mb-4">
            <span>القيمة المضافة والشراكة المستدامة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight leading-tight mb-4">
            لماذا يختار مصنعك شركة ألفا بريز؟
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            نجمع بين القوة الاستيرادية والتوافق المخبري والدعم التطبيقي لتمكين خطوط إنتاجكم من المنافسة بأعلى جودة وأفضل تكلفة.
          </p>
        </div>

        {/* 6 Editorial Strength Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strengths.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5 group-hover:bg-navy-950 group-hover:text-white transition-colors duration-300 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-navy-950 mb-1 group-hover:text-sky-600 transition-colors">
                    {s.title_ar}
                  </h3>
                  <p className="text-[10px] font-mono text-slate-400 mb-3 uppercase tracking-wider">
                    {s.title_en}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {s.desc}
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
