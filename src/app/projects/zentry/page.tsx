"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { X, Terminal, Database, Server, Zap, Globe, Cpu, ArrowRight } from "lucide-react";
import Transmission02 from "./Transmission02";

export default function ZentryProjectPage() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set("body", { backgroundColor: "#050505", color: "#ffffff" });

    const tl = gsap.timeline();
    tl.fromTo(".zentry-reveal", 
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out"
      }
    );
  }, []);

  const handleBack = () => {
    window.location.href = "/";
  };

  return (
    <main className="bg-[#050505] min-h-screen text-white font-body selection:bg-primary selection:text-void-black">
      {/* Editorial Navigation */}
      <nav className="fixed top-0 left-0 w-full p-8 md:p-12 flex justify-between items-center z-50">
        <button 
          onClick={handleBack}
          className="flex items-center gap-4 text-metadata hover:text-primary transition-colors group"
        >
          <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" /> 
          <span>EXIT_STATION</span>
        </button>
        <div className="text-metadata opacity-40 uppercase tracking-[0.4em]">
          PROJECT_FILE: ZENTRY_AI_v1.0
        </div>
      </nav>

      {/* Hero Header */}
      <section ref={headerRef} className="pt-48 px-8 md:px-16 lg:px-24 max-w-screen-2xl mx-auto min-h-[90vh] flex flex-col justify-center">
        <div className="zentry-reveal flex items-center gap-3 mb-12 text-primary">
          <Terminal size={14} />
          <span className="text-metadata tracking-[0.3em]">LOCAL_INFRASTRUCTURE</span>
        </div>
        
        <h1 className="zentry-reveal text-[14vw] font-headline font-bold uppercase tracking-tighter leading-[0.75] mb-24">
          Zentry <br/><span className="italic text-white/20">Telephony.</span>
        </h1>
        
        <div className="zentry-reveal grid grid-cols-12 gap-12 border-t border-white/10 pt-16">
          <div className="col-span-12 lg:col-span-5">
            <h3 className="text-metadata text-white/40 mb-6">[01] CONTEXT</h3>
            <p className="text-2xl md:text-3xl leading-tight font-light tracking-tight">
              Privacy-first Malayalam telephony agent. Designed to eliminate the latency of cloud APIs by running entirely on local NVIDIA hardware.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-end">
            <div className="flex flex-wrap gap-4 text-metadata">
              <span className="px-4 py-2 border border-white/10 rounded-full">RTX_3080_Ti</span>
              <span className="px-4 py-2 border border-white/10 rounded-full">MALAYALAM_RAG</span>
              <span className="px-4 py-2 border border-white/10 rounded-full">LOW_LATENCY</span>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Visual Layer */}
      <Transmission02 />

      {/* Technical Deep Dive */}
      <section className="py-64 px-8 md:px-16 lg:px-24 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-12 gap-8 mb-32">
          <div className="col-span-12 lg:col-span-4">
            <h2 className="text-5xl font-headline font-bold uppercase tracking-tighter mb-12">
              The Engine <br/><span className="text-primary italic">Room.</span>
            </h2>
            <p className="text-metadata opacity-40 max-w-xs leading-relaxed">
              Zentry is not an API wrapper. It is a fully localized pipeline designed for speed, privacy, and contextual accuracy.
            </p>
          </div>
          
          <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
            {[
              { icon: Database, title: "Contextual RAG", desc: "Utilizing ChromaDB to query factually grounded data directly from official documentation." },
              { icon: Zap, title: "Local Inference", desc: "Llama.cpp optimized for local GPU hardware to achieve <2s end-to-end response times." },
              { icon: Server, title: "SIP Integration", desc: "FreeSWITCH core engine managing real-time audio streams via high-performance SIP trunks." },
              { icon: Cpu, title: "Speech Pipeline", desc: "Fine-tuned Faster-Whisper coupled with MMS TTS for natural, dialect-aware conversation." }
            ].map((tech, i) => (
              <div key={i} className="bg-[#050505] p-12 hover:bg-white/[0.02] transition-colors group">
                <tech.icon className="text-white/20 group-hover:text-primary mb-8 transition-colors" size={24} />
                <h4 className="text-xl font-bold uppercase tracking-tight mb-4">{tech.title}</h4>
                <p className="text-sm text-white/50 leading-relaxed">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Layer */}
      <section className="py-48 px-8 bg-white text-void-black">
        <div className="max-w-screen-2xl mx-auto flex flex-col items-center text-center">
           <div className="text-metadata mb-12 opacity-40 tracking-[0.4em]">VALIDATION_LOG</div>
           <h2 className="text-6xl md:text-[8vw] font-headline font-bold uppercase tracking-tighter mb-24">
              Proven <span className="italic text-primary">Utility.</span>
           </h2>
           <div className="flex flex-wrap justify-center gap-6">
              {["IJERT Published", "YIP 8.0 Winner", "ICFOSS Panel", "Live Expo Tested"].map((tag) => (
                <span key={tag} className="px-8 py-4 border border-void-black/10 text-xs font-code uppercase tracking-widest hover:bg-void-black hover:text-white transition-all cursor-default">
                  {tag}
                </span>
              ))}
           </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <footer className="py-32 px-8 border-t border-white/10 flex justify-between items-center bg-[#050505]">
        <div className="text-metadata opacity-20 tracking-widest uppercase italic">END_OF_CASE_STUDY</div>
        <button 
          onClick={() => window.location.href = "/projects/learnquest"}
          className="text-4xl md:text-[6vw] font-headline font-bold uppercase tracking-tighter hover:text-primary transition-colors flex items-center gap-8 group"
        >
          <span>LEARNQUEST</span>
          <ArrowRight className="w-12 h-12 md:w-20 md:h-20 group-hover:translate-x-4 transition-transform" />
        </button>
      </footer>
    </main>
  );
}
