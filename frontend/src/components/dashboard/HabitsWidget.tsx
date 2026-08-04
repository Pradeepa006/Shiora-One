"use client";

import { motion } from "framer-motion";
import { Widget } from "./Widget";
import { Dumbbell, Droplets, BookOpen, Brain, Moon, Code, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const HABITS = [
  { id: "1", label: "Workout", icon: "💪", color: "#d4708a", completed: false },
  { id: "2", label: "Read", icon: "📚", color: "#8b7fc7", completed: true },
  { id: "3", label: "Meditate", icon: "🧘", color: "#6bbf87", completed: false },
  { id: "4", label: "Water", icon: "💧", color: "#4fb3d8", completed: true },
  { id: "5", label: "Code", icon: "💻", color: "#e9a84c", completed: false },
  { id: "6", label: "Sleep 8h", icon: "🌙", color: "#8b7fc7", completed: false },
];

export function HabitsWidget() {
  const [habits, setHabits] = useState(HABITS);

  const toggle = (id: string) => {
    setHabits((prev) => {
      const habit = prev.find((h) => h.id === id);
      if (habit && !habit.completed) {
        toast.success(`${habit.icon} ${habit.label} completed! +10 XP 🌸`);
      }
      return prev.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h));
    });
  };

  const completedCount = habits.filter((h) => h.completed).length;
  const total = habits.length;

  return (
    <Widget
      title="Daily Habits"
      icon="🌿"
      accentColor="#6bbf87"
      delay={0.2}
      action={
        <span className="text-xs font-semibold" style={{ color: "#6bbf87" }}>
          {completedCount}/{total}
        </span>
      }
    >
      <div className="space-y-3">
        {/* Streak */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
          style={{
            background: "linear-gradient(135deg, rgba(233,168,76,0.12), rgba(212,112,138,0.08))",
            border: "1px solid rgba(233,168,76,0.2)",
          }}
        >
          <span className="text-base">🔥</span>
          <span className="font-semibold" style={{ color: "#e9a84c" }}>14 day streak!</span>
          <span className="text-xs ml-auto" style={{ color: "var(--text-muted)" }}>Keep it up!</span>
        </div>

        {/* Habits Grid */}
        <div className="grid grid-cols-3 gap-2">
          {habits.map((habit, i) => (
            <motion.button
              key={habit.id}
              onClick={() => toggle(habit.id)}
              className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl transition-all relative overflow-hidden"
              style={{
                background: habit.completed ? `${habit.color}18` : "var(--bg-card)",
                border: `1px solid ${habit.completed ? habit.color : "var(--border-subtle)"}`,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06, type: "spring" }}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.92 }}
              aria-label={habit.label}
            >
              {habit.completed && (
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{ background: `${habit.color}08` }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                />
              )}
              <motion.span
                className="text-xl relative z-10"
                animate={habit.completed ? { scale: [1, 1.4, 1] } : {}}
                transition={{ duration: 0.4 }}
              >
                {habit.icon}
              </motion.span>
              <span
                className="text-xs font-medium relative z-10"
                style={{ color: habit.completed ? habit.color : "var(--text-muted)" }}
              >
                {habit.label}
              </span>
              {habit.completed && (
                <motion.div
                  className="w-4 h-4 rounded-full flex items-center justify-center text-white text-xs relative z-10"
                  style={{ background: habit.color }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  ✓
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="space-y-1">
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #6bbf87, #4fb3d8)" }}
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / total) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <p className="text-xs text-right" style={{ color: "var(--text-muted)" }}>
            {Math.round((completedCount / total) * 100)}% complete
          </p>
        </div>
      </div>
    </Widget>
  );
}
