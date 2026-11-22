"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  Scissors,
  HeartPulse,
  Droplets,
  Wine,
  Cookie,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

const sectors = [
  {
    icon: Sparkles,
    title: "مستحضرات العناية بالبشرة (Skin Care)",
    description: "خامات تصنيع كريمات الترطيب، سيرومات الهيالورونيك وفيتامين سي، غسول الوجه، مقشرات الأحماض، وواقيات الشمس.",
    highlights: ["أحماض تقشير (AHA/BHA)", "مستحلبات تجميلية (BTMS/EWAX)", "مضادات أكسدة وتفتيح"],
    categorySlug: "raw-powders-and-actives",
  },
  {
    icon: Scissors,
    title: "منتجات العناية بالشعر (Hair Care)",
    description: "مواد تصنيع شامبوهات خالية من السلفات، حمامات كريم، بلسمات معالجة، سيروم السيليكون، ومعالجات الفيلر والبروتين.",
    highlights: ["سلسلة سيليكونات متخصصة", "بوليمرات تثبيت وترطيب (Polyquaternium)", "زيوت معالجة طبيعية"],
    categorySlug: "chemical-liquids-and-solvents",
  },
  {
    icon: HeartPulse,
    title: "المستحضرات الطبية التجميلية (Cosmeceuticals)",
    description: "خامات لمعامل التركيبات والمستحضرات العلاجية الموجهة لأطباء الجلدية، الصيدليات، والمراكز التخصصية.",
    highlights: ["سالسيلك أسيد ويوريا تجميلية", "ليدوكاين HCL وبيز", "زنك بيريثيون وكليمبازول"],
    categorySlug: "raw-powders-and-actives",
  },
  {
    icon: Droplets,
    title: "الصابون والمنظفات ومستحضرات النظافة",
    description: "خامات المنظفات السائلة، الصابون الطبي والصلب، الشاور جل، والمطهرات مع عوامل رغوة فائقة الثبات.",
    highlights: ["تكسابون جل وبودر وسلفونيك", "كمبرلان وبيتائين BB4", "جلسرين نقي وزيوت صابون"],
    categorySlug: "chemical-liquids-and-solvents",
  },
  {
    icon: Wine,
    title: "العطور ومعطرات الجو والبودي ميست",
    description: "زيوت عطرية فرنسية وشرقية مركزة خالية من الكحول وثابتة التركيز، مثبتات عطرية، وكحوليات نقية.",
    highlights: ["زيوت عطرية فائقة الثبات", "مثبتات عطرية (DPG)", "بدائل عطور عالمية"],
    categorySlug: "fragrances-and-scents",
  },
  {
    icon: Cookie,
    title: "منتجات الشفاه والنكهات التجميلية والغذائية",
    description: "نكهات وألوان غذائية مصرح بها لمرطبات الشفاه (Lip Balm)، معاجين الأسنان، والصناعات الغذائية الخفيفة.",
    highlights: ["نكهات كامينا زيتية معتمدة", "ألوان غذائية مطابقة للمواصفات", "شمع عسل نقي وفاخر"],
    categorySlug: "flavors",
  },
];

export default function IndustrySectorsSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden" id="industry-sectors">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-50 text-navy-900 border border-navy-100 text-xs font-bold mb-4">
            <span>القطاعات والصناعات المخدومة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 mb-4 tracking-tight">
            حلول توريد مصممة خصيصاً لخطوط الإنتاج والمعامل
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            نغطي احتياجات مصانع مستحضرات التجميل، شركات التصنيع التعاقدي، ومعامل التركيبات الدوائية بأعلى معايير المطابقة الفنية.
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector, index) => {
            const Icon = sector.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group p-7 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-sky-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-5 group-hover:bg-navy-950 group-hover:text-white transition-colors duration-300 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-950 mb-2 group-hover:text-sky-600 transition-colors">
                    {sector.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    {sector.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {sector.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/shop?category=${sector.categorySlug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-sky-600 group-hover:text-navy-950 transition-colors pt-4 border-t border-slate-200/60"
                >
                  <span>استكشاف الخامات المخصصة لهذا القطاع</span>
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
