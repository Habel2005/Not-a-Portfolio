"use client";

import { useParams, useRouter } from "next/navigation";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
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
    
    // Ensure dark theme for immersive project reading
    document.body.style.backgroundColor = "#050505";
    document.body.style.color = "#ffffff";

    // Entrance Animation
    gsap.from(".project-reveal", {
      y: 80,
      opacity: 0,
      duration: 1.4,
      stagger: 0.1,
      ease: "expo.out",
      clearProps: "all"
    });

    // AI Copy Generation with Brutalist Tonality
    generateEditorialCopy({ 
      context: `Project: ${project.description}. Focus: Brutalist Digital Architecture. Creator: Habel.`,
      tone: "brutalist luxury"
    }).then(setCopy);

    return () => {
      // Revert body color is handled by page.tsx scrub, 
      // but if we exit completely we might want to reset.
    }
  }, [project]);

  if (!project) return <div className="p-24 text-center">Project not found.</div>;

  return (
    <main className="bg-void-black min-h-screen text-white selection:bg-primary selection:text-void-black">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 w-full p-8 md:p-12 flex justify-between items-center z-50 mix-blend-difference">
        <button 
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-metadata hover:text-primary transition-colors group"
        >
          <X className="w-4 h-4 group-hover:rotate-90 transition-transform" /> 
          <span>ESC_ARCHIVE</span>
        </button>
        <div className="text-metadata opacity-40">CASE_STUDY_REF_{project.id}</div>
      </nav>

      <section className="pt-48 px-8 md:px-16 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-12 gap-12 items-end mb-48">
          <div className="col-span-12 lg:col-span-10">
            <h1 className="text-[12vw] font-headline font-bold leading-[0.8] uppercase tracking-tighter project-reveal">
              {copy?.headline || project.description}
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-2">
            <div className="space-y-8 project-reveal">
              <div className="text-metadata text-primary">Technical Narrative</div>
              <p className="text-lg font-body leading-tight opacity-70">
                {copy?.body || "Reimagining architectural boundaries through digital interaction and spatial logic."}
              </p>
            </div>
          </div>
        </div>

        {/* Cinematic Imagery */}
        <div className="w-full aspect-video overflow-hidden bg-white/5 mb-64 project-reveal border border-white/10 group">
          <img 
            src={project.imageUrl} 
            alt={project.description}
            className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[2.5s] ease-in-out scale-110 group-hover:scale-100"
          />
        </div>

        <div className="grid grid-cols-12 gap-12 md:gap-24 mb-64">
          <div className="col-span-12 lg:col-span-5 space-y-16 project-reveal">
            <div className="text-metadata">Architecture</div>
            <h3 className="text-6xl md:text-8xl font-headline font-bold uppercase tracking-tighter leading-none">
              Precision as <span className="italic text-primary">Identity</span>.
            </h3>
            <p className="text-2xl opacity-60 font-body leading-relaxed max-w-md">
              For Habel, development is a spatial exercise. Every project is a system of intentional fragments, optimized for performance and visual weight.
            </p>
            <div className="flex flex-wrap gap-4">
              {['TypeScript', 'Three.js', 'GSAP', 'NextJS'].map(tag => (
                <div key={tag} className="px-6 py-2 border border-white/20 text-metadata text-[10px]">
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-12 lg:col-span-7 h-[120vh] relative project-reveal">
            <img 
              src={`https://picsum.photos/seed/${project.id}-detail/1400/2000`} 
              alt="Detail Fragment" 
              className="w-full h-full object-cover grayscale brightness-40"
            />
            <div className="absolute bottom-12 left-12 text-metadata text-white">FRAGMENT_IDX_701</div>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <footer className="border-t border-white/10 py-48 px-8 md:px-16 flex justify-between items-center bg-white text-void-black">
        <div className="text-metadata opacity-40">END_OF_ENTRY</div>
        <button 
          onClick={() => router.push("/")}
          className="text-4xl md:text-[8vw] font-headline font-bold uppercase tracking-tighter hover:text-primary transition-all flex items-center gap-8 group"
        >
          <span>CLOSE_ARCHIVE</span>
          <ArrowLeft className="w-16 h-16 md:w-24 md:h-24 group-hover:-translate-x-4 transition-transform" />
        </button>
      </footer>
    </main>
  );
}
