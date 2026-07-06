"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { trackAddToCart } from "@/components/Analytics";
import { getProducts } from "@/lib/db";
import { Loader2 } from "lucide-react";

const categories = ["الكل", "خامات طبيعية", "زيوت طبيعية", "مواد فعالة", "شموع", "فيتامينات", "مواد حافظة"];

const fallbackProducts = [
  { id: "1", name: "زبدة الشيا الخام", category: "خامات طبيعية", price: 250, oldPrice: 320, emoji: "🧴", badge: "الأكثر مبيعاً" },
  { id: "2", name: "زيت الأرجان المغربي", category: "زيوت طبيعية", price: 180, oldPrice: null, emoji: "🫒", badge: "جديد" },
  { id: "3", name: "شمع العسل الطبيعي", category: "شموع", price: 150, oldPrice: 200, emoji: "🍯", badge: "عرض" },
  { id: "4", name: "حمض الهيالورونيك", category: "مواد فعالة", price: 450, oldPrice: null, emoji: "💧", badge: "مميز" },
  { id: "5", name: "فيتامين سي بودرة", category: "فيتامينات", price: 380, oldPrice: 450, emoji: "✨", badge: "عرض" },
  { id: "6", name: "زيت جوز الهند العضوي", category: "زيوت طبيعية", price: 120, oldPrice: null, emoji: "🥥", badge: "جديد" },
  { id: "7", name: "الكولاجين البحري", category: "مواد فعالة", price: 550, oldPrice: 700, emoji: "🐚", badge: "عرض" },
  { id: "8", name: "زبدة الكاكاو", category: "خامات طبيعية", price: 200, oldPrice: null, emoji: "🍫", badge: "مميز" },
  { id: "9", name: "زيت اللوز الحلو", category: "زيوت طبيعية", price: 95, oldPrice: 120, emoji: "🌰", badge: "عرض" },
  { id: "10", name: "الجلسرين النباتي", category: "خامات طبيعية", price: 85, oldPrice: null, emoji: "🧪", badge: null },
  { id: "11", name: "زيت الجوجوبا", category: "زيوت طبيعية", price: 220, oldPrice: null, emoji: "🌿", badge: "جديد" },
  { id: "12", name: "النياسيناميد", category: "مواد فعالة", price: 320, oldPrice: 400, emoji: "⚗️", badge: "عرض" },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetched = await getProducts();
        if (fetched && fetched.length > 0) {
          const mapped = fetched.map((p: any) => ({
            ...p,
            id: String(p.id),
            category: typeof p.category === 'object' && p.category ? p.category.name_ar : p.category
          }));
          setProducts(mapped);
        } else {
          setProducts(fallbackProducts);
        }
      } catch (err) {
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  let filtered = products
    .filter((p) => selectedCategory === "الكل" || p.category === selectedCategory)
    .filter((p) => p.name.includes(searchQuery));

  if (sortBy === "price_low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price_high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
  }

  const handleAddToCart = (e: React.MouseEvent, product: any, redirect: boolean = false) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const cart = JSON.parse(localStorage.getItem('alphabreeze_cart') || '[]');
      const existingItem = cart.find((item: any) => item.id === product.id);
      
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        cart.push({ ...product, qty: 1 });
      }
      
      localStorage.setItem('alphabreeze_cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cart_updated'));

      // Analytics Tracking
      trackAddToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      });
      
      if (redirect) {
        router.push('/checkout');
      } else {
        toast.success(`تم إضافة ${product.name} إلى السلة بنجاح`);
      }
    } catch (err) {
      toast.error("حدث خطأ أثناء إضافة المنتج للسلة");
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 gradient-primary" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">المتجر</h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">اكتشف مجموعتنا المتميزة من خامات ومستحضرات التجميل</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none"><path d="M0 60L1440 60V30C1200 50 960 10 720 30C480 50 240 10 0 30V60Z" fill="white"/></svg>
        </div>
      </section>

      {/* Shop Content */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input placeholder="ابحث عن منتج..." className="pr-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div className="flex items-center gap-2">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="h-11 rounded-xl border border-gray-200 px-4 text-sm bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none">
                <option value="newest">الأحدث</option>
                <option value="price_low">السعر: من الأقل</option>
                <option value="price_high">السعر: من الأعلى</option>
                <option value="name">الاسم</option>
              </select>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product, index) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}>
                <Link href={`/shop/${product.id}`} className="block h-full">
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover group h-full flex flex-col shadow-sm hover:shadow-xl transition-all duration-300">
                    <div className="relative aspect-square bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center overflow-hidden">
                      {product.image && (product.image.startsWith('http') || product.image.startsWith('data:image')) ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => (e.currentTarget.style.display = "none")} />
                      ) : (
                        <span className="text-6xl group-hover:scale-110 transition-transform duration-500">{product.emoji}</span>
                      )}
                      {product.badge && (
                        <Badge className="absolute top-3 right-3 shadow-md" variant={product.badge === "عرض" ? "destructive" : "default"}>
                          {product.badge}
                        </Badge>
                      )}
                      {product.oldPrice && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
                          -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <p className="text-xs text-sky-500 mb-2 font-medium">{product.category}</p>
                      <h3 className="font-bold text-navy-900 text-base mb-2 line-clamp-2 min-h-[40px] group-hover:text-sky-600 transition-colors">{product.name}</h3>
                      <div className="flex items-end gap-2 mb-4">
                        <span className="font-bold text-xl text-sky-600">{product.price} <span className="text-sm font-normal">ج.م</span></span>
                        {product.oldPrice && <span className="text-sm text-gray-400 line-through mb-0.5">{product.oldPrice}</span>}
                      </div>
                      
                      <div className="mt-auto flex flex-col gap-2 pt-2 border-t border-gray-50">
                        <Button 
                          onClick={(e) => handleAddToCart(e, product, false)}
                          variant="outline"
                          className="w-full justify-center gap-2 border-sky-100 bg-sky-50/50 hover:bg-sky-50 text-sky-600 hover:text-sky-700 h-10"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          أضف للسلة
                        </Button>
                        <Button 
                          onClick={(e) => handleAddToCart(e, product, true)}
                          className="w-full justify-center gap-2 shadow-md shadow-sky-500/20 hover:shadow-sky-500/40 transition-all h-10"
                        >
                          <CreditCard className="w-4 h-4" />
                          اطلب الآن
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">لا توجد منتجات مطابقة للبحث</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
