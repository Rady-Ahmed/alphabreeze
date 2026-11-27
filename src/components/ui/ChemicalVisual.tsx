"use client";

import { useState } from "react";

// ── Realistic Photography Database for 50+ Specific Chemicals ───
const SPECIFIC_PHOTOS: Record<string, string> = {
  // Local high-res assets
  mpg: "/images/products/mpg.jpg",
  "propylene-glycol": "/images/products/mpg.jpg",
  "d-panthenol": "/images/products/d-panthenol.jpg",
  ipm: "/images/products/ipm.jpg",
  "isopropyl-myristate": "/images/products/ipm.jpg",
  "lanette-16": "/images/products/lanette-16.jpg",
  "cetyl-alcohol": "/images/products/lanette-16.jpg",
  lanolin: "/images/products/lanolin.jpg",
  "stearic-acid": "/images/products/stearic-acid.jpg",
  "vitamin-e": "/images/products/vitamin-e.jpg",
  tocopherol: "/images/products/vitamin-e.jpg",

  // Specific botanical oils & extracts
  argan: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80",
  jojoba: "https://images.unsplash.com/photo-1608181831688-8e3fc5bab4cf?w=800&q=80",
  "tea-tree": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
  rosemary: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&q=80",
  lavender: "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?w=800&q=80",
  almond: "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?w=800&q=80",
  coconut: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800&q=80",
  castor: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&q=80",
  chamomile: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&q=80",
  "black-seed": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80",
  olive: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80",
  avocado: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&q=80",
  sesame: "https://images.unsplash.com/photo-1596040033282-e31464c78440?w=800&q=80",
  aloe: "https://images.unsplash.com/photo-1567332635059-408e08d6d539?w=800&q=80",
  rose: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
  mint: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=800&q=80",
  peppermint: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=800&q=80",

  // Specific powders, crystals & active chemicals
  salicylic: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80",
  menthol: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80",
  urea: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
  zinc: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=800&q=80",
  titanium: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=800&q=80",
  carbopol: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
  glycerin: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
  hyaluronic: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80",
  niacinamide: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
  btms: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80",
  wax: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80",
  preservative: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80",
  phenoxyethanol: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80",

  // Colors & Shimmering Mica
  mica: "https://images.unsplash.com/photo-1550159930-40066082a4fc?w=800&q=80",
  color: "https://images.unsplash.com/photo-1550159930-40066082a4fc?w=800&q=80",
  pigment: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80",

  // Fragrances & Scents
  fragrance: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80",
  perfume: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80",
  oud: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80",

  // Flavors
  flavor: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
};

// Chemical state color palettes & 3D styling
const CHEMICAL_STATES: Record<string, { label: string; badge: string; gradient: string; glow: string; formula: string }> = {
  liquid: {
    label: "سائل معملي",
    badge: "bg-cyan-500/20 text-cyan-300 border-cyan-400/30",
    gradient: "from-cyan-950 via-[#0a2347] to-[#071329]",
    glow: "rgba(34, 211, 238, 0.4)",
    formula: "C₃H₈O₂ • Liquid",
  },
  powder: {
    label: "بودرة نقية",
    badge: "bg-sky-500/20 text-sky-300 border-sky-400/30",
    gradient: "from-[#0f1d3a] via-[#162a52] to-[#091124]",
    glow: "rgba(56, 189, 248, 0.4)",
    formula: "99.8% Crystalline",
  },
  oil: {
    label: "زيت نقي 100%",
    badge: "bg-amber-500/20 text-amber-300 border-amber-400/30",
    gradient: "from-[#2b1f0c] via-[#3a2c14] to-[#120d04]",
    glow: "rgba(251, 191, 36, 0.4)",
    formula: "Botanical Lipid",
  },
  crystal: {
    label: "بلورات نقية",
    badge: "bg-teal-500/20 text-teal-300 border-teal-400/30",
    gradient: "from-[#082424] via-[#0d3636] to-[#041212]",
    glow: "rgba(45, 212, 191, 0.4)",
    formula: "USP / Pharma Grade",
  },
  wax: {
    label: "شمع صناعي",
    badge: "bg-orange-500/20 text-orange-300 border-orange-400/30",
    gradient: "from-[#29170a] via-[#3d2412] to-[#140b05]",
    glow: "rgba(251, 146, 60, 0.4)",
    formula: "Polymer / Ester",
  },
  mica: {
    label: "مايكا برّاقة",
    badge: "bg-purple-500/20 text-purple-300 border-purple-400/30",
    gradient: "from-[#240e34] via-[#36154d] to-[#100617]",
    glow: "rgba(192, 132, 252, 0.4)",
    formula: "Pearlescent Pigment",
  },
};

export function resolveProductPhoto(product: any): string | null {
  if (!product) return null;

  // 1. Explicit database image if available and not dummy
  if (product.og_image_url && !product.og_image_url.includes("placehold.co")) {
    return product.og_image_url;
  }

  // 2. Normalize searchable text: name_ar, name_en, slug, category
  const text = `${product.name_ar || ""} ${product.name_en || ""} ${product.slug || ""} ${product.category || ""}`.toLowerCase();

  // 3. Match against specific chemical keywords
  if (text.includes("بروبيلين") || text.includes("mpg") || text.includes("propylene")) return SPECIFIC_PHOTOS.mpg;
  if (text.includes("بانثينول") || text.includes("panthenol")) return SPECIFIC_PHOTOS["d-panthenol"];
  if (text.includes("ايزوبروبيل") || text.includes("ipm") || text.includes("myristate")) return SPECIFIC_PHOTOS.ipm;
  if (text.includes("لانت 16") || text.includes("سيتيل") || text.includes("cetyl") || text.includes("lanette 16")) return SPECIFIC_PHOTOS["lanette-16"];
  if (text.includes("لانولين") || text.includes("lanolin")) return SPECIFIC_PHOTOS.lanolin;
  if (text.includes("استيارك") || text.includes("شمع") || text.includes("stearic")) return SPECIFIC_PHOTOS["stearic-acid"];
  if (text.includes("فيتامين e") || text.includes("فيتامين هـ") || text.includes("tocopherol")) return SPECIFIC_PHOTOS["vitamin-e"];

  // Botanical oils & extracts
  if (text.includes("أرجان") || text.includes("argan")) return SPECIFIC_PHOTOS.argan;
  if (text.includes("جوجوبا") || text.includes("jojoba")) return SPECIFIC_PHOTOS.jojoba;
  if (text.includes("شجرة الشاي") || text.includes("tea tree")) return SPECIFIC_PHOTOS["tea-tree"];
  if (text.includes("روزماري") || text.includes("إكليل") || text.includes("rosemary")) return SPECIFIC_PHOTOS.rosemary;
  if (text.includes("لافندر") || text.includes("lavender") || text.includes("خزامى")) return SPECIFIC_PHOTOS.lavender;
  if (text.includes("لوز") || text.includes("almond")) return SPECIFIC_PHOTOS.almond;
  if (text.includes("جوز هند") || text.includes("coconut")) return SPECIFIC_PHOTOS.coconut;
  if (text.includes("خروع") || text.includes("castor")) return SPECIFIC_PHOTOS.castor;
  if (text.includes("بابونج") || text.includes("كاموميل") || text.includes("chamomile")) return SPECIFIC_PHOTOS.chamomile;
  if (text.includes("حبة البركة") || text.includes("black seed")) return SPECIFIC_PHOTOS["black-seed"];
  if (text.includes("زيتون") || text.includes("olive")) return SPECIFIC_PHOTOS.olive;
  if (text.includes("أفوكادو") || text.includes("avocado")) return SPECIFIC_PHOTOS.avocado;
  if (text.includes("سمسم") || text.includes("sesame")) return SPECIFIC_PHOTOS.sesame;
  if (text.includes("صبار") || text.includes("ألوفيرا") || text.includes("aloe")) return SPECIFIC_PHOTOS.aloe;
  if (text.includes("ورد") || text.includes("rose")) return SPECIFIC_PHOTOS.rose;
  if (text.includes("نعناع") || text.includes("mint") || text.includes("peppermint")) return SPECIFIC_PHOTOS.mint;

  // Active chemicals & powders
  if (text.includes("سالسيلك") || text.includes("salicylic")) return SPECIFIC_PHOTOS.salicylic;
  if (text.includes("منتول") || text.includes("menthol")) return SPECIFIC_PHOTOS.menthol;
  if (text.includes("يوريا") || text.includes("urea")) return SPECIFIC_PHOTOS.urea;
  if (text.includes("زنك") || text.includes("zinc")) return SPECIFIC_PHOTOS.zinc;
  if (text.includes("تيتانيوم") || text.includes("titanium")) return SPECIFIC_PHOTOS.titanium;
  if (text.includes("كربابول") || text.includes("carbopol")) return SPECIFIC_PHOTOS.carbopol;
  if (text.includes("جليسرين") || text.includes("glycerin")) return SPECIFIC_PHOTOS.glycerin;
  if (text.includes("هيالورونيك") || text.includes("hyaluronic")) return SPECIFIC_PHOTOS.hyaluronic;
  if (text.includes("نياسيناميد") || text.includes("niacinamide")) return SPECIFIC_PHOTOS.niacinamide;
  if (text.includes("btms")) return SPECIFIC_PHOTOS.btms;

  // Colors & Mica
  if (text.includes("مايكا") || text.includes("mica") || text.includes("لون") || text.includes("pigment")) return SPECIFIC_PHOTOS.mica;

  // Fragrances & Flavors
  if (text.includes("عطر") || text.includes("زيت عطري") || text.includes("fragrance")) return SPECIFIC_PHOTOS.fragrance;
  if (text.includes("عود") || text.includes("oud")) return SPECIFIC_PHOTOS.oud;
  if (text.includes("نكهة") || text.includes("طعم") || text.includes("flavor")) return SPECIFIC_PHOTOS.flavor;

  // Fallback to category photo if available
  const cat = product.category_slug || product.technical_specs?.category_slug || "";
  if (cat.includes("oils")) return SPECIFIC_PHOTOS.jojoba;
  if (cat.includes("powders")) return SPECIFIC_PHOTOS.salicylic;
  if (cat.includes("fragrances")) return SPECIFIC_PHOTOS.fragrance;
  if (cat.includes("colors")) return SPECIFIC_PHOTOS.mica;
  if (cat.includes("flavors")) return SPECIFIC_PHOTOS.flavor;

  return null;
}

export function detectChemicalState(product: any): keyof typeof CHEMICAL_STATES {
  const text = `${product?.name_ar || ""} ${product?.name_en || ""} ${product?.product_form || ""} ${product?.category || ""}`.toLowerCase();
  if (text.includes("مايكا") || text.includes("mica") || text.includes("لون") || text.includes("pigment")) return "mica";
  if (text.includes("زيت") || text.includes("oil") || text.includes("خلاصة")) return "oil";
  if (text.includes("شمع") || text.includes("wax") || text.includes("بوليمر")) return "wax";
  if (text.includes("كريستال") || text.includes("منتول") || text.includes("crystal")) return "crystal";
  if (text.includes("سائل") || text.includes("liquid") || text.includes("مذيب") || text.includes("جلايكول") || text.includes("ماء")) return "liquid";
  return "powder";
}

interface ChemicalVisualProps {
  product: any;
  className?: string;
  showBadge?: boolean;
}

export default function ChemicalVisual({
  product,
  className = "w-full h-full",
  showBadge = true,
}: ChemicalVisualProps) {
  const [imgError, setImgError] = useState(false);
  const photoUrl = resolveProductPhoto(product);
  const stateKey = detectChemicalState(product);
  const stateInfo = CHEMICAL_STATES[stateKey] || CHEMICAL_STATES.powder;
  const nameAr = product?.name_ar || product?.name || "مادة كيميائية";
  const casNumber = product?.cas_number || product?.technical_specs?.cas_number;

  // If realistic photo is available and hasn't failed to load:
  if (photoUrl && !imgError) {
    return (
      <div className={`relative overflow-hidden bg-slate-900 group ${className}`}>
        <img
          src={photoUrl}
          alt={nameAr}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          onError={() => setImgError(true)}
        />
        {/* Subtle glass vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070e22]/70 via-transparent to-transparent pointer-events-none" />

        {/* State Badge */}
        {showBadge && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md border shadow-sm ${stateInfo.badge}`}>
              {stateInfo.label}
            </span>
          </div>
        )}

        {/* CAS pill at bottom corner if available */}
        {casNumber && (
          <div className="absolute bottom-2.5 left-2.5 z-10 hidden sm:block">
            <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-cyan-300 border border-cyan-400/20">
              CAS: {casNumber}
            </span>
          </div>
        )}
      </div>
    );
  }

  // ── High-End 3D Chemical Isometric Render Component ──────────────
  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center p-4 bg-gradient-to-br ${stateInfo.gradient} ${className}`}
      style={{
        boxShadow: `inset 0 0 40px ${stateInfo.glow}`,
      }}
    >
      {/* 3D Atmospheric Grid & Glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* State badge */}
      {showBadge && (
        <div className="absolute top-3 right-3 z-10">
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md border shadow-sm ${stateInfo.badge}`}>
            {stateInfo.label}
          </span>
        </div>
      )}

      {/* 3D Laboratory Isometric Chemical Sculpture */}
      <div className="relative flex flex-col items-center justify-center scale-90 sm:scale-100 transition-transform duration-500 group-hover:scale-110">
        
        {/* 3D Glass Flask Sculpture */}
        <div className="relative w-20 h-24 sm:w-24 sm:h-28 flex items-center justify-center">
          
          {/* Ambient 3D Glow Sphere */}
          <div
            className="absolute w-16 h-16 rounded-full blur-xl animate-pulse"
            style={{ backgroundColor: stateInfo.glow }}
          />

          {/* SVG 3D Isometric Chemical Vessel & Molecule */}
          <svg
            viewBox="0 0 100 120"
            className="w-full h-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 3D Hexagonal Molecular Bonds in background */}
            <path
              d="M50 15 L75 30 L75 60 L50 75 L25 60 L25 30 Z"
              stroke="rgba(56, 189, 248, 0.25)"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            <circle cx="50" cy="15" r="2.5" fill="#38bdf8" opacity="0.6" />
            <circle cx="75" cy="30" r="2.5" fill="#38bdf8" opacity="0.6" />
            <circle cx="75" cy="60" r="2.5" fill="#38bdf8" opacity="0.6" />
            <circle cx="50" cy="75" r="2.5" fill="#38bdf8" opacity="0.6" />
            <circle cx="25" cy="60" r="2.5" fill="#38bdf8" opacity="0.6" />
            <circle cx="25" cy="30" r="2.5" fill="#38bdf8" opacity="0.6" />

            {/* 3D Laboratory Conical Flask Body */}
            <path
              d="M42 20 L58 20 L58 35 L78 88 C81 96 75 104 66 104 L34 104 C25 104 19 96 22 88 L42 35 Z"
              fill="url(#glassGradient)"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="1.8"
            />

            {/* 3D Liquid Mass inside Flask */}
            <path
              d="M30 84 L70 84 L76 96 C77 98 75 102 70 102 L30 102 C25 102 23 98 24 96 Z"
              fill="url(#liquidGradient)"
              opacity="0.85"
            />

            {/* 3D Liquid Surface Meniscus */}
            <ellipse cx="50" cy="84" rx="20" ry="3" fill="url(#meniscusGradient)" opacity="0.9" />

            {/* Specular 3D Glass Highlights (Reflections) */}
            <path
              d="M45 23 L45 35 L27 82 C25 87 27 92 30 95"
              stroke="rgba(255, 255, 255, 0.7)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M72 88 L75 96"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Rising Micro-Bubbles / Particles */}
            <circle cx="45" cy="92" r="1.5" fill="#ffffff" opacity="0.8" />
            <circle cx="55" cy="88" r="1.2" fill="#ffffff" opacity="0.9" />
            <circle cx="48" cy="80" r="1" fill="#38bdf8" opacity="0.7" />

            {/* Gradients Definition */}
            <defs>
              <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.25)" />
                <stop offset="50%" stopColor="rgba(34, 211, 238, 0.08)" />
                <stop offset="100%" stopColor="rgba(14, 165, 233, 0.2)" />
              </linearGradient>

              <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>

              <linearGradient id="meniscusGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#67e8f9" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Chemical Technical Badge Under 3D Mesh */}
        <div className="mt-2 text-center">
          <span className="text-[10px] font-mono tracking-wider font-bold text-cyan-300/90 block">
            {stateInfo.formula}
          </span>
        </div>
      </div>

      {/* CAS Pill */}
      {casNumber && (
        <div className="absolute bottom-2.5 left-2.5 z-10 hidden sm:block">
          <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-cyan-300 border border-cyan-400/20">
            CAS: {casNumber}
          </span>
        </div>
      )}
    </div>
  );
}
