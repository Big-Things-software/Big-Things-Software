"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function Header() {
  const { theme } = useTheme();

  const navLinkClasses = "!inline-block !pb-2 !text-[0.9375rem] !font-medium !text-slate-500 dark:!text-slate-400 !transition-all !duration-300 !ease-in-out !relative after:!content-[''] after:!absolute after:!bottom-0 after:!left-0 after:!w-0 after:!h-[2px] after:!bg-[#0097d6] dark:after:!bg-[#06b6d4] after:!transition-[width] after:!duration-300 after:!ease-in-out hover:!text-[#0097d6] dark:hover:!text-[#06b6d4] hover:after:!w-full";
  
  const dropdownMenuClasses = "!absolute !top-full !left-1/2 !-translate-x-1/2 !translate-y-4 !bg-white/70 dark:!bg-slate-900/60 !backdrop-blur-lg !border !border-slate-400/20 dark:!border-slate-500/30 !rounded-xl !p-2 !min-w-[160px] !opacity-0 !invisible group-hover:!opacity-100 group-hover:!visible group-hover:!translate-y-2 !transition-all !duration-300 !ease-in-out !z-50 !shadow-lg dark:!shadow-black/20 !flex !flex-col !gap-1";
  
  const dropdownItemClasses = "!block !text-slate-500 dark:!text-slate-400 !text-[0.9rem] !px-3 !py-2 !transition-colors !duration-300 !ease-in-out !text-left hover:!text-[#0097d6] dark:hover:!text-[#06b6d4] !rounded-md hover:!bg-slate-200/50 dark:hover:!bg-slate-800/50";

  return (
    <header className="!sticky !top-0 !z-50 !h-[80px] !bg-white/70 dark:!bg-slate-900/60 !backdrop-blur-lg !backdrop-saturate-180 !border-b !border-slate-400/20 dark:!border-slate-500/30 !transition-all !duration-300 !ease-in-out">
      <div className="!grid !grid-cols-3 !items-center !h-full !w-full !px-8">
        <div className="!justify-self-start">
          <Link href="/" className="!flex !items-center !gap-3 !transition-transform !duration-300 !ease-in-out hover:!scale-105" aria-label="Home">
            <Image
              src={theme === "dark" ? "/transparent-logo.png" : "/light-logo.png"}
              alt="Big Things"
              width={48}
              height={48}
              priority
            />
            <span className="!text-xl !font-bold !text-[#0097d6] dark:!text-[#06b6d4] !whitespace-nowrap">Big Things</span>
          </Link>
        </div>

        <nav className="!justify-self-center" aria-label="Main navigation">
          <ul className="!flex !items-center !gap-10">
            <li>
              <Link href="/" className={navLinkClasses}>Home</Link>
            </li>

            <li className="!relative group">
              <div className={`${navLinkClasses} !cursor-pointer`}>About</div>
              <ul className={dropdownMenuClasses}>
                <li><Link href="/about/who-we-are" className={dropdownItemClasses}>Who We Are</Link></li>
                <li><Link href="/about/team" className={dropdownItemClasses}>Our Team</Link></li>
                <li><Link href="/about/careers" className={dropdownItemClasses}>Careers</Link></li>
              </ul>
            </li>

            <li className="!relative group">
              <div className={`${navLinkClasses} !cursor-pointer`}>Services</div>
              <ul className={dropdownMenuClasses}>
                <li><Link href="/services/design" className={dropdownItemClasses}>Design</Link></li>
                <li><Link href="/services/development" className={dropdownItemClasses}>Development</Link></li>
                <li><Link href="/services/marketing" className={dropdownItemClasses}>Marketing</Link></li>
              </ul>
            </li>

            <li>
              <Link href="/events" className={navLinkClasses}>Events</Link>
            </li>

            <li>
              <Link href="/images" className={navLinkClasses}>Images</Link>
            </li>

            <li>
              <Link href="/donate" className={`${navLinkClasses} header__nav-link--highlight`}>Donate</Link>
            </li>

            <li>
              <Link href="/contact" className={navLinkClasses}>Contact</Link>
            </li>
          </ul>
        </nav>

        <div className="!justify-self-end"></div>
      </div>
    </header>
  );
}
