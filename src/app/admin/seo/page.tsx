"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Save, Globe, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getSeoSettings, saveSeoSettings } from "@/lib/db";

const DEFAULT_SEO = {
  title: "AlphaBreeze | شريك نجاحك في صناعة مستحضرات التجميل",
  description: "ألفا بريز - الشريك الرائد لرواد الأعمال ومصنعي مستحضرات التجميل في مصر. خامات تجميل، تصنيع برايفت ليبل، تطوير تركيبات.",
  keywords: "خامات تجميل, تصنيع مستحضرات تجميل, برايفت ليبل, AlphaBreeze",
  ogImage: "",
  canonicalUrl: "https://alphabreeze.com",
};

export default function SEOPage() {
  const [seo, setSeo] = useState(DEFAULT_SEO);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadSeo = async () => {
      try {
        const loaded = await getSeoSettings("home");
        setSeo({ ...DEFAULT_SEO, ...loaded });
      } catch {}
      setLoading(false);
    };

    loadSeo();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSeoSettings(seo, "home");
      toast.success("تم حفظ إعدادات SEO بنجاح");
    } catch {
      toast.error("حدث خطأ أثناء الحفظ");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">إعدادات SEO</h1>
          <p className="text-gray-500 text-sm">إعدادات تحسين محركات البحث العامة</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          حفظ التغييرات
        </Button>
      </div>

      <Card>
        <CardHeader><CardTitle>الإعدادات العامة</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <div>
            <Label>عنوان الموقع (Title)</Label>
            <Input value={seo.title} onChange={(e) => setSeo({ ...seo, title: e.target.value })} className="mt-1.5" />
          </div>
          <div>
            <Label>الوصف (Meta Description)</Label>
            <Textarea value={seo.description} onChange={(e) => setSeo({ ...seo, description: e.target.value })} className="mt-1.5" />
          </div>
          <div>
            <Label>الكلمات المفتاحية (Keywords)</Label>
            <Input value={seo.keywords} onChange={(e) => setSeo({ ...seo, keywords: e.target.value })} className="mt-1.5" />
          </div>
          <div>
            <Label>صورة Open Graph</Label>
            <Input value={seo.ogImage} onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })} placeholder="رابط الصورة" className="mt-1.5" dir="ltr" />
          </div>
          <div>
            <Label>Canonical URL</Label>
            <Input value={seo.canonicalUrl} onChange={(e) => setSeo({ ...seo, canonicalUrl: e.target.value })} className="mt-1.5" dir="ltr" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>ملفات SEO</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-sky-500" />
              <div>
                <p className="font-medium text-navy-900">sitemap.xml</p>
                <p className="text-xs text-gray-400">يتم إنشاؤه تلقائياً</p>
              </div>
            </div>
            <Button variant="outline" size="sm">إعادة الإنشاء</Button>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-sky-500" />
              <div>
                <p className="font-medium text-navy-900">robots.txt</p>
                <p className="text-xs text-gray-400">يتم إنشاؤه تلقائياً</p>
              </div>
            </div>
            <Button variant="outline" size="sm">تعديل</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
