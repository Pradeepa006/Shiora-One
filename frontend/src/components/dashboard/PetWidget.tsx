"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Widget } from "./Widget";
import { Heart, Star, Zap } from "lucide-react";

type PetType = "cat" | "panda" | "fox";
type Mood = "happy" | "sleeping" | "excited" | "sad";

const PETS: Record<PetType, { name: string; idle: string; happy: string; excited: string; sleeping: string; sad: string }> = {
  cat: { name: "Hana", idle: "🐱", happy: "😸", excited: "🙀", sleeping: "😴", sad: "🙀" },
  panda: { name: "Mochi", idle: "🐼", happy: "🐼", excited: "🐼", sleeping: "🐼", sad: "🐼" },
  fox: { name: "Kitsune", idle: "🦊", happy: "🦊", excited: "🦊", sleeping: "🦊", sad: "🦊" },
};

const SPEECH_BUBBLES: Record<Mood, string[]> = {
  happy: ["Keep it up! 🌸", "You're doing great!", "I believe in you! ✨", "Wonderful work! 💕"],
  sleeping: ["Zzz... 💤", "Taking a nap~", "Dream big! 🌙"],
  excited: ["WOW! 🎉 You did it!", "Amazing streak! 🔥", "Level up! ⭐"],
  sad: ["Don't give up! 🌸", "Tomorrow is new! 💪", "I'll wait for you~"],
};

export function PetWidget() {
  const [petType] = useState<PetType>("cat");
  const [mood, setMood] = useState<Mood>("happy");
  const [bubbleIdx, setBubbleIdx] = useState(0);
  const [xp] = useState(2450);
  const [level] = useState(7);

  const pet = PETS[petType];
  const petXpForLevel = 500;
  const xpInLevel = xp % petXpForLevel;
  const xpProgress = (xpInLevel / petXpForLevel) * 100;

  const bubbles = SPEECH_BUBBLES[mood];
  const currentBubble = bubbles[bubbleIdx % bubbles.length];

  const handlePetClick = () => {
    setMood("excited");
    setBubbleIdx((i) => i + 1);
    setTimeout(() => setMood("happy"), 2000);
  };

  return (
    <Widget
      title="My Pet"
      icon={<Heart size={16} />}
      accentColor="#e9a84c"
      delay={0.25}
      action={
        <div className="flex items-center gap-1 text-xs" style={{ color: "#e9a84c" }}>
          <Star size={12} fill="currentColor" />
          Lv.{level}
        </div>
      }
    >
      <div className="space-y-4">
        {/* Pet Display */}
        <div className="flex flex-col items-center gap-3 relative">
          {/* Speech Bubble */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBubble}
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.9 }}
              className="px-3 py-2 rounded-2xl text-xs font-medium text-center relative"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-soft)",
                color: "var(--text-secondary)",
                maxWidth: 140,
              }}
            >
              {currentBubble}
              {/* Bubble tail */}
              <div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0"
                style={{
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderTop: "8px solid var(--border-soft)",
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Pet Avatar */}
          <motion.div
            onClick={handlePetClick}
            className="text-6xl cursor-pointer select-none"
            animate={
              mood === "excited"
                ? { scale: [1, 1.3, 0.9, 1.1, 1], rotate: [0, -10, 10, -5, 0] }
                : mood === "sleeping"
                ? { y: [0, 3, 0] }
                : { y: [0, -4, 0] }
            }
            transition={
              mood === "excited"
                ? { duration: 0.6, type: "spring" }
                : { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            title={`Click to pet ${pet.name}!`}
          >
            {pet[mood] || pet.idle}
          </motion.div>

          <div>
            <p className="text-sm font-semibold text-center" style={{ color: "var(--text-primary)" }}>
              {pet.name}
            </p>
            <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
              Click to pet! 🐾
            </p>
          </div>
        </div>

        {/* XP Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
              <Zap size={11} />
              <span>XP</span>
            </div>
            <span className="text-xs font-semibold" style={{ color: "#e9a84c" }}>
              {xpInLevel}/{petXpForLevel}
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #e9a84c, #f0c070)" }}
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Mood Buttons */}
        <div className="grid grid-cols-3 gap-1.5">
          {(["happy", "sleeping", "sad"] as Mood[]).map((m) => (
            <motion.button
              key={m}
              onClick={() => setMood(m)}
              className="py-1.5 rounded-lg text-xs font-medium capitalize"
              style={{
                background: mood === m ? "rgba(233,168,76,0.15)" : "var(--bg-card)",
                border: `1px solid ${mood === m ? "#e9a84c" : "var(--border-subtle)"}`,
                color: mood === m ? "#e9a84c" : "var(--text-muted)",
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {m}
            </motion.button>
          ))}
        </div>
      </div>
    </Widget>
  );
}
