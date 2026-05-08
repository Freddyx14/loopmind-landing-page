"use client";

import Image from "next/image";
import { usePortfolioTheme } from "@/lib/portafolios/theme-context";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = usePortfolioTheme();
  const isDark = theme === "dark";

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: isDark ? "#0a0a0a" : "#ffffff",
        color: isDark ? "#fafafa" : "#171717",
      }}
    >
      {/* Header */}
      <header
        className="border-b transition-colors duration-300"
        style={{
          borderColor: isDark ? "rgba(39,39,42,0.5)" : "rgba(228,228,231,0.8)",
        }}
      >
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Image
              src={isDark ? "/images/logo-dark.png" : "/images/logo-light.png"}
              alt="Loopmind"
              width={140}
              height={36}
              className="h-8 w-auto transition-opacity duration-300"
              priority
            />
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/portafolios"
              className="text-xs transition-colors duration-300"
              style={{ color: isDark ? "#a1a1aa" : "#71717a" }}
            >
              Ver planes
            </Link>
          </div>
        </div>
      </header>

      {/* CSS variables scoped to this wrapper */}
      {/* Override Tailwind brand tokens for this subtree */}
      <style>{`
        .pf-theme {
          --color-surface: ${isDark ? "#0a0a0a" : "#ffffff"};
          --color-surface-elevated: ${isDark ? "#141414" : "#f4f4f5"};
          --color-text-primary: ${isDark ? "#fafafa" : "#171717"};
          --color-text-secondary: ${isDark ? "#a1a1aa" : "#71717a"};
        }
        .pf-theme .pf-border { border-color: ${isDark ? "#27272a" : "#e4e4e7"}; }
        .pf-theme .pf-border-hover:hover { border-color: ${isDark ? "#3f3f46" : "#d4d4d8"}; }
        .pf-theme .pf-card {
          background: ${isDark ? "rgba(20,20,20,0.3)" : "rgba(250,250,250,0.8)"};
          border-color: ${isDark ? "#27272a" : "#e4e4e7"};
        }
        .pf-theme .pf-card:hover { border-color: ${isDark ? "#3f3f46" : "#d4d4d8"}; }
        .pf-theme .pf-card-pro {
          background: ${isDark ? "rgba(228,34,8,0.05)" : "rgba(228,34,8,0.03)"};
          border-color: var(--color-accent);
        }
        .pf-theme input, .pf-theme select, .pf-theme textarea {
          background-color: ${isDark ? "#141414" : "#f9f9f9"} !important;
          border-color: ${isDark ? "#3f3f46" : "#d4d4d8"} !important;
          color: ${isDark ? "#fafafa" : "#171717"} !important;
        }
        .pf-theme input:focus, .pf-theme select:focus, .pf-theme textarea:focus {
          border-color: var(--color-accent) !important;
        }
        .pf-theme input::placeholder, .pf-theme textarea::placeholder {
          color: ${isDark ? "rgba(161,161,170,0.5)" : "rgba(113,113,122,0.5)"} !important;
        }
        .pf-theme option { background: ${isDark ? "#141414" : "#ffffff"}; }
        .pf-theme details { background: ${isDark ? "rgba(20,20,20,0.3)" : "rgba(250,250,250,0.8)"}; border-color: ${isDark ? "#27272a" : "#e4e4e7"}; }
        .pf-theme details:hover { border-color: ${isDark ? "#3f3f46" : "#d4d4d8"}; }
        .pf-theme code { color: ${isDark ? "#a1a1aa" : "#52525b"}; }
        .pf-theme .pf-divider { border-color: ${isDark ? "#27272a" : "#e4e4e7"}; }
      `}</style>

      <div className="pf-theme">
        {children}
      </div>
    </div>
  );
}
