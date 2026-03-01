"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";

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
    <div className={`accordion-item${open ? " accordion-item--open" : ""}`}>
      <button
        className="accordion-trigger"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        type="button"
      >
        <span className="accordion-number">{number}</span>
        <span className="accordion-title">{title}</span>
        <svg
          className="accordion-chevron"
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
        <div className="accordion-body">
          <p className="accordion-summary">{summary}</p>
          {children}
        </div>
      )}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <section className="section">
        <div className="section__inner section__inner--narrow">
          <h1 className="section__heading">About Us</h1>
          <div className="about-hero">
            <Image
              src="/normal-logo.png"
              alt="Big Things Software"
              width={160}
              height={160}
              className="about-hero__logo"
            />
            <div>
              <p className="about-hero__text">
                Big Things Software is a nonprofit dedicated to empowering
                open-source innovation through providing tools for funding,
                freelancing, product exposure, and product integration.
              </p>
              <p className="about-hero__text">
                We aim to refine the development processes of high-quality
                developers for the public, free of charge.
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      <section className="section section--alt">
        <div className="section__inner section__inner--narrow">
          <h2 className="section__heading">Our Presentation</h2>
          <p className="section__description">
            Our dedicated team has synthesized a presentation to address our
            mission. Select any item below to learn more:
          </p>
          <div className="accordion">
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

