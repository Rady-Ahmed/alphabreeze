"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, ShoppingCart, MessageSquare, AlertCircle, Trash2, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { getOrders, getMessages, getManufacturingRequests, getSupabase } from "@/lib/db";

function timeAgo(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return "منذ " + Math.floor(interval) + " سنة";
  interval = seconds / 2592000;
  if (interval > 1) return "منذ " + Math.floor(interval) + " شهر";
  interval = seconds / 86400;
  if (interval > 1) return "منذ " + Math.floor(interval) + " يوم";
  interval = seconds / 3600;
  if (interval > 1) return "منذ " + Math.floor(interval) + " ساعة";
  interval = seconds / 60;
  if (interval > 1) return "منذ " + Math.floor(interval) + " دقيقة";
  return "الآن";
}

type Notification = {
  id: string;
  type: "order" | "message" | "system";
  title: string;
  description: string;
  date: Date;
  read: boolean;
  link: string;
  originalId?: string;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [ordersData, messagesData, mfgData] = await Promise.all([
          getOrders(),
          getMessages(),
          getManufacturingRequests()
        ]);
        
        // Use local fallback for orders if empty (to not break the UI when empty DB)
        const savedOrders = ordersData?.length > 0 ? ordersData.filter((o:any)=>o.status==="new") : JSON.parse(localStorage.getItem('alphabreeze_new_orders') || '[]');
        const savedMessages = messagesData?.length > 0 ? messagesData : JSON.parse(localStorage.getItem('alphabreeze_messages') || '[]');
        const savedMfg = mfgData?.length > 0 ? mfgData : JSON.parse(localStorage.getItem('alphabreeze_manufacturing_requests') || '[]');

        // Format Orders
        const orderNotifications: Notification[] = savedOrders.map((order: any, index: number) => ({
          id: `order-${order.id}-${index}`,
          originalId: order.id,
          type: "order",
          title: `طلب جديد: ${order.id || order.order_number}`,
          description: `قام ${order.customer || order.full_name} بطلب منتجات بقيمة ${order.total}. طريقة الدفع: ${order.payment || order.payment_method}.`,
          date: order.created_at ? new Date(order.created_at) : new Date(), 
          read: false,
          link: "/admin/orders",
        }));

        // Format Messages (only unread)
        const messageNotifications: Notification[] = savedMessages
          .filter((m: any) => !m.read && !m.is_read)
          .map((msg: any, index: number) => ({
            id: `msg-${msg.id}-${index}`,
            originalId: msg.id,
            type: "message",
            title: `رسالة جديدة من ${msg.name || msg.full_name}`,
            description: msg.subject ? msg.subject : (msg.message.substring(0, 50) + "..."),
            date: msg.created_at ? new Date(msg.created_at) : new Date(),
            read: false,
            link: "/admin/messages",
          }));

        // Format Mfg Requests (only new)
        const mfgNotifications: Notification[] = savedMfg
          .filter((m: any) => m.status === 'new')
          .map((mfg: any, index: number) => ({
            id: `mfg-${mfg.id}-${index}`,
            originalId: mfg.id,
            type: "system", 
            title: `طلب تصنيع جديد من ${mfg.name || mfg.full_name}`,
            description: `المنتج المطلوب: ${mfg.product || mfg.product_type} للشركة: ${mfg.company || mfg.company_name || 'غير محدد'}`,
            date: mfg.created_at ? new Date(mfg.created_at) : new Date(),
            read: false,
            link: "/admin/manufacturing",
          }));

        // Merge and sort
        const combined = [...orderNotifications, ...messageNotifications, ...mfgNotifications];
        combined.sort((a, b) => b.date.getTime() - a.date.getTime());
        setNotifications(combined);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
    
    // Poll to keep it fresh
    const interval = setInterval(fetchAll, 30000);
    return () => clearInterval(interval);
  }, []);

  const clearAll = () => {
    setNotifications([]);
    localStorage.removeItem('alphabreeze_new_orders');
    
    // Mark messages as read
    const messages = JSON.parse(localStorage.getItem('alphabreeze_messages') || '[]');
    localStorage.setItem('alphabreeze_messages', JSON.stringify(messages.map((m: any) => ({ ...m, read: true }))));
    
    // Mark mfg as reviewed
    const mfg = JSON.parse(localStorage.getItem('alphabreeze_manufacturing_requests') || '[]');
    localStorage.setItem('alphabreeze_manufacturing_requests', JSON.stringify(mfg.map((m: any) => m.status === 'new' ? { ...m, status: 'reviewed' } : m)));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "order": return <ShoppingCart className="w-5 h-5 text-sky-500" />;
      case "message": return <MessageSquare className="w-5 h-5 text-amber-500" />;
      default: return <AlertCircle className="w-5 h-5 text-emerald-500" />;
    }
  };

  const getBg = (type: string) => {
    switch (type) {
      case "order": return "bg-sky-100";
      case "message": return "bg-amber-100";
      default: return "bg-emerald-100";
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900 flex items-center gap-2">
            <Bell className="w-6 h-6 text-sky-500" />
            الإشعارات
          </h1>
          <p className="text-gray-500 text-sm mt-1">لديك {notifications.filter(n => !n.read).length} إشعارات غير مقروءة</p>
        </div>
        <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={clearAll}>
          <Trash2 className="w-4 h-4 ml-2" />
          مسح الكل
        </Button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <Bell className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-400">لا توجد إشعارات حالياً</h3>
          </div>
        ) : (
          notifications.map((notification) => (
            <Link key={notification.id} href={notification.link} className="block group">
              <Card className={`transition-all duration-300 hover:shadow-md hover:border-sky-200 ${!notification.read ? 'bg-sky-50/30' : 'bg-white'}`}>
                <CardContent className="p-4 sm:p-6 flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${getBg(notification.type)}`}>
                    {getIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                      <h3 className="font-bold text-navy-900 group-hover:text-sky-600 transition-colors">
                        {notification.title}
                        {!notification.read && <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2" />}
                      </h3>
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {timeAgo(notification.date)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-2">
                      {notification.description}
                    </p>
                    <div className="flex items-center text-xs font-semibold text-sky-500 group-hover:translate-x-[-4px] transition-transform w-fit">
                      عرض التفاصيل
                      <ArrowRight className="w-3 h-3 mr-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
