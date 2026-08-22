import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Montserrat } from "next/font/google";

import BackToTop from "@/components/BackToTop";
import BackgroundFX from "@/components/BackgroundFX";
import Constellation from "@/components/Constellation";
import CursorRing from "@/components/CursorRing";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-montserrat",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bigthingssoftware.org"),
  title: "Big Things — exposure and support for community-centric software",
  description:
    "Big Things is a nonprofit giving community-centric software and app development the exposure and support it needs. Bring a project, volunteer, or amplify one.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [{ url: "/images/favicon.svg", type: "image/svg+xml" }],
    apple: "/images/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Big Things",
    url: "https://www.bigthingssoftware.org/",
    title: "Big Things — now open",
    description:
      "Exposure and support for community-centric software and app development. Starting small. Building big.",
    images: [
      {
        url: "/images/og.jpg",
        type: "image/jpeg",
        width: 1200,
        height: 630,
        alt: "Big Things — now open",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Big Things — now open",
    description:
      "Exposure and support for community-centric software and app development. Starting small. Building big.",
    images: ["/images/og.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060a10",
};

const NGO_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Big Things",
  url: "https://www.bigthingssoftware.org/",
  logo: "https://www.bigthingssoftware.org/images/animated-logo.svg",
  description:
    "Big Things provides exposure and support for community-centric software and app development.",
  sameAs: [
    "https://discord.gg/8FXs9WhC8t",
    "https://www.youtube.com/@bigthingssoftware",
    "https://www.instagram.com/bigthingssoftware",
    "https://www.tiktok.com/@bigthingssoftware",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${montserrat.variable} ${jetbrainsMono.variable} bg-[#060a10] font-[family-name:var(--font-inter)] text-[#f2f6f9] antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(NGO_SCHEMA) }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-1/2 focus:z-100 focus:-translate-x-1/2 focus:rounded-b-[10px] focus:bg-[#1c6ea8] focus:px-[1.2rem] focus:py-[0.7rem] focus:text-[0.9rem] focus:text-[#f2f6f9]"
        >
          Skip to content
        </a>

        {/* ambient layers: drift wash, breathing orbs, constellation, vignette */}
        <BackgroundFX />
        <Constellation />
        <CursorRing />

        <Header />

        <main id="main" tabIndex={-1} className="relative z-1 outline-none">
          {children}
        </main>

        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
