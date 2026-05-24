
"use client";

import { X, Layers, Box, Maximize, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import gsap from "gsap";

export default function ArchitecturePage() {
  useEffect(() => {
    gsap.set("body", { backgroundColor: "#0D0D0E", color: "#ffffff" });
    
    gsap.from(".arch-reveal", {
      y: 60,
      opacity: 0,
      duration: 1.4,
      stagger: 0.15,
      ease: "expo.out"
    });
  }, []);

  const handleBack = () => {
    window.location.href = "/";
  };

  return (
    <main className="bg-deep-obsidian min-h-screen text-white selection:bg-primary selection:text-void-black font-body">
      <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50">
        <button onClick={handleBack} className="flex items-center gap-2 text-metadata hover:text-primary transition-colors group">
          <X className="w-4 h-4 group-hover:rotate-90 transition-transform" /> 
          <span>CLOSE_STATION</span>
        </button>
        <div className="text-metadata opacity-40 uppercase">SPATIAL_LOGIC: ARCH_v4.2</div>
      </nav>

      <section className="pt-48 px-8 max-w-7xl mx-auto pb-64">
        <div className="mb-48 arch-reveal">
          <div className="text-metadata text-primary mb-4">PROJECT_ID: 004</div>
          <h1 className="text-[12vw] font-headline font-bold leading-[0.75] uppercase tracking-tighter">
            Spatial <br/><span className="italic">Systems.</span>
          </h1>
        </div>

        <div className="grid grid-cols-12 gap-8 mb-64">
          <div className="col-span-12 lg:col-span-7 arch-reveal">
            <div className="aspect-[16/10] bg-white/5 border border-white/10 relative overflow-hidden group">
              <img src="https://picsum.photos/seed/arch-1/1600/1000" className="w-full h-full object-cover grayscale brightness-50 group-hover:scale-105 transition-transform duration-[3s]" alt="Spatial Layout" />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-obsidian via-transparent to-transparent opacity-80" />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-center space-y-16 arch-reveal p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-code text-xs">
                <Layers className="w-4 h-4" /> VOLUMETRIC_DEPTH
              </div>
              <h3 className="text-3xl font-bold uppercase tracking-tight">Multi-Layer Interactivity</h3>
              <p className="text-base opacity-50 leading-relaxed font-light">
                Constructing digital environments that respect the laws of physics and spatial awareness. Every interaction is mapped to a Z-axis coordinate system.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-code text-xs">
                <Box className="w-4 h-4" /> SHADER_PIPELINE
              </div>
              <h3 className="text-3xl font-bold uppercase tracking-tight">GPU-Accelerated Visuals</h3>
              <p className="text-base opacity-50 leading-relaxed font-light">
                High-performance WebGL implementations that offload complex animations to the hardware, ensuring 60fps cinematic fidelity on high-density displays.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 arch-reveal">
          <div className="col-span-12 md:col-span-4 aspect-square border border-white/10 p-12 flex flex-col justify-between hover:bg-white/5 transition-colors group">
             <Maximize className="w-8 h-8 text-primary group-hover:rotate-45 transition-transform" />
             <div>
               <div className="text-metadata mb-2">SCALABILITY</div>
               <p className="text-xs opacity-40">Modular architecture designed for infinite expansion across spatial domains.</p>
             </div>
          </div>
          <div className="col-span-12 md:col-span-8 bg-white/5 border border-white/10 p-12">
             <h2 className="text-5xl font-headline font-bold uppercase tracking-tighter mb-8">
               Architectural <span className="text-primary italic">Integrity.</span>
             </h2>
             <p className="text-xl opacity-60 max-w-2xl leading-relaxed">
               We don't just build websites; we design digital monoliths. Every structural decision is informed by the rhythm of the user's journey through the void.
             </p>
          </div>
        </div>
      </section>

      <footer className="py-32 px-8 border-t border-white/5 bg-white text-void-black">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-metadata opacity-40 tracking-widest">END_OF_TRANSMISSION</div>
          <button onClick={handleBack} className="text-4xl md:text-[8vw] font-headline font-bold uppercase tracking-tighter hover:text-primary transition-all flex items-center gap-8 group">
            <span>RETURN</span>
            <ArrowRight className="w-12 h-12 md:w-24 md:h-24 group-hover:translate-x-4 transition-transform" />
          </button>
        </div>
      </footer>
    </main>
  );
}
