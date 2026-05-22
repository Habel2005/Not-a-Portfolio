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
    
    // Entrance Animation
    gsap.from(".project-reveal", {
      y: 100,
      opacity: 0,
      duration: 1.4,
      stagger: 0.2,
      ease: "expo.out",
    });

    // AI Copy Gen
    generateEditorialCopy({ 
      context: `Project title: ${project.description}. Category: Digital Architecture.`,
      tone: "brutalist luxury"
    }).then(setCopy);
  }, [project]);

  if (!project) return <div>Project not found</div>;

  return (
    <main className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-background">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50 mix-blend-difference">
        <button 
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-metadata hover:text-primary transition-colors group"
        >
          <X className="w-4 h-4 group-hover:rotate-90 transition-transform" /> 
          <span>Esc_Archive</span>
        </button>
        <div className="text-metadata">Habel / Case_Study_{project.id}</div>
      </nav>

      <section className="pt-48 px-8 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-12 gap-12 items-end mb-32">
          <div className="col-span-12 md:col-span-8">
            <h1 className="text-[12vw] font-headline font-bold leading-[0.85] uppercase tracking-tighter project-reveal">
              {copy?.headline || project.description}
            </h1>
          </div>
          <div className="col-span-12 md:col-span-4 pb-4">
            <div className="space-y-6 project-reveal">
              <div className="text-metadata text-primary">Overview</div>
              <p className="text-xl font-body leading-relaxed opacity-60">
                {copy?.body || "Analyzing the intersection of form and function through a lens of digital brutalism."}
              </p>
            </div>
          </div>
        </div>

        {/* Cinematic Imagery */}
        <div className="w-full aspect-video overflow-hidden bg-void-black mb-48 project-reveal">
          <img 
            src={project.imageUrl} 
            alt={project.description}
            className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-[2s] scale-110 hover:scale-100"
          />
        </div>

        <div className="grid grid-cols-12 gap-24 mb-64">
          <div className="col-span-12 md:col-span-5 space-y-12 project-reveal">
            <div className="text-metadata">The Intent</div>
            <h3 className="text-5xl font-headline font-bold uppercase tracking-tighter">
              Rejecting the <span className="italic text-primary">Standard</span> interface.
            </h3>
            <p className="text-lg opacity-60 font-body leading-relaxed">
              Every interaction is weighted. We utilized kinetic force fields to guide the user's focus, ensuring the archive feels like a living, breathing architectural entity rather than a static page.
            </p>
          </div>
          <div className="col-span-12 md:col-span-7 h-[120vh] relative project-reveal">
            <img 
              src={`https://picsum.photos/seed/${project.id}-detail/1200/1800`} 
              alt="Detail" 
              className="w-full h-full object-cover grayscale"
            />
            <div className="absolute top-12 right-12 text-metadata text-white">Fragment_01</div>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <footer className="border-t border-foreground/5 py-24 px-8 flex justify-between items-center bg-foreground text-background">
        <div className="text-metadata opacity-40 uppercase">Next Project</div>
        <button className="text-4xl md:text-7xl font-headline font-bold uppercase tracking-tighter hover:text-primary transition-colors flex items-center gap-8">
          Perspective Shard <ArrowRight className="w-12 h-12" />
        </button>
      </footer>
    </main>
  );
}