"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Widget } from "./Widget";
import { Smile } from "lucide-react";
import { toast } from "sonner";

const moods = [
  { emoji: "😄", label: "Amazing", value: "AMAZING", color: "#50a33f" },
  { emoji: "🙂", label: "Happy", value: "HAPPY", color: "#8b7fc7" },
  { emoji: "😐", label: "Neutral", value: "NEUTRAL", color: "#e9a84c" },
  { emoji: "😔", label: "Sad", value: "SAD", color: "#d4708a" },
  { emoji: "😭", label: "Very Sad", value: "VERY_SAD", color: "#e05c5c" },
  { emoji: "😡", label: "Angry", value: "ANGRY", color: "#c0392b" },
];

export function MoodWidget() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleMoodSelect = (value: string) => {
    setSelectedMood(value);
    setSaved(false);
  };

  const handleSave = () => {
    if (!selectedMood) return;
    setSaved(true);
    toast.success("Mood saved! 🌸", {
      description: "Your mood has been recorded for today.",
    });
  };

  const selected = moods.find((m) => m.value === selectedMood);

  return (
    <Widget
      title="Today's Mood"
      icon={<Smile size={16} />}
      accentColor="var(--color-primary)"
      delay={0.1}
      action={
        selectedMood && !saved ? (
          <motion.button
            onClick={handleSave}
            className="text-xs px-3 py-1.5 rounded-full font-medium text-white"
            style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Save
          </motion.button>
        ) : null
      }
    >
      <div className="space-y-4">
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          How are you feeling today?
        </p>

        {/* Mood Selector */}
        <div className="flex justify-between gap-1">
          {moods.map((mood, i) => (
            <motion.button
              key={mood.value}
              onClick={() => handleMoodSelect(mood.value)}
              className="flex flex-col items-center gap-1 p-2 rounded-xl flex-1 transition-all"
              style={{
                background:
                  selectedMood === mood.value
                    ? `${mood.color}20`
                    : "transparent",
                border: `1px solid ${
                  selectedMood === mood.value ? mood.color : "transparent"
                }`,
              }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              aria-label={mood.label}
            >
              <motion.span
                className="text-2xl"
                animate={
                  selectedMood === mood.value
                    ? { scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] }
                    : {}
                }
                transition={{ duration: 0.4 }}
              >
                {mood.emoji}
              </motion.span>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                {mood.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Selected state */}
        <AnimatePresence>
          {saved && selected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ background: `${selected.color}15`, border: `1px solid ${selected.color}30` }}
            >
              <span className="text-lg">{selected.emoji}</span>
              <span className="text-sm font-medium" style={{ color: selected.color }}>
                Feeling {selected.label} — recorded! ✓
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Widget>
  );
}
