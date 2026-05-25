"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { X, Smartphone, Users, Brain, Split, Zap, ArrowRight, Layout } from "lucide-react";

export default function LearnQuestPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set("body", { backgroundColor: "#f9f8f5", color: "#050505" });

    const ctx = gsap.context(() => {
      gsap.from(".lq-reveal", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out"
      });

      // Semantic split animation
      gsap.to(".split-card", {
        y: -20,
        stagger: {
          each: 0.2,
          repeat: -1,
          yoyo: true
        },
        ease: "power1.inOut"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleBack = () => { window.location.href = "/"; };

  return (
    <main ref={containerRef} className="bg-[#f9f8f5] min-h-screen text-void-black font-body selection:bg-primary selection:text-void-black">
      {/* Editorial Navigation */}
      <nav className="fixed top-0 left-0 w-full p-8 md:p-12 flex justify-between items-center z-50">
        <button onClick={handleBack} className="flex items-center gap-4 text-metadata hover:text-primary transition-colors group">
          <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
          <span>CLOSE_STATION</span>
        </button>
        <div className="text-metadata opacity-40 uppercase tracking-[0.4em]">PROJECT_FILE: LEARNQUEST_v0.1</div>
      </nav>

      {/* Luxury Header */}
      <section className="pt-48 pb-32 px-8 md:px-16 lg:px-24 max-w-screen-2xl mx-auto min-h-screen flex flex-col justify-center">
        <div className="lq-reveal flex items-center gap-3 mb-12">
          <Smartphone size={14} className="text-primary" />
          <span className="text-metadata tracking-[0.3em] opacity-40">MOBILE_ECOSYSTEM</span>
        </div>
        
        <h1 className="lq-reveal text-[12vw] font-headline font-bold uppercase tracking-tighter leading-[0.75] mb-24">
          Learn<span className="text-primary italic">Quest.</span>
        </h1>

        <div className="lq-reveal grid grid-cols-12 gap-12 border-t border-void-black/10 pt-16">
          <div className="col-span-12 lg:col-span-6">
            <h3 className="text-metadata opacity-40 mb-6">[01] MISSION</h3>
            <p className="text-2xl md:text-4xl leading-tight font-light tracking-tight">
              Redefining the learning curve through high-retention semantic digestion and social accountability systems.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-6 flex flex-col justify-end gap-12">
            <div className="flex gap-4">
               <span className="px-4 py-2 bg-void-black text-white text-[10px] font-code uppercase tracking-widest">iOS_Native</span>
               <span className="px-4 py-2 border border-void-black/10 text-[10px] font-code uppercase tracking-widest">AI_Powered</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section: The Grid */}
      <section className="py-64 px-8 border-t border-void-black/10 bg-white">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-12 gap-12 items-center">
            <div className="col-span-12 lg:col-span-5 space-y-12">
                <div className="w-12 h-12 bg-primary flex items-center justify-center text-void-black">
                    <Split size={20} />
                </div>
                <h2 className="text-6xl font-headline font-bold uppercase tracking-tighter leading-none">
                    Semantic <br/><span className="text-white bg-void-black px-4">Splitting.</span>
                </h2>
                <p className="text-xl opacity-60 font-light leading-relaxed">
                    Our LLM-powered parser breaks down complex architectural documentation into "Semantic Shards"—the smallest units of meaning for instant retention.
                </p>
            </div>

            <div className="col-span-12 lg:col-span-7 flex flex-col gap-6 relative">
                <div className="p-12 bg-[#f9f8f5] border border-void-black/5 rounded-2xl opacity-40">
                  <p className="text-sm font-code leading-relaxed">
                    Microlearning is an approach that uses small, manageable pieces of information to help people learn new skills. It is effective because it focuses on a single concept at a time...
                  </p>
                </div>
                <div className="flex flex-col gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm">
                    <div className="split-card p-6 bg-white shadow-2xl border border-primary/20 text-sm font-bold uppercase tracking-tighter">
                      "Small, manageable pieces of info."
                    </div>
                    <div className="split-card p-6 bg-white shadow-2xl border border-primary/20 text-sm font-bold uppercase tracking-tighter">
                      "Focus on a single concept."
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Feature Section: The Buddy System */}
      <section className="py-64 px-8 max-w-screen-2xl mx-auto text-center">
        <div className="text-metadata mb-12 opacity-40 tracking-[0.4em]">COLLABORATIVE_INTELLIGENCE</div>
        <h2 className="text-[8vw] font-headline font-bold uppercase tracking-tighter mb-32">
          The <span className="italic">Buddy</span> System.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: Zap, label: "Kinetic Focus", desc: "Real-time synchronization of learning sessions." },
            { icon: Users, label: "Peer Validation", desc: "Collaborative proof-of-work for semantic retention." },
            { icon: Layout, label: "Spatial UI", desc: "An interface that respects the laws of cognitive load." }
          ].map((item, i) => (
            <div key={i} className="p-16 border border-void-black/5 hover:border-primary transition-colors group">
              <item.icon className="mx-auto mb-12 text-void-black/20 group-hover:text-primary transition-colors" size={40} />
              <h4 className="text-xl font-bold uppercase tracking-tight mb-4">{item.label}</h4>
              <p className="text-xs opacity-40 uppercase tracking-widest">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* High-Fashion Mockup Display */}
      <section className="py-64 px-8 bg-void-black text-white overflow-hidden">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-12 gap-24 items-center">
            <div className="col-span-12 lg:col-span-4">
                <h3 className="text-4xl font-headline font-bold uppercase tracking-tighter mb-8">
                  Architectural <br/>Design.
                </h3>
                <p className="text-metadata opacity-40 leading-loose">
                  THE INTERFACE REJECTS THE FRICTION OF STANDARD EDTECH. EVERY GESTURE IS MAPPED TO SPATIAL MOMENTUM.
                </p>
            </div>
            <div className="col-span-12 lg:col-span-8">
                <div className="aspect-[16/9] bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden group">
                  <div className="w-[300px] h-[600px] bg-white rounded-[40px] border-[12px] border-white/10 shadow-2xl overflow-hidden">
                      <div className="p-8 space-y-8 h-full flex flex-col">
                        <div className="w-12 h-12 bg-primary rounded-xl" />
                        <div className="space-y-4">
                          <div className="h-4 w-full bg-void-black/5 rounded" />
                          <div className="h-4 w-2/3 bg-void-black/5 rounded" />
                        </div>
                        <div className="mt-auto h-24 w-full bg-void-black rounded-2xl" />
                      </div>
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute top-12 right-12 text-[10vw] font-bold opacity-5 italic uppercase">MOBILE</div>
                </div>
            </div>
        </div>
      </section>

      {/* Editorial Footer */}
      <footer className="py-32 px-12 border-t border-void-black/10 flex justify-between items-center bg-[#f9f8f5]">
        <div className="text-metadata opacity-20 tracking-widest uppercase italic">END_OF_TRANSMISSION</div>
        <button 
          onClick={() => window.location.href = "/projects/web-template"}
          className="text-4xl md:text-[6vw] font-headline font-bold uppercase tracking-tighter hover:text-primary transition-colors flex items-center gap-8 group"
        >
          <span>WEB_VITALS</span>
          <ArrowRight className="w-12 h-12 md:w-20 md:h-20 group-hover:translate-x-4 transition-transform" />
        </button>
      </footer>
    </main>
  );
}
