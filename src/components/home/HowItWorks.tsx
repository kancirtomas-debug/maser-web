"use client";

import ScrollReveal from "@/components/shared/ScrollReveal";

const steps = [
  {
    number: "1",
    title: "Výber masáže",
    description: "Výber masáže cez rezervačný systém.",
    icon: (
      <svg
        className="w-10 h-10 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Zdravotný stav",
    description:
      "Opis vášho zdravotného stavu (dôležité pre personalizáciu masáže).",
    icon: (
      <svg
        className="w-10 h-10 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Relaxácia",
    description: "Môj príchod a čas na váš oddych.",
    icon: (
      <svg
        className="w-10 h-10 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-heading">
            Ako si dopriať masáž v pohodlí vášho domova
          </h2>
          <p className="mt-3 text-lg text-hover">
            V troch jednoduchých krokoch.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <ScrollReveal key={i} delay={i * 0.15}>
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 text-center border border-accent/20 hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-full">
              <div className="w-16 h-16 bg-accent/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
                {step.icon}
              </div>
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-heading mb-3">
                {step.title}
              </h3>
              <p className="text-heading/70 leading-relaxed">
                {step.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
