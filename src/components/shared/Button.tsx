"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "outline";
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  href,
  children,
  variant = "primary",
  type = "button",
  disabled = false,
  onClick,
  className = "",
}: ButtonProps) {
  const baseClasses =
    "inline-block px-8 py-3 rounded-xl font-semibold text-lg transition-colors duration-300 cursor-pointer";
  const variants = {
    primary: "bg-primary text-white hover:bg-hover disabled:opacity-50 disabled:cursor-not-allowed",
    outline:
      "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  };

  if (href) {
    return (
      <Link href={href}>
        <motion.span
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`${baseClasses} ${variants[variant]} ${className}`}
        >
          {children}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
