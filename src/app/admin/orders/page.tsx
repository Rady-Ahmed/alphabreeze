"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search, Eye, Trash2, ShoppingCart, Package, CheckCircle2,
  Truck, Clock, X, MessageCircle, AlertCircle, RefreshCw, FileText
} from "lucide-react";
import { toast } from "sonner";
import { getOrders, updateOrderStatus, deleteOrder } from "@/lib/db";

const STATUS_MAP: Record<string, { label: string; badge: string }> = {
  new: { label: "طلب جديد", badge: "bg-cyan-100 text-cyan-800 border-cyan-200" },
  under_review: { label: "قيد المراجعة الفنية", badge: "bg-amber-100 text-amber-800 border-amber-200" },
  confirmed: { label: "مؤكد وجاري التجهيز", badge: "bg-blue-100 text-blue-800 border-blue-200" },
  shipping: { label: "تم الشحن", badge: "bg-purple-100 text-purple-800 border-purple-200" },
  delivered: { label: "تم التسليم", badge: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  cancelled: { label: "ملغي", badge: "bg-red-100 text-red-800 border-red-200" },
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    setLoading(true);
    try {
      const data = await getOrders();
      setOrders(data || []);
    } catch {
      toast.error("تعذر تحميل الطلبات");
    } finally {
      setLoading(false);
    }
  }

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
      toast.success("تم تحديث حالة الطلب بنجاح ✓");
    } catch {
      toast.error("تعذر تحديث الحالة");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا السجل نهائياً؟")) return;
    try {
      await deleteOrder(id);
      setOrders((prev) => prev.filter((o) => o.id !== id));
      if (selectedOrder?.id === id) setSelectedOrder(null);
      toast.success("تم حذف الطلب بنجاح");
    } catch {
      toast.error("تعذر حذف الطلب");
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchStatus = statusFilter === "all" || o.status === statusFilter;
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        (o.customer_name && o.customer_name.toLowerCase().includes(q)) ||
        (o.phone && o.phone.toLowerCase().includes(q)) ||
        (o.order_number && o.order_number.toLowerCase().includes(q)) ||
        (o.governorate && o.governorate.toLowerCase().includes(q));

      return matchStatus && matchSearch;
    });
  }, [orders, statusFilter, search]);

  return (
    <div className="space-y-6" dir="rtl">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-black text-slate-900">إدارة أوامر التوريد والطلبات</h1>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800">
              {orders.length} طلب
            </span>
          </div>
          <p className="text-slate-500 text-xs">
            متابعة طلبات المصانع، تغيير حالات الشحن، والتواصل المباشر مع مدراء المشتريات
          </p>
        </div>

        <Button
          variant="outline"
          onClick={loadOrders}
          disabled={loading}
          className="rounded-xl text-xs gap-1.5 h-10 border-slate-200"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          تحديث السجلات
        </Button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث برقم الطلب، اسم العميل، رقم الهاتف، أو المحافظة..."
            className="pr-10 h-10 rounded-xl text-xs bg-slate-50 border-slate-200 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="all">جميع الحالات ({orders.length})</option>
            {Object.entries(STATUS_MAP).map(([key, info]) => (
              <option key={key} value={key}>
                {info.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-20 text-slate-400 text-xs">جاري تحميل الطلبات...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700">لا توجد طلبات مطابقة للبحث</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-bold">
                <tr>
                  <th className="py-3.5 px-4">رقم الطلب</th>
                  <th className="py-3.5 px-4">العميل / المصنع</th>
                  <th className="py-3.5 px-4">الهاتف</th>
                  <th className="py-3.5 px-4">المحافظة</th>
                  <th className="py-3.5 px-4">إجمالي القيمة</th>
                  <th className="py-3.5 px-4">تاريخ الطلب</th>
                  <th className="py-3.5 px-4">الحالة</th>
                  <th className="py-3.5 px-4 text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((order) => {
                  const statusInfo = STATUS_MAP[order.status] || STATUS_MAP.new;
                  return (
                    <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-cyan-700">
                        {order.order_number || `#${order.id.substring(0, 8)}`}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-800">
                        {order.customer_name || order.name || "عميل غير مسمى"}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600">
                        {order.phone}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {order.governorate || "القاهرة"}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-800">
                        {order.total_amount ? `${order.total_amount} ج.م` : "تسعير خاص"}
                      </td>
                      <td className="py-3 px-4 text-slate-400">
                        {order.created_at ? new Date(order.created_at).toLocaleDateString("ar-EG") : "اليوم"}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={order.status || "new"}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusInfo.badge} cursor-pointer focus:outline-none`}
                        >
                          {Object.entries(STATUS_MAP).map(([val, st]) => (
                            <option key={val} value={val}>
                              {st.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-cyan-50 hover:text-cyan-600 text-slate-600 transition"
                            title="تفاصيل الطلب"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <a
                            href={`https://wa.me/20${order.phone?.replace(/\D/g, '')}?text=${encodeURIComponent(`مرحباً أستاذ ${order.customer_name || ''}، بخصوص طلب التوريد رقم ${order.order_number || ''} من ألفا بريز:`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-emerald-50 hover:text-emerald-600 text-slate-600 transition"
                            title="مراسلة عبر واتساب"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => handleDelete(order.id)}
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-red-50 hover:text-red-600 text-slate-600 transition"
                            title="حذف"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  تفاصيل أمر التوريد: {selectedOrder.order_number || selectedOrder.id}
                </h3>
                <span className="text-xs text-slate-400">
                  {selectedOrder.created_at ? new Date(selectedOrder.created_at).toLocaleString("ar-EG") : ""}
                </span>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl">
                <div>
                  <span className="text-slate-400 block mb-0.5">اسم المصنع / العميل:</span>
                  <span className="font-bold text-slate-800 text-sm">{selectedOrder.customer_name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">رقم الهاتف:</span>
                  <span className="font-mono font-bold text-slate-800 text-sm">{selectedOrder.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">المحافظة والعنوان:</span>
                  <span className="font-semibold text-slate-700">{selectedOrder.governorate} — {selectedOrder.address || "غير محدد"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">طريقة الدفع:</span>
                  <span className="font-semibold text-slate-700">{selectedOrder.payment_method || "تحويل بنكي / كاش"}</span>
                </div>
              </div>

              {selectedOrder.notes && (
                <div className="p-3 bg-cyan-50 rounded-xl border border-cyan-100">
                  <span className="font-bold text-cyan-900 block mb-1">ملاحظات العميل:</span>
                  <p className="text-cyan-800 leading-relaxed">{selectedOrder.notes}</p>
                </div>
              )}

              {/* Items List */}
              {selectedOrder.items && selectedOrder.items.length > 0 && (
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">المواد المطلوبة:</h4>
                  <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                    {selectedOrder.items.map((it: any, i: number) => (
                      <div key={i} className="p-2.5 flex items-center justify-between bg-white">
                        <span className="font-semibold text-slate-800">{it.name || it.product_name}</span>
                        <span className="font-mono text-cyan-700 font-bold">{it.quantity} كجم</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={`https://wa.me/20${selectedOrder.phone?.replace(/\D/g, '')}?text=${encodeURIComponent(`مرحباً أستاذ ${selectedOrder.customer_name || ''}، معك إدارة مبيعات شركة ألفا بريز للمواد الخام بخصوص طلبك:`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  متابعة مع المصنع عبر واتساب
                </a>
                <Button variant="outline" onClick={() => setSelectedOrder(null)} className="rounded-xl">
                  إغلاق
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
