import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/* Nav/footer links roll to a duplicate of themselves on hover. The outer
   `row` span is the fixed-height clip window (1.2em, overflow-hidden) —
   without it the wrapping link just grows to fit both stacked copies and
   nothing is ever hidden. The inner sliding span holds both copies and
   translates up by one row on hover. The duplicate is aria-hidden so the
   link is not announced twice. */
export default function RollLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const isExternal = href.startsWith("http");
  const row = "block h-[1.2em] leading-[1.2em]";

  const inner = (
    <span className="block h-[1.2em] overflow-hidden">
      <span className="block transition-transform duration-[420ms] ease-out group-hover:-translate-y-[1.2em] group-focus-visible:-translate-y-[1.2em]">
        <span className={row}>{children}</span>
        <span aria-hidden="true" className={cn(row, "text-[#6fc3e8]")}>
          {children}
        </span>
      </span>
    </span>
  );

  const shared = cn(
    "group inline-flex items-center align-middle text-[0.9rem] text-[#9fb2c4] transition-colors duration-300 hover:text-inherit focus-visible:text-inherit",
    className
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener" className={shared}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={shared}>
      {inner}
    </Link>
  );
}
