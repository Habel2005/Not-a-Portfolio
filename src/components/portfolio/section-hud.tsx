"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SECTIONS = [
  { id: "00", label: "Intro", trigger: "#hero" },
  { id: "01", label: "Archive", trigger: "#archive" },
  { id: "02", label: "Journey", trigger: "#narrative" },
  { id: "03", label: "Capabilities", trigger: "#services" },
  { id: "04", label: "Identity", trigger: "#footer" },
];

export function SectionHUD() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0]);
  const [isNavOpen, setIsNavOpen] = useState(false); // State to track toggle
  
  const progressRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const navTl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Entrance animation for all floating HUD elements
      gsap.from(".hud-element", {
        y: 20,
        opacity: 0,
        duration: 1.5,
        delay: 0.8,
        ease: "power3.out",
        stagger: 0.1
      });

      // 2. Setup the Dropdown Toggle Timeline (Paused by default)
      navTl.current = gsap.timeline({ paused: true })
        .to(".nav-wrapper", {
          height: "auto",
          opacity: 1,
          marginTop: "1.5rem",
          paddingTop: "1.5rem",
          duration: 0.4,
          ease: "power3.inOut"
        })
        .to(".nav-item", {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power3.out"
        }, "-=0.2");

    }, hudRef);

    // ==========================================
    // THE FIX: DELAYED TRIGGER INITIALIZATION
    // We wait 500ms to ensure all other components (like StudioNarrative) 
    // have finished mounting and creating their massive Pin Spacers, 
    // THEN we calculate the trigger positions.
    // ==========================================
    const timer = setTimeout(() => {
      SECTIONS.forEach((section) => {
        const targetElement = document.querySelector(section.trigger);
        if (targetElement) {
          ScrollTrigger.create({
            trigger: targetElement,
            start: "top center",
            end: "bottom center",
            onEnter: () => setActiveSection(section),
            onEnterBack: () => setActiveSection(section),
          });
        }
      });

      // Progress Meter
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }

      // Force GSAP to recalculate all DOM measurements now that everything is loaded
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  // Watch the toggle state and Play/Reverse the timeline
  useEffect(() => {
    if (isNavOpen) {
      navTl.current?.play();
    } else {
      navTl.current?.reverse();
    }
  }, [isNavOpen]);

  return (
    <div ref={hudRef} className="fixed inset-0 z-[100] pointer-events-none mix-blend-difference text-white">
      
      {/* 1. TOP RIGHT NAV */}
      {/* Changed pointer-events-none to pointer-events-auto so we can click the toggle */}
      <nav className="hud-element hidden md:flex absolute top-12 right-12 flex-col items-end text-right pointer-events-auto">
        <div className="flex flex-col items-end">
          
          {/* THE TITLE TOGGLE BUTTON */}
          <button 
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="group flex items-center gap-4 cursor-pointer py-1"
          >
            <div className="text-[10px] font-code tracking-[0.3em] uppercase opacity-40 group-hover:opacity-100 transition-opacity duration-300">
              Habel / Portfolio
            </div>
            {/* Animated Plus to Minus Icon */}
            <div className="relative w-3 h-3 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
              <div className="absolute w-full h-[1px] bg-white" />
              <div className={`absolute w-full h-[1px] bg-white transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${isNavOpen ? 'rotate-0' : 'rotate-90'}`} />
            </div>
          </button>

          {/* THE EXPANDABLE LIST */}
          <div className="nav-wrapper h-0 opacity-0 overflow-hidden border-t border-white/10 flex flex-col items-end gap-3 mt-0 pt-0">
            {SECTIONS.slice(1).map((link, idx) => (
              <button
                key={link.label}
                onClick={() => {
                  document.querySelector(link.trigger)?.scrollIntoView({
                    behavior: 'smooth'
                  });
                  // Auto-close the menu when a link is clicked
                  setIsNavOpen(false); 
                }}
                // Start the items shifted to the right and invisible
                className="nav-item opacity-0 translate-x-6 flex items-center gap-4 group py-0.5 relative"
              >
                <span className="text-[8px] font-code opacity-20 group-hover:opacity-100 group-hover:text-primary transition-all tracking-tighter">
                  [ 0{idx + 1} ]
                </span>
                <span className="text-[10px] font-code uppercase tracking-[0.25em] opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all">
                  {link.label}
                </span>
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-0 group-hover:h-2 bg-primary transition-all duration-300" />
              </button>
            ))}
          </div>
          
        </div>
      </nav>

      {/* 2. MIDDLE RIGHT PROGRESS HUD */}
      <div className="hud-element absolute right-8 md:right-12 top-1/2 -translate-y-1/2 flex gap-4 items-center flex-row-reverse">
        <div className="relative h-48 w-[1px] bg-white/10 overflow-hidden">
          <div 
            ref={progressRef}
            className="absolute top-0 left-0 w-full bg-primary h-0 transition-colors duration-500" 
          />
          <div className="absolute inset-0 flex flex-col justify-between py-1">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-full h-[1px] bg-white/20" />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 items-end text-right">
          <div className="text-[10px] font-code text-primary tracking-widest uppercase transition-colors duration-500">
            <span className="opacity-40">{activeSection.id} / </span>
            <span>{activeSection.label}</span>
          </div>
          <div className="h-[0.5px] w-4 bg-primary/30 animate-pulse" />
        </div>
        
        <div className="absolute -right-3 top-0 h-full flex flex-col justify-between text-[7px] font-code opacity-10 uppercase tracking-tighter vertical-text py-1">
          <span>LVL_0</span>
          <span>INDEX</span>
        </div>
      </div>

    </div>
  );
}