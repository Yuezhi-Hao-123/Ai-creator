"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import strings from "@/strings/en";

/**
 * Sidebar — desktop navigation (240px fixed width).
 * Highlights the current page with indigo background.
 * Mobile: hidden (replaced by bottom tab bar in AppShell).
 */
const navItems = [
  { href: "/", label: strings.nav.home, icon: "🏠" },
  { href: "/profile", label: strings.nav.profile, icon: "👤" },
  { href: "/topics", label: strings.nav.topics, icon: "💡" },
  { href: "/plan", label: strings.nav.plan, icon: "📋" },
  { href: "/analyze", label: strings.nav.analyze, icon: "📊" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col md:w-60 md:min-h-screen bg-[var(--color-surface)] border-r border-[var(--color-border)] px-4 py-6">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 px-3 mb-8 text-[var(--color-foreground)] no-underline"
      >
        <span className="text-xl">🎬</span>
        <span className="text-sm font-semibold tracking-tight">
          {strings.app.title}
        </span>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-button)] text-sm font-medium transition-colors no-underline",
                isActive
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-gray-100",
              ].join(" ")}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pt-4 border-t border-[var(--color-border)]">
        <p className="text-xs text-[var(--color-muted)]">
          {strings.footer.builtWith}
        </p>
      </div>
    </aside>
  );
}
