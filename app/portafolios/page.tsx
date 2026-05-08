"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Tier } from "@/lib/portafolios/types";
import { TIER_CONFIGS } from "@/lib/portafolios/configs";
import { TIER_PRICES_USD } from "@/lib/portafolios/constants";
import { PaymentAccounts } from "@/components/portafolios/payment-accounts";

const tiers: Tier[] = ["starter", "plus", "pro", "premium"];

const steps = [
  {
    number: "01",
    title: "Elige tu plan",
    description: "Selecciona el plan que mejor se adapte a tus necesidades y presupuesto.",
  },
  {
    number: "02",
    title: "Sube tu CV y foto",
    description: "Nosotros extraemos toda tu informacion automaticamente con IA.",
  },
  {
    number: "03",
    title: "Realiza tu pago",
    description: "Paga por Yape, transferencia bancaria o PayPal. Rapido y seguro.",
  },
  {
    number: "04",
    title: "Recibe tu portafolio",
    description: "Te entregamos tu portafolio profesional listo para impresionar.",
  },
];

const faqs = [
  { q: "¿Cuanto tiempo toma recibir mi portafolio?", a: "Depende del plan: Starter 2-3 dias, Plus 3-4 dias, Pro 3-5 dias, Premium 5-7 dias habiles." },
  { q: "¿Que necesito para empezar?", a: "Solo tu CV (PDF o Word), una foto profesional, y el comprobante de pago. Nosotros hacemos todo lo demas." },
  { q: "¿Puedo hacer cambios despues?", a: "Si. Todos los planes incluyen 1 ronda de revisiones. El plan Premium incluye revisiones ilimitadas por 30 dias." },
  { q: "¿El dominio esta incluido?", a: "Pro incluye dominio .lat gratis por 1 ano. Premium incluye dominio .com gratis por 1 ano." },
  { q: "¿Que pasa con el hosting?", a: "Tu portafolio se aloja en GitHub Pages (gratuito, rapido, sin limites). No pagas nada adicional por hosting." },
  { q: "¿Puedo pagar en cuotas?", a: "Los planes Starter y Plus son pago unico. Pro y Premium aceptan 2 cuotas (50% al inicio, 50% al recibir)." },
];

/** Custom hook that uses a raw IntersectionObserver (works with Lenis) */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transitionDelay: `${delay * 1000}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function PortafoliosPage() {
  return (
    <div className="space-y-0">
      {/* Hero */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-4 text-center overflow-hidden">
        {/* Gradient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/8 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10"
        >
          <span className="inline-block mb-4 text-xs font-medium tracking-widest text-accent uppercase">
            Portafolios Profesionales
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-[1.1] tracking-tight">
            Tu portafolio profesional,
            <br />
            <span className="text-accent">listo en dias</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative z-10 mt-5 text-base md:text-lg text-text-secondary max-w-lg"
        >
          Sube tu CV y nosotros hacemos el resto. Diseno profesional, hosting
          gratuito, dominio incluido.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 flex flex-col sm:flex-row gap-3 mt-8"
        >
          <Link
            href="#planes"
            className="group relative rounded-lg bg-accent px-7 py-3.5 text-sm font-medium text-white overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(228,34,8,0.3)]"
          >
            <span className="relative z-10">Ver planes y precios</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-deep opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <a
            href="https://wa.me/51967326013?text=Hola!%20Me%20interesa%20un%20portafolio%20profesional"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-text-secondary/20 px-7 py-3.5 text-sm font-medium text-text-primary hover:border-text-secondary/40 hover:bg-surface-elevated/50 transition-all"
          >
            Consultar por WhatsApp
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-text-secondary/20 flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-1.5 rounded-full bg-text-secondary" />
          </motion.div>
        </motion.div>
      </section>

      <div className="mx-auto max-w-5xl px-4 space-y-24 pb-20">
        {/* How it works */}
        <section>
          <FadeIn className="text-center mb-12">
            <span className="text-xs font-medium tracking-widest text-accent uppercase">Proceso</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mt-2">¿Como funciona?</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <FadeIn key={step.number} delay={i * 0.1}>
                <div className="relative group rounded-xl border border-zinc-800 bg-surface-elevated/30 p-6 text-center space-y-3 hover:border-text-secondary/20 transition-colors h-full">
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-zinc-800" />
                  )}
                  <div className="mx-auto w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/15 transition-colors">
                    <span className="text-lg font-bold font-[family-name:var(--font-space-grotesk)]">{step.number}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary">{step.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="planes" className="scroll-mt-20">
          <FadeIn className="text-center mb-12">
            <span className="text-xs font-medium tracking-widest text-accent uppercase">Precios</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mt-2">Planes y precios</h2>
            <p className="text-sm text-text-secondary mt-2">Pago unico. Sin suscripciones. Sin costos ocultos.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tiers.map((tier, i) => {
              const config = TIER_CONFIGS[tier];
              const isPro = tier === "pro";

              return (
                <FadeIn key={tier} delay={i * 0.08}>
                  <div
                    className={`relative rounded-xl border p-5 space-y-4 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                      isPro
                        ? "pf-card-pro shadow-[0_0_40px_rgba(228,34,8,0.08)]"
                        : "pf-card"
                    }`}
                  >
                    {isPro && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-accent text-white px-3 py-1 rounded-full">
                        MAS POPULAR
                      </span>
                    )}
                    <div>
                      <h3 className="text-base font-semibold text-text-primary">{config.name}</h3>
                      <p className="text-2xl font-bold text-text-primary font-[family-name:var(--font-space-grotesk)] mt-1">{config.price}</p>
                      <p className="text-xs text-text-secondary font-[family-name:var(--font-space-grotesk)]">{TIER_PRICES_USD[tier]}</p>
                    </div>
                    <ul className="space-y-2 flex-1">
                      {config.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-xs text-text-secondary">
                          <svg className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-2">
                      <p className="text-[10px] text-text-secondary mb-2">Entrega: {config.deliveryTime}</p>
                      <Link
                        href={`/portafolios/${tier}`}
                        className={`block w-full text-center rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                          isPro
                            ? "bg-accent text-white hover:bg-accent/90 hover:shadow-[0_0_20px_rgba(228,34,8,0.3)]"
                            : "border border-text-secondary/20 text-text-primary hover:border-text-secondary/40 hover:bg-surface-elevated/50"
                        }`}
                      >
                        Comenzar
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </section>

        {/* Payment methods */}
        <section>
          <FadeIn className="text-center mb-8">
            <span className="text-xs font-medium tracking-widest text-accent uppercase">Pagos</span>
            <h2 className="text-xl font-bold text-text-primary mt-2">Metodos de pago</h2>
            <p className="text-sm text-text-secondary mt-1">Elige el metodo que prefieras. Todos los pagos son en Soles (S/).</p>
          </FadeIn>
          <FadeIn delay={0.1} className="max-w-2xl mx-auto">
            <PaymentAccounts />
          </FadeIn>
        </section>

        {/* FAQ */}
        <section>
          <FadeIn className="text-center mb-10">
            <span className="text-xs font-medium tracking-widest text-accent uppercase">FAQ</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mt-2">Preguntas frecuentes</h2>
          </FadeIn>
          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <details className="group rounded-lg border pf-card transition-colors">
                  <summary className="cursor-pointer px-5 py-4 text-sm font-medium text-text-primary list-none flex items-center justify-between">
                    {faq.q}
                    <svg className="h-4 w-4 text-text-secondary shrink-0 group-open:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="px-5 pb-4 text-sm text-text-secondary leading-relaxed">{faq.a}</p>
                </details>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative">
          <div className="absolute inset-0 -mx-4 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-accent-deep/5 pointer-events-none" />
          <FadeIn className="relative text-center space-y-5 py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary">¿Listo para destacar?</h2>
            <p className="text-sm text-text-secondary max-w-md mx-auto">Empieza hoy y recibe tu portafolio profesional en dias. Sin complicaciones.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link
                href="/portafolios/pro"
                className="group relative rounded-lg bg-accent px-7 py-3.5 text-sm font-medium text-white overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(228,34,8,0.3)]"
              >
                <span className="relative z-10">Empezar con Pro (S/ 349)</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-deep opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <a
                href="https://wa.me/51967326013?text=Hola!%20Me%20interesa%20un%20portafolio%20profesional"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-text-secondary/20 px-7 py-3.5 text-sm font-medium text-text-primary hover:border-text-secondary/40 hover:bg-surface-elevated/50 transition-all"
              >
                Consultar por WhatsApp
              </a>
            </div>
          </FadeIn>
        </section>
      </div>
    </div>
  );
}
