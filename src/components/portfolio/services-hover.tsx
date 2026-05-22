"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const expertise = [
  { id: "01", title: "Creative Development", img: "https://picsum.photos/seed/exp1/800/1000" },
  { id: "02", title: "Interactive Strategy", img: "https://picsum.photos/seed/exp2/800/1000" },
  { id: "03", title: "UI Architecture", img: "https://picsum.photos/seed/exp3/800/1000" },
  { id: "04", title: "Motion Engineering", img: "https://picsum.photos/seed/exp4/800/1000" },
];

export function ServicesHover() {
  const [activeImg, setActiveImg] = useState<string | null>(null);

  return (
    <section className="py-64 bg-foreground text-background relative overflow-hidden">
      <div className="px-8 max-w-7xl mx-auto">
        <div className="text-metadata text-primary mb-24 text-center">03 / Expertise</div>
        
        <div className="w-full space-y-0">
          {expertise.map((item) => (
            <div
              key={item.id}
              className="group relative border-y border-background/5 py-16 flex justify-between items-center cursor-pointer hover:px-12 transition-all duration-700 ease-in-out"
              onMouseEnter={() => setActiveImg(item.img)}
              onMouseLeave={() => setActiveImg(null)}
            >
              <div className="flex items-baseline gap-12 relative z-10">
                <span className="text-metadata opacity-20">{item.id}</span>
                <h3 className="text-5xl md:text-9xl font-headline font-bold uppercase tracking-tighter group-hover:italic group-hover:text-primary transition-all duration-500">
                  {item.title}
                </h3>
              </div>
              <ArrowUpRight className="w-16 h-16 opacity-0 group-hover:opacity-100 transition-all duration-500 relative z-10" />
              
              {/* Background Reveal Effect */}
              <div className="absolute inset-0 bg-white/5 scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-bottom" />
            </div>
          ))}
        </div>
      </div>

      {/* Floating Cinematic Preview */}
      {activeImg && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[40vw] pointer-events-none z-50 animate-in fade-in zoom-in-95 duration-700">
          <img 
            src={activeImg} 
            alt="" 
            className="w-full h-full object-cover grayscale shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10" 
          />
        </div>
      )}
    </section>
  );
}