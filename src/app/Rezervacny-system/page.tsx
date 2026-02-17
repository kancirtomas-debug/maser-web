"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { reservationMassageTypes } from "@/lib/massage-data";

export default function ReservationSystemPage() {
  const router = useRouter();

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <ScrollReveal>
        <h1 className="text-3xl md:text-4xl font-bold text-heading text-center mb-4">
          Rezervačný systém
        </h1>
        <p className="text-center text-hover mb-12">
          Vyberte si typ masáže a rezervujte si termín.
        </p>
      </ScrollReveal>

      <div className="space-y-6">
        {reservationMassageTypes.map((massage, i) => (
          <ScrollReveal key={massage.id} delay={i * 0.15}>
            <motion.div
              whileHover={{
                y: -4,
                boxShadow: "0 12px 40px rgba(69,9,32,0.15)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                router.push(
                  `/Rezervacny-kalendar?type=${massage.id}`
                )
              }
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-accent/20 cursor-pointer hover:border-primary/30 transition-colors duration-300"
            >
              <h2 className="text-2xl font-bold text-heading mb-2">
                {massage.title}
              </h2>
              <p className="text-primary font-semibold text-sm mb-4">
                {massage.prices}
              </p>
              <p className="text-heading/70 leading-relaxed">
                {massage.description}
              </p>
              <div className="mt-4 flex items-center text-primary font-medium text-sm">
                <span>Vybrať termín</span>
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
