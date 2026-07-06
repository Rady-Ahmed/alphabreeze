"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FlaskConical, Factory, Atom, Package, ArrowLeft } from "lucide-react";

const services = [
  {
    icon: FlaskConical,
    title: "توريد خامات تجميل",
    description: "نوفر أجود أنواع الخامات والمواد الأولية لصناعة مستحضرات التجميل بأسعار تنافسية.",
    slug: "raw-materials",
    color: "from-sky-400 to-sky-600",
    bgColor: "bg-sky-50",
  },
  {
    icon: Factory,
    title: "تصنيع برايفت ليبل",
    description: "خدمة تصنيع كاملة باسم علامتك التجارية الخاصة من التطوير حتى التعبئة.",
    slug: "private-label",
    color: "from-navy-700 to-navy-900",
    bgColor: "bg-navy-50",
  },
  {
    icon: Atom,
    title: "تطوير التركيبات",
    description: "فريق متخصص في تطوير تركيبات مبتكرة وفعالة تناسب السوق المصري والعربي.",
    slug: "formula-development",
    color: "from-emerald-400 to-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    icon: Package,
    title: "حلول التعبئة والتغليف",
    description: "حلول تعبئة وتغليف احترافية لمنتجاتك بتصاميم عصرية وجودة عالية.",
    slug: "packaging",
    color: "from-amber-400 to-amber-600",
    bgColor: "bg-amber-50",
  },
];

export default function ServicesSection() {
  return (
    <section className="section-padding bg-gray-50/50" id="services">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sky-500 font-semibold text-sm mb-2 block">خدماتنا</span>
          <h2 className="section-title">حلول متكاملة لصناعة التجميل</h2>
          <p className="section-subtitle">
            نقدم مجموعة شاملة من الخدمات لمساعدتك في بناء وتطوير علامتك التجارية
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/services/${service.slug}`}>
                <div className="relative overflow-hidden bg-white rounded-3xl p-8 border border-sky-50 card-hover group h-full shadow-sm hover:shadow-2xl hover:shadow-sky-500/5 transition-all duration-500 z-10">
                  {/* Glowing background blob */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-5 group-hover:opacity-10 blur-2xl rounded-full transition-opacity duration-500 -z-10`} />
                  
                  <div className="flex flex-col h-full z-10 relative">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg shadow-sky-500/20`}>
                      <service.icon className="w-8 h-8 text-white drop-shadow-md" />
                    </div>
                    <h3 className="text-xl font-bold text-navy-900 mb-3 group-hover:text-sky-600 transition-colors">{service.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-grow">{service.description}</p>
                    
                    <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                      <span className="text-sky-500 text-sm font-bold flex items-center gap-2 group-hover:translate-x-[-4px] transition-transform">
                        تفاصيل الخدمة
                        <ArrowLeft className="w-4 h-4 opacity-0 -mr-4 group-hover:opacity-100 group-hover:mr-0 transition-all duration-300" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
