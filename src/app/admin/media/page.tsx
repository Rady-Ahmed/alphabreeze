"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, ImageIcon, Trash2, Grid, List } from "lucide-react";
import { toast } from "sonner";

const folders = ["الكل", "منتجات", "مقالات", "خدمات", "بنرات", "عام"];

const defaultMediaItems = [
  { id: 1, name: "shea-butter.jpg", type: "image", folder: "منتجات", size: "245 KB" },
  { id: 2, name: "argan-oil.jpg", type: "image", folder: "منتجات", size: "180 KB" },
  { id: 3, name: "hero-banner.jpg", type: "image", folder: "بنرات", size: "890 KB" },
  { id: 4, name: "cosmetics-article.jpg", type: "image", folder: "مقالات", size: "320 KB" },
  { id: 5, name: "private-label.jpg", type: "image", folder: "خدمات", size: "450 KB" },
  { id: 6, name: "logo.png", type: "image", folder: "عام", size: "45 KB" },
  { id: 7, name: "product-3.jpg", type: "image", folder: "منتجات", size: "290 KB" },
  { id: 8, name: "promo-banner.jpg", type: "image", folder: "بنرات", size: "720 KB" },
];

export default function MediaPage() {
  const [selectedFolder, setSelectedFolder] = useState("الكل");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mediaItems, setMediaItems] = useState(defaultMediaItems);
  const [mounted, setMounted] = useState(false);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMedia, setNewMedia] = useState({ name: "", folder: "عام", size: "0 KB" });

  useEffect(() => {
    try {
      const savedMedia = localStorage.getItem("alphabreeze_media");
      if (savedMedia) {
        setMediaItems(JSON.parse(savedMedia));
      } else {
        localStorage.setItem("alphabreeze_media", JSON.stringify(defaultMediaItems));
      }
    } catch (e) {}
    setMounted(true);
  }, []);

  const saveMedia = (newData: any[]) => {
    setMediaItems(newData);
    localStorage.setItem("alphabreeze_media", JSON.stringify(newData));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewMedia({
        ...newMedia,
        name: file.name,
        size: (file.size / 1024).toFixed(1) + " KB"
      });
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedia.name) {
      toast.error("يرجى اختيار ملف");
      return;
    }
    const newItem = {
      id: Date.now(),
      name: newMedia.name,
      type: "image",
      folder: newMedia.folder,
      size: newMedia.size
    };
    saveMedia([newItem, ...mediaItems]);
    setShowAddModal(false);
    setNewMedia({ name: "", folder: "عام", size: "0 KB" });
    toast.success("تم إضافة الملف بنجاح");
  };

  const handleDelete = (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الملف؟")) {
      saveMedia(mediaItems.filter(m => m.id !== id));
      toast.success("تم الحذف بنجاح");
    }
  };

  if (!mounted) return null;

  const filtered = selectedFolder === "الكل" ? mediaItems : mediaItems.filter((m) => m.folder === selectedFolder);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-navy-900">مكتبة الوسائط</h1>
          <p className="text-gray-500 text-xs sm:text-sm">{mediaItems.length} ملف</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="gap-2 w-full sm:w-auto"><Upload className="w-4 h-4" /> رفع ملفات</Button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full flex-1 no-scrollbar items-center">
          {folders.map((f) => (
            <button key={f} onClick={() => setSelectedFolder(f)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all shrink-0 ${selectedFolder === f ? "bg-sky-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >{f}</button>
          ))}
        </div>
        <div className="flex gap-1 shrink-0 self-end sm:self-auto">
          <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-sky-100 text-sky-600" : "text-gray-400"}`}><Grid className="w-4 h-4" /></button>
          <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg ${viewMode === "list" ? "bg-sky-100 text-sky-600" : "text-gray-400"}`}><List className="w-4 h-4" /></button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="group relative bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
              <div className="aspect-square bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 sm:w-10 sm:h-10 text-sky-200" />
              </div>
              <div className="p-2 sm:p-3">
                <p className="text-[10px] sm:text-xs font-medium text-navy-900 truncate" title={item.name}>{item.name}</p>
                <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5">{item.size}</p>
              </div>
              <div className="absolute top-2 left-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }} className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg"><Trash2 className="w-3 h-3" /></button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              <ImageIcon className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm">لا توجد ملفات في هذا المجلد</p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden w-full max-w-full">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-right py-3 px-4 font-medium text-gray-500 whitespace-nowrap">الملف</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500 whitespace-nowrap">المجلد</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500 whitespace-nowrap">الحجم</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500 whitespace-nowrap">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 px-4 flex items-center gap-2 max-w-[200px] sm:max-w-none">
                      <ImageIcon className="w-4 h-4 text-sky-400 shrink-0" />
                      <span className="truncate block w-full">{item.name}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 whitespace-nowrap">{item.folder}</td>
                    <td className="py-3 px-4 text-gray-500 whitespace-nowrap">{item.size}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">لا توجد ملفات في هذا المجلد</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Media Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">إضافة ملف جديد</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="text-sm font-medium">اختيار الملف</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  required 
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100" 
                />
              </div>
              {newMedia.name && (
                <div>
                  <label className="text-sm font-medium">اسم الملف</label>
                  <input 
                    type="text" 
                    value={newMedia.name} 
                    onChange={e => setNewMedia({...newMedia, name: e.target.value})} 
                    className="mt-1 w-full h-10 rounded-lg border border-gray-200 px-3 text-sm bg-gray-50 focus:bg-white focus:border-sky-500 outline-none transition-colors" 
                  />
                </div>
              )}
              <div>
                <label className="text-sm font-medium">المجلد (التصنيف)</label>
                <select 
                  value={newMedia.folder} 
                  onChange={e => setNewMedia({...newMedia, folder: e.target.value})}
                  className="mt-1 w-full h-10 rounded-lg border border-gray-200 px-3 text-sm bg-gray-50 focus:bg-white focus:border-sky-500 outline-none transition-colors"
                >
                  {folders.filter(f => f !== "الكل").map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
              <Button type="submit" className="w-full">رفع الملف</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
