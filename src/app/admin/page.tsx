"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Package, ShoppingCart, Users, FileText, MessageSquare, Factory,
  ArrowUpRight, ArrowDownRight, Eye, TrendingUp, Clock, Plus,
  Bell, Settings, RefreshCw, BarChart3, Activity, ChevronLeft,
  CheckCircle, XCircle, Truck, AlertCircle, Star,
} from "lucide-react";

const bestSelling = [
  { name: "زبدة الشيا الخام", sales: 156, revenue: 39000, emoji: "🧴" },
  { name: "زيت الأرجان المغربي", sales: 134, revenue: 24120, emoji: "🫒" },
  { name: "حمض الهيالورونيك", sales: 98, revenue: 44100, emoji: "💧" },
  { name: "الكولاجين البحري", sales: 87, revenue: 47850, emoji: "🐚" },
  { name: "فيتامين سي بودرة", sales: 76, revenue: 28880, emoji: "✨" },
];

const statusMap: Record<string, { label: string; variant: "default" | "success" | "secondary" | "destructive"; icon: any; color: string }> = {
  new: { label: "جديد", variant: "default", icon: AlertCircle, color: "text-sky-500" },
  under_review: { label: "قيد المراجعة", variant: "secondary", icon: Eye, color: "text-amber-500" },
  confirmed: { label: "مؤكد", variant: "default", icon: CheckCircle, color: "text-emerald-500" },
  shipping: { label: "جاري الشحن", variant: "secondary", icon: Truck, color: "text-blue-500" },
  delivered: { label: "تم التسليم", variant: "success", icon: CheckCircle, color: "text-green-500" },
  cancelled: { label: "ملغي", variant: "destructive", icon: XCircle, color: "text-red-500" },
};

const quickActions = [
  { label: "إضافة منتج", icon: Package, href: "/admin/products", color: "bg-sky-500" },
  { label: "إضافة مقال", icon: FileText, href: "/admin/articles", color: "bg-violet-500" },
  { label: "عرض الطلبات", icon: ShoppingCart, href: "/admin/orders", color: "bg-emerald-500" },
  { label: "الإعدادات", icon: Settings, href: "/admin/settings", color: "bg-gray-700" },
];

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    customers: 0,
    messages: 0,
    manufacturing: 0,
    users: 0,
    articles: 0,
    revenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  const loadData = async () => {
    try {
      const { getDashboardStats, getOrders, getMessages, getManufacturingRequests } = await import("@/lib/db");
      
      // Try Supabase first
      const supabaseStats = await getDashboardStats();
      const ordersData = await getOrders();
      const messagesData = await getMessages();
      const mfgData = await getManufacturingRequests();

      if (supabaseStats) {
        setStats({
          products: supabaseStats.products || 12,
          orders: supabaseStats.orders || 0,
          customers: supabaseStats.customers || 0,
          messages: supabaseStats.messages || 0,
          manufacturing: supabaseStats.manufacturing || 0,
          users: 1,
          articles: supabaseStats.articles || 0,
          revenue: supabaseStats.revenue || 0,
        });
      } else {
        // localStorage fallback
        const getCount = (key: string) => {
          const data = localStorage.getItem(key);
          return data ? JSON.parse(data).length : 0;
        };
        const localOrders = JSON.parse(localStorage.getItem("alphabreeze_all_orders") || "[]");
        const uniqueCustomers = new Set(localOrders.map((o: any) => o.phone)).size;
        const totalRevenue = localOrders.reduce((sum: number, o: any) => sum + (o.total || 0), 0);
        setStats({
          products: getCount("alphabreeze_products") || 12,
          orders: localOrders.length || 0,
          customers: uniqueCustomers || 0,
          messages: getCount("alphabreeze_messages") || 0,
          manufacturing: getCount("alphabreeze_manufacturing_requests") || 0,
          users: 1,
          articles: getCount("alphabreeze_articles") || 0,
          revenue: totalRevenue,
        });
      }

      // Recent orders — prefer Supabase
      const orders = ordersData?.length > 0
        ? ordersData
        : JSON.parse(localStorage.getItem("alphabreeze_all_orders") || "[]");
      setRecentOrders(orders.slice(0, 5));

      // Build activity log from various sources
      const activity: any[] = [];
      
      const messages = messagesData?.length > 0
        ? messagesData
        : JSON.parse(localStorage.getItem("alphabreeze_messages") || "[]");
      messages.slice(0, 3).forEach((m: any) => {
        activity.push({ type: "message", text: `رسالة جديدة من ${m.full_name || m.name || "زائر"}`, time: m.date || (m.created_at ? new Date(m.created_at).toLocaleDateString('en-GB') : "منذ قليل"), icon: MessageSquare, color: "text-amber-500 bg-amber-50" });
      });

      orders.slice(0, 3).forEach((o: any) => {
        activity.push({ type: "order", text: `طلب جديد #${o.id || o.order_number} من ${o.customer || o.full_name}`, time: o.date || (o.created_at ? new Date(o.created_at).toLocaleDateString('en-GB') : "اليوم"), icon: ShoppingCart, color: "text-emerald-500 bg-emerald-50" });
      });

      const mfg = mfgData?.length > 0
        ? mfgData
        : JSON.parse(localStorage.getItem("alphabreeze_manufacturing_requests") || "[]");
      mfg.slice(0, 2).forEach((m: any) => {
        activity.push({ type: "manufacturing", text: `طلب تصنيع من ${m.full_name || m.name || "عميل"}`, time: m.date || (m.created_at ? new Date(m.created_at).toLocaleDateString('en-GB') : "حديثاً"), icon: Factory, color: "text-violet-500 bg-violet-50" });
      });

      setRecentActivity(activity.slice(0, 8));
    } catch (e) {
      console.error("Dashboard load error:", e);
    }
  };

  useEffect(() => {
    loadData();
    setMounted(true);
    
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleString("ar-EG", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    
    // Auto-refresh data every 30s (was 5s — too frequent)
    const dataTimer = setInterval(loadData, 30000);
    
    return () => { clearInterval(timer); clearInterval(dataTimer); };
  }, []);

  if (!mounted) return null;

  const statsCards = [
    { title: "إجمالي المنتجات", value: stats.products, change: "+12%", trend: "up", icon: Package, color: "bg-sky-500", lightColor: "bg-sky-50 text-sky-600" },
    { title: "إجمالي الطلبات", value: stats.orders, change: "+28%", trend: "up", icon: ShoppingCart, color: "bg-emerald-500", lightColor: "bg-emerald-50 text-emerald-600" },
    { title: "العملاء", value: stats.customers, change: "+15%", trend: "up", icon: Users, color: "bg-blue-500", lightColor: "bg-blue-50 text-blue-600" },
    { title: "الإيرادات", value: `${(stats.revenue / 1000).toFixed(1)}K`, change: "+34%", trend: "up", icon: TrendingUp, color: "bg-violet-500", lightColor: "bg-violet-50 text-violet-600", isCurrency: true },
    { title: "الرسائل", value: stats.messages, change: "+5", trend: "up", icon: MessageSquare, color: "bg-amber-500", lightColor: "bg-amber-50 text-amber-600" },
    { title: "المقالات", value: stats.articles, change: "+2", trend: "up", icon: FileText, color: "bg-rose-500", lightColor: "bg-rose-50 text-rose-600" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-navy-900">مرحباً بك، المدير 👋</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1 flex items-center gap-2">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            {currentTime}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={loadData} className="gap-2 flex-1 sm:flex-none">
            <RefreshCw className="w-4 h-4" />
            تحديث
          </Button>
          <Link href="/admin/products" className="flex-1 sm:flex-none">
            <Button size="sm" className="gap-2 shadow-md w-full">
              <Plus className="w-4 h-4" />
              إضافة منتج
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
        {quickActions.map((action, i) => (
          <Link key={i} href={action.href}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start gap-2 sm:gap-3 p-3 sm:p-4 bg-white rounded-xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group text-center sm:text-right"
            >
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl ${action.color} flex items-center justify-center shadow-sm shrink-0`}>
                <action.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="font-medium text-xs sm:text-sm text-gray-700 group-hover:text-navy-900">{action.label}</span>
              <ChevronLeft className="w-4 h-4 text-gray-300 mr-auto group-hover:text-sky-500 transition-colors hidden sm:block" />
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {statsCards.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-gray-100 overflow-hidden relative group h-full">
              <div className={`absolute top-0 right-0 w-20 h-20 ${stat.color} opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500`} />
              <CardContent className="p-3 sm:p-4 relative">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl ${stat.lightColor} flex items-center justify-center shrink-0`}>
                    <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="flex items-center justify-center gap-1 text-[10px] sm:text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full w-fit">
                    <ArrowUpRight className="w-3 h-3" />
                    {stat.change}
                  </div>
                </div>
                <p className="text-lg sm:text-2xl font-bold text-navy-900 truncate">
                  {stat.isCurrency ? `${stat.value}` : stat.value}
                  {stat.isCurrency && <span className="text-xs sm:text-sm font-normal text-gray-400 mr-1">ج.م</span>}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-1 truncate">{stat.title}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Analytics Chart */}
          <Card className="border-gray-100">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-sky-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">تحليل المبيعات</CardTitle>
                  <p className="text-xs text-gray-400 mt-0.5">نظرة عامة على آخر 7 أيام</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="overflow-x-auto pb-4">
                <div className="h-64 flex items-end justify-between gap-2 md:gap-4 mt-4 min-w-[500px]">
                  {[
                    { day: "السبت", value: 12000, height: "40%" },
                    { day: "الأحد", value: 15000, height: "50%" },
                    { day: "الإثنين", value: 9000, height: "30%" },
                    { day: "الثلاثاء", value: 21000, height: "70%" },
                    { day: "الأربعاء", value: 18000, height: "60%" },
                    { day: "الخميس", value: 25000, height: "85%" },
                    { day: "الجمعة", value: 30000, height: "100%" },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-navy-900 text-white text-xs py-1 px-2 rounded font-bold mb-1 whitespace-nowrap z-10 shadow-lg relative">
                        {item.value} ج.م
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-navy-900" />
                      </div>
                      <div className="w-full bg-sky-50 rounded-t-xl relative overflow-hidden flex-1 max-h-[200px] flex items-end">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: item.height }}
                          transition={{ duration: 1, delay: i * 0.1, type: "spring", stiffness: 50 }}
                          className="w-full bg-gradient-to-t from-sky-500 to-sky-300 rounded-t-xl hover:brightness-110 transition-all cursor-pointer"
                        />
                      </div>
                      <span className="text-[10px] sm:text-xs text-gray-500 font-medium whitespace-nowrap">{item.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card className="border-gray-100">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-sky-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">أحدث الطلبات</CardTitle>
                  <p className="text-xs text-gray-400 mt-0.5">آخر الطلبات الواردة</p>
                </div>
              </div>
              <Link href="/admin/orders">
                <Button variant="ghost" size="sm" className="text-sky-500 hover:text-sky-600 gap-1">
                  عرض الكل
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto pb-2">
                <table className="w-full text-sm min-w-[700px]">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-right py-3 px-2 font-medium text-gray-500 whitespace-nowrap">رقم الطلب</th>
                      <th className="text-right py-3 px-2 font-medium text-gray-500 whitespace-nowrap">العميل</th>
                      <th className="text-right py-3 px-2 font-medium text-gray-500 whitespace-nowrap">المبلغ</th>
                      <th className="text-right py-3 px-2 font-medium text-gray-500 whitespace-nowrap">الدفع</th>
                      <th className="text-right py-3 px-2 font-medium text-gray-500 whitespace-nowrap">الحالة</th>
                      <th className="text-right py-3 px-2 font-medium text-gray-500 whitespace-nowrap">التاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, idx) => {
                      const status = statusMap[order.status] || statusMap.new;
                      return (
                        <motion.tr
                          key={order.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="border-b border-gray-50 hover:bg-sky-50/30 transition-colors cursor-pointer"
                        >
                          <td className="py-3 px-2 font-mono text-sky-600 font-bold text-xs whitespace-nowrap">{order.order_number || order.id}</td>
                          <td className="py-3 px-2 whitespace-nowrap">
                            <div>
                              <p className="font-medium text-navy-900">{order.full_name || order.customer}</p>
                              <p className="text-xs text-gray-400">{order.phone}</p>
                            </div>
                          </td>
                          <td className="py-3 px-2 font-bold text-navy-900 whitespace-nowrap">{order.total} ج.م</td>
                          <td className="py-3 px-2 text-xs text-gray-500 whitespace-nowrap">{order.payment_method || order.payment || "كاش"}</td>
                          <td className="py-3 px-2 whitespace-nowrap">
                            <Badge variant={status.variant} className="gap-1">
                              <status.icon className="w-3 h-3 shrink-0" />
                              {status.label}
                            </Badge>
                          </td>
                          <td className="py-3 px-2 text-gray-400 text-xs whitespace-nowrap">{order.date || (order.created_at ? new Date(order.created_at).toLocaleDateString('en-GB') : "اليوم")}</td>
                        </motion.tr>
                      );
                    })}
                    {recentOrders.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-12 text-center">
                          <ShoppingCart className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                          <p className="text-gray-400">لا توجد طلبات بعد</p>
                          <p className="text-gray-300 text-xs mt-1">ستظهر الطلبات هنا فور وصولها</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar: Best Selling + Activity */}
        <div className="space-y-6">
          {/* Best Selling */}
          <Card className="border-gray-100">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Star className="w-5 h-5 text-amber-500" />
                </div>
                <CardTitle className="text-lg">الأكثر مبيعاً</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {bestSelling.map((product, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm font-bold text-gray-300 w-5">{i + 1}</span>
                    <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center border border-sky-100">
                      <span>{product.emoji}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-navy-900 truncate">{product.name}</p>
                      <p className="text-xs text-gray-400">{product.sales} مبيعة</p>
                    </div>
                    <span className="text-sm font-bold text-sky-600">{(product.revenue / 1000).toFixed(0)}K</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Log */}
          <Card className="border-gray-100">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-violet-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">آخر الأنشطة</CardTitle>
                  <p className="text-xs text-gray-400 mt-0.5">تحديث مباشر</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {recentActivity.length > 0 ? (
                <div className="space-y-3">
                  {recentActivity.map((act, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <div className={`w-8 h-8 rounded-lg ${act.color} flex items-center justify-center shrink-0 mt-0.5`}>
                        <act.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-navy-900 leading-relaxed">{act.text}</p>
                        <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {act.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Activity className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">لا توجد أنشطة حتى الآن</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
