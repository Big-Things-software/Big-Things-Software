"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

function InteractiveNetwork({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current!;
    const container = containerRef.current!;
    const ctx = canvas.getContext("2d")!;
    let nodes: any[] = [];
    let mouse = { x: -1000, y: -1000 };
    let animationFrameId: number;

    const init = () => {
      if (!container) return;
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
      animationFrameId = requestAnimationFrame(animate);
    };

    const move = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("mousemove", move);
    window.addEventListener("resize", init);
    init();
    animate();

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", init);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  return (
    <motion.div 
      ref={containerRef} 
      className="absolute inset-0 z-0 bg-[#020617]"
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 1, ease: 'easeIn' }}
    >
      <canvas ref={canvasRef} className="block" />
    </motion.div>
  );
}

function ScrambleText({ text, active, onComplete }: { text: string; active: boolean; onComplete?: () => void; }) {
  const [display, setDisplay] = useState("");
  const chars = "!<>-_\/[]{}—=+*^?#________";
  const hasCompleted = useRef(false);

  useEffect(() => {
    if (!active || hasCompleted.current) {
        if (active) setDisplay(text);
        return;
    };
    
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((_, i) => {
            if (i < iteration) return text[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iteration >= text.length) {
        clearInterval(interval);
        if (onComplete) {
          onComplete();
          hasCompleted.current = true;
        }
      }
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [active, text, onComplete]);

  return <>{display}</>;
}

export default function Home() {
  const [bootPhase, setBootPhase] = useState("loading");
  const [textDecrypted, setTextDecrypted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setBootPhase("active"), 2500);
    return () => clearTimeout(timer);
  }, []);

  const onScrambleComplete = useCallback(() => {
    setTextDecrypted(true);
  }, []);

  const isActive = bootPhase === "active";
  const logoTransition = { duration: 1, ease: [0.6, 0.01, -0.05, 0.9], delay: 1.5 };

  return (
    <>
      <section className="relative h-screen overflow-hidden">
        <InteractiveNetwork active={isActive} />
        
        <div className="relative z-10 h-full flex items-center justify-center">
        
          <AnimatePresence>
            {!isActive && (
              <motion.div
                key="loader"
                className="absolute z-20"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div layoutId="logo-animation" transition={logoTransition}>
                  <Image
                    src="/animated-logo.svg"
                    alt="Loading..."
                    width={240}
                    height={240}
                    priority
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={`absolute left-0 flex items-center pl-[5%] pr-12 !pb-5 pointer-events-none`}>
            <motion.div
              className="absolute inset-0 bg-white/5 backdrop-blur-[60px] border-y border-r border-white/10 rounded-r-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.7, ease: 'easeIn', delay: 1.5 }}
            />
            
            <motion.div className="relative" layoutId="logo-animation" transition={logoTransition}>
              <Image
                src="/animated-logo.svg"
                alt="Big Things Software"
                width={240}
                height={240}
                priority
              />
            </motion.div>
            
            <motion.div
                className="relative ml-12 max-w-2xl py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 1, ease: 'easeIn', delay: 1.7 }}
            >
              <div className={isActive ? 'pointer-events-auto' : ''}>
                <h1 className="text-white text-4xl lg:text-6xl font-black leading-none !py-3 uppercase tracking-tighter italic">
                  <ScrambleText text="SHAPING THE FUTURE OF OPEN SOURCE" active={isActive} onComplete={onScrambleComplete} />
                </h1>
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ 
                      opacity: textDecrypted ? 1 : 0, 
                      y: textDecrypted ? 0 : 5 
                    }}
                    transition={{ duration: 0.8, ease: [0.8, 0, 0.2, 1], delay: 0.2 }}
                >
                  <p className="text-lg text-slate-400 leading-relaxed !py-3 font-light">
                    We aren't just a nonprofit; we're an incubator for impact. 
                    Bridging the gap between elite talent and the capital needed to 
                    build tools that change the world.
                  </p>
                  <div className="flex gap-4 !py-3">
                    <Link href="/about" className="btn btn--primary">Learn More</Link>
                    <Link href="/contact" className="btn btn--outline">Get In Touch</Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {isActive && (
        <motion.div 
          className="relative z-10 bg-[#020617]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeIn' }}
        >
          <hr className="section-divider" />
          <section className="section">
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

          <section className="section section--accent">
            <div className="section__inner section__inner--center">
              <h2 className="section__heading text-white">Our Team Could Feature You</h2>
              <p className="section__description text-slate-400">We're always looking for passionate developers, designers, and advocates to join our mission.</p>
              <Link href="/contact" className="btn btn--primary">Join Us</Link>
            </div>
          </section>
        </motion.div>
      )}
    </>
  );
}
