"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

import DecodedEyebrow from "@/components/DecodedEyebrow";

const STEPS = [
  {
    n: "01",
    title: "Join the Discord",
    body: "That's where everything happens. Say what you're working on, or lurk until you're ready.",
  },
  {
    n: "02",
    title: "Share the project",
    body: "The repo, the demo, the half-finished thing. Any size, any stage, as long as it's built for a community.",
  },
  {
    n: "03",
    title: "We amplify it",
    body: "We feature it across our channels and connect you with people who can help it go further.",
  },
];

function PinnedStep({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: ReactNode;
}) {
  const opacity = useTransform(progress, range, [0, 1], { clamp: true });
  const y = useTransform(progress, range, [70, 0], { clamp: true });

  return (
    <motion.li style={{ opacity, y }} className="step">
      {children}
    </motion.li>
  );
}

export default function OrbitPrograms() {
  const reduced = useReducedMotion();
  const [pinned, setPinned] = useState(false);
  const orbitRef = useRef<SVGSVGElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  /* Programs pins only where there is room for it: a wide-enough viewport,
     a tall-enough window, and a user who hasn't asked for less motion. */
  useEffect(() => {
    const update = () =>
      setPinned(
        !reduced &&
          window.matchMedia("(min-width: 860px) and (min-height: 720px)").matches
      );
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [reduced]);

  /* SMIL ignores prefers-reduced-motion, so stop the orbit by hand */
  useEffect(() => {
    if (reduced && orbitRef.current) orbitRef.current.pauseAnimations();
  }, [reduced]);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const orbitRotate = useTransform(scrollYProgress, [0.3, 1], [-6.6, 15.4], {
    clamp: true,
  });
  const orbitScale = useTransform(scrollYProgress, [0.3, 1], [0.9, 1.2], {
    clamp: true,
  });
  const drawOffset = useTransform(scrollYProgress, [0, 1], [100, -30], {
    clamp: true,
  });

  const orbitStyle = pinned
    ? {
        rotate: orbitRotate,
        scale: orbitScale,
      }
    : undefined;
  const drawStyle = pinned
    ? { strokeDashoffset: drawOffset }
    : { strokeDashoffset: 0 };

  const renderStepBody = (step: (typeof STEPS)[number]) => (
    <>
      <span className="mb-[0.9rem] block font-[family-name:var(--font-jetbrains)] text-[0.72rem] font-medium tracking-[0.28em] text-[#6fc3e8]">
        {step.n}
      </span>
      <h3 className="m-0 mb-[0.6rem] font-[family-name:var(--font-montserrat)] text-[1.15rem] font-bold tracking-[-0.005em] text-[#f2f6f9]">
        {step.title}
      </h3>
      <p className="m-0 text-[0.97rem] text-[#9fb2c4]">{step.body}</p>
    </>
  );

  return (
    <section
      id="programs"
      aria-labelledby="programs-h"
      className="relative isolate overflow-clip py-[clamp(5rem,11vw,9rem)]"
    >
      {/* the stage holds while the page scrolls a further screen and a half */}
      <div ref={trackRef} className={pinned ? "h-[250vh]" : ""}>
        <div
          className={
            pinned ? "sticky top-0 flex h-screen items-center" : ""
          }
        >
          <div className="mx-auto w-full max-w-[1120px] px-[clamp(1.25rem,5vw,2.5rem)]">
            {/* eyebrow + heading get an explicit positive z-index so they
               always paint above the orbit graphic below, regardless of
               DOM order or the orbit wrapper's own stacking context */}
            <div className="relative z-10">
              <DecodedEyebrow rule text="Programs" />
              <h2
                id="programs-h"
                className="m-0 mb-[clamp(1.6rem,3vw,2.4rem)] max-w-[18ch] font-[family-name:var(--font-montserrat)] text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.05] font-bold tracking-[-0.015em]"
              >
                Bring something you&apos;re building. We do the rest.
              </h2>
            </div>

            <div className="relative">
              {/* the logo's motif at page scale: an orbit passing behind the steps.
                 Negative z-index pins it to the back of this section's isolated
                 stacking context (see `isolate` on the <section>), so it can
                 never paint above the heading or step cards. */}
              <motion.svg
                ref={orbitRef}
                style={{
                  ...orbitStyle,
                  left: "50%",
                  top: "50%",
                  width: "118%",
                  height: "calc(100% + 7rem)",
                  x: "-50%",
                  y: "-50%",
                  WebkitMaskImage:
                    "linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent)",
                  maskImage:
                    "linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent)",
                }}
                className="pointer-events-none absolute -z-10 [&_ellipse]:opacity-60 [&>circle]:[filter:drop-shadow(0_0_8px_rgba(111,195,232,0.9))]"
                viewBox="0 0 1200 460"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <ellipse
                  id="orbit-track"
                  cx="600"
                  cy="230"
                  rx="580"
                  ry="200"
                  fill="none"
                  stroke="#2f89c5"
                  strokeWidth="2"
                  strokeDasharray="3 9"
                />
                <motion.ellipse
                  cx="600"
                  cy="230"
                  rx="580"
                  ry="200"
                  fill="none"
                  stroke="#6fc3e8"
                  strokeWidth="2"
                  pathLength={100}
                  strokeDasharray="100"
                  style={{ ...drawStyle, opacity: 0.5 }}
                />
                <ellipse
                  cx="600"
                  cy="230"
                  rx="420"
                  ry="140"
                  fill="none"
                  stroke="#2f89c5"
                  strokeWidth="1.5"
                  strokeDasharray="3 11"
                  opacity=".45"
                  transform="rotate(-10 600 230)"
                />
                {!reduced && (
                  <>
                    <circle r="6" fill="#6fc3e8">
                      <animateMotion dur="18s" repeatCount="indefinite" rotate="auto">
                        <mpath href="#orbit-track" />
                      </animateMotion>
                    </circle>
                    <circle r="4" fill="#2f89c5">
                      <animateMotion dur="26s" begin="-9s" repeatCount="indefinite" rotate="auto">
                        <mpath href="#orbit-track" />
                      </animateMotion>
                    </circle>
                  </>
                )}
              </motion.svg>

              <ol className="relative z-10 m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[clamp(1rem,2vw,1.4rem)] p-0">
                {STEPS.map((step, i) =>
                  pinned ? (
                    <PinnedStep
                      key={step.n}
                      progress={scrollYProgress}
                      range={
                        [
                          [0.08, 0.32],
                          [0.36, 0.6],
                          [0.56, 0.8],
                        ][i] as [number, number]
                      }
                    >
                      {renderStepBody(step)}
                    </PinnedStep>
                  ) : (
                    <motion.li
                      key={step.n}
                      initial={reduced ? false : { opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                      transition={{
                        duration: 0.8,
                        ease: [0.2, 0.7, 0.2, 1],
                        delay: i * 0.1,
                      }}
                      className="rounded-[18px] border border-[#2f89c5]/18 bg-[linear-gradient(180deg,rgba(11,20,32,0.92),rgba(9,15,24,0.7))] p-[clamp(1.4rem,2.5vw,2rem)] backdrop-blur-[6px] transition-colors duration-300 hover:border-[#2f89c5]/45"
                    >
                      {renderStepBody(step)}
                    </motion.li>
                  )
                )}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
