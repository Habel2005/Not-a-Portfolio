"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { 
  X, Github, Monitor, Layers, Code2, Globe, Sparkles, Cpu, Sun, Moon, ArrowLeft 
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ZeroStudioPage() {
  const mainRef = useRef<HTMLElement>(null);
  const router = useRouter();

  // State for theme toggle (Defaults to true/dark for the WebGL aesthetic)
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Smoothly animate the body background when theme changes
    gsap.to("body", { 
      backgroundColor: isDark ? "#050505" : "#f4f4f0", 
      color: isDark ? "#ffffff" : "#050505",
      duration: 0.8,
      ease: "power2.inOut"
    });
  }, [isDark]);

  useEffect(() => {
    // Force GSAP to listen to the Modal Overlay for scroll logic
    const scrollerElement = mainRef.current;
    if (!scrollerElement) return;

    const ctx = gsap.context(() => {
      // Hero Reveal
      gsap.from(".zero-reveal", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Marquee animation
      gsap.to(".marquee-inner", {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".marquee-container",
          scroller: scrollerElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Feature Cards Staggered Reveal
      gsap.fromTo('.feature-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".feature-grid",
            scroller: scrollerElement,
            start: "top 75%",
          }
        }
      );
      
      // Force GSAP to recalculate heights now that everything has mounted
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

    }, mainRef);

    return () => ctx.revert();
  }, []);

  // CRITICAL: Cleanup hook to restore Matrix background on exit
  useEffect(() => {
    return () => {
      gsap.to("body", { backgroundColor: "#050505", color: "#ffffff", duration: 0.5, ease: "power2.out" });
    };
  }, []);

  return (
    <div className={isDark ? "dark" : ""}>
      
      {/* THE FIX: Navigation is now OUTSIDE the <main> tag.
        This prevents GSAP's transformations on <main> from breaking position: fixed.
        Added pointer-events handling so it hovers without blocking clicks.
      */}
      <nav className="fixed top-0 left-0 w-full p-8 md:p-12 lg:px-16 flex justify-between items-center z-[100] mix-blend-difference text-white pointer-events-none">
        <button 
          onClick={() => router.back()}
          className="pointer-events-auto flex items-center gap-4 text-[10px] font-code uppercase tracking-[0.3em] hover:text-primary transition-colors group"
        >
          <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" /> 
          <span>TERMINATE_SESSION</span>
        </button>
        
        <div className="pointer-events-auto flex items-center gap-12">
          <div className="text-[10px] font-code opacity-40 uppercase tracking-[0.5em] hidden md:block">
            VER: v1.0.0
          </div>
          
          <button 
            onClick={() => setIsDark(!isDark)}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-white/20 hover:border-primary hover:text-primary transition-colors"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </nav>

      {/* The isolated scrolling container */}
      <main ref={mainRef} className="bg-[#f4f4f0] dark:bg-[#050505] text-[#050505] dark:text-[#ffffff] h-screen w-full overflow-y-auto overflow-x-hidden font-body selection:bg-primary selection:text-black transition-colors duration-700">
        
        {/* 01. Hero Header */}
        <section className="pt-48 pb-24 px-8 md:px-16 lg:px-24 max-w-screen-2xl mx-auto flex flex-col justify-center min-h-[90vh]">
          <div className="zero-reveal flex items-center gap-3 mb-12 text-primary">
            <Monitor size={14} />
            <span className="text-[10px] font-code tracking-[0.4em] uppercase">Creative Development / Shaders</span>
          </div>
          
          <h1 className="zero-reveal text-[13vw] font-headline font-bold uppercase tracking-tighter leading-[0.8] mb-20">
            Zero<br/>
            <span className="text-[11vw] italic font-light text-black/10 dark:text-white/10" style={{ WebkitTextStroke: isDark ? '2px rgba(255,255,255,0.1)' : '2px rgba(0,0,0,0.1)' }}>Studio.</span>
          </h1>

          <div className="zero-reveal grid grid-cols-1 md:grid-cols-12 gap-16 border-t border-black/10 dark:border-white/10 pt-16">
            <div className="md:col-span-8 lg:col-span-7">
              <h3 className="text-[10px] font-code opacity-40 uppercase tracking-[0.3em] mb-8">[01] ARCHITECTURE_OVERVIEW</h3>
              <p className="text-2xl md:text-4xl font-light leading-[1.2] tracking-tight mb-12">
                A production-grade, Awwwards-level creative studio landing page. Engineered as a single raw file - no build steps, no frameworks. Just pure mathematics, GLSL shaders, and DOM manipulation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
                <a href="https://github.com/Habel2005/zero-digital-creative-studio" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 text-[10px] font-code uppercase tracking-[0.3em] group pointer-events-auto">
                  <Github size={18} className="group-hover:text-primary transition-colors" />
                  <span className="border-b border-black/20 dark:border-white/20 pb-1 group-hover:border-primary transition-colors">View_Source</span>
                </a>
                
                <a href="https://habel2005.github.io/zero-digital-creative-studio/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 text-[10px] font-code uppercase tracking-[0.3em] group text-primary pointer-events-auto">
                  <Globe size={18} />
                  <span className="border-b border-primary/50 pb-1 group-hover:border-primary transition-colors">Launch_Live_Deployment</span>
                </a>
              </div>
            </div>
            
            <div className="md:col-span-4 lg:col-start-9 flex flex-wrap content-start gap-3 mt-8 md:mt-0">
              {['Three.js', 'WebGL', 'GLSL Shaders', 'GSAP', 'Vanilla HTML/JS', 'Math'].map((tag) => (
                 <span key={tag} className="px-5 py-2 border border-black/10 dark:border-white/10 rounded-full text-[9px] font-code uppercase tracking-[0.2em] text-black/60 dark:text-white/60 hover:border-black dark:hover:border-white transition-colors cursor-default">
                   {tag}
                 </span>
              ))}
            </div>
          </div>
        </section>

        {/* 02. The Engine Room */}
        <section className="py-24 px-8 md:px-16 lg:px-24 max-w-screen-2xl mx-auto w-full border-t border-black/10 dark:border-white/10">
          <div className="flex items-center gap-6 mb-16">
            <div className="w-12 h-px bg-primary/40"></div>
            <h3 className="text-[10px] font-code opacity-40 uppercase tracking-[0.4em]">[02] THE_RENDER_PIPELINE</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 feature-grid">
            
            {/* GLSL Shader Engine */}
            <div className="feature-card bg-[#f4f4f0] dark:bg-[#050505] p-12 md:p-16 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors group">
              <Code2 className="text-primary mb-12" size={32} />
              <h4 className="text-2xl font-headline font-bold uppercase tracking-tight mb-6 text-black dark:text-white">GLSL Fragment Shaders</h4>
              <div className="space-y-4">
                <p className="text-sm font-light text-black/60 dark:text-white/60 leading-relaxed">
                  A full-screen custom fragment shader utilizes domain-warped 4-octave simplex noise to create a living, dark fluid atmosphere that reacts instantly to mouse coordinates.
                </p>
                <div className="text-[10px] font-code text-primary/80 uppercase tracking-widest pt-4 border-t border-black/5 dark:border-white/5">
                  Performance: 60FPS Locked
                </div>
              </div>
            </div>

            {/* Three.js Geometry */}
            <div className="feature-card bg-[#f4f4f0] dark:bg-[#050505] p-12 md:p-16 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors group">
              <Layers className="text-primary mb-12" size={32} />
              <h4 className="text-2xl font-headline font-bold uppercase tracking-tight mb-6 text-black dark:text-white">Dual-Scene WebGL</h4>
              <div className="space-y-4">
                <p className="text-sm font-light text-black/60 dark:text-white/60 leading-relaxed">
                  Engineered a complex dual-scene renderer combining an orthographic background with a perspective 3D overlay. Features a triple-layered wireframe TorusKnot utilizing varying p/q ratios.
                </p>
                <div className="text-[10px] font-code text-primary/80 uppercase tracking-widest pt-4 border-t border-black/5 dark:border-white/5">
                  Topology: Non-intersecting Curves
                </div>
              </div>
            </div>

            {/* GSAP Choreography */}
            <div className="feature-card bg-[#f4f4f0] dark:bg-[#050505] p-12 md:p-16 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors group">
              <Sparkles className="text-primary mb-12" size={32} />
              <h4 className="text-2xl font-headline font-bold uppercase tracking-tight mb-6 text-black dark:text-white">Spatial Choreography</h4>
              <div className="space-y-4">
                <p className="text-sm font-light text-black/60 dark:text-white/60 leading-relaxed">
                  DOM elements are deeply bound to GSAP ScrollTriggers. Includes split-line text reveals (115% translateY masks), scroll-driven 3D card tilts, and a custom kinetic cursor.
                </p>
                <div className="text-[10px] font-code text-primary/80 uppercase tracking-widest pt-4 border-t border-black/5 dark:border-white/5">
                  Engine: GSAP Core + ScrollTrigger
                </div>
              </div>
            </div>

            {/* GPU Particle System */}
            <div className="feature-card bg-[#f4f4f0] dark:bg-[#050505] p-12 md:p-16 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors group">
              <Cpu className="text-primary mb-12" size={32} />
              <h4 className="text-2xl font-headline font-bold uppercase tracking-tight mb-6 text-black dark:text-white">GPU Particle Field</h4>
              <div className="space-y-4">
                <p className="text-sm font-light text-black/60 dark:text-white/60 leading-relaxed">
                  A 1,500-point particle field drifting through spatial coordinates. Mathematical calculations are offloaded to GPU buffers, ensuring strict cross-device performance without a heavy framework overhead.
                </p>
                <div className="text-[10px] font-code text-primary/80 uppercase tracking-widest pt-4 border-t border-black/5 dark:border-white/5">
                  Buffer: Float32Array Geometry
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 03. Infinite Marquee */}
        <section className="marquee-container py-32 overflow-hidden bg-primary text-black">
          <div className="marquee-inner flex whitespace-nowrap text-[8vw] font-headline font-bold uppercase tracking-tighter w-max">
            <span className="px-8 italic">Raw Computation •</span>
            <span className="px-8 italic">Raw Computation •</span>
            <span className="px-8 italic">Raw Computation •</span>
            <span className="px-8 italic">Raw Computation •</span>
            <span className="px-8 italic">Raw Computation •</span>
          </div>
        </section>

        {/* 04. Editorial Footer */}
        <footer className="py-32 px-8 md:px-16 lg:px-24 flex flex-col md:flex-row justify-between items-start md:items-center gap-12 bg-[#f4f4f0] dark:bg-[#050505] transition-colors duration-700">
          <div className="text-[10px] font-code opacity-40 uppercase tracking-[0.2em] font-bold">
            ENGINEERED BY HABEL • CREATIVE DEVELOPMENT
          </div>
          
          <button 
            onClick={() => router.back()} 
            className="text-4xl md:text-[5vw] lg:text-[4vw] font-headline font-bold uppercase tracking-tighter hover:text-primary transition-colors flex items-center gap-8 group relative pointer-events-auto"
          >
            <span className="text-[10px] font-code opacity-20 uppercase tracking-[0.5em] absolute -top-10 left-0">BACK_TO_HOME</span>
            <span>INDEX</span>
            <ArrowLeft className="w-10 h-10 md:w-16 md:h-16 group-hover:-translate-x-4 transition-transform duration-500 ease-out" />
          </button>
        </footer>
      </main>
    </div>
  );
}