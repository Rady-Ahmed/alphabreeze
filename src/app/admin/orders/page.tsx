"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Trash2, ShoppingCart, Package, CheckCircle, Truck, Edit, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getOrders, getSupabase } from "@/lib/db";

const statusMap: Record<string, { label: string; variant: "default" | "success" | "secondary" | "destructive" }> = {
  new: { label: "جديد", variant: "default" },
  under_review: { label: "قيد المراجعة", variant: "secondary" },
  confirmed: { label: "مؤكد", variant: "default" },
  shipping: { label: "جاري الشحن", variant: "secondary" },
  delivered: { label: "تم التسليم", variant: "success" },
  cancelled: { label: "ملغي", variant: "destructive" },
};

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [orders, setOrders] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getOrders();
        // Fallback merging for local storage if Supabase is empty but local isn't
        const localAllOrders = JSON.parse(localStorage.getItem("alphabreeze_all_orders") || "[]");
        const supabase = getSupabase();
        if (supabase) {
          setOrders(data || []);
        } else {
          setOrders(localAllOrders);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setMounted(true);
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الطلب؟")) {
      const newData = orders.filter((o) => o.id !== id);
      setOrders(newData);
      toast.success("تم حذف الطلب بنجاح");
      
      try {
        const supabase = getSupabase();
        if (supabase) {
          await supabase.from("orders").delete().eq("id", id);
        } else {
          localStorage.setItem("alphabreeze_all_orders", JSON.stringify(newData));
        }
      } catch(e) {}
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const newData = orders.map((o) => o.id === id ? { ...o, status: newStatus } : o);
    setOrders(newData);
    toast.success("تم تحديث حالة الطلب");
    
    try {
      const supabase = getSupabase();
      if (supabase) {
        await supabase.from("orders").update({ status: newStatus }).eq("id", id);
      } else {
        localStorage.setItem("alphabreeze_all_orders", JSON.stringify(newData));
      }
    } catch(e) {}
  };

  if (!mounted) return null;

  const filtered = orders
    .filter((o) => statusFilter === "all" || o.status === statusFilter)
    .filter((o) => (o.customer || o.full_name || "").includes(search) || (o.id || o.order_number || "").includes(search));

  const stats = {
    new: orders.filter(o => o.status === "new").length,
    processing: orders.filter(o => o.status === "under_review" || o.status === "confirmed").length,
    shipping: orders.filter(o => o.status === "shipping").length,
    delivered: orders.filter(o => o.status === "delivered").length,
  };

  const statCards = [
    { label: "طلبات جديدة", value: stats.new, icon: ShoppingCart, color: "bg-sky-100 text-sky-600" },
    { label: "قيد التجهيز", value: stats.processing, icon: Package, color: "bg-amber-100 text-amber-600" },
    { label: "جاري الشحن", value: stats.shipping, icon: Truck, color: "bg-blue-100 text-blue-600" },
    { label: "تم التسليم", value: stats.delivered, icon: CheckCircle, color: "bg-emerald-100 text-emerald-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">إدارة الطلبات</h1>
        <p className="text-gray-500 text-sm">{orders.length} طلب إجمالي</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <Card key={i}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-navy-900">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="بحث برقم الطلب أو اسم العميل..." className="pr-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-11 rounded-xl border border-gray-200 px-4 text-sm bg-white">
              <option value="all">جميع الحالات</option>
              {Object.entries(statusMap).map(([key, val]) => <option key={key} value={key}>{val.label}</option>)}
            </select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-right py-3 px-3 font-medium text-gray-500">رقم الطلب</th>
                  <th className="text-right py-3 px-3 font-medium text-gray-500">العميل</th>
                  <th className="text-right py-3 px-3 font-medium text-gray-500">المحافظة</th>
                  <th className="text-right py-3 px-3 font-medium text-gray-500">المبلغ</th>
                  <th className="text-right py-3 px-3 font-medium text-gray-500">الدفع</th>
                  <th className="text-right py-3 px-3 font-medium text-gray-500">الحالة</th>
                  <th className="text-right py-3 px-3 font-medium text-gray-500">التاريخ</th>
                  <th className="text-right py-3 px-3 font-medium text-gray-500">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => {
                  const status = statusMap[order.status] || statusMap.new;
                  return (
                    <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-3 font-mono text-sky-600 font-medium">{order.order_number || order.id}</td>
                      <td className="py-3 px-3">
                        <p className="font-medium text-navy-900">{order.full_name || order.customer}</p>
                        <p className="text-xs text-gray-400">{order.phone}</p>
                      </td>
                      <td className="py-3 px-3 text-gray-600">{order.governorate}</td>
                      <td className="py-3 px-3 font-medium">{order.total} ج.م</td>
                      <td className="py-3 px-3 text-xs text-gray-500">{order.payment_method || order.payment}</td>
                      <td className="py-3 px-3">
                        <select 
                          className={`text-xs font-medium px-2 py-1 rounded-full outline-none cursor-pointer border-0 ${status.variant === 'success' ? 'bg-emerald-100 text-emerald-700' : status.variant === 'destructive' ? 'bg-red-100 text-red-700' : status.variant === 'secondary' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'}`}
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                        >
                          {Object.entries(statusMap).map(([key, val]) => (
                            <option key={key} value={key}>{val.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-3 text-gray-400">
                        {order.date || (order.created_at ? new Date(order.created_at).toLocaleDateString('en-GB') : '')}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => toast.info("سيتم عرض تفاصيل الطلب قريباً")} className="p-2 rounded-lg hover:bg-sky-50 text-sky-500"><Eye className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(order.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-gray-500">لا توجد طلبات مطابقة للبحث</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
