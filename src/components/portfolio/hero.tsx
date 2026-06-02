"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Letter reveal
      gsap.from(".hero-line span", {
        y: "110%",
        opacity: 0,
        rotateX: -45,
        duration: 1.8,
        stagger: 0.15,
        ease: "expo.out",
      });

      // Metadata fade
      gsap.from(".hero-meta", {
        y: 20,
        opacity: 0,
        duration: 1.5,
        delay: 0.8,
        ease: "power3.out",
      });

      // Parallax Scrolling Effect
      gsap.to(topLineRef.current, {
        y: -250,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      gsap.to(bottomLineRef.current, {
        y: 350,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col justify-center p-8 md:p-12 overflow-hidden">
      {/* Persistent Navigation Layer - Refined for Technical Distinction */}
      <nav className="fixed top-12 right-12 flex flex-col items-end z-[100] mix-blend-difference text-white text-right">
        <div className="space-y-6 hero-meta">
          <div className="space-y-0.5">
            <div className="text-[10px] font-code tracking-[0.3em] uppercase opacity-40">Habel / Portfolio</div>
          </div>

          <div className="flex flex-col items-end gap-3 pt-6 border-t border-white/10">
            {/* 1. Update the array to include the target IDs */}
            {[
              { label: 'Archive', target: '#archive' },
              { label: 'Journey', target: '#narrative' },
              { label: 'Connect', target: '#footer' } // Assuming Connect goes to the footer
            ].map((link, idx) => (
              <button
                key={link.label}
                // 2. Add the onClick handler for smooth scrolling
                onClick={() => {
                  document.querySelector(link.target)?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
                className="flex items-center gap-4 group py-0.5 relative"
              >
                <span className="text-[8px] font-code opacity-20 group-hover:opacity-100 group-hover:text-primary transition-all tracking-tighter">
                  [ 0{idx + 1} ]
                </span>
                <span className="text-[10px] font-code uppercase tracking-[0.25em] opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all">
                  {link.label}
                </span>
                {/* Minimal hover bar for UI feedback */}
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-0 group-hover:h-2 bg-primary transition-all duration-300" />
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Layered Typography Section - Centered */}
      <div className="relative z-10 w-full">
        <div className="hero-meta mb-8 text-center lg:text-left">
          <span className="text-metadata opacity-40">Hey, welcome to my portfolio "</span>
        </div>

        <h1 className="text-huge font-headline leading-[0.75] uppercase tracking-tighter select-none flex flex-col">
          <div ref={topLineRef} className="hero-line overflow-hidden w-full text-center lg:text-left">
            <span>HABEL</span>
          </div>

          {/* Middle Line - Kinetic Hover Preserved */}
          {/* Middle Line - Precision Rotation Hover */}
          <div className="hero-line overflow-hidden self-center lg:self-end text-primary lg:pr-[15vw] z-20 group cursor-pointer">
            <span className="inline-flex items-center gap-4 lg:gap-6">

              {/* Premium Tracking Expansion Hover */}
              <div className="transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] group-hover:tracking-[0.05em] group-hover:opacity-80">
                DESIGN
              </div>

              {/* Plus to Cross Rotation */}
              <div className="text-[0.9em] transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] rotate-45 group-hover:rotate-0 origin-center">
                +
              </div>
            </span>
          </div>

          {/* Bottom Line - Interactive Outline to Video Reveal */}
          {/* ADDED: 'group cursor-pointer' to trigger the hover state */}
          <div ref={bottomLineRef} className="hero-line -mt-8 md:-mt-12 lg:-mt-20 w-full relative h-[15vw] min-h-[120px] group cursor-pointer">
            <span className="block relative w-full h-full">

              {/* ONE Single SVG handling everything natively */}
              <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none">
                <defs>
                  <clipPath id="code-clip">
                    <text
                      x="0"
                      y="50%"
                      dominantBaseline="central"
                      className="text-[15vw] font-headline font-bold uppercase tracking-tighter"
                    >
                      &nbsp;CODE
                    </text>
                  </clipPath>
                </defs>

                {/* 1. The Video Container - Hidden by default, smoothly fades in on hover */}
                <g
                  clipPath="url(#code-clip)"
                  className="transition-opacity duration-700 ease-out opacity-0 group-hover:opacity-100"
                >
                  <foreignObject x="0" y="0" width="100%" height="100%">
                    {/* INSET FIX: We pull the container away from the absolute top/bottom edges */}
                    <div className="absolute inset-0 w-full h-[98%] top-[1%] overflow-hidden flex items-center justify-center scale-[0.99] origin-center">
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        // Added will-change-transform to force the GPU to handle this layer correctly
                        className="w-full h-full object-cover will-change-transform"
                      >
                        <source src="/lib/hack.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </foreignObject>
                </g>

                {/* 2. Stroke Outline - Solid by default, drops to 30% opacity on hover so the video shines through */}
                <text
                  x="0"
                  y="50%"
                  dominantBaseline="central"
                  className="text-[15vw] font-headline font-bold uppercase tracking-tighter fill-transparent stroke-current stroke-[1px] transition-opacity duration-700 opacity-100 group-hover:opacity-30"
                >
                  &nbsp;CODE
                </text>
              </svg>

            </span>
          </div>
        </h1>
      </div>

      {/* Refined Bottom Labels */}
      <div className="absolute bottom-12 left-8 right-8 lg:left-12 lg:right-12 z-10 flex justify-between items-end hero-meta mix-blend-difference text-white">
        <div className="max-w-xs">
          <p className="text-sm md:text-base max-w-[320px] leading-relaxed tracking-[0.08em] text-white/70 font-code pl-2">
            Elevating visual identities through high-fashion aesthetics and cinematic precision.
          </p>
        </div>
        <div className="flex flex-col items-end gap-4">
          <div className="w-px h-16 bg-white opacity-20" />
          <span className="text-metadata">Scroll_To_Archive</span>
        </div>
      </div>

      {/* Decorative Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-bold opacity-[0.02] select-none pointer-events-none">
        #X:
      </div>
    </section>
  );
}
