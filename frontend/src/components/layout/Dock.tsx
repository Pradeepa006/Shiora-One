"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, CheckSquare, Home, StickyNote, Timer } from "lucide-react";

const dockItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/tasks", icon: CheckSquare, label: "Tasks" },
  { href: "/notes", icon: StickyNote, label: "Notes" },
  { href: "/calendar", icon: Calendar, label: "Calendar" },
  { href: "/pomodoro", icon: Timer, label: "Focus" },
] as const;

export function Dock() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2">
      <div
        className="flex items-center gap-2 rounded-2xl px-3 py-2"
        style={{
          background: "var(--glass-bg)",
          border: "1px solid var(--glass-border)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        {dockItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href} aria-label={item.label}>
              <motion.div
                whileHover={{ y: -4, scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                className="relative rounded-xl p-2"
                style={{
                  background: active
                    ? "linear-gradient(135deg, rgba(212,112,138,0.2), rgba(139,127,199,0.2))"
                    : "transparent",
                  color: active ? "var(--color-primary)" : "var(--text-muted)",
                }}
              >
                <Icon size={18} />
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
