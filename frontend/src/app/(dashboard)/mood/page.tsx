"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Smile, Calendar, Music, Sparkles, TrendingUp, Heart } from "lucide-react";
import { moodEmojis, moodColors } from "@/lib/utils";
import { toast } from "sonner";

export default function MoodPage() {
  const [selectedMood, setSelectedMood] = useState<string>("AMAZING");

  const moods = [
    { key: "AMAZING", label: "Amazing", emoji: "😄", color: "#50a33f", playlist: "Energetic Anime Beats 🎧" },
    { key: "HAPPY", label: "Happy", emoji: "🙂", color: "#8b7fc7", playlist: "Warm Lo-Fi Chill ☕" },
    { key: "NEUTRAL", label: "Neutral", emoji: "😐", color: "#e9a84c", playlist: "Calm Kyoto Piano 🎹" },
    { key: "SAD", label: "Sad", emoji: "😔", color: "#d4708a", playlist: "Gentle Rain & Instrumental 🌧️" },
    { key: "VERY_SAD", label: "Very Sad", emoji: "😭", color: "#e05c5c", playlist: "Healing Ambient Meditation 🧘" },
    { key: "ANGRY", label: "Angry", emoji: "😡", color: "#c0392b", playlist: "Deep Breath & Nature Waves 🌊" },
  ];

  const current = moods.find((m) => m.key === selectedMood) || moods[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <Smile className="text-pink-400" /> Mood Tracker & AI Music Recommendations
        </h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Track your emotional well-being and get tailored lofi playlists.
        </p>
      </div>

      {/* Mood Selector Grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {moods.map((m) => (
          <motion.div
            key={m.key}
            onClick={() => {
              setSelectedMood(m.key);
              toast.success(`Logged ${m.label} mood! 🌸`);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-4 rounded-3xl glass-card text-center cursor-pointer space-y-2 border-2 transition-all ${
              selectedMood === m.key ? "ring-4 ring-pink-400/30" : ""
            }`}
            style={{ borderColor: selectedMood === m.key ? m.color : "transparent" }}
          >
            <div className="text-4xl">{m.emoji}</div>
            <p className="font-bold text-xs" style={{ color: "var(--text-primary)" }}>
              {m.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Playlist Recommendation Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-3xl glass-card space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-pink-400">
          <Music size={16} /> Recommended Lofi Playlist for your current mood:
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-pink-400/10 border border-pink-400/20">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{current.emoji}</span>
            <div>
              <h3 className="font-bold text-base" style={{ color: "var(--text-primary)" }}>
                {current.playlist}
              </h3>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Curated specifically for when you feel {current.label.toLowerCase()}.
              </p>
            </div>
          </div>

          <button
            onClick={() => toast.info(`Playing ${current.playlist}`)}
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-pink-400 hover:bg-pink-500 shadow-md whitespace-nowrap"
          >
            Play Playlist ▶
          </button>
        </div>
      </motion.div>
    </div>
  );
}
