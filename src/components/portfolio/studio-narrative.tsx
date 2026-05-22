"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function StudioNarrative() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-text", {
        opacity: 0,
        y: 80,
        skewY: 5,
        duration: 1.8,
        stagger: 0.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      gsap.to(".narrative-img", {
        scale: 1.1,
        filter: "grayscale(0)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-64 px-8 max-w-screen-2xl mx-auto space-y-64">
      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-12 md:col-span-1 text-metadata">02 / Journey</div>
        <div className="col-span-12 md:col-span-8 space-y-16">
          <h2 className="text-6xl md:text-[10vw] font-headline font-bold tracking-tighter reveal-text leading-[0.85] uppercase">
            Code as <span className="text-primary italic">Architecture</span>.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <p className="text-xl md:text-3xl font-body leading-tight opacity-60 reveal-text">
              Habel's philosophy is rooted in technical precision. Bridging the gap between creative computing and cinematic luxury to build experiences that hold weight.
            </p>
            <div className="space-y-12 reveal-text">
              <div className="border-l border-foreground/10 pl-8">
                <div className="text-metadata mb-2">Education</div>
                <p className="text-xl font-bold">BSc Creative Computing</p>
                <p className="text-metadata opacity-40 mt-1">First Class Honours</p>
              </div>
              <div className="border-l border-foreground/10 pl-8">
                <div className="text-metadata mb-2">Focus</div>
                <p className="text-xl font-bold">Spatial UI & Shaders</p>
                <p className="text-metadata opacity-40 mt-1">GSAP / ThreeJS / WebGL</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 items-center">
        <div className="col-span-12 md:col-span-4 space-y-8 reveal-text">
          <div className="text-metadata">Manifesto</div>
          <h4 className="text-4xl font-headline font-bold uppercase tracking-tight">
            Rejecting the Friction of <span className="text-primary">Standard</span> UX.
          </h4>
          <p className="text-sm opacity-50 uppercase tracking-[0.2em] leading-relaxed max-w-xs">
            Digital experiences should feel expensive. They should feel heavy. Every pixel serves the rhythm.
          </p>
        </div>
        <div className="col-span-12 md:col-span-8 h-[80vh] overflow-hidden reveal-text relative">
          <img 
            src="https://picsum.photos/seed/habel-arch/1600/1200" 
            alt="Workspace" 
            className="w-full h-full object-cover grayscale brightness-50 narrative-img"
          />
          <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
        </div>
      </div>
    </section>
  );
}