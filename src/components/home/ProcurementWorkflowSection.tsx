"use client";

import { motion } from "framer-motion";
import { FileText, Send, CheckCircle, Truck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "اختيار الخامات وإرسال طلب التسعير (RFQ)",
    desc: "حدد المواد الخام المطلوبة والكميات (بالكيلوجرام أو البراميل أو الأطنان) عبر المتجر أو التواصل المباشر مع مهندسي المبيعات.",
  },
  {
    number: "02",
    icon: Send,
    title: "استلام عرض السعر والمواصفات الفنية (COA)",
    desc: "نرسل لكم عرض سعر رسمي تفصيلي شامل تواريخ الصلاحية، بلد المنشأ، وشهادات التحليل المعملي (COA) و(MSDS).",
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "اعتماد العينات وتأكيد أمر الشراء (PO)",
    desc: "إرسال عينات تشغيلية للمعمل للتأكد من مطابقتها لخط الإنتاج، ثم تأكيد أمر التوريد والاتفاق على جدول التسليم.",
  },
  {
    number: "04",
    icon: Truck,
    title: "التعبئة الصناعية والشحن اللوجستي الآمن",
    desc: "تجهيز الشحنة وفق شروط المناولة الكيميائية الآمنة والتوصيل المباشر لمستودع مصنعك في أي محافظة خلال 24 - 48 ساعة.",
  },
];

export default function ProcurementWorkflowSection() {
  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden" id="procurement-steps">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200 text-xs font-bold mb-4">
            <span>دورة التوريد الصناعي للمصانع والشركات</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 mb-4 tracking-tight">
            كيف نعمل مع مصنعك خطوة بخطوة؟
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            إجراءات تعاقد وتوريد سريعة وشفافة تضمن عدم توقف خطوط إنتاجكم ووصول خامات مطابقة بنسبة 100%.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black font-mono text-sky-500/20">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-navy-950 mb-3 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center text-xs font-semibold text-sky-600">
                  <span>المرحلة {step.number}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Direct Action */}
        <div className="mt-12 text-center">
          <a
            href="https://wa.me/201019946409?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D9%86%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A5%D8%B1%D8%B3%D8%A7%D9%84%20%D9%82%D8%A7%D8%A6%D9%85%D8%A9%20%D8%A7%D8%AD%D8%AA%D9%8A%D8%A7%D8%AC%D8%A7%D8%AA%20%D8%AE%D8%A7%D9%85%D8%A7%D8%AA%20(RFQ)%20%D9%84%D9%85%D8%B5%D9%86%D8%B9%D9%86%D8%A7"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-navy-950 hover:bg-navy-900 text-white font-bold px-8 h-12 rounded-xl shadow-md">
              أرسل قائمة احتياجات مصنعك الآن عبر واتساب
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
