"use client";

import { useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";

const expertise = [
  { id: "01", title: "Creative Engineering", img: "https://picsum.photos/seed/exp1/800/1000" },
  { id: "02", title: "Spatial Interaction", img: "https://picsum.photos/seed/exp2/800/1000" },
  { id: "03", title: "Brutalist Systems", img: "https://picsum.photos/seed/exp3/800/1000" },
  { id: "04", title: "Kinetic Motion", img: "https://picsum.photos/seed/exp4/800/1000" },
];

export function ServicesHover() {
  const [activeImg, setActiveImg] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

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
        <div className="text-metadata text-primary mb-32">03 / Capabilities</div>
        
        <div className="w-full">
          {expertise.map((item) => (
            <div
              key={item.id}
              className="group relative border-b border-background/5 py-12 md:py-20 flex justify-between items-end cursor-none hover:pl-12 transition-all duration-700 ease-in-out"
              onMouseEnter={() => setActiveImg(item.img)}
              onMouseLeave={() => setActiveImg(null)}
            >
              <div className="flex items-baseline gap-12">
                <span className="text-metadata opacity-20">{item.id}</span>
                <h3 className="text-5xl md:text-9xl font-headline font-bold uppercase tracking-tighter group-hover:text-primary transition-all duration-500">
                  {item.title}
                </h3>
              </div>
              <div className="hidden md:block overflow-hidden h-12">
                <ArrowUpRight className="w-12 h-12 transition-transform duration-700 translate-y-full group-hover:translate-y-0" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Dynamic Preview */}
      <div 
        ref={previewRef}
        className={`fixed top-0 left-0 w-[20vw] h-[28vw] pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${activeImg ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
      >
        <img 
          src={activeImg || ""} 
          alt="" 
          className="w-full h-full object-cover grayscale shadow-2xl border border-white/10" 
        />
      </div>

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
    </section>
  );
}