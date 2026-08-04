"use client";

import { motion } from "framer-motion";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";

export default function CalendarPage() {
  const [currentMonth] = useState("August 2026");

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <CalendarIcon className="text-pink-400" /> Japanese Studio Workspace Calendar
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Schedule and view your tasks, alarms, and habit milestones.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl glass text-muted"><ChevronLeft size={16} /></button>
          <span className="font-bold text-sm px-3" style={{ color: "var(--text-primary)" }}>{currentMonth}</span>
          <button className="p-2 rounded-xl glass text-muted"><ChevronRight size={16} /></button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-6 rounded-3xl glass-card space-y-4">
        <div className="grid grid-cols-7 text-center font-bold text-xs border-b pb-3" style={{ borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}>
          <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {daysInMonth.map((day) => (
            <div
              key={day}
              className={`min-h-[80px] p-2 rounded-2xl border text-xs flex flex-col justify-between transition-all ${
                day === 3 ? "glass ring-2 ring-pink-400 border-pink-400 font-bold" : "hover:bg-pink-400/5 border-transparent"
              }`}
            >
              <span style={{ color: "var(--text-primary)" }}>{day}</span>
              {day === 3 && <span className="tag text-[9px]">🌸 Today</span>}
              {day === 5 && <span className="tag text-[9px] bg-purple-400/20 text-purple-400">💻 Deploy</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
