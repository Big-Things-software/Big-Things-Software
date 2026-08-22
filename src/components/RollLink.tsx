import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export default function RollLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center overflow-hidden text-[0.9rem] leading-[1.2em] text-[#9fb2c4] transition-colors duration-300 hover:text-inherit focus-visible:text-inherit",
        className
      )}
    >
      <span className="block transition-transform duration-[420ms] ease-out group-hover:-translate-y-full group-focus-visible:-translate-y-full">
        <span className="block">{children}</span>
        <span aria-hidden="true" className="block text-[#6fc3e8]">
          {children}
        </span>
      </span>
    </Link>
  );
}
