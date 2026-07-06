"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Shield, ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";

const defaultUsers = [
  { id: 1, name: "المدير العام", email: "admin@alphabreeze.com", role: "super_admin", active: true, lastLogin: "19/06/2026 10:30" },
  { id: 2, name: "أحمد محمد", email: "ahmed@alphabreeze.com", role: "admin", active: true, lastLogin: "18/06/2026 15:45" },
  { id: 3, name: "سارة أحمد", email: "sara@alphabreeze.com", role: "admin", active: false, lastLogin: "10/06/2026 09:00" },
];

const roleLabels: Record<string, { label: string; color: string }> = {
  super_admin: { label: "مدير أعلى", color: "bg-amber-100 text-amber-700" },
  admin: { label: "مدير", color: "bg-sky-100 text-sky-700" },
};

export default function UsersPage() {
  const [users, setUsers] = useState(defaultUsers);
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "admin" });

  useEffect(() => {
    try {
      const savedUsers = localStorage.getItem("alphabreeze_users");
      if (savedUsers) {
        setUsers(JSON.parse(savedUsers));
      } else {
        localStorage.setItem("alphabreeze_users", JSON.stringify(defaultUsers));
      }
    } catch (e) {}
    setMounted(true);
  }, []);

  const saveUsers = (newData: any[]) => {
    setUsers(newData);
    localStorage.setItem("alphabreeze_users", JSON.stringify(newData));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) {
      toast.error("يرجى إدخال الاسم والبريد الإلكتروني");
      return;
    }
    const newData = [
      ...users,
      {
        id: Date.now(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        active: true,
        lastLogin: "لم يسجل الدخول"
      }
    ];
    saveUsers(newData);
    setNewUser({ name: "", email: "", role: "admin" });
    setIsModalOpen(false);
    toast.success("تمت إضافة المستخدم بنجاح");
  };

  const handleDelete = (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المستخدم؟")) {
      const user = users.find(u => u.id === id);
      if (user?.role === "super_admin") {
        toast.error("لا يمكن حذف المدير الأعلى");
        return;
      }
      saveUsers(users.filter(u => u.id !== id));
      toast.success("تم الحذف بنجاح");
    }
  };

  const toggleActive = (id: number) => {
    const user = users.find(u => u.id === id);
    if (user?.role === "super_admin") {
      toast.error("لا يمكن تعطيل حساب المدير الأعلى");
      return;
    }
    saveUsers(users.map(u => u.id === id ? { ...u, active: !u.active } : u));
    toast.success("تم تغيير حالة المستخدم");
  };

  if (!mounted) return null;

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">إدارة المستخدمين</h1>
          <p className="text-gray-500 text-sm">{users.length} مستخدم</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}><Plus className="w-4 h-4" />إضافة مستخدم</Button>
      </div>
      <div className="grid gap-4">
        {users.map((u) => (
          <Card key={u.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-navy-900 flex items-center justify-center text-white font-bold text-lg">
                  {u.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-navy-900">{u.name}</h3>
                    {u.role === "super_admin" && <ShieldCheck className="w-4 h-4 text-amber-500" />}
                  </div>
                  <p className="text-sm text-gray-500">{u.email}</p>
                  <p className="text-xs text-gray-400 mt-1">آخر دخول: {u.lastLogin}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${roleLabels[u.role]?.color || roleLabels.admin.color}`}>
                  {roleLabels[u.role]?.label || u.role}
                </span>
                <button onClick={() => toggleActive(u.id)}>
                  <Badge variant={u.active ? "success" : "destructive"}>{u.active ? "نشط" : "معطل"}</Badge>
                </button>
                <div className="flex gap-1 ml-2">
                  <button onClick={() => handleDelete(u.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md w-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold">إضافة مستخدم جديد</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <CardContent className="p-6">
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <Label>الاسم</Label>
                  <Input value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} className="mt-1" required />
                </div>
                <div>
                  <Label>البريد الإلكتروني</Label>
                  <Input type="email" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} className="mt-1" required />
                </div>
                <div>
                  <Label>الدور الصلاحية</Label>
                  <select
                    className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border"
                    value={newUser.role}
                    onChange={e => setNewUser({...newUser, role: e.target.value})}
                  >
                    <option value="admin">مدير</option>
                    <option value="super_admin">مدير أعلى</option>
                  </select>
                </div>
                <Button type="submit" className="w-full">إضافة المستخدم</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
