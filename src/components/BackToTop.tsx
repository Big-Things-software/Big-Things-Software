"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setOn(max > 0 ? window.scrollY / max > 0.45 : false);
    };
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    return () => window.removeEventListener("scroll", measure);
  }, []);

  return (
    <a
      href="#top"
      aria-label="Back to top"
      className={`fixed right-[clamp(1rem,3vw,2rem)] bottom-[clamp(1rem,3vw,2rem)] z-60 grid size-[46px] place-items-center rounded-full border border-[#2f89c5]/45 bg-[#091420]/75 text-[#6fc3e8] backdrop-blur-[10px] transition-[border-color,color,background-color,opacity,transform] duration-300 hover:border-[#2f89c5] hover:bg-[#1c6ea8]/50 hover:text-[#f2f6f9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6fc3e8] ${
        on
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-[14px] opacity-0"
      }`}
    >
      <ArrowUp className="size-[18px]" strokeWidth={2} />
    </a>
  );
}
