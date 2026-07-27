import ProfileForm from "@/components/profile/ProfileForm";
import strings from "@/strings/en";

/**
 * Creator Profile page — full form with Supabase integration.
 */
export default function ProfilePage() {
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-foreground)]">
        {strings.profile.title}
      </h1>
      <p className="mt-1 mb-6 text-sm text-[var(--color-muted)]">
        {strings.profile.description}
      </p>

      <ProfileForm />
    </div>
  );
}
