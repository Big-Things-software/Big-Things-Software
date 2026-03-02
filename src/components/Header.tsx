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

  {/* About Dropdown */}
  <li className="header__nav-item dropdown">
    <button className="header__nav-link dropdown-toggle">About</button>
    <ul className="dropdown-menu">
      <li><Link href="/about/who-we-are" className="dropdown-item">Who We Are</Link></li>
      <li><Link href="/about/team" className="dropdown-item">Our Team</Link></li>
      <li><Link href="/about/careers" className="dropdown-item">Careers</Link></li>
    </ul>
  </li>

  {/* Services Dropdown */}
  <li className="header__nav-item dropdown">
    <button className="header__nav-link dropdown-toggle">Services</button>
    <ul className="dropdown-menu">
      <li><Link href="/services/design" className="dropdown-item">Design</Link></li>
      <li><Link href="/services/development" className="dropdown-item">Development</Link></li>
      <li><Link href="/services/marketing" className="dropdown-item">Marketing</Link></li>
    </ul>
  </li>

  <li>
    <Link href="/events" className="header__nav-link">Events</Link>
  </li>

  <li>
    <Link href="/images" className="header__nav-link">Images</Link>
  </li>

  <li>
    <Link href="/donate" className="header__nav-link header__nav-link--highlight">Donate</Link>
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
