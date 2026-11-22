"use client";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      {/* Logo area */}
      <div className="mb-8 relative">
        {/* Spinning rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border-4 border-sky-100 border-t-sky-500 animate-spin" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-28 h-28 rounded-full border-4 border-transparent border-b-sky-200 animate-spin"
            style={{ animationDuration: "1.5s", animationDirection: "reverse" }}
          />
        </div>
        {/* Center icon */}
        <div className="w-28 h-28 flex items-center justify-center">
          <span className="text-4xl">🌬️</span>
        </div>
      </div>

      {/* Brand name */}
      <div className="text-center space-y-2">
        <h2
          className="text-2xl font-bold"
          style={{
            backgroundImage: "linear-gradient(135deg, #0ea5e9, #0f1642)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          AlphaBreeze
        </h2>
        {/* Animated dots */}
        <div className="flex items-center justify-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-sky-400"
              style={{
                animation: `bounce 1.2s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
        <p className="text-sm text-gray-400">جاري التحميل...</p>
      </div>

      {/* Progress bar */}
      <div className="mt-8 w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-sky-400 to-sky-600 rounded-full"
          style={{
            animation: "progress 1.5s ease-in-out infinite",
            transformOrigin: "left",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
