"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, Phone, Home, Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { getSiteSettings } from "@/lib/db";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
  { href: "/services", label: "خدماتنا الصناعية" },
  { href: "/shop", label: "كتالوج المواد الخام" },
  { href: "/articles", label: "المقالات الفنية" },
  { href: "/contact", label: "طلب تسعير وتواصل" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [siteNames, setSiteNames] = useState({
    en: "AlphaBreeze",
    ar: "شريك نجاحك"
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
          ar: settings.siteNameAr || "شريك نجاحك"
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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-sky-500/5 py-2"
            : "bg-transparent py-4"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 flex-shrink-0 group-hover:scale-105 transition-transform">
              <Logo className="w-full h-full drop-shadow-md" />
            </div>
            <div>
              <h1 className={cn(
                "font-bold text-xl transition-colors",
                scrolled ? "text-navy-900" : "text-white"
              )}>
                {siteNames.en}
              </h1>
              <p
                suppressHydrationWarning
                className={cn(
                  "text-[10px] -mt-1 transition-colors",
                  scrolled ? "text-sky-600" : "text-sky-200"
                )}
              >
                {mounted ? siteNames.ar : "شريك نجاحك"}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-sky-50 hover:text-sky-600",
                  scrolled ? "text-gray-700" : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/checkout" className="relative group">
              <Button variant="outline" size="sm" className={cn(
                scrolled ? "" : "border-white/30 text-white hover:bg-white hover:text-navy-900"
              )}>
                <ShoppingCart className="w-4 h-4" />
                السلة
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-in zoom-in duration-300">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="sm">
                تواصل معنا
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 lg:hidden">
            <Link href="/checkout" className="relative">
               <div className={cn("p-2 rounded-xl transition-colors", scrolled ? "text-navy-900 hover:bg-gray-100" : "text-white hover:bg-white/10")}>
                  <ShoppingCart className="w-6 h-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-in zoom-in duration-300">
                      {cartCount}
                    </span>
                  )}
               </div>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "p-2 rounded-xl transition-colors",
                scrolled ? "text-navy-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
              )}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl transition-all duration-300 overflow-hidden",
            isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <nav className="p-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-sky-50 hover:text-sky-600 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-100 flex gap-2">
              <Link href="/shop" className="flex-1">
                <Button variant="outline" className="w-full">المتجر</Button>
              </Link>
              <Link href="/contact" className="flex-1">
                <Button className="w-full">تواصل معنا</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="mobile-bottom-nav">
        <Link href="/" className="flex flex-col items-center gap-1 text-gray-500 hover:text-sky-500 transition-colors">
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">الرئيسية</span>
        </Link>
        <Link href="/shop" className="flex flex-col items-center gap-1 text-gray-500 hover:text-sky-500 transition-colors">
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px] font-medium">المتجر</span>
        </Link>
        <Link href="/checkout" className="flex flex-col items-center gap-1 text-gray-500 hover:text-sky-500 transition-colors relative">
          <ShoppingCart className="w-5 h-5" />
          <span className="text-[10px] font-medium">السلة</span>
          {cartCount > 0 && (
             <span className="absolute -top-1 right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
               {cartCount}
             </span>
          )}
        </Link>
        <Link href="/contact" className="flex flex-col items-center gap-1 text-gray-500 hover:text-sky-500 transition-colors">
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-medium">تواصل</span>
        </Link>
      </div>
    </>
  );
}
