"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X, ArrowLeft, Github, ChevronRight, ChevronLeft, Smartphone, Cpu, ShieldCheck, Sun, Moon, Download } from "lucide-react";
import { useRouter } from "next/navigation";

export default function KoloAppPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // State for the mobile screenshot slider
  const [activeScreen, setActiveScreen] = useState(1);
  const totalScreens = 7;

  // State for theme toggle (Defaults to true/dark for Kolo's native aesthetic)
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Smoothly animate the body background when theme changes
    gsap.to("body", { 
      backgroundColor: isDark ? "#020813" : "#f9f8f5", 
      color: isDark ? "#F0F4F8" : "#050505",
      duration: 0.8,
      ease: "power2.inOut"
    });
  }, [isDark]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".kolo-reveal", {
        y: 60,
        opacity: 0,
        duration: 1.4,
        stagger: 0.1,
        ease: "power4.out",
      });

      // Parallax effect on the hardware frame
      gsap.to(".hardware-frame", {
        y: -30,
        scrollTrigger: {
          trigger: ".hardware-frame",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    return () => {
      // When this modal unmounts (via Exit button or browser back),
      // smoothly restore the deep black background of the Project Matrix.
      gsap.to("body", { 
        backgroundColor: "#050505", 
        color: "#ffffff", 
        duration: 0.5,
        ease: "power2.out"
      });
    };
  }, []);

  const handleNext = () => {
    setActiveScreen((prev) => (prev === totalScreens ? 1 : prev + 1));
  };

  const handlePrev = () => {
    setActiveScreen((prev) => (prev === 1 ? totalScreens : prev - 1));
  };

  return (
    <div className={isDark ? "dark" : ""}>
              
        {/* Editorial Navigation */}
        <nav className="fixed top-0 left-0 w-full p-8 md:p-12 flex justify-between items-center z-50 mix-blend-difference text-white">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-4 text-[10px] font-code uppercase tracking-[0.3em] hover:text-primary transition-colors group pointer-events-auto"
          >
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
            <span>EXIT_MISSION</span>
          </button>
          
          <div className="flex items-center gap-12">
            <div className="text-[10px] font-code opacity-40 uppercase tracking-[0.5em] hidden md:block">
              Version: v1.0_a
            </div>
            
            {/* Theme Toggle Button */}
            <button 
              onClick={() => setIsDark(!isDark)}
              className="flex items-center pointer-events-auto justify-center w-8 h-8 rounded-full border border-white/20 hover:border-primary hover:text-primary transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </nav>
        
      <main ref={containerRef} className="bg-[#f9f8f5] dark:bg-[#020813] text-[#050505] dark:text-[#F0F4F8] h-screen w-full overflow-y-auto font-body selection:bg-primary selection:text-black overflow-x-hidden transition-colors duration-700">


        {/* Hero Header - Massive & Cinematic */}
        <section className="pt-28 pb-20 px-8 md:px-16 lg:px-24 max-w-screen-2xl mx-auto flex flex-col justify-center">
          <div className="kolo-reveal flex items-center gap-3 mb-12 text-primary/60">
            <Smartphone size={14} />
            <span className="text-[10px] font-code tracking-[0.4em] uppercase">Android Application</span>
          </div>

          <h1 className="kolo-reveal text-[15vw] font-headline font-bold uppercase tracking-tighter leading-[0.75] mb-20">
            Kolo <br /><span className="italic text-black/10 dark:text-white/10 font-light">Prayer App.</span>
          </h1>

          <div className="kolo-reveal grid grid-cols-1 md:grid-cols-12 gap-16 border-t border-black/10 dark:border-white/10 pt-16">
            <div className="md:col-span-8 lg:col-span-7">
              <h3 className="text-[10px] font-code opacity-30 uppercase tracking-[0.3em] mb-8">[01] CONTEXT_CORE</h3>
              <p className="text-2xl md:text-4xl font-light leading-[1.1] tracking-tight mb-12">
                A high-fidelity liturgical companion engineered natively for the Malankara Jacobite Syrian Church.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
                <a
                  href="https://github.com/Habel2005/Kolo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 text-[10px] font-code uppercase tracking-[0.3em] group"
                >
                  <Github size={18} className="group-hover:text-primary transition-colors" />
                  <span className="border-b border-black/20 dark:border-white/20 pb-1 group-hover:border-primary transition-colors">Source_Repository</span>
                </a>

                <a 
                  href="https://mega.nz/YOUR_KOLO_LINK_HERE" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 text-[10px] font-code uppercase tracking-[0.3em] group"
                >
                  <Download size={18} className="group-hover:text-primary transition-colors" />
                  <span className="border-b border-black/20 dark:border-white/20 pb-1 group-hover:border-primary transition-colors">Download_APK</span>
                </a>
              </div>
            </div>

            <div className="md:col-span-4 lg:col-start-9 flex flex-wrap content-start gap-4 mt-8 md:mt-0">
              {['Kotlin Native', 'Jetpack Compose', 'Offline-First', 'Firebase Pipeline'].map((tag) => (
                <span key={tag} className="px-5 py-2 border border-black/10 dark:border-white/10 rounded-full text-[9px] font-code uppercase tracking-[0.2em] text-black/40 dark:text-white/40 hover:border-black/40 dark:hover:border-white/40 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Visual Showcase: The Hardware Interaction */}
        <section className="py-20 md:py-28 px-8 max-w-screen-2xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">

            {/* Left: The Device Slider with Depth */}
            <div className="lg:col-span-5 flex flex-col items-center relative">
              <div className="text-[10px] font-code opacity-20 uppercase tracking-[0.5em] mb-16 lg:hidden">INTERFACE_GEOMETRY</div>

              <div className="relative flex items-center justify-center group w-full hardware-frame">
                {/* Navigation Control (Left) */}
                <button
                  onClick={handlePrev}
                  className="absolute left-0 md:-left-12 z-30 p-6 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all text-black/30 dark:text-white/30 hover:text-black dark:hover:text-white bg-white/50 dark:bg-transparent backdrop-blur-sm md:backdrop-blur-none"
                >
                  <ChevronLeft size={48} strokeWidth={1} />
                </button>

                {/* Android Hardware Frame - High Fidelity */}
                <div className="relative z-20">
                  <div className="w-[300px] h-[610px] md:w-[340px] md:h-[700px] border-[12px] border-[#e2e2e2] dark:border-[#1a1a1a] rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.1)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.8)] bg-white dark:bg-black overflow-hidden relative flex items-center justify-center ring-1 ring-black/5 dark:ring-white/20 transition-colors duration-700">

                    {/* Screen Content */}
                    <div className="w-full h-full relative overflow-hidden bg-black/5 dark:bg-white/5">
                      <img
                        key={activeScreen}
                        src={`/projects/kolo/${activeScreen}.png`}
                        alt={`Kolo Interface ${activeScreen}`}
                        className="w-full h-full object-cover animate-fade-in"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/[0.02] dark:to-black/20 pointer-events-none" />
                    </div>
                  </div>
                  {/* Shadow Ambient */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-10 bg-black/5 dark:bg-black/40 blur-3xl -z-10" />
                </div>

                {/* Navigation Control (Right) */}
                <button
                  onClick={handleNext}
                  className="absolute right-0 md:-right-12 z-30 p-6 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all text-black/30 dark:text-white/30 hover:text-black dark:hover:text-white bg-white/50 dark:bg-transparent backdrop-blur-sm md:backdrop-blur-none"
                >
                  <ChevronRight size={48} strokeWidth={1} />
                </button>
              </div>

              {/* Pagination Indicator - Minimalist */}
              <div className="flex items-center gap-8 mt-16 font-code text-[10px] tracking-[0.5em] opacity-30">
                <span>0{activeScreen}</span>
                <div className="w-24 h-px bg-black/10 dark:bg-white/10 relative">
                  <div
                    className="absolute top-0 left-0 h-full bg-black dark:bg-white transition-all duration-500"
                    style={{ width: `${(activeScreen / totalScreens) * 100}%` }}
                  />
                </div>
                <span>0{totalScreens}</span>
              </div>
            </div>

            {/* Right: Technical Manifest & Execution Narrative */}
            <div className="lg:col-span-7 flex flex-col gap-32">

              {/* System Manifest */}
              <div>
                <div className="flex items-center gap-6 mb-12">
                  <div className="w-12 h-px bg-primary/40"></div>
                  <h3 className="text-[10px] font-code opacity-40 uppercase tracking-[0.4em]">[02] SYSTEM_MANIFEST</h3>
                </div>

                <div className="border-t border-black/10 dark:border-white/10">
                  {[
                    { label: "Core Language", value: "Kotlin Native" },
                    { label: "UI Framework", value: "Jetpack Compose" },
                    { label: "Persistence", value: "DataStore / Room" },
                    { label: "Data Pipeline", value: "Python + Firebase" }
                  ].map((dep, i) => (
                    <div key={i} className="flex flex-row items-center justify-between py-6 border-b border-black/5 dark:border-white/5 group hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-all px-4 -mx-4">
                      <span className="font-light text-black/60 dark:text-white/60 text-xl tracking-tight group-hover:text-black dark:group-hover:text-white group-hover:pl-2 transition-all">{dep.label}</span>
                      <span className="text-[10px] font-code text-black/20 dark:text-white/20 tracking-[0.2em] uppercase group-hover:text-primary transition-colors">{dep.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Objectives - High Fashion Grid */}
              <div className="space-y-16">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-px bg-primary/40"></div>
                  <h3 className="text-[10px] font-code opacity-40 uppercase tracking-[0.4em]">[03] EXECUTION_LOG</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6 group">
                    <ShieldCheck className="w-6 h-6 text-primary/40 group-hover:text-primary transition-colors" />
                    <h4 className="text-xl font-headline font-bold uppercase tracking-tight">Accessible by Design</h4>
                    <p className="text-sm font-light text-black/40 dark:text-white/40 leading-relaxed group-hover:text-black/60 dark:group-hover:text-white/60 transition-colors">
                      Engineered with extreme care so that elderly Malayalam-speaking congregation members can navigate complex liturgical routines with absolute ease.
                    </p>
                  </div>

                  <div className="space-y-6 group">
                    <Cpu className="w-6 h-6 text-primary/40 group-hover:text-primary transition-colors" />
                    <h4 className="text-xl font-headline font-bold uppercase tracking-tight">JSON-Driven Engine</h4>
                    <p className="text-sm font-light text-black/40 dark:text-white/40 leading-relaxed group-hover:text-black/60 dark:group-hover:text-white/60 transition-colors">
                      Intricate poetic formatting and speaker mapping are rendered dynamically from simple, highly-structured JSON configuration files.
                    </p>
                  </div>

                  <div className="md:col-span-2 p-12 bg-black/[0.02] dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-6 group hover:border-primary/20 dark:hover:border-primary/20 transition-all">
                    <div className="flex justify-between items-start">
                      <h4 className="text-2xl font-headline font-bold uppercase tracking-tight">Reader-Centric Utility</h4>
                      <span className="text-[10px] font-code text-primary/40">v1.0_STABLE</span>
                    </div>
                    <p className="text-base font-light text-black/50 dark:text-white/50 leading-relaxed max-w-2xl">
                      A dedicated in-book reader menu provides live, seamless controls. Users can instantly adjust typography size, tweak line spacing, and switch themes without ever leaving the prayer flow.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Editorial Footer */}
        <footer className="py-24 px-8 border-t border-black/10 dark:border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-[#f9f8f5] dark:bg-[#020813] transition-colors duration-700">
          <div className="text-[10px] font-code opacity-40 uppercase tracking-[0.2em]">
            ENGINEERED BY HABEL • KOLO NATIVE ARCHIVE
          </div>
          <button
            onClick={() => router.back()}
            className="text-3xl md:text-[4vw] font-headline font-bold uppercase tracking-tighter hover:opacity-50 transition-opacity flex items-center gap-6 group relative"
          >
            <span className="text-[10px] font-code opacity-20 uppercase tracking-[0.4em] absolute -top-8 left-0">BACK_TO</span>
            <span>INDEX</span>
            <ArrowLeft className="w-8 h-8 md:w-12 md:h-12 group-hover:-translate-x-2 transition-transform" />
          </button>
        </footer>
      </main>
    </div>
  );
}