"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, CreditCard, Banknote, Smartphone, ArrowLeft, Loader2, ShieldCheck, Trash2, Minus, Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { trackPurchase } from "@/components/Analytics";
import { GOVERNORATES, calculateShipping } from "@/lib/constants";
import { useRouter } from "next/navigation";

const governorates = GOVERNORATES;

const paymentMethods = [
  { id: "cod", label: "الدفع عند الاستلام", icon: Banknote, desc: "ادفع كاش عند استلام الطلب" },
  { id: "bank_transfer", label: "بطاقة ائتمان", icon: CreditCard, desc: "دفع آمن عبر البطاقة" },
  { id: "vodafone_cash", label: "فودافون كاش", icon: Smartphone, desc: "ادفع عبر فودافون كاش" },
  { id: "instapay", label: "إنستاباي", icon: Smartphone, desc: "ادفع عبر إنستاباي" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [payment, setPayment] = useState("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    governorate: "",
    city: "",
    address: "",
    notes: ""
  });

  useEffect(() => {
    try {
      const cart = JSON.parse(localStorage.getItem('alphabreeze_cart') || '[]');
      setItems(cart);
    } catch (e) {
      setItems([]);
    }
    setMounted(true);
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    const newItems = items.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    });
    setItems(newItems);
    localStorage.setItem('alphabreeze_cart', JSON.stringify(newItems));
    window.dispatchEvent(new Event('cart_updated'));
  };

  const removeItem = (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    localStorage.setItem('alphabreeze_cart', JSON.stringify(newItems));
    window.dispatchEvent(new Event('cart_updated'));
    toast.success("تم إزالة المنتج من السلة");
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = calculateShipping(formData.governorate, subtotal);
  const total = subtotal + shipping;

  const handleConfirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("السلة فارغة، يرجى إضافة منتجات أولاً");
      return;
    }
    if (!formData.name || !formData.phone || !formData.governorate || !formData.city || !formData.address) {
      toast.error("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }

    setIsProcessing(true);
    
    try {
      let generatedOrderId = `AB-${Math.floor(10000 + Math.random() * 90000)}`;

      const orderData = {
        order_number: generatedOrderId,
        full_name: formData.name,
        phone: formData.phone,
        governorate: formData.governorate,
        city: formData.city,
        address: formData.address,
        notes: formData.notes,
        payment_method: payment,
        subtotal: subtotal,
        shipping_cost: shipping,
        total: total,
        status: "new"
      };

      const orderItems = items.map(i => ({
        product_id: i.id?.length > 10 ? i.id : null, // only use uuid if real id
        product_name: i.name,
        product_image: i.image || "",
        quantity: i.qty,
        unit_price: i.price,
        total_price: i.price * i.qty
      }));

      // Submit via API Route to trigger emails
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            full_name: formData.name,
            phone: formData.phone,
            governorate: formData.governorate,
            city: formData.city,
            address: formData.address,
            notes: formData.notes
          },
          items: orderItems,
          paymentMethod: payment
        })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create order");
      
      const serverOrderId = data.order?.order_number || generatedOrderId;

      // Clear cart
      localStorage.setItem('alphabreeze_cart', JSON.stringify([]));
      setItems([]);
      window.dispatchEvent(new Event('cart_updated'));

      // Analytics Tracking
      trackPurchase({
        value: total,
        orderId: serverOrderId,
        items: orderItems
      });
      
      setOrderPlaced(true);
      router.push(`/thank-you?orderId=${serverOrderId}`);
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ أثناء إتمام الطلب، يرجى المحاولة مرة أخرى");
      setIsProcessing(false);
    }
  };

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <section className="pt-32 pb-20 min-h-screen flex items-center bg-gray-50">
        <div className="container mx-auto px-4 max-w-lg text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
            <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-6 text-gray-400">
              <ShoppingCart className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold text-navy-900 mb-3">السلة فارغة</h1>
            <p className="text-gray-500 mb-8">لم تقم بإضافة أي منتجات إلى سلة التسوق حتى الآن.</p>
            <Link href="/shop">
              <Button size="lg" className="w-full text-lg h-14 rounded-xl">تصفح المنتجات</Button>
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-28 pb-16 bg-gray-50/50 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-navy-900 mb-8 flex items-center gap-3">
          إتمام الطلب
          <ShieldCheck className="w-6 h-6 text-emerald-500" />
        </h1>
        <form onSubmit={handleConfirmOrder}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Info */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="font-bold text-xl text-navy-900 mb-6 pb-4 border-b border-gray-100">بيانات التوصيل</h2>
                <div className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <Label>الاسم الكامل *</Label>
                      <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="أدخل اسمك بالكامل" className="mt-1.5 h-12" required />
                    </div>
                    <div>
                      <Label>رقم الهاتف *</Label>
                      <Input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="01xxxxxxxxx" className="mt-1.5 h-12" dir="ltr" required />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <Label>المحافظة *</Label>
                      <select value={formData.governorate} onChange={e => setFormData({...formData, governorate: e.target.value})} className="mt-1.5 flex h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all" required>
                        <option value="">اختر المحافظة</option>
                        {governorates.map((g) => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>
                    <div>
                      <Label>المدينة *</Label>
                      <Input value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} placeholder="أدخل المدينة" className="mt-1.5 h-12" required />
                    </div>
                  </div>
                  <div>
                    <Label>العنوان بالتفصيل *</Label>
                    <Input value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="الشارع، رقم المبنى، الدور، الشقة" className="mt-1.5 h-12" required />
                  </div>
                  <div>
                    <Label>ملاحظات (اختياري)</Label>
                    <Textarea value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} placeholder="ملاحظات إضافية بخصوص التوصيل..." className="mt-1.5" rows={3} />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="font-bold text-xl text-navy-900 mb-6 pb-4 border-b border-gray-100">طريقة الدفع</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {paymentMethods.map((pm) => (
                    <button type="button" key={pm.id} onClick={() => setPayment(pm.id)}
                      className={`p-5 rounded-xl border-2 text-right transition-all flex items-start gap-4 ${payment === pm.id ? "border-sky-500 bg-sky-50 shadow-md shadow-sky-500/10" : "border-gray-100 hover:border-sky-200 hover:bg-gray-50"}`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${payment === pm.id ? "bg-sky-500 text-white" : "bg-gray-100 text-gray-500"}`}>
                        <pm.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className={`font-bold ${payment === pm.id ? "text-sky-700" : "text-navy-900"}`}>{pm.label}</p>
                        <p className={`text-sm mt-1 ${payment === pm.id ? "text-sky-600" : "text-gray-500"}`}>{pm.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Simulated Credit Card Form if selected */}
                <AnimatePresence>
                  {payment === "bank_transfer" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      <div className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
                         <div className="flex justify-between items-center mb-4">
                           <h3 className="font-bold text-gray-700">بيانات البطاقة</h3>
                           <div className="flex gap-2">
                              <div className="w-10 h-6 bg-blue-600 rounded"></div>
                              <div className="w-10 h-6 bg-red-500 rounded"></div>
                           </div>
                         </div>
                         <div><Label>رقم البطاقة</Label><Input placeholder="0000 0000 0000 0000" className="mt-1" dir="ltr" /></div>
                         <div className="grid grid-cols-2 gap-4">
                           <div><Label>تاريخ الانتهاء</Label><Input placeholder="MM/YY" className="mt-1" dir="ltr" /></div>
                           <div><Label>رمز التحقق (CVV)</Label><Input placeholder="123" className="mt-1" type="password" dir="ltr" /></div>
                         </div>
                      </div>
                    </motion.div>
                  )}
                  {(payment === "vodafone_cash" || payment === "instapay") && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      <div className="mt-6 p-6 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-4">
                         <ShieldCheck className="w-10 h-10 text-emerald-500 shrink-0" />
                         <div>
                           <h3 className="font-bold text-emerald-800">بوابة دفع آمنة</h3>
                           <p className="text-emerald-600 text-sm mt-1">سيتم توجيهك بأمان لإتمام الدفع بعد تأكيد الطلب.</p>
                         </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xl shadow-gray-200/50 sticky top-28">
                <h2 className="font-bold text-xl text-navy-900 mb-6 pb-4 border-b border-gray-100">السلة وملخص الطلب</h2>
                <div className="space-y-4 mb-6 max-h-[350px] overflow-y-auto pr-2">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div key={item.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -50 }} className="flex items-start gap-4 p-3 rounded-xl border border-gray-100 bg-gray-50/50">
                        <div className="w-16 h-16 rounded-2xl bg-sky-50 flex items-center justify-center shrink-0 border border-sky-100">
                          <span className="text-2xl">{item.emoji}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <p className="font-bold text-navy-900 text-sm truncate pr-2">{item.name}</p>
                            <button type="button" onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="font-bold text-sky-600 text-sm mb-2">{item.price} ج.م</p>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center bg-white rounded-lg border border-gray-200">
                              <button type="button" onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-navy-900 transition-colors">
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                              <button type="button" onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-navy-900 transition-colors">
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl space-y-3 text-sm mb-6 border border-gray-100">
                  <div className="flex justify-between"><span className="text-gray-500">المجموع الفرعي</span><span className="font-medium text-navy-900">{subtotal} ج.م</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">رسوم الشحن</span><span className="font-medium text-navy-900">{shipping} ج.م</span></div>
                  <div className="flex justify-between border-t border-gray-200 pt-3 mt-1">
                    <span className="font-bold text-lg text-navy-900">الإجمالي النهائي</span>
                    <span className="font-bold text-2xl text-sky-600">{total} ج.م</span>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isProcessing || items.length === 0}
                  className={`w-full h-14 text-lg font-bold rounded-xl shadow-lg transition-all ${isProcessing || items.length === 0 ? "bg-sky-400 cursor-not-allowed" : "shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-1"}`}
                >
                  {isProcessing ? (
                    <><Loader2 className="w-6 h-6 ml-2 animate-spin" /> جاري معالجة الدفع...</>
                  ) : (
                    <>تأكيد الطلب والدفع</>
                  )}
                </Button>
                
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-400">
                  <ShieldCheck className="w-4 h-4" />
                  تسوق آمن ومحمي 100%
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Full screen loading overlay for payment simulation */}
      <AnimatePresence>
        {isProcessing && payment !== "cod" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center">
            <div className="w-24 h-24 border-4 border-sky-100 border-t-sky-500 rounded-full animate-spin mb-6"></div>
            <h2 className="text-2xl font-bold text-navy-900 mb-2">جاري الاتصال ببوابة الدفع...</h2>
            <p className="text-gray-500">يرجى عدم إغلاق هذه الصفحة أو تحديثها</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
