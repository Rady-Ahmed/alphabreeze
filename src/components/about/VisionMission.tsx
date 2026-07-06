"use client";

import { motion } from "framer-motion";
import { Eye, Target, Rocket } from "lucide-react";

const items = [
  {
    icon: Eye,
    title: "رؤيتنا",
    description: "أن نكون الشركة الرائدة في صناعة وتوريد خامات ومستحضرات التجميل في الشرق الأوسط وأفريقيا.",
    color: "from-sky-400 to-sky-600",
  },
  {
    icon: Target,
    title: "مهمتنا",
    description: "تمكين رواد الأعمال والمصنعين من بناء علامات تجارية ناجحة من خلال توفير أجود الخامات وأفضل الخدمات.",
    color: "from-navy-700 to-navy-900",
  },
  {
    icon: Rocket,
    title: "أهدافنا",
    description: "التوسع المستمر، الابتكار في التركيبات، تقديم حلول متكاملة، ودعم نمو عملائنا بكل الطرق الممكنة.",
    color: "from-emerald-400 to-emerald-600",
  },
];

export default function VisionMission() {
  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="section-title">رؤيتنا ومهمتنا</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 text-center card-hover"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-5 shadow-lg`}>
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
