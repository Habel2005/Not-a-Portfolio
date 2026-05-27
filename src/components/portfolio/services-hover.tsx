
"use client";

import { useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

const expertise = [
  { 
    id: "01", 
    title: "Creative Web", 
    subtitle: "WebGL, Next.js, High-Fidelity UI",
    img: "https://picsum.photos/seed/web-wireframe/800/1000",
    route: "/projects/zero"
  },
  { 
    id: "02", 
    title: "Mobile Ecosystem", 
    subtitle: "Flutter, Kotlin, Native Arch",
    img: "https://picsum.photos/seed/mobile-schema/800/1000",
    route: "/projects/learnquest"
  },
  { 
    id: "03", 
    title: "Systems Architecture", 
    subtitle: "ERP, Dashboards, Data Logic",
    img: "https://picsum.photos/seed/system-terminal/800/1000",
    route: "/projects/zentry"
  }
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
      <div className="px-8 max-w-screen-2xl mx-auto relative z-10">
        <div className="text-metadata text-primary mb-32 tracking-[0.3em] uppercase opacity-60">03 / Capabilities</div>
        
        <div className="w-full">
          {expertise.map((item) => (
            <div
              key={item.id}
              onClick={() => router.push(item.route)}
              className="group relative border-b border-background/5 py-12 md:py-20 flex flex-col md:flex-row justify-between md:items-end cursor-none hover:pl-12 transition-all duration-700 ease-in-out"
              onMouseEnter={() => setActiveImg(item.img)}
              onMouseLeave={() => setActiveImg(null)}
            >
              <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                <span className="text-metadata opacity-20 font-code tracking-[0.2em] hidden md:block">
                  {item.id}
                </span>
                <div>
                   <h3 className="text-5xl md:text-9xl font-headline font-bold uppercase tracking-tighter group-hover:text-primary transition-all duration-500 leading-[0.8]">
                     {item.title}
                   </h3>
                   <p className="text-xs md:text-sm font-code uppercase tracking-widest opacity-40 mt-6 group-hover:opacity-100 transition-opacity">
                     [{item.subtitle}]
                   </p>
                </div>
              </div>
              
              <div className="hidden md:block overflow-hidden h-12">
                <ArrowUpRight className="w-12 h-12 text-primary transition-transform duration-700 translate-y-full group-hover:translate-y-0" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Dynamic Preview */}
      <div 
        ref={previewRef}
        className={`fixed top-0 left-0 w-[22vw] h-[30vw] max-w-[400px] pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${activeImg ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
      >
        <img 
          src={activeImg || ""} 
          alt="" 
          className="w-full h-full object-cover grayscale brightness-50 shadow-2xl border border-white/10" 
          data-ai-hint="editorial monochrome"
        />
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
      </div>

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
    </section>
  );
}
