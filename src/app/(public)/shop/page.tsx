"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search, SlidersHorizontal, X, ChevronLeft, ChevronRight,
  Loader2, MessageCircle, FlaskConical, Layers, Tag, ArrowUpDown, Grid3X3, List
} from "lucide-react";
import { getProducts } from "@/lib/db";
import { B2B_CATEGORIES, SITE_CONFIG } from "@/lib/constants";
import ChemicalVisual from "@/components/ui/ChemicalVisual";

const PAGE_SIZE = 24;

const WHATSAPP = "201119446474";

const CATEGORY_IMAGES: Record<string, string> = {
  oils: "https://images.unsplash.com/photo-1608181831688-8e3fc5bab4cf?w=800&q=80",
  powders: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80",
  emulsifiers: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80",
  actives: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
  fragrances: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80",
  colors: "https://images.unsplash.com/photo-1550159930-40066082a4fc?w=800&q=80",
  preservatives: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80",
  flavors: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
  default: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
};

function getCategoryImage(slug?: string) {
  return CATEGORY_IMAGES[slug ?? ""] ?? CATEGORY_IMAGES.default;
}

function ProductCard({ product, onRfq }: { product: any; onRfq: (p: any) => void }) {
  const slug = product.category_slug ?? product.technical_specs?.category_slug ?? "default";
  const imgSrc = product.og_image_url || getCategoryImage(slug);
  const nameAr = product.name_ar ?? product.name ?? "مادة خام";
  const nameEn = product.name_en ?? product.inci_name ?? "";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.25 }}
      className="group relative flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {/* Image / 3D Icon */}
      <Link href={`/shop/${product.id}`} className="block relative h-44 overflow-hidden bg-slate-900">
        <ChemicalVisual product={product} />
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <Link href={`/shop/${product.id}`}>
          <h3 className="font-bold text-slate-800 text-sm leading-snug mb-1 group-hover:text-cyan-600 transition-colors line-clamp-2">
            {nameAr}
          </h3>
          {nameEn && (
            <p className="text-xs text-slate-400 mb-2 font-mono truncate">{nameEn}</p>
          )}
        </Link>

        {product.cas_number && (
          <p className="text-[10px] text-slate-400 mb-3">
            CAS: <span className="font-mono text-slate-500">{product.cas_number}</span>
          </p>
        )}

        <div className="mt-auto pt-3 border-t border-slate-50 flex items-center gap-2">
          <button
            onClick={() => onRfq(product)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-gradient-to-l from-cyan-500 to-sky-600 text-white text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            طلب تسعير
          </button>
          <Link
            href={`/shop/${product.id}`}
            className="flex items-center justify-center h-9 w-9 rounded-xl border border-slate-200 text-slate-500 hover:border-cyan-500 hover:text-cyan-600 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function RfqModal({ product, onClose }: { product: any; onClose: () => void }) {
  const nameAr = product?.name_ar ?? product?.name ?? "المنتج";

  const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `مرحباً، أود طلب تسعير على: ${nameAr}\nالكمية: \nملاحظات: `
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-800 text-base">طلب تسعير</h3>
            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{nameAr}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400">
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-5">
          سيتم تحويلك إلى واتساب لإتمام طلب التسعير مباشرةً مع فريقنا.
        </p>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-2xl transition-colors text-sm"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          تواصل عبر واتساب
        </a>

        <button
          onClick={onClose}
          className="mt-3 w-full py-2.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          إلغاء
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [rfqProduct, setRfqProduct] = useState<any>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    B2B_CATEGORIES.forEach((cat) => {
      counts[cat.slug] = products.filter(
        (p) => (p.category_slug ?? p.technical_specs?.category_slug) === cat.slug
      ).length;
    });
    return counts;
  }, [products]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== "all") {
      list = list.filter(
        (p) => (p.category_slug ?? p.technical_specs?.category_slug) === selectedCategory
      );
    }

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => {
        return (
          (p.name_ar ?? p.name ?? "").toLowerCase().includes(q) ||
          (p.name_en ?? "").toLowerCase().includes(q) ||
          (p.inci_name ?? "").toLowerCase().includes(q) ||
          (p.cas_number ?? "").toLowerCase().includes(q) ||
          (p.subcategory ?? "").toLowerCase().includes(q)
        );
      });
    }

    if (sortBy === "name_ar") list.sort((a, b) => (a.name_ar ?? a.name ?? "").localeCompare(b.name_ar ?? b.name ?? "", "ar"));
    else if (sortBy === "name_en") list.sort((a, b) => (a.name_en ?? "").localeCompare(b.name_en ?? ""));

    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSearch = useCallback((v: string) => {
    setSearchQuery(v);
    setCurrentPage(1);
  }, []);

  const handleCategory = useCallback((slug: string) => {
    setSelectedCategory(slug);
    setCurrentPage(1);
    setFiltersOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white" dir="rtl">
      {/* ── Hero strip ── */}
      <div className="relative bg-gradient-to-l from-[#0d1b3e] to-[#0a2d5e] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-500 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        </div>
        <div className="relative container mx-auto px-4 py-10 md:py-14">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-3">
              <FlaskConical className="h-4 w-4" />
              كتالوج المواد الخام
            </div>
            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-3">
              اكتشف <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-300 to-sky-400">+431 مادة خام</span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              زيوت نباتية · مواد فعّالة · مستحلبات · عطور · حافظات · ألوان وأكثر
            </p>
          </div>

          {/* Search bar */}
          <div className="mt-6 relative max-w-xl">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="ابحث بالاسم العربي أو الإنجليزي أو رقم CAS..."
              className="w-full pr-11 pl-4 py-3 rounded-2xl bg-white/10 backdrop-blur border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearch("")}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">

          {/* ── Sidebar filters (desktop) ── */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24 space-y-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1 mb-3">الأقسام</p>
              <button
                onClick={() => handleCategory("all")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === "all"
                    ? "bg-gradient-to-l from-cyan-500 to-sky-600 text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span>كل المنتجات</span>
                <span className={`text-xs rounded-full px-2 py-0.5 ${selectedCategory === "all" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                  {categoryCounts.all}
                </span>
              </button>
              {B2B_CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => handleCategory(cat.slug)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === cat.slug
                      ? "bg-gradient-to-l from-cyan-500 to-sky-600 text-white shadow-md"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span className="text-right leading-snug">{cat.name_ar}</span>
                  <span className={`text-xs rounded-full px-1.5 py-0.5 flex-shrink-0 ml-1 ${selectedCategory === cat.slug ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                    {categoryCounts[cat.slug] ?? 0}
                  </span>
                </button>
              ))}
            </div>
          </aside>

          {/* ── Products area ── */}
          <div className="flex-1 min-w-0">

            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
              <div className="flex items-center gap-2">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-600 hover:border-cyan-500 hover:text-cyan-600 transition-colors"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  فلتر
                </button>

                <span className="text-sm text-slate-500">
                  <span className="font-bold text-slate-800">{filteredProducts.length}</span> مادة
                  {searchQuery && <span className="text-cyan-600"> · &quot;{searchQuery}&quot;</span>}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                  className="text-sm border border-slate-200 rounded-xl px-3 py-2 text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
                >
                  <option value="default">الترتيب الافتراضي</option>
                  <option value="name_ar">الاسم (عربي)</option>
                  <option value="name_en">الاسم (إنجليزي)</option>
                </select>

                {/* View mode */}
                <div className="hidden sm:flex items-center border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 transition-colors ${viewMode === "grid" ? "bg-cyan-500 text-white" : "text-slate-400 hover:bg-slate-50"}`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 transition-colors ${viewMode === "list" ? "bg-cyan-500 text-white" : "text-slate-400 hover:bg-slate-50"}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active category chip */}
            {selectedCategory !== "all" && (
              <div className="flex items-center gap-2 mb-4">
                <span className="flex items-center gap-1.5 bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-medium px-3 py-1.5 rounded-full">
                  <Tag className="h-3 w-3" />
                  {B2B_CATEGORIES.find((c) => c.slug === selectedCategory)?.name_ar}
                  <button onClick={() => handleCategory("all")} className="ml-1 hover:text-cyan-900">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-24 gap-3 text-slate-400">
                <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
                <span className="text-sm">جاري تحميل الكتالوج...</span>
              </div>
            )}

            {/* Empty */}
            {!loading && filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 gap-3">
                <FlaskConical className="h-12 w-12 text-slate-200" />
                <p className="text-slate-400 text-sm">لا توجد نتائج مطابقة</p>
                <button onClick={() => { handleSearch(""); handleCategory("all"); }} className="text-cyan-600 text-sm underline">
                  مسح الفلاتر
                </button>
              </div>
            )}

            {/* Grid */}
            {!loading && paginatedProducts.length > 0 && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedCategory}-${currentPage}-${searchQuery}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={viewMode === "grid"
                    ? "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4"
                    : "flex flex-col gap-3"
                  }
                >
                  {viewMode === "grid"
                    ? paginatedProducts.map((p) => (
                        <ProductCard key={p.id} product={p} onRfq={setRfqProduct} />
                      ))
                    : paginatedProducts.map((p) => (
                        <ListProductRow key={p.id} product={p} onRfq={setRfqProduct} />
                      ))
                  }
                </motion.div>
              </AnimatePresence>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl border border-slate-200 text-slate-500 disabled:opacity-30 hover:border-cyan-500 hover:text-cyan-600 transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  const page = totalPages <= 7 ? i + 1 : currentPage <= 4 ? i + 1 : currentPage + i - 3;
                  if (page < 1 || page > totalPages) return null;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`min-w-[2.25rem] h-9 rounded-xl text-sm font-medium transition-all ${
                        currentPage === page
                          ? "bg-gradient-to-l from-cyan-500 to-sky-600 text-white shadow-md"
                          : "border border-slate-200 text-slate-600 hover:border-cyan-400"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl border border-slate-200 text-slate-500 disabled:opacity-30 hover:border-cyan-500 hover:text-cyan-600 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile Filter Drawer ── */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40"
              onClick={() => setFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-72 max-w-full z-50 bg-white shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b">
                <h2 className="font-bold text-slate-800">فلترة الأقسام</h2>
                <button onClick={() => setFiltersOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100">
                  <X className="h-5 w-5 text-slate-500" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-1">
                <button
                  onClick={() => handleCategory("all")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === "all" ? "bg-gradient-to-l from-cyan-500 to-sky-600 text-white" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span>كل المنتجات</span>
                  <span className={`text-xs rounded-full px-2 py-0.5 ${selectedCategory === "all" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                    {categoryCounts.all}
                  </span>
                </button>
                {B2B_CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => handleCategory(cat.slug)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      selectedCategory === cat.slug ? "bg-gradient-to-l from-cyan-500 to-sky-600 text-white" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span className="text-right">{cat.name_ar}</span>
                    <span className={`text-xs rounded-full px-1.5 py-0.5 ${selectedCategory === cat.slug ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                      {categoryCounts[cat.slug] ?? 0}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* RFQ Modal */}
      <AnimatePresence>
        {rfqProduct && <RfqModal product={rfqProduct} onClose={() => setRfqProduct(null)} />}
      </AnimatePresence>
    </div>
  );
}

function ListProductRow({ product, onRfq }: { product: any; onRfq: (p: any) => void }) {
  const slug = product.category_slug ?? product.technical_specs?.category_slug ?? "default";
  const imgSrc = product.og_image_url || getCategoryImage(slug);
  const nameAr = product.name_ar ?? product.name ?? "مادة خام";
  const nameEn = product.name_en ?? product.inci_name ?? "";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-3 hover:shadow-md hover:border-cyan-200 transition-all"
    >
      <Link href={`/shop/${product.id}`} className="flex-shrink-0">
        <div className="h-16 w-16 rounded-xl overflow-hidden bg-slate-900">
          <ChemicalVisual product={product} showBadge={false} />
        </div>
      </Link>
      <div className="flex-1 min-w-0">
        <Link href={`/shop/${product.id}`}>
          <h3 className="font-semibold text-slate-800 text-sm leading-snug hover:text-cyan-600 transition-colors line-clamp-1">{nameAr}</h3>
          {nameEn && <p className="text-xs text-slate-400 font-mono truncate">{nameEn}</p>}
        </Link>
        {product.cas_number && <p className="text-[10px] text-slate-400 mt-0.5">CAS: {product.cas_number}</p>}
      </div>
      <button
        onClick={() => onRfq(product)}
        className="flex-shrink-0 flex items-center gap-1 py-2 px-3 bg-gradient-to-l from-cyan-500 to-sky-600 text-white text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity"
      >
        <MessageCircle className="h-3.5 w-3.5" />
        تسعير
      </button>
    </motion.div>
  );
}
