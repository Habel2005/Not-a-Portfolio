"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X, ArrowUpRight, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";

const mobileProjects = [
    { name: "chat", tags: ["Flutter", "Dart", "Android"], year: "2024", type: "Application", img: "https://picsum.photos/seed/aura/800/600" },
    { name: "TaskApp", tags: ["Flutter", "Offline First", "Android"], year: "2024", type: "Utility", img: "https://picsum.photos/seed/aura/800/600" },
    { name: "Student-Teacher", tags: ["Flutter", "Dart", "Portal"], year: "2024", type: "Application", img: "https://picsum.photos/seed/aura/800/600" },
];

export default function MobileArchive() {
    const containerRef = useRef<HTMLDivElement>(null);
    const previewRef = useRef<HTMLDivElement>(null); // 2. Ref for the floating image
    const [activeImg, setActiveImg] = useState<string | null>(null); // 3. State to track hovered row
    const router = useRouter();

    // 4. GSAP Mouse tracking logic
    const onMouseMove = (e: React.MouseEvent) => {
        if (!previewRef.current) return;
        gsap.to(previewRef.current, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.6,
            ease: "power3.out",
        });
    };

    useEffect(() => {
        gsap.set("body", { backgroundColor: "#050505", color: "#ffffff" });
        const ctx = gsap.context(() => {
            gsap.from(".archive-row", { opacity: 0, y: 20, duration: 0.8, stagger: 0.1, ease: "power2.out" });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="min-h-screen bg-[#050505] text-white font-sans selection:bg-primary selection:text-black">
            <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50">
                <button onClick={() => router.push('/')} className="flex items-center gap-3 text-white/50 hover:text-primary transition-colors">
                    <X size={20} />
                    <span className="text-[10px] font-code uppercase tracking-[0.3em]">RETURN_CORE</span>
                </button>
                <div className="text-[10px] font-code tracking-[0.3em] uppercase text-primary">02 // MOBILE_ECOSYSTEM</div>
            </nav>

            <section className="pt-48 px-8 md:px-16 max-w-[1600px] mx-auto pb-32">
                <h1 className="text-6xl md:text-[8vw] font-headline font-bold uppercase tracking-tighter leading-none mb-24 flex items-end gap-6">
                    Mobile <span className="text-primary italic">Index.</span>
                </h1>

                <div className="border-t border-white/10">
                    <div className="grid grid-cols-12 gap-4 py-4 border-b border-white/10 text-[10px] font-code uppercase tracking-[0.2em] text-white/40">
                        <div className="col-span-5 md:col-span-4">Repository</div>
                        <div className="col-span-5 md:col-span-4 hidden md:block">Stack / Tags</div>
                        <div className="col-span-4 md:col-span-2">Type</div>
                        <div className="col-span-3 md:col-span-2 text-right">Link</div>
                    </div>

                    {mobileProjects.map((project, i) => (
                        <div key={i} className="archive-row grid grid-cols-12 gap-4 py-8 border-b border-white/5 items-center hover:bg-white/[0.02] transition-colors group">
                            <div className="col-span-7 md:col-span-4 font-headline text-2xl md:text-4xl font-bold uppercase tracking-tight group-hover:text-primary transition-colors">
                                {project.name}
                            </div>
                            <div className="col-span-12 md:col-span-4 hidden md:flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 border border-white/10 rounded-full text-[10px] font-code uppercase tracking-widest text-white/60">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="col-span-3 md:col-span-2 text-xs font-code uppercase tracking-widest text-white/40">
                                {project.type}
                            </div>
                            <div className="col-span-2 md:col-span-2 flex justify-end gap-4">
                                <button className="text-white/40 hover:text-white transition-colors"><Smartphone size={20} /></button>
                                <button className="text-white/40 hover:text-primary transition-colors"><ArrowUpRight size={20} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {/* 7. The Floating Cursor Image */}
            <div
                ref={previewRef}
                className={`fixed top-0 left-0 w-[300px] h-[200px] pointer-events-none z-40 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${activeImg ? 'opacity-100 scale-100 rotate-2' : 'opacity-0 scale-90 rotate-0'
                    }`}
            >
                <img
                    src={activeImg || ""}
                    alt="Project Preview"
                    className="w-full h-full object-cover shadow-2xl border border-white/10"
                />
                {/* Cinematic dimming overlay */}
                <div className="absolute inset-0 bg-[#050505]/20 mix-blend-overlay" />
            </div>
        </main>
    );
}