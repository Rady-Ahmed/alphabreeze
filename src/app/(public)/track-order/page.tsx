"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, PackageCheck, ArrowRight, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ORDER_STATUSES, PAYMENT_METHODS, formatPrice } from "@/lib/constants";
import { toast } from "sonner";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const id = searchParams.get("orderId");
    if (id) setOrderNumber(id);
  }, [searchParams]);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim() || !phone.trim()) {
      toast.error("يرجى إدخال رقم الطلب ورقم الهاتف");
      return;
    }
    setLoading(true);
    setOrder(null);
    try {
      const res = await fetch(
        `/api/orders/track?orderNumber=${encodeURIComponent(orderNumber.trim())}&phone=${encodeURIComponent(phone.trim())}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "لم يتم العثور على الطلب");
      setOrder(data.order);
    } catch (err: any) {
      toast.error(err?.message || "تعذر الاستعلام عن الطلب");
    } finally {
      setLoading(false);
    }
  };

  const statusInfo =
    order?.status && ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES]
      ? ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES]
      : { label: order?.status || "جديد", color: "bg-sky-100 text-sky-700" };

  const paymentInfo =
    order?.payment_method && PAYMENT_METHODS[order.payment_method as keyof typeof PAYMENT_METHODS]
      ? PAYMENT_METHODS[order.payment_method as keyof typeof PAYMENT_METHODS].label
      : order?.payment_method || "—";

  return (
    <section className="pt-32 pb-20 min-h-screen bg-slate-50" dir="rtl">
      <div className="container mx-auto px-4 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 sm:p-10"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center mx-auto mb-4 text-sky-600">
              <PackageCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-navy-950 mb-2">
              متابعة حالة الطلب
            </h1>
            <p className="text-slate-500 text-sm">
              أدخل رقم الطلب ورقم الهاتف المسجل للاستعلام الفوري عن حالة التجهيز والشحن.
            </p>
          </div>

          <form onSubmit={handleTrack} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                رقم الطلب
              </label>
              <Input
                dir="ltr"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="AB-XXXXX"
                className="h-11 rounded-xl font-mono text-right"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                رقم الهاتف المسجل
              </label>
              <Input
                dir="ltr"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01xxxxxxxxx"
                className="h-11 rounded-xl font-mono text-right"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                  جاري البحث...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 ml-2" />
                  استعلام عن الطلب
                </>
              )}
            </Button>
          </form>

          {order && (
            <div className="mt-8 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">رقم الطلب</span>
                <span className="font-mono font-bold text-navy-950">#{order.order_number}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">الحالة الحالية</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusInfo.color}`}>
                  {statusInfo.label}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">الإجمالي</span>
                <span className="font-bold text-slate-800">{formatPrice(Number(order.total || 0))}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">طريقة الدفع</span>
                <span className="text-xs font-semibold text-slate-700">{paymentInfo}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">الوجهة</span>
                <span className="text-xs font-semibold text-slate-700">
                  {order.governorate} - {order.city}
                </span>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <Link href="/shop" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-sky-600 font-semibold">
              <ArrowRight className="w-3.5 h-3.5" />
              العودة للكتالوج
            </Link>
            <a
              href="https://wa.me/201019946409"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-bold"
            >
              <MessageCircle className="w-4 h-4" />
              تواصل مع خدمة العملاء
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 pt-32 flex items-center justify-center">جاري التحميل...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
