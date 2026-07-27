import Link from "next/link";
import Card from "@/components/ui/Card";
import strings from "@/strings/en";

/**
 * Home page — welcome + 4 feature cards linking to each module.
 */
const featureCards = [
  {
    href: "/profile",
    icon: "👤",
    title: strings.home.cards.profile.title,
    description: strings.home.cards.profile.description,
    accent: "bg-indigo-50 text-indigo-700",
  },
  {
    href: "/topics",
    icon: "💡",
    title: strings.home.cards.topics.title,
    description: strings.home.cards.topics.description,
    accent: "bg-amber-50 text-amber-700",
  },
  {
    href: "/plan",
    icon: "📋",
    title: strings.home.cards.plan.title,
    description: strings.home.cards.plan.description,
    accent: "bg-emerald-50 text-emerald-700",
  },
  {
    href: "/analyze",
    icon: "📊",
    title: strings.home.cards.analyze.title,
    description: strings.home.cards.analyze.description,
    accent: "bg-red-50 text-[var(--color-accent)]",
  },
];

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-foreground)]">
          {strings.home.welcome}
        </h1>
        <p className="mt-2 text-base text-[var(--color-muted)] max-w-lg">
          {strings.home.subtitle}
        </p>
      </div>

      {/* Feature cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {featureCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="no-underline group"
          >
            <Card className="h-full transition-all duration-200 group-hover:shadow-[var(--shadow-card-hover)] group-hover:-translate-y-0.5 group-hover:border-[var(--color-primary)]">
              <div className="flex items-start gap-4">
                <div
                  className={[
                    "flex items-center justify-center w-12 h-12 rounded-xl text-xl shrink-0",
                    card.accent,
                  ].join(" ")}
                >
                  {card.icon}
                </div>
                <div>
                  <h2 className="text-base font-semibold text-[var(--color-foreground)]">
                    {card.title}
                  </h2>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {card.description}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
