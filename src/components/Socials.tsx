import { InstagramIcon, TiktokIcon, YoutubeIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const SOCIALS = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@bigthingssoftware",
    icon: <YoutubeIcon />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/bigthingssoftware",
    icon: <InstagramIcon />,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@bigthingssoftware",
    icon: <TiktokIcon />,
  },
];

export default function Socials({ small = false }: { small?: boolean }) {
  return (
    <ul className="m-0 flex list-none gap-[clamp(1rem,2.5vw,1.4rem)] p-0">
      {SOCIALS.map((social) => (
        <li key={social.label}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener"
            aria-label={social.label}
            data-hot
            className={cn(
              "inline-flex items-center justify-center rounded-full border border-[#2f89c5]/30 bg-transparent text-[#2f89c5] backdrop-blur-[4px] transition-[transform,color,border-color,box-shadow] duration-300 ease-out hover:-translate-y-[3px] hover:border-[#2f89c5] hover:text-[#f2f6f9] hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)] focus-visible:-translate-y-[3px] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#6fc3e8]",
              small ? "size-10" : "size-11"
            )}
          >
            {social.icon}
          </a>
        </li>
      ))}
    </ul>
  );
}
