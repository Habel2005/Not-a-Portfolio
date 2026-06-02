"use client";

import { useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

const repositoryIndex = [
  {
    id: "01",
    title: "Creative Web",
    img: "/services/web.jpeg", // Points to public/services/web-preview.webp
    route: "/archive/web"
  },
  {
    id: "02",
    title: "Mobile Ecosystem",
    img: "/services/mob.jpeg", // Points to public/services/mobile-preview.webp
    route: "/archive/mobile"
  },
  {
    id: "03",
    title: "Systems & Utility",
    img: "/services/sys.jpeg", // Points to public/services/systems-preview.webp
    route: "/archive/systems"
  },
];
export function ServicesHover() {
  // FIX: Pre-load the first image so the src is NEVER empty, preventing the broken icon
  const [activeImg, setActiveImg] = useState<string>(repositoryIndex[0].img);
  // FIX: Separate visibility state from the image source state
  const [isHovered, setIsHovered] = useState(false);

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
      className="pt-32 pb-8 bg-foreground text-background relative overflow-hidden"
      onMouseMove={onMouseMove}
    >
      <div className="px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-metadata text-primary mb-32">03 / The Archive</div>

        <div className="w-full">
          {repositoryIndex.map((item) => (
            <div
              key={item.id}
              onClick={() => router.push(item.route, { scroll: false })}
              className="group relative border-b border-background/5 py-12 md:py-20 flex items-center cursor-pointer hover:pl-12 transition-all duration-700 ease-in-out"
              onMouseEnter={() => {
                setActiveImg(item.img); // Change the image source
                setIsHovered(true);     // Trigger the fade-in
              }}
              onMouseLeave={() => setIsHovered(false)} // Trigger fade-out (Image source remains intact!)
            >
              <div className="flex items-baseline gap-12">
                <span className="text-metadata opacity-20">{item.id}</span>

                <div className="flex items-center gap-6 md:gap-8">
                  <h3 className="text-5xl md:text-9xl font-headline font-bold uppercase tracking-tighter group-hover:text-primary transition-all duration-500">
                    {item.title}
                  </h3>

                  <div className="hidden md:block overflow-hidden h-12 md:h-20">
                    <ArrowUpRight className="w-12 h-12 md:w-20 md:h-20 text-background transition-transform duration-700 translate-y-full group-hover:translate-y-0" />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Dynamic Preview */}
      {/* Floating Dynamic Preview */}
      <div
        ref={previewRef}
        // Swapped width and height ratios for a cinematic landscape rectangle
        className={`fixed top-0 left-0 w-[35vw] h-[22vw] max-w-[500px] max-h-[320px] pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
      >
        <img
          src={activeImg}
          alt="Project Preview"
          className="w-full h-full object-cover grayscale brightness-70 shadow-2xl border border-background/10"
        />
        {/* Dropped bg-primary/10 to bg-primary/5 to subtly reduce the color tint */}
        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
      </div>

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
    </section>
  );
}