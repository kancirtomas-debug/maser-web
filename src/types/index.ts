export interface Review {
  id: number;
  name: string;
  text: string;
  date: string;
}

export interface PricingItem {
  type: string;
  durations: { minutes: number; price: number }[];
}

export interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

export interface MassageType {
  id: string;
  title: string;
  description: string;
  prices?: string;
}

export interface ContactFormData {
  meno: string;
  priezvisko: string;
  adresa: string;
  email: string;
  telefon: string;
  zdravotnyStav: string;
}

export interface BookingFormData {
  meno: string;
  priezvisko: string;
  adresa: string;
  telefon: string;
  zdravotnyStav: string;
}

export interface StatItem {
  value: string;
  label: string;
  numericValue: number;
  suffix: string;
  prefix: string;
}
