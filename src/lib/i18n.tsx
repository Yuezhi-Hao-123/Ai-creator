"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import en from "@/strings/en";
import zh from "@/strings/zh";
import type { Strings } from "@/strings/types";

export type Locale = "en" | "zh";

const stringsMap: Record<Locale, Strings> = { en, zh };

interface LocaleContextValue {
  locale: Locale;
  strings: Strings;
  toggleLocale: () => void;
  setLocale: (l: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  strings: en,
  toggleLocale: () => {},
  setLocale: () => {},
});

/** Hook to access locale + strings + toggleLocale */
export function useLocale() {
  return useContext(LocaleContext);
}

/** Shortcut: returns strings for the current locale */
export function useStrings(): Strings {
  return useContext(LocaleContext).strings;
}

const STORAGE_KEY = "ai_content_planner_locale";

function getStoredLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "zh" || stored === "en") return stored;
  if (navigator.language.startsWith("zh")) return "zh";
  return "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getStoredLocale);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const next = prev === "en" ? "zh" : "en";
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const strings = stringsMap[locale];

  return (
    <LocaleContext.Provider value={{ locale, strings, toggleLocale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}
