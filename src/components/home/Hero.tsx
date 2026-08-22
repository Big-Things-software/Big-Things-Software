"use client";

import { Fragment } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import Image from "next/image";

import DecodedEyebrow from "@/components/DecodedEyebrow";
import Socials from "@/components/Socials";
import { Button } from "@/components/ui/button";
import { DiscordIcon } from "@/components/icons";

const TITLE = "BIG THINGS";

const LEDE =
  "We provide exposure and support for community-centric software and app development. We may be starting small, but our impact will be big.";

export default function Hero() {
  const reduced = useReducedMotion();

  /* a soft light follows the pointer across the hero */
  const px = useSpring(50, { stiffness: 120, damping: 20 });
  const py = useSpring(40, { stiffness: 120, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${px}% ${py}%, rgba(111,195,232,0.16), transparent 70%)`;

  const words = LEDE.split(" ");

  return (
    <section
      id="top"
      onPointerMove={(e) => {
        if (reduced) return;
        const b = e.currentTarget.getBoundingClientRect();
        px.set(((e.clientX - b.left) / b.width) * 100);
        py.set(((e.clientY - b.top) / b.height) * 100);
      }}
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden text-center px-[clamp(1.25rem,5vw,2.5rem)] pt-[clamp(7rem,14vh,9rem)] pb-[clamp(4rem,10vh,6rem)]"
    >
      {/* generated orbit plate, masked out of the middle so the copy sits on near-black */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 opacity-90 mix-blend-screen"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 52% 46% at 50% 46%, transparent 40%, #000 84%), linear-gradient(180deg, #000 55%, transparent 92%)",
          WebkitMaskComposite: "source-in",
          maskImage:
            "radial-gradient(ellipse 52% 46% at 50% 46%, transparent 40%, #000 84%), linear-gradient(180deg, #000 55%, transparent 92%)",
          maskComposite: "intersect",
        }}
      >
        <Image
          src="/images/hero-plate.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* pointer spotlight */}
      {!reduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{ backgroundImage: spotlight }}
        />
      )}

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1], delay: 0.08 }}
        className="relative z-1"
      >
        <DecodedEyebrow dot text="Open now — bring a project" className="justify-center text-white/60" />
      </motion.div>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1], delay: 0.22 }}
        className="relative z-1 block"
      >
        {/* the animated mark swaps for its static twin when motion is reduced */}
        <Image
          src="/animated-logo.svg"
          alt=""
          width={168}
          height={168}
          priority
          className="mx-auto mb-[clamp(0.8rem,2vw,1.4rem)] h-auto w-[clamp(96px,16vw,168px)] drop-shadow-[0_0_40px_rgba(47,137,197,0.5)] motion-reduce:hidden"
        />
        <Image
          src="/images/logo-static.svg"
          alt=""
          width={168}
          height={168}
          className="mx-auto mb-[clamp(0.8rem,2vw,1.4rem)] hidden h-auto w-[clamp(96px,16vw,168px)] drop-shadow-[0_0_40px_rgba(47,137,197,0.5)] motion-reduce:block"
        />
      </motion.div>

      {/* the wordmark lands letter by letter, then catches a light sweep */}
      <motion.h1
        className="relative z-1 m-0 mb-[clamp(1rem,2.5vw,1.6rem)] bg-[linear-gradient(100deg,#f2f6f9_38%,#6fc3e8_50%,#f2f6f9_62%)] bg-[length:300%_100%] bg-clip-text font-[family-name:var(--font-montserrat)] text-[clamp(2.8rem,9.5vw,6rem)] leading-[0.92] font-extrabold tracking-[-0.01em] text-transparent drop-shadow-[0_0_60px_rgba(47,137,197,0.35)]"
        initial={reduced ? { backgroundPosition: "0% 0%" } : { backgroundPosition: "100% 0%" }}
        animate={{ backgroundPosition: ["100% 0%", "0% 0%", "0% 0%"] }}
        transition={{ duration: 2.4, ease: [0.2, 0.7, 0.2, 1], delay: 0.9 }}
      >
        <span className="sr-only">{TITLE}</span>
        <span aria-hidden="true">
          {(reduced ? [TITLE] : TITLE.split("")).map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              className={reduced ? "" : "inline-block origin-bottom"}
              initial={
                reduced
                  ? false
                  : { opacity: 0, y: "0.55em", rotateX: -78, scale: 0.92, filter: "blur(6px)" }
              }
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)" }}
              transition={{
                duration: 1,
                ease: [0.2, 0.7, 0.2, 1],
                delay: reduced ? 0 : 0.45 + i * 0.045,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </span>
      </motion.h1>

      {/* the lede assembles word by word under the wordmark. Each word is its
         own animated inline-block box; the space between words is rendered
         as a plain sibling text node (not trailing content inside a word's
         box) so it can't get collapsed away at the box's edge. */}
      <p className="relative z-1 m-0 mb-[clamp(2rem,4vw,2.8rem)] max-w-[470px] text-[clamp(0.98rem,1.6vw,1.15rem)] leading-[1.55] text-white/72">
        <span className="sr-only">
          We provide exposure and support for community-centric software and app development. We
          may be starting small, but our impact will be <b>big</b>.
        </span>
        <span aria-hidden="true">
          {words.map((word, i) => (
            <Fragment key={`${word}-${i}`}>
              <motion.span
                className={
                  word === "big."
                    ? "inline-block font-semibold text-[#f2f6f9]"
                    : "inline-block"
                }
                initial={reduced ? false : { opacity: 0, y: "0.6em", filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.7,
                  ease: [0.2, 0.7, 0.2, 1],
                  delay: reduced ? 0 : 1 + i * 0.028,
                }}
              >
                {word}
              </motion.span>
              {i < words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </span>
      </p>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1], delay: 1.1 }}
        className="relative z-1 mb-[clamp(2.4rem,5vw,3.4rem)] flex flex-wrap justify-center gap-5"
      >
        <Button
          href="https://discord.gg/8FXs9WhC8t"
          target="_blank"
          rel="noopener"
          className="motion-safe:animate-[cta-pulse_3.6s_ease-out_infinite] hover:[animation-play-state:paused]"
        >
          <DiscordIcon />
          Join the Discord
        </Button>
        <Button href="#mission" variant="ghost">
          Our mission
        </Button>
      </motion.div>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1], delay: 1.25 }}
        className="relative z-1"
      >
        <Socials />
      </motion.div>
    </section>
  );
}
