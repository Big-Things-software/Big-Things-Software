"use client";

import { useEffect, useRef } from "react";

export default function InteractiveNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let nodes: any[] = [];
    let mouse = { x: -1000, y: -1000 };

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      nodes = Array.from({ length: 70 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1.2,
        glow: 0,
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach((n, i) => {
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 220) {
          n.glow = Math.min(n.glow + 0.1, 1);
          n.x += dx * 0.02;
          n.y += dy * 0.02;
        } else {
          n.glow = Math.max(n.glow - 0.05, 0);
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + n.glow * 2.5, 0, Math.PI * 2);
        
        if (n.glow > 0) {
          ctx.shadowBlur = 20 * n.glow;
          ctx.shadowColor = `rgba(56, 189, 248, ${n.glow})`;
          ctx.fillStyle = `rgba(255, 255, 255, ${0.4 + n.glow * 0.6})`;
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = "rgba(56, 189, 248, 0.35)";
        }
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const d = Math.hypot(n.x - n2.x, n.y - n2.y);
          if (d < 200) {
            const edgeGlow = (n.glow + n2.glow) / 2;
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.1 + edgeGlow * 0.5})`;
            ctx.lineWidth = 0.6 + edgeGlow * 2;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
        ctx.shadowBlur = 0;
      });
      requestAnimationFrame(animate);
    };

    const move = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("mousemove", move);
    window.addEventListener("resize", init);
    init(); 
    animate();
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", init);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none bg-[#020617]" />;
}
