
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Letter reveal
      gsap.from(".hero-line span", {
        y: "110%",
        opacity: 0,
        rotateX: -45,
        duration: 1.8,
        stagger: 0.15,
        ease: "expo.out",
      });

      // Metadata fade
      gsap.from(".hero-meta", {
        y: 20,
        opacity: 0,
        duration: 1.5,
        delay: 0.8,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col justify-end p-8 md:p-12 overflow-hidden">
      <nav className="fixed top-12 left-12 right-12 flex justify-end items-start z-[100] mix-blend-difference text-white">
        <div className="flex flex-col items-end gap-12 text-right">
          {/* Identity Metadata moved to right */}
          <div className="space-y-1 hero-meta">
            <div className="text-metadata">Habel / Portfolio</div>
            <div className="text-[10px] font-code uppercase opacity-40">Creative Engineer</div>
          </div>
          
          {/* Navigation links */}
          <div className="flex flex-col items-end gap-2 text-metadata hero-meta">
            <button className="hover:text-primary transition-colors">Archive</button>
            <button className="hover:text-primary transition-colors">Narrative</button>
            <button className="hover:text-primary transition-colors">Connect</button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 w-full mb-12">
        <h1 className="text-huge font-headline leading-[0.75] uppercase tracking-tighter select-none flex flex-col">
          <div className="hero-line overflow-hidden">
            <span>HABEL</span>
          </div>
          <div className="hero-line overflow-hidden self-end text-primary kinetic-hover pr-[15vw]">
            <span>ARCHIVE</span>
          </div>
          <div className="hero-line overflow-hidden">
            <span>STUDIO</span>
          </div>
        </h1>
      </div>

      <div className="absolute bottom-12 right-12 text-metadata hero-meta flex gap-12 mix-blend-difference text-white">
        <span>EST. 2025</span>
        <span className="opacity-20">—</span>
        <span>BRUTALIST_PRECISION</span>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-bold opacity-[0.03] select-none pointer-events-none">
        H
      </div>
    </section>
  );
}
