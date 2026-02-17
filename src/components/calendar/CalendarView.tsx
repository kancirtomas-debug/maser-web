"use client";

import { useState } from "react";
import { motion } from "motion/react";

interface CalendarViewProps {
  onDateSelect: (date: string) => void;
  selectedDate: string | null;
}

const DAYS = ["Po", "Ut", "St", "Št", "Pi", "So", "Ne"];
const MONTHS = [
  "Január",
  "Február",
  "Marec",
  "Apríl",
  "Máj",
  "Jún",
  "Júl",
  "August",
  "September",
  "Október",
  "November",
  "December",
];

export default function CalendarView({
  onDateSelect,
  selectedDate,
}: CalendarViewProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  // Monday = 0, Sunday = 6
  let startDay = firstDayOfMonth.getDay() - 1;
  if (startDay < 0) startDay = 6;

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const isPast = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    return date < todayStart;
  };

  const formatDate = (day: number) => {
    const m = (currentMonth + 1).toString().padStart(2, "0");
    const d = day.toString().padStart(2, "0");
    return `${currentYear}-${m}-${d}`;
  };

  const canGoPrev =
    currentYear > today.getFullYear() ||
    (currentYear === today.getFullYear() && currentMonth > today.getMonth());

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-accent/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Predchádzajúci mesiac"
        >
          <svg
            className="w-5 h-5 text-heading"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h3 className="text-xl font-bold text-heading">
          {MONTHS[currentMonth]} {currentYear}
        </h3>
        <button
          onClick={nextMonth}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent/30 transition-colors"
          aria-label="Ďalší mesiac"
        >
          <svg
            className="w-5 h-5 text-heading"
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
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-hover py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells before first day */}
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={`empty-${i}`} className="p-2" />
        ))}

        {/* Day cells */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = formatDate(day);
          const past = isPast(day);
          const todayDate = isToday(day);
          const selected = selectedDate === dateStr;

          return (
            <motion.button
              key={day}
              whileHover={past ? {} : { scale: 1.1 }}
              whileTap={past ? {} : { scale: 0.95 }}
              onClick={() => !past && onDateSelect(dateStr)}
              disabled={past}
              className={`p-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                selected
                  ? "bg-primary text-white shadow-md"
                  : todayDate
                  ? "bg-accent/40 text-heading font-bold"
                  : past
                  ? "text-heading/20 cursor-not-allowed"
                  : "text-heading hover:bg-accent/20 cursor-pointer"
              }`}
            >
              {day}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
