"use client";

import { motion } from "framer-motion";
import { Building2, Package, Award, CheckCircle2, FlaskConical, FileCheck2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Package, value: "+430", label: "مادة خام كيميائية مسجلة", color: "from-sky-500 to-sky-700" },
  { icon: Building2, value: "+350", label: "مصنع ومعمل مستحضرات نخدمه", color: "from-blue-600 to-indigo-800" },
  { icon: FileCheck2, value: "100%", label: "شهادات تحليل COA و MSDS", color: "from-emerald-500 to-teal-700" },
  { icon: Award, value: "+10", label: "سنوات خبرة في التوريد الصناعي", color: "from-navy-800 to-navy-950" },
];

export default function AboutSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden" id="about">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Content (Right in RTL) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold mb-4">
                <span>عن شركة ألفا بريز للكيماويات</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-navy-950 mb-6 leading-tight">
                الشريك الصناعي المعتمد لتوريد المواد الخام{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-800">
                  لمصانع ومعامل التجميل
                </span>
              </h2>

              <p className="text-slate-600 leading-relaxed mb-5 text-sm sm:text-base">
                تأسست شركة <strong>Alpha Breeze Chemicals</strong> لتكون حلقة الوصل الموثوقة بين كبرى المجمعات الكيميائية العالمية ومصانع مستحضرات التجميل، المنظفات، ومعامل التركيبات الصيدلانية في مصر والشرق الأوسط.
              </p>

              <p className="text-slate-600 leading-relaxed mb-6 text-sm sm:text-base">
                نتميز بامتلاك كتالوج استيرادي واسع يضم أكثر من <strong>430 مادة خام معتمدة</strong> تغطي الزيوت الطبيعية والمستخلصات النباتية، البودرات الفعالة، المذيبات، السيليكونات، الفيتامينات، الشموع، الألوان التجميلية والمايكا، والعطور المركزة. جميع وارداتنا تخضع للرقابة المخبرية الدقيقة ومرفقة بملفات التحليل الفني (COA) وصحائف الأمان (MSDS).
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>توفير بدائل استيرادية موفرة للتكلفة</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>دعم كامل لكيميائيي التطوير والتركيبات</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>جاهزية لملفات تسجيل هيئة الدواء (EDA)</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>شحن سريع لجميع المناطق الصناعية بمصر</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link href="/about">
                  <Button variant="outline" className="border-navy-900 text-navy-950 hover:bg-navy-50 font-bold px-6 h-11 rounded-xl text-xs">
                    المزيد عن الشركة ومستودعاتنا
                    <ArrowLeft className="w-3.5 h-3.5 mr-2" />
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-6 h-11 rounded-xl text-xs shadow-md">
                    استكشاف كتالوج الخامات (+430 مادة)
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Stats Grid (Left in RTL) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-sky-300 hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center justify-center group"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-md`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-2xl sm:text-3xl font-black text-navy-950 font-mono tracking-tight mb-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-500 font-medium leading-snug">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
