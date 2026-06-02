"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X, ArrowUpRight, Github, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";

const mobileProjects = [
    {
        id: "01",
        name: "LearnQuest",
        tags: ["Flutter", "Dart", "AI Curation"],
        type: "Application",
        desc: "An intelligent educational platform delivering hyper-personalized micro-learning paths.",
        images: ["/projects/learnquest/a8.png", "/projects/learnquest/a1.png", "/projects/learnquest/a2.png", "/projects/learnquest/a3.png",
            "/projects/learnquest/a4.png", "/projects/learnquest/a5.png", "/projects/learnquest/a6.png", "/projects/learnquest/a7.png"
            , "/projects/learnquest/a9.png", "/projects/learnquest/a10.png", "/projects/learnquest/a11.png", "/projects/learnquest/a12.png"
            , "/projects/learnquest/a13.png", "/projects/learnquest/a14.png", "/projects/learnquest/a15.png", "/projects/learnquest/a16.png"
        ],
        github: "https://github.com/Habel2005/LearnQuest",
        live: "#"
    },
    {
        id: "02",
        name: "Kolo",
        tags: ["Kotlin", "Android", "Offline-First"],
        type: "Application",
        desc: "A high-fidelity liturgical companion engineered natively for the Malankara Jacobite Syrian Church.",
        images: ["/projects/kolo/3.png", "/projects/kolo/1.png", "/projects/kolo/2.png", "/projects/kolo/4.png",
            "/projects/kolo/5.png", "/projects/kolo/6.png", "/projects/kolo/7.png"
        ],
        github: "https://github.com/Habel2005/Kolo",
        live: "#"
    },
    {
        id: "03",
        name: "TaskApp",
        tags: ["Flutter", "Offline First", "Utility"],
        type: "Application",
        desc: "A fast, offline-first task management ecosystem built for seamless localized productivity.",
        images: ["/services/mobile/task/task.jpeg", "/services/mobile/task/task1.jpeg", "/services/mobile/task/task2.jpeg",
            "/services/mobile/task/task3.jpeg", "/services/mobile/task/task4.jpeg"
        ],
        github: "https://github.com/Habel2005/TaskApp",
        live: "#"
    },
    {
        id: "04",
        name: "Chat Room",
        tags: ["Flutter", "Dart", "Sockets"],
        type: "Application",
        desc: "A real-time messaging room and chat application exploring native socket connections.",
        images: ["/services/mobile/chat/app7.jpeg", "/services/mobile/chat/app.jpeg",
            "/services/mobile/chat/app2.jpeg", "/services/mobile/chat/app3.jpeg", "/services/mobile/chat/app4.jpeg",
            "/services/mobile/chat/app5.jpeg", "/services/mobile/chat/app6.jpeg"
        ],
        github: "https://github.com/Habel2005/chat",
        live: "#"
    },
    {
        id: "05",
        name: "Student-Portal",
        tags: ["Flutter", "Dart", "Education"],
        type: "Application",
        desc: "A dedicated portal facilitating direct academic communication and secure resource sharing.",
        images: ["/services/mobile/academics/5.jpeg", "/services/mobile/academics/1.jpeg", "/services/mobile/academics/2.jpeg",
            "/services/mobile/academics/3.jpeg", "/services/mobile/academics/4.jpeg", "/services/mobile/academics/6.jpeg",
            "/services/mobile/academics/7.jpeg"
        ],
        github: "https://github.com/Habel2005/Student-Teacher-Portal",
        live: "#"
    }
];

export default function MobileArchive() {
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [photoIndex, setPhotoIndex] = useState(0);


    useEffect(() => {
        gsap.set("body", { backgroundColor: "#050505", color: "#ffffff" });
        const ctx = gsap.context(() => {
            // Animate the entire page sliding up from the bottom left
            gsap.from(containerRef.current, {
                y: "100vh",
                x: "-15vw",
                rotationZ: -5, // Tilt the other way
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
                clearProps: "all"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const toggleExpand = (index: number) => {
        setExpandedIndex(prev => prev === index ? null : index);
        setPhotoIndex(0); // Reset to first image when opening a new project
    };

    return (
        <main ref={containerRef} className="min-h-screen bg-[#050505] text-white font-body selection:bg-primary selection:text-black h-screen w-full overflow-y-auto">

            <nav className="fixed top-0 left-0 w-full p-8 md:p-12 flex justify-between items-center z-[100] mix-blend-difference pointer-events-none">
                <button onClick={() => router.back()} className="pointer-events-auto flex items-center gap-3 text-white/50 hover:text-primary transition-colors">
                    <X size={20} />
                    <span className="text-[10px] font-code uppercase tracking-[0.3em]">RETURN_CORE</span>
                </button>
                <div className="text-[10px] font-code tracking-[0.3em] uppercase text-primary">
                    02 // MOBILE_ECOSYSTEM
                </div>
            </nav>

            <section className="pt-40 px-4 md:px-8 max-w-[1800px] mx-auto pb-32">
                <div className="flex items-center gap-3 mb-16 px-4">
                    <Smartphone size={14} className="text-primary" />
                    <span className="text-[10px] font-code tracking-[0.4em] uppercase opacity-50">App Repository</span>
                </div>

                <div className="border-t border-white/10 flex flex-col">
                    {mobileProjects.map((project, i) => {
                        const isExpanded = expandedIndex === i;

                        return (
                            <div
                                key={project.id}
                                onClick={() => toggleExpand(i)}
                                className={`archive-row relative border-b border-white/10 cursor-pointer overflow-hidden transition-[height] duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${isExpanded ? 'h-[85vh] md:h-[80vh]' : 'h-[15vh] md:h-[20vh]'}`}
                            >
                                {/* Ambient Background Glow */}
                                <div
                                    className={`absolute inset-0 z-0 transition-all duration-1000 delay-100 ${isExpanded ? 'opacity-30 blur-3xl scale-110' : 'opacity-0 blur-none scale-100'}`}
                                >
                                    <img src={project.images[0]} alt="Ambient glow" className="w-full h-full object-cover saturate-150" />
                                    <div className="absolute inset-0 bg-[#050505]/60 mix-blend-multiply" />
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

                                {/* Expanded Layout: Device Left, Glass Card Right */}
                                <div className={`absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12 z-20 flex flex-col-reverse md:flex-row justify-between items-end gap-8 transition-all duration-700 ${isExpanded ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-12 pointer-events-none'}`}>

                                    {/* Glassmorphism App Panel (Now on the Left) */}
                                    <div className="w-full max-w-lg bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 md:p-10 flex flex-col gap-8 shadow-2xl">
                                        <div className="flex justify-between items-start">
                                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                                <Smartphone size={20} />
                                            </div>
                                            <div className="text-[10px] font-code uppercase tracking-widest text-white/40 border border-white/10 px-3 py-1 rounded-full">
                                                {project.type}
                                            </div>
                                        </div>

                                        <p className="text-lg md:text-xl font-light leading-[1.4] tracking-tight text-white/90">
                                            {project.desc}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="px-3 py-1 bg-white/5 rounded-md text-[9px] font-code uppercase tracking-widest text-white/60">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-4 pt-4 border-t border-white/10 w-full">
                                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center gap-2 text-[10px] font-code uppercase tracking-widest text-white hover:text-primary transition-colors border border-white/20 hover:border-primary px-6 py-4 rounded-xl bg-white/5">
                                                <Github size={16} /> Code
                                            </a>
                                        </div>
                                    </div>

                                    {/* Uncropped Vertical Mobile Screenshot (Now Interactive) */}
                                    <div
                                        className="hidden md:block relative w-[240px] h-[480px] lg:w-[280px] lg:h-[560px] rounded-[2rem] border-[8px] border-[#111111] bg-black shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-700 translate-y-4 cursor-pointer group/phone -translate-x-80"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevents the row from collapsing when clicking the phone
                                            setPhotoIndex((prev) => (prev + 1) % project.images.length);
                                        }}
                                    >
                                        <img
                                            key={photoIndex} // Forces React to re-render and trigger animations
                                            src={project.images[photoIndex]}
                                            alt={`${project.name} Interface`}
                                            className="w-full h-full object-cover animate-fade-in"
                                        />

                                        {/* Screen Glare Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />

                                        {/* UI Hint: Tap to cycle */}
                                        {project.images.length > 1 && (
                                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-[9px] font-code uppercase tracking-widest text-white/80 opacity-0 group-hover/phone:opacity-100 transition-opacity duration-300 pointer-events-none border border-white/10">
                                                Tap to Cycle ({photoIndex + 1}/{project.images.length})
                                            </div>
                                        )}
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