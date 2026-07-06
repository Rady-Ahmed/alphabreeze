"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { getOrders } from "@/lib/db";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const ordersData = await getOrders();
        // Fallback merging for local storage if Supabase is empty
        const localAllOrders = JSON.parse(localStorage.getItem("alphabreeze_all_orders") || "[]");
        const orders = ordersData && ordersData.length > 0 ? ordersData : localAllOrders;

        const customersMap = new Map();
        
        orders.forEach((o: any) => {
          const phone = o.phone;
          const customerName = o.customer || o.full_name;
          const gov = o.governorate;
          const status = o.status;
          const date = o.date || new Date(o.created_at).toLocaleDateString('en-GB');
          const total = Number(o.total) || 0;

          if (!customersMap.has(phone)) {
            customersMap.set(phone, {
              id: phone,
              name: customerName,
              phone: phone,
              governorate: gov,
              orders: 0,
              spent: 0,
              lastOrderDate: date
            });
          }
          
          const customer = customersMap.get(phone);
          if (status !== "cancelled") {
             customer.orders += 1;
             customer.spent += total;
          }
        });
        
        setCustomers(Array.from(customersMap.values()).sort((a, b) => b.spent - a.spent));
      } catch (e) {
        console.error(e);
      } finally {
        setMounted(true);
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (!mounted) return null;

  const filtered = customers.filter((c) => c.name.includes(search) || c.phone.includes(search));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">العملاء</h1>
        <p className="text-gray-500 text-sm">{customers.length} عميل (بناءً على الطلبات المكتملة)</p>
      </div>
      <Card>
        <CardHeader>
          <div className="relative max-w-sm">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="بحث باسم العميل أو رقم الهاتف..." className="pr-9" value={search} onChange={(e) => setSearch(e.target.value)} />
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
                    <th className="text-right py-3 px-3 font-medium text-gray-500">العميل</th>
                    <th className="text-right py-3 px-3 font-medium text-gray-500">الهاتف</th>
                    <th className="text-right py-3 px-3 font-medium text-gray-500">المحافظة</th>
                    <th className="text-right py-3 px-3 font-medium text-gray-500">الطلبات الفعالة</th>
                    <th className="text-right py-3 px-3 font-medium text-gray-500">إجمالي الإنفاق</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-navy-700 flex items-center justify-center text-white text-sm font-bold">
                            {c.name ? c.name[0] : "ع"}
                          </div>
                          <div>
                            <p className="font-medium text-navy-900">{c.name}</p>
                            <p className="text-xs text-gray-400">آخر طلب: {c.lastOrderDate}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono text-gray-600">{c.phone}</td>
                      <td className="py-3 px-3 text-gray-600">{c.governorate}</td>
                      <td className="py-3 px-3 font-medium">{c.orders}</td>
                      <td className="py-3 px-3 font-bold text-sky-600">{c.spent.toLocaleString()} ج.م</td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-500">لا يوجد عملاء مطابقين للبحث</td>
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
