
"use client";

import { useRouter } from "next/navigation";
import { X, Gauge, Layout, Zap, ExternalLink } from "lucide-react";
import { useEffect } from "react";
import gsap from "gsap";

export default function WebTemplatePage() {
  const router = useRouter();

  useEffect(() => {
    gsap.set("body", { backgroundColor: "#ffffff", color: "#000000" });
    
    gsap.from(".web-reveal", {
      opacity: 0,
      scale: 0.98,
      duration: 1.5,
      ease: "expo.out"
    });
  }, []);

  const handleBack = () => {
    window.location.href = "/";
  };

  return (
    <main className="bg-white min-h-screen text-black selection:bg-primary selection:text-black">
      <nav className="fixed top-0 left-0 w-full p-12 flex justify-between items-center z-50">
        <button onClick={handleBack} className="text-metadata tracking-widest hover:text-primary transition-colors flex items-center gap-2">
          <X className="w-4 h-4" /> [ BACK ]
        </button>
        <div className="text-metadata opacity-30">TYPE: PERFORMANCE_BENCHMARK</div>
      </nav>

      <section className="pt-64 px-12 max-w-6xl mx-auto pb-64 web-reveal">
        <div className="space-y-8 mb-48">
          <h1 className="text-[12vw] font-headline font-bold leading-none uppercase tracking-tighter">
            Web <span className="opacity-20 italic">Vitals.</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
            <p className="text-2xl font-light leading-relaxed">
              A hyper-optimized React template focusing on Lighthouse metrics, responsive layout shifts, and semantic DOM structures.
            </p>
            <div className="space-y-12">
              <div className="flex gap-12 items-center">
                <Gauge className="w-12 h-12 text-primary" />
                <div>
                  <div className="text-5xl font-bold">100</div>
                  <div className="text-metadata opacity-40">PERFORMANCE_SCORE</div>
                </div>
              </div>
              <div className="flex gap-12 items-center">
                <Zap className="w-12 h-12 text-primary" />
                <div>
                  <div className="text-5xl font-bold">0.4s</div>
                  <div className="text-metadata opacity-40">LCP_TIME</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full aspect-[21/9] bg-neutral-100 mb-64 group relative overflow-hidden border border-black/5">
          <img src="https://picsum.photos/seed/web-case/1600/800" className="w-full h-full object-cover brightness-95 group-hover:scale-105 transition-transform duration-[2s]" alt="Web Layout" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/40 backdrop-blur-sm">
            <button className="px-8 py-4 bg-black text-white text-metadata rounded-full flex items-center gap-2">
              LIVE_DEMO <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
          <div className="space-y-8">
            <h3 className="text-4xl font-headline font-bold uppercase tracking-tight">Responsive Logic</h3>
            <p className="opacity-60 text-lg leading-relaxed">
              Every breakpoint is manually tuned for editorial precision. No generic grid frameworks. Only custom flex and CSS grid layouts.
            </p>
          </div>
          <div className="space-y-8">
            <h3 className="text-4xl font-headline font-bold uppercase tracking-tight">Clean Codebase</h3>
            <p className="opacity-60 text-lg leading-relaxed">
              TypeScript-first approach with rigorous component modularity. Designed for scale and maintainability in production environments.
            </p>
          </div>
        </div>
      </section>

      <footer className="p-12 border-t border-black/10 flex justify-between items-center text-metadata">
        <span className="opacity-40">© 2025 HABEL STUDIO</span>
        <button onClick={handleBack} className="hover:text-primary transition-colors">GO_HOME_ [00]</button>
      </footer>
    </main>
  );
}
