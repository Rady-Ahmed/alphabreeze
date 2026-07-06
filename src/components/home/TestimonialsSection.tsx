"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "أحمد محمد",
    company: "كوزمتكس برو",
    content: "تعاملنا مع ألفا بريز من أكثر من 3 سنوات والجودة والالتزام دائماً على أعلى مستوى. شريك حقيقي في نجاحنا.",
    rating: 5,
  },
  {
    name: "سارة أحمد",
    company: "بيوتي لاين",
    content: "خدمة التصنيع بالعلامة الخاصة كانت ممتازة. الفريق ساعدنا من البداية حتى إطلاق المنتج في السوق.",
    rating: 5,
  },
  {
    name: "محمد علي",
    company: "نيتشر كير",
    content: "أفضل مورد خامات تجميل في مصر. الأسعار تنافسية والجودة عالية جداً. أنصح الجميع بالتعامل معهم.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-white" id="testimonials">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sky-500 font-semibold text-sm mb-2 block">آراء عملائنا</span>
          <h2 className="section-title">ماذا يقول عملاؤنا</h2>
          <p className="section-subtitle">ثقة عملائنا هي أكبر شهادة على جودة خدماتنا</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ y: -5, rotateX: 2, rotateY: 2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-sky-50 shadow-sm hover:shadow-2xl hover:shadow-sky-500/10 group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-100 opacity-20 blur-3xl rounded-full group-hover:bg-sky-400 group-hover:opacity-10 transition-colors duration-500" />
                <Quote className="w-10 h-10 text-sky-500/10 absolute top-8 left-8 group-hover:scale-110 group-hover:text-sky-500/20 transition-all duration-500" />
                
                <div className="flex gap-1 mb-6 relative z-10">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 + i * 0.1 }}>
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-sm" />
                    </motion.div>
                  ))}
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-8 relative z-10 font-medium">
                  &quot;{testimonial.content}&quot;
                </p>
                
                <div className="flex items-center gap-4 border-t border-sky-50 pt-6 relative z-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-sky-400 blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-navy-700 flex items-center justify-center text-white font-bold text-lg relative z-10 border-2 border-white shadow-md">
                      {testimonial.name[0]}
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-navy-900 text-sm group-hover:text-sky-600 transition-colors">{testimonial.name}</p>
                    <p className="text-xs text-sky-500 font-medium">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
