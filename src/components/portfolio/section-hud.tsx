"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SECTIONS = [
  { id: "00", label: "Intro", trigger: "#hero" },
  { id: "01", label: "Archive", trigger: "#archive" },
  { id: "02", label: "Journey", trigger: "#narrative" },
  { id: "03", label: "Capabilities", trigger: "#services" },
  { id: "04", label: "Identity", trigger: "#footer" },
];

export function SectionHUD() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0]);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    SECTIONS.forEach((section) => {
      ScrollTrigger.create({
        trigger: section.trigger,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(section),
        onEnterBack: () => setActiveSection(section),
      });
    });

    // Animate the progress meter height based on total scroll
    gsap.to(progressRef.current, {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="fixed right-8 md:right-12 top-1/2 -translate-y-1/2 z-[100] flex gap-4 items-center pointer-events-none mix-blend-difference flex-row-reverse">
      {/* The Meter Scale - Thin Architectural Detail */}
      <div className="relative h-48 w-[1px] bg-white/10 overflow-hidden">
        <div 
          ref={progressRef}
          className="absolute top-0 left-0 w-full bg-primary h-0 transition-colors duration-500" 
        />
        {/* Ticks */}
        <div className="absolute inset-0 flex flex-col justify-between py-1">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-full h-[1px] bg-white/20" />
          ))}
        </div>
      </div>

      {/* Active Section Label - Monospaced and Small */}
      <div className="flex flex-col gap-1 items-end text-right">
        <div className="text-[10px] font-code text-primary tracking-widest uppercase transition-colors duration-500">
          <span className="opacity-40">{activeSection.id} / </span>
          <span>{activeSection.label}</span>
        </div>
        <div className="h-[0.5px] w-4 bg-primary/30 animate-pulse" />
      </div>
      
      {/* Decorative vertical index */}
      <div className="absolute -right-3 top-0 h-full flex flex-col justify-between text-[7px] font-code opacity-10 uppercase tracking-tighter vertical-text py-1">
        <span>LVL_0</span>
        <span>INDEX</span>
      </div>
    </div>
  );
}