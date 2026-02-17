"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { reviews } from "@/lib/reviews-data";

export default function ReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextReview = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  }, []);

  const prevReview = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, []);

  useEffect(() => {
    if (isAutoScrolling && expandedId === null) {
      intervalRef.current = setInterval(nextReview, 4000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoScrolling, expandedId, nextReview]);

  const handleCardClick = (id: number) => {
    if (expandedId === id) {
      setExpandedId(null);
      setIsAutoScrolling(true);
    } else {
      setExpandedId(id);
      setIsAutoScrolling(false);
    }
  };

  const getVisibleReviews = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % reviews.length;
      visible.push(reviews[index]);
    }
    return visible;
  };

  const visibleReviews = getVisibleReviews();

  return (
    <div className="relative">
      {/* Expanded review overlay */}
      <AnimatePresence>
        {expandedId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-heading/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setExpandedId(null);
              setIsAutoScrolling(true);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-cream rounded-2xl p-8 max-w-lg w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-heading text-lg leading-relaxed mb-6">
                &ldquo;{reviews.find((r) => r.id === expandedId)?.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <p className="text-hover font-semibold">
                  — {reviews.find((r) => r.id === expandedId)?.name}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const currentIdx = reviews.findIndex(
                        (r) => r.id === expandedId
                      );
                      const prevIdx =
                        (currentIdx - 1 + reviews.length) % reviews.length;
                      setExpandedId(reviews[prevIdx].id);
                    }}
                    className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-hover transition-colors"
                    aria-label="Predchádzajúca recenzia"
                  >
                    <svg
                      className="w-5 h-5"
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
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const currentIdx = reviews.findIndex(
                        (r) => r.id === expandedId
                      );
                      const nextIdx = (currentIdx + 1) % reviews.length;
                      setExpandedId(reviews[nextIdx].id);
                    }}
                    className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-hover transition-colors"
                    aria-label="Ďalšia recenzia"
                  >
                    <svg
                      className="w-5 h-5"
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Carousel cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleReviews.map((review, i) => (
          <motion.div
            key={`${review.id}-${currentIndex}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            whileHover={{ y: -5, boxShadow: "0 10px 40px rgba(69,9,32,0.15)" }}
            onClick={() => handleCardClick(review.id)}
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 cursor-pointer border border-accent/20 hover:border-primary/30 transition-colors duration-300"
          >
            <p className="text-heading/80 text-sm leading-relaxed mb-4 line-clamp-4">
              &ldquo;{review.text}&rdquo;
            </p>
            <p className="text-hover font-semibold text-sm">
              — {review.name}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="flex justify-end gap-2 mt-6">
        <button
          onClick={prevReview}
          className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-hover transition-colors"
          aria-label="Predchádzajúce"
        >
          <svg
            className="w-5 h-5"
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
        <button
          onClick={nextReview}
          className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-hover transition-colors"
          aria-label="Ďalšie"
        >
          <svg
            className="w-5 h-5"
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
    </div>
  );
}
