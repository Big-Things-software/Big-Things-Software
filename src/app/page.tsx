import DecodedEyebrow from "@/components/DecodedEyebrow";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import OrbitPrograms from "@/components/home/OrbitPrograms";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DiscordIcon } from "@/components/icons";

const MISSION_CARDS = [
  {
    title: "Exposure",
    body: "We put community projects in front of an audience. Videos, showcases, and posts across our channels — the reach a small team can't buy.",
  },
  {
    title: "Support",
    body: "Feedback, code review, and help getting unstuck. The parts of shipping that are hardest to do alone.",
  },
  {
    title: "Community",
    body: "A Discord of people building the same kind of thing at the same stage, in public, where asking a beginner question costs nothing.",
  },
];

const FAQS = [
  {
    q: "What counts as community-centric software?",
    a: "Software built for a group of people rather than a market. A tool for a club, a campus, a neighborhood, a game server, a nonprofit. If the users know each other, it counts.",
  },
  {
    q: "Do I need to be experienced?",
    a: "No. First projects and first-time builders are the point. Bring the thing you're not sure is good enough yet.",
  },
  {
    q: "What does it cost?",
    a: "Nothing. Big Things is a nonprofit — exposure and support are free to the people we work with.",
  },
  {
    q: "Does the project have to be finished?",
    a: "No. Work in progress is often the more interesting story, and showing it early is how you find the people who want to help.",
  },
  {
    q: "Are you taking projects now?",
    a: "Yes. The Discord is open and we're taking projects — bring whatever you're working on, however far along it is.",
  },
  {
    q: "How can I support Big Things?",
    a: "Join the Discord, share a project, or point someone toward us who's building one. Reach is the thing we're short on, and it's free to give.",
  },
];

const WAYS_IN = [
  {
    title: "Build",
    body: "Bring a project you're making for a community you're part of. Any stage, any size.",
  },
  {
    title: "Volunteer",
    body: "Review code, cut video, design, or mentor someone a step behind you.",
  },
  {
    title: "Amplify",
    body: "Follow the channels and share what you see. Reach is what these projects need most.",
  },
];

function Slot({ n }: { n: string }) {
  return (
    <article
      data-hot
      className="group/slot relative grid min-h-[168px] place-content-center gap-[0.5rem] rounded-[18px] border border-dashed border-[#2f89c5]/32 bg-[#090f18]/35 p-[1.5rem] text-center transition-[border-color,background-color] duration-300 [background-image:repeating-linear-gradient(115deg,rgba(47,137,197,0.07)_0_12px,transparent_12px_34px)] [background-size:200%_100%] hover:border-[#2f89c5] hover:bg-[#2f89c5]/6 motion-safe:animate-[slot-drift_14s_linear_infinite]"
    >
      <span className="font-[family-name:var(--font-jetbrains)] text-[0.72rem] font-medium tracking-[0.28em] text-[#6fc3e8] uppercase">
        Slot {n}
      </span>
      <p className="m-0 text-[0.9rem] text-[#7d90a2] transition-[opacity,transform] duration-300 group-hover/slot:-translate-y-[6px] group-hover/slot:opacity-0">
        Open
      </p>
      {/* an open slot says what it wants */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[clamp(1.5rem,3vw,2rem)] translate-y-[6px] text-[0.95rem] text-[#6fc3e8] opacity-0 transition-[opacity,transform] duration-300 group-hover/slot:translate-y-0 group-hover/slot:opacity-100"
      >
        Bring yours &rarr;
      </span>
    </article>
  );
}

export default function Home() {
  return (
    <>
      {/* shared keyframes for this page's ambient loops */}
      <style>{`
        @keyframes cta-pulse {
          0% { box-shadow: 0 0 0 0 rgba(111,195,232,.45), 0 0 0 1px rgba(47,137,197,.4), 0 8px 30px rgba(47,137,197,.35); }
          70%, 100% { box-shadow: 0 0 0 20px rgba(111,195,232,0), 0 0 0 1px rgba(47,137,197,.4), 0 8px 30px rgba(47,137,197,.35); }
        }
        @keyframes slot-drift { to { background-position: -200% 0; } }
      `}</style>

      <Hero />

      {/* everything below the hero sits on one continuous dark/tech shell */}
      <div className="relative bg-[#05080d]">
        {/* faint grid + soft glow layer — purely decorative, sits behind all content */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-60 [background-image:linear-gradient(rgba(47,137,197,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(47,137,197,0.06)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_40%,transparent_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 z-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#2f89c5]/12 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 bottom-0 z-0 h-[500px] w-[500px] translate-x-1/3 translate-y-1/3 rounded-full bg-[#2f89c5]/8 blur-[140px]"
        />

        {/* everything below needs to sit above the background layers */}
        <div className="relative z-10">
          {/* WHAT WE DO */}
          <section id="mission" aria-labelledby="mission-h" className="relative py-[clamp(5rem,11vw,9rem)]">
            <div className="mx-auto w-full max-w-[1120px] px-[clamp(1.25rem,5vw,2.5rem)]">
              <DecodedEyebrow rule text="Our mission" />
              <Reveal>
                <h2
                  id="mission-h"
                  className="m-0 mb-[clamp(1.6rem,3vw,2.4rem)] max-w-[18ch] font-[family-name:var(--font-montserrat)] text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.05] font-bold tracking-[-0.015em]"
                >
                  Three things, for people building for their own community.
                </h2>
              </Reveal>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[clamp(1rem,2vw,1.4rem)]">
                {MISSION_CARDS.map((card, i) => (
                  <Reveal key={card.title} delay={i * 0.1}>
                    <TiltCard className="h-full">
                      <h3 className="m-0 mb-[0.6rem] font-[family-name:var(--font-montserrat)] text-[1.15rem] font-bold tracking-[-0.005em] text-[#f2f6f9]">
                        {card.title}
                      </h3>
                      <p className="m-0 text-[0.97rem] text-[#9fb2c4]">{card.body}</p>
                    </TiltCard>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* HOW IT WORKS — orbit section */}
          <OrbitPrograms />

          {/* PROJECTS */}
          <section id="projects" aria-labelledby="projects-h" className="relative py-[clamp(5rem,11vw,9rem)]">
            <div className="mx-auto w-full max-w-[1120px] px-[clamp(1.25rem,5vw,2.5rem)]">
              <DecodedEyebrow rule text="Projects" />
              <Reveal>
                <h2
                  id="projects-h"
                  className="m-0 mb-[clamp(1.6rem,3vw,2.4rem)] max-w-[18ch] font-[family-name:var(--font-montserrat)] text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.05] font-bold tracking-[-0.015em]"
                >
                  The showcase is empty on purpose.
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="-mt-4 mb-[clamp(2rem,4vw,2.8rem)] max-w-[58ch] text-[clamp(1rem,1.5vw,1.12rem)] text-[#9fb2c4]">
                  We just opened, so nothing here is borrowed or invented. These slots belong to
                  the first projects that come through the Discord — yours can be one of them.
                </p>
              </Reveal>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[clamp(1rem,2vw,1.4rem)]">
                {["01", "02", "03"].map((n, i) => (
                  <Reveal key={n} delay={i * 0.1}>
                    <Slot n={n} />
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.15}>
                <p className="m-0 mt-[clamp(1.6rem,3vw,2.2rem)] max-w-[62ch] text-[0.95rem] text-[#9fb2c4]">
                  Building a tool for a club, a campus, a neighborhood, a server, or a nonprofit?
                  That&apos;s the kind of thing we&apos;re looking for.
                </p>
              </Reveal>
            </div>
          </section>

          {/* what "community" means here, on a loop */}
          <Marquee />

          {/* FAQ */}
          <section id="faq" aria-labelledby="faq-h" className="relative py-[clamp(5rem,11vw,9rem)]">
            <div className="mx-auto w-full max-w-[1120px] px-[clamp(1.25rem,5vw,2.5rem)]">
              <DecodedEyebrow rule text="FAQ" />
              <Reveal>
                <h2
                  id="faq-h"
                  className="m-0 mb-[clamp(1.6rem,3vw,2.4rem)] max-w-[18ch] font-[family-name:var(--font-montserrat)] text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.05] font-bold tracking-[-0.015em]"
                >
                  Questions we get.
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <Accordion type="single" collapsible className="max-w-[760px] border-t border-[#2f89c5]/18">
                  {FAQS.map((faq) => (
                    <AccordionItem key={faq.q} value={faq.q}>
                      <AccordionTrigger>{faq.q}</AccordionTrigger>
                      <AccordionContent>
                        <p className="m-0 text-[0.97rem] text-[#9fb2c4]">{faq.a}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Reveal>
            </div>
          </section>

          {/* CTA — get involved */}
          <section
            id="involved"
            aria-labelledby="involved-h"
            className="border-y border-[#2f89c5]/18 py-[clamp(4.5rem,10vw,7rem)] text-center"
          >
            <div className="mx-auto w-full max-w-[1120px] px-[clamp(1.25rem,5vw,2.5rem)]">
              <DecodedEyebrow text="Get involved" className="justify-center" />
              <Reveal>
                <h2
                  id="involved-h"
                  className="mx-auto m-0 mb-[clamp(1.6rem,3vw,2.4rem)] max-w-[18ch] font-[family-name:var(--font-montserrat)] text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.05] font-bold tracking-[-0.015em]"
                >
                  Three ways in.
                </h2>
              </Reveal>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[clamp(1rem,2vw,1.4rem)] text-left">
                {WAYS_IN.map((card, i) => (
                  <Reveal key={card.title} delay={i * 0.1}>
                    <TiltCard className="h-full">
                      <h3 className="m-0 mb-[0.6rem] font-[family-name:var(--font-montserrat)] text-[1.15rem] font-bold tracking-[-0.005em] text-[#f2f6f9]">
                        {card.title}
                      </h3>
                      <p className="m-0 text-[0.97rem] text-[#9fb2c4]">{card.body}</p>
                    </TiltCard>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.15}>
                <div className="pt-[clamp(3.5rem,7vw,5.5rem)]">
                  <h2 className="m-0 mb-[clamp(1.8rem,3.5vw,2.4rem)] font-[family-name:var(--font-montserrat)] text-[clamp(2.1rem,6vw,3.6rem)] leading-none font-extrabold tracking-[-0.02em]">
                    Starting small.
                    <br />
                    Building big.
                  </h2>
                  <Button
                    href="https://discord.gg/8FXs9WhC8t"
                    target="_blank"
                    rel="noopener"
                    size="lg"
                  >
                    <DiscordIcon />
                    Join the Discord
                  </Button>
                </div>
              </Reveal>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
