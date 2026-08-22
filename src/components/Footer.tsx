import Image from "next/image";
import Link from "next/link";

import RollLink from "@/components/RollLink";
import Socials from "@/components/Socials";

const FOOTER_LINKS = [
  { label: "Mission", href: "/#mission" },
  { label: "Programs", href: "/#programs" },
  { label: "Projects", href: "/#projects" },
  { label: "Get involved", href: "/#involved" },
  { label: "FAQ", href: "/#faq" },
];

export default function Footer() {
  return (
    <footer className="py-[clamp(3rem,6vw,4.5rem)]">
      <div className="mx-auto flex w-full max-w-[1120px] flex-wrap items-center gap-[clamp(1.2rem,3vw,2rem)] px-[clamp(1.25rem,5vw,2.5rem)] max-md:flex-col max-md:items-start">
        <Link href="/#top" className="inline-flex items-center gap-[0.6rem] text-[#f2f6f9]">
          <Image
            src="/images/logo-static.svg"
            alt=""
            width={24}
            height={24}
            className="size-6"
          />
          <span className="font-[family-name:var(--font-jetbrains)] text-[0.8rem] font-medium tracking-[0.2em] uppercase">
            Big Things
          </span>
        </Link>

        <nav aria-label="Footer" className="flex flex-wrap gap-[clamp(0.9rem,2vw,1.6rem)]">
          {FOOTER_LINKS.map((link) => (
            <RollLink
              key={link.href}
              href={link.href}
              className="min-h-11 items-center"
            >
              {link.label}
            </RollLink>
          ))}
          <a
            href="https://discord.gg/8FXs9WhC8t"
            target="_blank"
            rel="noopener"
            className="group inline-flex min-h-11 items-center overflow-hidden text-[0.9rem] leading-[1.2em] text-[#9fb2c4] transition-colors duration-300 hover:text-inherit focus-visible:text-inherit"
          >
            <span className="block transition-transform duration-[420ms] ease-out group-hover:-translate-y-full group-focus-visible:-translate-y-full">
              <span className="block">Discord</span>
              <span aria-hidden="true" className="block text-[#6fc3e8]">
                Discord
              </span>
            </span>
          </a>
        </nav>

        <div className="ml-auto max-md:ml-0">
          <Socials small />
        </div>

        <p className="m-0 w-full border-t border-[#2f89c5]/18 pt-[1.2rem] font-[family-name:var(--font-jetbrains)] text-[0.68rem] font-medium tracking-[0.14em] text-[#7d90a2] uppercase">
          Copyright &copy; 2026 Big Things 501(c)(3). All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
