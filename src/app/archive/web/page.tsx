"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X, ArrowUpRight, Github, Code2 } from "lucide-react";
import { useRouter } from "next/navigation";

const webProjects = [
    { 
      id: "01",
      name: "Aura-Journal", 
      tags: ["Next.js", "React", "Awwwards"], 
      type: "Open Source", 
      desc: "A minimalistic daily reflection journal focused on typographic hierarchy and micro-interactions.",
      img: "/services/web/aura.jpeg",
      github: "https://github.com/Habel2005/Aura-Journal",
      live: "https://aura-journal-eta.vercel.app/"
    },
    { 
      id: "02",
      name: "Mono-Frame", 
      tags: ["Node.js", "Studio", "High-Fashion"], 
      type: "Template", 
      desc: "An editorial e-commerce template designed for high-fashion brutalist aesthetics.",
      img: "/services/web/mono.jpeg",
      github: "https://github.com/Habel2005/Mono-Frame",
      live: "https://mono-frame-iota.vercel.app/"
    },
    { 
      id: "03",
      name: "Opus-Nexus", 
      tags: ["Next.js", "Luxury Design", "Awwwards"], 
      type: "Open Source", 
      desc: "A digital presence platform showcasing luxury design and high-end brand aesthetics.",
      img: "/services/web/opus.jpeg",
      github: "https://github.com/Habel2005/Opus-Nexus",
      live: "https://opus-nexus.vercel.app/"
    },
    { 
      id: "04",
      name: "VividCanvas", 
      tags: ["Node.js", "Editorial", "TypeScript"], 
      type: "Template", 
      desc: "An editorial design studio template with a deep focus on Awwwards-inspired typography.",
      img: "/services/web/vivid.jpeg",
      github: "https://github.com/Habel2005/VividCanvas",
      live: "https://vivid-canvas.vercel.app/"
    },
    { 
      id: "05",
      name: "Genesis-Studio", 
      tags: ["Next.js", "WebGL"], 
      type: "Open Source", 
      desc: "A spatial computing laboratory landing page experimenting with Three.js rendering.",
      img: "/services/web/genesis.jpeg",
      github: "https://github.com/Habel2005/Genesis-Studio",
      live: "https://genesis-studio-ashy.vercel.app/"
    },
    { 
      id: "06",
      name: "Bloom-Ai", 
      tags: ["Landing Page", "TypeScript"], 
      type: "Template", 
      desc: "A cutting-edge AI landing page featuring modern web animations and kinetic scrolling.",
      img: "/services/web/bloom.jpeg",
      github: "https://github.com/Habel2005/Bloom-Ai",
      live: "https://bloom-ai-dun.vercel.app/"
    },
    { 
      id: "07",
      name: "CloudCanvas", 
      tags: ["React", "Next.js", "TypeScript"], 
      type: "Template", 
      desc: "A robust template focusing on fluid transitions and modern React component architecture.",
      img: "/services/web/cloudcanvas.jpeg",
      github: "https://github.com/Habel2005/CloudCanvas",
      live: "https://cloud-canvas-six.vercel.app/"
    }
];

export default function WebArchive() {
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    
    // State to track which project is currently clicked/expanded
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    useEffect(() => {
        gsap.set("body", { backgroundColor: "#050505", color: "#ffffff" });
        const ctx = gsap.context(() => {
            gsap.from(".archive-row", {
                opacity: 0,
                y: 40,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                clearProps: "all" // FIX 1: Cleans up GSAP's inline styles to prevent CSS conflicts
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const toggleExpand = (index: number) => {
        setExpandedIndex(prev => prev === index ? null : index);
    };

    return (
        <main ref={containerRef} className="min-h-screen bg-[#050505] text-white font-body selection:bg-primary selection:text-black">
            
            <nav className="fixed top-0 left-0 w-full p-8 md:p-12 flex justify-between items-center z-[100] mix-blend-difference pointer-events-none">
                <button onClick={() => router.back()} className="pointer-events-auto flex items-center gap-3 text-white/50 hover:text-primary transition-colors">
                    <X size={20} />
                    <span className="text-[10px] font-code uppercase tracking-[0.3em]">RETURN_CORE</span>
                </button>
                <div className="text-[10px] font-code tracking-[0.3em] uppercase text-primary">
                  01 // CREATIVE_WEB
                </div>
            </nav>

            <section className="pt-40 px-4 md:px-8 max-w-[1800px] mx-auto pb-32">
                <div className="flex items-center gap-3 mb-16 px-4">
                  <Code2 size={14} className="text-primary" />
                  <span className="text-[10px] font-code tracking-[0.4em] uppercase opacity-50">Web Repository</span>
                </div>

                <div className="border-t border-white/10 flex flex-col">
                    {webProjects.map((project, i) => {
                        const isExpanded = expandedIndex === i;

                        return (
                            <div
                                key={project.id}
                                onClick={() => toggleExpand(i)}
                                // FIX 2: Replaced 'transition-all' with 'transition-[height]'
                                className={`archive-row relative border-b border-white/10 cursor-pointer overflow-hidden transition-[height] duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${isExpanded ? 'h-[70vh] md:h-[60vh]' : 'h-[15vh] md:h-[20vh]'}`}
                            >
                                {/* Background Image (Only visible when expanded) */}
                                <div 
                                  className={`absolute inset-0 z-0 transition-opacity duration-700 delay-100 ${isExpanded ? 'opacity-40' : 'opacity-0'}`}
                                >
                                    <img src={project.img} alt={project.name} className="w-full h-full object-cover grayscale" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
                                </div>

                                {/* Default Closed Content */}
                                <div className="absolute top-0 left-0 w-full h-[15vh] md:h-[20vh] flex items-center justify-between px-4 md:px-8 z-10">
                                    <div className="flex items-baseline gap-6 md:gap-12">
                                        <span className={`text-[10px] font-code transition-colors duration-500 ${isExpanded ? 'text-primary' : 'text-white/20'}`}>
                                          {project.id}
                                        </span>
                                        <h2 className={`text-4xl md:text-7xl lg:text-[7vw] font-headline font-bold uppercase tracking-tighter transition-all duration-500 ${isExpanded ? 'text-white' : 'text-white/60 hover:text-white'}`}>
                                            {project.name}
                                        </h2>
                                    </div>
                                    
                                    <div className="hidden lg:flex items-center gap-4">
                                        {project.tags.map(tag => (
                                            <span key={tag} className={`px-4 py-1.5 border rounded-full text-[9px] font-code uppercase tracking-widest transition-colors duration-500 ${isExpanded ? 'border-primary/30 text-primary' : 'border-white/10 text-white/40'}`}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Expanded Detail Content */}
                                <div className={`absolute bottom-0 left-0 w-full p-6 md:p-12 z-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 transition-all duration-700 ${isExpanded ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                                    <div className="max-w-2xl">
                                        <p className="text-xl md:text-3xl font-light leading-[1.2] tracking-tight text-white/90">
                                            {project.desc}
                                        </p>
                                        <div className="flex lg:hidden flex-wrap gap-2 mt-6">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="px-3 py-1 border border-primary/30 rounded-full text-[9px] font-code uppercase tracking-widest text-primary">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[10px] font-code uppercase tracking-widest text-white hover:text-primary transition-colors border border-white/20 hover:border-primary px-6 py-3 rounded-full bg-black/50 backdrop-blur-md">
                                            <Github size={16} /> Code
                                        </a>
                                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[10px] font-code uppercase tracking-widest text-black bg-white hover:bg-primary transition-colors px-6 py-3 rounded-full">
                                            <ArrowUpRight size={16} /> Live Demo
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}