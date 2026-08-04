"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Bell, Search, Sun, Moon, User } from "lucide-react";
import { useTheme } from "next-themes";
import { getGreeting, getGreetingEmoji } from "@/lib/utils";
import Link from "next/link";

export function DashboardHeader() {
  const { theme, setTheme } = useTheme();
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const greeting = getGreeting();
  const emoji = getGreetingEmoji();

  const timeString = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const dateString = time.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-16 flex items-center justify-between px-6 sticky top-0 z-50"
      style={{
        background: "var(--glass-bg)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--glass-border)",
      }}
    >
      {/* Left — Greeting */}
      <div className="flex items-center gap-4">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className="text-2xl">{emoji}</span>
        </motion.div>
        <div>
          <h1 className="text-lg font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
            {greeting}, Pradeepa
          </h1>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            {dateString}
          </p>
        </div>
      </div>

      {/* Center — Live Clock */}
      <motion.div
        className="hidden md:flex flex-col items-center"
        key={timeString}
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <span
          className="text-2xl font-bold tabular-nums"
          style={{
            background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {mounted ? timeString : "--:--"}
        </span>
      </motion.div>

      {/* Right — Actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <motion.button
          className="p-2.5 rounded-xl"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            color: "var(--text-muted)",
          }}
          whileHover={{ scale: 1.05, color: "var(--color-primary)" }}
          whileTap={{ scale: 0.95 }}
          aria-label="Search"
        >
          <Search size={16} />
        </motion.button>

        {/* Notifications */}
        <motion.button
          className="p-2.5 rounded-xl relative"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            color: "var(--text-muted)",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Notifications"
        >
          <Bell size={16} />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ background: "var(--color-primary)" }}
          />
        </motion.button>

        {/* Theme Toggle */}
        <motion.button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2.5 rounded-xl"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            color: "var(--text-muted)",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle theme"
        >
          {mounted && theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </motion.button>

        {/* Avatar */}
        <Link href="/settings">
          <motion.div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm cursor-pointer"
            style={{
              background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            P
          </motion.div>
        </Link>
      </div>
    </motion.header>
  );
}
