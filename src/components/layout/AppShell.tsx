"use client";

import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import BottomNav from "./BottomNav";
import { useStrings } from "@/lib/i18n";

/**
 * AppShell — global layout wrapper.
 * Desktop: Sidebar + main content. Mobile: Header + content + BottomNav.
 */
export default function AppShell({ children }: { children: ReactNode }) {
  const strings = useStrings();

  return (
    <div className="flex min-h-screen bg-[var(--color-background)]">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-4xl mx-auto w-full">
          {children}
        </main>
        <BottomNav />
        <footer className="hidden md:block text-center py-4 text-xs text-[var(--color-muted)]">
          {strings.footer.poweredBy}
        </footer>
      </div>
    </div>
  );
}
