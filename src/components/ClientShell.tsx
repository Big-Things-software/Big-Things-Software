import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import type { ReactNode } from "react";

export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <Header />
      <main className="relative z-[1] flex-1">{children}</main>
      <Footer />
    </ThemeProvider>
  );
}
