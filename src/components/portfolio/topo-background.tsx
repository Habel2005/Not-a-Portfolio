"use client";

import { useEffect, useRef } from "react";

export function TopoCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Track actual mouse and a delayed "target" mouse for smooth easing
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    let time = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Configuration for the Topography
    const linesCount = 12; // Sparse, sweeping lines like the reference
    const pointsPerLine = 150; // High resolution for smooth curves
    
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Smooth out the mouse movement (Linear Interpolation)
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Use currentColor essentially, but drawn on canvas. 
      // We set a base color that looks good on both light and dark, or rely on opacity.
      // 15% opacity gray gives that subtle watermark look.
      ctx.strokeStyle = "rgba(128, 128, 128, 0.15)";
      ctx.lineWidth = 1;

      for (let i = 0; i < linesCount; i++) {
        ctx.beginPath();
        
        // Spread the base of the lines far apart
        const yOffsetBase = (height / linesCount) * i * 1.5 - (height * 0.25);
        
        for (let j = 0; j <= pointsPerLine; j++) {
          var x = (width / pointsPerLine) * j;
          
          // Pure Math: Overlapping trigonometric waves to create organic, non-repeating curves
          const noiseX = x * 0.0015; // Low frequency for wide, sweeping curves
          const noiseY = i * 0.3;    // Offset each line so they don't perfectly parallel each other
          
          const wave1 = Math.sin(noiseX + time * 0.4 + noiseY) * 150;
          const wave2 = Math.cos(noiseX * 2 - time * 0.2) * 80;
          const wave3 = Math.sin(noiseX * 0.5 + time * 0.1 + noiseY * 2) * 200;
          
          let y = yOffsetBase + wave1 + wave2 + wave3;

          // Mouse Repulsion Math
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 350; // Radius of the magnetic push field
          
          if (dist < maxDist) {
            // Easing function so the push feels organic, not like a hard wall
            const force = Math.pow((maxDist - dist) / maxDist, 2); 
            y += (dy / dist) * force * 80; // Push Y away from cursor
            x += (dx / dist) * force * 30; // Slight X distortion
          }

          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      time += 0.005; // Speed of the ambient evolution
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      // z-0 puts it at the absolute back, pointer-events-none lets you click the text through it
      className="absolute inset-0 z-0 pointer-events-none mix-blend-difference" 
    />
  );
}