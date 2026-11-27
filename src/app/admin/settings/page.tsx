"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Save, Phone, Mail, MapPin, Globe, Loader2,
  Lock, Eye, EyeOff, User, Shield, Truck,
  Palette, CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import { changePassword, getAdminInfo, updateAdminProfile } from "@/lib/auth";
import { getSiteSettings, saveSiteSettings } from "@/lib/db";

// ─── Default site settings ───────────────────────────────────────────────────
const DEFAULT_SETTINGS = {
  siteNameAr: "ألفا بريز",
  siteNameEn: "AlphaBreeze",
  siteDescAr: "شريك نجاحك في صناعة مستحضرات التجميل والخامات",
  phone1: "01119446474",
  phone2: "01016067979",
  whatsapp: "01019946409",
  email: "info@alphabreeze.com",
  addressAr: "طريق جسر السويس الرئيسي، أمام محطة مترو نادي الشمس، القاهرة، مصر",
  mapsLink: "https://maps.google.com",
  mapsEmbed: "",
  shippingCost: "50",
  minOrder: "100",
  freeShipping: "500",
  currency: "EGP",
  primaryColor: "#0ea5e9",
  facebookUrl: "",
  instagramUrl: "",
  tiktokUrl: "",
  youtubeUrl: "",
  headerBanner: "",
  footerText: "جميع الحقوق محفوظة © 2024 AlphaBreeze",
};

// ─── Section Tab ─────────────────────────────────────────────────────────────
const TABS = [
  { id: "general", label: "عام", icon: Globe },
  { id: "contact", label: "التواصل", icon: Phone },
  { id: "shipping", label: "الشحن", icon: Truck },
  { id: "social", label: "السوشيال", icon: Palette },
  { id: "security", label: "الأمان", icon: Shield },
];

export default function SettingsPage() {
  const [tab, setTab] = useState("general");
  const [saving, setSaving] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  // Profile
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);

  // Password
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const loaded = await getSiteSettings();
        setSettings({ ...DEFAULT_SETTINGS, ...loaded });
      } catch {}
      try {
        const info = getAdminInfo();
        if (info) { setAdminName(info.name); setAdminEmail(info.email); }
      } catch {}
      setMounted(true);
    };

    loadSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings((p) => ({ ...p, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveSiteSettings(settings);
      setSaved(true);
      toast.success("تم حفظ الإعدادات بنجاح ✓");
      setTimeout(() => setSaved(false), 3000);
    } catch {
      toast.error("حدث خطأ أثناء الحفظ");
    } finally {
      setSaving(false);
    }
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminName.trim() || !adminEmail.trim()) {
      toast.error("يرجى ملء جميع الحقول");
      return;
    }
    setProfileSaving(true);
    setTimeout(() => {
      updateAdminProfile({ name: adminName, email: adminEmail });
      toast.success("تم تحديث الملف الشخصي ✓");
      setProfileSaving(false);
    }, 500);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPw || !newPw || !confirmPw) {
      toast.error("يرجى ملء جميع حقول كلمة المرور");
      return;
    }
    if (newPw !== confirmPw) {
      toast.error("كلمة المرور الجديدة وتأكيدها غير متطابقتان");
      return;
    }
    if (newPw.length < 8) {
      toast.error("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
      return;
    }
    setPwLoading(true);
    const result = await changePassword(currentPw, newPw);
    if (result.ok) {
      toast.success(result.message);
      setCurrentPw(""); setNewPw(""); setConfirmPw("");
    } else {
      toast.error(result.message);
    }
    setPwLoading(false);
  };

  if (!mounted) return null;

  return (
    <div className="space-y-6 max-w-4xl" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إعدادات الموقع</h1>
          <p className="text-gray-500 text-sm mt-0.5">تحكم في جميع إعدادات المنصة من هنا</p>
        </div>
        {tab !== "security" && (
          <Button onClick={handleSave} disabled={saving} className="gap-2 shadow-sm">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saving ? "جاري الحفظ..." : saved ? "تم الحفظ ✓" : "حفظ التغييرات"}
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit flex-wrap">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t.id
                ? "bg-white text-sky-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave}>
        {/* ── GENERAL ── */}
        {tab === "general" && (
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Globe className="w-4 h-4 text-sky-500" />معلومات الموقع</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div><Label>اسم الموقع (عربي)</Label><Input name="siteNameAr" value={settings.siteNameAr} onChange={handleChange} className="mt-1.5" /></div>
                <div><Label>اسم الموقع (إنجليزي)</Label><Input name="siteNameEn" value={settings.siteNameEn} onChange={handleChange} className="mt-1.5" dir="ltr" /></div>
                <div><Label>وصف الموقع</Label><Textarea name="siteDescAr" value={settings.siteDescAr} onChange={handleChange} className="mt-1.5" rows={3} /></div>
                <div><Label>نص الفوتر</Label><Input name="footerText" value={settings.footerText} onChange={handleChange} className="mt-1.5" /></div>
                <div><Label>العملة</Label>
                  <select name="currency" value={settings.currency} onChange={handleChange}
                    className="w-full mt-1.5 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-sky-400 outline-none">
                    <option value="EGP">جنيه مصري (ج.م)</option>
                    <option value="USD">دولار ($)</option>
                    <option value="SAR">ريال سعودي (ر.س)</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2 text-base"><MapPin className="w-4 h-4 text-sky-500" />العنوان والخريطة</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div><Label>العنوان (عربي)</Label><Textarea name="addressAr" value={settings.addressAr} onChange={handleChange} className="mt-1.5" rows={3} /></div>
                <div><Label>رابط خرائط جوجل</Label><Input name="mapsLink" value={settings.mapsLink} onChange={handleChange} className="mt-1.5" dir="ltr" /></div>
                <div><Label>كود الخريطة (Embed iframe)</Label><Textarea name="mapsEmbed" value={settings.mapsEmbed} onChange={handleChange} placeholder="الصق كود iframe هنا..." className="mt-1.5 font-mono text-xs" rows={4} dir="ltr" /></div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ── CONTACT ── */}
        {tab === "contact" && (
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Phone className="w-4 h-4 text-sky-500" />معلومات الاتصال</CardTitle></CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div><Label>رقم الهاتف 1</Label><Input name="phone1" value={settings.phone1} onChange={handleChange} className="mt-1.5" /></div>
              <div><Label>رقم الهاتف 2</Label><Input name="phone2" value={settings.phone2} onChange={handleChange} className="mt-1.5" /></div>
              <div><Label>رقم واتساب</Label><Input name="whatsapp" value={settings.whatsapp} onChange={handleChange} className="mt-1.5" /></div>
              <div><Label>البريد الإلكتروني</Label><Input name="email" value={settings.email} onChange={handleChange} type="email" className="mt-1.5" dir="ltr" /></div>
              <div><Label>بانر الهيدر (نص إعلاني)</Label><Input name="headerBanner" value={settings.headerBanner} onChange={handleChange} placeholder="مثال: شحن مجاني للطلبات فوق 500 ج.م" className="mt-1.5" /></div>
            </CardContent>
          </Card>
        )}

        {/* ── SHIPPING ── */}
        {tab === "shipping" && (
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Truck className="w-4 h-4 text-sky-500" />إعدادات الشحن والطلبات</CardTitle></CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4">
              <div><Label>تكلفة الشحن الافتراضية</Label><Input name="shippingCost" value={settings.shippingCost} onChange={handleChange} type="number" min="0" className="mt-1.5" /></div>
              <div><Label>الحد الأدنى للطلب</Label><Input name="minOrder" value={settings.minOrder} onChange={handleChange} type="number" min="0" className="mt-1.5" /></div>
              <div><Label>شحن مجاني فوق (ج.م)</Label><Input name="freeShipping" value={settings.freeShipping} onChange={handleChange} type="number" min="0" className="mt-1.5" /></div>
            </CardContent>
          </Card>
        )}

        {/* ── SOCIAL ── */}
        {tab === "social" && (
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Palette className="w-4 h-4 text-sky-500" />روابط التواصل الاجتماعي</CardTitle></CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div><Label>فيسبوك</Label><Input name="facebookUrl" value={settings.facebookUrl} onChange={handleChange} placeholder="https://facebook.com/..." className="mt-1.5" dir="ltr" /></div>
              <div><Label>إنستجرام</Label><Input name="instagramUrl" value={settings.instagramUrl} onChange={handleChange} placeholder="https://instagram.com/..." className="mt-1.5" dir="ltr" /></div>
              <div><Label>تيك توك</Label><Input name="tiktokUrl" value={settings.tiktokUrl} onChange={handleChange} placeholder="https://tiktok.com/@..." className="mt-1.5" dir="ltr" /></div>
              <div><Label>يوتيوب</Label><Input name="youtubeUrl" value={settings.youtubeUrl} onChange={handleChange} placeholder="https://youtube.com/@..." className="mt-1.5" dir="ltr" /></div>
            </CardContent>
          </Card>
        )}
      </form>

      {/* ── SECURITY (no form wrap needed) ── */}
      {tab === "security" && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Profile */}
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2 text-base"><User className="w-4 h-4 text-sky-500" />الملف الشخصي</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSave} className="space-y-4">
                <div><Label>الاسم</Label><Input value={adminName} onChange={e => setAdminName(e.target.value)} className="mt-1.5" required /></div>
                <div><Label>البريد الإلكتروني</Label><Input value={adminEmail} onChange={e => setAdminEmail(e.target.value)} type="email" className="mt-1.5" dir="ltr" required /></div>
                <Button type="submit" disabled={profileSaving} className="w-full gap-2">
                  {profileSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  حفظ الملف الشخصي
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Password change */}
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Lock className="w-4 h-4 text-red-500" />تغيير كلمة المرور</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <Label>كلمة المرور الحالية</Label>
                  <div className="relative mt-1.5">
                    <Input value={currentPw} onChange={e => setCurrentPw(e.target.value)} type={showCurrent ? "text" : "password"} className="pl-10" required />
                    <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <Label>كلمة المرور الجديدة</Label>
                  <div className="relative mt-1.5">
                    <Input value={newPw} onChange={e => setNewPw(e.target.value)} type={showNew ? "text" : "password"} className="pl-10" required minLength={8} />
                    <button type="button" onClick={() => setShowNew(!showNew)} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {newPw && (
                    <div className="mt-1.5 flex gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${
                          newPw.length >= (i + 1) * 2
                            ? newPw.length < 8 ? "bg-red-400" : newPw.length < 12 ? "bg-amber-400" : "bg-emerald-400"
                            : "bg-gray-200"
                        }`} />
                      ))}
                      <span className="text-[10px] text-gray-400 mr-1">
                        {newPw.length < 8 ? "ضعيفة" : newPw.length < 12 ? "متوسطة" : "قوية"}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <Label>تأكيد كلمة المرور</Label>
                  <Input value={confirmPw} onChange={e => setConfirmPw(e.target.value)} type="password" className="mt-1.5" required />
                  {confirmPw && newPw !== confirmPw && (
                    <p className="text-xs text-red-500 mt-1">كلمتا المرور غير متطابقتين</p>
                  )}
                </div>
                <Button type="submit" disabled={pwLoading} variant="destructive" className="w-full gap-2">
                  {pwLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                  تغيير كلمة المرور
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
