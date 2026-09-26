"use client";

import { memo } from "react";
import { cn } from "@/lib/utils/cn";

export interface TravelShapesBackgroundProps {
  variant?: "hero" | "full" | "minimal";
  className?: string;
}

export const TravelShapesBackground = memo(function TravelShapesBackground({
  variant = "hero",
  className,
}: TravelShapesBackgroundProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden select-none",
        variant === "hero" ? "z-0" : "z-0",
        className,
      )}
      aria-hidden="true"
    >
      {/* 2D Organic Blob 1: Tropical Turquoise (Bahamas Beach #57B1A8) */}
      <div
        className="shape-float-slow absolute -left-16 -top-20 size-72 sm:size-96 rounded-[58%_42%_66%_34%/44%_56%_44%_56%] blur-3xl"
        style={{
          backgroundColor: "#57B1A8",
          opacity: 0.13,
        }}
      />

      {/* 2D Organic Blob 2: Warm Apricot / Peach (Beach Umbrella #FFD094) */}
      <div
        className="shape-float-reverse absolute -right-16 top-6 size-64 sm:size-88 rounded-[42%_58%_35%_65%/60%_38%_62%_40%] blur-3xl"
        style={{
          backgroundColor: "#FFD094",
          opacity: 0.18,
        }}
      />

      {/* 2D Organic Blob 3: Baby Lavender (#F9D4F8) - Anchored to bottom-left outer margin */}
      <div
        className="shape-float-subtle absolute -left-16 bottom-0 size-60 sm:size-76 rounded-[65%_35%_45%_55%/40%_65%_35%_60%] blur-3xl"
        style={{
          backgroundColor: "#F9D4F8",
          opacity: 0.14,
        }}
      />

      {/* 2D Organic Blob 4: Mint No Chip (#DDF2B8) - Anchored to bottom-right outer margin */}
      <div
        className="shape-float-slow absolute -right-16 bottom-4 size-56 sm:size-72 rounded-[50%_50%_30%_70%/60%_40%_60%_40%] blur-3xl"
        style={{
          backgroundColor: "#DDF2B8",
          opacity: 0.16,
        }}
      />

      {/* 2D Geometric Element: Rotating 12-point Sunburst / Compass Rose - Placed in right margin on wide screens */}
      <div className="shape-spin-slow absolute right-8 top-14 hidden xl:block opacity-35">
        <svg
          width="120"
          height="120"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-highlight"
        >
          {/* Inner ring */}
          <circle cx="50" cy="50" r="16" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          <circle cx="50" cy="50" r="6" fill="#F49625" opacity="0.8" />
          
          {/* 12 Sunburst Rays */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="50"
              y1="22"
              x2="50"
              y2="10"
              stroke="#F49625"
              strokeWidth={deg % 90 === 0 ? "2.5" : "1.5"}
              strokeLinecap="round"
              transform={`rotate(${deg} 50 50)`}
            />
          ))}
        </svg>
      </div>

      {/* 2D Geometric Element: Retro Travel Stamp & Ticket Stub Accent - Placed in left margin on wide screens */}
      <div className="shape-float-reverse absolute left-8 top-24 hidden xl:flex flex-col items-center justify-center opacity-65">
        <div className="relative rounded-xl border border-dashed border-[#EF6545]/40 bg-[#FFFDF9]/60 px-3.5 py-2 shadow-xs backdrop-blur-[2px]">
          {/* Notches on left & right */}
          <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 size-3 rounded-full bg-[#FAF7F2] border-r border-[#EF6545]/40" />
          <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 size-3 rounded-full bg-[#FAF7F2] border-l border-[#EF6545]/40" />
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#EF6545] uppercase">
            LOCAL · PASSPORT
          </span>
          <div className="mt-0.5 flex items-center justify-between text-[9px] text-[#422F0E]/70">
            <span>2D EXP</span>
            <span className="font-mono">★ NO. 2906</span>
          </div>
        </div>
      </div>

      {/* 2D Geometric Archway & Topographic Wave Contours */}
      <svg
        className="absolute inset-0 h-full w-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        preserveAspectRatio="none"
      >
        {/* Soft topographic elevation curves */}
        <path
          d="M-50,180 Q320,60 700,200 T1500,120"
          stroke="#037F71"
          strokeWidth="1.2"
          strokeDasharray="6 6"
          opacity="0.3"
        />
        <path
          d="M-50,220 Q400,90 850,240 T1600,150"
          stroke="#57B1A8"
          strokeWidth="1"
          opacity="0.25"
        />
        <path
          d="M-50,260 Q480,120 950,270 T1700,180"
          stroke="#FFD094"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.35"
        />

        {/* 2D Architectural Arch Outline (Right side) */}
        <g transform="translate(1080, 20)" opacity="0.3" className="hidden lg:block">
          <path
            d="M0,260 L0,70 A55,55 0 0,1 110,70 L110,260"
            stroke="#037F71"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M12,260 L12,74 A43,43 0 0,1 98,74 L98,260"
            stroke="#57B1A8"
            strokeWidth="1"
            strokeDasharray="3 3"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
});
