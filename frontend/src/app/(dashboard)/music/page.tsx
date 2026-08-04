"use client";

import { motion } from "framer-motion";
import { Music, Play, Pause, Radio, Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function MusicPage() {
  const [activeStation, setActiveStation] = useState(0);

  const stations = [
    { title: "Lofi Hip Hop Radio 🌸", desc: "Beats to relax/study to", emoji: "🎧" },
    { title: "Kyoto Rain & Chill 🌧️", desc: "Nature sounds & soft piano", emoji: "🎹" },
    { title: "Ghibli Symphony 🎻", desc: "Studio Ghibli orchestral lofi", emoji: "🌸" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <Music className="text-pink-400" /> Ambient Music Sanctuary & Lofi Radio
        </h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Soothing Japanese lofi background audio for deep work sessions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stations.map((s, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -3 }}
            onClick={() => {
              setActiveStation(idx);
              toast.success(`Playing ${s.title}`);
            }}
            className={`p-6 rounded-3xl glass-card cursor-pointer space-y-4 border-2 transition-all ${
              activeStation === idx ? "ring-4 ring-pink-400/30 border-pink-400" : "border-transparent"
            }`}
          >
            <div className="text-5xl text-center">{s.emoji}</div>
            <div>
              <h3 className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{s.title}</h3>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{s.desc}</p>
            </div>
            <button className="w-full py-2 rounded-xl text-xs font-bold text-white bg-pink-400 hover:bg-pink-500 shadow">
              {activeStation === idx ? "Now Playing ▶" : "Tune In"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
