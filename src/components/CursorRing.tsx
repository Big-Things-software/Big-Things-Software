"use client";

import { useEffect, useRef } from "react";

export default function CursorRing() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ring = ringRef.current;
    if (!ring) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let rx = tx;
    let ry = ty;
    let raf = 0;

    const loop = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      ring.style.transform = `translate3d(${rx - 20}px, ${ry - 20}px, 0)`;
      raf =
        Math.abs(tx - rx) > 0.4 || Math.abs(ty - ry) > 0.4
          ? requestAnimationFrame(loop)
          : 0;
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      ring.classList.add("on");
      const target = e.target as Element | null;
      const hot = target?.closest?.("a, button, summary, [data-hot]");
      ring.classList.toggle("hot", Boolean(hot));
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onDown = () => ring.classList.add("press");
    const onUp = () => ring.classList.remove("press");
    const onLeaveDoc = () => ring.classList.remove("on");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeaveDoc);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeaveDoc);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="cursor-ring pointer-events-none fixed top-0 left-0 z-[150] size-10 rounded-full border border-[#6fc3e8]/55 opacity-0 transition-[opacity,width,height,margin,background-color,border-color] duration-300 ease-out [&.hot]:m-[-13px] [&.hot]:size-[66px] [&.hot]:border-[#6fc3e8] [&.hot]:bg-[#6fc3e8]/8 [&.on]:opacity-100 [&.press]:m-[6px] [&.press]:size-7"
    />
  );
}
