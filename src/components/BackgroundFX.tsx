export default function BackgroundFX() {
  return (
    <>
      <style>{`
        @keyframes bg-drift {
          0%, 100% { filter: hue-rotate(0deg); transform: scale(1) translate(0, 0); }
          50%      { filter: hue-rotate(8deg); transform: scale(1.05) translate(2%, 1%); }
        }
        @keyframes breathe-1 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(6vw, 4vw) scale(1.25); } }
        @keyframes breathe-2 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-5vw, -6vw) scale(1.2); } }
        @keyframes breathe-3 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(4vw, -3vw) scale(1.3); } }
        @media (prefers-reduced-motion: reduce) {
          .bg-drift, .orb { animation: none !important; }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="bg-drift pointer-events-none fixed -inset-[10%] z-[-4] motion-safe:animate-[bg-drift_26s_ease-in-out_infinite_alternate] bg-[radial-gradient(circle_at_20%_30%,rgba(47,137,197,0.22),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(111,195,232,0.16),transparent_55%),radial-gradient(circle_at_50%_100%,rgba(30,78,122,0.18),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="orb orb-1 pointer-events-none fixed -top-[8vw] -left-[8vw] z-[-3] size-[70vw] rounded-full bg-[#091826]/60 mix-blend-screen blur-[80px] md:size-[46vw] md:blur-[120px]"
        style={{ animation: "breathe-1 16s ease-in-out infinite" }}
      />
      <div
        aria-hidden="true"
        className="orb orb-2 pointer-events-none fixed -right-[6vw] -bottom-[10vw] z-[-3] size-[64vw] rounded-full bg-[#091826]/60 mix-blend-screen blur-[80px] md:size-[40vw] md:blur-[120px]"
        style={{ animation: "breathe-2 19s ease-in-out infinite" }}
      />
      <div
        aria-hidden="true"
        className="orb orb-3 pointer-events-none fixed bottom-[4vw] left-[8vw] z-[-3] size-[56vw] max-md:hidden rounded-full bg-[#091826]/60 mix-blend-screen blur-[80px] md:size-[34vw] md:blur-[120px]"
        style={{ animation: "breathe-3 22s ease-in-out infinite" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,5,8,0.55)_100%)]"
      />
    </>
  );
}
