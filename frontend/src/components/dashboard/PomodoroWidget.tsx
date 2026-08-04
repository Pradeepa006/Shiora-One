"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Widget } from "./Widget";
import { Timer, Play, Pause, RotateCcw, Coffee, Zap } from "lucide-react";

type Mode = "focus" | "short" | "long";

const MODES: Record<Mode, { label: string; minutes: number; color: string; emoji: string }> = {
  focus: { label: "Focus", minutes: 25, color: "#d4708a", emoji: "🎯" },
  short: { label: "Short Break", minutes: 5, color: "#6bbf87", emoji: "☕" },
  long: { label: "Long Break", minutes: 15, color: "#8b7fc7", emoji: "🌸" },
};

export function PomodoroWidget() {
  const [mode, setMode] = useState<Mode>("focus");
  const [timeLeft, setTimeLeft] = useState(MODES.focus.minutes * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = MODES[mode].minutes * 60;
  const progress = ((total - timeLeft) / total) * 100;
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            setRunning(false);
            if (mode === "focus") setSessions((s) => s + 1);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, mode]);

  const switchMode = (m: Mode) => {
    setMode(m);
    setRunning(false);
    setTimeLeft(MODES[m].minutes * 60);
  };

  const reset = () => {
    setRunning(false);
    setTimeLeft(MODES[mode].minutes * 60);
  };

  const currentMode = MODES[mode];
  const circumference = 2 * Math.PI * 44;

  return (
    <Widget title="Pomodoro" icon={<Timer size={16} />} accentColor={currentMode.color} delay={0.3}>
      <div className="space-y-4">
        {/* Mode switcher */}
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: "var(--bg-card)" }}>
          {(Object.keys(MODES) as Mode[]).map((m) => (
            <motion.button
              key={m}
              onClick={() => switchMode(m)}
              className="flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all"
              style={{
                background: mode === m ? MODES[m].color : "transparent",
                color: mode === m ? "white" : "var(--text-muted)",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {MODES[m].emoji} {MODES[m].label}
            </motion.button>
          ))}
        </div>

        {/* Circular Timer */}
        <div className="flex items-center justify-center">
          <div className="relative w-28 h-28">
            <svg width="112" height="112" className="-rotate-90">
              <circle
                cx="56" cy="56" r="44"
                fill="none"
                stroke="var(--border-subtle)"
                strokeWidth="6"
              />
              <motion.circle
                cx="56" cy="56" r="44"
                fill="none"
                stroke={currentMode.color}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress / 100)}
                transition={{ duration: 1, ease: "linear" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold tabular-nums" style={{ color: "var(--text-primary)" }}>
                {minutes}:{seconds}
              </span>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                {currentMode.emoji} {currentMode.label}
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <motion.button
            onClick={reset}
            className="p-2 rounded-xl"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Reset"
          >
            <RotateCcw size={15} />
          </motion.button>

          <motion.button
            onClick={() => setRunning(!running)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: `linear-gradient(135deg, ${currentMode.color}, #8b7fc7)` }}
            whileHover={{ scale: 1.05, boxShadow: `0 8px 20px ${currentMode.color}40` }}
            whileTap={{ scale: 0.95 }}
            aria-label={running ? "Pause" : "Start"}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={running ? "pause" : "play"}
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                {running ? <Pause size={16} /> : <Play size={16} />}
              </motion.div>
            </AnimatePresence>
            {running ? "Pause" : "Start"}
          </motion.button>
        </div>

        {/* Sessions */}
        <div className="flex items-center justify-center gap-1.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: i < sessions % 4 ? currentMode.color : "var(--border-subtle)" }}
              animate={i < sessions % 4 ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            />
          ))}
          <span className="text-xs ml-1" style={{ color: "var(--text-muted)" }}>
            {sessions} sessions today
          </span>
        </div>
      </div>
    </Widget>
  );
}
