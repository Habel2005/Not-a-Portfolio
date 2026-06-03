"use client";

import Spline from '@splinetool/react-spline';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Footer() {
  // Simple local time clock (A staple of high-end portfolios)
  const [time, setTime] = useState("");

  const emailPrefixes = ["hello", "is", "anyone", "here", "hmm", "null"];
  const [emailIndex, setEmailIndex] = useState(0);

  useEffect(() => {
    // Clock interval
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: true, hour: 'numeric', minute: '2-digit' }));
    };
    updateTime();
    const clockInterval = setInterval(updateTime, 1000);

    // iOS Dial interval (Swaps every 2.5 seconds)
    const dialInterval = setInterval(() => {
      setEmailIndex((prev) => (prev + 1) % emailPrefixes.length);
    }, 2500); 

    return () => {
      clearInterval(clockInterval);
      clearInterval(dialInterval);
    };
  }, []);

  return (
    <footer id="footer" className="relative w-full h-[80vh] md:h-screen bg-[#050505] overflow-hidden flex flex-col justify-end">
      
      {/* 1. The Interactive 3D Background */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-auto">
        <Spline 
          scene="https://prod.spline.design/5Eug6y2wrJm0kPBo/scene.splinecode" 
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
          onLoad={(spline) => {
            (window as any).spline = spline;
          }}
        />
        <div className="absolute bottom-0 right-0 w-[150px] h-[50px] bg-[#050505] z-10 pointer-events-none" />
        {/* Soft vignette to fade the edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_100%)] pointer-events-none" />
      </div>

      {/* 2. The Foreground UI Layer */}
      <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 pb-16 max-w-[1800px] mx-auto pointer-events-none">
        

        {/* Structured Bottom Bar (Grid Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end border-t border-white/10 pt-8 pointer-events-auto">
          
          {/* Column 1: Location & Time */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-1 text-[10px] font-code uppercase tracking-[0.2em] text-white/40">
            <span>Kochi, India</span>
            <span>Local Time // {time || "..."}</span>
          </div>

{/* Column 2: Direct Email (Inline Slot Machine) */}
          <div className="col-span-1 md:col-span-4 flex items-center md:justify-center">
            <a 
              href={`mailto:${emailPrefixes[emailIndex]}@notaportfolio.me`} 
              className="group inline-flex items-center text-[14px] md:text-[16px] font-body border-b border-white/20 hover:border-primary pb-1 transition-colors cursor-pointer"
            >
              
              {/* Tight Inline Mask Container */}
              <div className="h-[1.5em] overflow-hidden relative flex items-start justify-end min-w-[4rem]">
                {/* The Sliding Track */}
                <div 
                  className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
                  style={{ transform: `translateY(-${emailIndex * 1.5}em)` }}
                >
                  {emailPrefixes.map((prefix, i) => (
                    <span 
                      key={prefix} 
                      className={`h-[1.5em] leading-[1.5em] text-right transition-colors duration-500 ${
                        i === emailIndex ? 'text-white' : 'text-white/40'
                      }`}
                    >
                      {prefix}
                    </span>
                  ))}
                </div>
              </div>

              {/* The Static Domain */}
              <div className="text-white group-hover:text-primary transition-colors h-[1.5em] leading-[1.5em]">
                @notaportfolio.me
              </div>
            </a>
          </div>

          {/* Column 3: Social Links */}
          <div className="col-span-1 md:col-span-4 flex gap-8 md:justify-end">
            <a href="https://github.com/Habel2005" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[10px] font-code uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors">
              Github <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
            <a href="https://www.linkedin.com/in/habel-bio/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[10px] font-code uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors">
              LinkedIn <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
            <a href="https://drive.google.com/file/d/1aksQ7UbMoX_DxutAlpGh4a2ngwtaVETZ/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[10px] font-code uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors">
              Resume <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}