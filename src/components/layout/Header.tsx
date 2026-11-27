"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, Phone, Home, Search, ShoppingCart, ArrowLeft, FileText, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { getSiteSettings } from "@/lib/db";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/shop", label: "كتالوج المواد الخام", highlight: true },
  { href: "/calculator", label: "حاسبة التركيبات", newBadge: true },
  { href: "/services", label: "خدماتنا الصناعية" },
  { href: "/about", label: "عن ألفا بريز" },
  { href: "/articles", label: "المقالات الفنية" },
  { href: "/contact", label: "تواصل معنا" },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [siteNames, setSiteNames] = useState({
    en: "AlphaBreeze",
    ar: "شريك نجاحك الكيميائي"
  });
  const [mounted, setMounted] = useState(false);

  const updateCartCount = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('alphabreeze_cart') || '[]');
      setCartCount(cart.reduce((total: number, item: any) => total + item.qty, 0));
    } catch (e) {
      setCartCount(0);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("cart_updated", updateCartCount);

    updateCartCount();
    setMounted(true);

    const loadSettings = async () => {
      try {
        const settings = await getSiteSettings();
        setSiteNames({
          en: settings.siteNameEn || "AlphaBreeze",
          ar: settings.siteNameAr || "شريك نجاحك الكيميائي"
        });
      } catch (e) {}
    };

    loadSettings();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("cart_updated", updateCartCount);
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-sm py-2.5"
            : "bg-navy-950/40 backdrop-blur-md border-b border-white/10 py-3.5"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          
          {/* Logo & Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
              <Logo className="w-full h-full drop-shadow-md" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={cn(
                  "font-black text-xl tracking-tight transition-colors",
                  scrolled ? "text-navy-950" : "text-white"
                )}>
                  {siteNames.en}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-400 border border-sky-400/30 hidden sm:inline-block">
                  CHEMICALS
                </span>
              </div>
              <p
                suppressHydrationWarning
                className={cn(
                  "text-[11px] font-medium transition-colors -mt-0.5",
                  scrolled ? "text-slate-500" : "text-sky-200/80"
                )}
              >
                {mounted ? siteNames.ar : "توريد المواد الخام الصناعية"}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5",
                    link.highlight
                      ? (scrolled
                          ? "bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200/80"
                          : "bg-sky-500/20 text-sky-200 hover:bg-sky-500/30 border border-sky-400/30")
                      : (isActive
                          ? (scrolled ? "text-sky-600 bg-slate-100" : "text-white bg-white/10")
                          : (scrolled
                              ? "text-slate-700 hover:text-sky-600 hover:bg-slate-50"
                              : "text-slate-300 hover:text-white hover:bg-white/10"))
                  )}
                >
                  {link.highlight && <FlaskConical className="w-3.5 h-3.5 text-sky-400" />}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Catalog Search Quick Access */}
            <Link href="/shop">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-9 px-3 rounded-xl text-xs font-semibold gap-1.5",
                  scrolled ? "text-slate-600 hover:bg-slate-100" : "text-slate-300 hover:text-white hover:bg-white/10"
                )}
              >
                <Search className="w-4 h-4" />
                <span>بحث الخامات</span>
              </Button>
            </Link>

            {/* Cart Button */}
            <Link href="/checkout" className="relative group">
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "h-9 px-3 rounded-xl text-xs font-semibold gap-1.5",
                  scrolled
                    ? "border-slate-200 text-slate-700 hover:bg-slate-50"
                    : "border-white/20 text-white hover:bg-white/10"
                )}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>السلة</span>
                {cartCount > 0 && (
                  <span className="bg-sky-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Primary B2B Action: Request a Quote */}
            <a
              href="https://wa.me/201019946409?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%B7%D9%84%D8%A8%20%D8%B9%D8%B1%D8%B6%20%D8%B3%D8%B9%D8%B1%20%D8%AA%D9%88%D8%B1%D9%8A%D8%AF%20%D9%85%D9%88%D8%A7%D8%AF%20%D8%AE%D8%A7%D9%85%20(RFQ)%20%D9%84%D9%85%D8%B5%D9%86%D8%B9%D9%86%D8%A7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="sm"
                className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-bold h-9 px-4 rounded-xl shadow-md text-xs gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>طلب عرض سعر (RFQ)</span>
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link href="/checkout" className="relative p-2 text-slate-300">
              <ShoppingCart className={cn("w-5 h-5", scrolled ? "text-slate-800" : "text-white")} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-sky-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "p-2 rounded-xl border transition-colors",
                scrolled
                  ? "border-slate-200 text-slate-800 hover:bg-slate-100"
                  : "border-white/20 text-white hover:bg-white/10"
              )}
              aria-label="القائمة الرئيسية"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden bg-navy-950/95 backdrop-blur-2xl border-b border-white/10 px-4 py-6 animate-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col gap-2 mb-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-between",
                    link.highlight
                      ? "bg-sky-500/20 text-sky-200 border border-sky-400/30"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {link.highlight && <FlaskConical className="w-4 h-4 text-sky-400" />}
                    <span>{link.label}</span>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-slate-500" />
                </Link>
              ))}
            </nav>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <a
                href="https://wa.me/201019946409?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%B7%D9%84%D8%A8%20%D8%B9%D8%B1%D8%B6%20%D8%B3%D8%B9%D8%B1%20%D8%AA%D9%88%D8%B1%D9%8A%D8%AF%20%D9%85%D9%88%D8%A7%D8%AF%20%D8%AE%D8%A7%D9%85%20(RFQ)%20%D9%84%D9%85%D8%B5%D9%86%D8%B9%D9%86%D8%A7"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 text-white font-bold h-11 rounded-xl text-sm">
                  <FileText className="w-4 h-4 ml-2" />
                  طلب عرض سعر توريد فوري (RFQ)
                </Button>
              </a>
              <Link href="/shop" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 h-11 rounded-xl text-sm">
                  <Search className="w-4 h-4 ml-2 text-sky-400" />
                  تصفح الكتالوج بالكامل (+430 مادة)
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
