import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import HowItWorks from "@/components/home/HowItWorks";
import ReviewCarousel from "@/components/shared/ReviewCarousel";
import ContactSection from "@/components/shared/ContactSection";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <HowItWorks />

      {/* Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-heading">
              Čo hovoria naši klienti
            </h2>
            <p className="mt-3 text-lg text-hover">
              Prečítajte si skúsenosti spokojných klientov.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <ReviewCarousel />
        </ScrollReveal>
      </section>

      {/* Contact Section */}
      <section className="bg-white/30 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-heading">
                Kontaktujte ma
              </h2>
              <p className="mt-3 text-lg text-hover">
                Napíšte mi a spoločne nájdeme vhodný termín.
              </p>
            </div>
          </ScrollReveal>
          <ContactSection />
        </div>
      </section>
    </>
  );
}
