"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ShieldCheck, ArrowLeft, Send } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { useEffect, useState } from "react";
import { getSiteSettings, getSocialLinks } from "@/lib/db";

const footerCategories = [
  { href: "/shop?category=oils-and-extracts", label: "الزيوت والمستخلصات (82)" },
  { href: "/shop?category=raw-powders-and-actives", label: "البودرات والمواد الفعالة (81)" },
  { href: "/shop?category=chemical-liquids-and-solvents", label: "السوائل والمذيبات (59)" },
  { href: "/shop?category=vitamins-and-nutrients", label: "الفيتامينات والمغذيات (29)" },
  { href: "/shop?category=colors-and-pigments", label: "الألوان والمايكا (83)" },
  { href: "/shop?category=fragrances-and-scents", label: "العطور والزيوت المركزة (68)" },
  { href: "/shop?category=flavors", label: "النكهات الغذائية والصناعية (17)" },
  { href: "/shop?category=waxes-and-polymers", label: "الشموع والبوليمرات (5)" },
];

const footerServices = [
  { href: "/services", label: "توريد المواد الخام الكيميائية بالجملة" },
  { href: "/services", label: "التصنيع لحساب الغير (Private Label)" },
  { href: "/services", label: "تطوير وحل مشكلات التركيبات المعملية" },
  { href: "/services", label: "حلول التعبئة والتغليف والخامات الأولية" },
];

export default function Footer() {
  const [settings, setSettings] = useState({
    description: "شركة Alpha Breeze Chemicals — المورد المعتمد للمواد الخام الكيميائية والمكونات الفعالة لمصانع مستحضرات التجميل، معامل التركيبات، والشركات الصناعية في مصر والشرق الأوسط مع شهادات التحليل COA و MSDS.",
    phone1: "01119446474",
    phone2: "01016067979",
    email: "info@alphabreeze.com",
    address: "طريق جسر السويس الرئيسي، أمام محطة مترو نادي الشمس، القاهرة",
    facebook: "#",
    instagram: "#",
    youtube: "#",
    whatsapp: "01019946409"
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const siteSettings = await getSiteSettings();
        setSettings(prev => ({
          ...prev,
          description: siteSettings.siteDescAr || prev.description,
          phone1: siteSettings.phone1 || prev.phone1,
          phone2: siteSettings.phone2 || prev.phone2,
          whatsapp: siteSettings.whatsapp || prev.whatsapp,
          email: siteSettings.email || prev.email,
          address: siteSettings.addressAr || prev.address,
        }));

        const socials = await getSocialLinks();
        const fb = socials.find((s: any) => s.id === "facebook")?.url;
        const ig = socials.find((s: any) => s.id === "instagram")?.url;
        const yt = socials.find((s: any) => s.id === "youtube")?.url;
        setSettings(prev => ({
          ...prev,
          facebook: fb || prev.facebook,
          instagram: ig || prev.instagram,
          youtube: yt || prev.youtube
        }));
      } catch (e) {}
    };

    loadData();
  }, []);

  return (
    <footer className="bg-[#070e22] text-white relative overflow-hidden border-t border-white/10" dir="rtl">
      {/* Decorative gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600" />

      <div className="container mx-auto px-4 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <Logo className="w-10 h-10" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-xl tracking-tight text-white">ALPHA BREEZE</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-400/10 text-cyan-400 border border-cyan-400/30">
                    CHEMICALS
                  </span>
                </div>
                <p className="text-slate-400 text-xs">الشريك الصناعي المعتمد لمصانع ومختبرات الكيماويات</p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {settings.description}
            </p>

            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={`https://wa.me/20${settings.whatsapp.replace(/\D/g, '')}?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3.5 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 transition-colors font-medium flex items-center gap-1.5"
              >
                <span>واتساب المبيعات:</span>
                <span dir="ltr" className="font-mono">{settings.whatsapp}</span>
              </a>
            </div>
          </div>

          {/* Core Categories (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-sm mb-4 text-cyan-300">أقسام الكتالوج (+431 مادة)</h4>
            <ul className="space-y-2.5">
              {footerCategories.map((cat) => (
                <li key={cat.href}>
                  <Link href={cat.href} className="text-slate-400 hover:text-white text-xs transition-colors flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
                    <span>{cat.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industrial Services (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-sm mb-4 text-cyan-300">خدماتنا الصناعية</h4>
            <ul className="space-y-2.5">
              {footerServices.map((srv, idx) => (
                <li key={idx}>
                  <Link href={srv.href} className="text-slate-400 hover:text-white text-xs transition-colors leading-relaxed block">
                    {srv.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/shop" className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold flex items-center gap-1 pt-2">
                  <span>تصفح المتجر بالكامل</span>
                  <ArrowLeft className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-bold text-sm mb-4 text-cyan-300">المقر والتواصل</h4>
            
            <div className="flex items-start gap-3 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
              <span>{settings.address}</span>
            </div>

            <div className="flex items-start gap-3 text-xs text-slate-400">
              <Phone className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
              <div className="space-y-1">
                <p dir="ltr" className="text-right font-mono">{settings.phone1}</p>
                <p dir="ltr" className="text-right font-mono">{settings.phone2}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-slate-400">
              <Mail className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
              <span className="font-mono">{settings.email}</span>
            </div>

            <div className="flex items-start gap-3 text-xs text-slate-400">
              <Clock className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
              <span>السبت - الخميس: 9:00 ص - 6:00 م</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Discreet secret admin entry as plain text */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2026{" "}
            <Link
              href="/admin/login"
              className="text-slate-500 hover:text-slate-400 no-underline cursor-default"
            >
              AlphaBreeze
            </Link>
            . جميع الحقوق محفوظة.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-slate-400">
            <Link href="/services" className="hover:text-cyan-300 transition-colors">
              خدماتنا الصناعية
            </Link>
            <span className="text-slate-600">•</span>
            <Link href="/about" className="hover:text-cyan-300 transition-colors">
              عن ألفا بريز
            </Link>
            <span className="text-slate-600">•</span>
            <Link href="/articles" className="hover:text-cyan-300 transition-colors">
              المقالات الفنية
            </Link>
            <span className="text-slate-600">•</span>
            <Link href="/shop" className="hover:text-cyan-300 transition-colors font-medium text-slate-300">
              المتجر
            </Link>
            <span className="text-slate-600">•</span>
            <Link href="/contact" className="hover:text-cyan-300 transition-colors">
              طلب تسعير (RFQ)
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
