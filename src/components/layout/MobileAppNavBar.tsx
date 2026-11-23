"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Store, ShoppingBag, Sparkles, MessageCircle } from "lucide-react";

const navItems = [
  {
    label: "الرئيسية",
    href: "/",
    icon: Home,
    exact: true,
  },
  {
    label: "المتجر",
    href: "/shop",
    icon: Store,
    exact: false,
  },
  {
    label: "عربة التسوق",
    href: "/checkout",
    icon: ShoppingBag,
    exact: false,
  },
  {
    label: "خدماتنا",
    href: "/services",
    icon: Sparkles,
    exact: false,
  },
  {
    label: "تواصل",
    href: "/contact",
    icon: MessageCircle,
    exact: false,
  },
];

export default function MobileAppNavBar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 block md:hidden bg-[#070e22]/95 backdrop-blur-xl border-t border-cyan-500/20 shadow-[0_-8px_30px_rgba(0,0,0,0.4)]"
      dir="rtl"
      aria-label="شريط التنقل السريع للتطبيق"
    >
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center h-full relative transition-all duration-200 ${
                isActive ? "text-cyan-400 font-bold" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {/* Active glow indicator */}
              {isActive && (
                <span className="absolute top-0 w-8 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 shadow-[0_0_10px_rgba(34,211,238,0.7)]" />
              )}
              
              <div
                className={`relative p-1 rounded-xl transition-all ${
                  isActive ? "bg-cyan-500/15 scale-110" : ""
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
              </div>
              
              <span className="text-[10px] mt-0.5 tracking-tight font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
      {/* iOS home indicator safe area spacer */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
