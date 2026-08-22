const ITEMS = [
  "clubs",
  "campuses",
  "dorm floors",
  "game servers",
  "nonprofits",
  "libraries",
  "maker spaces",
  "student orgs",
  "neighborhoods",
  "volunteer crews",
];

function Run({ hidden = false }: { hidden?: boolean }) {
  return (
    <span
      aria-hidden={hidden || undefined}
      className="flex flex-[0_0_auto] items-center pr-[0.6em] font-[family-name:var(--font-montserrat)] text-[clamp(1.4rem,3.4vw,2.6rem)] font-bold tracking-[-0.01em] text-[#7d90a2]"
    >
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          {item}
          <i className="px-[0.5em] py-0 font-normal not-italic text-[#2f89c5]">&middot;</i>
        </span>
      ))}
    </span>
  );
}

/* what "community" means here, on a loop */
export default function Marquee() {
  return (
    <>
      <style>{`
        @keyframes marquee-scroll { to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none !important; }
        }
      `}</style>
      <div className="overflow-hidden border-y border-[#2f89c5]/18 bg-[linear-gradient(90deg,rgba(9,24,38,0.5),transparent_30%,transparent_70%,rgba(9,24,38,0.5))] py-[clamp(1.6rem,3vw,2.4rem)] [-webkit-mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div
          aria-hidden="true"
          className="marquee-track flex w-max will-change-transform motion-safe:animate-[marquee-scroll_38s_linear_infinite] hover:[animation-play-state:paused]"
        >
          <Run />
          <Run hidden />
        </div>
      </div>
    </>
  );
}
