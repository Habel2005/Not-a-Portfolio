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
    // Faster, snappier morphing timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2, // Slightly tighter scrub for responsiveness
      }
    });

    // Sequence: Light -> Dark -> Light -> Dark
    // 1. Transition into Archive (Dark)
    tl.to("body", { backgroundColor: "#050505", color: "#ffffff", duration: 1 }, 0.1)
      .to(".morph-target", { color: "#D2FF00", duration: 1 }, 0.1);

    // 2. Transition back to Narrative (Light)
    tl.to("body", { backgroundColor: "#f9f8f5", color: "#050505", duration: 1 }, 0.4)
      .to(".morph-target", { color: "#050505", duration: 1 }, 0.4);

    // 3. Transition into Services (Dark)
    tl.to("body", { backgroundColor: "#050505", color: "#ffffff", duration: 1 }, 0.7)
      .to(".morph-target", { color: "#D2FF00", duration: 1 }, 0.7);

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
          <span className="cursor-pointer">LinkedIn</span>
          <span className="cursor-pointer">Twitter</span>
          <span className="cursor-pointer">Github</span>
        </div>
      </footer>
    </main>
  );
}
