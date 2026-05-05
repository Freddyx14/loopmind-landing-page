"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageProvider, useLanguage } from "@/lib/language-context";
import { Reveal } from "@/components/motion/reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container";
import { Parallax } from "@/components/motion/parallax";
import {
  TextRevealCard,
  TextRevealCardTitle,
  TextRevealCardDescription,
} from "@/components/ui/text-reveal-card";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   Particles — deterministic seeds to avoid
   hydration mismatch. Generated once at module
   level so they're stable across renders.
   ───────────────────────────────────────────── */
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const PARTICLES = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  left: `${Math.round(seededRandom(i * 3 + 1) * 10000) / 100}%`,
  top: `${Math.round(seededRandom(i * 3 + 2) * 10000) / 100}%`,
  size: Math.round((2 + seededRandom(i * 3 + 3) * 3) * 100) / 100,
  duration: Math.round((15 + seededRandom(i * 7) * 20) * 100) / 100,
  delay: Math.round(seededRandom(i * 11) * 1000) / 100,
}));

/* ─────────────────────────────────────────────
   Service icons — inline SVGs
   ───────────────────────────────────────────── */
function IconSocial() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      <circle cx="18" cy="3" r="2" fill="#E42208" stroke="#E42208" />
    </svg>
  );
}

function IconSEO() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="8" y1="11" x2="14" y2="11" />
      <line x1="11" y1="8" x2="11" y2="14" />
    </svg>
  );
}

function IconAds() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <path d="M7 8l3 3-3 3" />
      <line x1="13" y1="13" x2="17" y2="13" />
    </svg>
  );
}

function IconEmail() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="22,4 12,13 2,4" />
    </svg>
  );
}

function IconAI() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
      <path d="M16 14H8a4 4 0 0 0-4 4v2h16v-2a4 4 0 0 0-4-4z" />
      <circle cx="9" cy="7" r="1" fill="currentColor" />
      <circle cx="15" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}

function IconWeb() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16,18 22,12 16,6" />
      <polyline points="8,6 2,12 8,18" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  );
}

const SERVICE_ICONS = [IconSocial, IconSEO, IconAds, IconEmail, IconAI, IconWeb];

/* ─────────────────────────────────────────────
   GlowButton — gradient border reveal on hover
   Adapted from Uiverse, branded with Loopmind red
   ───────────────────────────────────────────── */
function GlowButton({
  children,
  onClick,
  href,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}) {
  const Tag = href ? "a" : "button";
  const linkProps = href ? { href, target: "_blank" as const, rel: "noopener noreferrer" as const } : {};
  return (
    <Tag
      onClick={onClick}
      {...linkProps}
      className={`relative group inline-block p-px font-semibold leading-6 text-white bg-[#141414] shadow-2xl cursor-pointer rounded-xl shadow-black/50 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 ${className}`}
    >
      <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#E42208] via-[#ff6b57] to-[#E42208] p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="relative z-10 block px-7 py-3.5 rounded-xl bg-[#0a0a0a]">
        <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
          <span className="transition-all duration-500 group-hover:translate-x-0.5">
            {children}
          </span>
          <svg
            className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              clipRule="evenodd"
              d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
              fillRule="evenodd"
            />
          </svg>
        </span>
      </span>
    </Tag>
  );
}

/* ─────────────────────────────────────────────
   Smooth scroll helper
   ───────────────────────────────────────────── */
function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* ─────────────────────────────────────────────
   AnimatedCounter — counts up when in view
   ───────────────────────────────────────────── */
function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(value);
  const hasAnimated = useRef(false);

  // Parse the numeric part and suffix from values like "70-80%", "3x", "$70/mo", "24/7"
  const parsed = useMemo(() => {
    const match = value.match(/^(\$)?(\d+)(.*)/);
    if (!match) return null;
    return {
      prefix: match[1] || "",
      number: parseInt(match[2], 10),
      suffix: match[3] || "",
    };
  }, [value]);

  useEffect(() => {
    if (!ref.current || !parsed) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = 0;
          const end = parsed.number;
          const duration = 2000;
          const startTime = performance.now();

          function easeOutExpo(t: number) {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          }

          function animate(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutExpo(progress);
            const current = Math.round(start + (end - start) * easedProgress);
            setDisplayValue(`${parsed!.prefix}${current}${parsed!.suffix}`);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          }

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [parsed]);

  return (
    <div className="text-center">
      <span
        ref={ref}
        className="block text-4xl sm:text-5xl md:text-6xl font-bold text-[#E42208] font-[family-name:var(--font-space-grotesk)] tracking-tight"
      >
        {displayValue}
      </span>
      <span className="mt-2 block text-sm sm:text-base text-[#999]">{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FAQ Accordion Item
   ───────────────────────────────────────────── */
function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#1a1a1a]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-[#E42208]"
      >
        <span className="text-base md:text-lg font-medium">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="flex-shrink-0 text-xl text-[#555]"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm md:text-base text-[#999] leading-relaxed max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Page Content (uses hooks, needs provider)
   ───────────────────────────────────────────── */
function PageContent() {
  const { locale, t, toggleLocale } = useLanguage();

  /* ── State ── */
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pricingRegion, setPricingRegion] = useState<"latam" | "international">("latam");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* ── Refs ── */
  const heroRef = useRef<HTMLDivElement>(null);

  /* ── Sync html lang attribute with locale ── */
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  /* ── Scroll listener for nav ── */
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── GSAP hero entrance timeline ── */
  useGSAP(
    () => {
      if (!heroRef.current) return;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".hero-tagline",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 }
      )
        .fromTo(
          ".hero-headline",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.3"
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.3"
        )
        .fromTo(
          ".hero-ctas",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.2"
        );
    },
    { scope: heroRef }
  );

  /* ── Close mobile menu on resize ── */
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: t.nav.services, id: "services" },
    { label: t.nav.process, id: "process" },
    { label: t.nav.pricing, id: "pricing" },
    { label: t.nav.faq, id: "faq" },
  ];

  const handleNavClick = useCallback((id: string) => {
    setMobileMenuOpen(false);
    scrollToSection(id);
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════
          SECTION 1 — Navigation
          ═══════════════════════════════════════ */}
      <nav
        className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 flex items-center gap-1 rounded-full border border-[#1a1a1a] bg-[#0a0a0a]/80 backdrop-blur-xl transition-all duration-500 ${
          scrolled ? "px-3 py-1.5" : "px-5 py-2.5"
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mr-2 flex-shrink-0"
          aria-label="Scroll to top"
        >
          <img
            src="/images/logo-dark.webp"
            alt="loopmind"
            className={`transition-all duration-500 ${scrolled ? "h-5" : "h-6"}`}
          />
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="rounded-full px-3 py-1.5 text-sm text-[#999] transition-colors hover:text-white hover:bg-white/5"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Language toggle */}
        <button
          onClick={toggleLocale}
          className="ml-1 rounded-full border border-[#1a1a1a] px-2.5 py-1 text-xs font-semibold text-[#999] transition-colors hover:text-white hover:border-[#333] font-[family-name:var(--font-space-grotesk)]"
        >
          {locale === "en" ? "ES" : "EN"}
        </button>

        {/* CTA button */}
        <a
          href="https://wa.me/51967326013?text=Hi%20Loopmind%2C%20I%27d%20like%20a%20free%20marketing%20audit"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 hidden md:block rounded-full bg-[#E42208] px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-[#C91E06]"
        >
          {t.nav.cta}
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="ml-2 flex md:hidden flex-col items-center justify-center gap-1 p-1"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="block h-[1.5px] w-5 bg-white"
          />
          <motion.span
            animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="block h-[1.5px] w-5 bg-white"
          />
          <motion.span
            animate={mobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="block h-[1.5px] w-5 bg-white"
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[#0a0a0a]/98 backdrop-blur-2xl"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: i * 0.08,
                }}
                onClick={() => handleNavClick(link.id)}
                className="text-3xl font-semibold text-white transition-colors hover:text-[#E42208]"
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: navLinks.length * 0.08,
              }}
              onClick={() => handleNavClick("cta")}
              className="mt-4 rounded-full bg-[#E42208] px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-[#C91E06]"
            >
              {t.nav.cta}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* ═══════════════════════════════════════
            SECTION 2 — Hero
            ═══════════════════════════════════════ */}
        <section
          ref={heroRef}
          className="relative min-h-dvh flex items-center overflow-hidden"
        >
          {/* Spline 3D background */}
          <iframe
            src="https://my.spline.design/studiolanding-TxHJKmJ9i2Az42IcAakVZmV7/"
            className="absolute inset-0 h-full w-full border-0"
            style={{ pointerEvents: "none" }}
            loading="eager"
            title="3D Background"
          />

          {/* Gradient overlays for text readability */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/50 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]/90" />

          {/* Floating particles */}
          <div className="pointer-events-none absolute inset-0 hidden md:block">
            {PARTICLES.map((p) => (
              <div
                key={p.id}
                className="absolute rounded-full bg-[#E42208]/20"
                style={{
                  left: p.left,
                  top: p.top,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  animationName: "float-particle",
                  animationDuration: `${p.duration}s`,
                  animationTimingFunction: "ease-in-out",
                  animationDelay: `${p.delay}s`,
                  animationIterationCount: "infinite",
                  animationDirection: "alternate",
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 pt-28 pb-20">
            {/* Tagline */}
            <p className="hero-tagline opacity-0 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#E42208] font-[family-name:var(--font-space-grotesk)]">
              {t.hero.tagline}
            </p>

            {/* Headline */}
            <h1 className="hero-headline opacity-0 mt-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]">
              {t.hero.headline}
              <br />
              <span className="text-[#E42208]">{t.hero.headlineAccent}</span>
            </h1>

            {/* Subheadline */}
            <p className="hero-sub opacity-0 mt-6 max-w-xl text-base sm:text-lg text-[#999] leading-relaxed">
              {t.hero.subheadline}
            </p>

            {/* CTAs */}
            <div className="hero-ctas opacity-0 mt-10 flex flex-wrap items-center gap-4">
              <GlowButton href="https://wa.me/51967326013?text=Hi%20Loopmind%2C%20I%27d%20like%20a%20free%20marketing%20audit">
                {t.hero.cta}
              </GlowButton>
              <button
                onClick={() => scrollToSection("process")}
                className="rounded-full border border-[#333] px-7 py-3.5 text-sm sm:text-base font-semibold text-white transition-all hover:border-[#555] hover:bg-white/5"
              >
                {t.hero.ctaSecondary}
              </button>
            </div>
          </div>

          {/* Bottom gradient fade */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </section>

        {/* ═══════════════════════════════════════
            SECTION 3 — Philosophy / TextRevealCard
            ═══════════════════════════════════════ */}
        <section className="relative py-24 sm:py-32">
          <div className="mx-auto max-w-4xl px-6 sm:px-8">
            <Reveal>
              <TextRevealCard
                text={t.philosophy.revealFront}
                revealText={t.philosophy.revealBack}
              >
                <TextRevealCardTitle>{t.philosophy.title}</TextRevealCardTitle>
                <TextRevealCardDescription>
                  {t.philosophy.description}
                </TextRevealCardDescription>
              </TextRevealCard>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 4 — Problem
            ═══════════════════════════════════════ */}
        <section className="relative py-24 sm:py-32 overflow-hidden">
          {/* AI-generated neural grid background */}
          <img
            src="/images/hero-bg.webp"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.07] mix-blend-lighten"
          />
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <Reveal>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#E42208] font-[family-name:var(--font-space-grotesk)]">
                {t.problem.label}
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                {t.problem.headline}
              </h2>
            </Reveal>

            {/* Offset grid — NOT equal 3-column */}
            <StaggerContainer
              className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-5"
              staggerDelay={0.15}
            >
              {/* Card 1 — spans 5 cols, starts at col 1 */}
              <StaggerItem className="md:col-span-5">
                <div className="group h-full rounded-2xl border border-[#1a1a1a] bg-[#141414] p-6 sm:p-8 transition-all hover:-translate-y-1 hover:border-[#E42208]/20">
                  <div className="h-1 w-12 rounded-full bg-[#E42208] mb-5" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">
                    {t.problem.points[0].title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#999] leading-relaxed">
                    {t.problem.points[0].description}
                  </p>
                </div>
              </StaggerItem>

              {/* Card 2 — spans 7 cols */}
              <StaggerItem className="md:col-span-7">
                <div className="group h-full rounded-2xl border border-[#1a1a1a] bg-[#141414] p-6 sm:p-8 transition-all hover:-translate-y-1 hover:border-[#E42208]/20">
                  <div className="h-1 w-12 rounded-full bg-[#E42208] mb-5" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">
                    {t.problem.points[1].title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#999] leading-relaxed">
                    {t.problem.points[1].description}
                  </p>
                </div>
              </StaggerItem>

              {/* Card 3 — spans 6 cols, offset right */}
              <StaggerItem className="md:col-span-6 md:col-start-4">
                <div className="group h-full rounded-2xl border border-[#1a1a1a] bg-[#141414] p-6 sm:p-8 transition-all hover:-translate-y-1 hover:border-[#E42208]/20">
                  <div className="h-1 w-12 rounded-full bg-[#E42208] mb-5" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">
                    {t.problem.points[2].title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#999] leading-relaxed">
                    {t.problem.points[2].description}
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* Gradient divider */}
          <div className="mx-auto mt-24 max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="h-px bg-gradient-to-r from-transparent via-[#E42208]/30 to-transparent" />
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 5 — Services (Bento Grid)
            ═══════════════════════════════════════ */}
        <section id="services" className="relative py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <Reveal>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#E42208] font-[family-name:var(--font-space-grotesk)]">
                {t.services.label}
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                {t.services.headline}
              </h2>
            </Reveal>

            <StaggerContainer
              className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4"
              staggerDelay={0.1}
            >
              {t.services.items.map((service, i) => {
                const Icon = SERVICE_ICONS[i];
                // Bento layout: card 0 (Social) spans 2 cols, card 5 (Web Dev) spans 2 cols
                // Row 1: [Social Media ——— 2 cols ———] [SEO & Content]
                // Row 2: [Paid Ads] [Email Marketing] [AI Automation]
                // Row 3: [Web Dev ——— 2 cols ———]
                // Row 1: [Social Media — 2 cols] [SEO — 1 col]
                // Row 2: [Paid Ads] [Email] [AI Automation]
                // Row 3: [Web Dev — full 3 cols, shorter height]
                const spanClass =
                  i === 0
                    ? "md:col-span-2"
                    : i === 5
                      ? "md:col-span-3"
                      : "md:col-span-1";

                return (
                  <StaggerItem key={i} className={spanClass}>
                    <div
                      className={`group relative h-full rounded-2xl border border-[#1a1a1a] bg-[#141414] p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#E42208]/40 hover:shadow-[0_0_40px_rgba(228,34,8,0.08)] ${
                        i === 0 ? "flex flex-col justify-between" : ""
                      }`}
                    >
                      {/* Red border glow on hover — top and bottom gradient lines */}
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-[#E42208]/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px rounded-b-2xl bg-gradient-to-r from-transparent via-[#E42208]/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#E42208]/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[#E42208]/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div>
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#1a1a1a] text-[#E42208] transition-colors group-hover:bg-[#E42208]/10">
                          <Icon />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">
                          {service.title}
                        </h3>
                        <p className="text-sm text-[#999] leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                      {i === 0 && (
                        <div className="mt-6 h-px w-full bg-gradient-to-r from-[#E42208]/20 to-transparent" />
                      )}
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 6 — Process (Horizontal Steps)
            ═══════════════════════════════════════ */}
        <section id="process" className="relative py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <Reveal>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#E42208] font-[family-name:var(--font-space-grotesk)]">
                {t.process.label}
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                {t.process.headline}
              </h2>
            </Reveal>

            <StaggerContainer
              className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0"
              staggerDelay={0.15}
            >
              {t.process.steps.map((step, i) => (
                <StaggerItem key={i} className="relative">
                  {/* Connecting line (desktop only, not on last item) */}
                  {i < t.process.steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[calc(50%+24px)] right-0 h-px bg-gradient-to-r from-[#E42208]/40 via-[#E42208]/20 to-transparent" />
                  )}

                  <div className="relative flex flex-col items-start lg:items-center text-left lg:text-center px-0 lg:px-4">
                    {/* Number */}
                    <span className="text-5xl md:text-6xl font-bold text-[#E42208]/20 font-[family-name:var(--font-space-grotesk)] leading-none">
                      {step.number}
                    </span>
                    <h3 className="mt-3 text-lg sm:text-xl font-semibold">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#999] leading-relaxed max-w-xs">
                      {step.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 7 — Stats (Counter Animation)
            ═══════════════════════════════════════ */}
        <section className="relative py-24 sm:py-32 overflow-hidden">
          {/* Dark-red-tint gradient background */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #0a0a0a 0%, #120505 30%, #120505 70%, #0a0a0a 100%)",
            }}
          />
          {/* Tech network image overlay */}
          <img
            src="/images/tech-network.jpg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10 mix-blend-lighten"
          />

          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <Reveal>
              <div className="text-center">
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#E42208] font-[family-name:var(--font-space-grotesk)]">
                  {t.stats.label}
                </p>
                <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                  {t.stats.headline}
                </h2>
              </div>
            </Reveal>

            <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {t.stats.items.map((stat, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <AnimatedCounter value={stat.value} label={stat.label} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 8 — Pricing
            ═══════════════════════════════════════ */}
        <section id="pricing" className="relative py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <Reveal>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#E42208] font-[family-name:var(--font-space-grotesk)]">
                {t.pricing.label}
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                {t.pricing.headline}
              </h2>
            </Reveal>

            {/* Region toggle */}
            <Reveal delay={0.15}>
              <div className="mt-10 flex items-center justify-start gap-1 rounded-full bg-[#141414] border border-[#1a1a1a] p-1 w-fit">
                <button
                  onClick={() => setPricingRegion("latam")}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                    pricingRegion === "latam"
                      ? "bg-[#E42208] text-white"
                      : "text-[#999] hover:text-white"
                  }`}
                >
                  {t.pricing.toggle.latam}
                </button>
                <button
                  onClick={() => setPricingRegion("international")}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                    pricingRegion === "international"
                      ? "bg-[#E42208] text-white"
                      : "text-[#999] hover:text-white"
                  }`}
                >
                  {t.pricing.toggle.international}
                </button>
              </div>
            </Reveal>

            {/* Pricing cards */}
            <StaggerContainer
              className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6"
              staggerDelay={0.12}
            >
              {t.pricing.tiers.map((tier, i) => (
                <StaggerItem key={i}>
                  <div
                    className={`relative flex h-full flex-col rounded-2xl border p-6 sm:p-8 transition-all ${
                      tier.featured
                        ? "border-[#E42208]/50 bg-[#141414] shadow-[0_0_60px_rgba(228,34,8,0.08)] scale-[1.02]"
                        : "border-[#1a1a1a] bg-[#141414] hover:border-[#333]"
                    }`}
                  >
                    {/* Popular badge */}
                    {tier.featured && (
                      <div className="absolute -top-3 left-6 rounded-full bg-[#E42208] px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                        {locale === "en" ? "POPULAR" : "POPULAR"}
                      </div>
                    )}

                    <h3 className="text-xl sm:text-2xl font-bold">{tier.name}</h3>
                    <p className="mt-1 text-sm text-[#999]">{tier.description}</p>

                    {/* Price with animated transition */}
                    <div className="mt-6 mb-6">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={pricingRegion}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          className="flex items-baseline gap-1"
                        >
                          <span className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] tracking-tight">
                            {pricingRegion === "latam"
                              ? tier.priceLatam
                              : tier.priceInternational}
                          </span>
                          <span className="text-sm text-[#999]">{tier.period}</span>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Features */}
                    <ul className="flex-1 space-y-3 mb-8">
                      {tier.features.map((feature, fi) => (
                        <li
                          key={fi}
                          className="flex items-start gap-3 text-sm text-[#999]"
                        >
                          <svg
                            className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#E42208]"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M13.5 4.5L6.5 11.5L2.5 7.5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <a
                      href={`https://wa.me/51967326013?text=${encodeURIComponent(`Hi Loopmind, I'm interested in the ${tier.name} plan`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full rounded-full py-3 text-sm font-semibold text-center transition-all ${
                        tier.featured
                          ? "bg-[#E42208] text-white hover:bg-[#C91E06] hover:shadow-[0_0_30px_rgba(228,34,8,0.25)]"
                          : "border border-[#333] text-white hover:border-[#555] hover:bg-white/5"
                      }`}
                    >
                      {tier.cta}
                    </a>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 9 — FAQ
            ═══════════════════════════════════════ */}
        <section id="faq" className="relative py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-6 sm:px-8">
            <Reveal>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#E42208] font-[family-name:var(--font-space-grotesk)]">
                {t.faq.label}
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                {t.faq.headline}
              </h2>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-12 divide-y divide-[#1a1a1a] border-t border-[#1a1a1a]">
                {t.faq.items.map((item, i) => (
                  <FAQItem
                    key={i}
                    question={item.q}
                    answer={item.a}
                    isOpen={openFaq === i}
                    onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 10 — Final CTA
            ═══════════════════════════════════════ */}
        <section
          id="cta"
          className="relative py-32 sm:py-40 overflow-hidden"
        >
          {/* Video background (red particles) */}
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero-bg.webp"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>

          {/* Red glow radial gradient overlay */}
          <Parallax speed={0.3} className="absolute inset-0">
            <div
              className="h-full w-full"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(228,34,8,0.12) 0%, rgba(64,1,1,0.06) 40%, #0a0a0a 70%)",
              }}
            />
          </Parallax>

          <div className="relative z-10 mx-auto max-w-3xl px-6 sm:px-8 text-center">
            <Reveal>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                {t.cta.headline}
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 text-base sm:text-lg text-[#999] leading-relaxed max-w-2xl mx-auto">
                {t.cta.subheadline}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10">
                <GlowButton href="https://wa.me/51967326013?text=Hi%20Loopmind%2C%20I%27d%20like%20to%20book%20a%20free%20strategy%20call">
                  {t.cta.button}
                </GlowButton>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <p className="mt-5 text-sm text-[#555]">{t.cta.note}</p>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════
          SECTION 11 — Footer
          ═══════════════════════════════════════ */}
      <footer className="relative pb-10 pt-0">
        {/* Gradient divider at top */}
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="h-px bg-gradient-to-r from-transparent via-[#E42208]/30 to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
            {/* Logo + tagline */}
            <div className="md:col-span-4">
              <img
                src="/images/logo-dark.webp"
                alt="loopmind"
                className="h-6"
              />
              <p className="mt-4 text-sm text-[#555] max-w-xs">
                {t.footer.tagline}
              </p>
            </div>

            {/* Services column */}
            <div className="md:col-span-3">
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#555] mb-4">
                {t.footer.services}
              </h4>
              <ul className="space-y-2.5">
                {[
                  t.footer.links.social,
                  t.footer.links.seo,
                  t.footer.links.ads,
                  t.footer.links.email,
                  t.footer.links.ai,
                  t.footer.links.web,
                ].map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => scrollToSection("services")}
                      className="text-sm text-[#999] transition-colors hover:text-white"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company column */}
            <div className="md:col-span-3">
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#555] mb-4">
                {t.footer.company}
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: t.footer.links.about, id: "" },
                  { label: t.footer.links.process, id: "process" },
                  { label: t.footer.links.pricing, id: "pricing" },
                  { label: t.footer.links.contact, id: "cta" },
                ].map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => link.id && scrollToSection(link.id)}
                      className="text-sm text-[#999] transition-colors hover:text-white"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="md:col-span-2">
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#555] mb-4">
                {t.footer.contact}
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:loopmindagency@gmail.com"
                    className="flex items-center gap-2 text-sm text-[#999] transition-colors hover:text-white"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <polyline points="22,4 12,13 2,4" />
                    </svg>
                    loopmindagency@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/51967326013"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[#999] transition-colors hover:text-white"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                    +51 967 326 013
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom line */}
          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-[#1a1a1a] pt-6">
            <p className="text-xs text-[#555]">
              &copy; {new Date().getFullYear()} {t.footer.copyright}
            </p>
            <p className="text-xs text-[#555] font-[family-name:var(--font-space-grotesk)]">
              {t.footer.builtWith}
            </p>
          </div>
        </div>
      </footer>

    </>
  );
}

/* ─────────────────────────────────────────────
   Root Export — wraps content with LanguageProvider
   ───────────────────────────────────────────── */
export default function Home() {
  return (
    <LanguageProvider>
      <PageContent />
    </LanguageProvider>
  );
}
