import type { Metadata } from "next";
import ScrollReveal from "@/components/shared/ScrollReveal";
import Button from "@/components/shared/Button";
import { massageTypes } from "@/lib/massage-data";

export const metadata: Metadata = {
  title: "Výber masáže",
  description: "Vyberte si typ masáže - klasická, športová alebo mäkké techniky.",
};

export default function MassageSelectionPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <ScrollReveal>
        <h1 className="text-3xl md:text-4xl font-bold text-heading text-center mb-12">
          Vyberte si masáž
        </h1>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
        {massageTypes.map((massage, i) => (
          <ScrollReveal key={massage.id} delay={i * 0.15}>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-accent/20 hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
              <h2 className="text-xl font-bold text-heading mb-3">
                {massage.title}
              </h2>
              <p className="text-heading/70 leading-relaxed flex-1">
                {massage.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <div className="text-center">
          <Button href="/Cennik">Pozrieť cenník</Button>
        </div>
      </ScrollReveal>
    </section>
  );
}
