/**
 * Home page — minimal skeleton for Stage 1.
 * Full cards and navigation will be added in Stage 2.
 */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-foreground)]">
        AI Content Planner
      </h1>
      <p className="mt-3 max-w-md text-center text-lg leading-8 text-[var(--color-muted)]">
        Plan, create, and optimize your short videos with AI.
      </p>
      <p className="mt-8 text-sm text-[var(--color-muted)]">
        Stage 1 — Scaffolding complete. Stage 2 will add the full UI.
      </p>
    </main>
  );
}
