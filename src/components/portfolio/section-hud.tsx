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
  const hudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for all floating HUD elements
      gsap.from(".hud-element", {
        y: 20,
        opacity: 0,
        duration: 1.5,
        delay: 0.8,
        ease: "power3.out",
        stagger: 0.1
      });

      // Active Section Tracker
      SECTIONS.forEach((section) => {
        ScrollTrigger.create({
          trigger: section.trigger,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveSection(section),
          onEnterBack: () => setActiveSection(section),
        });
      });

      // Progress Meter
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
    }, hudRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={hudRef} className="fixed inset-0 z-[100] pointer-events-none mix-blend-difference text-white">
      
      {/* 1. TOP RIGHT NAV */}
      <nav className="hud-element hidden md:flex absolute top-12 right-12 flex-col items-end text-right">
        <div className="space-y-6">
          <div className="space-y-0.5">
            <div className="text-[10px] font-code tracking-[0.3em] uppercase opacity-40">Habel / Portfolio</div>
          </div>

          <div className="flex flex-col items-end gap-3 pt-6 border-t border-white/10 pointer-events-auto">
            {/* Skipping 'Intro' for the links using slice(1) */}
            {SECTIONS.slice(1).map((link, idx) => (
              <button
                key={link.label}
                onClick={() => {
                  document.querySelector(link.trigger)?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
                className="flex items-center gap-4 group py-0.5 relative"
              >
                <span className="text-[8px] font-code opacity-20 group-hover:opacity-100 group-hover:text-primary transition-all tracking-tighter">
                  [ 0{idx + 1} ]
                </span>
                <span className="text-[10px] font-code uppercase tracking-[0.25em] opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all">
                  {link.label}
                </span>
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-0 group-hover:h-2 bg-primary transition-all duration-300" />
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 2. MIDDLE RIGHT PROGRESS HUD */}
      <div className="hud-element absolute right-8 md:right-12 top-1/2 -translate-y-1/2 flex gap-4 items-center flex-row-reverse">
        <div className="relative h-48 w-[1px] bg-white/10 overflow-hidden">
          <div 
            ref={progressRef}
            className="absolute top-0 left-0 w-full bg-primary h-0 transition-colors duration-500" 
          />
          <div className="absolute inset-0 flex flex-col justify-between py-1">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-full h-[1px] bg-white/20" />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 items-end text-right">
          <div className="text-[10px] font-code text-primary tracking-widest uppercase transition-colors duration-500">
            <span className="opacity-40">{activeSection.id} / </span>
            <span>{activeSection.label}</span>
          </div>
          <div className="h-[0.5px] w-4 bg-primary/30 animate-pulse" />
        </div>
        
        <div className="absolute -right-3 top-0 h-full flex flex-col justify-between text-[7px] font-code opacity-10 uppercase tracking-tighter vertical-text py-1">
          <span>LVL_0</span>
          <span>INDEX</span>
        </div>
      </div>

    </div>
  );
}