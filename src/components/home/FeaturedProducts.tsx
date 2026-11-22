"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ShoppingBag,
  Search,
  Sparkles,
  FlaskConical,
  Droplets,
  Atom,
  Flame,
  Palette,
  Heart,
  Apple,
  ChevronLeft,
  ChevronDown,
  FileText,
  Send,
  Loader2,
  Package,
} from "lucide-react";
import { getProducts } from "@/lib/db";
import { B2B_CATEGORIES } from "@/lib/constants";

const PAGE_SIZE = 16;

export default function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    async function loadProducts() {
      try {
        const fetched = await getProducts();
        if (fetched && fetched.length > 0) {
          setProducts(fetched);
        }
      } catch (e) {
        console.error("Error loading products on homepage:", e);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Filter products based on category and search query
  const filteredProducts = useMemo(() => {
    let list = products;
    if (selectedCategory !== "all") {
      const activeCatObj = B2B_CATEGORIES.find((c) => c.slug === selectedCategory);
      const targetNameAr = activeCatObj?.name_ar;
      list = list.filter((p) => {
        const catSlug = p.category_slug || p.technical_specs?.category_slug;
        const catName = p.category;
        return catSlug === selectedCategory || (targetNameAr && catName === targetNameAr);
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((p) => {
        const nameAr = (p.name_ar || p.name || "").toLowerCase();
        const nameEn = (p.name_en || "").toLowerCase();
        const subcat = (p.subcategory || p.technical_specs?.subcategory || "").toLowerCase();
        const cas = (p.cas_number || "").toLowerCase();
        return nameAr.includes(q) || nameEn.includes(q) || subcat.includes(q) || cas.includes(q);
      });
    }

    return list;
  }, [products, selectedCategory, searchQuery]);

  // Reset pagination on category or search change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selectedCategory, searchQuery]);

  // Counts per category for badges
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    products.forEach((p) => {
      const slug = p.category_slug || p.technical_specs?.category_slug;
      if (slug) {
        counts[slug] = (counts[slug] || 0) + 1;
      }
      // Also match by category name
      const matched = B2B_CATEGORIES.find((c) => c.name_ar === p.category);
      if (matched && matched.slug !== slug) {
        counts[matched.slug] = (counts[matched.slug] || 0) + 1;
      }
    });
    return counts;
  }, [products]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <section className="py-20 bg-slate-50/70 border-y border-slate-200/60" id="products">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/80 border border-sky-200 text-sky-800 text-xs font-bold mb-3">
            <FlaskConical className="w-3.5 h-3.5 text-sky-600" />
            <span>كتالوج المواد الخام الرسمي — {products.length}+ مادة ومركب</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-navy-900 tracking-tight mb-4">
            منتجاتنا ومكونات التركيبات الكيميائية
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            استكشف الكتالوج الكامل المعتمد لتوريد المواد الأولية لمصانع مستحضرات التجميل، الزيوت، الملونات، العطور والبودرات الفعالة.
          </p>
        </motion.div>

        {/* Live Search and Quick Filter */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              type="text"
              placeholder="ابحث عن مادة خام باسمها العربي، الإنجليزي، رقم CAS، أو التصنيف..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-13 pr-12 pl-4 rounded-2xl border-slate-300 bg-white shadow-sm text-sm focus:border-sky-500 focus:ring-sky-500/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-100 px-2 py-1 rounded-md"
              >
                مسح
              </button>
            )}
          </div>
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none justify-start lg:justify-center">
          {B2B_CATEGORIES.map((cat) => {
            const count = categoryCounts[cat.slug] || 0;
            const isSelected = selectedCategory === cat.slug;

            return (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 shrink-0 border ${
                  isSelected
                    ? "bg-navy-900 text-white border-navy-900 shadow-md shadow-navy-900/10 scale-105"
                    : "bg-white text-slate-600 hover:text-navy-900 border-slate-200 hover:border-slate-300"
                }`}
              >
                <span>{cat.name_ar}</span>
                {count > 0 && (
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono ${
                      isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6 px-1">
          <span>
            عرض <strong className="text-navy-900">{displayedProducts.length}</strong> من إجمالي{" "}
            <strong className="text-navy-900">{filteredProducts.length}</strong> مادة خام
          </span>
          {selectedCategory !== "all" && (
            <button
              onClick={() => setSelectedCategory("all")}
              className="text-sky-600 hover:underline font-bold"
            >
              عرض جميع الأقسام
            </button>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {loading ? (
            Array(8)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-white rounded-2xl border border-slate-200 animate-pulse p-4 flex flex-col justify-between">
                  <div className="w-full aspect-square bg-slate-100 rounded-xl" />
                  <div className="space-y-2 mt-4">
                    <div className="h-4 bg-slate-100 rounded w-3/4" />
                    <div className="h-3 bg-slate-100 rounded w-1/2" />
                  </div>
                </div>
              ))
          ) : displayedProducts.length === 0 ? (
            <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-slate-200 p-8">
              <FlaskConical className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-navy-900 mb-1">لم نجد مادة مطابقة لبحثك</h3>
              <p className="text-xs text-slate-400 mb-4">
                جرّب البحث بالاسم العلمي أو كود المادة أو تواصل مع فريق المبيعات لتوريدها خصيصاً لمصنعك.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                إعادة ضبط الفلاتر
              </Button>
            </div>
          ) : (
            displayedProducts.map((product, index) => {
              const hasCustomImage =
                product.image &&
                (product.image.startsWith("http") ||
                  product.image.startsWith("/") ||
                  product.image.startsWith("data:image"));

              return (
                <motion.div
                  key={product.id || product.slug || index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 8) * 0.03 }}
                >
                  <Link href={`/shop/${product.slug || product.id}`} className="block h-full group">
                    <div className="relative bg-white rounded-2xl border border-slate-200/90 hover:border-sky-300 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                      {/* Product Visual Container */}
                      <div className="relative aspect-square bg-gradient-to-br from-slate-50 via-sky-50/20 to-slate-100 flex items-center justify-center overflow-hidden border-b border-slate-100 p-4">
                        {hasCustomImage ? (
                          <img
                            src={product.image}
                            alt={product.name_ar || product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-lg"
                            onError={(e) => (e.currentTarget.style.display = "none")}
                          />
                        ) : (
                          <motion.span
                            className="text-6xl drop-shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500"
                          >
                            {product.emoji || "🧪"}
                          </motion.span>
                        )}

                        {/* Category Badge */}
                        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1 items-end z-10">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-navy-900/90 text-white backdrop-blur-sm max-w-[120px] truncate">
                            {product.category}
                          </span>
                        </div>

                        {/* Product Form Pill */}
                        {product.product_form && (
                          <span className="absolute bottom-2.5 left-2.5 text-[10px] font-semibold bg-white/95 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200 shadow-xs">
                            {product.product_form}
                          </span>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-4 flex flex-col flex-1">
                        {product.subcategory && (
                          <p className="text-[11px] font-bold text-sky-600 mb-1 truncate">
                            {product.subcategory}
                          </p>
                        )}
                        <h3 className="font-bold text-navy-900 text-sm line-clamp-1 group-hover:text-sky-600 transition-colors mb-1">
                          {product.name_ar || product.name}
                        </h3>
                        {product.name_en && (
                          <p className="text-[11px] font-mono text-slate-400 truncate mb-3" dir="ltr">
                            {product.name_en}
                          </p>
                        )}

                        {/* Pricing / RFQ */}
                        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            {product.price && product.price > 0 ? (
                              <div className="flex items-baseline gap-1">
                                <span className="font-black text-base text-sky-600">{product.price} جنيه</span>
                                {product.pricing_unit && (
                                  <span className="text-[10px] text-slate-400 font-normal">/{product.pricing_unit}</span>
                                )}
                              </div>
                            ) : (
                              <span className="inline-flex items-center text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                                السعر عند الاستفسار
                              </span>
                            )}
                          </div>
                          <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-all shadow-xs">
                            <ChevronLeft className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Pagination & Full Store Callout */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {hasMore && (
            <Button
              size="lg"
              variant="outline"
              onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
              className="h-12 px-8 font-bold text-sm bg-white border-slate-300 hover:bg-slate-100 rounded-xl"
            >
              عرض المزيد من المنتجات ({filteredProducts.length - visibleCount} متبقية)
              <ChevronDown className="w-4 h-4 mr-2" />
            </Button>
          )}

          <Link href="/shop">
            <Button size="lg" className="h-12 px-8 font-bold text-sm bg-sky-600 hover:bg-sky-700 text-white rounded-xl shadow-md shadow-sky-600/20">
              <ShoppingBag className="w-4 h-4 ml-2" />
              تصفح كتالوج المواد الخام بالكامل والفلترة المتقدمة
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
