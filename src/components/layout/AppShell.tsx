import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import BottomNav from "./BottomNav";
import strings from "@/strings/en";

/**
 * AppShell — global layout wrapper.
 * Desktop: Sidebar (240px) + main content area.
 * Mobile: Header + main content + bottom tab bar.
 */
interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-[var(--color-background)]">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Mobile header */}
        <Header />

        {/* Page content */}
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-4xl mx-auto w-full">
          {children}
        </main>

        {/* Mobile bottom nav */}
        <BottomNav />

        {/* Footer — desktop only */}
        <footer className="hidden md:block text-center py-4 text-xs text-[var(--color-muted)]">
          {strings.footer.poweredBy}
        </footer>
      </div>
    </div>
  );
}
