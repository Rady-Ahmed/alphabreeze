"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Trash2, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getMessages, getSupabase } from "@/lib/db";

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getMessages();
        setMessages(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setMounted(true);
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const toggleRead = async (id: any) => {
    const msg = messages.find(m => m.id === id);
    if (!msg) return;
    const newRead = !(msg.read || msg.is_read);
    const newData = messages.map(m => m.id === id ? { ...m, is_read: newRead, read: newRead } : m);
    setMessages(newData);
    
    try {
      const supabase = getSupabase();
      if (supabase) {
        await supabase.from("contact_messages").update({ is_read: newRead }).eq("id", id);
      } else {
        localStorage.setItem("alphabreeze_messages", JSON.stringify(newData));
      }
    } catch(e) {}
  };

  const handleDelete = async (id: any) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الرسالة؟")) {
      const newData = messages.filter(m => m.id !== id);
      setMessages(newData);
      toast.success("تم حذف الرسالة بنجاح");
      
      try {
        const supabase = getSupabase();
        if (supabase) {
          await supabase.from("contact_messages").delete().eq("id", id);
        } else {
          localStorage.setItem("alphabreeze_messages", JSON.stringify(newData));
        }
      } catch(e) {}
    }
  };

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">الرسائل</h1>
          <p className="text-gray-500 text-sm">{messages.filter(m => !m.read && !m.is_read).length} رسالة جديدة</p>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <Card key={msg.id} className={`hover:shadow-md transition-shadow ${!msg.read && !msg.is_read ? "border-sky-200 bg-sky-50/30" : ""}`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-navy-700 flex items-center justify-center text-white text-sm font-bold shrink-0 mt-1">{(msg.full_name || msg.name || "م")[0]}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-navy-900">{msg.full_name || msg.name}</h3>
                      {!msg.read && !msg.is_read && <Badge>جديد</Badge>}
                    </div>
                    <p className="font-medium text-sm text-navy-800 mb-1">{msg.subject}</p>
                    <p className="text-sm text-gray-600 mb-2 whitespace-pre-wrap">{msg.message}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      {msg.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{msg.email}</span>}
                      <span className="font-mono">{msg.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <div className="text-xs text-gray-400">{msg.date || (msg.created_at ? new Date(msg.created_at).toLocaleDateString('en-GB') : '')}</div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggleRead(msg.id)} className={`p-2 rounded-lg transition-colors ${msg.read || msg.is_read ? 'text-gray-400 hover:bg-gray-100' : 'text-sky-500 bg-sky-50 hover:bg-sky-100'}`} title={msg.read || msg.is_read ? "تحديد كغير مقروء" : "تحديد كمقروء"}>
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(msg.id)} className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {messages.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <Mail className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">لا توجد رسائل حالياً</p>
          </div>
        )}
      </div>
      )}
    </div>
  );
}
