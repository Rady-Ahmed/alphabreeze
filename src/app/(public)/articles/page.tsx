"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Eye, Search, FileText, ChevronLeft, Sparkles, BookOpen, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getArticles } from "@/lib/db";

const categories = ["الكل", "خامات تجميل", "تصنيع ومعايير", "دراسات وثبات", "تركيبات معملية"];

const defaultArticles = [
  {
    id: "1",
    title: "أهم 10 خامات أساسية في صناعة مستحضرات التجميل وكيفية التحقق من شهادة الـ COA",
    excerpt: "دليل تقني مفصل للكيميائيين ومصنعي التجميل حول اختيار المواد الخام ذات النقاء الدوائي وفحص نتائج التحليل المخبري بدقة.",
    date: "15 نوفمبر 2026",
    views: 1250,
    category: "خامات تجميل",
    readTime: "5 دقائق",
    published: true,
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80"
  },
  {
    id: "2",
    title: "دليل التصنيع التعاقدي (Private Label): كيف تبدأ خط إنتاج تجميلي ناجح؟",
    excerpt: "الخطوات العلمية واللوجستية لبناء علامة تجارية في صناعة التجميل، من اختيار الفورميلا والمستحلبات المناسبة وحتى التسجيل والترخيص.",
    date: "10 نوفمبر 2026",
    views: 890,
    category: "تصنيع ومعايير",
    readTime: "7 دقائق",
    published: true,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80"
  },
  {
    id: "3",
    title: "المستحلبات الشمعية والبوليمرات: الفرق بين BTMS و GMS و Cetearyl Alcohol",
    excerpt: "مقارنة عملية في الأداء الكيميائي واللزوجة والثبات للمستحلبات الأكثر استخداماً في كريمات البشرة وبلسم الشعر.",
    date: "05 نوفمبر 2026",
    views: 670,
    category: "تركيبات معملية",
    readTime: "6 دقائق",
    published: true,
    image: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=800&q=80"
  },
  {
    id: "4",
    title: "حمض الهيالورونيك والنياسيناميد: أسرار الذوبان والاستقرار في السيرومات المائية",
    excerpt: "كيف تتجنب تعكر السيروم أو تفكك الروابط عند دمج المكونات الفعالة مع المواد الحافظة وعوامل ضبط الـ pH.",
    date: "01 نوفمبر 2026",
    views: 840,
    category: "دراسات وثبات",
    readTime: "4 دقائق",
    published: true,
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80"
  },
  {
    id: "5",
    title: "المواد الحافظة الحديثة: بدائل البارابين الفعالة والمتوافقة مع المعايير الأوروبية",
    excerpt: "استعراض لمركبات الـ Phenoxyethanol و Sodium Benzoate و Potassium Sorbate ونطاقات الـ pH الفعالة ضد البكتيريا والفطريات.",
    date: "28 أكتوبر 2026",
    views: 920,
    category: "خامات تجميل",
    readTime: "5 دقائق",
    published: true,
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80"
  },
  {
    id: "6",
    title: "الزيوت الناقلة مقابل الزيوت العطرية: الدليل الكامل للنسب والتركيزات الآمنة",
    excerpt: "معايير IFRA الدولية لاستخدام الزيوت العطرية المركزة، ونسب تخفيفها في زيوت الجوجوبا والأرجان واللوز الحلو.",
    date: "20 أكتوبر 2026",
    views: 750,
    category: "تركيبات معملية",
    readTime: "6 دقائق",
    published: true,
    image: "https://images.unsplash.com/photo-1608181831688-8e3fc5bab4cf?w=800&q=80"
  },
];

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState(defaultArticles);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDbArticles() {
      try {
        const fetched = await getArticles();
        if (fetched && fetched.length > 0) {
          const normalized = fetched.map((a: any) => ({
            ...a,
            id: String(a.id),
            title: a.title_ar || a.title || "مقال فني",
            category:
              typeof a.category === "object" && a.category
                ? a.category.name_ar || "خامات تجميل"
                : a.category || "خامات تجميل",
            excerpt:
              a.excerpt ||
              a.excerpt_ar ||
              (a.content_ar ? a.content_ar.replace(/<[^>]+>/g, "").substring(0, 120) + "..." : ""),
            image:
              a.featured_image ||
              a.og_image_url ||
              a.image_url ||
              a.image ||
              defaultArticles[0].image,
            readTime: a.reading_time || a.readTime || "5 دقائق",
            date:
              a.date ||
              (a.published_at || a.created_at
                ? new Date(a.published_at || a.created_at).toLocaleDateString("ar-EG")
                : "2026"),
            published: a.published !== false && a.is_published !== false,
          }));
          setArticles(normalized);
        }
      } catch {
        // Keep default articles
      } finally {
        setLoading(false);
      }
    }
    fetchDbArticles();
  }, []);

  const filtered = articles
    .filter((a) => a.published !== false)
    .filter((a) => selectedCategory === "الكل" || a.category === selectedCategory)
    .filter((a) => {
      const q = searchQuery.toLowerCase().trim();
      return (
        !q ||
        (a.title || "").toLowerCase().includes(q) ||
        (a.excerpt || "").toLowerCase().includes(q)
      );
    });

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      
      {/* ── Hero Section ── */}
      <section className="relative bg-gradient-to-l from-[#070e22] via-[#0d1b3e] to-[#070e22] text-white py-16 md:py-24 overflow-hidden border-b border-cyan-500/20">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1600&q=60"
            alt="Laboratory articles background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            المكتبة المعرفية والمقالات الفنية
          </div>
          <h1 className="text-3xl sm:text-5xl font-black leading-tight mb-4">
            مقالات كيميائية ودلائل تصنيع{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-300 to-sky-400">
              لمطوري التركيبات
            </span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-8">
            شروحات علمية، معايير جودة، ونصائح تطبيقية لتطوير مستحضرات التجميل وحل مشكلات الخامات في المعمل والمصنع.
          </p>

          {/* Search Field */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="ابحث عن مقال أو مادة أو موضوع تصنيع..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-11 pl-4 py-3.5 rounded-2xl bg-white/10 backdrop-blur border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
          </div>
        </div>
      </section>

      {/* ── Category Filter Strip ── */}
      <section className="bg-white border-b border-slate-200 sticky top-16 z-20 shadow-sm">
        <div className="container mx-auto px-4 py-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-gradient-to-l from-cyan-500 to-sky-600 text-white shadow-md shadow-cyan-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Articles Grid ── */}
      <section className="py-12 md:py-16 container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-slate-800">
            {selectedCategory === "الكل" ? "جميع المقالات" : `مقالات: ${selectedCategory}`}
            <span className="text-slate-400 text-xs font-normal mr-2">({filtered.length} مقال)</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link
                href={`/articles/${article.id}`}
                className="group flex flex-col h-full bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  <img
                    src={article.image || "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80"}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full text-[11px] font-bold text-slate-700 shadow-sm">
                    {article.category}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime || "5 دقائق"}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug mb-3 group-hover:text-cyan-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 mb-6 flex-1">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-semibold text-cyan-600">
                    <span>قراءة المقال كاملاً</span>
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">لا توجد مقالات تطابق بحثك حالياً.</p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
