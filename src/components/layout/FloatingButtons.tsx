"use client";

import { MessageCircle, PhoneCall } from "lucide-react";
import { useState, useEffect } from "react";
import { getSiteSettings } from "@/lib/db";

export default function FloatingButtons() {
  const [settings, setSettings] = useState({
    whatsapp: "01119446474",
    phone: "01119446474"
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const siteSettings = await getSiteSettings();
        setSettings({
          whatsapp: siteSettings.whatsapp || "01119446474",
          phone: siteSettings.phone1 || "01119446474"
        });
      } catch (e) {}
    };

    loadSettings();
  }, []);

  return (
    <div className="fixed bottom-24 left-6 z-50 flex flex-col gap-4 md:bottom-8">
      {/* Phone Button */}
      <div className="group">
        <a
          href={`tel:${settings.phone}`}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-900 text-white shadow-lg transition-transform hover:scale-110 hover:bg-navy-800"
          aria-label="اتصل بنا"
        >
          <PhoneCall className="h-6 w-6" />
        </a>
        <div className="absolute top-1/2 -translate-y-1/2 left-full ml-4 opacity-0 transition-opacity group-hover:opacity-100 hidden md:block">
          <div className="rounded-lg bg-navy-900 px-3 py-1.5 text-sm text-white whitespace-nowrap">
            اتصل بنا
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <div className="group">
        <a
          href={`https://wa.me/2${settings.whatsapp}?text=${encodeURIComponent("مرحباً، أود الاستفسار عن خدماتكم")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 transition-transform hover:scale-110 hover:bg-emerald-600"
          aria-label="تواصل عبر واتساب"
        >
          <MessageCircle className="h-7 w-7" />
        </a>
        <div className="absolute top-1/2 -translate-y-1/2 left-full ml-4 opacity-0 transition-opacity group-hover:opacity-100 hidden md:block">
          <div className="rounded-lg bg-emerald-500 px-3 py-1.5 text-sm text-white whitespace-nowrap">
            تواصل معنا
          </div>
        </div>
      </div>
    </div>
  );
}
