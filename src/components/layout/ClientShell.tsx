"use client";

import type { ReactNode } from "react";
import { ToastProvider } from "@/components/ui/Toast";
import AppShell from "./AppShell";

/**
 * ClientShell — wraps AppShell with client-side providers (Toast, future Auth, etc.).
 * This is a client component so providers can use hooks.
 */
export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <AppShell>{children}</AppShell>
    </ToastProvider>
  );
}
