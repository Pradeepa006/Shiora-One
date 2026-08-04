"use client";

import { motion } from "framer-motion";
import { Widget } from "./Widget";
import { Zap, Trophy, TrendingUp } from "lucide-react";

const CATEGORIES = [
  { label: "Coding", xp: 1240, color: "#6bbf87", emoji: "💻" },
  { label: "Learning", xp: 880, color: "#8b7fc7", emoji: "📚" },
  { label: "Health", xp: 620, color: "#d4708a", emoji: "🏋️" },
  { label: "Mindfulness", xp: 450, color: "#4fb3d8", emoji: "🧘" },
  { label: "Creativity", xp: 310, color: "#e9a84c", emoji: "🎨" },
];

const BADGES = [
  { emoji: "🌸", label: "7-Day Streak", earned: true },
  { emoji: "⚡", label: "Speed Coder", earned: true },
  { emoji: "📖", label: "Bookworm", earned: true },
  { emoji: "🏆", label: "Champion", earned: false },
  { emoji: "🔥", label: "30-Day Streak", earned: false },
  { emoji: "🌟", label: "Star Achiever", earned: false },
];

const TOTAL_XP = 3500;
const LEVEL = 7;
const XP_FOR_NEXT = 500;
const XP_IN_LEVEL = TOTAL_XP % XP_FOR_NEXT;
const MAX_CAT_XP = Math.max(...CATEGORIES.map((c) => c.xp));

export function XPWidget() {
  const xpProgress = (XP_IN_LEVEL / XP_FOR_NEXT) * 100;

  return (
    <Widget
      title="Life Journey"
      icon={<Zap size={16} />}
      accentColor="#e9a84c"
      delay={0.4}
      size="lg"
      action={
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
          style={{
            background: "linear-gradient(135deg, #e9a84c, #f0c070)",
            color: "white",
          }}
        >
          <Trophy size={11} />
          Level {LEVEL}
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-5">
        {/* Left — XP Overview */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-end mb-2">
              <div>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Total XP</p>
                <motion.p
                  className="text-2xl font-bold"
                  style={{
                    background: "linear-gradient(135deg, #e9a84c, #f0c070)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {TOTAL_XP.toLocaleString()}
                </motion.p>
              </div>
              <div className="text-right">
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Next level</p>
                <p className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>
                  {XP_FOR_NEXT - XP_IN_LEVEL} XP
                </p>
              </div>
            </div>

            {/* XP Progress */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium" style={{ color: "#e9a84c" }}>Lv.{LEVEL}</span>
                <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #e9a84c, #f0c070)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${xpProgress}%` }}
                    transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                  />
                </div>
                <span className="text-xs font-medium" style={{ color: "#e9a84c" }}>Lv.{LEVEL + 1}</span>
              </div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {XP_IN_LEVEL}/{XP_FOR_NEXT} XP this level
              </p>
            </div>
          </div>

          {/* Badges */}
          <div>
            <p className="text-xs font-semibold mb-2" style={{ color: "var(--text-muted)" }}>
              Achievements
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {BADGES.map((badge, i) => (
                <motion.div
                  key={badge.label}
                  className="flex flex-col items-center gap-1 p-2 rounded-xl"
                  style={{
                    background: badge.earned ? "rgba(233,168,76,0.1)" : "var(--bg-card)",
                    border: `1px solid ${badge.earned ? "rgba(233,168,76,0.3)" : "var(--border-subtle)"}`,
                    opacity: badge.earned ? 1 : 0.4,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: badge.earned ? 1 : 0.4, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.05, type: "spring" }}
                  title={badge.label}
                >
                  <span className="text-lg">{badge.emoji}</span>
                  <span className="text-xs text-center leading-tight" style={{ color: "var(--text-muted)", fontSize: "0.6rem" }}>
                    {badge.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Category XP Bars */}
        <div className="space-y-3">
          <p className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
            XP by Category
          </p>
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.label}
              className="space-y-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{cat.emoji}</span>
                  <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    {cat.label}
                  </span>
                </div>
                <span className="text-xs font-semibold" style={{ color: cat.color }}>
                  {cat.xp}
                </span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: cat.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(cat.xp / MAX_CAT_XP) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Widget>
  );
}
