import type { Metadata } from "next";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { pricingData } from "@/lib/pricing-data";

export const metadata: Metadata = {
  title: "Cenník",
  description: "Cenník masážnych služieb - Tomáš Kancír, mobilný masér.",
};

export default function PricingPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <ScrollReveal>
        <h1 className="text-3xl md:text-4xl font-bold text-heading text-center mb-12">
          Cenník
        </h1>
      </ScrollReveal>

      <div className="space-y-6">
        {pricingData.map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-accent/20 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <h2 className="text-xl md:text-2xl font-bold text-heading mb-4">
                {item.type}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {item.durations.map((d, j) => (
                  <div
                    key={j}
                    className="flex items-center justify-between sm:flex-col sm:items-center bg-accent/20 rounded-xl px-4 py-3"
                  >
                    <span className="text-heading/70 font-medium">
                      {d.minutes} min
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      {d.price}€
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
