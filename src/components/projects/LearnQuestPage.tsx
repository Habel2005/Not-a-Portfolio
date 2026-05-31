"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X, Smartphone, Brain, Github, ChevronRight, ChevronLeft, ArrowRight, Download, Sun, Moon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LearnQuestPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter(); // <-- Initialize the router here
  
  // State for the mobile screenshot slider
  const [activeScreen, setActiveScreen] = useState(1);
  const totalScreens = 20;

  // State for theme toggle (defaults to light)
  const [isDark, setIsDark] = useState(false);

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
      gsap.from(".lq-reveal", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Subtle parallax for the device
      gsap.to(".device-container", {
        y: -20,
        scrollTrigger: {
          trigger: ".device-container",
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
              {/* Editorial Navigation - HUD Style */}
        <nav className="fixed top-0 left-0 w-full p-8 md:p-12 flex justify-between items-center z-50 mix-blend-difference text-white">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-4 text-[10px] pointer-events-auto font-code uppercase tracking-[0.3em] hover:text-primary transition-colors group"
          >
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" /> 
            <span>EXIT_MISSION</span>
          </button>
          
          <div className="flex items-center gap-12">
            <div className="text-[10px] font-code opacity-40 uppercase tracking-[0.5em] hidden md:block">
              VER: v1.1.0
            </div>
            
            {/* Theme Toggle Button */}
            <button 
              onClick={() => setIsDark(!isDark)}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-white/20 hover:border-primary hover:text-primary transition-colors pointer-events-auto"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </nav>

      <main ref={containerRef} className="bg-[#f9f8f5] dark:bg-[#020813] text-[#050505] dark:text-[#F0F4F8] h-screen w-full overflow-y-auto font-body selection:bg-primary selection:text-black overflow-x-hidden transition-colors duration-700">
        

        {/* Hero Header - Massive Typographic Scale */}
        <section className="pt-48 pb-24 px-8 md:px-16 lg:px-24 max-w-screen-2xl mx-auto flex flex-col justify-center">
          <div className="lq-reveal flex items-center gap-3 mb-12 text-primary">
            <Brain size={14} />
            <span className="text-[10px] font-code tracking-[0.4em] uppercase">Machine Learning / Mobile</span>
          </div>
          
          <h1 className="lq-reveal text-[13vw] font-headline font-bold uppercase tracking-tighter leading-[0.75] mb-20">
            Learn<br/><span className="italic font-light text-black/10 dark:text-white/10">Quest.</span>
          </h1>

          <div className="lq-reveal grid grid-cols-1 md:grid-cols-12 gap-16 border-t border-black/10 dark:border-white/10 pt-16">
            <div className="md:col-span-8 lg:col-span-7">
              <h3 className="text-[10px] font-code opacity-30 uppercase tracking-[0.3em] mb-8">[01] CONTEXT_CORE</h3>
              <p className="text-2xl md:text-4xl font-light leading-[1.1] tracking-tight mb-12">
                An intelligent educational platform delivering hyper-personalized micro-learning paths through AI curation and semantic web scraping.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
                <a 
                  href="https://github.com/Habel2005/LearnQuest" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 text-[10px] font-code uppercase tracking-[0.3em] group"
                >
                  <Github size={18} className="group-hover:text-primary transition-colors" />
                  <span className="border-b border-black/20 dark:border-white/20 pb-1 group-hover:border-primary transition-colors">Source_Repository</span>
                </a>

                <a 
                  href="https://mega.nz/YOUR_LINK_HERE" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 text-[10px] font-code uppercase tracking-[0.3em] group"
                >
                  <Download size={18} className="group-hover:text-primary transition-colors" />
                  <span className="border-b border-black/20 dark:border-white/20 pb-1 group-hover:border-primary transition-colors">Download_APK</span>
                </a>
              </div>
            </div>
            
            <div className="md:col-span-4 lg:col-start-9 flex flex-wrap content-start gap-3 mt-8 md:mt-0">
              {['Flutter Native', 'Gemini API', 'Groq', 'Python Backend', 'Firebase', 'Youtube v3 API','Github API','SERP API'].map((tag) => (
                 <span key={tag} className="px-5 py-2 border border-black/10 dark:border-white/10 rounded-full text-[9px] font-code uppercase tracking-[0.2em] text-black/40 dark:text-white/40 hover:border-black/60 dark:hover:border-white/60 hover:text-black dark:hover:text-white transition-colors cursor-default">
                   {tag}
                 </span>
              ))}
            </div>
          </div>
        </section>

        {/* Visual Showcase: The Interface Study */}
        <section className="py-16 md:py-24 px-8 max-w-screen-2xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            
            {/* Left: The Device Slider with Precision Bezel */}
            <div className="lg:col-span-5 flex flex-col items-center relative device-container">
              <div className="text-[10px] font-code opacity-20 uppercase tracking-[0.5em] mb-16 lg:hidden">INTERFACE_GEOMETRY</div>
              
              <div className="relative flex items-center justify-center group w-full">
                {/* Navigation Control (Left) */}
                <button 
                  onClick={handlePrev}
                  className="absolute left-0 md:-left-12 z-30 p-6 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all text-black/20 dark:text-white/20 hover:text-black dark:hover:text-white"
                >
                  <ChevronLeft size={48} strokeWidth={1} />
                </button>

                {/* Refined Hardware Frame */}
                <div className="relative z-20">
                   <div className="w-[300px] h-[610px] md:w-[340px] md:h-[700px] border-[10px] border-[#e2e2e2] dark:border-[#161616] rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.1)] dark:shadow-[0_40px_100px_rgba(255,255,255,0.02)] bg-white dark:bg-black overflow-hidden relative flex items-center justify-center ring-1 ring-black/5 dark:ring-white/5 transition-colors duration-700">
                     
                     {/* Screen Content */}
                     <div className="w-full h-full relative overflow-hidden bg-black/5 dark:bg-white/5">
                      <img 
                        key={activeScreen} 
                        src={`/projects/learnquest/a${activeScreen}.png`} 
                        alt={`LearnQuest Interface ${activeScreen}`} 
                        className="w-full h-full object-cover animate-fade-in" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/[0.02] dark:to-white/[0.02] pointer-events-none" />
                     </div>
                   </div>
                   {/* Shadow Ambient */}
                   <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-10 bg-black/5 dark:bg-white/5 blur-3xl -z-10" />
                </div>

                {/* Navigation Control (Right) */}
                <button 
                  onClick={handleNext}
                  className="absolute right-0 md:-right-12 z-30 p-6 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all text-black/20 dark:text-white/20 hover:text-black dark:hover:text-white"
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
                <span>{totalScreens}</span>
              </div>
            </div>

            {/* Right: Technical Manifest & Execution Narrative */}
            <div className="lg:col-span-7 flex flex-col gap-32">
              
              {/* System Architecture Manifest */}
              <div>
                <div className="flex items-center gap-6 mb-12">
                  <div className="w-12 h-px bg-primary/40"></div>
                  <h3 className="text-[10px] font-code opacity-40 uppercase tracking-[0.4em]">[02] SYSTEM_ARCHITECTURE</h3>
                </div>
                
                <div className="border-t border-black/10 dark:border-white/10">
                  {[
                    { label: "Frontend", value: "Flutter 3.26.0 (Dart 3.6.0)" },
                    { label: "AI Engines", value: "Gemini / LLaMA and Mixtral via Groq" },
                    { label: "Data Pipeline", value: "Python + Web Scraping via SERP API" },
                    { label: "Backend Infrastructure", value: "Firebase Cloud Ecosystem" },
                    { label: "Messaging", value: "Firebase FCM Stack" }
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
                    <div className="text-[10px] font-code text-primary opacity-40 group-hover:opacity-100 transition-opacity">OBJ_01</div>
                    <h4 className="text-xl font-headline font-bold uppercase tracking-tight">Dynamic Learning Paths</h4>
                    <p className="text-sm font-light text-black/40 dark:text-white/40 leading-relaxed group-hover:text-black/60 dark:group-hover:text-white/60 transition-colors">
                      Automatically scales difficulty from Beginner to Expert based on user progress and semantic analysis of their interactions.
                    </p>
                  </div>
                  
                  <div className="space-y-6 group">
                    <div className="text-[10px] font-code text-primary opacity-40 group-hover:opacity-100 transition-opacity">OBJ_02</div>
                    <h4 className="text-xl font-headline font-bold uppercase tracking-tight">Algorithmic Curation</h4>
                    <p className="text-sm font-light text-black/40 dark:text-white/40 leading-relaxed group-hover:text-black/60 dark:group-hover:text-white/60 transition-colors">
                      Leverages Python web scrapers paired with Gemini and Groq APIs to digest and summarize articles, videos, and GitHub resources instantly.
                    </p>
                  </div>

                  <div className="md:col-span-2 p-12 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 space-y-6 group hover:border-primary/40 dark:hover:border-primary/40 transition-all">
                    <div className="flex justify-between items-start">
                      <h4 className="text-2xl font-headline font-bold uppercase tracking-tight">Social Accountability</h4>
                      <span className="text-[10px] font-code text-primary">v1.1_STABLE</span>
                    </div>
                    <p className="text-base font-light text-black/50 dark:text-white/50 leading-relaxed max-w-2xl">
                      Features a built-in community discussion framework powered by Firebase, creating a peer-to-peer ecosystem that reinforces individual micro-learning habits through real-time notifications.
                    </p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        {/* Editorial Footer / Navigation */}
        <footer className="py-24 px-8 border-t border-black/10 dark:border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-[#f9f8f5] dark:bg-[#020813] transition-colors duration-700">
          <div className="text-[10px] font-code opacity-40 uppercase tracking-[0.2em]">
            ENGINEERED BY HABEL • LEARNQUEST ARCHIVE
          </div>
          
          <button 
            onClick={() => router.push("/projects/kolo", { scroll: false })}
            className="text-3xl md:text-[4vw] font-headline font-bold uppercase tracking-tighter hover:opacity-50 transition-opacity flex items-center gap-6 group relative"
          >
            <span className="text-[10px] font-code opacity-20 uppercase tracking-[0.4em] absolute -top-8 left-0">NEXT_PROJECT</span>
            <span>KOLO APP</span>
            <ArrowRight className="w-8 h-8 md:w-12 md:h-12 group-hover:translate-x-2 transition-transform" />
          </button>
        </footer>
      </main>
    </div>
  );
}