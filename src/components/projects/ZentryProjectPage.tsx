"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import {
  X, Github, ChevronRight, ChevronLeft, Terminal, Cpu, Database,
  Sun, Moon, ArrowRight, ShieldCheck, Smartphone, Phone, AudioWaveform, RadioReceiver,
  Server
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Strictly factual, highly direct technical data for the AR schematic
const architectureData = [
  {
    id: "gateway",
    title: "Twilio Gateway",
    icon: Phone,
    stack: "Twilio Voice + WebSockets",
    function: "Routes live phone calls into the local AI processing pipeline.",
    decision: "Chosen to provide a reliable PSTN interface without the operational complexity of SIP infrastructure, allowing users to call from any standard mobile phone."
  },
  {
    id: "stt",
    title: "Speech Recognition",
    icon: AudioWaveform,
    stack: "Malayalam Whisper-Medium v2 (CTranslate2)",
    function: "Transcribes caller speech into text with support for regional Malayalam dialects.",
    decision: "Uses a community fine-tuned Whisper model optimized with CTranslate2 and Faster-Whisper for highly efficient local VRAM inference."
  },
  {
    id: "inference",
    title: "RAG & Reasoning",
    icon: Database,
    stack: "Phi-4 Mini + Llama.cpp + ChromaDB",
    function: "Retrieves institutional knowledge and generates grounded responses in real time.",
    decision: "Runs entirely on local hardware to preserve privacy, while retrieval augmentation (RAG) strictly prevents hallucination regarding admission facts."
  },
  {
    id: "tts",
    title: "Voice Synthesis",
    icon: RadioReceiver,
    stack: "Piper TTS",
    function: "Converts generated Malayalam responses back into natural audio speech.",
    decision: "Selected specifically for its extreme low-latency performance on local hardware, making real-time conversational handoffs possible."
  }
];

const metricDetails = [
  {
    lead: "The project originally used FreeSWITCH for telephony.",
    typed: " While functional, SIP configuration, NAT traversal, and networking overhead introduced significant complexity. Twilio ultimately provided a more practical deployment path while keeping inference, retrieval, transcription, and synthesis on local hardware."
  },
  {
    lead: "Response time was estimated from roughly 150 internal test calls.",
    typed: " Timing data was logged throughout development. Actual latency depends on GPU performance, transcription speed, and synthesis latency. Piper consistently delivered smoother real-time interaction than our earlier Parler TTS experiments."
  },
  {
    lead: "Most testing was performed on an RTX 3080 Ti.",
    typed: " Faster GPUs will improve responsiveness, while lower-end GPUs may still operate the system with increased latency. The architecture targets practical consumer hardware rather than enterprise infrastructure."
  }
];

export default function ZentryProjectPage() {
  const mainRef = useRef<HTMLElement>(null);
  const archRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState(1);
  const totalScreens = 18;
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [activeMetric, setActiveMetric] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDark, setIsDark] = useState(true);

  // Typewriter Logic
  useEffect(() => {
    const text = metricDetails[activeMetric].typed;
    setDisplayedText("");
    let index = 0;
    const interval = setInterval(() => {
      if (index >= text.length) {
        clearInterval(interval);
        return;
      }
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
    }, 12);
    return () => clearInterval(interval);
  }, [activeMetric]);

  // Theme Logic
  useEffect(() => {
    gsap.to(mainRef.current, {
      backgroundColor: isDark ? "#050505" : "#f4f4f0",
      color: isDark ? "#ffffff" : "#050505",
      duration: 0.8,
      ease: "power2.inOut"
    });
  }, [isDark]);

  // GSAP Animations
  useEffect(() => {
    // THIS IS THE FIX: We tell GSAP to watch the <main> tag, NOT the window.
    const scrollerElement = mainRef.current;
    if (!scrollerElement) return;

    const ctx = gsap.context(() => {
      gsap.from(".zentry-reveal", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
      });

      const panels = gsap.utils.toArray('.zentry-panel');
      const horizontalScroll = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: archRef.current,
          scroller: scrollerElement, // LOCKED TO COMPONENT
          pin: true,
          pinType: "transform", // Crucial for modal backdrop filters
          anticipatePin: 1,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => '+=' + (archRef.current?.offsetWidth || 0) * 2,
        },
      });

      gsap.fromTo('.thesis-text',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: archRef.current, scroller: scrollerElement, start: "top center" }
        }
      );

      gsap.fromTo('.tech-node',
        { opacity: 0, scale: 0.8, x: -20 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".panel-2-trigger",
            scroller: scrollerElement, // LOCKED TO COMPONENT
            containerAnimation: horizontalScroll,
            start: "left center",
          }
        }
      );

      gsap.to('.data-packet', {
        x: 140,
        duration: 1.2,
        repeat: -1,
        ease: "linear",
        stagger: 0.2
      });

      gsap.fromTo('.metric-card',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".panel-3-trigger",
            scroller: scrollerElement, // LOCKED TO COMPONENT
            containerAnimation: horizontalScroll,
            start: "left center",
          }
        }
      );

      gsap.to(".hardware-frame", {
        y: -40,
        scrollTrigger: {
          trigger: ".hardware-frame",
          scroller: scrollerElement, // LOCKED TO COMPONENT
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // Force recalculation after paint
      setTimeout(() => ScrollTrigger.refresh(), 200);

    }, mainRef);

    return () => ctx.revert();
  }, []);

  // Exit cleanup
  useEffect(() => {
    return () => {
      gsap.to("body", { backgroundColor: "#050505", color: "#ffffff", duration: 0.5, ease: "power2.out" });
    };
  }, []);

  const handleNext = () => setActiveIndex((prev) => (prev === 18 ? 1 : prev + 1));
  const handlePrev = () => setActiveIndex((prev) => (prev === 1 ? 18 : prev - 1));

  return (
    <div className={isDark ? "dark" : ""}>

      {/* THE FIX: Navigation is outside main, with pointer-events-none to prevent blocking scroll */}
      <nav className="fixed top-0 left-0 w-full p-8 md:p-12 lg:px-16 flex justify-between items-center z-[100] mix-blend-difference text-white pointer-events-none">
        <button onClick={() => router.back()} className="pointer-events-auto flex items-center gap-4 text-[10px] font-code uppercase tracking-[0.3em] hover:text-primary transition-colors group">
          <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
          <span>TERMINATE_SESSION</span>
        </button>

        <div className="pointer-events-auto flex items-center gap-12">
          <div className="text-[10px] font-code opacity-40 uppercase tracking-[0.5em] hidden md:block">VER: v2.0.1</div>
          <button onClick={() => setIsDark(!isDark)} className="flex items-center justify-center w-8 h-8 rounded-full border border-white/20 hover:border-primary hover:text-primary transition-colors">
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </nav>

      {/* THE FIX: h-screen overflow-y-auto makes THIS the scroller, completely decoupling it from the window */}
      <main ref={mainRef} className="bg-[#f4f4f0] dark:bg-[#050505] text-[#050505] dark:text-[#ffffff] h-screen w-full overflow-y-auto overflow-x-hidden font-body selection:bg-primary selection:text-black transition-colors duration-700">

        {/* 01. Hero Header */}
        <section className="pt-48 pb-24 px-8 md:px-16 lg:px-24 max-w-screen-2xl mx-auto flex flex-col justify-center min-h-[90vh]">
          <div className="zentry-reveal flex items-center gap-3 mb-12 text-primary">
            <Terminal size={14} />
            <span className="text-[10px] font-code tracking-[0.4em] uppercase">Flagship Infrastructure</span>
          </div>

          <h1 className="zentry-reveal text-[13vw] font-headline font-bold uppercase tracking-tighter leading-[0.8] mb-20">
            Zentry<br />
            <span className="text-[11vw] italic font-light text-black/20 dark:text-white/20">Telephony.</span>
          </h1>

          <div className="zentry-reveal grid grid-cols-1 md:grid-cols-12 gap-16 border-t border-black/10 dark:border-white/10 pt-16">
            <div className="md:col-span-8 lg:col-span-7">
              <h3 className="text-[10px] font-code opacity-40 uppercase tracking-[0.3em] mb-8">[01] SYSTEM_CORE</h3>
              <p className="text-2xl md:text-4xl font-light leading-[1.2] tracking-tight mb-12 max-w-3xl">
                A highly-optimized conversational AI agent executing entirely on local hardware. The user interacts through a simple phone call. The intelligence handles the rest.
              </p>

              <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
                <a href="https://github.com/Habel2005/Zentry/tree/new" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 text-[10px] font-code uppercase tracking-[0.3em] group pointer-events-auto">
                  <Server size={18} className="group-hover:text-primary transition-colors" />
                  <span className="border-b border-black/20 dark:border-white/20 pb-1 group-hover:border-primary transition-colors">Backend_Python_Core</span>
                </a>
                <a href="https://github.com/Habel2005/zentry_app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 text-[10px] font-code uppercase tracking-[0.3em] group pointer-events-auto">
                  <Smartphone size={18} className="group-hover:text-primary transition-colors" />
                  <span className="border-b border-black/20 dark:border-white/20 pb-1 group-hover:border-primary transition-colors">Admin_Telemetry_App</span>
                </a>
              </div>
            </div>

            <div className="md:col-span-4 lg:col-start-9 flex flex-wrap content-start gap-3 mt-8 md:mt-0">
              {['RTX 3080 Ti', 'Twilio Gateway', 'Phi-4 Mini', 'Faster-Whisper', 'ChromaDB', 'Piper TTS'].map((tag) => (
                <span key={tag} className="px-5 py-2 border border-black/10 dark:border-white/10 rounded-full text-[9px] font-code uppercase tracking-[0.2em] text-black/60 dark:text-white/60 hover:border-black dark:hover:border-white transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 02. Interactive Pipeline */}
        <section ref={archRef} className="relative w-full h-screen overflow-hidden border-y border-black/10 dark:border-white/10">
          <div ref={panelsRef} className="flex w-[300vw] h-full">

            <div className="zentry-panel w-screen h-full flex items-center justify-center px-12 md:px-24 lg:px-32 relative overflow-hidden bg-transparent">
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
              <div className="max-w-6xl w-full flex flex-col gap-12 z-10">
                <div className="thesis-text flex items-center gap-4 text-primary opacity-80">
                  <ShieldCheck size={20} />
                  <span className="text-[10px] font-code tracking-[0.3em] uppercase">The Engineering Context</span>
                </div>
                <div className="flex flex-col gap-8 text-2xl md:text-4xl lg:text-5xl font-light leading-[1.2] tracking-tight">
                  <p className="thesis-text text-black/90 dark:text-white/90">
                    During admission seasons, institutions process thousands of redundant inquiries. Existing solutions force users to navigate rigid menus or download proprietary apps.
                  </p>
                  <p className="thesis-text text-black/90 dark:text-white/90">
                    For regional demographics, the friction of text-based interfaces and language barriers leads to high drop-off rates. <span className="text-primary italic font-normal">Users just want to make a phone call.</span>
                  </p>
                  <p className="thesis-text text-xl md:text-2xl font-code tracking-widest uppercase text-primary/70 mt-8 border-l-2 border-primary pl-6 py-2">
                    Zentry routes standard cellular networks directly to localized AI hardware, achieving conversational Malayalam without cloud latency.
                  </p>
                </div>
              </div>
            </div>

            <div className="zentry-panel panel-2-trigger w-screen h-full flex flex-col items-center justify-center px-8 md:px-16 lg:px-24 relative bg-black/[0.03] dark:bg-[#0a0a0a]">
              <h2 className="absolute top-24 left-12 md:left-24 lg:left-32 text-[10px] font-code tracking-[0.4em] uppercase text-black/30 dark:text-white/30">
                [SYSTEM_DIAGRAM : HOVER_TO_INSPECT]
              </h2>
              <div className="flex items-center justify-center w-full max-w-7xl mt-12 relative flex-wrap gap-y-16 lg:gap-x-4">
                {architectureData.map((node, i) => (
                  <div key={node.id} className="tech-node flex items-center relative">
                    {i !== 0 && (
                      <div className="w-4 md:w-8 lg:w-16 h-[1px] bg-black/10 dark:bg-white/10 relative overflow-hidden hidden md:block">
                        <div className="data-packet w-6 h-full bg-primary shadow-[0_0_10px_#D2FF00]" />
                      </div>
                    )}
                    <div className="relative group cursor-crosshair z-20" onMouseEnter={() => setActiveNode(i)} onMouseLeave={() => setActiveNode(null)}>
                      <div className={`px-6 py-4 md:px-10 md:py-8 border ${activeNode === i ? 'border-primary bg-primary/5' : 'border-black/20 dark:border-white/20 bg-[#f4f4f0] dark:bg-[#050505]'} flex items-center gap-4 transition-all duration-300 min-w-[160px] md:min-w-[220px]`}>
                        <node.icon size={22} className={activeNode === i ? 'text-primary' : 'text-black/40 dark:text-white/40'} />
                        <span className={`text-[10px] md:text-xs font-code tracking-widest uppercase font-bold ${activeNode === i ? 'text-primary' : 'text-black/60 dark:text-white/60'}`}>{node.title}</span>
                      </div>
                      <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-8 w-80 md:w-[400px] bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 p-8 shadow-2xl transition-all duration-300 pointer-events-none z-50 ${activeNode === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                        <div className="space-y-6 text-left">
                          <div>
                            <p className="text-[9px] font-code tracking-[0.25em] uppercase text-primary mb-1 font-bold">Stack</p>
                            <p className="text-xs font-light text-black/80 dark:text-white/80 leading-relaxed">{node.stack}</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-code tracking-[0.25em] uppercase text-primary mb-1 font-bold">Function</p>
                            <p className="text-xs font-light text-black/80 dark:text-white/80 leading-relaxed">{node.function}</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-code tracking-[0.25em] uppercase text-primary mb-1 font-bold">Architecture Decision</p>
                            <p className="text-xs font-light text-black/80 dark:text-white/80 leading-relaxed">{node.decision}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="zentry-panel panel-3-trigger w-screen h-full flex flex-col items-center justify-center px-12 md:px-24 lg:px-32 bg-transparent">
              <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                <div className="metric-card p-12 border border-black/10 dark:border-white/10 flex flex-col justify-between h-96 hover:border-primary/50 dark:hover:border-primary/50 transition-colors group bg-white/50 dark:bg-transparent" onMouseEnter={() => setActiveMetric(0)}>
                  <div className="text-[10px] font-code tracking-[0.3em] uppercase text-black/40 dark:text-white/40">Local Processing</div>
                  <div className="text-6xl md:text-7xl lg:text-8xl font-light text-black dark:text-white group-hover:text-primary transition-colors tracking-tighter">Mostly</div>
                  <div className="text-sm font-light text-black/50 dark:text-white/50 leading-relaxed">Core AI processing runs locally. Twilio and ngrok are used only for telephony routing.</div>
                </div>
                <div className="metric-card p-12 border border-black/10 dark:border-white/10 flex flex-col justify-between h-96 hover:border-primary/50 transition-colors group bg-black/5 dark:bg-white/5" onMouseEnter={() => setActiveMetric(1)}>
                  <div className="text-[10px] font-code tracking-[0.3em] uppercase text-black/40 dark:text-white/40">Observed Response Time</div>
                  <div className="text-6xl md:text-7xl lg:text-8xl font-light text-black dark:text-white group-hover:text-primary transition-colors tracking-tighter">~2s</div>
                  <div className="text-sm font-light text-black/50 dark:text-white/50 leading-relaxed">Average timing measured from internal testing. Actual latency depends on GPU.</div>
                </div>
                <div className="metric-card p-12 border border-black/10 dark:border-white/10 flex flex-col justify-between h-96 hover:border-primary/50 transition-colors group bg-white/50 dark:bg-transparent" onMouseEnter={() => setActiveMetric(2)}>
                  <div className="text-[10px] font-code tracking-[0.3em] uppercase text-black/40 dark:text-white/40">Target Hardware</div>
                  <div className="text-4xl lg:text-5xl font-light text-black dark:text-white group-hover:text-primary transition-colors mt-4 tracking-tight uppercase">Consumer GPU</div>
                  <div className="text-sm font-light text-black/50 dark:text-white/50 leading-relaxed">Built and tested on an RTX 3080 Ti, designed to stay practical on consumer-grade hardware.</div>
                </div>
              </div>
              <div className="mt-16 w-full max-w-6xl border-t border-black/10 dark:border-white/10 pt-10 min-h-[160px]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-code text-[10px] tracking-[0.3em] uppercase opacity-50 font-bold">Contextual Telemetry</span>
                </div>
                <p className="text-base md:text-lg text-black/60 dark:text-white/60 leading-relaxed max-w-4xl">
                  <span className="text-black dark:text-white font-medium">{metricDetails[activeMetric].lead}</span>
                  {displayedText}
                  <span className="animate-pulse text-primary font-bold">█</span>
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* 03. Admin Frontend */}
        <section className="py-48 px-8 md:px-16 lg:px-24 max-w-screen-2xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-7 flex flex-col gap-16 order-2 lg:order-1">
              <div>
                <div className="flex items-center gap-6 mb-12">
                  <div className="w-12 h-px bg-primary/40"></div>
                  <h3 className="text-[10px] font-code opacity-40 uppercase tracking-[0.4em] font-bold">[03] SYSTEM_TELEMETRY</h3>
                </div>
                <h2 className="text-5xl md:text-7xl font-headline font-bold uppercase tracking-tighter mb-10 leading-[0.9]">
                  Monitoring <br /><span className="text-primary italic">Matrix.</span>
                </h2>
                <p className="text-xl md:text-2xl font-light text-black/60 dark:text-white/60 leading-tight max-w-xl mb-12">
                  While end-users interact entirely through standard cellular voice calls, administrators require oversight. A dedicated Flutter application acts as the control center, tracking real-time call logs, monitoring STT transcription quality, and providing granular analytics on system latency.
                </p>
              </div>

              <div className="p-12 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 space-y-12">
                <div className="flex items-center gap-4 mb-4">
                  <Smartphone size={24} className="text-primary" />
                  <span className="text-[10px] font-code uppercase tracking-[0.3em] font-bold">Dashboard Capabilities</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <h5 className="font-bold text-sm uppercase tracking-widest text-primary/80">Live Monitoring</h5>
                    <p className="text-xs text-black/40 dark:text-white/40 leading-relaxed">Track active calls, completed sessions, dropped interactions, and overall system health in real time.</p>
                  </div>
                  <div className="space-y-4">
                    <h5 className="font-bold text-sm uppercase tracking-widest text-primary/80">Call Analytics</h5>
                    <p className="text-xs text-black/40 dark:text-white/40 leading-relaxed">Visualize AI versus human handoffs, interaction trends, and operational metrics through interactive charts.</p>
                  </div>
                  <div className="space-y-4">
                    <h5 className="font-bold text-sm uppercase tracking-widest text-primary/80">Quality Insights</h5>
                    <p className="text-xs text-black/40 dark:text-white/40 leading-relaxed">Monitor transcription quality, processing latency, and system performance to identify bottlenecks.</p>
                  </div>
                  <div className="space-y-4">
                    <h5 className="font-bold text-sm uppercase tracking-widest text-primary/80">Call Inspection</h5>
                    <p className="text-xs text-black/40 dark:text-white/40 leading-relaxed">Review detailed call logs, AI processing steps, and escalation events for debugging and evaluation.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center relative device-container order-1 lg:order-2">
              <div className="relative flex items-center justify-center group w-full hardware-frame">
                <button onClick={handlePrev} className="absolute left-0 md:-left-12 lg:-left-20 z-30 p-8 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all text-black/20 dark:text-white/20 hover:text-black dark:hover:text-white bg-white/50 dark:bg-transparent backdrop-blur-sm md:backdrop-blur-none pointer-events-auto">
                  <ChevronLeft size={56} strokeWidth={0.5} />
                </button>
                <div className="relative z-20">
                  <div className="w-[320px] h-[640px] md:w-[380px] md:h-[720px] border-[12px] border-[#e2e2e2] dark:border-[#111111] rounded-[56px] shadow-[0_40px_120px_rgba(0,0,0,0.15)] dark:shadow-[0_40px_120px_rgba(0,0,0,0.9)] bg-white dark:bg-black overflow-hidden relative flex items-center justify-center ring-1 ring-black/10 dark:ring-white/10 transition-colors duration-700">
                    <div className="w-full h-full relative overflow-hidden bg-black/5 dark:bg-white/5">
                      <img key={activeIndex} src={`/projects/zentry/${activeIndex}.png`} alt={`Zentry Dashboard ${activeIndex}`} className="w-full h-full object-cover animate-fade-in" />
                    </div>
                  </div>
                  <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[90%] h-16 bg-primary/5 dark:bg-primary/10 blur-3xl -z-10" />
                </div>
                <button onClick={handleNext} className="absolute right-0 md:-right-12 lg:-right-20 z-30 p-8 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all text-black/20 dark:text-white/20 hover:text-black dark:hover:text-white bg-white/50 dark:bg-transparent backdrop-blur-sm md:backdrop-blur-none pointer-events-auto">
                  <ChevronRight size={56} strokeWidth={0.5} />
                </button>
              </div>
              <div className="flex items-center gap-10 mt-20 font-code text-[11px] tracking-[0.6em] opacity-40">
                <span>{String(activeIndex).padStart(2, '0')}</span>
                <div className="w-32 h-px bg-black/20 dark:bg-white/20 relative">
                  <div className="absolute top-0 left-0 h-full bg-primary transition-all duration-700 ease-out" style={{ width: `${(activeIndex / totalScreens) * 100}%` }} />
                </div>
                <span>{String(totalScreens).padStart(2, '0')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 04. Editorial Footer */}
        <footer className="py-32 px-8 md:px-16 lg:px-24 border-t border-black/10 dark:border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-12 bg-[#f4f4f0] dark:bg-[#050505] transition-colors duration-700">
          <div className="text-[10px] font-code opacity-40 uppercase tracking-[0.3em] font-bold">
            ENGINEERED BY HABEL • ZENTRY
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