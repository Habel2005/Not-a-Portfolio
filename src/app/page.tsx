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
    const sections = gsap.utils.toArray<HTMLElement>("section");
    
    // Smooth Scrubbed Morphing
    // We create a master timeline that controls the global "Atmosphere"
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    // Segment 1: Transition into Matrix (Dark)
    tl.to("body", { backgroundColor: "#050505", color: "#ffffff" }, 0.1)
      .to(".morph-target", { color: "#D2FF00" }, 0.1);

    // Segment 2: Transition into Narrative (Light)
    tl.to("body", { backgroundColor: "#f9f8f5", color: "#050505" }, 0.4)
      .to(".morph-target", { color: "#050505" }, 0.4);

    // Segment 3: Transition into Services (Dark)
    tl.to("body", { backgroundColor: "#050505", color: "#ffffff" }, 0.7)
      .to(".morph-target", { color: "#D2FF00" }, 0.7);

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
      
      <section className="relative h-screen overflow-hidden">
        <div className="absolute top-12 left-12 z-20 mix-blend-difference">
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
      
      <footer className="py-48 px-8 text-center overflow-hidden mix-blend-difference">
        <div className="text-metadata mb-12">Habel Studio / 2025</div>
        <h2 className="text-huge font-headline font-bold tracking-tighter opacity-10 uppercase select-none italic">
          Perspective
        </h2>
        <div className="mt-24 flex justify-center gap-12 text-metadata hover:text-primary transition-colors cursor-pointer">
          <span>LinkedIn</span>
          <span>Twitter</span>
          <span>Github</span>
        </div>
      </footer>
    </main>
  );
}
