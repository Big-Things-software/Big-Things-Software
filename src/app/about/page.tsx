import Image from "next/image";

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

      <section className="section section--alt">
        <div className="section__inner section__inner--narrow">
          <h2 className="section__heading">Our Presentation</h2>
          <p className="section__description">
            Our dedicated team has synthesized a presentation to address our
            mission:
          </p>
          <ol className="presentation-list">
            <li className="presentation-list__item">
              Our problem &mdash; the challenges open-source developers face
              today
            </li>
            <li className="presentation-list__item">
              Competing initiatives and how we will overcome their limitations
            </li>
            <li className="presentation-list__item">
              Our projected solution &mdash; tools for funding, freelancing,
              exposure &amp; integration
            </li>
            <li className="presentation-list__item">
              Our current and projected team, which could feature you!
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}
