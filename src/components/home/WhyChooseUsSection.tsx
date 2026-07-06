"use client";

import { motion } from "framer-motion";
import { Shield, Truck, Clock, HeartHandshake, Leaf, Award } from "lucide-react";

const features = [
  { icon: Shield, title: "ضمان الجودة", desc: "جميع منتجاتنا تخضع لاختبارات جودة صارمة", color: "text-sky-500", bg: "bg-sky-50" },
  { icon: Truck, title: "شحن سريع", desc: "توصيل لجميع محافظات مصر خلال 48 ساعة", color: "text-emerald-500", bg: "bg-emerald-50" },
  { icon: Clock, title: "دعم 24/7", desc: "فريق دعم متخصص متاح على مدار الساعة", color: "text-violet-500", bg: "bg-violet-50" },
  { icon: HeartHandshake, title: "أسعار تنافسية", desc: "أفضل الأسعار مع حلول دفع مرنة ومتنوعة", color: "text-amber-500", bg: "bg-amber-50" },
  { icon: Leaf, title: "منتجات طبيعية", desc: "خامات عضوية ومعتمدة من مصادر موثوقة", color: "text-green-500", bg: "bg-green-50" },
  { icon: Award, title: "+10 سنوات خبرة", desc: "خبرة عميقة في صناعة التجميل المصرية والعربية", color: "text-rose-500", bg: "bg-rose-50" },
];

export default function WhyChooseUsSection() {
  return (
    <section className="section-padding bg-gray-50/50 relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-sky-500 font-semibold text-sm mb-2 block">لماذا ألفا بريز؟</span>
          <h2 className="section-title">ما يميزنا عن غيرنا</h2>
          <p className="section-subtitle">نسعى دائماً لتقديم أفضل تجربة لعملائنا من خلال الجودة والالتزام</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-300 group cursor-default"
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 text-lg mb-1 group-hover:text-sky-600 transition-colors">{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
