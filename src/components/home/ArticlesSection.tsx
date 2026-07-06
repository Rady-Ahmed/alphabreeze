"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Eye } from "lucide-react";

import { useEffect, useState } from "react";
import { getArticles } from "@/lib/db";

export default function ArticlesSection() {
  const [articles, setArticles] = useState<any[]>([]);
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
            category: typeof a.category === 'object' && a.category ? a.category.name_ar : a.category || "مقالات",
            excerpt: a.excerpt || a.excerpt_ar || (a.content_ar ? a.content_ar.substring(0, 100) + '...' : 'اقرأ المزيد...'),
            image: a.featured_image || a.og_image_url || a.image_url || a.image,
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
    <section className="section-padding bg-white" id="articles">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sky-500 font-semibold text-sm mb-2 block">المدونة</span>
          <h2 className="section-title">أحدث المقالات</h2>
          <p className="section-subtitle">مقالات ونصائح متخصصة في صناعة التجميل</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-gray-100 rounded-2xl animate-pulse" />
            ))
          ) : articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/articles/${article.id}`}>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover group h-full">
                  <div className="aspect-video bg-gradient-to-br from-sky-100 to-blue-50 flex items-center justify-center overflow-hidden">
                    {article.image && article.image !== "https://placehold.co/600x400/e2e8f0/64748b?text=Article+Image" ? (
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <span className="text-4xl group-hover:scale-110 transition-transform duration-500">📰</span>
                    )}
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-sky-500 font-semibold">{article.category}</span>
                    <h3 className="font-bold text-navy-900 mt-1 mb-2 line-clamp-2 group-hover:text-sky-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">{article.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />{article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />{article.views}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/articles">
            <Button variant="outline" size="lg">
              جميع المقالات
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
