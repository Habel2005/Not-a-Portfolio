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
import Footer from "@/components/ui/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [isBooting, setIsBooting] = useState(true);

  // 1. Define the function that the Matrix will call when it's ready
  const handleMatrixLoaded = () => {
    gsap.to(".loader-wrapper", {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => setIsBooting(false)
    });
  };

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

    tl.to("body", { backgroundColor: "#050505", color: "#ffffff", duration: 0.1 }, 0.1)
      .to("body", { backgroundColor: "#f9f8f5", color: "#050505", duration: 0.1 }, 0.4)
      .to("body", { backgroundColor: "#050505", color: "#ffffff", duration: 0.1 }, 1.85);

    // Fade out loader ONLY when app is ready
    const handleLoad = () => {
      gsap.to(".loader-wrapper", {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => setIsBooting(false)
      });
    };

    // Use a small delay to ensure ThreeJS and GSAP triggers are settled
    const timer = setTimeout(handleLoad, 2000);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      clearTimeout(timer);
    };
  }, []);

  return (
    <main ref={mainRef} className="relative">
      {/* PURE CSS LOADER - INSTANT BOOT */}
      <div className="loader-wrapper">
        <div className="relative flex flex-col items-center">
          <svg viewBox="0 0 600 160" className="w-[80vw] max-w-xl overflow-visible">
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
              dx="1.55em" 
              textAnchor="middle" 
              className="loader-text-dot font-headline font-bold text-[120px]"
            >
              .
            </text>
          </svg>
        </div>
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
        <ProjectMatrix onLoaded={handleMatrixLoaded} />
      </section>
      
      <section id="narrative" className="min-h-screen">
        <StudioNarrative />
      </section>
      
      <section id="services" className="min-h-screen">
        <ServicesHover />
      </section>
      
      <Footer/>
    </main>
  );
}
