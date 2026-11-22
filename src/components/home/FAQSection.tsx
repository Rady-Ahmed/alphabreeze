"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";

const b2bFaqs = [
  {
    q: "ما هو الحد الأدنى للطلب (MOQ) للخامات الكيميائية ومكونات التجميل؟",
    a: "نراعي التدرج الإنتاجي لعملائنا؛ حيث نوفر عبوات معملية تبدأ من 1 كجم لمعامل الـ R&D والتجارب المعملية، وعبوات نصف جملة (5 إلى 25 كجم)، وحتى براميل صناعية كاملة (200 كجم) وكونتينرات وأطنان للمصانع الكبرى.",
  },
  {
    q: "هل ترفقون شهادات التحليل المخبري (COA) وصحائف بيانات الأمان (MSDS) مع كل شحنة؟",
    a: "نعم، بشكل إلزامي ورسمي. كل مادة خام يتم توريدها يرفق معها شهادة تحليل فني معتمدة (Certificate of Analysis) مطابقة لرقم التشغيلة (Batch Number)، بالإضافة إلى صحيفة أمان المواد (MSDS/SDS) متوافقة مع معايير GHS واشتراطات هيئة الدواء المصرية.",
  },
  {
    q: "هل يمكن لمصنعنا أو معملنا طلب عينات تشغيلية قبل التعاقد التجاري؟",
    a: "بالتأكيد. نوفر خدمة إرسال عينات معملية (Pre-production Samples) لمطابقتها مع مواصفات خطوط الإنتاج وإجراء اختبارات الثبات والتوافقية اللازمة قبل إصدار أمر الشراء النهائي.",
  },
  {
    q: "كيف تضمنون استقرار وثبات مواصفات الخامات من دفعة إلى أخرى؟",
    a: "نستورد خاماتنا من كبرى المصانع الكيميائية العالمية وفق عقود ومعايير مواصفات ثابتة، ونعتمد نظام تتبع أرقام التشغيلات (Lot Numbers)، مع التخزين في مستودعات نموذجية مكيفة ومضبوطة الرطوبة لحماية الخامات من أي تحلل أو تأكسد.",
  },
  {
    q: "ما هي مدة التوريد المعتادة وإمكانات الشحن للمحافظات والمناطق الصناعية؟",
    a: "نحتفظ بمخزون استراتيجي في مستودعاتنا بالقاهرة لتسليم الطلبيات الفورية خلال 24 ساعة في نطاق القاهرة الكبرى، وخلال 48 ساعة كحد أقصى لكافة المجمعات والمناطق الصناعية في محافظات الجمهورية عبر أسطول شحن لوجستي آمن.",
  },
  {
    q: "هل توفرون الدعم الفني لحل مشاكل التركيبات واستبدال الخامات النادرة؟",
    a: "نعم، يضم فريقنا كيميائيين ومطوري تركيبات متخصصين يقدمون استشارات فنية لحل مشاكل اللزوجة، الترسيب، الانفصال، واقتراح بدائل كيميائية عالية الفاعلية موفرة للتكلفة ومطابقة للاشتراطات.",
  },
  {
    q: "كيف نحصل على عرض سعر رسمي (RFQ) أو نبرم عقد توريد دوري؟",
    a: "يمكنك إرسال قائمة الخامات المطلوبة والكميات مباشرة عبر موقعنا، أو التواصل عبر واتساب الرسمي (01119446474) أو البريد الإلكتروني، وسيصلك عرض سعر فني وتجاري رسمي مفصل خلال ساعات.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden" id="faq">
      <div className="container mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-sky-600 font-bold text-xs uppercase tracking-wider mb-2 block">
            الأسئلة الشائعة للمصانع والشركات
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 mb-4 tracking-tight">
            كل ما تحتاج معرفته حول إجراءات التوريد والتعاقد
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            إجابات واضحة ومباشرة تلبي استفسارات مسؤولي المشتريات، مديري الإنتاج، وكيميائيي التطوير.
          </p>
        </motion.div>

        <div className="space-y-3.5">
          {b2bFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:border-sky-300 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-right hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-center gap-3.5 pl-4">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-navy-950 text-sm sm:text-base leading-snug">
                    {faq.q}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180 text-sky-600" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-6 pt-1 text-slate-600 leading-relaxed text-xs sm:text-sm border-t border-slate-100 pr-16">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact fallback */}
        <div className="mt-12 text-center p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-right">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-navy-950">هل لديك استفسار فني خاص بمصنعك؟</h4>
              <p className="text-xs text-slate-500">فريقنا الكيميائي جاهز للرد على كافة أسئلتكم ومراجعة قوائم الخامات.</p>
            </div>
          </div>
          <a
            href="https://wa.me/201119446474?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D9%84%D8%AF%D9%8A%20%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D9%81%D9%86%D9%8A%20%D8%AD%D9%88%D9%84%20%D8%AE%D8%A7%D9%85%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AA%D8%AC%D9%85%D9%8A%D9%84"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 px-5 py-2.5 rounded-xl shrink-0 transition-colors shadow-sm"
          >
            تحدث مع استشاري كيميائي
          </a>
        </div>
      </div>
    </section>
  );
}
