import Image from "next/image";
import Link from "next/link";

const NAV_LINK =
  "text-[15px] font-medium text-[var(--color-text-muted)] relative transition-all duration-300 hover:text-[var(--color-accent)] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[var(--color-accent)] after:transition-[width] after:duration-300 hover:after:w-full";

const DROPDOWN_LINK =
  "text-[var(--color-text-muted)] text-sm py-2 px-3 block transition-colors duration-300 text-left hover:text-[var(--color-accent)]";

const DROPDOWN_MENU =
  "absolute top-full left-1/2 -translate-x-1/2 translate-y-2.5 bg-[var(--color-surface)] backdrop-blur-md border border-[var(--color-border)] rounded-xl p-4 min-w-[160px] list-none opacity-0 invisible transition-all duration-300 z-[100] shadow-[0_10px_30px_var(--color-shadow)] group-hover:opacity-100 group-hover:visible group-hover:translate-y-0";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-[80px] bg-[var(--color-surface)] backdrop-blur-md border-b border-[var(--color-border)] transition-all duration-300">
      <div className="grid grid-cols-[auto_0rem_10rem] items-center max-w-[1120px] pr-8 h-full max-[480px]:px-4">
        <Link
          href="/"
          className="justify-self-start flex items-center gap-3 transition-transform duration-300 hover:scale-105"
          aria-label="Home"
        >
          <Image
            src="/transparent-logo.png"
            alt="Big Things"
            width={48}
            height={48}
            priority
          />
          <span className="text-xl font-bold text-[#0098d7] whitespace-nowrap max-md:hidden">
            Big Things
          </span>
        </Link>

        <nav className="justify-self-center" aria-label="Main navigation">
          <ul className="flex list-none gap-10 justify-center max-md:gap-6">
            <li>
              <Link href="/" className={NAV_LINK}>Home</Link>
            </li>

            <li className="group relative flex flex-col items-center">
              <button className={NAV_LINK} type="button">About</button>
              <ul className={DROPDOWN_MENU}>
                <li><Link href="/about/who-we-are" className={DROPDOWN_LINK}>Who We Are</Link></li>
                <li><Link href="/about/team" className={DROPDOWN_LINK}>Our Team</Link></li>
                <li><Link href="/about/careers" className={DROPDOWN_LINK}>Careers</Link></li>
              </ul>
            </li>

            <li className="group relative flex flex-col items-center">
              <button className={NAV_LINK} type="button">Services</button>
              <ul className={DROPDOWN_MENU}>
                <li><Link href="/services/design" className={DROPDOWN_LINK}>Design</Link></li>
                <li><Link href="/services/development" className={DROPDOWN_LINK}>Development</Link></li>
                <li><Link href="/services/marketing" className={DROPDOWN_LINK}>Marketing</Link></li>
              </ul>
            </li>

            <li>
              <Link href="/events" className={NAV_LINK}>Events</Link>
            </li>
            <li>
              <Link href="/images" className={NAV_LINK}>Images</Link>
            </li>
            <li>
              <Link href="/donate" className={NAV_LINK}>Donate</Link>
            </li>
            <li>
              <Link href="/contact" className={NAV_LINK}>Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
