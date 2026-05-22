"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function StudioNarrative() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-text", {
        opacity: 0,
        y: 40,
        duration: 1.4,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-64 px-8 max-w-screen-2xl mx-auto space-y-48">
      <div className="asymmetric-grid">
        <div className="col-span-12 md:col-span-9 space-y-16">
          <div className="text-metadata">02 / The Journey</div>
          <h2 className="text-5xl md:text-8xl font-headline font-bold tracking-tighter reveal-text leading-none uppercase">
            Bridging the gap between <span className="italic text-primary">raw code</span> and cinematic aesthetics.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <p className="text-xl md:text-2xl font-body leading-relaxed opacity-60 reveal-text">
              My education at the intersection of design and computer science has taught me that functionality is nothing without feeling. I build digital experiences that are intentional, weighted, and expensive-feeling.
            </p>
            <div className="space-y-8 reveal-text">
              <div className="border-l border-foreground/10 pl-8">
                <div className="text-metadata mb-2">Education</div>
                <p className="text-lg">BSc Creative Computing — Distinction</p>
                <p className="text-sm opacity-40 uppercase tracking-widest mt-1">2019-2023</p>
              </div>
              <div className="border-l border-foreground/10 pl-8">
                <div className="text-metadata mb-2">Previous</div>
                <p className="text-lg">Interactive Designer — Void Agency</p>
                <p className="text-sm opacity-40 uppercase tracking-widest mt-1">2023-Present</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 items-end">
        <div className="col-span-12 md:col-span-4 space-y-6 reveal-text">
          <div className="text-metadata">Philosophy</div>
          <h4 className="text-3xl font-headline uppercase italic">Rejecting the Friction.</h4>
          <p className="text-sm opacity-50 uppercase tracking-wider leading-relaxed">
            Every movement must be deliberate. Every pixel must serve the narrative. I believe in the power of the void and the rhythm of the grid.
          </p>
        </div>
        <div className="col-span-12 md:col-span-8 h-[70vh] overflow-hidden reveal-text relative">
          <img 
            src="https://picsum.photos/seed/habel-studio/1600/1000" 
            alt="Workspace" 
            className="w-full h-full object-cover grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
        </div>
      </div>
    </section>
  );
}