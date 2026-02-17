"use client";

import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import Button from "./Button";
import ScrollReveal from "./ScrollReveal";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    meno: "",
    priezvisko: "",
    adresa: "",
    email: "",
    telefon: "",
    zdravotnyStav: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const allFieldsFilled = Object.values(formData).every(
    (v) => v.trim() !== ""
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!allFieldsFilled) return;
    setStatus("sending");

    const submission = new FormData();
    submission.append(
      "access_key",
      process.env.NEXT_PUBLIC_WEB3FORMS_KEY || ""
    );
    submission.append(
      "subject",
      "Nová správa z webu - Masér Tomáš Kancír"
    );
    submission.append(
      "from_name",
      `${formData.meno} ${formData.priezvisko}`
    );
    submission.append("botcheck", "");

    Object.entries(formData).forEach(([key, value]) => {
      submission.append(key, value);
    });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submission,
      });
      const data = await response.json();
      if (data.success) {
        setStatus("success");
        setFormData({
          meno: "",
          priezvisko: "",
          adresa: "",
          email: "",
          telefon: "",
          zdravotnyStav: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Form */}
      <ScrollReveal direction="left">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="botcheck" style={{ display: "none" }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="meno"
                className="block text-sm font-medium text-heading mb-1"
              >
                Meno
              </label>
              <input
                type="text"
                id="meno"
                name="meno"
                value={formData.meno}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-accent/40 bg-white/60 text-heading placeholder-heading/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="priezvisko"
                className="block text-sm font-medium text-heading mb-1"
              >
                Priezvisko
              </label>
              <input
                type="text"
                id="priezvisko"
                name="priezvisko"
                value={formData.priezvisko}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-accent/40 bg-white/60 text-heading placeholder-heading/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="adresa"
              className="block text-sm font-medium text-heading mb-1"
            >
              Adresa
            </label>
            <input
              type="text"
              id="adresa"
              name="adresa"
              value={formData.adresa}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-accent/40 bg-white/60 text-heading placeholder-heading/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-heading mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-accent/40 bg-white/60 text-heading placeholder-heading/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="telefon"
                className="block text-sm font-medium text-heading mb-1"
              >
                Tel. číslo
              </label>
              <input
                type="tel"
                id="telefon"
                name="telefon"
                value={formData.telefon}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-accent/40 bg-white/60 text-heading placeholder-heading/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="zdravotnyStav"
              className="block text-sm font-medium text-heading mb-1"
            >
              Zdravotný stav
            </label>
            <textarea
              id="zdravotnyStav"
              name="zdravotnyStav"
              value={formData.zdravotnyStav}
              onChange={handleChange}
              required
              rows={4}
              placeholder="(Uveďte prosím dlhodobé diagnózy, ochorenia napr. problémy s tlakom (nízky/vysoký), aby bola masáž prispôsobená vám. Príklad: Zápal pľúc 22.4.2022…)"
              className="w-full px-4 py-3 rounded-xl border border-accent/40 bg-white/60 text-heading placeholder-heading/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={!allFieldsFilled || status === "sending"}
          >
            {status === "sending" ? "Odosiela sa..." : "Odoslať správu"}
          </Button>

          {status === "success" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-700 font-medium mt-2"
            >
              Správa bola úspešne odoslaná! Ozvem sa vám čo najskôr.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 font-medium mt-2"
            >
              Nastala chyba. Skúste to prosím znova alebo ma kontaktujte
              priamo.
            </motion.p>
          )}
        </form>
      </ScrollReveal>

      {/* Contact Info */}
      <ScrollReveal direction="right">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-heading">
            Kontaktné údaje
          </h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-primary mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <div>
                <p className="font-medium text-heading">Telefón</p>
                <a
                  href="tel:+421908109204"
                  className="text-hover hover:text-primary transition-colors duration-200"
                >
                  0908 109 204
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-primary mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <div>
                <p className="font-medium text-heading">Email</p>
                <a
                  href="mailto:kancir.tomas@gmail.com"
                  className="text-hover hover:text-primary transition-colors duration-200"
                >
                  kancir.tomas@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-primary mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div>
                <p className="font-medium text-heading">Lokalita</p>
                <p className="text-hover">Prešov a okolie</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
