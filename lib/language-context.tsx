"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { translations, type Locale, type Translations } from "./i18n";

interface LanguageContextType {
  locale: Locale;
  t: Translations;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "es",
  t: translations.es,
  toggleLocale: () => {},
});

export function useLanguage() {
  return useContext(LanguageContext);
}

function detectLocale(): Locale {
  if (typeof window === "undefined") return "es";

  // Check if user previously chose a language
  const saved = localStorage.getItem("loopmind-locale");
  if (saved === "en" || saved === "es") return saved;

  // Detect from browser language
  const browserLang = navigator.language || "";
  if (browserLang.startsWith("es")) return "es";

  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default to Spanish (most clients are LATAM)
  const [locale, setLocale] = useState<Locale>("es");

  // On mount, detect actual preference
  useEffect(() => {
    setLocale(detectLocale());
  }, []);

  const toggleLocale = () => {
    setLocale((prev) => {
      const next = prev === "en" ? "es" : "en";
      localStorage.setItem("loopmind-locale", next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider
      value={{ locale, t: translations[locale], toggleLocale }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
