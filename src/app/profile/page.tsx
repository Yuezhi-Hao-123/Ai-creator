"use client";

import Link from "next/link";
import ProfileForm from "@/components/profile/ProfileForm";
import { useStrings } from "@/lib/i18n";

export default function ProfilePage() {
  const strings = useStrings();

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-foreground)]">{strings.profile.title}</h1>
      <p className="mt-1 mb-6 text-sm text-[var(--color-muted)]">{strings.profile.description}</p>
      <ProfileForm />
      <div className="mt-8 flex justify-end">
        <Link href="/topics" className="inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-primary)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)] transition-colors no-underline shadow-sm">
          💡 {strings.topics.generateButton} →
        </Link>
      </div>
    </div>
  );
}
