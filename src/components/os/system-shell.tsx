
"use client";

import { useEffect, useState } from "react";
import { GLViewport } from "./gl-viewport";
import { UIOverlay } from "./ui-overlay";
import { SystemCursor } from "./system-cursor";
import gsap from "gsap";

export function SystemShell() {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    // Simulated system boot timing to match the typographic animation
    const timer = setTimeout(() => {
      gsap.to(".boot-screen", {
        opacity: 0,
        scale: 1.05,
        filter: "blur(40px)",
        duration: 2,
        ease: "expo.inOut",
        onComplete: () => setIsBooting(false),
      });
    }, 3500);

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

      {/* OS Boot Sequence - Adapted Typographic Loader */}
      {isBooting && (
        <div className="boot-screen fixed inset-0 z-[10000] bg-void-black flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-2xl space-y-12 flex flex-col items-center">
            
            {/* Adapted SVG Typographic Loader */}
            <div className="habel-loader relative">
              <svg viewBox="0 0 600 160" className="w-full max-w-xl overflow-visible">
                <text 
                  x="50%" 
                  y="50%" 
                  dy=".32em" 
                  textAnchor="middle" 
                  className="text-habel font-headline font-bold text-[120px] uppercase tracking-[-0.05em]"
                >
                  Habel
                </text>
                <text 
                  x="50%" 
                  y="50%" 
                  dy=".32em" 
                  dx="1.8em" 
                  textAnchor="middle" 
                  className="text-dot font-headline font-bold text-[120px] fill-primary"
                >
                  .
                </text>
              </svg>
            </div>

            {/* System Logs */}
            <div className="w-full max-w-md space-y-4">
              <div className="h-[1px] w-full bg-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-primary/40 animate-loader-line w-full" />
              </div>
              <div className="flex justify-between items-center px-1">
                <div className="space-y-1 font-code text-[7px] text-white/20 uppercase leading-tight tracking-widest">
                  <div>&gt; IDENTITY_REVEAL_SEQUENCE... [OK]</div>
                  <div>&gt; VOID_SYNC_INITIATED... [OK]</div>
                  <div>&gt; DEPLOYING_SPATIAL_MATRIX... [OK]</div>
                </div>
                <div className="font-code text-[8px] text-primary animate-pulse opacity-60">
                  SYSTEM_SECURE_V2.5
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Vignette and Noise */}
      <div className="fixed inset-0 pointer-events-none z-[50] shadow-[inset_0_0_200px_rgba(0,0,0,0.9)] opacity-50" />
      <div className="fixed inset-0 pointer-events-none z-[51] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <style jsx global>{`
        .text-habel {
          stroke: rgba(255, 255, 255, 0.2);
          stroke-width: 1px;
          fill: transparent;
          animation: habel-reveal 3s forwards cubic-bezier(0.16, 1, 0.3, 1);
        }

        .text-dot {
          opacity: 0;
          animation: dot-reveal 0.5s forwards 2.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes habel-reveal {
          0% {
            stroke-dashoffset: 100%;
            stroke-dasharray: 0 100%;
            fill: transparent;
            stroke: rgba(210, 255, 0, 0.5);
            stroke-width: 2px;
          }
          60% {
            stroke-dashoffset: 0%;
            stroke-dasharray: 100% 0;
            fill: transparent;
            stroke: rgba(255, 255, 255, 0.4);
            stroke-width: 1px;
          }
          90%, 100% {
            stroke: transparent;
            stroke-width: 0;
            fill: white;
            stroke-dashoffset: 0;
          }
        }

        @keyframes dot-reveal {
          0% { opacity: 0; transform: scale(0); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes animate-loader-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </main>
  );
}
