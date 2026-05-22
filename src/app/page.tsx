
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hero } from "@/components/portfolio/hero";
import { ProjectMatrix } from "@/components/portfolio/project-matrix";
import { StudioNarrative } from "@/components/portfolio/studio-narrative";
import { ServicesHover } from "@/components/portfolio/services-hover";
import { CustomCursor } from "@/components/portfolio/custom-cursor";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial State reset
    gsap.set("body", { backgroundColor: "#f9f8f5", color: "#050505" });
    gsap.set(".morph-target", { color: "#050505" });

    // Create a master timeline for the theme morphing
    // We use short durations relative to the timeline to create 'snappy' color shifts
    // that hit high contrast quickly and then 'hold' it for the section.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5, // Faster scrub for more immediate response
      }
    });

    // Phase 1: Hero (Light) -> Archive (Peak Black)
    // Hit absolute black early so the 3D gallery is fully cinematic
    tl.to("body", { 
      backgroundColor: "#050505", 
      color: "#ffffff", 
      duration: 0.15 
    }, 0.1)
    .to(".morph-target", { 
      color: "#D2FF00", 
      duration: 0.15 
    }, 0.1);

    // Phase 2: Archive (Black) -> Narrative (Light Editorial)
    // Transition back to light just before Narrative content enters view
    tl.to("body", { 
      backgroundColor: "#f9f8f5", 
      color: "#050505", 
      duration: 0.15 
    }, 0.35)
    .to(".morph-target", { 
      color: "#050505", 
      duration: 0.15 
    }, 0.35);

    // Phase 3: Narrative (Light) -> Services (Dark Contrast)
    tl.to("body", { 
      backgroundColor: "#050505", 
      color: "#ffffff", 
      duration: 0.15 
    }, 0.75)
    .to(".morph-target", { 
      color: "#D2FF00", 
      duration: 0.15 
    }, 0.75);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main ref={mainRef} className="relative">
      <CustomCursor />
      
      <section className="min-h-screen">
        <Hero />
      </section>
      
      {/* Archive Section - Peak Void-Black */}
      <section className="relative h-screen overflow-hidden bg-transparent">
        <div className="absolute top-12 left-12 z-20 pointer-events-none">
          <div className="text-metadata morph-target">01 / The Archive</div>
          <h2 className="text-4xl font-headline font-bold text-white uppercase tracking-tighter">
            Spatial Shards
          </h2>
        </div>
        <ProjectMatrix />
      </section>
      
      <section className="min-h-screen">
        <StudioNarrative />
      </section>
      
      <section className="min-h-screen">
        <ServicesHover />
      </section>
      
      <footer className="py-48 px-8 text-center overflow-hidden">
        <div className="text-metadata mb-12 morph-target">Habel Studio / 2025</div>
        <h2 className="text-huge font-headline font-bold tracking-tighter opacity-10 uppercase select-none italic">
          Perspective
        </h2>
        <div className="mt-24 flex justify-center gap-12 text-metadata hover:text-primary transition-colors cursor-pointer morph-target">
          <span className="cursor-pointer">LinkedIn</span>
          <span className="cursor-pointer">Twitter</span>
          <span className="cursor-pointer">Github</span>
        </div>
      </footer>
    </main>
  );
}
