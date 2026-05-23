"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Letter reveal
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

      // Parallax Scrolling Effect
      gsap.to(topLineRef.current, {
        y: -250,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      gsap.to(bottomLineRef.current, {
        y: 350,
        ease: "none",
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
    <section ref={containerRef} className="relative h-screen flex flex-col justify-center p-8 md:p-12 overflow-hidden">
      {/* Persistent Navigation Layer - Refined for Technical Distinction */}
      <nav className="fixed top-12 right-12 flex flex-col items-end z-[100] mix-blend-difference text-white text-right">
        <div className="space-y-6 hero-meta">
          <div className="space-y-0.5">
            <div className="text-[10px] font-code tracking-[0.3em] uppercase opacity-40">Habel / Portfolio</div>
          </div>
          
          <div className="flex flex-col items-end gap-3 pt-6 border-t border-white/10">
            {['Archive', 'Narrative', 'Connect'].map((link, idx) => (
              <button 
                key={link} 
                className="flex items-center gap-4 group py-0.5 relative"
              >
                <span className="text-[8px] font-code opacity-20 group-hover:opacity-100 group-hover:text-primary transition-all tracking-tighter">
                  [ 0{idx + 1} ]
                </span>
                <span className="text-[10px] font-code uppercase tracking-[0.25em] opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all">
                  {link}
                </span>
                {/* Minimal hover bar for UI feedback */}
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-0 group-hover:h-2 bg-primary transition-all duration-300" />
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Layered Typography Section - Centered */}
      <div className="relative z-10 w-full">
        <div className="hero-meta mb-8 text-center lg:text-left">
          <span className="text-metadata opacity-40">Independent Archive / 2025</span>
        </div>
        
        <h1 className="text-huge font-headline leading-[0.75] uppercase tracking-tighter select-none flex flex-col">
          <div ref={topLineRef} className="hero-line overflow-hidden w-full text-center lg:text-left">
            <span>HABEL</span>
          </div>
          
          {/* Middle Line - Kinetic Hover Preserved */}
          <div className="hero-line overflow-hidden self-center lg:self-end text-primary kinetic-hover lg:pr-[15vw] z-20">
            <span>DESIGN ×</span>
          </div>
          
          {/* Bottom Line - Video Masked Aesthetic with Parallax */}
          <div ref={bottomLineRef} className="hero-line -mt-8 md:-mt-12 lg:-mt-20 w-full text-center lg:text-left">
            <div className="hacker-mask-container relative inline-block">
              <video autoPlay loop muted playsInline className="matrix-bg">
                <source src="/lib/hack.mp4" type="video/mp4" />
              </video>
              <span className="hacker-text block">
                &nbsp;CODE
              </span>
            </div>
          </div>
        </h1>
      </div>

      {/* Refined Bottom Labels */}
      <div className="absolute bottom-12 left-8 right-8 lg:left-12 lg:right-12 z-10 flex justify-between items-end hero-meta mix-blend-difference text-white">
        <div className="max-w-xs">
        <p className="text-sm md:text-base max-w-[320px] leading-relaxed tracking-[0.08em] text-white/70 font-code pl-2">
            Elevating visual identities through high-fashion aesthetics and cinematic precision.
          </p>
        </div>
        <div className="flex flex-col items-end gap-4">
          <div className="w-px h-16 bg-white opacity-20" />
          <span className="text-metadata">Scroll_To_Archive</span>
        </div>
      </div>

      {/* Decorative Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-bold opacity-[0.02] select-none pointer-events-none">
        H
      </div>
    </section>
  );
}
