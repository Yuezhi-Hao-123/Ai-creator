"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStrings, useLocale } from "@/lib/i18n";
import { useModel, MODELS } from "@/lib/model";

export default function Sidebar() {
  const pathname = usePathname();
  const strings = useStrings();
  const { locale, toggleLocale } = useLocale();
  const { model, setModel } = useModel();

  const navItems = [
    { href: "/", label: strings.nav.home, icon: "🏠" },
    { href: "/profile", label: strings.nav.profile, icon: "👤" },
    { href: "/topics", label: strings.nav.topics, icon: "💡" },
    { href: "/plan", label: strings.nav.plan, icon: "📋" },
    { href: "/analyze", label: strings.nav.analyze, icon: "📊" },
  ];

  return (
    <aside className="hidden md:flex md:flex-col md:w-60 md:min-h-screen bg-[var(--color-surface)] border-r border-[var(--color-border)] px-4 py-6">
      <Link href="/" className="flex items-center gap-2 px-3 mb-8 text-[var(--color-foreground)] no-underline">
        <span className="text-xl">🎬</span>
        <span className="text-sm font-semibold tracking-tight">{strings.app.title}</span>
      </Link>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-button)] text-sm font-medium transition-colors no-underline",
                isActive ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-gray-100",
              ].join(" ")}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Model selector */}
      <div className="px-3 mb-2">
        <label className="text-xs text-[var(--color-muted)] mb-1 block">AI Model</label>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value as typeof model)}
          className="w-full rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white px-2 py-1.5 text-xs text-[var(--color-foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] cursor-pointer"
        >
          {MODELS.map((m) => (
            <option key={m.id} value={m.id}>{m.label}</option>
          ))}
        </select>
      </div>

      {/* Language toggle */}
      <div className="px-3 mb-3">
        <button
          onClick={toggleLocale}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-[var(--radius-button)] text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-gray-100 transition-colors cursor-pointer border border-[var(--color-border)]"
        >
          🌐 {locale === "en" ? "中文" : "English"}
        </button>
      </div>

      <div className="px-3 pt-4 border-t border-[var(--color-border)]">
        <p className="text-xs text-[var(--color-muted)]">{strings.footer.builtWith}</p>
      </div>
    </aside>
  );
}
