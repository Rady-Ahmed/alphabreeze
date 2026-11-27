"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plus, Search, Edit2, Trash2, Star, X, Loader2, Save,
  FlaskConical, CheckCircle2, AlertCircle, Eye, RefreshCw, Filter, Layers
} from "lucide-react";
import { toast } from "sonner";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "@/lib/db";
import { B2B_CATEGORIES } from "@/lib/constants";
import ChemicalVisual from "@/components/ui/ChemicalVisual";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  // Add & Edit modal states
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>({
    name_ar: "",
    name_en: "",
    category: "الزيوت والمستخلصات النباتية",
    category_slug: "oils-and-extracts",
    cas_number: "",
    price: "",
    stock_quantity: 100,
    package_size: "برميل 25 كجم",
    description_ar: "",
    is_active: true,
    is_featured: false,
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data || []);
    } catch {
      toast.error("تعذر تحميل المنتجات من قاعدة البيانات");
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat =
        selectedCategory === "all" ||
        p.category_slug === selectedCategory ||
        p.technical_specs?.category_slug === selectedCategory ||
        (B2B_CATEGORIES.find((c) => c.slug === selectedCategory)?.name_ar === p.category);

      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        (p.name_ar && p.name_ar.toLowerCase().includes(q)) ||
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.name_en && p.name_en.toLowerCase().includes(q)) ||
        (p.cas_number && p.cas_number.toLowerCase().includes(q));

      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, search]);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentProduct({
      name_ar: "",
      name_en: "",
      category: "الزيوت والمستخلصات النباتية",
      category_slug: "oils-and-extracts",
      cas_number: "",
      price: "",
      stock_quantity: 100,
      package_size: "برميل 25 كجم",
      description_ar: "",
      is_active: true,
      is_featured: false,
    });
    setShowModal(true);
  };

  const handleOpenEdit = (p: any) => {
    setIsEditing(true);
    setCurrentProduct({ ...p });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct.name_ar) {
      toast.error("يرجى إدخال اسم المادة بالعربية");
      return;
    }

    setSaving(true);
    try {
      if (isEditing) {
        await updateProduct(currentProduct.id, currentProduct);
        setProducts((prev) =>
          prev.map((item) => (item.id === currentProduct.id ? { ...item, ...currentProduct } : item))
        );
        toast.success("تم تحديث المادة الكيميائية بنجاح ✓");
      } else {
        const created = await createProduct({
          ...currentProduct,
          price: Number(currentProduct.price) || 0,
        });
        setProducts((prev) => [created || { ...currentProduct, id: String(Date.now()) }, ...prev]);
        toast.success("تمت إضافة المادة الكيميائية للكتالوج بنجاح ✓");
      }
      setShowModal(false);
    } catch {
      toast.error("حدث خطأ أثناء حفظ التعديلات");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`هل أنت متأكد من حذف المادة "${name}" نهائياً من الكتالوج؟`)) return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((item) => item.id !== id));
      toast.success("تم حذف المادة بنجاح");
    } catch {
      toast.error("تعذر حذف المادة");
    }
  };

  const handleToggleActive = async (p: any) => {
    const updatedStatus = !p.is_active;
    try {
      await updateProduct(p.id, { is_active: updatedStatus });
      setProducts((prev) =>
        prev.map((item) => (item.id === p.id ? { ...item, is_active: updatedStatus } : item))
      );
      toast.success(updatedStatus ? "تم تفعيل المادة في المتجر" : "تم تعطيل ظهور المادة");
    } catch {
      toast.error("تعذر تحديث الحالة");
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-black text-slate-900">إدارة كتالوج المواد الخام</h1>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800">
              {products.length} مادة مسجلة
            </span>
          </div>
          <p className="text-slate-500 text-xs">
            تحكم كامل في أسعار الخامات، أرقام الـ CAS، الأوزان، وحالات التوفر في المتجر
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={loadProducts}
            disabled={loading}
            className="rounded-xl text-xs gap-1.5 h-10 border-slate-200"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            تحديث
          </Button>
          <Button
            onClick={handleOpenAdd}
            className="bg-gradient-to-l from-cyan-500 to-sky-600 hover:from-cyan-600 hover:to-sky-700 text-white rounded-xl text-xs font-bold gap-1.5 h-10 shadow-md shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" />
            إضافة مادة خام جديدة
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث بالاسم العربي أو الإنجليزي أو رقم CAS..."
            className="pr-10 h-10 rounded-xl text-xs bg-slate-50 border-slate-200 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-10 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="all">جميع الأقسام ({products.length})</option>
            {B2B_CATEGORIES.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name_ar}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-500 mx-auto mb-2" />
            <p className="text-xs text-slate-400">جاري تحميل كتالوج الخامات...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <FlaskConical className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700">لا توجد مواد مطابقة للبحث</p>
            <p className="text-xs text-slate-400 mt-1">تأكد من كتابة الكلمة بشكل صحيح أو اختر قسماً آخر.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-bold">
                <tr>
                  <th className="py-3.5 px-4">المادة الكيميائية</th>
                  <th className="py-3.5 px-4">القسم</th>
                  <th className="py-3.5 px-4">رقم CAS</th>
                  <th className="py-3.5 px-4">السعر التقديري</th>
                  <th className="py-3.5 px-4">حجم العبوة</th>
                  <th className="py-3.5 px-4">المخزون</th>
                  <th className="py-3.5 px-4">الحالة</th>
                  <th className="py-3.5 px-4 text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Visual & Name */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200/80 bg-slate-900">
                          <ChemicalVisual product={p} showBadge={false} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{p.name_ar || p.name}</p>
                          {p.name_en && <p className="text-[11px] font-mono text-slate-400">{p.name_en}</p>}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium">
                        {p.category || "عام"}
                      </span>
                    </td>

                    {/* CAS */}
                    <td className="py-3 px-4 font-mono font-semibold text-slate-600">
                      {p.cas_number || "—"}
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 font-bold text-slate-800">
                      {p.price ? `${p.price} ج.م` : "عند الطلب"}
                    </td>

                    {/* Package */}
                    <td className="py-3 px-4 text-slate-600">
                      {p.package_size || p.packaging_options || "برميل صناعي"}
                    </td>

                    {/* Stock */}
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-slate-700">
                        {p.stock_quantity ?? 100} كجم
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleActive(p)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition ${
                          p.is_active !== false
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}
                      >
                        {p.is_active !== false ? "مفعل بالمتجر" : "معطل"}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-cyan-50 hover:text-cyan-600 text-slate-600 transition"
                          title="تعديل المادة"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.name_ar || p.name)}
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-red-50 hover:text-red-600 text-slate-600 transition"
                          title="حذف نهائي"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-base">
                {isEditing ? "تعديل بيانات مادة خام" : "إضافة مادة خام كيميائية جديدة"}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">اسم المادة بالعربية *</label>
                <Input
                  required
                  value={currentProduct.name_ar || ""}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, name_ar: e.target.value })}
                  placeholder="مثال: زيت أرجان نقي معصور على البارد"
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">الاسم بالإنجليزي / INCI Name</label>
                <Input
                  dir="ltr"
                  value={currentProduct.name_en || ""}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, name_en: e.target.value })}
                  placeholder="Argania Spinosa Kernel Oil"
                  className="rounded-xl font-mono text-left"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">القسم</label>
                  <select
                    value={currentProduct.category_slug || "oils-and-extracts"}
                    onChange={(e) => {
                      const slug = e.target.value;
                      const cat = B2B_CATEGORIES.find((c) => c.slug === slug);
                      setCurrentProduct({
                        ...currentProduct,
                        category_slug: slug,
                        category: cat?.name_ar || "عام",
                      });
                    }}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white"
                  >
                    {B2B_CATEGORIES.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.name_ar}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">رقم الـ CAS Number</label>
                  <Input
                    dir="ltr"
                    value={currentProduct.cas_number || ""}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, cas_number: e.target.value })}
                    placeholder="223747-87-3"
                    className="rounded-xl font-mono text-left"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">السعر التقديري (ج.م / كجم)</label>
                  <Input
                    type="number"
                    value={currentProduct.price || ""}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                    placeholder="250"
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">المخزون المتاح (كجم)</label>
                  <Input
                    type="number"
                    value={currentProduct.stock_quantity ?? 100}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, stock_quantity: Number(e.target.value) })}
                    placeholder="500"
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">حجم ونوع التعبئة</label>
                <Input
                  value={currentProduct.package_size || ""}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, package_size: e.target.value })}
                  placeholder="مثال: برميل 25 كجم / درم 200 كجم"
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">الوصف والاستخدام المعملي</label>
                <textarea
                  rows={3}
                  value={currentProduct.description_ar || ""}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, description_ar: e.target.value })}
                  placeholder="شرح موجز لأهم استخدامات المادة ونسب التركيز..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="rounded-xl">
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-gradient-to-l from-cyan-500 to-sky-600 text-white rounded-xl font-bold"
                >
                  {saving ? (
                    <span className="flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      جاري الحفظ...
                    </span>
                  ) : (
                    <span>حفظ المادة في الكتالوج</span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
