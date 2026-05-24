
"use client";

import { useRouter } from "next/navigation";
import { X, Smartphone, Brain, Users, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import gsap from "gsap";

export default function LearnQuestPage() {
  const router = useRouter();

  useEffect(() => {
    gsap.set("body", { backgroundColor: "#f9f8f5", color: "#050505" });
    
    gsap.from(".learn-reveal", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out"
    });
  }, []);

  const handleBack = () => {
    window.location.href = "/";
  };

  return (
    <main className="bg-[#f9f8f5] min-h-screen text-void-black selection:bg-primary selection:text-void-black font-body">
      <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50">
        <button onClick={handleBack} className="flex items-center gap-2 text-metadata hover:text-primary transition-colors group">
          <X className="w-4 h-4 group-hover:rotate-90 transition-transform" /> 
          <span>EXIT_LEARN</span>
        </button>
        <div className="text-metadata opacity-40">MOBILE_DESIGN: LEARNQUEST_v2</div>
      </nav>

      <section className="pt-48 px-8 max-w-7xl mx-auto pb-64">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
          <div className="max-w-2xl">
            <div className="text-metadata text-primary mb-4 learn-reveal">PROJECT_ID: 002</div>
            <h1 className="text-[10vw] font-headline font-bold leading-[0.85] uppercase tracking-tighter learn-reveal">
              LearnQuest.
            </h1>
          </div>
          <div className="max-w-xs learn-reveal">
            <p className="text-lg opacity-60 leading-snug">
              An intelligent learning ecosystem that leverages semantic splitting to turn massive content into actionable daily quests.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-12 mb-64">
          <div className="col-span-12 md:col-span-5 learn-reveal">
            <div className="aspect-[9/16] bg-neutral-200 border border-black/5 overflow-hidden shadow-2xl">
              <img src="https://picsum.photos/seed/learn-mob/1080/1920" className="w-full h-full object-cover" alt="Mobile App" />
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 flex flex-col justify-center space-y-24 learn-reveal">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Brain className="w-8 h-8 text-primary" />
                <h3 className="text-4xl font-headline font-bold uppercase tracking-tight">Semantic Splitting</h3>
              </div>
              <p className="text-xl opacity-60 max-w-md">
                Our algorithm analyzes documentation and splits it into logical "knowledge shards" for optimized retention.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Users className="w-8 h-8 text-primary" />
                <h3 className="text-4xl font-headline font-bold uppercase tracking-tight">Buddy System</h3>
              </div>
              <p className="text-xl opacity-60 max-w-md">
                Social accountability mechanics integrated directly into the spaced-repetition loop.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-void-black text-white p-12 md:p-24 rounded-3xl learn-reveal">
          <h2 className="text-5xl md:text-7xl font-headline font-bold uppercase tracking-tighter mb-12">
            Spaced Repetition <br/><span className="italic text-primary">Logic Engine.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <p className="text-lg opacity-50">
              We redesigned the traditional flashcard interface into a "Quest" format, making deep work feel like a cinematic progression.
            </p>
            <div className="flex justify-end items-end">
              <button className="flex items-center gap-4 text-primary text-metadata group">
                VIEW_THE_PIPELINE <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-24 px-8 border-t border-black/5 flex flex-col items-center gap-12">
        <div className="text-metadata opacity-40">END_OF_CASE_STUDY</div>
        <button onClick={handleBack} className="text-6xl md:text-[10vw] font-headline font-bold uppercase tracking-tighter hover:text-primary transition-all">
          NEXT_PROJECT
        </button>
      </footer>
    </main>
  );
}
