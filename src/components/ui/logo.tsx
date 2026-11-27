"use client";

interface LogoProps {
  className?: string;
  size?: number;
  priority?: boolean;
}

/**
 * Official Alpha Breeze Emblem Icon (α-Flask with botanical leaves & B ribbon)
 * Rendered from high-resolution, pixel-perfect transparent master asset.
 */
export function Logo({
  className = "w-10 h-10",
  size,
  priority = false,
}: LogoProps) {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 select-none ${className}`}
      style={style}
    >
      <img
        src="/logo-icon.png"
        alt="Alpha Breeze Logo"
        className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-300"
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  );
}

/**
 * Full Official Alpha Breeze Logo (Emblem + "Alpha Breeze" + "COMMERCIAL AGENCIES")
 * High-resolution transparent PNG.
 */
export function LogoFull({
  className = "h-14",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative inline-flex items-center justify-center flex-shrink-0 select-none ${className}`}>
      <img
        src="/logo.png"
        alt="Alpha Breeze Commercial Agencies"
        className="h-full w-auto object-contain filter drop-shadow-sm"
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  );
}

/**
 * Fallback Vector SVG representation of the official Alpha Breeze emblem
 */
export function LogoSvg({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Alpha Breeze Emblem"
    >
      <defs>
        {/* Main Alpha Loop & Flask Gradient */}
        <linearGradient id="ab-alpha-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00b4d8" />
          <stop offset="40%" stopColor="#0077b6" />
          <stop offset="100%" stopColor="#003566" />
        </linearGradient>

        {/* B Loop Gradient */}
        <linearGradient id="ab-b-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00488f" />
          <stop offset="60%" stopColor="#0077b6" />
          <stop offset="100%" stopColor="#00b4d8" />
        </linearGradient>

        {/* Botanical Leaves Gradient */}
        <linearGradient id="ab-leaf-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00509d" />
          <stop offset="100%" stopColor="#0077b6" />
        </linearGradient>

        {/* Laboratory Liquid inside Flask */}
        <linearGradient id="ab-liquid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#003566" />
          <stop offset="100%" stopColor="#023e8a" />
        </linearGradient>
      </defs>

      {/* 1. Botanical Leaves Sprouting from the Flask Neck */}
      {/* Primary Leaf (Left) */}
      <path
        d="M41 33 C33 22 34 8 41 2 C48 8 47 22 41 33 Z"
        fill="url(#ab-leaf-grad)"
      />
      {/* Secondary Leaf (Right) */}
      <path
        d="M42 28 C47 22 51 15 48 11 C43 14 41 22 42 28 Z"
        fill="url(#ab-leaf-grad)"
      />

      {/* 2. Liquid inside the Flask Vessel */}
      <path
        d="M30 48 Q37 53 44 48 Q47 54 44 57 C37 62 28 58 30 48 Z"
        fill="url(#ab-liquid-grad)"
        opacity="0.95"
      />

      {/* 3. Alpha Flask Loop (Left) */}
      <path
        d="M42 35 C30 35 23 44 23 53 C23 63 31 71 41 71 C49 71 56 65 62 55 L74 38 C75 36 78 35 81 35 C88 35 93 40 93 46 C93 51 89 54 84 55 C90 56 94 60 94 67 C94 74 88 80 80 80 C74 80 68 76 64 71 L60 66 C53 74 46 79 37 79 C22 79 13 67 13 52 C13 37 25 25 41 25 L43 25 L43 35 Z"
        fill="url(#ab-alpha-grad)"
      />

      {/* 4. Bold 'B' glyph integration */}
      <path
        d="M60 35 L78 35 C85 35 90 39 90 45 C90 50 86 54 80 55 C88 56 92 61 92 67 C92 74 86 79 78 79 L60 79 Z"
        fill="url(#ab-b-grad)"
      />
    </svg>
  );
}

export default Logo;
