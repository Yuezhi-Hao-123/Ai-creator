"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStrings, useLocale } from "@/lib/i18n";

/**
 * BottomNav — mobile bottom tab bar + language toggle.
 */
export default function BottomNav() {
  const pathname = usePathname();
  const strings = useStrings();
  const { locale, toggleLocale } = useLocale();

  const tabs = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/profile", label: locale === "zh" ? "资料" : "Profile", icon: "👤" },
    { href: "/topics", label: locale === "zh" ? "选题" : "Topics", icon: "💡" },
    { href: "/plan", label: locale === "zh" ? "方案" : "Plan", icon: "📋" },
    { href: "/analyze", label: locale === "zh" ? "分析" : "Analyze", icon: "📊" },
  ];

  return (
    <nav className="md:hidden sticky bottom-0 z-10 bg-[var(--color-surface)] border-t border-[var(--color-border)] flex items-center justify-around px-1 py-2 safe-area-bottom">
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
              "flex flex-col items-center gap-0.5 px-1 py-1 rounded-lg text-xs font-medium transition-colors no-underline min-w-0",
              isActive
                ? "text-[var(--color-primary)]"
                : "text-[var(--color-muted)]",
            ].join(" ")}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="truncate max-w-[48px]">{tab.label}</span>
          </Link>
        );
      })}
      {/* Language toggle in bottom nav */}
      <button
        onClick={toggleLocale}
        className="flex flex-col items-center gap-0.5 px-1 py-1 rounded-lg text-xs font-medium text-[var(--color-muted)] min-w-0 cursor-pointer"
      >
        <span className="text-lg">🌐</span>
        <span className="truncate max-w-[48px]">{locale === "en" ? "中文" : "EN"}</span>
      </button>
    </nav>
  );
}
