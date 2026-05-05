import type { Metadata } from "next";
import { outfit, spaceGrotesk } from "@/lib/fonts";
import { SmoothScrollProvider } from "@/lib/gsap-setup";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loopmind — Smarter Marketing. Faster Results.",
  description:
    "AI-powered digital marketing that delivers measurable growth for your business.",
  metadataBase: new URL("https://loopmind.agency"),
  openGraph: {
    title: "Loopmind — Smarter Marketing. Faster Results.",
    description:
      "AI-powered digital marketing that delivers measurable growth for your business.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${outfit.variable} ${spaceGrotesk.variable}`}
    >
      <body className="font-[family-name:var(--font-outfit)]">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
