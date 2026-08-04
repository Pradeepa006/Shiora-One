"use client";

import { motion } from "framer-motion";
import { Widget } from "./Widget";
import { Bell, Plus, Clock } from "lucide-react";
import { useState } from "react";

const ALARMS = [
  { id: "1", time: "06:30", label: "Morning Routine", days: ["Mon", "Tue", "Wed", "Thu", "Fri"], active: true },
  { id: "2", time: "09:00", label: "Daily Standup", days: ["Mon", "Tue", "Wed", "Thu", "Fri"], active: false },
  { id: "3", time: "22:00", label: "Wind Down", days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], active: true },
];

export function AlarmWidget() {
  const [alarms, setAlarms] = useState(ALARMS);

  const toggle = (id: string) =>
    setAlarms((prev) => prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a)));

  const nextAlarm = alarms.find((a) => a.active);

  return (
    <Widget
      title="Alarms"
      icon={<Bell size={16} />}
      accentColor="#d4708a"
      delay={0.3}
      action={
        <motion.button
          className="p-1.5 rounded-lg"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Add alarm"
        >
          <Plus size={14} />
        </motion.button>
      }
    >
      <div className="space-y-3">
        {/* Next alarm highlight */}
        {nextAlarm && (
          <motion.div
            className="px-3 py-2.5 rounded-xl"
            style={{
              background: "linear-gradient(135deg, rgba(212,112,138,0.12), rgba(139,127,199,0.08))",
              border: "1px solid rgba(212,112,138,0.2)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Clock size={12} style={{ color: "var(--color-primary)" }} />
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>Next alarm</span>
            </div>
            <p className="text-2xl font-bold" style={{ color: "var(--color-primary)" }}>
              {nextAlarm.time}
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>{nextAlarm.label}</p>
          </motion.div>
        )}

        {/* Alarm list */}
        <div className="space-y-2">
          {alarms.map((alarm, i) => (
            <motion.div
              key={alarm.id}
              className="flex items-center justify-between p-2.5 rounded-xl"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                opacity: alarm.active ? 1 : 0.5,
              }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: alarm.active ? 1 : 0.5, x: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <div>
                <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                  {alarm.time}
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{alarm.label}</p>
                <div className="flex gap-1 mt-1">
                  {["M", "T", "W", "T", "F", "S", "S"].map((d, idx) => {
                    const fullDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
                    const active = alarm.days.includes(fullDays[idx]);
                    return (
                      <span
                        key={idx}
                        className="text-xs w-4 h-4 flex items-center justify-center rounded-full"
                        style={{
                          background: active ? "rgba(212,112,138,0.2)" : "transparent",
                          color: active ? "var(--color-primary)" : "var(--text-muted)",
                          fontSize: "0.6rem",
                        }}
                      >
                        {d}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Toggle */}
              <motion.button
                onClick={() => toggle(alarm.id)}
                className="relative w-10 h-5.5 rounded-full flex-shrink-0"
                style={{
                  background: alarm.active
                    ? "linear-gradient(135deg, var(--color-primary), var(--color-secondary))"
                    : "var(--border-soft)",
                  width: 40,
                  height: 22,
                  borderRadius: 11,
                }}
                whileTap={{ scale: 0.95 }}
                aria-label={`${alarm.active ? "Disable" : "Enable"} alarm`}
              >
                <motion.div
                  className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                  animate={{ left: alarm.active ? 20 : 4 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </Widget>
  );
}
