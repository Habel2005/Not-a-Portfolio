"use client";

import Spline from '@splinetool/react-spline';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Footer() {
  // Simple local time clock (A staple of high-end portfolios)
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: true, hour: 'numeric', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
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

          {/* Column 2: Direct Email */}
          <div className="col-span-1 md:col-span-4">
            <a 
              href="mailto:your.email@example.com" 
              className="text-[14px] md:text-[16px] font-body text-white hover:text-primary transition-colors border-b border-white/20 hover:border-primary pb-1 inline-flex items-center gap-2"
            >
              hello@habelshaji.com
            </a>
          </div>

          {/* Column 3: Social Links */}
          <div className="col-span-1 md:col-span-4 flex gap-8 md:justify-end">
            <a href="https://github.com/Habel2005" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[10px] font-code uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors">
              Github <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
            <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[10px] font-code uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors">
              LinkedIn <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[10px] font-code uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors">
              Resume <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}