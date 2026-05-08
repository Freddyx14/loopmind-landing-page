import type { Metadata } from "next";
import { PortfolioThemeProvider } from "@/lib/portafolios/theme-context";
import { ThemeWrapper } from "@/components/portafolios/theme-wrapper";

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
    <PortfolioThemeProvider>
      <ThemeWrapper>{children}</ThemeWrapper>
    </PortfolioThemeProvider>
  );
}
