"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function Header() {
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 h-[80px] bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border-b border-slate-300/20 dark:border-slate-700/30 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
      <div className="grid grid-cols-[auto_0rem_10rem] items-center max-w-[1120px] mx-0 !important px-0 pr-8 h-full">
        <Link href="/" className="col-start-1 justify-self-start flex items-center gap-3 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105" aria-label="Home">
          <Image
            src={theme === "dark" ? "/transparent-logo.png" : "/light-logo.png"}
            alt="Big Things"
            width={48}
            height={48}
            priority
          />
          <span className="text-xl font-bold text-sky-600 dark:text-cyan-500 whitespace-nowrap">Big Things</span>
        </Link>

        <nav className="col-start-2 justify-self-center" aria-label="Main navigation">
        <ul className="flex list-none gap-10 justify-center">
  <li>
    <Link href="/" className="text-[15px] font-medium text-slate-500 dark:text-slate-400 relative transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-sky-600 dark:hover:text-cyan-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-sky-600 dark:after:bg-cyan-500 after:transition-[width] after:duration-300 after:ease-[cubic-bezier(0.4,0,0.2,1)] hover:after:w-full">Home</Link>
  </li>

  {/* About Dropdown */}
  <li className="relative flex flex-col items-center dropdown">
    <button className="text-[15px] font-medium text-slate-500 dark:text-slate-400 relative transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-sky-600 dark:hover:text-cyan-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-sky-600 dark:after:bg-cyan-500 after:transition-[width] after:duration-300 after:ease-[cubic-bezier(0.4,0,0.2,1)] hover:after:w-full dropdown-toggle">About</button>
    <ul className="absolute top-full left-1/2 -translate-x-1/2 translate-y-[10px] bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-300/20 dark:border-slate-700/30 rounded-xl p-4 min-w-[160px] list-none opacity-0 invisible transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-[100] shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.6)] group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 hover:opacity-100 hover:visible hover:translate-y-0">
      <li><Link href="/about/who-we-are" className="text-slate-500 dark:text-slate-400 text-[14px] py-2 px-3 block transition-color duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-sky-600 dark:hover:text-cyan-500 text-left">Who We Are</Link></li>
      <li><Link href="/about/team" className="text-slate-500 dark:text-slate-400 text-[14px] py-2 px-3 block transition-color duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-sky-600 dark:hover:text-cyan-500 text-left">Our Team</Link></li>
      <li><Link href="/about/careers" className="text-slate-500 dark:text-slate-400 text-[14px] py-2 px-3 block transition-color duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-sky-600 dark:hover:text-cyan-500 text-left">Careers</Link></li>
    </ul>
  </li>

  {/* Services Dropdown */}
  <li className="relative flex flex-col items-center dropdown">
    <button className="text-[15px] font-medium text-slate-500 dark:text-slate-400 relative transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-sky-600 dark:hover:text-cyan-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-sky-600 dark:after:bg-cyan-500 after:transition-[width] after:duration-300 after:ease-[cubic-bezier(0.4,0,0.2,1)] hover:after:w-full dropdown-toggle">Services</button>
    <ul className="absolute top-full left-1/2 -translate-x-1/2 translate-y-[10px] bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-300/20 dark:border-slate-700/30 rounded-xl p-4 min-w-[160px] list-none opacity-0 invisible transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-[100] shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:opacity-100 hover:visible hover:translate-y-0">
      <li><Link href="/services/design" className="text-slate-500 dark:text-slate-400 text-[14px] py-2 px-3 block transition-color duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-sky-600 dark:hover:text-cyan-500 text-left">Design</Link></li>
      <li><Link href="/services/development" className="text-slate-500 dark:text-slate-400 text-[14px] py-2 px-3 block transition-color duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-sky-600 dark:hover:text-cyan-500 text-left">Development</Link></li>
      <li><Link href="/services/marketing" className="text-slate-500 dark:text-slate-400 text-[14px] py-2 px-3 block transition-color duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-sky-600 dark:hover:text-cyan-500 text-left">Marketing</Link></li>
    </ul>
  </li>

  <li>
    <Link href="/events" className="text-[15px] font-medium text-slate-500 dark:text-slate-400 relative transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-sky-600 dark:hover:text-cyan-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-sky-600 dark:after:bg-cyan-500 after:transition-[width] after:duration-300 after:ease-[cubic-bezier(0.4,0,0.2,1)] hover:after:w-full">Events</Link>
  </li>

  <li>
    <Link href="/images" className="text-[15px] font-medium text-slate-500 dark:text-slate-400 relative transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-sky-600 dark:hover:text-cyan-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-sky-600 dark:after:bg-cyan-500 after:transition-[width] after:duration-300 after:ease-[cubic-bezier(0.4,0,0.2,1)] hover:after:w-full">Images</Link>
  </li>

  <li>
    <Link href="/donate" className="text-[15px] font-medium text-slate-500 dark:text-slate-400 relative transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-sky-600 dark:hover:text-cyan-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-sky-600 dark:after:bg-cyan-500 after:transition-[width] after:duration-300 after:ease-[cubic-bezier(0.4,0,0.2,1)] hover:after:w-full header__nav-link--highlight">Donate</Link>
  </li>

  <li>
    <Link href="/contact" className="text-[15px] font-medium text-slate-500 dark:text-slate-400 relative transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-sky-600 dark:hover:text-cyan-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-sky-600 dark:after:bg-cyan-500 after:transition-[width] after:duration-300 after:ease-[cubic-bezier(0.4,0,0.2,1)] hover:after:w-full">Contact</Link>
  </li>
</ul>
        </nav>
        
        <div className="header__spacer"></div>

      </div>
    </header>
  );
}
