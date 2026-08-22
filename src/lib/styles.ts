export const HEADING =
  "text-4xl font-extrabold mb-5 leading-tight bg-gradient-to-br from-[var(--color-text)] to-[var(--color-accent)] bg-clip-text text-transparent";

export const SECTION_DESC =
  "text-lg text-[var(--color-text-muted)] leading-relaxed mb-10";

export const DIVIDER =
  "border-none h-px m-0 relative z-[1] bg-[linear-gradient(90deg,transparent_0%,var(--color-border)_15%,var(--color-accent)_50%,var(--color-border)_85%,transparent_100%)]";

const BTN =
  "inline-flex items-center justify-center py-4 px-10 text-[17px] font-semibold rounded-xl border-2 border-transparent cursor-pointer transition-all duration-300 relative overflow-hidden";

export const BTN_PRIMARY =
  `${BTN} bg-gradient-to-br from-[var(--color-accent)] to-cyan-500 text-white shadow-[0_4px_16px_var(--color-accent-glow)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_var(--color-accent-glow)]`;

export const BTN_OUTLINE =
  `${BTN} bg-[var(--color-surface)] backdrop-blur-sm border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_var(--color-accent-glow)]`;
