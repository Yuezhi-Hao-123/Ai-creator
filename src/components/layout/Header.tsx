"use client";

import { usePathname } from "next/navigation";
import { useStrings } from "@/lib/i18n";

/**
 * Header — mobile top bar showing current page title.
 */
export default function Header() {
  const pathname = usePathname();
  const strings = useStrings();

  const pageTitles: Record<string, string> = {
    "/": strings.nav.home,
    "/profile": strings.nav.profile,
    "/topics": strings.nav.topics,
    "/plan": strings.nav.plan,
    "/analyze": strings.nav.analyze,
  };

  const title = pageTitles[pathname] || strings.app.title;

  return (
    <header className="md:hidden sticky top-0 z-10 bg-[var(--color-background)]/80 backdrop-blur-sm border-b border-[var(--color-border)] px-4 py-3">
      <h1 className="text-sm font-semibold text-[var(--color-foreground)]">
        {title}
      </h1>
    </header>
  );
}
