"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Factory, Phone, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getManufacturingRequests, getSupabase } from "@/lib/db";

const statusColors: Record<string, "default" | "success" | "secondary" | "destructive"> = {
  new: "default", reviewed: "secondary", in_progress: "default", completed: "success", rejected: "destructive",
};
const statusLabels: Record<string, string> = {
  new: "جديد", reviewed: "تمت المراجعة", in_progress: "قيد التنفيذ", completed: "مكتمل", rejected: "مرفوض",
};

export default function ManufacturingPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getManufacturingRequests();
        setRequests(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setMounted(true);
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleDelete = async (id: any) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الطلب؟")) {
      const newData = requests.filter(r => r.id !== id);
      setRequests(newData);
      toast.success("تم حذف الطلب بنجاح");
      
      try {
        const supabase = getSupabase();
        if (supabase) {
          await supabase.from("manufacturing_requests").delete().eq("id", id);
        } else {
          localStorage.setItem("alphabreeze_manufacturing_requests", JSON.stringify(newData));
        }
      } catch(e) {}
    }
  };

  const handleStatusChange = async (id: any, newStatus: string) => {
    const newData = requests.map(r => r.id === id ? { ...r, status: newStatus } : r);
    setRequests(newData);
    toast.success("تم تحديث حالة الطلب");
    
    try {
      const supabase = getSupabase();
      if (supabase) {
        await supabase.from("manufacturing_requests").update({ status: newStatus }).eq("id", id);
      } else {
        localStorage.setItem("alphabreeze_manufacturing_requests", JSON.stringify(newData));
      }
    } catch(e) {}
  };

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">طلبات التصنيع</h1>
        <p className="text-gray-500 text-sm">{requests.length} طلب</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map((req) => (
          <Card key={req.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-navy-100 flex items-center justify-center shrink-0">
                    <Factory className="w-6 h-6 text-navy-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-navy-900">{req.full_name || req.name}</h3>
                      {(req.company_name || req.company) && <span className="text-xs text-gray-400">- {req.company_name || req.company}</span>}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-1 text-sm mt-2">
                      <div><span className="text-gray-400">المنتج:</span> <span className="text-navy-900 font-medium">{req.product_type || req.product}</span></div>
                      <div><span className="text-gray-400">الكمية:</span> <span className="text-navy-900 font-medium">{req.expected_quantity || req.quantity}</span></div>
                      <div className="flex items-center gap-1"><Phone className="w-3 h-3 text-gray-400" /><span className="text-gray-600">{req.phone}</span></div>
                    </div>
                    {(req.project_details || req.details) && <p className="text-sm text-gray-500 mt-2 whitespace-pre-wrap border-t border-gray-100 pt-2">التفاصيل: {req.project_details || req.details}</p>}
                  </div>
                </div>
                <div className="flex flex-row md:flex-col items-end gap-3 justify-between w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                  <div className="flex items-center gap-2">
                    <select
                      value={req.status}
                      onChange={(e) => handleStatusChange(req.id, e.target.value)}
                      className={`text-xs font-semibold py-1 px-2 rounded-lg border ${req.status === 'new' ? 'bg-gray-100 text-gray-800 border-gray-200' : req.status === 'completed' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-blue-100 text-blue-800 border-blue-200'}`}
                    >
                      {Object.entries(statusLabels).map(([val, label]) => (
                        <option key={val} value={val}>{label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">{req.date || (req.created_at ? new Date(req.created_at).toLocaleDateString('en-GB') : '')}</span>
                    <button onClick={() => handleDelete(req.id)} className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {requests.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <Factory className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">لا توجد طلبات تصنيع حالياً</p>
          </div>
        )}
        </div>
      )}
    </div>
  );
}
