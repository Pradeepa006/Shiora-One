"use client";

import { motion } from "framer-motion";
import { Star, Trophy, Award, Flame, Zap, CheckCircle2 } from "lucide-react";

export default function JourneyPage() {
  const achievements = [
    { title: "First Step 🌸", desc: "Complete your first task in Shiora", icon: "🌱", done: true },
    { title: "7-Day Streak 🔥", desc: "Maintain a 7-day habit streak", icon: "🔥", done: true },
    { title: "Zen Master 🧘", desc: "Complete 10 Pomodoro sessions", icon: "🍵", done: true },
    { title: "Code Samurai 💻", desc: "Earn 1000 XP in Coding category", icon: "⚔️", done: true },
    { title: "Early Bird 🌅", desc: "Complete a task before 7 AM", icon: "☀️", done: false },
    { title: "Pet Whisperer 🐱", desc: "Reach Level 10 with your virtual pet", icon: "👑", done: false },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <Star className="text-pink-400" /> Life Journey & Gamification XP
        </h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Earn XP across Coding, Mindfulness, Reading, & Health to level up your digital life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl glass-card text-center space-y-3">
          <Trophy size={36} className="mx-auto text-amber-400" />
          <h3 className="text-3xl font-extrabold text-pink-400">Level 7</h3>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Total Life XP: 3,500 XP</p>
        </div>

        <div className="p-6 rounded-3xl glass-card text-center space-y-3">
          <Flame size={36} className="mx-auto text-orange-500" />
          <h3 className="text-3xl font-extrabold text-orange-500">14 Days</h3>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Active Daily Streak</p>
        </div>

        <div className="p-6 rounded-3xl glass-card text-center space-y-3">
          <Award size={36} className="mx-auto text-purple-400" />
          <h3 className="text-3xl font-extrabold text-purple-400">4 / 6 Badges</h3>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Unlocked Achievements</p>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="p-6 rounded-3xl glass-card space-y-4">
        <h3 className="font-bold text-base" style={{ color: "var(--text-primary)" }}>Achievements & Badges</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map((a) => (
            <div
              key={a.title}
              className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${
                a.done ? "glass border-pink-400/30" : "bg-black/5 dark:bg-white/5 opacity-40 border-transparent"
              }`}
            >
              <span className="text-3xl">{a.icon}</span>
              <div>
                <h4 className="font-bold text-xs" style={{ color: "var(--text-primary)" }}>{a.title}</h4>
                <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
