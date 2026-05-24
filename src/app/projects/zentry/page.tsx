
"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, X, Cpu, Activity, ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import gsap from "gsap";

export default function ZentryPage() {
  const router = useRouter();

  useEffect(() => {
    gsap.set("body", { backgroundColor: "#050505", color: "#ffffff" });
    
    const tl = gsap.timeline();
    tl.from(".reveal", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "expo.out"
    });
  }, []);

  const handleBack = () => {
    window.location.href = "/";
  };

  return (
    <main className="bg-void-black min-h-screen text-white selection:bg-primary selection:text-void-black">
      <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50 mix-blend-difference">
        <button onClick={handleBack} className="flex items-center gap-2 text-metadata hover:text-primary transition-colors group">
          <X className="w-4 h-4 group-hover:rotate-90 transition-transform" /> 
          <span>CLOSE_VAULT</span>
        </button>
        <div className="text-metadata opacity-40">SYSTEM_RECOGNITION: ZENTRY_v1.0</div>
      </nav>

      <section className="pt-48 px-8 max-w-7xl mx-auto pb-48">
        <div className="mb-32">
          <div className="text-metadata text-primary mb-4 reveal">PROJECT_ID: 001</div>
          <h1 className="text-[12vw] font-headline font-bold leading-[0.8] uppercase tracking-tighter reveal">
            ZENTRY.
          </h1>
          <p className="text-2xl md:text-4xl mt-12 max-w-4xl opacity-70 font-body reveal">
            A high-security local AI infrastructure designed for privacy-first enterprise environments.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-12 mb-64">
          <div className="col-span-12 lg:col-span-8 h-[70vh] bg-white/5 border border-white/10 overflow-hidden reveal">
            <img src="https://picsum.photos/seed/zentry-arch/1600/1200" className="w-full h-full object-cover grayscale brightness-50" alt="Architecture" />
          </div>
          <div className="col-span-12 lg:col-span-4 flex flex-col justify-end space-y-12 reveal">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-code text-xs">
                <Cpu className="w-4 h-4" /> LOCAL_MODELS
              </div>
              <h3 className="text-2xl font-bold uppercase">STT / TTS / RAG Pipeline</h3>
              <p className="text-sm opacity-50 leading-relaxed">
                Full-stack integration of local LLMs for speech processing and real-time retrieval-augmented generation. 0ms external data leakage.
              </p>
            </div>
            <div className="space-y-4 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2 text-primary font-code text-xs">
                <Activity className="w-4 h-4" /> PERFORMANCE
              </div>
              <h3 className="text-2xl font-bold uppercase">Telephony Agent</h3>
              <p className="text-sm opacity-50 leading-relaxed">
                Low-latency voice agents running on dedicated local nodes. Engineered for high-frequency call environments.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal">
          {[
            { label: 'Security', value: 'ShieldCheck', desc: 'Hardware-level encryption' },
            { label: 'Latency', value: 'Activity', desc: 'Sub-100ms response time' },
            { label: 'Integrity', value: 'Cpu', desc: 'No cloud dependencies' }
          ].map((stat) => (
            <div key={stat.label} className="p-8 border border-white/10 bg-white/5">
              <div className="text-primary mb-4">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div className="text-metadata mb-2">{stat.label}</div>
              <p className="text-sm opacity-50">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 py-48 px-8 flex justify-between items-center bg-white text-void-black mt-64">
        <div className="text-metadata opacity-40">EXIT_STREAM</div>
        <button onClick={handleBack} className="text-4xl md:text-[8vw] font-headline font-bold uppercase tracking-tighter hover:text-primary transition-all">
          RETURN_TO_VOID
        </button>
      </footer>
    </main>
  );
}
