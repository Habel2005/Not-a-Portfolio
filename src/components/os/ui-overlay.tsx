
"use client";

import { useEffect, useState } from "react";
import { Info, Cpu, Layers, Maximize, Activity } from "lucide-react";
import gsap from "gsap";

export function UIOverlay() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    
    // Entrance animation
    gsap.from(".os-element", {
      opacity: 0,
      y: 20,
      duration: 1.5,
      stagger: 0.1,
      ease: "expo.out",
    });

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 p-8 flex flex-col justify-between mix-blend-difference">
      {/* Top Header */}
      <div className="flex justify-between items-start os-element">
        <div className="space-y-1">
          <h1 className="font-headline font-bold text-4xl tracking-tighter text-acid-green kinetic-text">
            VOID ARCHIVE OS <span className="text-xs align-top font-code opacity-50 font-normal">V2.5.0-ALPHA</span>
          </h1>
          <div className="flex gap-4 font-code text-[10px] uppercase tracking-widest opacity-60">
            <span className="flex items-center gap-1"><Cpu className="w-3 h-3" /> SYSTEM_ACTIVE</span>
            <span className="flex items-center gap-1"><Layers className="w-3 h-3" /> SHARD_MATRIX_INIT</span>
            <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> LATENCY: 12MS</span>
          </div>
        </div>
        <div className="font-code text-right text-sm">
          <div className="text-acid-green">{time}</div>
          <div className="opacity-40 text-[10px] uppercase tracking-[0.2em]">CORE_SYNC_ESTABLISHED</div>
        </div>
      </div>

      {/* Main Kinetic Typography Landmark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none os-element">
        <div className="overflow-hidden">
          <h2 className="text-[15vw] font-headline font-bold leading-none tracking-tighter italic opacity-5 select-none uppercase">
            ARCHITECTURAL VOID
          </h2>
        </div>
      </div>

      {/* Bottom Interface */}
      <div className="flex justify-between items-end os-element">
        <div className="w-64 space-y-4">
          <p className="font-body text-xs leading-relaxed opacity-60 uppercase tracking-tighter">
            Experimental spatial force navigation enabled. Navigate through the infinite zoom hierarchy using spatial momentum. Reject traditional web logic.
          </p>
          <div className="h-px bg-white/20 w-full relative">
            <div className="absolute top-0 left-0 h-full bg-acid-green w-1/3 animate-pulse" />
          </div>
        </div>
        
        <div className="flex gap-12 items-end">
          <div className="text-[10px] font-code text-right space-y-1 opacity-50 uppercase tracking-widest">
            <div>PROJECT_001: LIQUID_CHROME</div>
            <div>PROJECT_002: BRUTALIST_GRID</div>
            <div>PROJECT_003: NEURAL_FABRIC</div>
          </div>
          <button className="pointer-events-auto group">
            <div className="p-4 border border-white/10 group-hover:border-acid-green group-hover:bg-acid-green group-hover:text-void-black transition-all duration-500 rounded-full">
              <Maximize className="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>

      {/* Side HUD Elements */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-8 items-center os-element opacity-40">
        <div className="h-32 w-px bg-white/20" />
        <div className="rotate-90 origin-center whitespace-nowrap font-code text-[10px] tracking-[0.5em] uppercase">
          SPATIAL_INDEX_011
        </div>
        <div className="h-32 w-px bg-white/20" />
      </div>

      <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 os-element">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-1 h-1 bg-white/40 rounded-full" />
        ))}
        <div className="w-1 h-8 bg-acid-green" />
        {[1, 2].map((i) => (
          <div key={i} className="w-1 h-1 bg-white/40 rounded-full" />
        ))}
      </div>
    </div>
  );
}
