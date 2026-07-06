"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Star } from "lucide-react";

import { useState, useEffect } from "react";
import { getProducts } from "@/lib/db";

const fallbackProducts = [
  { id: "1", name: "زبدة الشيا الخام", category: "خامات طبيعية", price: 250, oldPrice: 320, emoji: "🧴", badge: "الأكثر مبيعاً" },
  { id: "2", name: "زيت الأرجان المغربي", category: "زيوت طبيعية", price: 180, oldPrice: null, emoji: "🫒", badge: "جديد" },
  { id: "3", name: "شمع العسل الطبيعي", category: "شموع", price: 150, oldPrice: 200, emoji: "🍯", badge: "عرض" },
  { id: "4", name: "حمض الهيالورونيك", category: "مواد فعالة", price: 450, oldPrice: null, emoji: "💧", badge: "مميز" },
  { id: "5", name: "فيتامين سي بودرة", category: "فيتامينات", price: 380, oldPrice: 450, emoji: "✨", badge: "الأكثر مبيعاً" },
  { id: "6", name: "زيت جوز الهند العضوي", category: "زيوت طبيعية", price: 120, oldPrice: null, emoji: "🥥", badge: "جديد" },
  { id: "7", name: "الكولاجين البحري", category: "مواد فعالة", price: 550, oldPrice: 700, emoji: "🐚", badge: "عرض" },
  { id: "8", name: "زبدة الكاكاو", category: "خامات طبيعية", price: 200, oldPrice: null, emoji: "🍫", badge: "مميز" },
];

export default function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const fetched = await getProducts();
        if (fetched && fetched.length > 0) {
          const sorted = [...fetched].sort((a, b) => {
            if (a.is_featured && !b.is_featured) return -1;
            if (!a.is_featured && b.is_featured) return 1;
            return 0;
          });
          const mapped = sorted.slice(0, 8).map((p: any) => ({
            ...p,
            id: String(p.id),
            category: typeof p.category === 'object' && p.category ? p.category.name_ar : p.category,
            badge: p.is_featured ? "مميز" : null,
          }));
          setProducts(mapped);
        } else {
          setProducts(fallbackProducts);
        }
      } catch (e) {
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);
  return (
    <section className="section-padding bg-white" id="products">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sky-500 font-semibold text-sm mb-2 block">منتجاتنا</span>
          <h2 className="section-title">منتجات مميزة</h2>
          <p className="section-subtitle">اكتشف مجموعة متنوعة من أجود الخامات والمنتجات التجميلية</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {loading ? (
            Array(8).fill(0).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-gray-100 rounded-3xl animate-pulse" />
            ))
          ) : products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/shop/${product.id}`}>
                <motion.div 
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative bg-white rounded-3xl border border-sky-100 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-sky-500/10 group z-10"
                >
                  {/* Decorative background glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-400/0 to-sky-400/0 group-hover:from-sky-400/5 group-hover:to-sky-300/10 transition-colors duration-500 z-0" />
                  
                  {/* Image */}
                  <div className="relative aspect-square bg-gradient-to-b from-sky-50/50 to-white flex items-center justify-center z-10 overflow-hidden">
                    {/* Animated background shape */}
                    <div className="absolute inset-0 bg-sky-200/20 rounded-full blur-3xl scale-0 group-hover:scale-150 transition-transform duration-700 ease-out" />
                    
                    {product.image && (product.image.startsWith('http') || product.image.startsWith('data:image')) ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-10" onError={(e) => (e.currentTarget.style.display = "none")} />
                    ) : (
                      <motion.span 
                        className="text-6xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 z-10 drop-shadow-sm"
                      >
                        {product.emoji || "📦"}
                      </motion.span>
                    )}
                    
                    <Badge className="absolute top-4 right-4 z-20 backdrop-blur-md bg-white/80 border-white shadow-sm text-navy-900" variant={product.badge === "عرض" ? "destructive" : "default"}>
                      {product.badge}
                    </Badge>
                  </div>
                  
                  {/* Info */}
                  <div className="p-5 relative z-10 bg-white/80 backdrop-blur-md border-t border-sky-50/50">
                    <p className="text-[11px] font-bold text-sky-500 mb-1.5 uppercase tracking-wider">{product.category}</p>
                    <h3 className="font-bold text-navy-900 text-sm mb-3 line-clamp-1 group-hover:text-sky-600 transition-colors">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-bold text-lg text-sky-600">{product.price} <span className="text-xs font-normal">ج.م</span></span>
                        {product.oldPrice && (
                          <span className="text-xs text-gray-400 line-through">{product.oldPrice} ج.م</span>
                        )}
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shadow-sm">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/shop">
            <Button size="lg">
              <ShoppingBag className="w-5 h-5" />
              عرض جميع المنتجات
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
