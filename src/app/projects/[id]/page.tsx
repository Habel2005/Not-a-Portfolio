"use client";

import { useParams, useRouter } from "next/navigation";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowLeft, X } from "lucide-react";
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
    
    // Reset body state for high-contrast reading
    document.body.style.backgroundColor = "#050505";
    document.body.style.color = "#ffffff";

    gsap.from(".project-reveal", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: "expo.out",
      clearProps: "all"
    });

    generateEditorialCopy({ 
      context: `Project: ${project.description}. Tone: Brutalist luxury. High fashion.`,
      tone: "brutalist luxury"
    }).then(setCopy);

  }, [project]);

  const handleBack = () => {
    // Navigate back and force scroll top to ensure the Home re-initializes correctly
    router.push("/");
  };

  if (!project) return <div className="p-24 text-center">Project not found.</div>;

  return (
    <main className="bg-void-black min-h-screen text-white selection:bg-primary selection:text-void-black">
      <nav className="fixed top-0 left-0 w-full p-8 md:p-12 flex justify-between items-center z-50 mix-blend-difference">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-metadata hover:text-primary transition-colors group"
        >
          <X className="w-4 h-4 group-hover:rotate-90 transition-transform" /> 
          <span>CLOSE_ARCHIVE</span>
        </button>
        <div className="text-metadata opacity-40 uppercase">REF_{project.id}</div>
      </nav>

      <section className="pt-48 px-8 md:px-16 max-w-screen-2xl mx-auto pb-48">
        <div className="grid grid-cols-12 gap-12 items-end mb-48">
          <div className="col-span-12 lg:col-span-10">
            <h1 className="text-[12vw] font-headline font-bold leading-[0.8] uppercase tracking-tighter project-reveal">
              {copy?.headline || project.description}
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-2">
            <div className="space-y-8 project-reveal">
              <div className="text-metadata text-primary">Technical Identity</div>
              <p className="text-lg font-body leading-tight opacity-70">
                {copy?.body || "Precision architectural development meet cinematic digital motion."}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full aspect-video overflow-hidden bg-white/5 mb-64 project-reveal border border-white/10 group relative">
          <img 
            src={project.imageUrl} 
            alt={project.description}
            className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[2s] ease-in-out"
          />
        </div>

        <div className="grid grid-cols-12 gap-12 md:gap-24 mb-64">
          <div className="col-span-12 lg:col-span-5 space-y-16 project-reveal">
            <div className="text-metadata">Architecture</div>
            <h3 className="text-6xl md:text-8xl font-headline font-bold uppercase tracking-tighter leading-none">
              The Art of <span className="italic text-primary">Structure</span>.
            </h3>
            <p className="text-2xl opacity-60 font-body leading-relaxed">
              Every system is built with spatial logic. We reject generic interfaces in favor of heavy, intentional experiences that command presence.
            </p>
            <div className="flex flex-wrap gap-4">
              {['TypeScript', 'Three.js', 'GSAP', 'NextJS'].map(tag => (
                <div key={tag} className="px-6 py-2 border border-white/20 text-metadata text-[10px]">
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-12 lg:col-span-7 h-[100vh] relative project-reveal">
            <img 
              src={`https://picsum.photos/seed/${project.id}-detail/1400/2000`} 
              alt="Detail Fragment" 
              className="w-full h-full object-cover grayscale brightness-40"
            />
            <div className="absolute bottom-12 left-12 text-metadata text-white">FRAGMENT_REF_01</div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-48 px-8 md:px-16 flex justify-between items-center bg-white text-void-black">
        <div className="text-metadata opacity-40">END_OF_ENTRY</div>
        <button 
          onClick={handleBack}
          className="text-4xl md:text-[8vw] font-headline font-bold uppercase tracking-tighter hover:text-primary transition-all flex items-center gap-8 group"
        >
          <span>RETURN_TO_CORE</span>
          <ArrowLeft className="w-16 h-16 md:w-24 md:h-24 group-hover:-translate-x-4 transition-transform" />
        </button>
      </footer>
    </main>
  );
}
