
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
    // Reset to pure brutalist dark theme
    gsap.set("body", { backgroundColor: "#050505", color: "#F0F0F0" });

    const ctx = gsap.context(() => {
      // Standard Text Reveal
      gsap.from(".reveal-text", {
        opacity: 0,
        y: 60,
        skewY: 2,
        duration: 1.5,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      // Artistic Tech Stack Marquee Parallax
      gsap.to(".tech-row", {
        xPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: ".tech-art-container",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      gsap.to(".tech-row-reverse", {
        xPercent: 20, 
        ease: "none",
        scrollTrigger: {
          trigger: ".tech-art-container",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-64 overflow-hidden font-sans bg-void-black text-white">
      
      {/* 01: The Identity & Bio */}
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto mb-48">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative items-start">
          
          {/* The "Beyond The Screen" Tray - Moved to Left & Compacted */}
          <div className="col-span-12 lg:col-span-3 reveal-text">
            <div className="p-8 border border-white/10 bg-white/[0.02] backdrop-blur-md transform -rotate-2 hover:rotate-0 transition-transform duration-700 shadow-2xl max-w-[280px]">
               <div className="text-[9px] font-mono uppercase tracking-[0.4em] text-primary mb-6 pb-2 border-b border-white/10">EXTERNAL_INPUT</div>
               <p className="font-display italic text-2xl mb-4 leading-none">Aviation & <br/>Astronomy.</p>
               <p className="text-[10px] font-mono opacity-40 leading-relaxed uppercase tracking-[0.15em]">
                 OBSESSED WITH ATC TELEMETRY, FLIGHT DYNAMICS, AND THE SPATIAL SINGULARITY OF BLACK HOLES.
               </p>
               <div className="mt-6 flex gap-1.5">
                 <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
                 <div className="w-1 h-1 bg-primary/40 rounded-full" />
               </div>
            </div>
          </div>

          {/* Main Title Area */}
          <div className="col-span-12 lg:col-span-4">
            <div className="text-metadata text-primary mb-8 reveal-text">02 / THE ARCHITECT</div>
            <h2 className="text-6xl md:text-[8.5vw] font-headline font-bold uppercase leading-[0.8] tracking-tighter reveal-text">
              Who am<span className="text-primary">&nbsp;i?</span>
            </h2>
          </div>

          {/* Bio Content - Updated Paragraph */}
          <div className="col-span-12 lg:col-span-5 pt-8 md:pt-12">
            <p className="text-xl md:text-3xl font-body leading-tight opacity-60 reveal-text">
              My journey started with tinkering in Linux environments and building cat games on Scratch. Today, I architect self-hosted AI infrastructure and engineer native applications, bridging the gap between backend logic and refined interactive experiences.
            </p>
            
            <div className="reveal-text border-l border-primary pl-8 pt-2 mt-20">
              <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-primary mb-4">BASE_STATION</div>
              <p className="text-2xl font-bold tracking-tight uppercase">Kochi, Kerala</p>
              <p className="text-xs font-mono opacity-40 mt-2 uppercase tracking-widest">CS Undergrad @ TIST</p>
            </div>
          </div>

        </div>
      </div>

      {/* 02: The Tech Stack (Artistic Marquee) */}
      <div className="tech-art-container relative w-full py-48 flex flex-col justify-center border-y border-white/5 select-none bg-white/[0.01]">
         
         <div className="tech-row flex whitespace-nowrap text-[15vw] font-headline font-bold uppercase leading-[0.7] tracking-tighter opacity-[0.05]">
            <span>LLAMA.CPP • WHISPER • FREESWITCH • CHROMADB •&nbsp;</span>
            <span>LLAMA.CPP • WHISPER • FREESWITCH • CHROMADB •&nbsp;</span>
         </div>
         
         <div className="tech-row-reverse flex whitespace-nowrap text-[15vw] font-headline font-bold uppercase leading-[0.7] tracking-tighter opacity-20 text-primary -ml-[30vw]" style={{ WebkitTextStroke: '1px currentColor', color: 'transparent' }}>
            <span>THREE.JS • WEBGL • GSAP • NEXT.JS • REACT •&nbsp;</span>
            <span>THREE.JS • WEBGL • GSAP • NEXT.JS • REACT •&nbsp;</span>
         </div>
         
         <div className="tech-row flex whitespace-nowrap text-[15vw] font-headline font-bold uppercase leading-[0.7] tracking-tighter opacity-[0.05]">
            <span>FLUTTER • KOTLIN • DART • PYTHON3 • TAILWIND •&nbsp;</span>
            <span>FLUTTER • KOTLIN • DART • PYTHON3 • TAILWIND •&nbsp;</span>
         </div>
         
         {/* Center Label Overlay */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="px-16 py-8 border border-primary/20 bg-void-black/90 backdrop-blur-2xl shadow-[0_0_50px_rgba(210,255,0,0.1)]">
               <div className="text-xs font-mono uppercase tracking-[0.6em] text-primary font-bold">THE_ARSENAL</div>
            </div>
         </div>

      </div>

    </section>
  );
}
