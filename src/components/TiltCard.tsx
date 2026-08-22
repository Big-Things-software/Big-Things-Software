"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

/* Cards lean toward the pointer and carry a light that follows it. --mx/--my
   are -1..1 from the card's center, set alongside the same transform. */
export default function TiltCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  return (
    <article
      ref={ref}
      data-hot
      onPointerMove={(e) => {
        if (reduced || !ref.current) return;
        if (!window.matchMedia("(hover: hover)").matches) return;
        const b = ref.current.getBoundingClientRect();
        ref.current.style.setProperty(
          "--mx",
          ((e.clientX - b.left) / b.width * 2 - 1).toFixed(3)
        );
        ref.current.style.setProperty(
          "--my",
          ((e.clientY - b.top) / b.height * 2 - 1).toFixed(3)
        );
        ref.current.style.setProperty("--lift", "-4px");
      }}
      onPointerLeave={() => {
        if (!ref.current) return;
        ref.current.style.setProperty("--mx", "0");
        ref.current.style.setProperty("--my", "0");
        ref.current.style.setProperty("--lift", "0px");
      }}
      style={
        reduced
          ? undefined
          : {
              transform:
                "perspective(900px) rotateX(calc(var(--my, 0) * -3deg)) rotateY(calc(var(--mx, 0) * 3deg)) translateY(var(--lift, 0px))",
            }
      }
      className={cn(
        "group/card relative overflow-hidden rounded-[18px] border border-[#2f89c5]/18 bg-[linear-gradient(180deg,rgba(11,20,32,0.9),rgba(9,15,24,0.6))] p-[clamp(1.4rem,2.5vw,2rem)] backdrop-blur-[6px] transition-[border-color,box-shadow,transform] duration-300 hover:border-[#2f89c5]/45 hover:shadow-[0_18px_50px_rgba(0,0,0,0.45)]",
        className
      )}
    >
      {/* top hairline */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#2f89c5,transparent)] opacity-50"
      />
      {/* pointer light */}
      {!reduced && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
          style={{
            background:
              "radial-gradient(220px circle at calc(50% + var(--mx, 0) * 50%) calc(50% + var(--my, 0) * 50%), rgba(111,195,232,0.13), transparent 70%)",
          }}
        />
      )}
      {children}
    </article>
  );
}
