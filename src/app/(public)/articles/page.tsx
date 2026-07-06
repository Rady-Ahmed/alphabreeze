"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Eye, Search, Image as ImageIcon, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getArticles } from "@/lib/db";

const categories = ["الكل", "خامات تجميل", "ريادة أعمال", "معلومات", "تركيبات"];

const defaultArticles = [
  { id: "1", title: "أهم 10 خامات أساسية في صناعة مستحضرات التجميل", excerpt: "تعرف على أهم الخامات التي يحتاجها كل مصنع مستحضرات تجميل لإنتاج منتجات عالية الجودة.", date: "15 يونيو 2026", views: 1250, category: "خامات تجميل", published: true },
  { id: "2", title: "كيف تبدأ مشروع مستحضرات تجميل ناجح", excerpt: "دليل شامل لبدء مشروعك الخاص في صناعة مستحضرات التجميل من الصفر حتى الاحتراف.", date: "10 يونيو 2026", views: 890, category: "ريادة أعمال", published: true },
  { id: "3", title: "فوائد زيت الأرجان في العناية بالبشرة والشعر", excerpt: "اكتشف الفوائد المذهلة لزيت الأرجان وكيفية استخدامه في منتجات العناية الشخصية.", date: "5 يونيو 2026", views: 670, category: "معلومات", published: true },
  { id: "4", title: "دليل تركيبات الكريمات المرطبة", excerpt: "تعلم كيفية تحضير كريمات مرطبة احترافية بخطوات بسيطة ومكونات متوفرة.", date: "1 يونيو 2026", views: 520, category: "تركيبات", published: false },
  { id: "5", title: "حمض الهيالورونيك: كل ما تحتاج معرفته", excerpt: "معلومات شاملة عن حمض الهيالورونيك واستخداماته في منتجات العناية بالبشرة.", date: "28 مايو 2026", views: 430, category: "معلومات", published: true },
  { id: "6", title: "اتجاهات صناعة التجميل في 2026", excerpt: "أحدث التوجهات والابتكارات في صناعة مستحضرات التجميل لهذا العام.", date: "25 مايو 2026", views: 380, category: "ريادة أعمال", published: true },
];

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetched = await getArticles();
        if (fetched && fetched.length > 0) {
          // Fallback excerpt from content if missing
          const mapped = fetched.map((a: any) => ({
            ...a,
            id: String(a.id),
            title: a.title_ar || a.title,
            published: a.is_published ?? a.published,
            category: typeof a.category === 'object' && a.category ? a.category.name_ar : a.category,
            image: a.featured_image || a.og_image_url || a.image_url || a.image,
            excerpt: a.excerpt || a.excerpt_ar || (a.content_ar ? a.content_ar.substring(0, 100) + '...' : (a.content ? a.content.substring(0, 100) + '...' : ''))
          }));
          setArticles(mapped);
        } else {
          // If true DB is empty, use default dummy articles to fill the UI
          setArticles(defaultArticles);
        }
      } catch (e) {
        setArticles(defaultArticles);
      } finally {
        setLoading(false);
        setMounted(true);
      }
    };
    
    fetchArticles();
  }, []);

  if (!mounted) return null;

  const filtered = articles
    .filter((a) => a.published)
    .filter((a) => selectedCategory === "الكل" || a.category === selectedCategory)
    .filter((a) => a.title.includes(searchQuery));

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-primary" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">المقالات</h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">مقالات ونصائح متخصصة في صناعة التجميل والخامات</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none"><path d="M0 60L1440 60V30C1200 50 960 10 720 30C480 50 240 10 0 30V60Z" fill="white"/></svg>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input placeholder="ابحث عن مقال..." className="pr-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >{cat}</button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article, i) => (
              <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link href={`/articles/${article.id}`}>
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover group h-full flex flex-col">
                    <div className="aspect-video bg-gradient-to-br from-sky-100 to-blue-50 flex items-center justify-center overflow-hidden">
                      {article.image && article.image !== "https://placehold.co/600x400/e2e8f0/64748b?text=Article+Image" ? (
                        <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <span className="text-4xl group-hover:scale-110 transition-transform duration-500">📰</span>
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <Badge className="mb-2 self-start">{article.category}</Badge>
                      <h3 className="font-bold text-navy-900 mb-2 line-clamp-2 group-hover:text-sky-600 transition-colors">{article.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{article.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-400 mt-auto">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{article.date}</span>
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{article.views || 0}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                لا توجد مقالات منشورة حالياً في هذا القسم.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
