import { Button } from "@/components/ui/button";
import BackgroundFX from "@/components/BackgroundFX";

export default function NotFound() {
  return (
    <>
      <BackgroundFX />
      <div className="grid min-h-svh place-items-center px-[clamp(1.25rem,5vw,2.5rem)] text-center">
        <div className="mx-auto w-full max-w-[760px]">
          {/* 404-only: hero type dialled down, single centered column */}
          <p className="m-0 mb-[clamp(0.9rem,2vw,1.2rem)] flex items-center justify-center gap-[0.6em] font-[family-name:var(--font-jetbrains)] text-[0.72rem] font-medium tracking-[0.32em] text-[#6fc3e8] uppercase">
            404
          </p>
          <h1 className="m-0 mb-[clamp(1rem,2.5vw,1.6rem)] font-[family-name:var(--font-montserrat)] text-[clamp(1.9rem,5.5vw,3.25rem)] leading-[0.92] font-extrabold tracking-[-0.01em]">
            This one&apos;s still in orbit.
          </h1>
          <p className="mx-auto m-0 mb-[clamp(2rem,4vw,2.8rem)] max-w-[470px] text-[clamp(0.98rem,1.6vw,1.15rem)] leading-[1.55] text-[#9fb2c4]">
            That page isn&apos;t here — it may have moved, or it may not exist yet.
          </p>

          <div className="flex flex-wrap justify-center gap-[0.8rem]">
            <Button href="/">Back to home</Button>
            <Button
              href="https://discord.gg/8FXs9WhC8t"
              target="_blank"
              rel="noopener"
              variant="ghost"
            >
              Join the Discord
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
