"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hero } from "@/components/portfolio/hero";
import { ProjectMatrix } from "@/components/portfolio/project-matrix";
import { StudioNarrative } from "@/components/portfolio/studio-narrative";
import { ServicesHover } from "@/components/portfolio/services-hover";
import { CustomCursor } from "@/components/portfolio/custom-cursor";
import { SectionHUD } from "@/components/portfolio/section-hud";
import Footer from "@/components/ui/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [isBooting, setIsBooting] = useState(true);

  // 1. Define the function that the Matrix will call when it's ready
  const handleMatrixLoaded = () => {
    gsap.to(".loader-wrapper", {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => setIsBooting(false)
    });
  };

  useEffect(() => {
    // Initial State reset
    gsap.set("body", { backgroundColor: "#f9f8f5", color: "#050505" });

    // Transition Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      }
    });

    tl.to("body", { backgroundColor: "#050505", color: "#ffffff", duration: 0.1 }, 0.1)
      .to("body", { backgroundColor: "#f9f8f5", color: "#050505", duration: 0.1 }, 0.4)
      .to("body", { backgroundColor: "#050505", color: "#ffffff", duration: 0.1 }, 1.85);

// 1. Pin the Hero so Archive scrolls OVER it
ScrollTrigger.create({
  trigger: "#hero",
  start: "top top",
  endTrigger: "#archive",
  end: "top top",
  pin: true,
  pinSpacing: false, // Magic property: lets next section overlap
});

// 2. Push the Hero backward and blur it
gsap.to("#hero-inner-content", {
  scale: 0.85,
  opacity: 0,
  filter: "blur(10px)",
  scrollTrigger: {
    trigger: "#archive",
    start: "top bottom", // When archive starts sliding up
    end: "top top",      // When archive hits the top
    scrub: true,
  }
});

// 3. Clip-Path Expansion on the Archive
gsap.fromTo("#archive",
  {
    clipPath: "inset(15% 10% 15% 10% round 24px)", // Starts as a window
  },
  {
    clipPath: "inset(0% 0% 0% 0% round 0px)", // Expands to full screen
    ease: "none",
    scrollTrigger: {
      trigger: "#archive",
      start: "top bottom",
      end: "top top",
      scrub: true,
    }
  }
);

// Fade out loader ONLY when app is ready
const handleLoad = () => {
  gsap.to(".loader-wrapper", {
    opacity: 0,
    pointerEvents: "none",
    duration: 0.6,
    ease: "power2.out",
    onComplete: () => setIsBooting(false)
  });
};

const timer = setTimeout(handleLoad, 2000);

return () => {
  ScrollTrigger.getAll().forEach(t => t.kill());
  clearTimeout(timer);
};
}, []);

return (
<main ref={mainRef} className="relative">
  <div className="loader-wrapper">
    {/* Loader contents remain unchanged */}
  </div>

  <CustomCursor />
  <SectionHUD />
  
  {/* We need the Hero to have no z-index clipping, so we keep it simple here */}
  <section id="hero" className="min-h-screen">
    <Hero />
  </section>
  
  {/* CRITICAL: Changed from bg-transparent to bg-[#050505] to block out the hero beneath it */}
  <section id="archive" className="relative h-screen overflow-hidden bg-[#050505]">
    <div className="absolute top-12 left-12 z-20 pointer-events-none">
      <div className="text-metadata opacity-40">01 / The Archive</div>
      <h2 className="text-4xl font-headline font-bold text-white uppercase tracking-tighter">
        Spatial Shards
      </h2>
    </div>
    <ProjectMatrix onLoaded={handleMatrixLoaded} />
  </section>
  
  <section id="narrative" className="min-h-screen">
    <StudioNarrative />
  </section>
  
  <section id="services" className="min-h-screen">
    <ServicesHover />
  </section>
  
  <Footer/>
</main>
);
}