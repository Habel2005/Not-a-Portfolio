"use client";

import { useEffect, useRef } from "react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProjectCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: "-300vw",
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "3000 top",
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      }
    );
    return () => pin.kill();
  }, []);

  return (
    <div ref={triggerRef} className="overflow-hidden">
      <div ref={sectionRef} className="flex h-screen w-[400vw] bg-foreground text-background">
        <div className="w-screen h-full flex flex-col justify-center px-12 md:px-24 space-y-8">
          <div className="text-metadata text-primary">01 / Selected Works</div>
          <h2 className="text-huge italic opacity-10 select-none uppercase">Portfolio</h2>
        </div>

        {PlaceHolderImages.map((project, idx) => (
          <div key={project.id} className="w-screen h-full flex items-center justify-center p-8 md:p-32">
            <div className="relative group w-full h-[75vh] max-w-5xl overflow-hidden cursor-none">
              <img
                src={project.imageUrl}
                alt={project.description}
                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-12">
                <div className="text-metadata text-primary mb-4">Case Study 0{idx + 1}</div>
                <h3 className="text-4xl md:text-7xl font-headline font-bold uppercase tracking-tighter text-white">
                  {project.description}
                </h3>
                <div className="mt-8 h-px w-0 group-hover:w-full bg-primary transition-all duration-1000" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}