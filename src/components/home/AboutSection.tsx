"use client";

import { motion } from "framer-motion";
import { Users, Package, Award, CheckCircle } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "عملاء سعداء", color: "from-sky-400 to-sky-600" },
  { icon: Package, value: "200+", label: "منتج متوفر", color: "from-blue-400 to-blue-600" },
  { icon: Award, value: "10+", label: "سنوات خبرة", color: "from-navy-700 to-navy-900" },
  { icon: CheckCircle, value: "1000+", label: "مشروع مكتمل", color: "from-emerald-400 to-emerald-600" },
];

export default function AboutSection() {
  return (
    <section className="section-padding bg-white" id="about">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sky-500 font-semibold text-sm mb-2 block">عن Alpha Breeze</span>
            <h2 className="section-title">
              شريك التوريد الصناعي المعتمد{" "}
              <span className="text-gradient">لمصانع ومعامل التجميل</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              شركة <strong>Alpha Breeze</strong> متخصصة في استيراد وتوريد المواد الخام الكيميائية والمكونات الفعالة التي تدخل في تصنيع مستحضرات العناية بالبشرة، الشعر، الكريمات، السيروم، ومنتجات العناية الشخصية. 
              نخدم بالأساس مصانع مستحضرات التجميل، معامل التركيبات الكيميائية، الكيميائيين ومطوري التركيبات (Formulators)، وأصحاب العلامات التجارية.
            </p>
            <p className="text-gray-600 leading-relaxed">
              نوفر خامات عالية النقاء مطابقة للاشتراطات القياسية، مرفقة بشهادات التحليل المعتمدة (COA) وصحائف بيانات السلامة (MSDS)، مع تقديم الدعم الفني وحلول التصنيع لحساب الغير (Private Label) لدعم قطاع الصناعة الدوائية والتجميلية في مصر.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6 relative"
          >
            {/* Background glowing blob for the stats section */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sky-200 opacity-20 blur-[100px] rounded-full -z-10" />
            
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.1 }}
                className="relative bg-white/60 backdrop-blur-xl border border-white shadow-xl shadow-sky-500/5 rounded-3xl p-6 text-center group overflow-hidden"
              >
                {/* Shine effect */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg`}>
                  <stat.icon className="w-7 h-7 text-white drop-shadow-md" />
                </div>
                <p className="text-3xl lg:text-4xl font-extrabold text-navy-900 mb-2 group-hover:text-sky-600 transition-colors tracking-tight">{stat.value}</p>
                <p className="text-sm font-semibold text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
