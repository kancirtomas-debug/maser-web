import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Tomáš Kancír - Mobilný masér",
    template: "%s | Tomáš Kancír - Mobilný masér",
  },
  description:
    "Profesionálne masážne služby v pohodlí vášho domova. Klasická masáž, športová masáž a banková terapia v Prešove a okolí.",
  keywords: [
    "masér",
    "masáž",
    "mobilný masér",
    "banková terapia",
    "športová masáž",
    "Tomáš Kancír",
    "Prešov",
  ],
  openGraph: {
    type: "website",
    locale: "sk_SK",
    siteName: "Tomáš Kancír - Mobilný masér",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className={inter.variable}>
      <body className="font-sans antialiased bg-cream text-heading min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
