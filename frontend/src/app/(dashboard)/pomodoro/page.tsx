"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Timer, Play, Pause, RotateCcw, Flame, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function PomodoroPage() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(3);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
      setSessionsCompleted((s) => s + 1);
      toast.success("Pomodoro Session Complete! +100 XP 🎉");
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeFormatted = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-center">
      <div>
        <h1 className="text-2xl font-bold flex items-center justify-center gap-2" style={{ color: "var(--text-primary)" }}>
          <Timer className="text-pink-400" /> Pomodoro Sanctuary Timer
        </h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Immerse yourself in calm, uninterrupted focus sessions.
        </p>
      </div>

      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="p-10 rounded-3xl glass-card space-y-6">
        <div className="text-6xl font-black tracking-widest font-mono text-pink-400">
          {timeFormatted}
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-8 py-3 rounded-2xl font-bold text-sm text-white bg-pink-400 hover:bg-pink-500 shadow-lg flex items-center gap-2"
          >
            {isRunning ? <Pause size={16} /> : <Play size={16} />}
            {isRunning ? "Pause" : "Start Focus"}
          </button>

          <button
            onClick={() => {
              setIsRunning(false);
              setSecondsLeft(25 * 60);
            }}
            className="p-3 rounded-2xl glass hover:bg-black/5 dark:hover:bg-white/5 text-muted"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        <div className="pt-4 border-t flex items-center justify-center gap-6 text-xs" style={{ borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}>
          <span className="flex items-center gap-1 font-bold text-amber-500">
            <Flame size={14} /> {sessionsCompleted} Focus Sessions Today
          </span>
          <span>Target: 4 Sessions (75% Complete)</span>
        </div>
      </motion.div>
    </div>
  );
}
