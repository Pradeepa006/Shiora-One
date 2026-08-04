"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes";
import {
  Home, CheckSquare, StickyNote, Bell, Smile, Dumbbell,
  Timer, Heart, Star, Calendar, BarChart2, Quote,
  Palette, Settings, ChevronLeft, Sparkles,
  Music, Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: CheckSquare, label: "Tasks", href: "/tasks" },
  { icon: StickyNote, label: "Notes", href: "/notes" },
  { icon: Bell, label: "Alarms", href: "/alarms" },
  { icon: Smile, label: "Mood", href: "/mood" },
  { icon: Dumbbell, label: "Habits", href: "/habits" },
  { icon: Timer, label: "Pomodoro", href: "/pomodoro" },
  { icon: Heart, label: "My Pet", href: "/pet" },
  { icon: Star, label: "Life Journey", href: "/journey" },
  { icon: Calendar, label: "Calendar", href: "/calendar" },
  { icon: BarChart2, label: "Analytics", href: "/analytics" },
  { icon: Quote, label: "Quotes", href: "/quotes" },
  { icon: Palette, label: "Themes", href: "/themes" },
  { icon: Music, label: "Music", href: "/music" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 h-screen z-40 flex flex-col"
      style={{
        background: "var(--glass-bg)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderRight: "1px solid var(--glass-border)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b" style={{ borderColor: "var(--border-subtle)" }}>
        <motion.div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-lg font-bold text-white"
          style={{ background: "linear-gradient(135deg, #d4708a, #8b7fc7)" }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          🌸
        </motion.div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="font-bold text-base leading-tight" style={{ color: "var(--text-primary)" }}>
                Shiora One
              </div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                Your calm workspace
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {navItems.map(({ icon: Icon, label, href }) => {
          const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href));
          return (
            <Link key={href} href={href}>
              <motion.div
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer group relative overflow-hidden",
                  "transition-colors duration-150"
                )}
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, rgba(212,112,138,0.15), rgba(139,127,199,0.15))"
                    : "transparent",
                  color: isActive ? "var(--color-primary)" : "var(--text-secondary)",
                }}
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(212,112,138,0.12), rgba(139,127,199,0.12))",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {isActive && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full"
                    style={{ background: "var(--color-primary)" }}
                  />
                )}
                <Icon
                  size={18}
                  className="flex-shrink-0 relative z-10"
                  style={{ color: isActive ? "var(--color-primary)" : "var(--text-muted)" }}
                />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-medium relative z-10 whitespace-nowrap"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t space-y-1" style={{ borderColor: "var(--border-subtle)" }}>
        <Link href="/settings">
          <motion.div
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer"
            style={{ color: "var(--text-muted)" }}
            whileHover={{ x: 2, color: "var(--text-primary)" }}
          >
            <Settings size={18} />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-medium"
                >
                  Settings
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </Link>

        {/* Collapse toggle */}
        <motion.button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full cursor-pointer"
          style={{ color: "var(--text-muted)" }}
          whileHover={{ color: "var(--text-primary)" }}
        >
          <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronLeft size={18} />
          </motion.div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium"
              >
                Collapse
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.aside>
  );
}
