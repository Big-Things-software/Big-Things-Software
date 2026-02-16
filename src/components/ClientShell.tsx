"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { ReactNode } from "react";

export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </ThemeProvider>
  );
}
