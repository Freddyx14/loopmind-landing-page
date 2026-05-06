import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portafolios Profesionales — Loopmind",
  description:
    "Tu portafolio profesional, listo en dias. Sube tu CV y nosotros hacemos el resto.",
};

export default function PortafoliosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface">
      {/* Minimal header */}
      <header className="border-b border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-sm font-bold text-text-primary tracking-tight">
              l<span className="text-accent">oo</span>pmind
            </span>
          </Link>
          <Link
            href="/portafolios"
            className="text-xs text-text-secondary hover:text-text-primary transition-colors"
          >
            Ver planes
          </Link>
        </div>
      </header>

      {children}
    </div>
  );
}
