"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TopoCanvas } from "@/components/portfolio/topo-background"; // Adjust path if needed

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);

  // --- EDIT MODE STATE ---
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeBubble, setActiveBubble] = useState<string | null>(null);
  const [habelToast, setHabelToast] = useState(false);

  // Editable Content
  const [content, setContent] = useState({
    design: "DESIGN",
    code: "CODE",
    quote: "Elevating visual identities through high-fashion aesthetics and cinematic precision."
  });

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

  const handleNameClick = () => {
    if (!isEditMode) return;
    setHabelToast(true);
    setActiveBubble(null);
    setTimeout(() => setHabelToast(false), 2000);
  };

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      
      {/* --- NEW INTERACTIVE TOPOGRAPHIC BACKGROUND --- */}
      <TopoCanvas />

      {/* Target for the 3D Z-Space Scale & Blur */}
      <div id="hero-inner-content" className="w-full h-full flex flex-col justify-center p-8 md:p-12 relative z-10">

        {/* Layered Typography Section - Centered */}
        <div className="relative z-10 w-full">
          <div className="mb-8 text-center lg:text-left">
            <span className="text-metadata opacity-40">Hey, welcome to my portfolio "</span>
          </div>

          <h1 className="text-huge font-headline leading-[0.75] uppercase tracking-tighter select-none flex flex-col">
            
            {/* NAME LINE - UNEDITABLE EASTER EGG */}
            <div 
              ref={topLineRef} 
              className={`hero-line w-full text-center lg:text-left relative ${isEditMode ? "cursor-pointer overflow-visible z-50" : "overflow-hidden"}`}
              onClick={handleNameClick}
            >
              <span>HABEL</span>
              
              {/* Funny Habel Overlay */}
              {habelToast && (
                <div className="absolute top-1/2 left-1/2 lg:left-[15%] -translate-x-1/2 -translate-y-1/2 bg-primary text-black text-sm font-code px-4 py-2 rounded-full tracking-normal normal-case z-50 animate-in fade-in zoom-in duration-200 shadow-2xl">
                  Nice try, but you can't change mE!
                </div>
              )}
            </div>

            {/* DESIGN LINE - EDITABLE */}
            <div className={`hero-line self-center lg:self-end text-primary lg:pr-[15vw] group relative ${isEditMode ? 'overflow-visible z-50' : 'overflow-hidden z-20'}`}>
              <span 
                className={`inline-flex items-center gap-4 lg:gap-6 ${isEditMode ? "cursor-pointer hover:opacity-70 transition-opacity" : ""}`}
                onClick={() => isEditMode && setActiveBubble(activeBubble === 'design' ? null : 'design')}
              >
                <div className="transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] group-hover:tracking-[0.05em] group-hover:opacity-80">
                  {content.design}
                </div>
                <div className="text-[0.9em] transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] rotate-45 group-hover:rotate-0 origin-center">
                  +
                </div>
              </span>

              {/* iOS Chat Bubble for Design */}
              {isEditMode && activeBubble === 'design' && (
                <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 bg-[#f0f0f0] text-black px-4 py-3 rounded-2xl shadow-2xl z-[100] min-w-[200px] flex items-center">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[10px] border-b-[#f0f0f0]" />
                  <input 
                    autoFocus
                    type="text"
                    value={content.design}
                    onChange={(e) => setContent(prev => ({ ...prev, design: e.target.value.toUpperCase() }))}
                    className="bg-transparent border-none outline-none text-base font-code tracking-normal w-full uppercase"
                    placeholder="Type here..."
                  />
                </div>
              )}
            </div>

            {/* CODE LINE - EDITABLE */}
            <div ref={bottomLineRef} className={`hero-line -mt-8 md:-mt-12 lg:-mt-20 w-full relative h-[15vw] min-h-[120px] group ${isEditMode ? 'overflow-visible z-50' : 'overflow-hidden'}`}>
              <span 
                className={`block relative w-full h-full ${isEditMode ? "cursor-pointer" : ""}`}
                onClick={() => isEditMode && setActiveBubble(activeBubble === 'code' ? null : 'code')}
              >
                <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none">
                  <defs>
                    <clipPath id="code-clip">
                      <text x="0" y="50%" dominantBaseline="central" className="text-[15vw] font-headline font-bold uppercase tracking-tighter">
                        &nbsp;{content.code}
                      </text>
                    </clipPath>
                  </defs>

                  {/* Disable hover video in edit mode to prevent visual clutter */}
                  {!isEditMode && (
                    <g clipPath="url(#code-clip)" className="transition-opacity duration-700 ease-out opacity-0 group-hover:opacity-100">
                      <foreignObject x="0" y="0" width="100%" height="100%">
                        <div className="absolute inset-0 w-full h-[98%] top-[1%] overflow-hidden flex items-center justify-center scale-[0.99] origin-center">
                          <video autoPlay loop muted playsInline className="w-full h-full object-cover will-change-transform">
                            <source src="/lib/hack.mp4" type="video/mp4" />
                          </video>
                        </div>
                      </foreignObject>
                    </g>
                  )}

                  <text 
                    x="0" 
                    y="50%" 
                    dominantBaseline="central" 
                    className={`text-[15vw] font-headline font-bold uppercase tracking-tighter fill-transparent stroke-current stroke-[1px] transition-opacity duration-700 ${!isEditMode ? 'opacity-100 group-hover:opacity-30' : 'opacity-100 hover:stroke-primary'}`}
                  >
                    &nbsp;{content.code}
                  </text>
                </svg>

                {/* iOS Chat Bubble for Code */}
                {isEditMode && activeBubble === 'code' && (
                  <div className="absolute top-1/2 left-1/4 bg-[#f0f0f0] text-black px-4 py-3 rounded-2xl shadow-2xl z-[100] min-w-[200px] flex items-center">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[10px] border-b-[#f0f0f0]" />
                    <input 
                      autoFocus
                      type="text"
                      value={content.code}
                      onChange={(e) => setContent(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                      className="bg-transparent border-none outline-none text-base font-code tracking-normal w-full uppercase"
                      placeholder="Type here..."
                    />
                  </div>
                )}
              </span>
            </div>
          </h1>
        </div>

        {/* BOTTOM LABEL & TOGGLE */}
        <div className="absolute bottom-12 left-8 right-8 lg:left-12 lg:right-12 z-20 flex justify-between items-end hero-meta">
          <div className="max-w-xs relative">
            <p 
              className={`text-sm md:text-base max-w-[320px] leading-relaxed tracking-[0.08em] opacity-70 font-code pl-2 transition-all ${isEditMode ? 'cursor-pointer hover:opacity-100 border border-dashed border-current p-2 rounded' : ''}`}
              onClick={() => isEditMode && setActiveBubble(activeBubble === 'quote' ? null : 'quote')}
            >
              {content.quote}
            </p>

            {/* iOS Chat Bubble for Quote */}
            {isEditMode && activeBubble === 'quote' && (
              <div className="absolute bottom-full mb-4 left-0 bg-[#f0f0f0] text-black px-4 py-3 rounded-2xl shadow-2xl z-[100] w-[300px] flex items-center">
                <div className="absolute -bottom-2 left-8 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-[#f0f0f0]" />
                <textarea 
                  autoFocus
                  value={content.quote}
                  onChange={(e) => setContent(prev => ({ ...prev, quote: e.target.value }))}
                  className="bg-transparent border-none outline-none text-sm font-code tracking-normal w-full resize-none"
                  rows={3}
                  placeholder="Type quote..."
                />
              </div>
            )}
          </div>

          {/* EDIT TOGGLE BUTTON */}
          <div className="flex flex-col items-end gap-2 group">
            <div className="text-[10px] font-code opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-primary mb-1 pointer-events-none">
              {isEditMode ? "Save changes" : "This page is fully customizable"}
            </div>
            
            <button 
              onClick={() => {
                setIsEditMode(!isEditMode);
                setActiveBubble(null);
              }}
              className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${isEditMode ? 'bg-primary border-primary text-black' : 'bg-transparent border-current hover:border-primary hover:text-primary'}`}
            >
              {isEditMode ? (
                // Stop/Save Icon
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                // Pencil Icon
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Decorative Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-bold opacity-[0.02] select-none pointer-events-none z-10">
          #X:
        </div>

      </div>
    </section>
  );
}