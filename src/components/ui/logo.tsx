export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="ab-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0284c7" /> {/* dark blue */}
          <stop offset="50%" stopColor="#0ea5e9" /> {/* mid blue */}
          <stop offset="100%" stopColor="#38bdf8" /> {/* light blue */}
        </linearGradient>
        <linearGradient id="leaf-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" /> {/* cyan */}
          <stop offset="100%" stopColor="#34d399" /> {/* green */}
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g filter="url(#glow)">
        {/* Central Stem (Shared between alpha and B) */}
        <path d="M 48 30 L 48 70" stroke="url(#ab-grad)" strokeWidth="12" strokeLinecap="round" />

        {/* Alpha Left Loop */}
        <ellipse cx="33" cy="50" rx="14" ry="19" fill="none" stroke="url(#ab-grad)" strokeWidth="11" />

        {/* Alpha Bottom Tail crossing over */}
        <path d="M 28 68 Q 48 85 56 68" fill="none" stroke="url(#ab-grad)" strokeWidth="9" strokeLinecap="round" />

        {/* B Top Bowl */}
        <path d="M 48 30 H 63 C 76 30, 76 50, 63 50 H 48" fill="none" stroke="url(#ab-grad)" strokeWidth="11" strokeLinejoin="round" />

        {/* B Bottom Bowl */}
        <path d="M 48 50 H 66 C 82 50, 82 72, 66 72 H 48" fill="none" stroke="url(#ab-grad)" strokeWidth="12" strokeLinejoin="round" />
      </g>

      {/* Main Leaf (Left/Up) */}
      <path d="M 47 27 C 39 12 47 0 57 2 C 57 12 51 20 47 27 Z" fill="url(#leaf-grad)" filter="url(#glow)" />

      {/* Secondary Leaf (Right) */}
      <path d="M 51 22 C 59 16 65 10 64 6 C 57 8 53 15 51 22 Z" fill="url(#leaf-grad)" filter="url(#glow)" />
    </svg>
  );
}
