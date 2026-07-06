"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Eye, ArrowLeft, User, Image as ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";

const defaultArticles = [
  { id: "1", title: "أهم 10 خامات أساسية في صناعة مستحضرات التجميل", category: "خامات تجميل", date: "15 يونيو 2026", views: 1250, content: "<h2>مقدمة</h2><p>صناعة مستحضرات التجميل تعتمد على مجموعة من الخامات الأساسية التي لا غنى عنها لأي مصنع أو رائد أعمال في هذا المجال. في هذا المقال، نستعرض أهم 10 خامات تحتاجها لبدء إنتاج منتجات تجميل عالية الجودة.</p>", published: true },
  { id: "2", title: "كيف تبدأ مشروع مستحضرات تجميل ناجح", category: "ريادة أعمال", date: "10 يونيو 2026", views: 890, content: "<p>دليل شامل لبدء مشروعك الخاص في صناعة مستحضرات التجميل من الصفر حتى الاحتراف.</p>", published: true },
  { id: "3", title: "فوائد زيت الأرجان في العناية بالبشرة والشعر", category: "معلومات", date: "5 يونيو 2026", views: 670, content: "<p>اكتشف الفوائد المذهلة لزيت الأرجان وكيفية استخدامه في منتجات العناية الشخصية.</p>", published: true },
];

export default function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [article, setArticle] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("alphabreeze_articles");
      let allArticles = defaultArticles;
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) {
          allArticles = parsed.map((a: any) => ({ ...a, id: String(a.id) }));
        }
      }

      const found = allArticles.find(a => String(a.id) === resolvedParams.id);
      if (found) {
        // Increment views
        const updatedFound = { ...found, views: (found.views || 0) + 1 };
        setArticle(updatedFound);
        
        // Save back views if from local storage
        if (saved) {
          const parsed = JSON.parse(saved);
          const newArticles = parsed.map((a: any) => String(a.id) === resolvedParams.id ? { ...a, views: (a.views || 0) + 1 } : a);
          localStorage.setItem("alphabreeze_articles", JSON.stringify(newArticles));
        }

        // Get related
        const related = allArticles.filter(a => a.published && String(a.id) !== resolvedParams.id).slice(0, 3);
        setRelatedArticles(related);
      } else {
         setArticle("not_found");
      }
    } catch (e) {
       setArticle("not_found");
    }
    setMounted(true);
  }, [resolvedParams.id]);

  if (!mounted) return null;
  if (article === "not_found") return notFound();
  if (!article) return <div className="pt-32 text-center pb-20">جاري التحميل...</div>;

  return (
    <section className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/articles" className="inline-flex items-center gap-2 text-sky-500 hover:text-sky-600 mb-6 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4 rotate-180" /> العودة للمقالات
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-3">{article.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4 leading-tight">{article.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-8 pb-8 border-b border-gray-100">
              <span className="flex items-center gap-1"><User className="w-4 h-4" />{article.author || "فريق ألفا بريز"}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{article.date}</span>
              <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{article.views || 0} مشاهدة</span>
            </div>

            {/* Featured Image */}
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-sky-100 to-blue-50 flex items-center justify-center mb-8 border border-gray-100 overflow-hidden">
               {article.image && article.image !== "https://placehold.co/600x400/e2e8f0/64748b?text=Article+Image" ? (
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
               ) : (
                  <span className="text-6xl">📰</span>
               )}
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap" 
              dangerouslySetInnerHTML={{ __html: article.content }}
              style={{ 
                lineHeight: "2",
              }}
            />
          </motion.div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-100">
              <h2 className="text-2xl font-bold text-navy-900 mb-6">مقالات ذات صلة</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {relatedArticles.map((a) => (
                  <Link key={a.id} href={`/articles/${a.id}`}>
                    <div className="p-4 rounded-xl border border-gray-100 hover:border-sky-200 hover:bg-sky-50 transition-all h-full flex flex-col">
                      <Badge variant="outline" className="mb-2 text-xs self-start">{a.category}</Badge>
                      <h3 className="font-bold text-navy-900 text-sm line-clamp-2">{a.title}</h3>
                      <p className="text-xs text-gray-400 mt-auto pt-4">{a.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
