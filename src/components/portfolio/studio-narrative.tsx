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
        y: 50,
        duration: 1.2,
        stagger: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-48 px-8 max-w-7xl mx-auto space-y-32">
      <div className="asymmetric-grid">
        <div className="col-span-12 md:col-span-8 space-y-12">
          <div className="text-metadata">The Narrative</div>
          <h2 className="text-6xl md:text-8xl font-headline font-bold tracking-tighter reveal-text">
            We build digital environments that <span className="italic text-primary">breathe</span> and resonate.
          </h2>
          <p className="text-2xl font-body leading-relaxed opacity-60 max-w-2xl reveal-text">
            Rejecting the friction of modern web design, we embrace silence and intentionality. 
            Every pixel is a deliberate choice in our pursuit of brutalist elegance.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-24 items-end">
        <div className="space-y-4 reveal-text">
          <div className="text-metadata">01 / Vision</div>
          <p className="text-sm opacity-50">Transcending traditional interfaces through spatial awareness and minimalist purity.</p>
        </div>
        <div className="col-span-2 h-[60vh] overflow-hidden reveal-text">
          <img 
            src="https://picsum.photos/seed/studio-wide/1200/800" 
            alt="Studio view" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div>
    </section>
  );
}