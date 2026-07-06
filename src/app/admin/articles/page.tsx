"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Edit, Trash2, X, Image as ImageIcon, Loader2, Save, Eye, EyeOff, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { getArticles, createArticle, deleteArticle, getSupabase } from "@/lib/db";
import Link from "next/link";

const CATEGORIES = ["خامات تجميل", "ريادة أعمال", "معلومات", "تركيبات", "نصائح", "أخبار"];
const EMPTY_FORM = { title: "", category: "معلومات", content: "", excerpt: "", image: "", is_published: true };

export default function ArticlesAdminPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({ ...EMPTY_FORM });
  const [editingId, setEditingId] = useState<any>(null);

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    setLoading(true);
    try {
      // getArticles(false) = get all including unpublished
      const supabase = getSupabase();
      let data;
      if (supabase) {
        const { data: res } = await supabase
          .from("articles")
          .select("*")
          .order("created_at", { ascending: false });
        data = res;
      }
      if (supabase) {
        setArticles(data || []);
      } else {
        const saved = localStorage.getItem("alphabreeze_articles");
        if (saved) setArticles(JSON.parse(saved));
        else setArticles([
          { id: 1, title: "أهم 10 خامات أساسية في صناعة مستحضرات التجميل", content: "تفاصيل...", category: "خامات تجميل", views: 1250, is_published: true, published: true, created_at: new Date().toISOString() },
          { id: 2, title: "كيف تبدأ مشروع مستحضرات تجميل ناجح", content: "تفاصيل...", category: "ريادة أعمال", views: 890, is_published: true, published: true, created_at: new Date().toISOString() },
        ]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setMounted(true);
      setLoading(false);
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.category) {
      toast.error("يرجى تعبئة العنوان والتصنيف والمحتوى");
      return;
    }
    setSaving(true);
    try {
      const supabase = getSupabase();
      let added;
      if (supabase) {
        const slug = formData.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9\u0600-\u06FF-]/g, "")
          .substring(0, 80) + "-" + Date.now();

        // 1. Get or create category
        let categoryId = null;
        if (formData.category) {
          const { data: catData } = await supabase.from("article_categories").select("id").eq("name_ar", formData.category).single();
          if (catData) {
            categoryId = catData.id;
          } else {
            const { data: newCat } = await supabase.from("article_categories").insert({
              name_ar: formData.category,
              slug: formData.category.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
            }).select().single();
            if (newCat) categoryId = newCat.id;
          }
        }

        const { data, error } = await supabase.from("articles").insert({
          title_ar: formData.title,
          excerpt_ar: formData.excerpt || formData.content.substring(0, 150) + "...",
          content_ar: formData.content,
          category_id: categoryId,
          featured_image: formData.image || null,
          og_image_url: formData.image || null,
          is_published: formData.is_published,
          slug,
          views_count: 0,
        }).select().single();
        if (error) throw new Error(error.message);
        added = data;
      } else {
        const newA = {
          id: Date.now(),
          title: formData.title,
          title_ar: formData.title,
          content: formData.content,
          content_ar: formData.content,
          category: formData.category,
          image: formData.image || null,
          image_url: formData.image || null,
          is_published: formData.is_published,
          published: formData.is_published,
          views: 0,
          created_at: new Date().toISOString(),
        };
        const local = [...articles, newA];
        localStorage.setItem("alphabreeze_articles", JSON.stringify(local));
        added = newA;
      }
      setArticles(prev => [added, ...prev]);
      setShowAddModal(false);
      setFormData({ ...EMPTY_FORM });
      toast.success("تمت إضافة المقال ونشره بنجاح ✅");
    } catch (e: any) {
      toast.error(e.message || "حدث خطأ أثناء الإضافة");
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (article: any) => {
    setEditingId(article.id);
    setFormData({
      title: article.title_ar || article.title || "",
      category: typeof article.category === 'object' && article.category ? article.category.name_ar : (article.category || ""),
      content: article.content_ar || article.content || "",
      excerpt: article.excerpt_ar || article.excerpt || "",
      image: article.featured_image || article.og_image_url || article.image_url || article.image || "",
      is_published: article.is_published ?? article.published ?? true,
    });
    setShowEditModal(true);
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      toast.error("يرجى تعبئة العنوان والمحتوى");
      return;
    }
    setSaving(true);
    try {
      const supabase = getSupabase();
      if (supabase) {
        // 1. Get or create category
        let categoryId = null;
        if (formData.category) {
          const { data: catData } = await supabase.from("article_categories").select("id").eq("name_ar", formData.category).single();
          if (catData) {
            categoryId = catData.id;
          } else {
            const { data: newCat } = await supabase.from("article_categories").insert({
              name_ar: formData.category,
              slug: formData.category.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
            }).select().single();
            if (newCat) categoryId = newCat.id;
          }
        }

        const { error } = await supabase.from("articles").update({
          title_ar: formData.title,
          excerpt_ar: formData.excerpt || formData.content.substring(0, 150) + "...",
          content_ar: formData.content,
          category_id: categoryId,
          featured_image: formData.image || null,
          og_image_url: formData.image || null,
          is_published: formData.is_published,
          updated_at: new Date().toISOString(),
        }).eq("id", editingId);
        if (error) throw new Error(error.message);
      } else {
        const local = articles.map(a => a.id === editingId ? {
          ...a,
          title: formData.title, title_ar: formData.title,
          content: formData.content, content_ar: formData.content,
          category: formData.category,
          image: formData.image, image_url: formData.image,
          is_published: formData.is_published, published: formData.is_published,
        } : a);
        localStorage.setItem("alphabreeze_articles", JSON.stringify(local));
      }
      setArticles(prev => prev.map(a => a.id === editingId ? {
        ...a,
        title_ar: formData.title, title: formData.title,
        content_ar: formData.content, content: formData.content,
        category: formData.category,
        image_url: formData.image, image: formData.image,
        is_published: formData.is_published, published: formData.is_published,
      } : a));
      setShowEditModal(false);
      toast.success("تم تحديث المقال بنجاح ✅");
    } catch (e: any) {
      toast.error(e.message || "حدث خطأ أثناء التعديل");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: any) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا المقال؟")) return;
    try {
      await deleteArticle(String(id));
      setArticles(prev => prev.filter(a => a.id !== id));
      toast.success("تم حذف المقال بنجاح");
    } catch (e: any) {
      toast.error(e.message || "حدث خطأ أثناء الحذف");
    }
  };

  const togglePublish = async (article: any) => {
    const newStatus = !(article.is_published ?? article.published);
    try {
      const supabase = getSupabase();
      if (supabase) {
        await supabase.from("articles").update({ is_published: newStatus }).eq("id", article.id);
      } else {
        const local = articles.map(a => a.id === article.id ? { ...a, is_published: newStatus, published: newStatus } : a);
        localStorage.setItem("alphabreeze_articles", JSON.stringify(local));
      }
      setArticles(prev => prev.map(a => a.id === article.id ? { ...a, is_published: newStatus, published: newStatus } : a));
      toast.success(newStatus ? "تم نشر المقال ✅" : "تم إخفاء المقال");
    } catch (e: any) {
      toast.error(e.message || "حدث خطأ");
    }
  };

  if (!mounted) return null;

  const filtered = articles.filter(a => {
    const catName = typeof a.category === 'object' && a.category ? a.category.name_ar : (a.category || "");
    return (a.title_ar || a.title || "").includes(search) || catName.includes(search);
  });

  const ArticleForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <form onSubmit={isEdit ? handleEdit : handleAdd} className="space-y-4">
      <div>
        <Label>عنوان المقال *</Label>
        <Input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="mt-1" placeholder="مثال: فوائد زبدة الشيا للبشرة الجافة" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>التصنيف *</Label>
          <select
            value={formData.category}
            onChange={e => setFormData({ ...formData, category: e.target.value })}
            className="mt-1 w-full h-10 rounded-lg border border-gray-200 px-3 text-sm focus:border-sky-500 outline-none"
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <Label>حالة النشر</Label>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, is_published: !formData.is_published })}
            className={`mt-1 w-full h-10 rounded-lg border text-sm font-medium flex items-center justify-center gap-2 transition-colors ${formData.is_published ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-gray-50 border-gray-200 text-gray-600"}`}
          >
            {formData.is_published ? <><Eye className="w-4 h-4" />منشور</> : <><EyeOff className="w-4 h-4" />مسودة</>}
          </button>
        </div>
      </div>
      <div>
        <Label>رابط صورة المقال (اختياري)</Label>
        <Input value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="mt-1" placeholder="https://example.com/image.jpg" dir="ltr" />
        {formData.image && <img src={formData.image} alt="preview" className="mt-2 h-24 w-full object-cover rounded-lg border" onError={e => (e.currentTarget.style.display = 'none')} />}
      </div>
      <div>
        <Label>مقتطف (اختياري)</Label>
        <Input value={formData.excerpt} onChange={e => setFormData({ ...formData, excerpt: e.target.value })} className="mt-1" placeholder="وصف مختصر يظهر في قائمة المقالات (إن تُرك فارغاً يُأخذ من المحتوى)" />
      </div>
      <div>
        <Label>محتوى المقال *</Label>
        <Textarea required value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} className="mt-1 min-h-[200px]" placeholder="اكتب محتوى المقال الكامل هنا..." />
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={() => { setShowAddModal(false); setShowEditModal(false); }} className="flex-1">إلغاء</Button>
        <Button type="submit" className="flex-1" disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 animate-spin ml-2" /> : isEdit ? <Save className="w-4 h-4 ml-2" /> : <Plus className="w-4 h-4 ml-2" />}
          {saving ? "جاري الحفظ..." : isEdit ? "حفظ التعديلات" : "نشر المقال"}
        </Button>
      </div>
    </form>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">إدارة المقالات</h1>
          <p className="text-gray-500 text-sm">
            {articles.filter(a => a.is_published || a.published).length} منشور •{" "}
            {articles.filter(a => !a.is_published && !a.published).length} مسودة
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={loadData} disabled={loading}>
            <Loader2 className={`w-4 h-4 ml-1 ${loading ? "animate-spin" : ""}`} />
            تحديث
          </Button>
          <Button onClick={() => { setFormData({ ...EMPTY_FORM }); setShowAddModal(true); }}>
            <Plus className="w-4 h-4 ml-1" />
            إضافة مقال
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="relative max-w-sm">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="بحث في المقالات..." className="pr-9" value={search} onChange={e => setSearch(e.target.value)} />
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
                    <th className="text-right py-3 px-3 font-medium text-gray-500">المقال</th>
                    <th className="text-right py-3 px-3 font-medium text-gray-500">التصنيف</th>
                    <th className="text-right py-3 px-3 font-medium text-gray-500">المشاهدات</th>
                    <th className="text-right py-3 px-3 font-medium text-gray-500">الحالة</th>
                    <th className="text-right py-3 px-3 font-medium text-gray-500">التاريخ</th>
                    <th className="text-right py-3 px-3 font-medium text-gray-500">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(a => {
                    const isPublished = a.is_published ?? a.published ?? false;
                    const title = a.title_ar || a.title || "";
                    const dateStr = a.created_at ? new Date(a.created_at).toLocaleDateString("en-GB") : (a.date || "");
                    const img = a.featured_image || a.og_image_url || a.image_url || a.image;
                    const catName = typeof a.category === 'object' && a.category ? a.category.name_ar : (a.category || "");
                    return (
                      <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-3 max-w-xs">
                            <div className="w-12 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                              {img ? <img src={img} alt={title} className="w-full h-full object-cover" onError={e => (e.currentTarget.src = "")} /> : <ImageIcon className="w-5 h-5 text-gray-400" />}
                            </div>
                            <span className="font-medium text-navy-900 truncate">{title}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3"><Badge variant="outline">{catName}</Badge></td>
                        <td className="py-3 px-3 text-gray-600">{a.views || 0}</td>
                        <td className="py-3 px-3">
                          <button onClick={() => togglePublish(a)} className={`text-xs font-semibold px-3 py-1 rounded-full border transition-colors ${isPublished ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" : "bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200"}`}>
                            {isPublished ? "✓ منشور" : "◌ مسودة"}
                          </button>
                        </td>
                        <td className="py-3 px-3 text-gray-400 text-xs">{dateStr}</td>
                        <td className="py-3 px-3">
                          <div className="flex gap-1">
                            {isPublished && (
                              <Link href={`/articles/${a.id}`} target="_blank" className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors" title="عرض المقال">
                                <ExternalLink className="w-4 h-4" />
                              </Link>
                            )}
                            <button onClick={() => openEdit(a)} className="p-2 rounded-lg hover:bg-sky-50 text-sky-500 transition-colors" title="تعديل">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(a.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors" title="حذف">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filtered.length === 0 && (
                    <tr><td colSpan={6} className="py-12 text-center text-gray-400">لا توجد مقالات — اضغط &quot;إضافة مقال&quot; لإنشاء أول مقال</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-navy-900">إضافة مقال جديد</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6"><ArticleForm /></div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-navy-900">تعديل المقال</h2>
              <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6"><ArticleForm isEdit /></div>
          </div>
        </div>
      )}
    </div>
  );
}
