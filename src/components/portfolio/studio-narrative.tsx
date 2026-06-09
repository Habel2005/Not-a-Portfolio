"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TECH_DATA = {
  LOCAL_AI: ["Llama.cpp", "Faster-Whisper", "IndicTrans2", "Phi-3", "Qwen", "Gemma", "Silero TTS", "ChromaDB"],
  WEB_SYSTEMS: ["Node.js", "React", "Next.js", "Tailwind CSS", "Three.js", "WebGL", "GSAP", "TypeScript"],
  NATIVE_DEV: ["Flutter", "Dart", "Kotlin", "Android SDK", "FreeSWITCH", "Python 3", "C++", "Docker"]
};

type TechCategory = keyof typeof TECH_DATA;

export function StudioNarrative() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<TechCategory>("LOCAL_AI");

  useEffect(() => {
    let ctx = gsap.context(() => {

      // ==========================================
      // ANIMATION 1: The Scrubbed Depth Entrance
      // Matches the scrollbar exactly. Reversible.
      // ==========================================
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#panel-1",
          start: "top 90%",     // Starts when top of panel hits 90% down the screen
          end: "center center", // Ends exactly when panel is centered
          scrub: 1.5,           // Smooth scrubbing, fully reversible
        }
      });

      // Left Text: Slides right, scales up, removes blur
      introTl.fromTo(".slide-me",
        { x: "-40vw", scale: 0.6, filter: "blur(12px)", opacity: 0 },
        { x: 0, scale: 1, filter: "blur(0px)", opacity: 1, ease: "power1.out" },
        0
      );

      // Right Text: Slides left, scales up, removes blur
      introTl.fromTo(".slide-myself",
        { x: "40vw", scale: 0.6, filter: "blur(12px)", opacity: 0 },
        { x: 0, scale: 1, filter: "blur(0px)", opacity: 1, ease: "power1.out" },
        0
      );

      // Foreground Card (Fast Parallax) - Starts lower, moves faster
      introTl.fromTo(".card-parallax",
        { y: "25vh", rotation: -12, opacity: 0 },
        { y: 0, rotation: -4, opacity: 1, ease: "power2.out" },
        0
      );

      // Background Bio (Slow Parallax) - Starts slightly lower
      introTl.fromTo(".bio-parallax",
        { y: "10vh", opacity: 0 },
        { y: 0, opacity: 1, ease: "power1.out" },
        0
      );

      // ==========================================
      // ANIMATION 2: The 3D Horizontal Track Slide
      // ==========================================
      let mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {

        const trackTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top", // Pins exactly at the top
            end: "+=200%",    // Controls how long you scroll to slide across
            pin: true,
            scrub: 1,
          }
        });

        // Slide the whole track left
        trackTl.to(trackRef.current, {
          xPercent: -50,
          ease: "none"
        }, 0);

        // Z-Space Reveal for Terminal: Scales up from background as it slides in
        trackTl.fromTo(terminalRef.current,
          { scale: 0.8, rotateY: 15, opacity: 0.5 },
          { scale: 1, rotateY: 0, opacity: 1, ease: "power2.out" },
          0.2 // Starts slightly after the slide begins
        );
      });

      // ==========================================
      // ANIMATION 3: The Velocity Pendulum Physics
      // ==========================================
      let angle = 0;
      let angularVelocity = 0;

      const gravity = 0.12;
      const damping = 0.97;

      gsap.ticker.add(() => {
        const force = -Math.sin(angle * Math.PI / 180) * gravity;

        angularVelocity += force;
        angularVelocity *= damping;

        angle += angularVelocity;

        gsap.set(".card-swing", {
          rotation: angle
        });
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,

        onUpdate(self) {
          angularVelocity += gsap.utils.clamp(
            -4,
            4,
            self.getVelocity() * 0.00015
          );
        }
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!terminalRef.current) return;
  
    const ctx = gsap.context(() => {
      gsap.set(".tech-item", {
        opacity: 0,
        x: -10
      });
  
      gsap.set(".cmd-cursor", {
        opacity: 0
      });
  
      gsap.set(".cmd-processing", {
        opacity: 0
      });
  
      const tl = gsap.timeline();
  
      // command appears
      tl.fromTo(
        ".cmd-path",
        {
          clipPath: "inset(0 100% 0 0)"
        },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.35,
          ease: "steps(40)"
        }
      )
  
        // cursor blink
        .set(".cmd-cursor", { opacity: 1 })
  
        .to(".cmd-cursor", {
          opacity: 0,
          duration: 0.08,
          repeat: 2,
          yoyo: true
        })
  
        // fake processing
        .set(".cmd-processing", {
          opacity: 1,
          textContent: " ..."
        })
  
        .to({}, { duration: 0.15 })
  
        .set(".cmd-processing", {
          textContent: " [OK]"
        })
  
        .to({}, { duration: 0.08 })
  
        // print output
        .fromTo(
          ".tech-item",
          {
            opacity: 0,
            x: -10
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.015,
            stagger: 0.035,
            ease: "none"
          }
        )
  
        // subtle terminal refresh flash
        .fromTo(
          ".terminal-window",
          {
            filter: "brightness(1.2)"
          },
          {
            filter: "brightness(1)",
            duration: 0.12
          },
          "-=0.2"
        );
    }, terminalRef);
  
    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section ref={sectionRef} id="narrative" className="relative w-full overflow-hidden bg-transparent">

      {/* THE TRACK: Holds both full-screen panels. 
        w-[200vw] on desktop makes it exactly 2 screens wide. 
      */}
      <div ref={trackRef} className="flex flex-col lg:flex-row w-full lg:w-[200vw] will-change-transform">

        {/* =========================================
            PANEL 1: ME & MYSELF (Tight Collage Layout)
            ========================================= */}
        <div id="panel-1" className="relative w-full lg:w-[100vw] h-screen flex flex-col items-center justify-center px-8 md:px-16">

          {/* Top Label */}
          <div className="absolute top-24 left-12 text-metadata uppercase opacity-40 font-code tracking-[0.2em] slide-me hidden md:block">
            02 / Journey
          </div>

          {/* The Centered Cinematic Text Container */}
          <div className="relative w-full max-w-5xl flex flex-col md:flex-row justify-center items-center z-10 select-none">

            <h2 className="slide-me text-[18vw] md:text-[14vw] font-headline font-bold leading-[0.8] uppercase tracking-tighter z-10 drop-shadow-2xl text-foreground">
              ME &
            </h2>

            <h2 className="slide-myself text-[18vw] md:text-[14vw] font-headline font-bold leading-[0.8] uppercase tracking-tighter text-primary italic z-20 md:-ml-8 md:mt-24 drop-shadow-2xl">
              MYSELF.
            </h2>

          </div>

          {/* Overlay Layout: Tightly packed around the text */}
          <div className="absolute inset-0 w-full h-full max-w-6xl mx-auto pointer-events-none flex items-center justify-center">

            {/* The Pinned Card - Overlaps bottom left */}
            <div className="card-parallax absolute bottom-[10%] left-[5%] md:left-[10%] pointer-events-auto z-30">
              <div
                className="card-swing will-change-transform"
                style={{ transformOrigin: "50% -8px" }} // Anchors exactly at the red pin
              >
                <div className="bg-white text-void-black p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-black/5 w-[240px] md:w-[280px]">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.4),2px_2px_4px_rgba(255,255,255,0.3)] z-20" />

                  <div className="text-[9px] font-code text-blend-violet mb-4 uppercase tracking-[0.3em] opacity-40">
                    Some Extra Stuff
                  </div>

                  <h5 className="text-xl md:text-2xl font-headline font-bold uppercase leading-none mb-3 tracking-tighter">
                    Aviation & <br /> Cosmology
                  </h5>

                  <p className="text-[9px] md:text-[10px] opacity-60 uppercase leading-relaxed font-code tracking-tighter mb-6">
                    Drawn to flight systems, black holes, late night sky watching & endless curiosity.
                  </p>

                  <div className="pt-4 border-t border-black/10 flex justify-between items-center text-black/40 text-[9px] font-code">
                    <div className="relative group cursor-help">
                      <span>FUN FACT: A BLACK HOLE CAN TAKE ABOUT 10<sup>67</sup> YEARS TO DIE.</span>
                      <div className="absolute left-0 bottom-6 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 z-50">
                        <div className="bg-[#050505] text-white p-3 rounded shadow-2xl w-[200px]">
                          <p className="text-[14px] leading-none font-code tracking-tighter break-all">
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

            {/* The Bio Narrative - Overlaps bottom right */}
            <div className="bio-parallax absolute bottom-[15%] right-[5%] md:right-[10%] w-[80%] md:w-[35%] pointer-events-auto z-20">
              <p className="text-xl md:text-2xl font-body leading-snug opacity-70 border-l border-primary/50 pl-6 backdrop-blur-sm bg-background/30 p-4 rounded-xl">
                My journey started with tinkering in Linux environments and building cat games on Scratch. Today, I architect self-hosted AI infrastructure and engineer native applications.
              </p>
            </div>

          </div>
        </div>

        {/* =========================================
            PANEL 2: THE TERMINAL OS
            ========================================= */}
        <div className="relative w-full lg:w-[100vw] h-screen flex items-center px-8 md:px-12 lg:px-24">
          <div className="w-full max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">

              {/* Left Column: Interactive Categories */}
              <div className="col-span-1 lg:col-span-5 space-y-8 z-10">
                <div className="text-metadata uppercase opacity-40 font-code tracking-[0.2em]">The Arsenal</div>
                <h4 className="text-5xl md:text-6xl font-headline font-bold uppercase tracking-tight leading-[0.9]">
                  Tools I <br /><span className="text-primary italic">Know</span>.
                </h4>

                <div className="flex flex-col gap-2 pt-8">
                  {(Object.keys(TECH_DATA) as TechCategory[]).map((category, idx) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`text-left text-xl md:text-2xl font-headline font-bold uppercase tracking-widest transition-all duration-300 py-4 border-b group flex items-center ${activeCategory === category
                        ? "text-primary border-primary"
                        : "text-foreground/30 border-foreground/10 hover:text-foreground/80"
                        }`}
                    >
                      <span className={`text-[10px] font-code mr-6 transition-all ${activeCategory === category ? "opacity-100" : "opacity-30 group-hover:opacity-100"}`}>
                        0{idx + 1}
                      </span>
                      {category.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: The OS Terminal Window with 3D Depth */}
              <div className="col-span-1 lg:col-span-7 perspective-[1000px]">
                <div
                  ref={terminalRef}
                  className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] bg-[#0A0A0A] text-[#F0F0F0] will-change-transform"
                >
                  <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 relative backdrop-blur-md">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                      <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                      <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 text-[10px] font-code text-white/30 uppercase tracking-[0.2em] hidden md:block">
                      habel@system:~/{activeCategory.toLowerCase()}
                    </div>
                  </div>

                  <div className="p-8 md:p-12 min-h-[350px] md:min-h-[450px] relative">

                    {/* ADDED 'cmd-path' class here */}
                    <div className="cmd-path text-primary mb-12 font-code text-xs md:text-sm tracking-widest opacity-80">
                      $ root/access ./{activeCategory.toLowerCase()}/sys_modules
                      <span className="cmd-cursor ml-1">▌</span>
                      <span className="cmd-processing"></span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                      {TECH_DATA[activeCategory].map((tech) => (
                        <div key={tech} className="tech-item font-code text-sm md:text-base tracking-widest flex items-center gap-4 border-b border-white/5 pb-2">
                          <span className="text-primary/50 select-none">↳</span>
                          <span className="text-white/90">{tech}</span>
                        </div>
                      ))}
                    </div>

                    <div className="absolute bottom-12 left-12 flex items-center gap-3 font-code text-sm text-primary/70">
                      $ awaiting_input <span className="w-2 h-4 bg-primary animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}