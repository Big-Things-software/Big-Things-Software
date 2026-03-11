"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import { HEADING, SECTION_DESC, DIVIDER } from "@/lib/styles";

const ACCORDION_BASE =
  "bg-[var(--color-surface)] backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-300";

function AccordionItem({
  number,
  title,
  summary,
  children,
}: {
  number: number;
  title: string;
  summary: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`${ACCORDION_BASE} ${
        open
          ? "border-[var(--color-accent)] shadow-[0_8px_24px_var(--color-shadow)]"
          : "border-[var(--color-border)]"
      }`}
    >
      <button
        className="w-full flex items-center gap-4 py-6 px-8 bg-transparent border-none cursor-pointer text-left text-[var(--color-text)] transition-colors duration-300 hover:text-[var(--color-accent)]"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        type="button"
      >
        <span className="shrink-0 w-9 h-9 bg-gradient-to-br from-[var(--color-accent)] to-cyan-500 text-white rounded-full flex items-center justify-center text-base font-bold shadow-[0_4px_12px_var(--color-accent-glow)]">
          {number}
        </span>
        <span className="flex-1 text-[17px] font-semibold">{title}</span>
        <svg
          className={`shrink-0 text-[var(--color-text-muted)] transition-all duration-300 ${
            open ? "rotate-180 text-[var(--color-accent)]" : ""
          }`}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="px-8 pb-6 pl-[84px] text-[var(--color-text-muted)] text-base leading-relaxed flex flex-col gap-3">
          <p className="text-[15px] font-semibold text-[var(--color-accent)]">
            {summary}
          </p>
          {children}
        </div>
      )}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <section className="py-20 px-8 relative max-[480px]:py-12 max-[480px]:px-4">
        <div className="max-w-[720px] mx-auto relative z-[1]">
          <h1 className={HEADING}>About Us</h1>
          <div className="flex items-start gap-12 mb-12 p-12 bg-[var(--color-surface)] backdrop-blur-xl border border-[var(--color-border)] rounded-2xl max-md:flex-col max-md:items-center max-md:text-center max-md:p-8">
            <Image
              src="/normal-logo.png"
              alt="Big Things Software"
              width={160}
              height={160}
              className="shrink-0"
            />
            <div>
              <p className="text-lg leading-loose text-[var(--color-text-muted)] mb-5">
                Big Things Software is a nonprofit dedicated to empowering
                open-source innovation through providing tools for funding,
                freelancing, product exposure, and product integration.
              </p>
              <p className="text-lg leading-loose text-[var(--color-text-muted)] mb-5">
                We aim to refine the development processes of high-quality
                developers for the public, free of charge.
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className={DIVIDER} />

      <section className="py-20 px-8 relative max-[480px]:py-12 max-[480px]:px-4">
        <div className="max-w-[720px] mx-auto relative z-[1]">
          <h2 className={HEADING}>Our Presentation</h2>
          <p className={SECTION_DESC}>
            Our dedicated team has synthesized a presentation to address our
            mission. Select any item below to learn more:
          </p>
          <div className="flex flex-col gap-3">
            <AccordionItem
              number={1}
              title="The Problem"
              summary="The challenges open-source developers face today"
            >
              <p>
                Open-source developers increasingly struggle with sustainable
                funding, recognition, and integration pathways. Despite
                powering much of the modern web, their work often goes
                uncompensated and underexposed — leaving maintainers burned out
                and critical projects underfunded.
              </p>
            </AccordionItem>
            <AccordionItem
              number={2}
              title="Competing Initiatives"
              summary="How we will overcome their limitations"
            >
              <p>
                Existing platforms like GitHub Sponsors, Open Collective, and
                Gitcoin address portions of this problem but fall short in
                connecting the full ecosystem. None bridge funding, freelancing,
                exposure, and integration in one cohesive, developer-first
                system. Big Things Software does.
              </p>
            </AccordionItem>
            <AccordionItem
              number={3}
              title="Our Solution"
              summary="Tools for funding, freelancing, exposure and integration"
            >
              <p>
                Our platform provides open-source maintainers with sustainable
                revenue streams, visibility to the right communities, and
                seamless integration tooling — all completely free for
                developers. We eliminate barriers so great software can thrive.
              </p>
            </AccordionItem>
            <AccordionItem
              number={4}
              title="Our Team"
              summary="Our current and projected team, which could feature you!"
            >
              <p>
                We&apos;re a growing team of developers, designers, and
                advocates passionate about open source. We&apos;re always
                looking for new contributors whose skills could make a real
                difference. If that sounds like you, we&apos;d love to hear
                from you.
              </p>
            </AccordionItem>
          </div>
        </div>
      </section>
    </>
  );
}

