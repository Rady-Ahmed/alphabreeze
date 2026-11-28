"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { getArticles } from "@/lib/db";

const DEFAULT_ARTICLES = [
  {
    id: "1",
    title: "أفضل الممارسات في اختيار مستحلبات مستحضرات التجميل (BTMS vs EWAX)",
    category: "كيمياء التركيبات",
    excerpt: "مقارنة معملية دقيقة بين مستحلبات الكريمات وحمامات الكريم الشمعية وأثرها على ملمس وثبات المستحضر التجميلي.",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop",
    date: "2024",
    readTime: "4 دقائق قراءة",
  },
  {
    id: "2",
    title: "أهمية شهادات التحليل المخبري (COA) في تسجيل المنتجات بهيئة الدواء المصرية",
    category: "الرقابة والجودة",
    excerpt: "كيفية قراءة ومراجعة نسب النقاء، الرقم الهيدروجيني، ومحددات المعادن الثقيلة قبل اعتماد التشغيلة الصناعية.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop",
    date: "2024",
    readTime: "5 دقائق قراءة",
  },
  {
    id: "3",
    title: "سلسلة السيليكونات التجميلية: الفروق التطبيقية بين لزوجات 350 و 1501 و CPS",
    category: "تطوير المنتجات",
    excerpt: "دليل الكيميائي لاختيار نوع السيليكون المناسب لسيروم الشعر الخفيف، الكريمات غير الدهنية، ومستحضرات الحماية.",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800&auto=format&fit=crop",
    date: "2024",
    readTime: "6 دقائق قراءة",
  },
];

export default function ArticlesSection() {
  const [articles, setArticles] = useState<any[]>(DEFAULT_ARTICLES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      try {
        const fetched = await getArticles(true);
        if (fetched && fetched.length > 0) {
          const mapped = fetched.slice(0, 3).map((a: any) => ({
            ...a,
            id: String(a.id),
            title: a.title_ar || a.title,
            category: typeof a.category === "object" && a.category ? a.category.name_ar : a.category || "مقالات فنية",
            excerpt: a.excerpt || a.excerpt_ar || (a.content_ar ? a.content_ar.substring(0, 110) + "..." : "اقرأ المزيد..."),
            image: a.featured_image || a.og_image_url || a.image_url || a.image || DEFAULT_ARTICLES[0].image,
            readTime: a.reading_time || "4 دقائق قراءة",
            date: a.published_at || a.created_at ? new Date(a.published_at || a.created_at).toLocaleDateString("ar-EG") : "2024",
          }));
          setArticles(mapped);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadArticles();
  }, []);

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="articles">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold mb-4">
              <BookOpen className="w-3.5 h-3.5 text-sky-500" />
              <span>المعرفة الكيميائية والتطوير الصناعي</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight leading-tight">
              مقالات وإرشادات فنية للمصانع
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
              أحدث الرؤى المعملية، حلول مشاكل التركيبات، ودراسات التوافق الكيميائي لمطوري مستحضرات التجميل.
            </p>
          </div>

          <Link href="/articles" className="shrink-0">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-sky-600 hover:text-navy-950 transition-colors">
              <span>جميع المقالات الفنية</span>
              <ArrowLeft className="w-4 h-4" />
            </span>
          </Link>
        </div>

        {/* 3 Modern Editorial Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-sky-300 shadow-sm hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Cover */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-navy-950/80 backdrop-blur-md text-sky-300 border border-sky-400/20">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-sky-500" />
                      {article.readTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                  </div>

                  <Link href={`/articles/${article.id}`}>
                    <h3 className="text-base sm:text-lg font-bold text-navy-950 group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug mb-3">
                      {article.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Read Action Footer */}
              <div className="p-4 px-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/articles/${article.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 group-hover:text-navy-950 transition-colors"
                >
                  <span>قراءة المقال بالكامل</span>
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
