"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  LayoutDashboard, Package, FolderTree, ShoppingCart, Users, FileText,
  MessageSquare, Factory, ImageIcon, Settings, PanelLeftClose, PanelLeftOpen,
  LogOut, Bell, Search, Globe, Megaphone, Share2, Shield,
  Menu, X, ChevronLeft,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { getSupabase } from "@/lib/db";

const sidebarItems = [
  { href: "/admin", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/admin/products", label: "المنتجات", icon: Package },
  { href: "/admin/categories", label: "التصنيفات", icon: FolderTree },
  { href: "/admin/orders", label: "الطلبات", icon: ShoppingCart },
  { href: "/admin/customers", label: "العملاء", icon: Users },
  { href: "/admin/articles", label: "المقالات", icon: FileText },
  { href: "/admin/messages", label: "الرسائل", icon: MessageSquare },
  { href: "/admin/manufacturing", label: "طلبات التصنيع", icon: Factory },
  { href: "/admin/banners", label: "البنرات", icon: Megaphone },
  { href: "/admin/media", label: "مكتبة الوسائط", icon: ImageIcon },
  { href: "/admin/social", label: "التواصل الاجتماعي", icon: Share2 },
  { href: "/admin/seo", label: "إعدادات SEO", icon: Globe, superAdminOnly: true },
  { href: "/admin/users", label: "المستخدمين", icon: Shield, superAdminOnly: true },
  { href: "/admin/settings", label: "الإعدادات", icon: Settings, superAdminOnly: true },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [newNotificationsCount, setNewNotificationsCount] = useState(0);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
    } catch {}
    document.cookie = "alphabreeze_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "alphabreeze_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.removeItem("alphabreeze_current_user");
    toast.success("تم تسجيل الخروج بنجاح");
    router.push("/admin/login");
  };

  useEffect(() => {
    const supabase = getSupabase();

    const fetchNotificationsCount = async () => {
      try {
        if (supabase) {
          const [o, m, r] = await Promise.all([
            supabase.from("orders").select("id", { count: "exact" }).eq("status", "new"),
            supabase.from("contact_messages").select("id", { count: "exact" }).eq("is_read", false),
            supabase.from("manufacturing_requests").select("id", { count: "exact" }).eq("status", "new")
          ]);
          setNewNotificationsCount((o.count || 0) + (m.count || 0) + (r.count || 0));
        } else {
          const orders = JSON.parse(localStorage.getItem('alphabreeze_new_orders') || '[]');
          const messages = JSON.parse(localStorage.getItem('alphabreeze_messages') || '[]').filter((m: any) => !m.read && !m.is_read);
          const manufacturing = JSON.parse(localStorage.getItem('alphabreeze_manufacturing_requests') || '[]').filter((m: any) => m.status === 'new');
          setNewNotificationsCount(orders.length + messages.length + manufacturing.length);
        }
      } catch(e) {}
    };
    fetchNotificationsCount();
    window.addEventListener('new_order_placed', fetchNotificationsCount);

    const showLiveNotification = (message: string) => {
      toast.success(message);
      fetchNotificationsCount();
    };

    const realtimeChannel = supabase
      ?.channel("admin-live-notifications")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        () => showLiveNotification("طلب شراء جديد وصل للوحة التحكم 🛒")
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "contact_messages" },
        () => showLiveNotification("رسالة تواصل جديدة وصلت للوحة التحكم ✉️")
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "manufacturing_requests" },
        () => showLiveNotification("طلب تصنيع جديد وصل للوحة التحكم 🏭")
      )
      .subscribe();

    try {
      const user = localStorage.getItem("alphabreeze_current_user");
      if (user) {
        setCurrentUser(JSON.parse(user));
      } else {
        router.replace("/admin/login");
      }
    } catch(e) {
      router.replace("/admin/login");
    }
    const interval = setInterval(fetchNotificationsCount, 10000);
    return () => {
      window.removeEventListener('new_order_placed', fetchNotificationsCount);
      if (realtimeChannel && supabase) {
        supabase.removeChannel(realtimeChannel);
      }
      clearInterval(interval);
    };
  }, [router]);

  const visibleSidebarItems = sidebarItems.filter(item => {
    if (item.superAdminOnly) return currentUser?.role === "super_admin";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f5f7fa] font-arabic flex relative overflow-x-hidden" dir="rtl">

      {/* ─── Mobile overlay ─── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ─── SIDEBAR ─── */}
      <aside
        className={cn(
          // Base styles
          "fixed top-0 right-0 h-full z-50 flex flex-col",
          "bg-white border-l border-gray-100 shadow-lg",
          "transition-all duration-300 ease-in-out",
          // Width
          collapsed ? "w-[72px]" : "w-[256px]",
          // Mobile: slide in/out from right
          "translate-x-full lg:translate-x-0",
          mobileOpen && "translate-x-0"
        )}
      >
        {/* Logo Area */}
        <div className={cn(
          "h-16 flex items-center border-b border-gray-100 shrink-0",
          collapsed ? "justify-center px-3" : "justify-between px-4"
        )}>
          {!collapsed && (
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 shrink-0">
                <Logo className="w-full h-full" />
              </div>
              <span className="font-bold text-[15px] text-gray-800 truncate">AlphaBreeze</span>
            </div>
          )}

          {/* Desktop collapse toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors shrink-0"
            title={collapsed ? "توسيع القائمة" : "طي القائمة"}
          >
            {collapsed
              ? <PanelLeftOpen className="w-5 h-5" />
              : <PanelLeftClose className="w-5 h-5" />
            }
          </button>

          {/* Mobile close */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 space-y-0.5 scrollbar-thin">
          {visibleSidebarItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "group flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200",
                  collapsed ? "justify-center p-2.5" : "px-3 py-2.5",
                  isActive
                    ? "bg-gradient-to-l from-sky-50 to-sky-100/60 text-sky-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                {/* Active indicator bar */}
                {isActive && !collapsed && (
                  <span className="absolute right-0 w-1 h-8 bg-sky-500 rounded-l-full" />
                )}

                <item.icon className={cn(
                  "w-[18px] h-[18px] shrink-0 transition-colors",
                  isActive ? "text-sky-600" : "text-gray-400 group-hover:text-gray-600"
                )} />

                {!collapsed && (
                  <span className="flex-1 truncate">{item.label}</span>
                )}

                {/* Tooltip on collapsed */}
                {collapsed && (
                  <div className="absolute right-[72px] bg-gray-900 text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl">
                    {item.label}
                    <div className="absolute top-1/2 -translate-y-1/2 -right-1 border-4 border-transparent border-l-gray-900" />
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: User + Logout */}
        <div className="border-t border-gray-100 p-2 shrink-0 space-y-1">
          {/* User info */}
          {!collapsed && (
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-gray-50">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                {currentUser?.name?.[0] || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{currentUser?.name || "المدير العام"}</p>
                <p className="text-[11px] text-gray-400 truncate">
                  {currentUser?.role === 'super_admin' ? 'مدير أعلى' : 'مدير'}
                </p>
              </div>
            </div>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            title={collapsed ? "تسجيل الخروج" : undefined}
            className={cn(
              "w-full flex items-center gap-3 rounded-xl text-sm font-medium",
              "text-red-500 hover:bg-red-50 transition-all duration-200 cursor-pointer",
              collapsed ? "justify-center p-2.5" : "px-3 py-2.5"
            )}
          >
            <LogOut className="w-[18px] h-[18px] shrink-0" />
            {!collapsed && <span>تسجيل الخروج</span>}
          </button>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <div className={cn(
        "flex-1 flex flex-col min-h-screen transition-all duration-300 min-w-0",
        collapsed ? "lg:mr-[72px]" : "lg:mr-[256px]"
      )}>
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30 shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-xl hover:bg-gray-100 lg:hidden cursor-pointer text-gray-600 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-2">
              <div className="w-7 h-7">
                <Logo className="w-full h-full" />
              </div>
              <span className="font-bold text-gray-800 text-[15px]">AlphaBreeze</span>
            </div>

            {/* Desktop search */}
            <div className="relative hidden lg:block">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                placeholder="بحث..."
                className="h-9 w-60 rounded-xl border border-gray-200 pr-9 pl-4 text-sm bg-gray-50 focus:bg-white focus:border-sky-400 outline-none transition-all focus:w-72 focus:shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Link
              href="/admin/notifications"
              className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-500" />
              {newNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </Link>

            {/* View site */}
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              عرض الموقع
            </Link>

            {/* User avatar */}
            <Link href="/admin/settings" className="flex items-center gap-2 pr-2 border-r border-gray-100">
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-gray-800 block leading-tight">{currentUser?.name || "المدير العام"}</p>
                <p className="text-[11px] text-gray-400 block">{currentUser?.role === 'super_admin' ? 'مدير أعلى' : 'مدير'}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm">
                {currentUser?.name?.[0] || 'A'}
              </div>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto flex flex-col justify-between">
          <div>{children}</div>
          <footer className="mt-8 pt-6 pb-2 text-center text-xs text-gray-400 border-t border-gray-100">
            © 2026{" "}
            <Link
              href="/admin/login"
              className="text-gray-400 hover:text-gray-500 no-underline cursor-default"
            >
              AlphaBreeze
            </Link>
            . جميع الحقوق محفوظة.
          </footer>
        </main>
      </div>
    </div>
  );
}
