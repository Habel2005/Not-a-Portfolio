"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { X, Smartphone, Code2, Compass, ArrowLeft, ShieldCheck } from "lucide-react";

export default function KoloAppPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Deep midnight blue for luxury contrast
    gsap.set("body", { backgroundColor: "#020813", color: "#F0F4F8" });

    const ctx = gsap.context(() => {
      gsap.from(".kolo-reveal", {
        y: 60,
        opacity: 0,
        duration: 1.5,
        stagger: 0.15,
        ease: "expo.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleBack = () => {
    window.location.href = "/";
  };

  return (
    <main ref={containerRef} className="bg-[#020813] min-h-screen text-[#F0F4F8] font-body selection:bg-primary selection:text-void-black">
      {/* Editorial Navigation */}
      <nav className="fixed top-0 left-0 w-full p-8 md:p-12 flex justify-between items-center z-50">
        <button 
          onClick={handleBack}
          className="flex items-center gap-4 text-metadata hover:text-primary transition-colors group"
        >
          <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" /> 
          <span>CLOSE_ARCHIVE</span>
        </button>
        <div className="text-metadata opacity-40 uppercase tracking-[0.4em]">
          PROJECT_FILE: KOLO_NATIVE_v1
        </div>
      </nav>

      {/* Hero Header */}
      <section className="pt-48 pb-32 px-8 md:px-16 lg:px-24 max-w-screen-2xl mx-auto min-h-screen flex flex-col justify-center">
        <div className="kolo-reveal flex items-center gap-3 mb-12">
          <Smartphone size={14} className="text-primary" />
          <span className="text-metadata tracking-[0.3em] opacity-60">NATIVE_ANDROID_SYSTEM</span>
        </div>
        
        <h1 className="kolo-reveal text-[15vw] font-headline font-bold uppercase tracking-tighter leading-[0.75] mb-24">
          Kolo <br/><span className="italic text-white/10">App.</span>
        </h1>

        <div className="kolo-reveal grid grid-cols-12 gap-12 border-t border-white/5 pt-16">
          <div className="col-span-12 lg:col-span-6">
            <h3 className="text-metadata opacity-40 mb-6">[01] CONTEXT</h3>
            <p className="text-2xl md:text-4xl leading-tight font-light tracking-tight">
              A dedicated prayer companion application. Built natively from the ground up for absolute stability and offline precision.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-6 flex flex-col justify-end gap-8">
            <div className="flex gap-4">
               <span className="px-4 py-2 bg-white/5 border border-white/10 text-[10px] font-code uppercase tracking-widest">Kotlin_Native</span>
               <span className="px-4 py-2 bg-primary text-void-black text-[10px] font-code uppercase tracking-widest">Offline_First</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section: The Architecture */}
      <section className="py-64 px-8 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-12 gap-12 items-center">
          <div className="col-span-12 lg:col-span-5 space-y-12">
            <div className="w-12 h-12 bg-primary/20 flex items-center justify-center text-primary">
              <Code2 size={20} />
            </div>
            <h2 className="text-6xl font-headline font-bold uppercase tracking-tighter leading-none">
              Pure <br/><span className="text-white italic">Engineering.</span>
            </h2>
            <p className="text-xl opacity-60 font-light leading-relaxed">
              Leveraging Kotlin Coroutines and Flow for seamless background calculations, ensuring the UI thread remains perfectly fluid.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            {[
              { icon: Compass, title: "Local Algorithmic Precision", desc: "Offline-first calculation of times based on device coordinates." },
              { icon: ShieldCheck, title: "Privacy Infrastructure", desc: "Zero tracking, zero analytics, zero external API dependencies." }
            ].map((item, i) => (
              <div key={i} className="bg-[#020813] p-12 border border-white/5 hover:border-primary/30 transition-colors">
                <item.icon className="text-primary mb-8" size={32} />
                <h4 className="text-xl font-bold uppercase tracking-tight mb-4">{item.title}</h4>
                <p className="text-xs opacity-40 uppercase tracking-widest leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Showcase */}
      <section className="py-64 px-8 max-w-screen-2xl mx-auto text-center">
        <div className="text-metadata mb-12 opacity-40 tracking-[0.4em]">INTERFACE_STUDY</div>
        <h2 className="text-[10vw] font-headline font-bold uppercase tracking-tighter mb-32">
          Native <span className="italic text-primary">Utility.</span>
        </h2>
        
        <div className="aspect-[21/9] bg-white/5 border border-white/5 flex items-center justify-center relative overflow-hidden">
            <div className="text-[15vw] font-bold opacity-5 italic uppercase tracking-tighter">ANDROID</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[280px] h-[580px] border-[12px] border-white/10 rounded-[45px] shadow-2xl bg-[#020813] p-8 space-y-8">
                <div className="w-12 h-12 bg-primary rounded-xl" />
                <div className="space-y-4">
                  <div className="h-4 w-full bg-white/10 rounded" />
                  <div className="h-4 w-2/3 bg-white/10 rounded" />
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* Editorial Footer */}
      <footer className="py-32 px-12 border-t border-white/5 flex justify-between items-center bg-[#020813]">
        <div className="text-metadata opacity-20 tracking-widest uppercase italic">END_OF_TRANSMISSION</div>
        <button 
          onClick={() => window.location.href = "/"}
          className="text-4xl md:text-[6vw] font-headline font-bold uppercase tracking-tighter hover:text-primary transition-colors flex items-center gap-8 group"
        >
          <span>BACK_TO_INDEX</span>
          <ArrowLeft className="w-12 h-12 md:w-20 md:h-20 group-hover:-translate-x-4 transition-transform" />
        </button>
      </footer>
    </main>
  );
}
