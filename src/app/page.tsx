import { Hero } from "@/components/portfolio/hero";
import { ProjectCarousel } from "@/components/portfolio/project-carousel";
import { StudioNarrative } from "@/components/portfolio/studio-narrative";
import { ServicesHover } from "@/components/portfolio/services-hover";
import { CustomCursor } from "@/components/portfolio/custom-cursor";

export default function Home() {
  return (
    <main className="relative bg-background text-foreground min-h-screen">
      <CustomCursor />
      <Hero />
      <ProjectCarousel />
      <StudioNarrative />
      <ServicesHover />
      
      <footer className="py-24 px-8 border-t border-foreground/10 bg-background text-center">
        <div className="text-metadata mb-8">© 2024 Void Archive. All Rights Reserved.</div>
        <h2 className="text-huge font-headline font-bold tracking-tighter opacity-10 uppercase">
          Stay Void
        </h2>
      </footer>
    </main>
  );
}