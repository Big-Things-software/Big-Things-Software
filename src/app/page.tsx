"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

function InteractiveNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const container = containerRef.current!;
    const ctx = canvas.getContext("2d")!;
    let nodes: any[] = [];
    let mouse = { x: -1000, y: -1000 };

    const init = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      nodes = Array.from({ length: 50 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: 3,
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

        const rect = canvas.getBoundingClientRect();
        const dx = (mouse.x - rect.left) - n.x;
        const dy = (mouse.y - rect.top) - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          n.glow = Math.min(n.glow + 0.1, 1);
        } else {
          n.glow = Math.max(n.glow - 0.05, 0);
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + (n.glow * 3), 0, Math.PI * 2);
        
        if (n.glow > 0) {
          ctx.shadowBlur = 25 * n.glow;
          ctx.shadowColor = `rgba(56, 189, 248, ${n.glow})`;
          ctx.fillStyle = `rgba(255, 255, 255, ${0.8 + n.glow * 0.2})`;
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = "rgba(56, 189, 248, 0.6)";
        }
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const d = Math.hypot(n.x - n2.x, n.y - n2.y);
          if (d < 250) {
            const edgeAlpha = (1 - d / 250) * 0.2;
            const edgeGlow = (n.glow + n2.glow) / 2;
            ctx.strokeStyle = `rgba(56, 189, 248, ${edgeAlpha + edgeGlow * 0.6})`;
            ctx.lineWidth = 1 + edgeGlow * 2;
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
    init(); animate();
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden bg-[#020617]">
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}

function ScrambleText({ text, active }: { text: string; active: boolean }) {
  const [display, setDisplay] = useState("");
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  useEffect(() => {
    if (!active) return;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(text.split("").map((c, i) => {
        if (i < iteration) return text[i];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [active, text]);
  return <>{display}</>;
}

export default function Home() {
  const [bootPhase, setBootPhase] = useState("loading");

  useEffect(() => {
    const timer = setTimeout(() => setBootPhase("active"), 2500);
    return () => clearTimeout(timer);
  }, []);

  const isActive = bootPhase === "active";

  return (
    <div className={!isActive ? "overflow-hidden h-screen" : ""}>
      <section className="relative h-screen overflow-hidden">
        <InteractiveNetwork />
        
        <div className={`relative z-10 h-full flex items-center transition-all duration-[1200ms] ease-[cubic-bezier(0.8,0,0.2,1)] ${isActive ? "justify-start px-[8%]" : "justify-center"}`}>
          <div className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.8,0,0.2,1)] ${isActive ? "scale-75 lg:scale-90" : "scale-100"}`}>
            <Image
              src={!isActive ? "/logo-anim.gif" : "/normal-logo.png"}
              alt="Big Things Software"
              width={240}
              height={240}
              priority
            />
          </div>

          <div className={`ml-[5vw] max-w-2xl bg-white/5 backdrop-blur-[30px] border border-white/10 p-8 lg:p-12 rounded-sm transition-all duration-1000 delay-500 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none hidden"}`}>
            <h1 className="text-white text-4xl lg:text-6xl font-black leading-none mb-6 uppercase tracking-tighter italic">
              <ScrambleText text="SHAPING THE FUTURE OF OPEN SOURCE" active={isActive} />
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-8 font-light">
              We aren&apos;t just a nonprofit; we&apos;re an incubator for impact. 
              Bridging the gap between elite talent and the capital needed to 
              build tools that change the world.
            </p>
            <div className="flex gap-4">
              <Link href="/about" className="btn btn--primary">Learn More</Link>
              <Link href="/contact" className="btn btn--outline">Get In Touch</Link>
            </div>
          </div>
        </div>
      </section>

      <div className={`relative z-10 transition-all duration-1000 delay-[1500ms] ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <hr className="section-divider" />
        <section className="section bg-[#020617]">
          <div className="section__inner">
            <h2 className="section__heading text-white">What We Do</h2>
            <p className="section__description text-slate-400">
              We refine the development processes of high-quality developers for
              the public, free of charge. Our tools bridge the gap between talent,
              funding, and impact.
            </p>
            <div className="pillars">
              <article className="pillar-card bg-white/5 border-white/10">
                <h3 className="pillar-card__title text-sky-400">Funding</h3>
                <p className="pillar-card__desc text-slate-400">Connecting open-source maintainers with sustainable funding so great software never goes unsupported.</p>
              </article>
              <article className="pillar-card bg-white/5 border-white/10">
                <h3 className="pillar-card__title text-sky-400">Freelancing</h3>
                <p className="pillar-card__desc text-slate-400">Giving skilled developers the tools and exposure to contribute to meaningful projects.</p>
              </article>
              <article className="pillar-card bg-white/5 border-white/10">
                <h3 className="pillar-card__title text-sky-400">Product Exposure</h3>
                <p className="pillar-card__desc text-slate-400">Amplifying visibility for open-source products so they reach the communities that need them.</p>
              </article>
              <article className="pillar-card bg-white/5 border-white/10">
                <h3 className="pillar-card__title text-sky-400">Integration</h3>
                <p className="pillar-card__desc text-slate-400">Reducing friction between open-source tools and the people who use them every day.</p>
              </article>
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        <section className="section section--accent bg-[#020617]">
          <div className="section__inner section__inner--center">
            <h2 className="section__heading text-white">Our Team Could Feature You</h2>
            <p className="section__description text-slate-400">We&apos;re always looking for passionate developers, designers, and advocates to join our mission.</p>
            <Link href="/contact" className="btn btn--primary">Join Us</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
