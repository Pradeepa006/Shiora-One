"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface WidgetProps {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  accentColor?: string;
  action?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  delay?: number;
}

const sizeClasses = {
  sm: "col-span-1 row-span-1",
  md: "col-span-1 row-span-1",
  lg: "col-span-2 row-span-1",
  xl: "col-span-2 row-span-2",
};

export function Widget({
  title,
  icon,
  children,
  className,
  accentColor = "var(--color-primary)",
  action,
  size = "md",
  delay = 0,
}: WidgetProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.34, 1.1, 0.64, 1] }}
      whileHover={{ y: -3, boxShadow: "var(--shadow-lg)" }}
      className={cn("relative overflow-hidden rounded-2xl", sizeClasses[size], className)}
      style={{
        background: "var(--glass-bg)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {/* Accent glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: accentColor }}
      />

      {/* Header */}
      {(title || action) && (
        <div
          className="flex items-center justify-between px-5 pt-4 pb-3"
          style={{ borderBottom: "1px solid var(--border-subtle)" }}
        >
          <div className="flex items-center gap-2">
            {icon && (
              <span className="text-base" style={{ color: accentColor }}>
                {icon}
              </span>
            )}
            {title && (
              <h3
                className="text-sm font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {title}
              </h3>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}

      {/* Content */}
      <div className="p-5 pt-4">{children}</div>
    </motion.div>
  );
}
