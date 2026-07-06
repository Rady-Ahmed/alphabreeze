import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-sky-100 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-sky-500 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="text-gray-500 font-medium animate-pulse">جاري التحميل...</p>
    </div>
  );
}
