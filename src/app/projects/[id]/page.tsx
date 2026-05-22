"use client";

import { useParams, useRouter } from "next/navigation";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { generateEditorialCopy, type CopywritingOutput } from "@/ai/flows/copywriting-flow";

export default function ProjectPage() {
  const { id } = useParams();
  const router = useRouter();
  const project = PlaceHolderImages.find((p) => p.id === id);
  const [copy, setCopy] = useState<CopywritingOutput | null>(null);

  useEffect(() => {
    if (!project) return;
    
    // Force dark theme for project page
    document.body.style.backgroundColor = "#050505";
    document.body.style.color = "#fff";

    // Entrance Animation
    gsap.from(".project-reveal", {
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: "expo.out",
    });

    // AI Copy Gen
    generateEditorialCopy({ 
      context: `Project title: ${project.description}. Category: Digital Architecture. Creator: Habel.`,
      tone: "brutalist luxury"
    }).then(setCopy);
  }, [project]);

  if (!project) return <div>Project not found</div>;

  return (
    <main className="bg-void-black min-h-screen text-white selection:bg-primary selection:text-void-black">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50">
        <button 
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-metadata hover:text-primary transition-colors group"
        >
          <X className="w-4 h-4 group-hover:rotate-90 transition-transform" /> 
          <span>Esc_Archive</span>
        </button>
        <div className="text-metadata opacity-60">Habel / Case_Study_{project.id}</div>
      </nav>

      <section className="pt-48 px-8 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-12 gap-12 items-end mb-32">
          <div className="col-span-12 lg:col-span-9">
            <h1 className="text-[10vw] font-headline font-bold leading-[0.85] uppercase tracking-tighter project-reveal">
              {copy?.headline || project.description}
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-3 pb-4">
            <div className="space-y-6 project-reveal">
              <div className="text-metadata text-primary">Context</div>
              <p className="text-xl font-body leading-relaxed opacity-60">
                {copy?.body || "Analyzing the intersection of form and function through a lens of digital brutalism."}
              </p>
            </div>
          </div>
        </div>

        {/* Cinematic Imagery */}
        <div className="w-full aspect-video overflow-hidden bg-white/5 mb-48 project-reveal border border-white/10">
          <img 
            src={project.imageUrl} 
            alt={project.description}
            className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-[2s] scale-105 hover:scale-100"
          />
        </div>

        <div className="grid grid-cols-12 gap-24 mb-64">
          <div className="col-span-12 lg:col-span-5 space-y-12 project-reveal">
            <div className="text-metadata">Architecture</div>
            <h3 className="text-5xl font-headline font-bold uppercase tracking-tighter">
              A System of <span className="italic text-primary">Intentional</span> Fragments.
            </h3>
            <p className="text-lg opacity-60 font-body leading-relaxed">
              For Habel, code is more than logic—it is a spatial construct. This project focuses on high-performance animations and a layout that breathes through aggressive whitespace, mirroring the precision of physical architecture.
            </p>
            <div className="flex gap-8">
              <div className="px-4 py-2 border border-white/20 text-metadata">React</div>
              <div className="px-4 py-2 border border-white/20 text-metadata">Three.js</div>
              <div className="px-4 py-2 border border-white/20 text-metadata">GSAP</div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-7 h-[100vh] relative project-reveal">
            <img 
              src={`https://picsum.photos/seed/${project.id}-detail/1200/1800`} 
              alt="Detail" 
              className="w-full h-full object-cover grayscale brightness-50"
            />
            <div className="absolute top-12 right-12 text-metadata text-white">Fragment_01</div>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <footer className="border-t border-white/10 py-32 px-8 flex justify-between items-center bg-white text-void-black">
        <div className="text-metadata opacity-40 uppercase">Next Project</div>
        <button 
          onClick={() => router.push("/")}
          className="text-4xl md:text-7xl font-headline font-bold uppercase tracking-tighter hover:text-primary transition-colors flex items-center gap-8 group"
        >
          Perspective Shard <ArrowRight className="w-12 h-12 group-hover:translate-x-4 transition-transform" />
        </button>
      </footer>
    </main>
  );
}