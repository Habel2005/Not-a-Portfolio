'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Transmission02() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const panel3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal scroll setup
      const panels = gsap.utils.toArray('.zentry-panel');
      
      const horizontalScroll = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => '+=' + (containerRef.current?.offsetWidth || 0) * 2,
        },
      });

      // Panel 1 Animations
      gsap.fromTo(panel1Ref.current?.querySelectorAll('.p1-anim') || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
          }
        }
      );

      // Panel 2 Animations (System Diagram)
      const nodes = panel2Ref.current?.querySelectorAll('.sys-node') || [];
      const lines = panel2Ref.current?.querySelectorAll('.sys-line') || [];
      
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: panel2Ref.current,
          containerAnimation: horizontalScroll,
          start: 'left center',
          toggleActions: 'play none none reverse',
        }
      });

      nodes.forEach((node, i) => {
        tl2.fromTo(node, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5 }, i * 0.2);
        if (lines[i]) {
          tl2.fromTo(lines[i], { scaleX: 0 }, { scaleX: 1, duration: 0.5 }, i * 0.2 + 0.1);
        }
      });

      // Panel 3 Animations
      gsap.fromTo(panel3Ref.current?.querySelectorAll('.p3-anim') || [],
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.3,
          duration: 1,
          scrollTrigger: {
            trigger: panel3Ref.current,
            containerAnimation: horizontalScroll,
            start: 'left center',
            toggleActions: 'play none none reverse',
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="transmission-02" 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[var(--primary-bg)]"
    >
      <div ref={panelsRef} className="flex w-[300vw] h-full">
        
        {/* PANEL 1: The Problem */}
        <div 
          ref={panel1Ref}
          className="zentry-panel w-screen h-full flex items-center justify-center bg-[var(--deep-kerala-green)] px-6 md:px-24"
        >
          <div className="max-w-4xl w-full flex flex-col gap-12">
            <div className="p1-anim w-16 h-16 md:w-24 md:h-24 border border-[var(--signal-amber)] rounded-full flex items-center justify-center text-[var(--signal-amber)]">
              <Phone size={32} strokeWidth={1} />
            </div>
            
            <div className="flex flex-col gap-8 text-display text-2xl md:text-4xl lg:text-5xl leading-tight text-[var(--waveform-white)]">
              <p className="p1-anim">
                A college in Kerala receives 200+ admission calls daily.<br/>
                Each one answered by a human. Each one saying the same things.
              </p>
              <p className="p1-anim text-[var(--signal-amber)] italic">
                What if the phone answered in perfect Malayalam,<br/>
                understood every dialect, every question,<br/>
                and never put anyone on hold?
              </p>
            </div>
          </div>
        </div>

        {/* PANEL 2: The Architecture */}
        <div 
          ref={panel2Ref}
          className="zentry-panel w-screen h-full flex flex-col items-center justify-center bg-[var(--primary-bg)] px-6 md:px-24 relative"
        >
          <h2 className="absolute top-24 left-12 md:left-24 text-micro text-[var(--interference-gray)]">
            [SYSTEM ARCHITECTURE : ZENTRY AI]
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-4 md:gap-0 mt-12">
            
            {/* Node 1 */}
            <div className="sys-node flex flex-col items-center gap-4 z-10">
              <div className="w-32 h-16 border border-[var(--interference-gray)] bg-[var(--primary-bg)] flex items-center justify-center text-mono text-xs text-[var(--waveform-white)]">
                [Phone Call]
              </div>
            </div>

            <div className="sys-line hidden md:block w-16 h-[1px] bg-[var(--signal-amber)] origin-left z-0" />
            <div className="sys-line md:hidden w-[1px] h-8 bg-[var(--signal-amber)] origin-top z-0" />

            {/* Node 2 */}
            <div className="sys-node flex flex-col items-center gap-4 z-10">
              <div className="w-32 h-16 border border-[var(--signal-amber)] bg-[var(--primary-bg)] flex items-center justify-center text-mono text-xs text-[var(--signal-amber)]">
                FreeSWITCH
              </div>
              <span className="text-micro text-[8px] text-[var(--interference-gray)] absolute mt-20">SIP / RTP</span>
            </div>

            <div className="sys-line hidden md:block w-16 h-[1px] bg-[var(--signal-amber)] origin-left z-0" />
            <div className="sys-line md:hidden w-[1px] h-8 bg-[var(--signal-amber)] origin-top z-0" />

            {/* Node 3 */}
            <div className="sys-node flex flex-col items-center gap-4 z-10">
              <div className="w-32 h-16 border border-[var(--interference-gray)] bg-[var(--primary-bg)] flex items-center justify-center text-mono text-xs text-[var(--waveform-white)]">
                Faster-Whisper
              </div>
              <span className="text-micro text-[8px] text-[var(--interference-gray)] absolute mt-20">CTranslate2</span>
            </div>

            <div className="sys-line hidden md:block w-16 h-[1px] bg-[var(--signal-amber)] origin-left z-0" />
            <div className="sys-line md:hidden w-[1px] h-8 bg-[var(--signal-amber)] origin-top z-0" />

            {/* Node 4 */}
            <div className="sys-node flex flex-col items-center gap-4 z-10">
              <div className="w-32 h-16 border border-[var(--signal-amber)] bg-[var(--primary-bg)] flex items-center justify-center text-mono text-xs text-[var(--signal-amber)] shadow-[0_0_15px_rgba(232,166,64,0.2)]">
                Llama.cpp
              </div>
              <span className="text-micro text-[8px] text-[var(--interference-gray)] absolute mt-20">RTX 3080 Ti</span>
            </div>

            <div className="sys-line hidden md:block w-16 h-[1px] bg-[var(--signal-amber)] origin-left z-0" />
            <div className="sys-line md:hidden w-[1px] h-8 bg-[var(--signal-amber)] origin-top z-0" />

            {/* Node 5 */}
            <div className="sys-node flex flex-col items-center gap-4 z-10">
              <div className="w-32 h-16 border border-[var(--interference-gray)] bg-[var(--primary-bg)] flex items-center justify-center text-mono text-xs text-[var(--waveform-white)]">
                MMS TTS
              </div>
              <span className="text-micro text-[8px] text-[var(--interference-gray)] absolute mt-20">&lt;2s end-to-end</span>
            </div>

          </div>
        </div>

        {/* PANEL 3: The Human Moment */}
        <div 
          ref={panel3Ref}
          className="zentry-panel w-screen h-full flex flex-col items-center justify-center bg-[var(--primary-bg)] px-6 md:px-24 text-center"
        >
          <div className="max-w-5xl flex flex-col items-center gap-12">
            <p className="p3-anim text-display text-3xl md:text-5xl lg:text-7xl leading-[1.1] tracking-tight text-[var(--waveform-white)]">
              It understands mother tongue.<br/>
              Not just words. Context. Respect.<br/>
              <span className="italic text-[var(--interference-gray)]">The way a person from Kerala expects to be spoken to.</span>
            </p>
            
            <div className="p3-anim text-[var(--malayalam-gold)] text-6xl md:text-8xl lg:text-[10vw] font-light mt-8">
              മാതൃഭാഷ
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
