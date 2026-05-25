"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, MousePointer2, Layers, Cpu, ArrowRight, Monitor } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ZeroStudioPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set("body", { backgroundColor: "#050505", color: "#ffffff" });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".zero-reveal", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "expo.out",
      });

      gsap.to(".marquee-inner", {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".marquee-container",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleBack = () => {
    window.location.href = "/";
  };

  return (
    <main ref={containerRef} className="bg-[#050505] min-h-screen text-white font-body selection:bg-primary selection:text-void-black">
      {/* Editorial Navigation */}
      <nav className="fixed top-0 left-0 w-full p-8 md:p-12 flex justify-between items-center z-50">
        <button 
          onClick={handleBack}
          className="flex items-center gap-4 text-metadata hover:text-primary transition-colors group"
        >
          <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" /> 
          <span>EXIT_ARCHIVE</span>
        </button>
        <div className="text-metadata opacity-40 uppercase tracking-[0.4em]">
          FILE_REF: ZERO_STUDIO_v2
        </div>
      </nav>

      {/* Hero Header */}
      <section className="pt-48 px-8 md:px-16 lg:px-24 max-w-screen-2xl mx-auto min-h-screen flex flex-col justify-center">
        <div className="zero-reveal flex items-center gap-3 mb-12 text-primary">
          <Monitor size={14} />
          <span className="text-metadata tracking-[0.3em]">GL_ENGINE_V3</span>
        </div>
        
        <h1 className="zero-reveal text-[15vw] font-headline font-bold uppercase tracking-tighter leading-[0.75] mb-24">
          Zero <br/><span className="text-transparent italic" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.2)' }}>Digital.</span>
        </h1>
        
        <div className="zero-reveal grid grid-cols-12 gap-12 border-t border-white/10 pt-16">
          <div className="col-span-12 lg:col-span-5">
            <h3 className="text-metadata text-white/40 mb-6">[01] MISSION</h3>
            <p className="text-2xl md:text-4xl leading-tight font-light tracking-tight italic">
              Pushing the boundaries of browser-based rendering through custom GLSL shaders and spatial interaction logic.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-end">
            <div className="flex flex-wrap gap-4 text-metadata">
              <span className="px-4 py-2 border border-white/10 rounded-full">Three.js</span>
              <span className="px-4 py-2 border border-white/10 rounded-full">WebGL</span>
              <span className="px-4 py-2 border border-white/10 rounded-full">GLSL</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section: The Art of Rendering */}
      <section className="py-64 px-8 border-y border-white/10">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-12 gap-12 items-center">
          <div className="col-span-12 lg:col-span-5 space-y-12">
            <div className="w-12 h-12 bg-primary flex items-center justify-center text-void-black">
              <Layers size={20} />
            </div>
            <h2 className="text-6xl font-headline font-bold uppercase tracking-tighter leading-none">
              Spatial <br/><span className="text-primary italic">Particles.</span>
            </h2>
            <p className="text-xl opacity-60 font-light leading-relaxed">
              Custom vertex and fragment shaders generating thousands of performant, interactive particles calculated entirely on the GPU.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-7 aspect-video bg-white/5 border border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
               <div className="text-[20vw] font-bold tracking-tighter uppercase italic select-none">GLSL</div>
            </div>
            <div className="absolute bottom-8 left-8 text-metadata opacity-40">
              FRAMEBUFFER_OBJECT // 60FPS_LOCKED
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Marquee Section */}
      <section className="marquee-container py-32 overflow-hidden bg-primary text-void-black">
        <div className="marquee-inner flex whitespace-nowrap text-[8vw] font-headline font-bold uppercase tracking-tighter w-max">
          <span className="px-8 italic">Rendering the Future •</span>
          <span className="px-8 italic">Rendering the Future •</span>
          <span className="px-8 italic">Rendering the Future •</span>
          <span className="px-8 italic">Rendering the Future •</span>
        </div>
      </section>

      {/* Technical Deep Dive */}
      <section className="py-64 px-8 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {[
            { icon: Cpu, title: "GPU Optimization", desc: "Offloading complex math to GPU buffers for maximum frame rate stability." },
            { icon: MousePointer2, title: "Kinetic UI", desc: "GSAP-powered cursor logic bound to DOM elements with buttery-smooth interpolation." }
          ].map((item, i) => (
            <div key={i} className="bg-[#050505] p-16 hover:bg-white/[0.02] transition-colors group">
              <item.icon className="text-white/20 group-hover:text-primary mb-12 transition-colors" size={40} />
              <h4 className="text-2xl font-bold uppercase tracking-tight mb-6">{item.title}</h4>
              <p className="text-sm text-white/50 leading-relaxed uppercase tracking-widest">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Navigation */}
      <footer className="py-32 px-12 border-t border-white/10 flex justify-between items-center bg-[#050505]">
        <div className="text-metadata opacity-20 tracking-widest uppercase italic">END_OF_TRANSMISSION</div>
        <button 
          onClick={() => window.location.href = "/projects/kolo"}
          className="text-4xl md:text-[6vw] font-headline font-bold uppercase tracking-tighter hover:text-primary transition-colors flex items-center gap-8 group"
        >
          <span>KOLO_APP</span>
          <ArrowRight className="w-12 h-12 md:w-20 md:h-20 group-hover:translate-x-4 transition-transform" />
        </button>
      </footer>
    </main>
  );
}
