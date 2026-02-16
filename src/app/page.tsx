"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__inner">
          <Image
            src="/normal-logo.png"
            alt="Big Things Software"
            width={120}
            height={120}
            className="hero__logo"
            priority
          />
          <h1 className="hero__title">Big Things Software</h1>
          <p className="hero__subtitle">
            A nonprofit dedicated to empowering open-source innovation through
            funding, freelancing, product exposure, and product integration.
          </p>
          <div className="hero__actions">
            <Link href="/about" className="btn btn--primary">
              Learn More
            </Link>
            <Link href="/contact" className="btn btn--outline">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section__inner">
          <h2 className="section__heading">What We Do</h2>
          <p className="section__description">
            We refine the development processes of high-quality developers for
            the public, free of charge. Our tools bridge the gap between talent,
            funding, and impact.
          </p>
          <div className="pillars">
            <article className="pillar-card">
              <h3 className="pillar-card__title">Funding</h3>
              <p className="pillar-card__desc">
                Connecting open-source maintainers with sustainable funding so
                great software never goes unsupported.
              </p>
            </article>
            <article className="pillar-card">
              <h3 className="pillar-card__title">Freelancing</h3>
              <p className="pillar-card__desc">
                Giving skilled developers the tools and exposure to contribute
                to meaningful projects.
              </p>
            </article>
            <article className="pillar-card">
              <h3 className="pillar-card__title">Product Exposure</h3>
              <p className="pillar-card__desc">
                Amplifying visibility for open-source products so they reach the
                communities that need them.
              </p>
            </article>
            <article className="pillar-card">
              <h3 className="pillar-card__title">Integration</h3>
              <p className="pillar-card__desc">
                Reducing friction between open-source tools and the people who
                use them every day.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--accent">
        <div className="section__inner section__inner--center">
          <h2 className="section__heading">Our Team Could Feature You</h2>
          <p className="section__description">
            We&apos;re always looking for passionate developers, designers, and
            advocates to join our mission.
          </p>
          <Link href="/contact" className="btn btn--primary">
            Join Us
          </Link>
        </div>
      </section>
    </>
  );
}
