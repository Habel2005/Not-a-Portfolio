
"use client";

import { useEffect, useState } from "react";
import { GLViewport } from "./gl-viewport";
import { UIOverlay } from "./ui-overlay";
import { SystemCursor } from "./system-cursor";
import gsap from "gsap";

export function SystemShell() {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    // Simulated system boot
    const timer = setTimeout(() => {
      gsap.to(".boot-screen", {
        opacity: 0,
        scale: 1.1,
        filter: "blur(20px)",
        duration: 1.5,
        ease: "expo.inOut",
        onComplete: () => setIsBooting(false),
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative w-screen h-screen bg-void-black overflow-hidden select-none">
      {/* Background Spatial Layer */}
      <GLViewport />

      {/* UI Interaction Layer */}
      <UIOverlay />

      {/* Precision Cursor */}
      <SystemCursor />

      {/* OS Boot Sequence */}
      {isBooting && (
        <div className="boot-screen fixed inset-0 z-[10000] bg-void-black flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-2">
              <div className="flex justify-between font-code text-[10px] text-acid-green opacity-80 uppercase tracking-widest">
                <span>Initializing_Kernel...</span>
                <span>84%</span>
              </div>
              <div className="h-[1px] w-full bg-white/10 overflow-hidden">
                <div className="h-full bg-acid-green animate-[progress_2s_ease-in-out_infinite]" style={{ width: '40%' }} />
              </div>
            </div>
            <div className="space-y-1 font-code text-[8px] text-white/30 uppercase leading-tight tracking-tighter">
              <div>> CHECKING_SPATIAL_FORCE_FIELDS... OK</div>
              <div>> MOUNTING_GEOMETRIC_SHARD_MATRIX... OK</div>
              <div>> SYNCHRONIZING_FLUID_DISPLACEMENT_SHADERS... OK</div>
              <div>> ESTABLISHING_VOID_CONNECTION... OK</div>
            </div>
            <div className="text-center pt-12">
              <h1 className="text-4xl font-headline font-bold text-acid-green tracking-tighter animate-pulse">VOID ARCHIVE OS</h1>
            </div>
          </div>
        </div>
      )}

      {/* Global Vignette and Noise */}
      <div className="fixed inset-0 pointer-events-none z-[50] shadow-[inset_0_0_200px_rgba(0,0,0,0.9)] opacity-50" />
      <div className="fixed inset-0 pointer-events-none z-[51] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </main>
  );
}

// Inline styles for boot animation
const styles = `
  @keyframes progress {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(300%); }
  }
`;
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
