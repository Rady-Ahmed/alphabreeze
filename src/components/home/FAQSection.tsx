"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  { q: "ما هي الحد الأدنى لكمية الطلب؟", a: "يختلف الحد الأدنى حسب نوع المنتج والخدمة المطلوبة. تواصل معنا لمعرفة التفاصيل." },
  { q: "هل تقدمون خدمة التصنيع بالعلامة التجارية الخاصة؟", a: "نعم، نقدم خدمة تصنيع برايفت ليبل كاملة تشمل التطوير والتصنيع والتعبئة والتغليف." },
  { q: "ما هي مدة التسليم المتوقعة؟", a: "تعتمد مدة التسليم على حجم الطلب ونوع المنتج، عادة ما تتراوح بين 7 إلى 21 يوم عمل." },
  { q: "هل يمكنني طلب عينات قبل الطلب بالجملة؟", a: "بالتأكيد، نوفر عينات لمعظم منتجاتنا لتقييمها قبل الشراء بالكميات." },
  { q: "هل تشحنون لجميع المحافظات؟", a: "نعم، نقوم بالشحن لجميع محافظات مصر مع خيارات شحن متعددة." },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-gray-50/50" id="faq">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sky-500 font-semibold text-sm mb-2 block">الأسئلة الشائعة</span>
          <h2 className="section-title">أسئلة متكررة</h2>
          <p className="section-subtitle">إجابات على أكثر الأسئلة شيوعاً</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-right hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-sky-500 shrink-0" />
                  <span className="font-semibold text-navy-900">{faq.q}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-5 pr-14 text-gray-600 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
