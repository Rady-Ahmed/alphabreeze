"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { getSocialLinks, saveSocialLinks } from "@/lib/db";

const defaultSocials = [
  { platform: "Facebook", id: "facebook", url: "https://facebook.com/alphabreeze", color: "bg-blue-100 text-blue-600" },
  { platform: "Instagram", id: "instagram", url: "https://instagram.com/alphabreeze", color: "bg-pink-100 text-pink-600" },
  { platform: "TikTok", id: "tiktok", url: "https://tiktok.com/@alphabreeze", color: "bg-gray-100 text-gray-800" },
  { platform: "WhatsApp", id: "whatsapp", url: "https://wa.me/201019946409", color: "bg-green-100 text-green-600" },
  { platform: "YouTube", id: "youtube", url: "https://youtube.com/@alphabreeze", color: "bg-red-100 text-red-600" },
];

export default function SocialPage() {
  const [socials, setSocials] = useState(defaultSocials);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const loadSocials = async () => {
      try {
        const loaded = await getSocialLinks();
        setSocials(loaded);
      } catch {}
      setMounted(true);
    };

    loadSocials();
  }, []);

  const handleChange = (id: string, url: string) => {
    setSocials(socials.map(s => s.id === id ? { ...s, url } : s));
  };

  const handleSave = async () => {
    try {
      await saveSocialLinks(socials);
      toast.success("تم حفظ روابط التواصل الاجتماعي بنجاح");
    } catch (e) {
      toast.error("حدث خطأ أثناء الحفظ");
    }
  };

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">إدارة التواصل الاجتماعي</h1>
          <p className="text-gray-500 text-sm">روابط حسابات التواصل الاجتماعي</p>
        </div>
        <Button onClick={handleSave}><Save className="w-4 h-4" />حفظ التغييرات</Button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {socials.map((s) => (
          <Card key={s.id}>
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center`}>
                  <span className="text-lg font-bold">{s.platform[0]}</span>
                </div>
                <h3 className="font-bold text-navy-900">{s.platform}</h3>
              </div>
              <Label>رابط الحساب</Label>
              <Input value={s.url} onChange={(e) => handleChange(s.id, e.target.value)} className="mt-1.5" dir="ltr" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
