"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-char", {
        y: 300,
        skewY: 10,
        opacity: 0,
        duration: 1.6,
        stagger: 0.05,
        ease: "power4.out",
      });

      gsap.from(".nav-item", {
        y: -20,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        delay: 0.8,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center px-8 bg-background overflow-hidden">
      <nav className="absolute top-8 left-8 right-8 flex justify-between items-center z-50">
        <div className="text-metadata nav-item">Habel / Archive ©2024</div>
        <div className="flex gap-12 text-metadata">
          <button className="nav-item hover:opacity-100 transition-opacity">Work</button>
          <button className="nav-item hover:opacity-100 transition-opacity">Journey</button>
          <button className="nav-item hover:opacity-100 transition-opacity">Contact</button>
        </div>
      </nav>

      <div className="relative z-10">
        <h1 className="text-huge font-headline font-bold uppercase italic select-none leading-none">
          <div className="overflow-hidden">
            <span className="block hero-char">Creative</span>
          </div>
          <div className="overflow-hidden text-right">
            <span className="block hero-char text-primary">Engineer</span>
          </div>
          <div className="overflow-hidden">
            <span className="block hero-char">Habel.</span>
          </div>
        </h1>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center space-y-4 os-element">
        <div className="text-metadata animate-pulse">Scroll to descend</div>
        <div className="w-[1px] h-16 bg-foreground/10 mx-auto" />
      </div>

      {/* Parallax Background Shard */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-96 opacity-5 grayscale pointer-events-none rotate-12">
        <img 
          src="https://picsum.photos/seed/habel-hero/800/1200" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}