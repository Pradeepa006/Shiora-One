"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Dumbbell, Flame, Plus, Check } from "lucide-react";
import { toast } from "sonner";

interface Habit {
  id: string;
  name: string;
  category: string;
  streak: number;
  completedDays: boolean[]; // 7 days
}

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([
    { id: "h1", name: "Morning Meditation 🧘", category: "Mindfulness", streak: 14, completedDays: [true, true, true, true, true, false, true] },
    { id: "h2", name: "Read 20 Pages 📚", category: "Learning", streak: 8, completedDays: [true, true, true, false, true, true, true] },
    { id: "h3", name: "Coding & Side Project 💻", category: "Work", streak: 21, completedDays: [true, true, true, true, true, true, true] },
    { id: "h4", name: "Drink 2L Water 💧", category: "Health", streak: 5, completedDays: [false, true, true, true, true, true, false] },
  ]);

  const toggleDay = (habitId: string, dayIndex: number) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === habitId) {
          const nextDays = [...h.completedDays];
          nextDays[dayIndex] = !nextDays[dayIndex];
          if (nextDays[dayIndex]) toast.success(`Habit Streak +1! 🌸`);
          return { ...h, completedDays: nextDays };
        }
        return h;
      })
    );
  };

  const daysHeader = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <Dumbbell className="text-pink-400" /> Habit Tracker & Heatmap
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Build daily consistency with streaks and interactive heatmaps.
          </p>
        </div>

        <button
          onClick={() => toast.info("New habit creator coming soon!")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-pink-400 hover:bg-pink-500 shadow"
        >
          <Plus size={16} /> New Habit
        </button>
      </div>

      {/* Habits List & Weekly Heatmap */}
      <div className="p-6 rounded-3xl glass-card space-y-4">
        <div className="grid grid-cols-12 text-xs font-bold border-b pb-3" style={{ borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}>
          <div className="col-span-5">Habit Name</div>
          <div className="col-span-2 text-center">Streak</div>
          <div className="col-span-5 grid grid-cols-7 text-center">
            {daysHeader.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {habits.map((habit) => (
            <div key={habit.id} className="grid grid-cols-12 items-center text-sm py-2 hover:bg-pink-400/5 rounded-xl transition-colors">
              <div className="col-span-5 font-semibold" style={{ color: "var(--text-primary)" }}>
                {habit.name}
              </div>

              <div className="col-span-2 text-center font-bold text-amber-500 flex items-center justify-center gap-1">
                <Flame size={14} /> {habit.streak}d
              </div>

              <div className="col-span-5 grid grid-cols-7 gap-1 place-items-center">
                {habit.completedDays.map((done, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleDay(habit.id, idx)}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                      done ? "bg-green-500 text-white shadow-sm scale-105" : "bg-slate-200 dark:bg-slate-800 hover:bg-pink-400/20"
                    }`}
                  >
                    {done && <Check size={14} strokeWidth={3} />}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
