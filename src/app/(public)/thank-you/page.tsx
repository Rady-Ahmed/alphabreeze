"use client";

import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "";

  return (
    <section className="pt-32 pb-20 min-h-screen flex items-center bg-gray-50">
      <div className="container mx-auto px-4 max-w-lg text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
          <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-bold text-navy-900 mb-3">تم تأكيد طلبك بنجاح!</h1>
          
          {orderId && (
            <p className="text-gray-500 mb-6 text-lg">
              رقم الطلب: <span className="font-bold text-sky-600">#{orderId}</span>
            </p>
          )}

          <p className="text-gray-500 mb-8 leading-relaxed">
            شكراً لتسوقك معنا. سنتواصل معك قريباً لتأكيد موعد التسليم.
            <br />
            يمكنك متابعة حالة طلبك من خلال رقم الطلب أعلاه.
          </p>
          
          <div className="space-y-3">
            {orderId && (
              <Link href={`/track-order?orderId=${encodeURIComponent(orderId)}`} className="block">
                <Button variant="outline" size="lg" className="w-full text-base h-12 rounded-xl border-sky-200 text-sky-700 hover:bg-sky-50">
                  متابعة حالة الطلب
                </Button>
              </Link>
            )}
            <Link href="/shop" className="block">
              <Button size="lg" className="w-full text-lg h-14 rounded-xl">
                متابعة التسوق <ArrowLeft className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 pt-32 pb-20 flex items-center justify-center">جاري التحميل...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}
