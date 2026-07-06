"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, X, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { getAllCategories, createCategory, updateCategory, deleteCategory } from "@/lib/db";

const EMPTY_FORM = { name: "", slug: "", description: "" };

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Add Modal
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ ...EMPTY_FORM });

  // Edit Modal
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<any>(null);

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    setLoading(true);
    try {
      const data = await getAllCategories();
      setCategories(data || []);
    } catch (e) {
      console.error(e);
      toast.error("حدث خطأ في تحميل التصنيفات");
    } finally {
      setMounted(true);
      setLoading(false);
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.name || !newCategory.slug) {
      toast.error("يرجى تعبئة الاسم والرابط");
      return;
    }
    setSaving(true);
    try {
      const added = await createCategory({
        name: newCategory.name,
        slug: newCategory.slug,
        description: newCategory.description || null,
        is_active: true,
        sort_order: categories.length,
      });
      setCategories([added, ...categories]);
      setIsAddOpen(false);
      setNewCategory({ ...EMPTY_FORM });
      toast.success("تمت إضافة التصنيف بنجاح ✅");
    } catch (e: any) {
      toast.error(e.message || "حدث خطأ أثناء الإضافة");
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (cat: any) => {
    setEditCategory({
      ...cat,
      name: cat.name_ar || cat.name || "",
      description: cat.description_ar || cat.description || "",
    });
    setIsEditOpen(true);
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCategory?.name || !editCategory?.slug) {
      toast.error("يرجى تعبئة الاسم والرابط");
      return;
    }
    setSaving(true);
    try {
      await updateCategory(editCategory.id, {
        name: editCategory.name,
        slug: editCategory.slug,
        description: editCategory.description || null,
        is_active: editCategory.is_active,
      });
      setCategories(prev => prev.map(c => c.id === editCategory.id ? {
        ...c, name_ar: editCategory.name, slug: editCategory.slug,
        description_ar: editCategory.description, is_active: editCategory.is_active
      } : c));
      setIsEditOpen(false);
      toast.success("تم تعديل التصنيف بنجاح ✅");
    } catch (e: any) {
      toast.error(e.message || "حدث خطأ أثناء التعديل");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا التصنيف؟ سيؤثر ذلك على المنتجات المرتبطة به.")) return;
    try {
      await deleteCategory(id);
      setCategories(prev => prev.filter(c => c.id !== id));
      toast.success("تم حذف التصنيف بنجاح");
    } catch (e: any) {
      toast.error(e.message || "حدث خطأ أثناء الحذف");
    }
  };

  const toggleStatus = async (cat: any) => {
    try {
      await updateCategory(cat.id, { is_active: !cat.is_active });
      setCategories(prev => prev.map(c => c.id === cat.id ? { ...c, is_active: !c.is_active } : c));
      toast.success(`تم ${!cat.is_active ? "تفعيل" : "إخفاء"} التصنيف`);
    } catch (e: any) {
      toast.error(e.message || "حدث خطأ");
    }
  };

  if (!mounted) return null;

  const filtered = categories.filter(c => {
    const name = c.name_ar || c.name || "";
    return name.includes(search) || (c.slug || "").includes(search);
  });

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">إدارة التصنيفات</h1>
          <p className="text-gray-500 text-sm">{categories.length} تصنيف في قاعدة البيانات</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={loadData} disabled={loading}>
            <Loader2 className={`w-4 h-4 ml-1 ${loading ? "animate-spin" : ""}`} />
            تحديث
          </Button>
          <Button onClick={() => { setNewCategory({ ...EMPTY_FORM }); setIsAddOpen(true); }}>
            <Plus className="w-4 h-4 ml-1" />
            إضافة تصنيف
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="relative max-w-sm">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="بحث..." className="pr-9" value={search} onChange={(e) => setSearch(e.target.value)} />
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
                    <th className="text-right py-3 px-3 font-medium text-gray-500">التصنيف</th>
                    <th className="text-right py-3 px-3 font-medium text-gray-500">الرابط</th>
                    <th className="text-right py-3 px-3 font-medium text-gray-500">المنتجات</th>
                    <th className="text-right py-3 px-3 font-medium text-gray-500">الحالة</th>
                    <th className="text-right py-3 px-3 font-medium text-gray-500">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((cat) => {
                    const name = cat.name_ar || cat.name || "";
                    const productCount = Array.isArray(cat.products) ? cat.products.length : (cat.products || 0);
                    return (
                      <tr key={cat.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-3 font-medium text-navy-900">{name}</td>
                        <td className="py-3 px-3 text-gray-400 font-mono text-xs">{cat.slug}</td>
                        <td className="py-3 px-3">{productCount}</td>
                        <td className="py-3 px-3 cursor-pointer" onClick={() => toggleStatus(cat)}>
                          <Badge variant={cat.is_active ? "success" : "destructive"} className="cursor-pointer">
                            {cat.is_active ? "✓ نشط" : "✕ مخفي"}
                          </Badge>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1">
                            <button onClick={() => openEdit(cat)} className="p-2 rounded-lg hover:bg-sky-50 text-sky-500 transition-colors" title="تعديل">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(cat.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors" title="حذف">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-400">
                        <p className="text-lg mb-1">لا توجد تصنيفات</p>
                        <p className="text-sm">اضغط على &quot;إضافة تصنيف&quot; لإنشاء أول تصنيف</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-navy-900">إضافة تصنيف جديد</h2>
              <button onClick={() => setIsAddOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <Label>اسم التصنيف *</Label>
                <Input
                  value={newCategory.name}
                  onChange={e => setNewCategory({ ...newCategory, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\u0600-\u06FF-]/g, "") })}
                  className="mt-1"
                  placeholder="مثال: زيوت طبيعية"
                  required
                />
              </div>
              <div>
                <Label>الرابط (Slug - بالإنجليزية) *</Label>
                <Input
                  value={newCategory.slug}
                  onChange={e => setNewCategory({ ...newCategory, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                  className="mt-1"
                  dir="ltr"
                  placeholder="natural-oils"
                  required
                />
              </div>
              <div>
                <Label>وصف (اختياري)</Label>
                <Input
                  value={newCategory.description}
                  onChange={e => setNewCategory({ ...newCategory, description: e.target.value })}
                  className="mt-1"
                  placeholder="وصف مختصر للتصنيف"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} className="flex-1">إلغاء</Button>
                <Button type="submit" className="flex-1" disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin ml-2" /> : <Plus className="w-4 h-4 ml-2" />}
                  {saving ? "جاري الحفظ..." : "إضافة التصنيف"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditOpen && editCategory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-navy-900">تعديل التصنيف</h2>
              <button onClick={() => setIsEditOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <Label>اسم التصنيف *</Label>
                <Input
                  value={editCategory.name}
                  onChange={e => setEditCategory({ ...editCategory, name: e.target.value })}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label>الرابط (Slug) *</Label>
                <Input
                  value={editCategory.slug || ""}
                  onChange={e => setEditCategory({ ...editCategory, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                  className="mt-1"
                  dir="ltr"
                  required
                />
              </div>
              <div>
                <Label>وصف (اختياري)</Label>
                <Input
                  value={editCategory.description || ""}
                  onChange={e => setEditCategory({ ...editCategory, description: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm font-medium text-gray-700">حالة التصنيف</span>
                <button
                  type="button"
                  onClick={() => setEditCategory({ ...editCategory, is_active: !editCategory.is_active })}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${editCategory.is_active ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}
                >
                  {editCategory.is_active ? "✓ نشط" : "✕ مخفي"}
                </button>
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)} className="flex-1">إلغاء</Button>
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
