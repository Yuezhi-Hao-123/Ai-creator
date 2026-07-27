"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * BottomNav — mobile bottom tab bar (visible only on < md screens).
 * 4 main feature tabs + home in the center.
 */
const tabs = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/profile", label: "Profile", icon: "👤" },
  { href: "/topics", label: "Topics", icon: "💡" },
  { href: "/plan", label: "Plan", icon: "📋" },
  { href: "/analyze", label: "Analyze", icon: "📊" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden sticky bottom-0 z-10 bg-[var(--color-surface)] border-t border-[var(--color-border)] flex justify-around px-2 py-2 safe-area-bottom">
      {tabs.map((tab) => {
        const isActive =
          tab.href === "/"
            ? pathname === "/"
            : pathname.startsWith(tab.href);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={[
              "flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-xs font-medium transition-colors no-underline min-w-0",
              isActive
                ? "text-[var(--color-primary)]"
                : "text-[var(--color-muted)]",
            ].join(" ")}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="truncate max-w-[56px]">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
