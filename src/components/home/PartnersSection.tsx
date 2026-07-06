"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "BioPharma", type: "خامات طبية", initials: "BP" },
  { name: "NatureCos", type: "مستخلصات طبيعية", initials: "NC" },
  { name: "AromaTech", type: "زيوت عطرية", initials: "AT" },
  { name: "PureChem", type: "كيماويات نقية", initials: "PC" },
  { name: "DermaLab", type: "عناية بالبشرة", initials: "DL" },
  { name: "EcoPack", type: "تعبئة وتغليف", initials: "EP" },
];

export default function PartnersSection() {
  return (
    <section className="py-20 bg-white" id="partners">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sky-500 font-semibold text-sm mb-2 block tracking-wider uppercase">شركاؤنا</span>
          <h2 className="section-title">شركاء النجاح</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mt-4 text-sm md:text-base">نفتخر بالتعاون مع كبرى الشركات والمختبرات العالمية لضمان تقديم أعلى معايير الجودة لعملائنا.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col items-center justify-center p-6 rounded-3xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-sky-500/10 hover:border-sky-100 transition-all duration-300 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300">
                <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-br from-sky-600 to-navy-900">{partner.initials}</span>
              </div>
              <h3 className="font-bold text-navy-900 text-sm mb-1">{partner.name}</h3>
              <p className="text-[10px] text-gray-400 font-medium">{partner.type}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
