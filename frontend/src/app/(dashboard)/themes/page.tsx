"use client";

import { motion } from "framer-motion";
import { Palette, Check, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";

export default function ThemesPage() {
  const { theme, setTheme } = useTheme();

  const presets = [
    { name: "Japanese Sakura 🌸", id: "light", preview: "from-pink-100 to-rose-200" },
    { name: "Kyoto Night 🌙", id: "dark", preview: "from-slate-900 to-purple-950" },
    { name: "Matcha Garden 🍵", id: "matcha", preview: "from-emerald-100 to-teal-200" },
    { name: "Anime Sunset 🌅", id: "sunset", preview: "from-amber-100 to-pink-200" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <Palette className="text-pink-400" /> Themes & Custom Theme Builder
        </h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Switch between handcrafted Japanese palettes or customize your glassmorphism colors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {presets.map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ scale: 1.03 }}
            onClick={() => {
              setTheme(p.id);
              toast.success(`Switched to ${p.name}`);
            }}
            className={`p-6 rounded-3xl glass-card cursor-pointer space-y-4 border-2 transition-all ${
              theme === p.id ? "ring-4 ring-pink-400/30 border-pink-400" : "border-transparent"
            }`}
          >
            <div className={`h-24 rounded-2xl bg-gradient-to-br ${p.preview} shadow-inner flex items-center justify-center`}>
              {theme === p.id && <Check className="text-pink-600 bg-white rounded-full p-1" size={24} />}
            </div>
            <h3 className="font-bold text-sm text-center" style={{ color: "var(--text-primary)" }}>
              {p.name}
            </h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
