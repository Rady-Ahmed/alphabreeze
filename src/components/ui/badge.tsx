import * as React from "react";
import { cn } from "@/lib/utils";

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "secondary" | "destructive" | "outline" | "success";
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-sky-100 text-sky-700 border-sky-200",
    secondary: "bg-navy-100 text-navy-700 border-navy-200",
    destructive: "bg-red-100 text-red-700 border-red-200",
    outline: "bg-transparent text-gray-700 border-gray-300",
    success: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

export { Badge };
