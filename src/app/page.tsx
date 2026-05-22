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
    
    // Global Theme Morphing
    // Section 1 (Hero): Light
    // Section 2 (Matrix): Dark
    // Section 3 (Narrative): Light
    
    sections.forEach((section, i) => {
      const isDark = i === 1; // ProjectMatrix section is the dark one
      
      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: self => {
          if (self.isActive) {
            gsap.to("body", {
              backgroundColor: isDark ? "#050505" : "#f9f8f5",
              color: isDark ? "#fff" : "#050505",
              duration: 1.2,
              ease: "expo.out",
            });
            // Specific UI element morphing
            gsap.to(".morph-target", {
              color: isDark ? "#D2FF00" : "#050505",
              duration: 1.2,
            });
          }
        }
      });
    });
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
            Spatial Matrix
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
        <div className="text-metadata mb-12">Let's connect / Available 2025</div>
        <h2 className="text-huge font-headline font-bold tracking-tighter opacity-10 uppercase select-none italic">
          Habel.Archive
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