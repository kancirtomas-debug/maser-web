"use client";

import { motion } from "motion/react";
import { TimeSlot } from "@/types";

interface TimeSlotPickerProps {
  slots: TimeSlot[];
  loading: boolean;
  selectedSlot: TimeSlot | null;
  onSlotSelect: (slot: TimeSlot) => void;
}

function formatTime(isoString: string): string {
  const timePart = isoString.split("T")[1];
  return timePart ? timePart.substring(0, 5) : "";
}

export default function TimeSlotPicker({
  slots,
  loading,
  selectedSlot,
  onSlotSelect,
}: TimeSlotPickerProps) {
  if (loading) {
    return (
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-accent/20">
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="ml-3 text-heading/60">Načítavam dostupné termíny...</span>
        </div>
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-accent/20">
        <p className="text-center text-heading/60 py-4">
          Vyberte dátum v kalendári pre zobrazenie dostupných termínov.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-accent/20">
      <h3 className="text-lg font-bold text-heading mb-4">
        Dostupné termíny
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {slots.map((slot, i) => {
          const isSelected =
            selectedSlot?.start === slot.start;
          return (
            <motion.button
              key={i}
              whileHover={slot.available ? { scale: 1.05 } : {}}
              whileTap={slot.available ? { scale: 0.95 } : {}}
              onClick={() => slot.available && onSlotSelect(slot)}
              disabled={!slot.available}
              className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                isSelected
                  ? "bg-primary text-white shadow-md"
                  : slot.available
                  ? "bg-accent/20 text-heading hover:bg-accent/40 cursor-pointer"
                  : "bg-gray-100 text-heading/20 cursor-not-allowed line-through"
              }`}
            >
              {formatTime(slot.start)} - {formatTime(slot.end)}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
