"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import RollLink from "@/components/RollLink";
import { Button } from "@/components/ui/button";
import { DiscordIcon } from "@/components/icons";

const NAV_LINKS = [
  { label: "Mission", href: "/#mission" },
  { label: "Programs", href: "/#programs" },
  { label: "Projects", href: "/#projects" },
  { label: "Get involved", href: "/#involved" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let ticking = false;

    const measure = () => {
      ticking = false;
      const y = window.scrollY;
      setScrolled(y > 24);

      const root = document.documentElement;
      const max = root.scrollHeight - window.innerHeight;
      const sp = max > 0 ? y / max : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${sp.toFixed(4)})`;
      }
      if (markRef.current) {
        markRef.current.style.transform = `rotate(${(sp * 220).toFixed(1)}deg)`;
      }
    };

    const schedule = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    measure();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ease-out ${
        scrolled
          ? "border-[#2f89c5]/18 bg-[#060a10]/72 backdrop-blur-[14px]"
          : "border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex w-full max-w-[1120px] items-center gap-[clamp(1rem,3vw,2.5rem)] px-[clamp(1.25rem,5vw,2.5rem)] transition-[padding] duration-300 ${
          scrolled ? "py-[0.55rem]" : "py-[0.9rem]"
        }`}
      >
        <Link
          href="/#top"
          className="mr-auto inline-flex items-center gap-[0.6rem] text-[#f2f6f9]"
          aria-label="Big Things — back to top"
        >
          <span
            ref={markRef}
            className={`block transition-[width,height] duration-300 ${
              scrolled ? "size-[22px]" : "size-7"
            }`}
          >
            <Image
              src="/images/logo-static.svg"
              alt=""
              width={28}
              height={28}
              className="size-full"
            />
          </span>
          <span className="font-[family-name:var(--font-jetbrains)] text-[0.8rem] font-medium tracking-[0.2em] uppercase">
            Big Things
          </span>
        </Link>

        <nav aria-label="Sections" className="hidden items-center gap-[clamp(1.2rem,2.5vw,2rem)] md:flex">
          {NAV_LINKS.map((link) => (
            <RollLink key={link.href} href={link.href}>
              {link.label}
            </RollLink>
          ))}
        </nav>

        <Button
          href="https://discord.gg/8FXs9WhC8t"
          target="_blank"
          rel="noopener"
          size="sm"
        >
          <DiscordIcon />
          Join the Discord
        </Button>
      </div>

      {/* scroll progress riding the nav's own hairline */}
      <div
        ref={progressRef}
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-px h-[2px] origin-left scale-x-0 bg-[linear-gradient(90deg,#2f89c5,#6fc3e8)] opacity-90"
      />
    </header>
  );
}
