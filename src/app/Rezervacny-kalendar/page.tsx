"use client";

import { useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CalendarView from "@/components/calendar/CalendarView";
import TimeSlotPicker from "@/components/calendar/TimeSlotPicker";
import BookingConfirmation from "@/components/calendar/BookingConfirmation";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { TimeSlot } from "@/types";

function CalendarContent() {
  const searchParams = useSearchParams();
  const massageType = searchParams.get("type") || "klasicka";

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [showBooking, setShowBooking] = useState(false);

  const fetchSlots = useCallback(async (date: string) => {
    setLoadingSlots(true);
    setSelectedSlot(null);
    setShowBooking(false);
    try {
      const response = await fetch(`/api/calendar/slots?date=${date}`);
      const data = await response.json();
      setSlots(data.slots || []);
    } catch {
      setSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    fetchSlots(date);
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setShowBooking(true);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <ScrollReveal>
        <h1 className="text-3xl md:text-4xl font-bold text-heading text-center mb-4">
          Kalendár
        </h1>
        <p className="text-center text-hover mb-12">
          Vyberte si dátum a čas pre vašu masáž.
        </p>
      </ScrollReveal>

      {!showBooking ? (
        <div className="space-y-8">
          <ScrollReveal>
            <CalendarView
              onDateSelect={handleDateSelect}
              selectedDate={selectedDate}
            />
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <TimeSlotPicker
              slots={slots}
              loading={loadingSlots}
              selectedSlot={selectedSlot}
              onSlotSelect={handleSlotSelect}
            />
          </ScrollReveal>
        </div>
      ) : selectedSlot ? (
        <BookingConfirmation
          slot={selectedSlot}
          massageType={massageType}
          onBack={() => setShowBooking(false)}
        />
      ) : null}
    </section>
  );
}

export default function ReservationCalendarPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      }
    >
      <CalendarContent />
    </Suspense>
  );
}
