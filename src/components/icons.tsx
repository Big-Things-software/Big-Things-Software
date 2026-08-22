import { cn } from "@/lib/utils";

/* Brand marks lucide no longer ships, carried over verbatim from the old site */

export function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={cn("size-[18px] shrink-0", className)}>
      <path d="M20.32 4.37a19.8 19.8 0 0 0-4.9-1.52.07.07 0 0 0-.08.04c-.21.38-.45.87-.61 1.26a18.3 18.3 0 0 0-5.46 0 12.6 12.6 0 0 0-.62-1.26.08.08 0 0 0-.08-.04 19.7 19.7 0 0 0-4.9 1.52.07.07 0 0 0-.03.03C1.02 8.7.32 12.88.66 17.02a.08.08 0 0 0 .03.06 19.9 19.9 0 0 0 5.99 3.03.08.08 0 0 0 .08-.03c.46-.63.87-1.3 1.23-2a.08.08 0 0 0-.04-.11 13.1 13.1 0 0 1-1.87-.9.08.08 0 0 1 0-.13c.13-.1.25-.2.37-.3a.07.07 0 0 1 .08 0c3.93 1.8 8.18 1.8 12.06 0a.07.07 0 0 1 .08.01c.12.1.24.2.37.3a.08.08 0 0 1-.01.13c-.6.35-1.22.65-1.87.9a.08.08 0 0 0-.04.11c.37.7.78 1.36 1.23 2a.08.08 0 0 0 .08.03 19.8 19.8 0 0 0 6-3.03.08.08 0 0 0 .03-.06c.4-4.8-.67-8.95-2.82-12.62a.06.06 0 0 0-.03-.03ZM8.68 14.6c-1.18 0-2.15-1.09-2.15-2.42 0-1.34.95-2.43 2.15-2.43 1.21 0 2.17 1.1 2.15 2.43 0 1.33-.95 2.42-2.15 2.42Zm6.65 0c-1.18 0-2.15-1.09-2.15-2.42 0-1.34.95-2.43 2.15-2.43 1.21 0 2.17 1.1 2.15 2.43 0 1.33-.94 2.42-2.15 2.42Z" />
    </svg>
  );
}

export function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={cn("size-[18px] shrink-0", className)}>
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81ZM9.6 15.4V8.6l6.3 3.4-6.3 3.4Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      className={cn("size-[18px] shrink-0", className)}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" />
    </svg>
  );
}

export function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={cn("size-[18px] shrink-0", className)}>
      <path d="M16.6 3c.3 2.2 1.7 3.9 3.8 4.4v3.1c-1.4 0-2.7-.4-3.8-1.2v6.1a5.9 5.9 0 1 1-5.9-5.9c.2 0 .4 0 .6.02v3.1a2.8 2.8 0 1 0 2 2.7V3h3.3Z" />
    </svg>
  );
}
