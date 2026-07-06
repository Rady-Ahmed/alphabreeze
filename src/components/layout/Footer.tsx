"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, ArrowUp, Facebook, Instagram, Youtube } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { useEffect, useState } from "react";
import { getSiteSettings, getSocialLinks } from "@/lib/db";

const footerLinks = {
  company: [
    { href: "/about", label: "من نحن" },
    { href: "/services", label: "خدماتنا" },
    { href: "/articles", label: "المقالات" },
    { href: "/contact", label: "تواصل معنا" },
  ],
  services: [
    { href: "/services/raw-materials", label: "توريد خامات تجميل" },
    { href: "/services/private-label", label: "تصنيع برايفت ليبل" },
    { href: "/services/formula-development", label: "تطوير التركيبات" },
    { href: "/services/packaging", label: "حلول التعبئة والتغليف" },
  ],
};

export default function Footer() {
  const [settings, setSettings] = useState({
    description: "الشريك الرائد لرواد الأعمال ومصنعي مستحضرات التجميل في مصر. نقدم خامات عالية الجودة وخدمات تصنيع متكاملة.",
    phone1: "01119446474",
    phone2: "01016067979",
    email: "info@alphabreeze.com",
    address: "طريق جسر السويس الرئيسي، أمام محطة مترو نادي الشمس، القاهرة",
    facebook: "#",
    instagram: "#",
    youtube: "#",
    whatsapp: "01119446474"
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
    <footer className="bg-navy-950 text-white relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-sky-500 to-navy-700" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 pt-16 pb-24 md:py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 overflow-visible flex-shrink-0">
                <Logo className="w-full h-full drop-shadow-md" />
              </div>
              <div>
                <h3 className="font-bold text-xl">AlphaBreeze</h3>
                <p className="text-sky-400 text-xs">شريك نجاحك</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {settings.description}
            </p>
            <div className="flex gap-3">
              {settings.facebook !== "#" && (
                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-sky-500 flex items-center justify-center transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings.instagram !== "#" && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-sky-500 flex items-center justify-center transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-sky-500 flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-sky-400">الشركة</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-sky-400">خدماتنا</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-sky-400">تواصل معنا</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-sky-400 mt-1 shrink-0" />
                <div className="text-sm text-gray-400">
                  <p dir="ltr" className="text-right">{settings.phone1}</p>
                  <p dir="ltr" className="text-right">{settings.phone2}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-sky-400 mt-1 shrink-0" />
                <span className="text-sm text-gray-400">{settings.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sky-400 mt-1 shrink-0" />
                <span className="text-sm text-gray-400">
                  {settings.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} <Link href="/admin/login" className="cursor-default">AlphaBreeze</Link>. جميع الحقوق محفوظة.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-10 h-10 rounded-xl bg-sky-500/20 hover:bg-sky-500 flex items-center justify-center transition-colors text-sky-400 hover:text-white"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
