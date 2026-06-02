"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X, ArrowUpRight, Github, Terminal, Cpu } from "lucide-react";
import { useRouter } from "next/navigation";

const systemsProjects = [
    {
        id: "01",
        name: "Personality Quiz",
        tags: ["Node.js", "TypeScript", "Web"],
        type: "System",
        desc: "A complex branching-logic web system designed to dynamically map user personality profiles.",
        img: "/services/system/person.jpeg",
        github: "https://github.com/Habel2005/Personality_Quiz",
        live: "https://personality-quiz-lac-psi.vercel.app/"
    },
    {
        id: "02",
        name: "Game Library",
        tags: ["html", "library", "web"],
        type: "Only Fun",
        desc: "An open library of HTML games and web experiments built for fun and learning.",
        img: "/services/system/game.jpeg",
        github: "https://github.com/Habel2005/dashboardstudio",
        live: "https://habel2005.github.io/the_hand/"
    },
    {
        id: "03",
        name: "FlashFlow",
        tags: ["TypeScript", "Fullstack", "Logic"],
        type: "Card Based Web Learning",
        desc: "A high-performance flashcard web application optimized for spaced repetition algorithmic learning.",
        img: "/services/system/flash.jpeg",
        github: "https://github.com/Habel2005/flashflow",
        live: "https://flashflow-tau.vercel.app/"
    },
    {
        id: "04",
        name: "Zentry AI",
        tags: ["Python", "Local LLM", "Telephony"],
        type: "Flagship System",
        desc: "A zero-latency telephony AI agent executing conversational Malayalam strictly on local GPU hardware.",
        img: "/services/system/zen.jpeg",
        github: "https://github.com/Habel2005/Zentry/tree/new",
        live: ""
    },
];

export default function SystemsArchive() {
    const containerRef = useRef<HTMLElement>(null);
    const router = useRouter();

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    useEffect(() => {
        gsap.set("body", { backgroundColor: "#050505", color: "#ffffff" });
        const ctx = gsap.context(() => {
            // Animate the entire page sliding up from the bottom right
            gsap.from(containerRef.current, {
                y: "100vh",
                x: "15vw",
                rotationZ: 5,
                opacity: 0,
                duration: 1.2,
                ease: "expo.out",
                clearProps: "all"
            });
            gsap.from(".archive-row", {
                opacity: 0,
                y: 40,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                clearProps: "all" // Fixes the GSAP/Tailwind conflict
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const toggleExpand = (index: number) => {
        setExpandedIndex(prev => prev === index ? null : index);
    };

    return (
        <div className="bg-[#050505] min-h-screen">
            {/* Navigation pulled OUTSIDE of main, with pointer-events-none */}
            <nav className="fixed top-0 left-0 w-full p-8 md:p-12 flex justify-between items-center z-[100] mix-blend-difference pointer-events-none text-white">
                <button onClick={() => router.back()} className="pointer-events-auto flex items-center gap-3 text-white/50 hover:text-primary transition-colors">
                    <X size={20} />
                    <span className="text-[10px] font-code uppercase tracking-[0.3em]">RETURN_CORE</span>
                </button>
                <div className="text-[10px] font-code tracking-[0.3em] uppercase text-primary">
                    03 // SYSTEMS_UTILITY
                </div>
            </nav>

            <main ref={containerRef} className="min-h-screen bg-[#050505] text-white font-body selection:bg-primary selection:text-black pt-40 px-4 md:px-8 max-w-[1800px] mx-auto pb-32 h-screen w-full overflow-y-auto">

                <div className="flex items-center gap-3 mb-16 px-4">
                    <Terminal size={14} className="text-primary" />
                    <span className="text-[10px] font-code tracking-[0.4em] uppercase opacity-50">Systems Infrastructure</span>
                </div>

                <div className="border-t border-white/10 flex flex-col">
                    {systemsProjects.map((project, i) => {
                        const isExpanded = expandedIndex === i;

                        return (
                            <div
                                key={project.id}
                                onClick={() => toggleExpand(i)}
                                // Strict transition-[height]
                                className={`archive-row relative border-b border-white/10 cursor-pointer overflow-hidden transition-[height] duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${isExpanded ? 'h-[75vh] md:h-[60vh]' : 'h-[15vh] md:h-[20vh]'}`}
                            >
                                {/* Technical Grid Background */}
                                <div
                                    className={`absolute inset-0 z-0 transition-opacity duration-700 delay-100 ${isExpanded ? 'opacity-20' : 'opacity-0'}`}
                                    style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}
                                />

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
                                            <span key={tag} className={`px-4 py-1.5 border rounded-sm text-[9px] font-code uppercase tracking-widest transition-colors duration-500 ${isExpanded ? 'border-primary/30 text-primary bg-primary/5' : 'border-white/10 text-white/40'}`}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Expanded Detail Content - Brutalist System Layout */}
                                <div className={`absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12 z-20 flex flex-col md:flex-row justify-between items-end gap-12 transition-all duration-700 ${isExpanded ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-12 pointer-events-none'}`}>

                                    {/* System Data Block (Left) */}
                                    <div className="w-full max-w-xl flex flex-col gap-8">
                                        <div className="flex items-center gap-4">
                                            <div className="px-3 py-1 bg-white/10 border border-white/20 text-[10px] font-code uppercase tracking-widest text-white/60 flex items-center gap-2">
                                                <Cpu size={12} /> {project.type}
                                            </div>
                                        </div>

                                        <p className="text-xl md:text-2xl font-light leading-[1.4] tracking-tight text-white/80 border-l-2 border-primary pl-6">
                                            {project.desc}
                                        </p>

                                        <div className="flex flex-wrap gap-2 md:hidden">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="px-3 py-1 border border-white/10 rounded-sm text-[9px] font-code uppercase tracking-widest text-white/60 bg-black">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-4 pt-4 mt-4">
                                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[10px] font-code uppercase tracking-widest text-black hover:bg-transparent hover:text-white transition-colors border border-white hover:border-white px-8 py-4 bg-white">
                                                <Github size={16} /> Repository
                                            </a>
                                            <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[10px] font-code uppercase tracking-widest text-white hover:text-primary transition-colors border border-white/20 hover:border-primary px-8 py-4 bg-[#111]">
                                                <ArrowUpRight size={16} /> Initialize
                                            </a>
                                        </div>
                                    </div>

                                    {/* Brutalist Terminal Window (Right) */}
                                    <div className="hidden md:flex flex-col w-[300px] lg:w-[450px] border border-white/20 bg-[#0a0a0a] shadow-2xl">
                                        {/* Terminal Top Bar */}
                                        <div className="flex items-center justify-between border-b border-white/20 px-4 py-3 bg-[#111]">
                                            <div className="flex items-center gap-2 text-white/40">
                                                <Terminal size={12} />
                                                <span className="text-[9px] font-code tracking-[0.2em] uppercase">sys_node // {project.id}</span>
                                            </div>
                                            <div className="flex gap-1.5">
                                                <div className="w-2 h-2 rounded-sm bg-white/20"></div>
                                                <div className="w-2 h-2 rounded-sm bg-white/20"></div>
                                                <div className="w-2 h-2 rounded-sm bg-primary/60"></div>
                                            </div>
                                        </div>
                                        {/* Terminal Content (Image) */}
                                        <div className="relative aspect-video w-full overflow-hidden p-2">
                                            <img src={project.img} alt={`${project.name} Architecture`} className="w-full h-full object-cover grayscale opacity-80 mix-blend-screen border border-white/10" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}