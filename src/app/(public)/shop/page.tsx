"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  FlaskConical,
  Atom,
  FileSpreadsheet,
  FileText,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  Loader2,
  Building2,
} from "lucide-react";
import { toast } from "sonner";
import { getProducts } from "@/lib/db";

const categories = ["الكل", "مواد فعالة", "خامات طبيعية", "زيوت طبيعية", "شموع", "فيتامينات"];

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
            category: typeof p.category === "object" && p.category ? p.category.name_ar : p.category,
            inci_name: p.inci_name || p.name_en || "",
            cas_number: p.cas_number || "",
            package_size: p.package_size || "عبوة 1 كجم / براميل",
            pricing_unit: p.pricing_unit || "لكل 1 كجم",
            purity_grade: p.purity_grade || "درجة تجميلية معتمدة",
          }));
          setProducts(mapped);
        }
      } catch (err) {
        console.error("Could not fetch raw materials catalog:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const query = searchQuery.trim().toLowerCase();
  const filtered = products
    .filter((p) => selectedCategory === "الكل" || p.category === selectedCategory)
    .filter((p) => {
      if (!query) return true;
      const matchNameAr = (p.name || "").toLowerCase().includes(query);
      const matchNameEn = (p.name_en || "").toLowerCase().includes(query);
      const matchInci = (p.inci_name || "").toLowerCase().includes(query);
      const matchCas = (p.cas_number || "").toLowerCase().includes(query);
      const matchCategory = (p.category || "").toLowerCase().includes(query);
      return matchNameAr || matchNameEn || matchInci || matchCas || matchCategory;
    });

  if (sortBy === "price_low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price_high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name, "ar"));
  }

  return (
    <div className="bg-slate-50 min-h-screen font-arabic">
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-slate-900 text-white">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-300 border border-sky-400/20">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>توريد المواد الخام الكيميائية B2B لمصانع ومختبرات مستحضرات التجميل</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              كتالوج المواد الخام والمكونات الفعالة
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              نوفر خامات تجميلية معتمدة، مواد فعالة، زيوت طبيعية وشمع نقي مع شهادات التحليل (COA/MSDS) لكبرى المصانع والعلامات التجارية ورواد الأعمال في مصر.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Catalog Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Controls Bar (Search + Sort + Stats) */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-6 shadow-sm mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
              {/* Search by Name, INCI or CAS */}
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="ابحث بالاسم التجاري، الاسم العلمي (INCI)، أو رقم CAS..."
                  className="pr-10 h-12 bg-slate-50/70 border-slate-200 focus:bg-white text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Sort & Count */}
              <div className="flex items-center justify-between lg:justify-end gap-3 text-xs sm:text-sm">
                <span className="text-slate-500 font-medium">
                  المعروض: <strong className="text-navy-900 font-bold">{filtered.length}</strong> مادة خام
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-11 rounded-xl border border-slate-200 px-3 text-xs bg-white text-slate-700 outline-none focus:border-sky-500"
                >
                  <option value="newest">الترتيب: الأحدث</option>
                  <option value="price_low">السعر: من الأقل</option>
                  <option value="price_high">السعر: من الأعلى</option>
                  <option value="name">الاسم الأبجدي</option>
                </select>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 pt-4 mt-4 border-t border-slate-100">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? "bg-navy-900 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Raw Materials Grid */}
          {loading ? (
            <div className="flex flex-col justify-center items-center py-24 space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
              <p className="text-xs text-slate-500">جاري تحميل قائمة الخامات المتاحة للتوريد...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Link href={`/shop/${product.id}`} className="block h-full group">
                    <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden h-full flex flex-col shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300">
                      {/* Image / Chemical Emoji & CAS Badge */}
                      <div className="relative aspect-square bg-gradient-to-br from-slate-50 to-sky-50/40 flex items-center justify-center overflow-hidden border-b border-slate-100">
                        {product.image && (product.image.startsWith("http") || product.image.startsWith("/") || product.image.startsWith("data:image")) ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => (e.currentTarget.style.display = "none")}
                          />
                        ) : (
                          <span className="text-6xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 drop-shadow-sm">
                            {product.emoji}
                          </span>
                        )}

                        {/* Top Badges */}
                        <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-navy-900/90 text-white backdrop-blur-sm">
                            {product.category}
                          </span>
                          {product.badge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500 text-white">
                              {product.badge}
                            </span>
                          )}
                        </div>

                        {/* CAS Number Float */}
                        {product.cas_number && (
                          <span className="absolute bottom-2.5 left-2.5 text-[10px] font-mono font-bold bg-white/95 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200/80 shadow-sm" dir="ltr">
                            CAS: {product.cas_number}
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-5 flex flex-col flex-1">
                        <h3 className="font-bold text-navy-900 text-sm sm:text-base mb-1 line-clamp-1 group-hover:text-sky-600 transition-colors">
                          {product.name}
                        </h3>

                        {product.inci_name && (
                          <p className="text-[11px] font-mono text-slate-500 line-clamp-1 mb-2" dir="ltr">
                            INCI: {product.inci_name}
                          </p>
                        )}

                        <div className="text-[11px] text-slate-500 space-y-1 mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <div className="flex justify-between">
                            <span>النقاوة:</span>
                            <span className="font-semibold text-slate-700 truncate max-w-[120px]">{product.purity_grade}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>العبوة:</span>
                            <span className="font-semibold text-slate-700 truncate max-w-[120px]">{product.package_size}</span>
                          </div>
                        </div>

                        {/* Price & Unit */}
                        <div className="mt-auto pt-3 border-t border-slate-100 flex items-baseline justify-between mb-3">
                          <div>
                            {product.price && product.price > 0 ? (
                              <div className="flex items-baseline gap-1">
                                <span className="font-black text-lg text-sky-600">{product.price} جنيه</span>
                                {product.pricing_unit ? (
                                  <span className="text-[11px] text-slate-400 font-medium">/{product.pricing_unit}</span>
                                ) : null}
                              </div>
                            ) : (
                              <span className="font-bold text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                                السعر عند الاستفسار
                              </span>
                            )}
                          </div>
                          {product.origin_country && (
                            <span className="text-[10px] text-slate-400 font-medium bg-white px-1.5 py-0.5 rounded border border-slate-200">
                              {product.origin_country}
                            </span>
                          )}
                        </div>

                        {/* Action Link */}
                        <div className="w-full text-center text-xs font-bold text-sky-600 bg-sky-50 group-hover:bg-sky-600 group-hover:text-white py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5">
                          <span>عرض المواصفات وطلب تسعير</span>
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8">
              <FlaskConical className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-navy-900 mb-1">لم يتم العثور على مادة خام مطابقة</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
                جرّب البحث باسم المادة العلمي (INCI) أو رقم CAS، أو تواصل مباشرة مع قسم المبيعات والاستيراد لتوفير المادة خصيصاً لمصنعك.
              </p>
              <Button onClick={() => { setSearchQuery(""); setSelectedCategory("الكل"); }} variant="outline" size="sm">
                إعادة ضبط الفلاتر
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
