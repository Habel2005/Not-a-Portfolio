"use client";

import { useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

const repositoryIndex = [
  { id: "01", title: "Creative Web", img: "https://picsum.photos/seed/web-wireframe/800/1000", route: "/archive/web" },
  { id: "02", title: "Mobile Ecosystem", img: "https://picsum.photos/seed/mobile-schema/800/1000", route: "/archive/mobile" },
  { id: "03", title: "Systems & Utility", img: "https://picsum.photos/seed/system-terminal/800/1000", route: "/archive/systems" },
];

export function ServicesHover() {
  const [activeImg, setActiveImg] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onMouseMove = (e: React.MouseEvent) => {
    if (!previewRef.current) return;
    gsap.to(previewRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  return (
    <section 
      className="py-64 bg-foreground text-background relative overflow-hidden"
      onMouseMove={onMouseMove}
    >
      <div className="px-8 max-w-7xl mx-auto relative z-10">
        {/* Restored to your clean, simple header */}
        <div className="text-metadata text-primary mb-32">03 / The Archive</div>
        
        <div className="w-full">
          {repositoryIndex.map((item) => (
            <div
              key={item.id}
              onClick={() => router.push(item.route)}
              // Removed justify-between so elements stay close together
              className="group relative border-b border-background/5 py-12 md:py-20 flex items-center cursor-pointer hover:pl-12 transition-all duration-700 ease-in-out"
              onMouseEnter={() => setActiveImg(item.img)}
              onMouseLeave={() => setActiveImg(null)}
            >
              <div className="flex items-baseline gap-12">
                <span className="text-metadata opacity-20">{item.id}</span>
                
                {/* Grouped the Title and Arrow together so they stay perfectly tight */}
                <div className="flex items-center gap-6 md:gap-8">
                  <h3 className="text-5xl md:text-9xl font-headline font-bold uppercase tracking-tighter group-hover:text-primary transition-all duration-500">
                    {item.title}
                  </h3>
                  
                  {/* Arrow is standard color, sits right next to the text */}
                  <div className="hidden md:block overflow-hidden h-12 md:h-20">
                    <ArrowUpRight className="w-12 h-12 md:w-20 md:h-20 text-background transition-transform duration-700 translate-y-full group-hover:translate-y-0" />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Dynamic Preview - Kept the dark cinematic styling you liked */}
      <div 
        ref={previewRef}
        className={`fixed top-0 left-0 w-[25vw] h-[35vw] max-w-[400px] max-h-[500px] pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${activeImg ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
      >
        <img 
          src={activeImg || ""} 
          alt="" 
          className="w-full h-full object-cover grayscale brightness-50 shadow-2xl border border-background/10" 
        />
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
      </div>

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
    </section>
  );
}