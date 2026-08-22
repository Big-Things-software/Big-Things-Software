"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}#*+=-";

export default function DecodedEyebrow({
  text,
  dot = false,
  rule = false,
  className,
}: {
  text: string;
  dot?: boolean;
  rule?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduced = useReducedMotion();
  const [output, setOutput] = useState(text);
  const done = useRef(false);

  useEffect(() => {
    if (!inView || reduced || done.current) return;
    done.current = true;
    let step = 0;
    const timer = setInterval(() => {
      step += 1;
      setOutput(
        text
          .split("")
          .map((char, i) => {
            if (char === " " || i < step - 3) return char;
            if (i < step + 6) return GLYPHS[(Math.random() * GLYPHS.length) | 0];
            return " ";
          })
          .join("")
      );
      if (step - 3 > text.length) {
        clearInterval(timer);
        setOutput(text);
      }
    }, 28);
    return () => clearInterval(timer);
  }, [inView, reduced, text]);

  return (
    <>
      <style>{`@keyframes blink-dot { 0%, 100% { opacity: 1; } 50% { opacity: .25; } }`}</style>
      <p
      ref={ref}
      className={cn(
        "m-0 mb-[clamp(0.9rem,2vw,1.2rem)] flex items-center gap-[0.6em] font-[family-name:var(--font-jetbrains)] text-[0.72rem] font-medium uppercase tracking-[0.32em] text-[#6fc3e8]",
        className
      )}
    >
      {dot && (
        <span
          aria-hidden="true"
          className="size-[7px] shrink-0 rounded-full bg-[#6fc3e8] shadow-[0_0_12px_#6fc3e8] motion-safe:animate-[blink-dot_2.4s_ease-in-out_infinite]"
        />
      )}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{output}</span>
      {rule && (
        <motion.span
          aria-hidden="true"
          className="h-px min-w-0 max-w-[220px] shrink grow basis-0 origin-left bg-[linear-gradient(90deg,rgba(47,137,197,0.45),transparent)]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1], delay: 0.15 }}
        />
      )}
    </p>
    </>
  );
}
