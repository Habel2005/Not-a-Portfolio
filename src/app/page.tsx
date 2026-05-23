
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hero } from "@/components/portfolio/hero";
import { ProjectMatrix } from "@/components/portfolio/project-matrix";
import { StudioNarrative } from "@/components/portfolio/studio-narrative";
import { ServicesHover } from "@/components/portfolio/services-hover";
import { CustomCursor } from "@/components/portfolio/custom-cursor";
import { SectionHUD } from "@/components/portfolio/section-hud";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    // Initial State reset
    gsap.set("body", { backgroundColor: "#f9f8f5", color: "#050505" });

    // Transition Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      }
    });

    // Hit Void Black early in the hero scroll
    tl.to("body", { backgroundColor: "#050505", color: "#ffffff", duration: 0.1 }, 0.1)
      .to("body", { backgroundColor: "#f9f8f5", color: "#050505", duration: 0.1 }, 0.4)
      .to("body", { backgroundColor: "#050505", color: "#ffffff", duration: 0.1 }, 1.85);

    // Boot Sequence Exit
    const timer = setTimeout(() => {
      gsap.to(".loader-wrapper", {
        opacity: 0,
        pointerEvents: "none",
        duration: 1.5,
        ease: "expo.inOut",
        onComplete: () => setIsBooting(false)
      });
    }, 4000); // 4s to allow enough cycles for perceived stability

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      clearTimeout(timer);
    };
  }, []);

  return (
    <main ref={mainRef} className="relative">
      {/* PERSISTENT REPEATING LOADER - EXACT ADAPTATION OF USER CSS */}
      <div className="loader-wrapper fixed inset-0 z-[10000] bg-void-black flex items-center justify-center overflow-hidden">
        <div className="relative flex flex-col items-center gap-12">
          <svg viewBox="0 0 600 160" className="w-[80vw] max-w-2xl overflow-visible">
            <text 
              x="50%" 
              y="50%" 
              dy=".32em" 
              textAnchor="middle" 
              className="loader-text-body font-headline font-bold text-[120px] uppercase tracking-[-0.05em]"
            >
              Habel
            </text>
            <text 
              x="50%" 
              y="50%" 
              dy=".32em" 
              dx="1.8em" 
              textAnchor="middle" 
              className="loader-text-dot font-headline font-bold text-[120px]"
            >
              .
            </text>
          </svg>

          <div className="flex flex-col items-center gap-4">
            <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-primary w-full animate-loader-line" />
            </div>
            <div className="text-metadata text-white/20 tracking-[0.5em] animate-pulse">SYSTEM_BOOT_V2.5</div>
          </div>
        </div>

        <style jsx>{`
          .loader-text-body {
            fill: transparent;
            stroke: #D2FF00;
            stroke-width: 2px;
            animation: drawing-animate 3.3s infinite alternate cubic-bezier(0.16, 1, 0.3, 1);
          }
          .loader-text-dot {
            fill: #D2FF00;
            stroke: #D2FF00;
            animation: dot-animate 3.3s alternate infinite;
          }
          @keyframes drawing-animate {
            0% {
              fill: transparent;
              stroke: #D2FF00;
              stroke-width: 3;
              stroke-dashoffset: 25%;
              stroke-dasharray: 0 26%;
            }
            50% {
              fill: transparent;
              stroke: #D2FF00;
              stroke-width: 3;
            }
            80%, 100% {
              fill: white;
              stroke: transparent;
              stroke-width: 0;
              stroke-dashoffset: -25%;
              stroke-dasharray: 26% 0;
            }
          }
          @keyframes dot-animate {
            0%, 60% { opacity: 0; }
            100% { opacity: 1; }
          }
          @keyframes animate-loader-line {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>

      <CustomCursor />
      <SectionHUD />
      
      <section id="hero" className="min-h-screen">
        <Hero />
      </section>
      
      <section id="archive" className="relative h-screen overflow-hidden bg-transparent">
        <div className="absolute top-12 left-12 z-20 pointer-events-none">
          <div className="text-metadata opacity-40">01 / The Archive</div>
          <h2 className="text-4xl font-headline font-bold text-white uppercase tracking-tighter">
            Spatial Shards
          </h2>
        </div>
        <ProjectMatrix />
      </section>
      
      <section id="narrative" className="min-h-screen">
        <StudioNarrative />
      </section>
      
      <section id="services" className="min-h-screen">
        <ServicesHover />
      </section>
      
      <footer id="footer" className="py-48 px-8 text-center overflow-hidden">
        <div className="text-metadata mb-12 opacity-40">Habel Studio / 2025</div>
        <h2 className="text-huge font-headline font-bold tracking-tighter opacity-10 uppercase select-none italic">
          Perspective
        </h2>
        <div className="mt-24 flex justify-center gap-12 text-metadata hover:text-primary transition-colors cursor-pointer">
          <span className="cursor-pointer">LinkedIn</span>
          <span className="cursor-pointer">Twitter</span>
          <span className="cursor-pointer">Github</span>
        </div>
      </footer>
    </main>
  );
}
