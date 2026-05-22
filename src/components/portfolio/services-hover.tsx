"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const services = [
  { id: "01", title: "Creative Direction", img: "https://picsum.photos/seed/service1/600/800" },
  { id: "02", title: "Spatial Identity", img: "https://picsum.photos/seed/service2/600/800" },
  { id: "03", title: "Kinetic Development", img: "https://picsum.photos/seed/service3/600/800" },
  { id: "04", title: "Editorial Strategy", img: "https://picsum.photos/seed/service4/600/800" },
];

export function ServicesHover() {
  const [activeImg, setActiveImg] = useState<string | null>(null);

  return (
    <section className="py-48 bg-foreground text-background relative overflow-hidden">
      <div className="px-8 max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-metadata text-primary mb-12">Our Disciplines</div>
        
        <div className="w-full space-y-1">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative border-y border-background/10 py-12 flex justify-between items-center cursor-pointer hover:px-8 transition-all duration-500"
              onMouseEnter={() => setActiveImg(service.img)}
              onMouseLeave={() => setActiveImg(null)}
            >
              <div className="flex items-baseline gap-8">
                <span className="text-metadata opacity-20">{service.id}</span>
                <h3 className="text-4xl md:text-7xl font-headline font-bold uppercase tracking-tighter group-hover:italic group-hover:text-primary transition-all duration-300">
                  {service.title}
                </h3>
              </div>
              <ArrowUpRight className="w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      {/* Floating Preview Image */}
      {activeImg && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-[500px] pointer-events-none z-50 animate-in fade-in zoom-in duration-500">
          <img src={activeImg} alt="" className="w-full h-full object-cover shadow-2xl" />
        </div>
      )}
    </section>
  );
}