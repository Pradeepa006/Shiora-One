"use client";

import { motion } from "framer-motion";
import { MoodWidget } from "@/components/dashboard/MoodWidget";
import { MusicWidget } from "@/components/dashboard/MusicWidget";
import { TasksWidget } from "@/components/dashboard/TasksWidget";
import { PomodoroWidget } from "@/components/dashboard/PomodoroWidget";
import { PetWidget } from "@/components/dashboard/PetWidget";
import { QuoteWidget } from "@/components/dashboard/QuoteWidget";
import { HabitsWidget } from "@/components/dashboard/HabitsWidget";
import { XPWidget } from "@/components/dashboard/XPWidget";
import { AnalyticsWidget } from "@/components/dashboard/AnalyticsWidget";
import { AlarmWidget } from "@/components/dashboard/AlarmWidget";
import { NotesWidget } from "@/components/dashboard/NotesWidget";
import { WeatherWidget } from "@/components/dashboard/WeatherWidget";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Section: Quick Overview */}
      <section>
        <motion.h2
          className="text-xs font-semibold uppercase tracking-wider mb-4"
          style={{ color: "var(--text-muted)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          🌸 Your Workspace
        </motion.h2>

        {/* Row 1: Weather, Mood, Music */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          <WeatherWidget />
          <MoodWidget />
          <MusicWidget />
        </div>

        {/* Row 2: Tasks (wide) + Pomodoro */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          <div className="md:col-span-2">
            <TasksWidget />
          </div>
          <PomodoroWidget />
        </div>

        {/* Row 3: Pet, Quote, Alarm */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          <PetWidget />
          <QuoteWidget />
          <AlarmWidget />
        </div>

        {/* Row 4: Habits + Notes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          <HabitsWidget />
          <div className="md:col-span-2">
            <NotesWidget />
          </div>
        </div>

        {/* Row 5: XP (wide) + Analytics (wide) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <XPWidget />
          <AnalyticsWidget />
        </div>
      </section>
    </div>
  );
}
