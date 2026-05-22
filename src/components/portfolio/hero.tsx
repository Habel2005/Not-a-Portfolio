"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Overlapping letter reveal
      gsap.from(".hero-line span", {
        y: "100%",
        opacity: 0,
        rotateX: -90,
        duration: 2,
        stagger: 0.1,
        ease: "expo.out",
      });

      // Kinetic metadata reveal
      gsap.from(".hero-meta", {
        x: -20,
        opacity: 0,
        duration: 1.5,
        delay: 1,
        ease: "power3.out",
      });

      // Background image parallax
      gsap.to(".hero-bg", {
        y: -100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col justify-end p-8 md:p-12 bg-background overflow-hidden">
      <nav className="fixed top-12 left-12 right-12 flex justify-between items-start z-[100] mix-blend-difference text-white">
        <div className="space-y-1">
          <div className="text-metadata hero-meta">Habel / Archive</div>
          <div className="text-[10px] font-code uppercase opacity-40">Creative Engineer</div>
        </div>
        <div className="flex flex-col items-end gap-2 text-metadata hero-meta">
          <button className="hover:text-primary transition-colors">Project_Matrix</button>
          <button className="hover:text-primary transition-colors">Narrative_01</button>
          <button className="hover:text-primary transition-colors">Contact_Sync</button>
        </div>
      </nav>

      <div className="relative z-10 w-full mb-12">
        <h1 className="text-huge font-headline leading-[0.75] uppercase tracking-tighter select-none flex flex-col">
          <div className="hero-line overflow-hidden">
            <span>HABEL</span>
          </div>
          <div className="hero-line overflow-hidden self-end text-primary kinetic-hover">
            <span>ARCHIVE</span>
          </div>
          <div className="hero-line overflow-hidden">
            <span>STUDIO</span>
          </div>
        </h1>
      </div>

      <div className="absolute bottom-12 right-12 text-metadata hero-meta flex gap-12">
        <span>EST. 2024</span>
        <span className="opacity-20">—</span>
        <span>BRUTALIST_UX</span>
      </div>

      {/* Giant Faded Letter Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-bold opacity-[0.02] select-none pointer-events-none hero-bg">
        H
      </div>
    </section>
  );
}