"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        y: 200,
        rotateX: -45,
        opacity: 0,
        duration: 1.4,
        stagger: 0.2,
        ease: "power4.out",
      });
      
      gsap.to(".scroll-indicator", {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center px-8 bg-background overflow-hidden">
      <nav className="absolute top-8 left-8 right-8 flex justify-between items-center z-20">
        <div className="text-metadata">Void Archive / Est. 2024</div>
        <div className="flex gap-12 text-metadata">
          <button className="hover:opacity-100 transition-opacity">Works</button>
          <button className="hover:opacity-100 transition-opacity">Studio</button>
          <button className="hover:opacity-100 transition-opacity">Contact</button>
        </div>
      </nav>

      <div className="relative z-10">
        <h1 ref={textRef} className="text-huge font-headline font-bold uppercase italic select-none">
          <div className="overflow-hidden">
            <span className="block hero-line">Architectural</span>
          </div>
          <div className="overflow-hidden text-right">
            <span className="block hero-line text-primary">Poetry</span>
          </div>
          <div className="overflow-hidden">
            <span className="block hero-line">Studio</span>
          </div>
        </h1>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center space-y-4">
        <div className="text-metadata scroll-indicator">Scroll to Explore</div>
        <div className="w-[1px] h-12 bg-foreground/20 mx-auto" />
      </div>

      {/* Decorative Parallax Element */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-96 opacity-10 grayscale pointer-events-none">
        <img 
          src="https://picsum.photos/seed/bg-hero/600/900" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}