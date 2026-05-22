import { Hero } from "@/components/portfolio/hero";
import { ProjectCarousel } from "@/components/portfolio/project-carousel";
import { StudioNarrative } from "@/components/portfolio/studio-narrative";
import { ServicesHover } from "@/components/portfolio/services-hover";
import { CustomCursor } from "@/components/portfolio/custom-cursor";

export default function Home() {
  return (
    <main className="relative bg-background text-foreground min-h-screen">
      <CustomCursor />
      
      {/* 01: Cinematic Hero */}
      <Hero />
      
      {/* 02: Dynamic Horizontal Showcase */}
      <ProjectCarousel />
      
      {/* 03: Editorial Personal Narrative */}
      <StudioNarrative />
      
      {/* 04: Interactive Expertise List */}
      <ServicesHover />
      
      <footer className="py-48 px-8 bg-foreground text-background text-center overflow-hidden">
        <div className="text-metadata mb-12 text-primary">Let's connect / Available 2024</div>
        <h2 className="text-huge font-headline font-bold tracking-tighter opacity-10 uppercase select-none italic">
          Habel Archive
        </h2>
        <div className="mt-24 flex justify-center gap-12 text-metadata hover:text-primary transition-colors cursor-pointer">
          <span>LinkedIn</span>
          <span>Twitter</span>
          <span>Github</span>
        </div>
      </footer>
    </main>
  );
}