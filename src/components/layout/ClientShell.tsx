"use client";

import type { ReactNode } from "react";
import { ToastProvider } from "@/components/ui/Toast";
import { LocaleProvider } from "@/lib/i18n";
import { ModelProvider } from "@/lib/model";
import AppShell from "./AppShell";

/**
 * ClientShell — wraps AppShell with client-side providers.
 * Order: Locale → Model → Toast → AppShell
 */
export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <ModelProvider>
        <ToastProvider>
          <AppShell>{children}</AppShell>
        </ToastProvider>
      </ModelProvider>
    </LocaleProvider>
  );
}
