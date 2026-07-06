"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Eye, EyeOff, X, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { getBanners, createBanner, updateBanner, deleteBanner } from "@/lib/db";

const typeLabels: Record<string, string> = { hero: "بنر رئيسي", promotion: "عرض ترويجي", popup: "إعلان منبثق" };
const EMPTY_FORM = { title: "", type: "hero", image_url: "", link_url: "" };

export default function BannersPage() {
  const [banners, setBanners] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Add Modal
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newBanner, setNewBanner] = useState({ ...EMPTY_FORM });

  // Edit Modal
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editBanner, setEditBanner] = useState<any>(null);

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    setLoading(true);
    try {
      const data = await getBanners();
      setBanners(data || []);
    } catch (e) {
      console.error(e);
      toast.error("حدث خطأ في تحميل البنرات");
    } finally {
      setMounted(true);
      setLoading(false);
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBanner.title) {
      toast.error("يرجى إدخال عنوان البنر");
      return;
    }
    setSaving(true);
    try {
      const added = await createBanner({
        title: newBanner.title,
        type: newBanner.type,
        image_url: newBanner.image_url || "https://placehold.co/1200x400/0ea5e9/ffffff?text=AlphaBreeze+Banner",
        link_url: newBanner.link_url || null,
        is_active: true,
        sort_order: banners.length,
      });
      setBanners([...banners, added]);
      setIsAddOpen(false);
      setNewBanner({ ...EMPTY_FORM });
      toast.success("تمت إضافة البنر بنجاح ✅");
    } catch (e: any) {
      toast.error(e.message || "حدث خطأ أثناء الإضافة");
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (banner: any) => {
    setEditBanner({
      ...banner,
      title: banner.title_ar || banner.title || "",
    });
    setIsEditOpen(true);
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editBanner?.title) {
      toast.error("يرجى إدخال عنوان البنر");
      return;
    }
    setSaving(true);
    try {
      await updateBanner(editBanner.id, {
        title: editBanner.title,
        type: editBanner.type,
        image_url: editBanner.image_url,
        link_url: editBanner.link_url,
        is_active: editBanner.is_active,
      });
      setBanners(prev => prev.map(b => b.id === editBanner.id ? {
        ...b,
        title_ar: editBanner.title,
        type: editBanner.type,
        image_url: editBanner.image_url,
        link_url: editBanner.link_url,
        is_active: editBanner.is_active,
      } : b));
      setIsEditOpen(false);
      toast.success("تم تعديل البنر بنجاح ✅");
    } catch (e: any) {
      toast.error(e.message || "حدث خطأ أثناء التعديل");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا البنر؟")) return;
    try {
      await deleteBanner(id);
      setBanners(prev => prev.filter(b => b.id !== id));
      toast.success("تم حذف البنر بنجاح");
    } catch (e: any) {
      toast.error(e.message || "حدث خطأ أثناء الحذف");
    }
  };

  const toggleActive = async (banner: any) => {
    try {
      await updateBanner(banner.id, { is_active: !banner.is_active });
      setBanners(prev => prev.map(b => b.id === banner.id ? { ...b, is_active: !b.is_active } : b));
      toast.success(`تم ${!banner.is_active ? "تفعيل" : "إخفاء"} البنر`);
    } catch (e: any) {
      toast.error(e.message || "حدث خطأ");
    }
  };

  if (!mounted) return null;

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">إدارة البنرات والإعلانات</h1>
          <p className="text-gray-500 text-sm">{banners.length} بنر في قاعدة البيانات</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={loadData} disabled={loading}>
            <Loader2 className={`w-4 h-4 ml-1 ${loading ? "animate-spin" : ""}`} />
            تحديث
          </Button>
          <Button onClick={() => { setNewBanner({ ...EMPTY_FORM }); setIsAddOpen(true); }}>
            <Plus className="w-4 h-4 ml-1" />
            إضافة بنر
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {banners.map((b) => {
            const title = b.title_ar || b.title || "بنر بدون عنوان";
            return (
              <Card key={b.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-[2/1] bg-gradient-to-br from-sky-100 to-blue-50 rounded-t-2xl flex items-center justify-center relative overflow-hidden group">
                    {b.image_url ? (
                      <img src={b.image_url} alt={title} className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = "none")} />
                    ) : (
                      <span className="text-4xl">🖼️</span>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button variant="ghost" className="text-white hover:text-sky-300" onClick={() => toggleActive(b)}>
                        {b.is_active ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-navy-900 text-sm truncate flex-1">{title}</h3>
                      <Badge variant={b.is_active ? "success" : "destructive"} className="mr-2 shrink-0">
                        {b.is_active ? "نشط" : "معطل"}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="text-xs mb-3">{typeLabels[b.type] || b.type}</Badge>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => openEdit(b)}>
                        <Edit className="w-3 h-3 ml-1" /> تعديل
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(b.id)}>
                        <Trash2 className="w-3 h-3 ml-1" /> حذف
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {banners.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-400">
              <p className="text-lg mb-2">لا توجد بنرات</p>
              <p className="text-sm">اضغط على &quot;إضافة بنر&quot; لإنشاء أول بنر</p>
            </div>
          )}
        </div>
      )}

      {/* Add Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-navy-900">إضافة بنر جديد</h2>
              <button onClick={() => setIsAddOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <Label>عنوان البنر *</Label>
                <Input value={newBanner.title} onChange={e => setNewBanner({ ...newBanner, title: e.target.value })} className="mt-1" placeholder="مثال: عرض خامات التجميل" required />
              </div>
              <div>
                <Label>نوع البنر</Label>
                <select
                  className="w-full mt-1 h-10 rounded-lg border border-gray-200 px-3 text-sm focus:border-sky-500 outline-none"
                  value={newBanner.type}
                  onChange={e => setNewBanner({ ...newBanner, type: e.target.value })}
                >
                  <option value="hero">بنر رئيسي (Hero)</option>
                  <option value="promotion">عرض ترويجي</option>
                  <option value="popup">إعلان منبثق (Popup)</option>
                </select>
              </div>
              <div>
                <Label>رابط الصورة</Label>
                <Input value={newBanner.image_url} onChange={e => setNewBanner({ ...newBanner, image_url: e.target.value })} className="mt-1" placeholder="https://example.com/banner.jpg" dir="ltr" />
              </div>
              <div>
                <Label>رابط البنر (اختياري)</Label>
                <Input value={newBanner.link_url} onChange={e => setNewBanner({ ...newBanner, link_url: e.target.value })} className="mt-1" placeholder="https://example.com/page" dir="ltr" />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} className="flex-1">إلغاء</Button>
                <Button type="submit" className="flex-1" disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin ml-2" /> : <Plus className="w-4 h-4 ml-2" />}
                  {saving ? "جاري الحفظ..." : "إضافة البنر"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditOpen && editBanner && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-navy-900">تعديل البنر</h2>
              <button onClick={() => setIsEditOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <Label>عنوان البنر *</Label>
                <Input value={editBanner.title} onChange={e => setEditBanner({ ...editBanner, title: e.target.value })} className="mt-1" required />
              </div>
              <div>
                <Label>نوع البنر</Label>
                <select
                  className="w-full mt-1 h-10 rounded-lg border border-gray-200 px-3 text-sm focus:border-sky-500 outline-none"
                  value={editBanner.type}
                  onChange={e => setEditBanner({ ...editBanner, type: e.target.value })}
                >
                  <option value="hero">بنر رئيسي (Hero)</option>
                  <option value="promotion">عرض ترويجي</option>
                  <option value="popup">إعلان منبثق (Popup)</option>
                </select>
              </div>
              <div>
                <Label>رابط الصورة</Label>
                <Input value={editBanner.image_url || ""} onChange={e => setEditBanner({ ...editBanner, image_url: e.target.value })} className="mt-1" dir="ltr" />
              </div>
              <div>
                <Label>رابط البنر (اختياري)</Label>
                <Input value={editBanner.link_url || ""} onChange={e => setEditBanner({ ...editBanner, link_url: e.target.value })} className="mt-1" dir="ltr" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm font-medium text-gray-700">حالة البنر</span>
                <button
                  type="button"
                  onClick={() => setEditBanner({ ...editBanner, is_active: !editBanner.is_active })}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${editBanner.is_active ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}
                >
                  {editBanner.is_active ? "✓ نشط" : "✕ معطل"}
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
