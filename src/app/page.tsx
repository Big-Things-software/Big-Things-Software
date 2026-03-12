
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Style constants
const DIVIDER = "border-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent my-0";
const BTN_PRIMARY = "inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold transition-all duration-300 hover:from-cyan-400 hover:to-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]";
const BTN_OUTLINE = "inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/20 text-white font-semibold transition-all duration-300 hover:bg-white/10 hover:border-white/40";

const PILLAR_CARD =
  "backdrop-blur-xl rounded-2xl p-10 transition-all duration-300 relative overflow-hidden bg-white/5 border border-white/10 before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-cyan-400 before:to-cyan-500 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100 hover:border-cyan-400 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3),0_0_20px_rgba(6,182,212,0.3)]";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  glow: number;
}

const NODE_COUNT = 50;
const CONNECT_DISTANCE = 250;
const GLOW_DISTANCE = 120;
const BOOT_DELAY_MS = 2500;
const SCRAMBLE_CHARS = "!<>-_\\/[]{}=+*^?#________";

function InteractiveNetwork({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let nodes: Particle[] = [];
    let mouse = { x: -1000, y: -1000 };
    let animationFrameId: number;

    const init = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      nodes = Array.from({ length: NODE_COUNT }, () => ({
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
      const rect = canvas.getBoundingClientRect();

      nodes.forEach((n, i) => {
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        const dx = (mouse.x - rect.left) - n.x;
        const dy = (mouse.y - rect.top) - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < GLOW_DISTANCE) {
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
          if (d < CONNECT_DISTANCE) {
            const edgeAlpha = (1 - d / CONNECT_DISTANCE) * 0.2;
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
  const hasCompleted = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

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
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("")
      );
      if (iteration >= text.length) {
        clearInterval(interval);
        hasCompleted.current = true;
        onCompleteRef.current?.();
      }
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [active, text]);

  return <>{display}</>;
}

export default function Home() {
  const [bootPhase, setBootPhase] = useState("loading");
  const [contentReady, setContentReady] = useState(false);
  const [textDecrypted, setTextDecrypted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setBootPhase("active"), BOOT_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  // Delay content appearance until logo animation completes
  useEffect(() => {
    if (bootPhase === "active") {
      const timer = setTimeout(() => setContentReady(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [bootPhase]);

  const onScrambleComplete = useCallback(() => {
    setTextDecrypted(true);
  }, []);

  const isActive = bootPhase === "active";
  const logoTransition = { duration: 1.2, ease: [0.6, 0.01, -0.05, 0.9] };

  return (
    <>
      <section className="relative h-screen overflow-hidden">
        <InteractiveNetwork active={isActive} />
        
        <div className="relative z-10 h-full flex items-center justify-center">
          {/* Hero container - always rendered but positioned differently */}
          <div className={`absolute left-0 flex items-center pl-[5%] pr-12 !pb-5 pointer-events-none transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
            <motion.div
              className="absolute inset-0 bg-white/5 backdrop-blur-[60px] border-y border-r border-white/10 rounded-r-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: contentReady ? 1 : 0 }}
              transition={{ duration: 0.7, ease: 'easeIn' }}
            />
            
            {/* Placeholder for layout - invisible but takes space */}
            <div className="relative w-[280px] h-[280px]" />
            
            <motion.div
                className="relative ml-12 max-w-2xl py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: contentReady ? 1 : 0 }}
                transition={{ duration: 0.8, ease: 'easeIn', delay: 0.1 }}
            >
              <div className={contentReady ? 'pointer-events-auto' : ''}>
                <h1 className="text-white text-4xl lg:text-6xl font-black leading-none !py-3 uppercase tracking-tighter italic">
                  <ScrambleText text="SHAPING THE FUTURE OF OPEN SOURCE" active={contentReady} onComplete={onScrambleComplete} />
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
                    We aren&apos;t just a nonprofit; we&apos;re an incubator for impact. 
                    Bridging the gap between elite talent and the capital needed to 
                    build tools that change the world.
                  </p>
                  <div className="flex gap-4 !py-3">
                    <Link href="/about" className={BTN_PRIMARY}>Learn More</Link>
                    <Link href="/contact" className={BTN_OUTLINE}>Get In Touch</Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Single animated logo that moves from center to hero position */}
          <motion.div
            className="absolute z-20"
            initial={false}
            animate={{
              x: isActive ? "calc(-50vw + 5% + 140px + 2rem)" : 0,
              y: 0,
              scale: isActive ? 280/480 : 1,
            }}
            transition={logoTransition}
          >
            <Image
              src="/animated-logo.svg"
              alt="Big Things Software"
              width={480}
              height={480}
              priority
            />
          </motion.div>
        </div>
      </section>

      {isActive && (
        <motion.div 
          className="relative z-10 bg-[#020617]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeIn' }}
        >
          <hr className={DIVIDER} />
          <section className="py-20 px-8 relative max-[480px]:py-12 max-[480px]:px-4">
            <div className="max-w-[1120px] mx-auto relative z-[1]">
              <h2 className="text-4xl font-extrabold mb-5 leading-tight bg-gradient-to-br from-white to-cyan-400 bg-clip-text text-transparent">What We Do</h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-10">
                We refine the development processes of high-quality developers for
                the public, free of charge. Our tools bridge the gap between talent,
                funding, and impact.
              </p>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8 mt-8">
                <article className={PILLAR_CARD}>
                  <h3 className="text-[22px] font-bold mb-3 text-sky-400">Funding</h3>
                  <p className="text-base text-slate-400 leading-relaxed">Connecting open-source maintainers with sustainable funding so great software never goes unsupported.</p>
                </article>
                <article className={PILLAR_CARD}>
                  <h3 className="text-[22px] font-bold mb-3 text-sky-400">Freelancing</h3>
                  <p className="text-base text-slate-400 leading-relaxed">Giving skilled developers the tools and exposure to contribute to meaningful projects.</p>
                </article>
                <article className={PILLAR_CARD}>
                  <h3 className="text-[22px] font-bold mb-3 text-sky-400">Product Exposure</h3>
                  <p className="text-base text-slate-400 leading-relaxed">Amplifying visibility for open-source products so they reach the communities that need them.</p>
                </article>
                <article className={PILLAR_CARD}>
                  <h3 className="text-[22px] font-bold mb-3 text-sky-400">Integration</h3>
                  <p className="text-base text-slate-400 leading-relaxed">Reducing friction between open-source tools and the people who use them every day.</p>
                </article>
              </div>
            </div>
          </section>

          <hr className={DIVIDER} />

          <section className="py-20 px-8 relative bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 max-[480px]:py-12 max-[480px]:px-4">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(6,182,212,0.6),transparent_60%)] opacity-30 pointer-events-none" />
            <div className="max-w-[1120px] mx-auto relative z-[1] text-center">
              <h2 className="text-4xl font-extrabold mb-5 leading-tight bg-gradient-to-br from-white to-cyan-400 bg-clip-text text-transparent">Our Team Could Feature You</h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-10">We&apos;re always looking for passionate developers, designers, and advocates to join our mission.</p>
              <Link href="/contact" className={BTN_PRIMARY}>Join Us</Link>
            </div>
          </section>
        </motion.div>
      )}
    </>
  );
}

