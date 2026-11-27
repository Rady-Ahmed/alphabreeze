"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Search,
  Sparkles,
  FlaskConical,
  Droplets,
  Atom,
  Flame,
  Palette,
  Heart,
  Apple,
  ArrowLeft,
  ChevronDown,
  FileText,
  Send,
  Loader2,
  Package,
  CheckCircle,
  X,
  Info,
} from "lucide-react";
import { getProducts } from "@/lib/db";
import { B2B_CATEGORIES } from "@/lib/constants";
import ChemicalVisual from "@/components/ui/ChemicalVisual";

const PAGE_SIZE = 16;

const CATEGORY_ICONS: Record<string, any> = {
  all: Package,
  "oils-and-extracts": Droplets,
  "raw-powders-and-actives": Sparkles,
  "chemical-liquids-and-solvents": FlaskConical,
  "vitamins-and-nutrients": Atom,
  "waxes-and-polymers": Flame,
  "colors-and-pigments": Palette,
  "fragrances-and-scents": Heart,
  flavors: Apple,
};

export default function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Quick RFQ Modal state
  const [rfqProduct, setRfqProduct] = useState<any | null>(null);
  const [rfqSubmitted, setRfqSubmitted] = useState(false);
  const [rfqForm, setRfqForm] = useState({
    name: "",
    company: "",
    phone: "",
    quantity: "1 كجم",
    notes: "",
  });

  useEffect(() => {
    async function loadProducts() {
      try {
        const fetched = await getProducts();
        if (fetched && fetched.length > 0) {
          setProducts(fetched);
        }
      } catch (e) {
        console.error("Error loading products:", e);
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

  // Reset pagination on filter change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selectedCategory, searchQuery]);

  // Real database counts per category for tabs
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    products.forEach((p) => {
      const slug = p.category_slug || p.technical_specs?.category_slug;
      if (slug) {
        counts[slug] = (counts[slug] || 0) + 1;
      }
    });
    return counts;
  }, [products]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rfqProduct) return;
    setRfqSubmitted(true);
    const msg = encodeURIComponent(
      `طلب عرض سعر (RFQ):\nالمادة: ${rfqProduct.name_ar} (${rfqProduct.name_en || ""})\nالكمية: ${rfqForm.quantity}\nالاسم: ${rfqForm.name}\nالشركة: ${rfqForm.company || "غير محدد"}\nالهاتف: ${rfqForm.phone}\nملاحظات: ${rfqForm.notes || "لا يوجد"}`
    );
    window.open(`https://wa.me/201019946409?text=${msg}`, "_blank");
    setTimeout(() => {
      setRfqSubmitted(false);
      setRfqProduct(null);
    }, 3500);
  };

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200/80 relative overflow-hidden" id="products">
      <div className="container mx-auto px-4">
        
        {/* Crisp Header - Minimal Words */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 border border-sky-200 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>كتالوج المواد الخام المباشر</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-navy-950 tracking-tight">
              استكشاف المواد الخام
            </h2>
          </div>

          <Link href="/shop" className="shrink-0">
            <span className="text-xs sm:text-sm font-bold text-sky-600 hover:text-navy-950 transition-colors inline-flex items-center gap-1.5">
              <span>الانتقال للمتجر الكامل</span>
              <ArrowLeft className="w-4 h-4" />
            </span>
          </Link>
        </div>

        {/* Search & Category Filter Tabs */}
        <div className="mb-8 space-y-4">
          {/* Instant Search Bar */}
          <div className="relative max-w-xl">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم المادة الخام أو رقم CAS (مثال: أرجان، 57-55-6)..."
              className="pr-10 pl-4 h-11 rounded-xl bg-white border-slate-200 shadow-sm text-xs sm:text-sm focus-visible:ring-sky-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {B2B_CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.slug] || Package;
              const isSelected = selectedCategory === cat.slug;
              const count = categoryCounts[cat.slug] || 0;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 border ${
                    isSelected
                      ? "bg-navy-950 text-white border-navy-950 shadow-sm"
                      : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-sky-400" : "text-slate-400"}`} />
                  <span>{cat.name_ar}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? "bg-sky-500/20 text-sky-300 border border-sky-400/30"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean, Spacious Products Grid */}
        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-sky-500 mx-auto mb-3" />
            <p className="text-xs text-slate-500 font-medium">جاري تحميل المواد الخام...</p>
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 max-w-md mx-auto shadow-sm">
            <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-navy-950 mb-1">لا توجد نتائج مطابقة</h3>
            <p className="text-xs text-slate-500 mb-4">جرب البحث بكلمة أخرى أو اختر قسماً آخر.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="rounded-xl text-xs font-bold"
            >
              عرض كافة المنتجات
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayedProducts.map((p, idx) => (
                <motion.div
                  key={p.id || idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: (idx % 8) * 0.03 }}
                  className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-cyan-300 transition-all duration-200 flex flex-col justify-between overflow-hidden"
                >
                  {/* Product Visual Container (Photo / 3D Icon) */}
                  <Link href={`/shop/${p.slug || p.id}`} className="block relative h-40 w-full overflow-hidden bg-slate-900">
                    <ChemicalVisual product={p} />
                  </Link>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Top Row: Category tag + CAS pill */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-50 text-cyan-700 border border-cyan-100 truncate max-w-[130px]">
                          {p.category}
                        </span>
                        {p.cas_number && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                            CAS: {p.cas_number}
                          </span>
                        )}
                      </div>

                      {/* Product Arabic Name */}
                      <Link href={`/shop/${p.slug || p.id}`}>
                        <h3 className="text-sm sm:text-base font-bold text-navy-950 mb-1 group-hover:text-cyan-600 transition-colors line-clamp-2 leading-snug">
                          {p.name_ar || p.name}
                        </h3>
                      </Link>

                      {/* Product English Name */}
                      {p.name_en && (
                        <p className="text-[11px] font-mono text-slate-400 mb-3 truncate">
                          {p.name_en}
                        </p>
                      )}
                    </div>

                    {/* Actions Footer: RFQ + Details */}
                    <div className="pt-3 border-t border-slate-100 flex items-center gap-2 mt-2">
                      <Button
                        size="sm"
                        onClick={() => setRfqProduct(p)}
                        className="flex-1 bg-[#070e22] hover:bg-cyan-600 text-white font-bold h-9 text-xs rounded-xl shadow-sm transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 ml-1.5" />
                        طلب تسعير
                      </Button>
                      <Link href={`/shop/${p.slug || p.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-9 px-3 rounded-xl border-slate-200 text-slate-600 hover:text-navy-950 hover:bg-slate-50 text-xs font-bold"
                          title="تفاصيل المادة"
                        >
                          <Info className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination / Load More */}
            <div className="mt-12 text-center space-y-3">
              <p className="text-xs text-slate-400">
                عرض {displayedProducts.length} من {filteredProducts.length} مادة
              </p>
              {hasMore && (
                <Button
                  onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                  variant="outline"
                  className="border-slate-300 text-navy-950 hover:bg-white font-bold px-7 h-10 rounded-xl text-xs shadow-sm"
                >
                  عرض المزيد ({filteredProducts.length - visibleCount} متبقية)
                  <ChevronDown className="w-4 h-4 mr-1.5" />
                </Button>
              )}
            </div>
          </>
        )}

      </div>

      {/* Quick RFQ Modal */}
      <AnimatePresence>
        {rfqProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative text-right"
            >
              <button
                onClick={() => setRfqProduct(null)}
                className="absolute top-4 left-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-5">
                <span className="text-[10px] font-bold text-sky-600 px-2 py-0.5 rounded-full bg-sky-50 border border-sky-100 mb-1.5 inline-block">
                  طلب عرض سعر رسمي (RFQ)
                </span>
                <h3 className="text-lg font-bold text-navy-950">
                  {rfqProduct.name_ar}
                </h3>
                {rfqProduct.name_en && (
                  <p className="text-xs font-mono text-slate-400">{rfqProduct.name_en}</p>
                )}
              </div>

              {rfqSubmitted ? (
                <div className="text-center py-6">
                  <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-navy-950 mb-1">تم توجيه طلبكم للمبيعات!</h4>
                  <p className="text-xs text-slate-500">جاري التواصل وتجهيز عرض السعر فوراً.</p>
                </div>
              ) : (
                <form onSubmit={handleRfqSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <Label className="text-xs font-bold text-slate-700">الاسم الكريم *</Label>
                      <Input
                        placeholder="الاسم"
                        className="mt-1 h-9 text-xs"
                        value={rfqForm.name}
                        onChange={(e) => setRfqForm({ ...rfqForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-slate-700">المصنع / المعمل</Label>
                      <Input
                        placeholder="اسم الشركة"
                        className="mt-1 h-9 text-xs"
                        value={rfqForm.company}
                        onChange={(e) => setRfqForm({ ...rfqForm, company: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <Label className="text-xs font-bold text-slate-700">رقم الهاتف *</Label>
                      <Input
                        placeholder="01xxxxxxxxx"
                        className="mt-1 h-9 text-xs"
                        value={rfqForm.phone}
                        onChange={(e) => setRfqForm({ ...rfqForm, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-slate-700">الكمية المطلوبة *</Label>
                      <Input
                        placeholder="مثال: 25 كجم"
                        className="mt-1 h-9 text-xs"
                        value={rfqForm.quantity}
                        onChange={(e) => setRfqForm({ ...rfqForm, quantity: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-navy-950 hover:bg-sky-600 text-white font-bold h-10 rounded-xl text-xs gap-2 shadow-md mt-2"
                  >
                    <Send className="w-3.5 h-3.5 ml-1" />
                    إرسال الطلب عبر واتساب
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
