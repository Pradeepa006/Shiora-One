"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Bell, Plus, Volume2, ShieldAlert, CheckCircle2, Clock, Play } from "lucide-react";
import { toast } from "sonner";

interface Alarm {
  id: string;
  time: string;
  label: string;
  challenge: "MATH" | "TYPING" | "MEMORY" | "NONE";
  active: boolean;
  repeatDays: string[];
}

export default function AlarmsPage() {
  const [alarms, setAlarms] = useState<Alarm[]>([
    { id: "a1", time: "06:30", label: "Morning Zen Routine", challenge: "MATH", active: true, repeatDays: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    { id: "a2", time: "09:00", label: "Focus Work Session", challenge: "TYPING", active: true, repeatDays: ["Mon", "Tue", "Wed"] },
    { id: "a3", time: "22:30", label: "Wind Down Meditation", challenge: "NONE", active: false, repeatDays: ["Daily"] },
  ]);

  const [activeChallenge, setActiveChallenge] = useState<"MATH" | "TYPING" | null>(null);
  const [mathAnswer, setMathAnswer] = useState("");

  const toggleAlarm = (id: string) => {
    setAlarms((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
  };

  const triggerChallengeTest = (challenge: "MATH" | "TYPING") => {
    setActiveChallenge(challenge);
  };

  const solveChallenge = () => {
    if (activeChallenge === "MATH" && mathAnswer === "42") {
      toast.success("Challenge Solved! Alarm Dismissed 🌸");
      setActiveChallenge(null);
      setMathAnswer("");
    } else {
      toast.error("Incorrect answer! Try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <Bell className="text-pink-400" /> Alarms & Wake Challenges
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Gentle fade-in alarms paired with mindfulness & brain challenges.
          </p>
        </div>

        <button
          onClick={() => toast.info("New alarm popup coming soon!")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-pink-400 hover:bg-pink-500 shadow-lg"
        >
          <Plus size={16} /> Add Alarm
        </button>
      </div>

      {/* Alarms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {alarms.map((alarm) => (
          <motion.div
            key={alarm.id}
            whileHover={{ y: -3 }}
            className="p-6 rounded-3xl glass-card space-y-4 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tag">
                Challenge: {alarm.challenge}
              </span>
              <button
                onClick={() => toggleAlarm(alarm.id)}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  alarm.active ? "bg-pink-400" : "bg-slate-300 dark:bg-slate-700"
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${alarm.active ? "translate-x-6" : ""}`} />
              </button>
            </div>

            <div>
              <h2 className="text-4xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>
                {alarm.time}
              </h2>
              <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                {alarm.label}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: "var(--border-subtle)" }}>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                {alarm.repeatDays.join(", ")}
              </span>

              {alarm.challenge !== "NONE" && (
                <button
                  onClick={() => triggerChallengeTest(alarm.challenge as "MATH" | "TYPING")}
                  className="text-xs font-semibold text-pink-400 hover:underline flex items-center gap-1"
                >
                  <Play size={12} /> Test Challenge
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Wake Challenge Modal */}
      {activeChallenge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="w-full max-w-sm p-6 rounded-3xl glass-card text-center space-y-4">
            <ShieldAlert size={40} className="mx-auto text-pink-400" />
            <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>Wake Challenge! ⏰</h3>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Solve this to dismiss the alarm:</p>

            {activeChallenge === "MATH" && (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-pink-400/10 text-lg font-extrabold">
                  What is 6 × 7 ?
                </div>
                <input
                  type="text"
                  value={mathAnswer}
                  onChange={(e) => setMathAnswer(e.target.value)}
                  placeholder="Enter answer"
                  className="w-full p-2.5 rounded-xl border text-center font-bold text-sm outline-none"
                  style={{ background: "var(--bg-card)", color: "var(--text-primary)" }}
                />
              </div>
            )}

            <button onClick={solveChallenge} className="w-full py-2.5 rounded-xl bg-pink-400 text-white font-bold text-sm shadow">
              Dismiss Alarm
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
