"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function Header() {
  const { theme } = useTheme();

  return (
    <header className="header">
      <div className="header__inner">
        <Link href="/" className="header__logo-link" aria-label="Home">
          <Image
            src={theme === "dark" ? "/transparent-logo.png" : "/light-logo.png"}
            alt="Big Things"
            width={48}
            height={48}
            priority
          />
          <span className="header__brand">Big Things</span>
        </Link>

        <nav className="header__nav" aria-label="Main navigation">
          <ul className="header__nav-list">
            <li>
              <Link href="/" className="header__nav-link">Home</Link>
            </li>
            <li>
              <Link href="/about" className="header__nav-link">About</Link>
            </li>
            <li>
              <Link href="/contact" className="header__nav-link">Contact</Link>
            </li>
          </ul>
        </nav>
        
        <div className="header__spacer"></div>

      </div>
    </header>
  );
}
