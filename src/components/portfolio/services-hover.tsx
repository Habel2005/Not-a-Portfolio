"use client";

import { useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

const repositoryIndex = [
  {
    id: "01",
    title: "Web Apps",
    img: "/services/web.jpeg", 
    route: "/archive/web"
  },
  {
    id: "02",
    title: "Mobile Apps",
    img: "/services/mob.jpeg", 
    route: "/archive/mobile"
  },
  {
    id: "03",
    title: "Systems & Utility",
    img: "/services/sys.jpeg", 
    route: "/archive/systems"
  },
];

export function ServicesHover() {
  const [activeImg, setActiveImg] = useState<string>(repositoryIndex[0].img);
  const [isHovered, setIsHovered] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onMouseMove = (e: React.MouseEvent) => {
    // Only run GSAP if it's a desktop device (avoids mobile touch bugs)
    if (!previewRef.current || window.innerWidth < 768) return;
    
    gsap.to(previewRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  return (
    <section
      // Added min-h-[100svh] and flex to perfectly center the content and fill the whole screen on mobile
      className="min-h-[100svh] flex flex-col justify-center py-20 md:pt-32 md:pb-8 bg-foreground text-background relative overflow-hidden"
      onMouseMove={onMouseMove}
    >
      <div className="px-6 md:px-8 max-w-7xl mx-auto w-full relative z-10">
        {/* Adjusted bottom margin for mobile */}
        <div className="text-metadata text-primary mb-12 md:mb-32 opacity-80 uppercase tracking-widest">
          03 / Capabilities
        </div>

        <div className="w-full">
          {repositoryIndex.map((item) => (
            <div
              key={item.id}
              onClick={() => router.push(item.route, { scroll: false })}
              // Adjusted vertical padding for mobile items
              className="group relative border-b border-background/10 py-8 md:py-20 flex items-center cursor-pointer md:hover:pl-12 transition-all duration-700 ease-in-out"
              onMouseEnter={() => {
                setActiveImg(item.img);
                setIsHovered(true);
              }}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Tightened gap for mobile */}
              <div className="flex items-baseline gap-6 md:gap-12 w-full">
                <span className="text-metadata opacity-20 hidden sm:block">{item.id}</span>

                <div className="flex items-center justify-between md:justify-start gap-6 md:gap-8 w-full md:w-auto">
                  {/* Scaled text for mobile so it doesn't awkwardly break lines */}
                  <h3 className="text-4xl sm:text-5xl md:text-9xl font-headline font-bold uppercase tracking-tighter group-hover:text-primary transition-all duration-500">
                    {item.title}
                  </h3>

                  {/* Arrow remains visible on desktop, hidden on very small screens to save space */}
                  <div className="hidden sm:block overflow-hidden h-8 w-8 md:h-20 md:w-20 relative">
                    <ArrowUpRight className="w-full h-full text-background transition-transform duration-700 md:translate-y-full md:group-hover:translate-y-0" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Dynamic Preview - Hidden entirely on mobile using `hidden md:block` */}
      <div
        ref={previewRef}
        className={`hidden md:block fixed top-0 left-0 w-[35vw] h-[22vw] max-w-[500px] max-h-[320px] pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
      >
        <img
          src={activeImg}
          alt="Project Preview"
          className="w-full h-full object-cover grayscale brightness-75 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-background/10"
        />
        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
      </div>

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
    </section>
  );
}