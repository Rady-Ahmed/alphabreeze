"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, Star, X, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { getAllProducts, createProduct, updateProduct, deleteProduct, getSupabase } from "@/lib/db";

const CATEGORIES = ["خامات طبيعية", "زيوت طبيعية", "مواد فعالة", "شموع", "فيتامينات", "مواد حافظة"];
const EMOJIS = ["📦", "🧴", "🫒", "🍯", "💧", "✨", "🥥", "🐚", "🍫", "🌰", "🧪", "🌿", "⚗️"];

const EMPTY_FORM = { name: "", category: "خامات طبيعية", price: "", stock: "", emoji: "📦", description: "" };

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Add Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ ...EMPTY_FORM });

  // Edit Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const data = await getAllProducts();
      const supabase = getSupabase();
      if (supabase) {
        setProducts(data || []);
      } else {
        const saved = localStorage.getItem("alphabreeze_products");
        const fallback = saved ? JSON.parse(saved) : [
          { id: 1, name: "زبدة الشيا الخام", category: "خامات طبيعية", price: 250, stock: 45, is_active: true, is_featured: true, emoji: "🧴" },
          { id: 2, name: "زيت الأرجان المغربي", category: "زيوت طبيعية", price: 180, stock: 30, is_active: true, is_featured: false, emoji: "🫒" },
          { id: 3, name: "شمع العسل الطبيعي", category: "شموع", price: 150, stock: 60, is_active: true, is_featured: false, emoji: "🍯" },
          { id: 4, name: "حمض الهيالورونيك", category: "مواد فعالة", price: 450, stock: 20, is_active: true, is_featured: true, emoji: "💧" },
          { id: 5, name: "فيتامين سي بودرة", category: "فيتامينات", price: 380, stock: 15, is_active: false, is_featured: false, emoji: "✨" },
        ];
        setProducts(fallback);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setMounted(true);
      setLoading(false);
    }
  }

  const handleDelete = async (id: any) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
      toast.success("تم حذف المنتج بنجاح");
    } catch (e: any) {
      toast.error(e.message || "حدث خطأ أثناء الحذف");
    }
  };

  const toggleStatus = async (id: any, currentStatus: boolean) => {
    try {
      await updateProduct(id, { is_active: !currentStatus });
      setProducts(products.map((p) => p.id === id ? { ...p, is_active: !currentStatus } : p));
      toast.success(`تم ${!currentStatus ? "تفعيل" : "إخفاء"} المنتج`);
    } catch (e: any) {
      toast.error(e.message || "حدث خطأ");
    }
  };

  const toggleFeatured = async (id: any, currentFeatured: boolean) => {
    try {
      await updateProduct(id, { is_featured: !currentFeatured });
      setProducts(products.map((p) => p.id === id ? { ...p, is_featured: !currentFeatured } : p));
      toast.success("تم تحديث حالة التميز");
    } catch (e: any) {
      toast.error(e.message || "حدث خطأ");
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      toast.error("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }
    setSaving(true);
    try {
      const added = await createProduct({
        name: newProduct.name,
        category: newProduct.category,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        description: newProduct.description || null,
        is_active: true,
        is_featured: false,
        emoji: newProduct.emoji,
        image: (newProduct as any).image || null,
      });
      setProducts([added, ...products]);
      setShowAddModal(false);
      setNewProduct({ ...EMPTY_FORM });
      toast.success("تم إضافة المنتج بنجاح ✅");
    } catch (e: any) {
      toast.error(e.message || "حدث خطأ أثناء الإضافة");
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (product: any) => {
    setEditProduct({
      ...product,
      price: String(product.price),
      stock: String(product.stock),
      category: typeof product.category === 'object' ? product.category?.name_ar : product.category,
    });
    setShowEditModal(true);
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProduct?.name || !editProduct?.price || !editProduct?.stock) {
      toast.error("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }
    setSaving(true);
    try {
      const updated = await updateProduct(editProduct.id, {
        name: editProduct.name,
        category: editProduct.category,
        price: Number(editProduct.price),
        stock: Number(editProduct.stock),
        description: editProduct.description || null,
        emoji: editProduct.emoji,
        image: editProduct.image || null,
      });
      setProducts(products.map((p) => p.id === editProduct.id ? { ...p, ...editProduct, price: Number(editProduct.price), stock: Number(editProduct.stock) } : p));
      setShowEditModal(false);
      toast.success("تم تعديل المنتج بنجاح ✅");
    } catch (e: any) {
      toast.error(e.message || "حدث خطأ أثناء التعديل");
    } finally {
      setSaving(false);
    }
  };

  if (!mounted) return null;

  const filtered = products.filter((p) => p.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">إدارة المنتجات</h1>
          <p className="text-gray-500 text-sm">{products.length} منتج في قاعدة البيانات</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={loadData} disabled={loading}>
            <Loader2 className={`w-4 h-4 ml-1 ${loading ? "animate-spin" : ""}`} />
            تحديث
          </Button>
          <Button onClick={() => { setNewProduct({ ...EMPTY_FORM }); setShowAddModal(true); }}>
            <Plus className="w-4 h-4 ml-1" />
            إضافة منتج
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="بحث عن منتج..." className="pr-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <p className="text-sm text-gray-500">{filtered.length} نتيجة</p>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-right py-3 px-3 font-medium text-gray-500">المنتج</th>
                    <th className="text-right py-3 px-3 font-medium text-gray-500">التصنيف</th>
                    <th className="text-right py-3 px-3 font-medium text-gray-500">السعر</th>
                    <th className="text-right py-3 px-3 font-medium text-gray-500">المخزون</th>
                    <th className="text-right py-3 px-3 font-medium text-gray-500">الحالة</th>
                    <th className="text-right py-3 px-3 font-medium text-gray-500">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((product) => (
                    <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-xl overflow-hidden shrink-0">
                            {product.image ? (
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
                            ) : (
                              product.emoji || "📦"
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-navy-900 flex items-center gap-2">
                              {product.name}
                              <button onClick={() => toggleFeatured(product.id, product.is_featured)} title={product.is_featured ? "إلغاء التميز" : "تمييز المنتج"}>
                                <Star className={`w-3.5 h-3.5 transition-colors ${product.is_featured ? "text-amber-400 fill-amber-400" : "text-gray-300 hover:text-amber-300"}`} />
                              </button>
                            </p>
                            {product.description && <p className="text-xs text-gray-400 truncate max-w-[200px]">{product.description}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-gray-600 text-sm">
                        {typeof product.category === 'object' && product.category !== null
                          ? product.category.name_ar
                          : product.category}
                      </td>
                      <td className="py-3 px-3 font-bold text-navy-900">{Number(product.price).toLocaleString()} ج.م</td>
                      <td className="py-3 px-3">
                        <span className={`font-medium ${product.stock < 10 ? "text-red-500" : product.stock < 20 ? "text-amber-500" : "text-gray-600"}`}>
                          {product.stock}
                          {product.stock < 10 && <span className="text-xs mr-1">(منخفض)</span>}
                        </span>
                      </td>
                      <td className="py-3 px-3 cursor-pointer" onClick={() => toggleStatus(product.id, product.is_active)}>
                        <Badge variant={product.is_active ? "success" : "destructive"} className="cursor-pointer">
                          {product.is_active ? "✓ نشط" : "✕ مخفي"}
                        </Badge>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openEdit(product)}
                            className="p-2 rounded-lg hover:bg-sky-50 text-sky-500 transition-colors"
                            title="تعديل المنتج"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                            title="حذف المنتج"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-gray-400">
                        <p className="text-lg mb-1">لا توجد منتجات</p>
                        <p className="text-sm">اضغط على &quot;إضافة منتج&quot; لإضافة أول منتج</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ──── ADD MODAL ──── */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-navy-900">إضافة منتج جديد</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              {/* Emoji Picker */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">أيقونة المنتج</label>
                <div className="flex flex-wrap gap-2">
                  {EMOJIS.map(em => (
                    <button
                      key={em} type="button"
                      onClick={() => setNewProduct({ ...newProduct, emoji: em })}
                      className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${newProduct.emoji === em ? "bg-sky-100 ring-2 ring-sky-500" : "bg-gray-50 hover:bg-gray-100"}`}
                    >{em}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">اسم المنتج *</label>
                <Input required value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} className="mt-1" placeholder="مثال: زبدة الشيا الخام" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">التصنيف *</label>
                <select
                  value={newProduct.category}
                  onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="mt-1 w-full h-10 rounded-lg border border-gray-200 px-3 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none"
                >
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">السعر (ج.م) *</label>
                  <Input required type="number" min="0" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} className="mt-1" placeholder="250" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">المخزون *</label>
                  <Input required type="number" min="0" value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} className="mt-1" placeholder="50" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">رابط الصورة (اختياري)</label>
                <Input value={(newProduct as any).image || ""} onChange={e => setNewProduct({ ...newProduct, image: e.target.value } as any)} className="mt-1" placeholder="https://example.com/image.jpg" dir="ltr" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">وصف قصير (اختياري)</label>
                <Input value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} className="mt-1" placeholder="وصف مختصر للمنتج" />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)} className="flex-1">إلغاء</Button>
                <Button type="submit" className="flex-1" disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin ml-2" /> : <Plus className="w-4 h-4 ml-2" />}
                  {saving ? "جاري الحفظ..." : "إضافة المنتج"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ──── EDIT MODAL ──── */}
      {showEditModal && editProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-navy-900">تعديل المنتج</h2>
              <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEdit} className="space-y-4">
              {/* Emoji Picker */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">أيقونة المنتج</label>
                <div className="flex flex-wrap gap-2">
                  {EMOJIS.map(em => (
                    <button
                      key={em} type="button"
                      onClick={() => setEditProduct({ ...editProduct, emoji: em })}
                      className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${editProduct.emoji === em ? "bg-sky-100 ring-2 ring-sky-500" : "bg-gray-50 hover:bg-gray-100"}`}
                    >{em}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">اسم المنتج *</label>
                <Input required value={editProduct.name} onChange={e => setEditProduct({ ...editProduct, name: e.target.value })} className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">التصنيف *</label>
                <select
                  value={editProduct.category}
                  onChange={e => setEditProduct({ ...editProduct, category: e.target.value })}
                  className="mt-1 w-full h-10 rounded-lg border border-gray-200 px-3 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none"
                >
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">السعر (ج.م) *</label>
                  <Input required type="number" min="0" value={editProduct.price} onChange={e => setEditProduct({ ...editProduct, price: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">المخزون *</label>
                  <Input required type="number" min="0" value={editProduct.stock} onChange={e => setEditProduct({ ...editProduct, stock: e.target.value })} className="mt-1" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">رابط الصورة (اختياري)</label>
                <Input value={editProduct.image || ""} onChange={e => setEditProduct({ ...editProduct, image: e.target.value })} className="mt-1" placeholder="https://example.com/image.jpg" dir="ltr" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">وصف قصير (اختياري)</label>
                <Input value={editProduct.description || ""} onChange={e => setEditProduct({ ...editProduct, description: e.target.value })} className="mt-1" placeholder="وصف مختصر للمنتج" />
              </div>
              {/* Toggle Active */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm font-medium text-gray-700">حالة المنتج</span>
                <button
                  type="button"
                  onClick={() => setEditProduct({ ...editProduct, is_active: !editProduct.is_active })}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${editProduct.is_active ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}
                >
                  {editProduct.is_active ? "✓ نشط" : "✕ مخفي"}
                </button>
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setShowEditModal(false)} className="flex-1">إلغاء</Button>
                <Button type="submit" className="flex-1 bg-sky-500 hover:bg-sky-600" disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin ml-2" /> : <Save className="w-4 h-4 ml-2" />}
                  {saving ? "جاري الحفظ..." : "حفظ التعديلات"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
