
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TECH_DATA = {
  LOCAL_AI: [
    "Llama.cpp", "Faster-Whisper", "IndicTrans2",
    "Phi-3", "Qwen", "Gemma", "Silero TTS", "ChromaDB"
  ],
  WEB_SYSTEMS: [
    "Node.js", "React", "Next.js", "Tailwind CSS",
    "Three.js", "WebGL", "GSAP", "TypeScript"
  ],
  NATIVE_DEV: [
    "Flutter", "Dart", "Kotlin", "Android SDK",
    "FreeSWITCH", "Python 3", "C++", "Docker"
  ]
};

type TechCategory = keyof typeof TECH_DATA;

export function StudioNarrative() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<TechCategory>("LOCAL_AI");

  // Initial Scroll Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-text", {
        opacity: 0,
        y: 80,
        skewY: 5,
        duration: 1.8,
        stagger: 0.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Terminal Tab Switch Animation
  useEffect(() => {
    if (!terminalRef.current) return;

    // Quick flash animation when switching tabs to mimic terminal loading
    gsap.fromTo(".tech-item",
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" }
    );
  }, [activeCategory]);

  return (
    <section ref={sectionRef} className="py-64 px-8 max-w-screen-2xl mx-auto space-y-64 bg-transparent">

      {/* 01: IDENTITY & ORIGIN */}
      <div className="grid grid-cols-12 gap-12 lg:gap-24">
        <div className="col-span-12 lg:col-span-1 text-metadata uppercase opacity-40">02 / Journey</div>

        <div className="col-span-12 lg:col-span-11 space-y-24">
          <h2 className="text-6xl md:text-[10vw] font-headline font-bold tracking-tighter reveal-text leading-[0.85] uppercase">
            Me &<br></br><span className="text-primary italic">&nbsp;Myself</span>.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 items-start">
            {/* The Compact Metadata Tray - Left Margin Style */}
            <div className="col-span-12 md:col-span-4 space-y-16 reveal-text">
              <div className="border-l border-foreground/10 pl-8">
                <div className="text-metadata mb-2 uppercase opacity-40">Education</div>
                <p className="text-xl font-bold">Computer Science Undergrad</p>
                <p className="text-metadata opacity-60 mt-1 uppercase">Toc H Institute of Science & Technology</p>
              </div>

              {/* The Pinned Card - Pat David / Bruno Simon Style */}
              <div className="relative pt-6">
                <div className="bg-white text-void-black p-8 shadow-2xl rotate-[-4deg] hover:rotate-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] border border-black/5 max-w-[280px] origin-top">
                  {/* The Pin head */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.4),2px_2px_4px_rgba(255,255,255,0.3)] z-20" />

                  <div className="text-[9px] font-code text-blend-violet mb-6 uppercase tracking-[0.3em] opacity-40">
                    SOME EXTRA STUFF
                  </div>

                  <h5 className="text-2xl font-headline font-bold uppercase leading-none mb-3 tracking-tighter">
                    Aviation & <br /> Cosmology
                  </h5>

                  <p className="text-[10px] opacity-60 uppercase leading-relaxed font-code tracking-tighter mb-8">
                    Drawn to flight systems, black holes, late night sky watching & endless curiosity.
                  </p>

                  <div className="pt-4 border-t border-black/5 flex justify-between items-center text-black/30 text-[10px] font-code">
                    <div className="relative group cursor-help">
                      <span>
                        FUN FACT: A BLACK HOLE CAN TAKE ABOUT 10<sup>67</sup> YEARS TO DIE.
                      </span>

                      {/* Hover Expansion - Optimized for the Big Number reveal */}
                      <div className="absolute left-0 bottom-6 opacity-0 scale-95 pointer-events-none 
                                      group-hover:opacity-100 group-hover:scale-100
                                      transition-all duration-500 ease-out z-50">

                        <div className="bg-[#050505] text-white p-4 rounded-lg shadow-[0_40px_80px_rgba(0,0,0,0.9)] w-[240px] border border-white/10">

                          <p className="text-[17px] leading-none font-code opacity-90 tracking-tighter break-all">
                            10<sup>67</sup>={Array.from({ length: 68 }).map((_, i) => (
                              <span
                                key={i}
                                className="inline-block opacity-0 group-hover:animate-zeroReveal"
                                style={{
                                  animationDelay: `${i * 0.02}s`,
                                }}
                              >
                                {i === 0 ? "1" : "0"}
                              </span>
                            ))}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* The Main Narrative */}
            <div className="col-span-12 md:col-span-7">
              <p className="text-xl md:text-3xl font-body leading-tight opacity-60 reveal-text">
                My journey started with tinkering in Linux environments and building cat games on Scratch. Today, I architect self-hosted AI infrastructure and engineer native applications, focusing on both backend development and interactive user experiences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 02: THE TERMINAL OS LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">

        {/* Left Column: Interactive Categories */}
        <div className="col-span-1 lg:col-span-5 space-y-8 reveal-text">
          <div className="text-metadata uppercase opacity-40">The Arsenal</div>
          <h4 className="text-4xl md:text-5xl font-headline font-bold uppercase tracking-tight">
            Tools of <span className="text-primary">Extraction</span>.
          </h4>
          <p className="text-sm opacity-50 uppercase tracking-[0.2em] leading-relaxed max-w-sm mb-12">
            Select a system to view active dependencies and local environments.
          </p>

          <div className="flex flex-col gap-4">
            {(Object.keys(TECH_DATA) as TechCategory[]).map((category, idx) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-left text-xl md:text-2xl font-headline font-bold uppercase tracking-widest transition-all duration-300 py-4 border-b ${activeCategory === category
                  ? "text-blend-violet border-primary pl-4"
                  : "text-foreground/40 border-foreground/10 hover:text-foreground/70 hover:pl-2"
                  }`}
              >
                <span className="text-[10px] font-code opacity-40 mr-4">0{idx + 1}</span>
                {category.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: The OS Terminal Window */}
        <div className="col-span-1 lg:col-span-7 reveal-text">
          <div
            ref={terminalRef}
            className="rounded-xl overflow-hidden border border-foreground/10 shadow-2xl bg-[#0A0A0A] text-[#F0F0F0]"
          >
            {/* macOS Window Header */}
            <div className="h-12 bg-white/5 border-b border-white/10 flex items-center px-4 relative">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 text-[10px] font-code text-white/40 uppercase tracking-widest">
                habel@system:~/{activeCategory.toLowerCase()}
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-8 md:p-12 min-h-[350px] md:min-h-[400px]">
              <div className="text-primary mb-8 font-code text-xs md:text-sm tracking-widest">
                $ ls -la ./{activeCategory.toLowerCase()}/models
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                {TECH_DATA[activeCategory].map((tech) => (
                  <div key={tech} className="tech-item font-code text-sm md:text-base tracking-widest flex items-center gap-4">
                    <span className="text-white/20 select-none">→</span>
                    <span className="text-white/80">{tech}</span>
                  </div>
                ))}
              </div>

              {/* Blinking Cursor at the bottom */}
              <div className="mt-12 flex items-center gap-2 font-code text-sm text-primary">
                $ <span className="w-2 h-4 bg-primary animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
