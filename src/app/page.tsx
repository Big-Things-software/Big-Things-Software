
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

// Style constants
const DIVIDER = "border-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent my-0";
const BTN_PRIMARY = "inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold transition-all duration-300 hover:from-cyan-400 hover:to-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]";
const BTN_OUTLINE = "inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/20 text-white font-semibold transition-all duration-300 hover:bg-white/10 hover:border-white/40";

const PILLAR_CARD =
  "backdrop-blur-xl rounded-2xl p-10 transition-all duration-300 relative overflow-hidden bg-white/5 border border-white/10 before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-cyan-400 before:to-cyan-500 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100 hover:border-cyan-400 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3),0_0_20px_rgba(6,182,212,0.3)]";

// Animation constants
const ANIMATION_DURATION = 0.8;
const ANIMATION_EASE = [0.6, 0.01, 0.05, 0.9] as const;
const LOGO_TRANSITION_EASE = [0.6, 0.01, 0.05, 0.9] as const;
const STAGGER_DELAY = 0.1;
const SCROLL_THRESHOLD = 0.05;
const SCROLL_MARGIN = "0px 0px -50px 0px";
const SCRAMBLE_INTERVAL_MS = 30;
const SCRAMBLE_ITERATION_STEP = 1 / 3;

// Animation variants for different scroll effects
const SCROLL_VARIANTS = {
  fadeUp: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 }
  },
  fadeDown: {
    initial: { opacity: 0, y: -60 },
    animate: { opacity: 1, y: 0 }
  },
  fadeLeft: {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 }
  },
  fadeRight: {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 }
  },
  zoom: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 }
  },
  flip: {
    initial: { opacity: 0, rotateY: 90 },
    animate: { opacity: 1, rotateY: 0 }
  }
} as const;

type AnimationType = keyof typeof SCROLL_VARIANTS;

// Wrapper component for scroll animations
interface AnimatedElementProps {
  animationType: AnimationType;
  children: React.ReactNode;
  className?: string;
  as?: keyof typeof motion;
  delay?: number;
  threshold?: number;
  once?: boolean;
}

function AnimatedElement({
  animationType,
  children,
  className = "",
  as: Component = "div" as keyof typeof motion,
  delay = 0,
  threshold = SCROLL_THRESHOLD,
  once = true
}: AnimatedElementProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    threshold,
    once,
    margin: SCROLL_MARGIN
  });

  const variant = SCROLL_VARIANTS[animationType];
  const MotionComponent = motion[Component] as any;

  return (
    <MotionComponent
      ref={ref}
      className={className}
      initial={variant.initial}
      animate={isInView ? variant.animate : variant.initial}
      transition={{
        duration: ANIMATION_DURATION,
        ease: ANIMATION_EASE,
        delay: isInView ? delay : 0
      }}
    >
      {children}
    </MotionComponent>
  );
}

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
const BOOT_DELAY_MS = 2500;const CONTENT_READY_DELAY_MS = 1200;
const LOGO_TRANSITION_DURATION = 1.2;
const NETWORK_FADE_DURATION = 1;const SCRAMBLE_CHARS = "!<>-_\\/[]{}=+*^?#________";

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
      transition={{ duration: NETWORK_FADE_DURATION, ease: 'easeIn' }}
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
      iteration += SCRAMBLE_ITERATION_STEP;
    }, SCRAMBLE_INTERVAL_MS);

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
      const timer = setTimeout(() => setContentReady(true), CONTENT_READY_DELAY_MS);
      return () => clearTimeout(timer);
    }
  }, [bootPhase]);

  const onScrambleComplete = useCallback(() => {
    setTextDecrypted(true);
  }, []);

  const isActive = bootPhase === "active";
  const logoTransition = { duration: LOGO_TRANSITION_DURATION, ease: LOGO_TRANSITION_EASE };

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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION, ease: ANIMATION_EASE, delay: 0.3 }}
        >
          <hr className={DIVIDER} />
          <section className="py-20 px-8 relative max-[480px]:py-12 max-[480px]:px-4">
            <div className="max-w-[1120px] mx-auto relative z-[1]">
              <AnimatedElement 
                as="h2"
                animationType="fadeDown"
                className="text-4xl font-extrabold mb-5 leading-tight bg-gradient-to-br from-white to-cyan-400 bg-clip-text text-transparent"
              >
                What We Do
              </AnimatedElement>
              <AnimatedElement 
                as="p"
                animationType="fadeUp"
                delay={STAGGER_DELAY}
                className="text-lg text-slate-400 leading-relaxed mb-10"
              >
                We refine the development processes of high-quality developers for
                the public, free of charge. Our tools bridge the gap between talent,
                funding, and impact.
              </AnimatedElement>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8 mt-8">
                {[
                  {
                    title: "Funding",
                    description: "Connecting open-source maintainers with sustainable funding so great software never goes unsupported.",
                    delay: STAGGER_DELAY * 2
                  },
                  {
                    title: "Freelancing", 
                    description: "Giving skilled developers the tools and exposure to contribute to meaningful projects.",
                    delay: STAGGER_DELAY * 3
                  },
                  {
                    title: "Product Exposure",
                    description: "Amplifying visibility for open-source products so they reach the communities that need them.",
                    delay: STAGGER_DELAY * 4
                  },
                  {
                    title: "Integration",
                    description: "Reducing friction between open-source tools and the people who use them every day.",
                    delay: STAGGER_DELAY * 5
                  }
                ].map((pillar) => (
                  <AnimatedElement 
                    key={pillar.title}
                    as="article"
                    animationType="fadeUp"
                    delay={pillar.delay}
                    className={PILLAR_CARD}
                  >
                    <h3 className="text-[22px] font-bold mb-3 text-sky-400">{pillar.title}</h3>
                    <p className="text-base text-slate-400 leading-relaxed">{pillar.description}</p>
                  </AnimatedElement>
                ))}
              </div>
            </div>
          </section>

          <hr className={DIVIDER} />

          <section className="py-20 px-8 relative bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 max-[480px]:py-12 max-[480px]:px-4">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(6,182,212,0.6),transparent_60%)] opacity-30 pointer-events-none" />
            <div className="max-w-[1120px] mx-auto relative z-[1] text-center">
              <AnimatedElement 
                as="h2"
                animationType="zoom"
                className="text-4xl font-extrabold mb-5 leading-tight bg-gradient-to-br from-white to-cyan-400 bg-clip-text text-transparent"
              >
                Our Team Could Feature You
              </AnimatedElement>
              <AnimatedElement 
                as="p"
                animationType="fadeUp"
                delay={STAGGER_DELAY}
                className="text-lg text-slate-400 leading-relaxed mb-10"
              >
                We&apos;re always looking for passionate developers, designers, and advocates to join our mission.
              </AnimatedElement>
              <AnimatedElement 
                animationType="fadeUp"
                delay={STAGGER_DELAY * 2}
              >
                <Link href="/contact" className={BTN_PRIMARY}>Join Us</Link>
              </AnimatedElement>
            </div>
          </section>
        </motion.div>
      )}
    </>
  );
}

