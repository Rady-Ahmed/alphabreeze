"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  FlaskConical,
  Atom,
  FileSpreadsheet,
  FileText,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Building2,
  SlidersHorizontal,
  X,
  Send,
  MessageCircle,
  Filter,
} from "lucide-react";
import { toast } from "sonner";
import { getProducts } from "@/lib/db";
import { B2B_CATEGORIES, SITE_CONFIG } from "@/lib/constants";

const PAGE_SIZE = 24;

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [selectedForm, setSelectedForm] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Quick RFQ Modal State
  const [isRfqOpen, setIsRfqOpen] = useState(false);
  const [rfqProduct, setRfqProduct] = useState<any>(null);
  const [rfqSubmitting, setRfqSubmitting] = useState(false);
  const [rfqForm, setRfqForm] = useState({
    fullName: "",
    companyName: "",
    phone: "",
    email: "",
    quantity: "25 كجم",
    packagingType: "",
    notes: "",
  });

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetched = await getProducts();
        if (fetched && fetched.length > 0) {
          setProducts(fetched);
        }
      } catch (err) {
        console.error("Could not fetch raw materials catalog:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Compute unique subcategories for current category
  const availableSubcategories = useMemo(() => {
    const subs = new Set<string>();
    products.forEach((p) => {
      const matchCat =
        selectedCategory === "all" ||
        p.category_slug === selectedCategory ||
        (B2B_CATEGORIES.find((c) => c.slug === selectedCategory)?.name_ar === p.category);

      if (matchCat && p.subcategory) {
        subs.add(p.subcategory);
      }
    });
    return Array.from(subs);
  }, [products, selectedCategory]);

  // Compute unique product forms
  const availableForms = useMemo(() => {
    const forms = new Set<string>();
    products.forEach((p) => {
      if (p.product_form) forms.add(p.product_form);
    });
    return Array.from(forms);
  }, [products]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let list = products;

    // 1. Category Filter
    if (selectedCategory !== "all") {
      const targetCatObj = B2B_CATEGORIES.find((c) => c.slug === selectedCategory);
      const targetNameAr = targetCatObj?.name_ar;
      list = list.filter((p) => {
        const slug = p.category_slug || p.technical_specs?.category_slug;
        return slug === selectedCategory || (targetNameAr && p.category === targetNameAr);
      });
    }

    // 2. Subcategory Filter
    if (selectedSubcategory !== "all") {
      list = list.filter((p) => p.subcategory === selectedSubcategory);
    }

    // 3. Form Filter
    if (selectedForm !== "all") {
      list = list.filter((p) => p.product_form === selectedForm);
    }

    // 4. Search Filter
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => {
        const matchNameAr = (p.name_ar || p.name || "").toLowerCase().includes(q);
        const matchNameEn = (p.name_en || "").toLowerCase().includes(q);
        const matchInci = (p.inci_name || "").toLowerCase().includes(q);
        const matchCas = (p.cas_number || "").toLowerCase().includes(q);
        const matchSubcat = (p.subcategory || "").toLowerCase().includes(q);
        const matchCat = (p.category || "").toLowerCase().includes(q);
        return matchNameAr || matchNameEn || matchInci || matchCas || matchSubcat || matchCat;
      });
    }

    // 5. Sorting
    const sorted = [...list];
    if (sortBy === "price_low") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_high") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name_ar") {
      sorted.sort((a, b) => (a.name_ar || a.name || "").localeCompare(b.name_ar || b.name || "", "ar"));
    } else if (sortBy === "name_en") {
      sorted.sort((a, b) => (a.name_en || "").localeCompare(b.name_en || "", "en"));
    }

    return sorted;
  }, [products, selectedCategory, selectedSubcategory, selectedForm, searchQuery, sortBy]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedSubcategory, selectedForm, searchQuery]);

  // Reset subcategory when category changes
  useEffect(() => {
    setSelectedSubcategory("all");
  }, [selectedCategory]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, currentPage]);

  const handleOpenRfq = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setRfqProduct(product);
    setRfqForm((prev) => ({
      ...prev,
      quantity: product.package_size || "25 كجم",
      notes: `استفسار رسمي لتوريد مادة: ${product.name_ar || product.name} (${product.name_en || ""})`,
    }));
    setIsRfqOpen(true);
  };

  const handleRfqSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rfqForm.fullName || !rfqForm.phone) {
      toast.error("يرجى إدخال الاسم ورقم الهاتف على الأقل");
      return;
    }

    setRfqSubmitting(true);
    try {
      const res = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: rfqForm.fullName,
          company_name: rfqForm.companyName,
          phone: rfqForm.phone,
          email: rfqForm.email,
          product_name: rfqProduct?.name_ar || rfqProduct?.name,
          cas_number: rfqProduct?.cas_number || "",
          expected_quantity: rfqForm.quantity,
          packaging_type: rfqForm.packagingType,
          notes: rfqForm.notes,
        }),
      });

      if (res.ok) {
        toast.success("تم إرسال طلب عرض السعر بنجاح! سيتواصل معكم مسؤول المبيعات فوراً.");
        setIsRfqOpen(false);
      } else {
        toast.error("حدث خطأ أثناء إرسال الطلب، يرجى المحاولة عبر واتساب مباشرة");
      }
    } catch (err) {
      toast.error("تعذر إرسال الطلب، يرجى التواصل هاتفياً أو عبر واتساب");
    } finally {
      setRfqSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-arabic">
      {/* Header Banner */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-navy-950 via-navy-900 to-slate-900 text-white">
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-300 border border-sky-400/20">
              <FlaskConical className="w-3.5 h-3.5 text-sky-400" />
              <span>كتالوج المواد الخام الكيميائية وتوريدات المصانع B2B</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              متجر المواد الخام والمكونات الفعالة
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
              تصفح أكثر من 400 مادة خام معتمدة للزيوت، البودرات الفعالة، السوائل، الشموع، الألوان، العطور والنكهات الصناعية مع إمكانية طلب عروض أسعار تجارية وفحص صحائف البيانات (TDS).
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Filter & Search Toolbar */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between mb-5">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="ابحث بالاسم العربي، الإنجليزي، رقم CAS، أو التصنيف..."
                  className="pr-10 h-12 bg-slate-50 border-slate-200 text-sm rounded-xl focus:bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-200 px-2 py-0.5 rounded"
                  >
                    مسح
                  </button>
                )}
              </div>

              {/* Sorting & Stats */}
              <div className="flex items-center justify-between lg:justify-end gap-3 text-xs">
                <span className="text-slate-500">
                  إجمالي النتائج: <strong className="text-navy-900 font-bold">{filteredProducts.length}</strong> مادة
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-10 rounded-xl border border-slate-200 px-3 text-xs bg-slate-50 text-slate-700 outline-none focus:border-sky-500"
                >
                  <option value="default">الترتيب: الافتراضي</option>
                  <option value="name_ar">الاسم: أبجدياً (عربي)</option>
                  <option value="name_en">الاسم: أبجدياً (إنجليزي)</option>
                  <option value="price_low">السعر: من الأقل للأعلى</option>
                  <option value="price_high">السعر: من الأعلى للأقل</option>
                </select>
              </div>
            </div>

            {/* 8 Main Categories Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-t border-slate-100 pt-4">
              {B2B_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                      isSelected
                        ? "bg-navy-900 text-white border-navy-900 shadow-xs"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200"
                    }`}
                  >
                    {cat.name_ar}
                  </button>
                );
              })}
            </div>

            {/* Subcategories (if available) */}
            {availableSubcategories.length > 0 && (
              <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 border-t border-slate-50 mt-3">
                <span className="text-[11px] font-bold text-slate-400 shrink-0 ml-1">التصنيف الفرعي:</span>
                <button
                  onClick={() => setSelectedSubcategory("all")}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-medium shrink-0 transition-all ${
                    selectedSubcategory === "all"
                      ? "bg-sky-100 text-sky-800 font-bold"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  الكل ({availableSubcategories.length})
                </button>
                {availableSubcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubcategory(sub)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg font-medium shrink-0 transition-all ${
                      selectedSubcategory === sub
                        ? "bg-sky-500 text-white font-bold"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Grid of Products */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {Array(12)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-white rounded-2xl border border-slate-200 animate-pulse p-4" />
                ))}
            </div>
          ) : paginatedProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8">
              <FlaskConical className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-navy-900 mb-1">لم يتم العثور على مادة مطابقة لبحثك</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mb-5">
                تأكد من كتابة الاسم بشكل صحيح، أو تواصل مباشرة مع قسم المبيعات والاستيراد لتوفير المادة المطلوبة لمصنعك بأي كمية.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedSubcategory("all");
                  setSelectedForm("all");
                }}
                variant="outline"
                size="sm"
              >
                إعادة ضبط الفلاتر
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {paginatedProducts.map((product, index) => {
                const hasCustomImage =
                  product.image &&
                  (product.image.startsWith("http") ||
                    product.image.startsWith("/") ||
                    product.image.startsWith("data:image"));

                return (
                  <motion.div
                    key={product.id || product.slug || index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (index % 12) * 0.02 }}
                  >
                    <Link href={`/shop/${product.slug || product.id}`} className="block h-full group">
                      <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden h-full flex flex-col shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300">
                        {/* Visual & Top Badges */}
                        <div className="relative aspect-square bg-gradient-to-br from-slate-50 via-sky-50/20 to-slate-100 flex items-center justify-center overflow-hidden border-b border-slate-100 p-4">
                          {hasCustomImage ? (
                            <img
                              src={product.image}
                              alt={product.name_ar || product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-lg"
                              onError={(e) => (e.currentTarget.style.display = "none")}
                            />
                          ) : (
                            <span className="text-6xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 drop-shadow-sm">
                              {product.emoji || "🧪"}
                            </span>
                          )}

                          {/* Category Badge */}
                          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1 items-end z-10">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-navy-900/90 text-white backdrop-blur-sm max-w-[120px] truncate">
                              {product.category}
                            </span>
                          </div>

                          {/* CAS Badge (if available) */}
                          {product.cas_number && (
                            <span className="absolute bottom-2.5 left-2.5 text-[10px] font-mono font-bold bg-white/95 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200/80 shadow-xs" dir="ltr">
                              CAS: {product.cas_number}
                            </span>
                          )}
                        </div>

                        {/* Details */}
                        <div className="p-4 sm:p-5 flex flex-col flex-1">
                          {product.subcategory && (
                            <p className="text-[11px] font-bold text-sky-600 truncate mb-1">
                              {product.subcategory}
                            </p>
                          )}
                          <h3 className="font-bold text-navy-900 text-sm sm:text-base line-clamp-1 group-hover:text-sky-600 transition-colors mb-1">
                            {product.name_ar || product.name}
                          </h3>
                          {product.name_en && (
                            <p className="text-[11px] font-mono text-slate-400 truncate mb-3" dir="ltr">
                              {product.name_en}
                            </p>
                          )}

                          <div className="text-[11px] text-slate-500 space-y-1 mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                            <div className="flex justify-between">
                              <span>النقاوة:</span>
                              <span className="font-semibold text-slate-700 truncate max-w-[120px]">
                                {product.purity_grade || "تجميلية معتمدة"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>العبوة:</span>
                              <span className="font-semibold text-slate-700 truncate max-w-[120px]">
                                {product.package_size || "تعبئة صناعية"}
                              </span>
                            </div>
                          </div>

                          {/* Price / Quote Required */}
                          <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between mb-3">
                            <div>
                              {product.price && product.price > 0 ? (
                                <div className="flex items-baseline gap-1">
                                  <span className="font-black text-lg text-sky-600">{product.price} جنيه</span>
                                  {product.pricing_unit && (
                                    <span className="text-[11px] text-slate-400 font-medium">/{product.pricing_unit}</span>
                                  )}
                                </div>
                              ) : (
                                <span className="font-bold text-xs text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                                  السعر عند الاستفسار
                                </span>
                              )}
                            </div>
                            {product.origin_country && (
                              <span className="text-[10px] text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                                {product.origin_country}
                              </span>
                            )}
                          </div>

                          {/* Action Button: Quick RFQ */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => handleOpenRfq(product, e)}
                              className="flex-1 text-center text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-600 hover:text-white py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 border border-sky-100"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>طلب تسعير (RFQ)</span>
                            </button>
                            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-all shrink-0">
                              <ChevronLeft className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Pagination Bar */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="h-10 px-3"
              >
                <ChevronRight className="w-4 h-4 ml-1" />
                السابق
              </Button>

              <div className="flex items-center gap-1 mx-2">
                {Array.from({ length: Math.min(totalPages, 7) }, (_, idx) => {
                  let pageNum = idx + 1;
                  if (totalPages > 7 && currentPage > 4) {
                    pageNum = currentPage - 3 + idx;
                    if (pageNum > totalPages) pageNum = totalPages - (6 - idx);
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                        currentPage === pageNum
                          ? "bg-sky-600 text-white shadow-xs"
                          : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="h-10 px-3"
              >
                التالي
                <ChevronLeft className="w-4 h-4 mr-1" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Quick RFQ Modal */}
      <AnimatePresence>
        {isRfqOpen && rfqProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsRfqOpen(false)}
                className="absolute top-5 left-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-navy-900">طلب تسعير كميات وتوريد B2B</h3>
                  <p className="text-xs text-sky-600 font-semibold">{rfqProduct.name_ar || rfqProduct.name}</p>
                </div>
              </div>

              <form onSubmit={handleRfqSubmit} className="space-y-4">
                <div>
                  <Label className="text-xs font-bold text-slate-700">الاسم الكامل / المسؤول</Label>
                  <Input
                    required
                    placeholder="م. أحمد محمد"
                    value={rfqForm.fullName}
                    onChange={(e) => setRfqForm({ ...rfqForm, fullName: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs font-bold text-slate-700">رقم الهاتف / واتساب</Label>
                    <Input
                      required
                      type="tel"
                      dir="ltr"
                      placeholder="010XXXXXXXX"
                      value={rfqForm.phone}
                      onChange={(e) => setRfqForm({ ...rfqForm, phone: e.target.value })}
                      className="mt-1 text-right"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-bold text-slate-700">اسم المصنع / الشركة</Label>
                    <Input
                      placeholder="معمل / مصنع مستحضرات"
                      value={rfqForm.companyName}
                      onChange={(e) => setRfqForm({ ...rfqForm, companyName: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs font-bold text-slate-700">الكمية المطلوبة</Label>
                    <Input
                      placeholder="مثال: 5 براميل / 100 كجم"
                      value={rfqForm.quantity}
                      onChange={(e) => setRfqForm({ ...rfqForm, quantity: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-bold text-slate-700">البريد الإلكتروني (اختياري)</Label>
                    <Input
                      type="email"
                      placeholder="procurement@company.com"
                      value={rfqForm.email}
                      onChange={(e) => setRfqForm({ ...rfqForm, email: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-bold text-slate-700">ملاحظات إضافية أو متطلبات تشغيلة</Label>
                  <Textarea
                    rows={2}
                    placeholder="طلب شهادة تحليل مسبقة (COA)، موعد التسليم المستهدف، إلخ..."
                    value={rfqForm.notes}
                    onChange={(e) => setRfqForm({ ...rfqForm, notes: e.target.value })}
                    className="mt-1 text-sm"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsRfqOpen(false)}
                    className="h-11"
                  >
                    إلغاء
                  </Button>
                  <Button
                    type="submit"
                    disabled={rfqSubmitting}
                    className="h-11 bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 flex items-center gap-2"
                  >
                    {rfqSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        إرسال طلب التسعير
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
