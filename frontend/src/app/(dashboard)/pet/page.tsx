"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Heart, Sparkles, ShoppingBag, Star, Zap } from "lucide-react";
import { toast } from "sonner";

export default function PetPage() {
  const [petType, setPetType] = useState<"cat" | "panda" | "fox">("cat");
  const [petName, setPetName] = useState("Hana 🌸");
  const [happiness, setHappiness] = useState(85);
  const [xp, setXp] = useState(2450);

  const petAvatars = {
    cat: "🐱",
    panda: "🐼",
    fox: "🦊",
  };

  const feedPet = () => {
    setHappiness((h) => Math.min(100, h + 10));
    setXp((x) => x + 25);
    toast.success(`${petName} loves the treat! +25 XP 🌸`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <Heart className="text-pink-400" /> Virtual Pet Companion System
        </h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Your digital Japanese pet companion grows and levels up as you complete tasks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Interactive Pet Card */}
        <div className="p-8 rounded-3xl glass-card text-center space-y-6 flex flex-col items-center justify-center">
          <div className="relative">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-8xl select-none cursor-pointer"
              onClick={feedPet}
            >
              {petAvatars[petType]}
            </motion.div>
            <span className="absolute -top-2 -right-2 px-2.5 py-1 rounded-full text-xs font-extrabold text-white bg-amber-400 shadow">
              Lv.7
            </span>
          </div>

          <div>
            <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              {petName}
            </h2>
            <p className="text-xs text-pink-400 font-semibold">Happiness: {happiness}% ❤️</p>
          </div>

          <div className="w-full space-y-2">
            <div className="flex justify-between text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
              <span>XP Progress</span>
              <span>{xp} / 3000 XP</span>
            </div>
            <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-pink-400 rounded-full" style={{ width: `${(xp / 3000) * 100}%` }} />
            </div>
          </div>

          <button
            onClick={feedPet}
            className="px-6 py-2.5 rounded-2xl font-bold text-xs text-white bg-pink-400 hover:bg-pink-500 shadow-md"
          >
            Give Sakura Treat 🌸 (+25 XP)
          </button>
        </div>

        {/* Pet Customization & Shop */}
        <div className="p-6 rounded-3xl glass-card space-y-4">
          <h3 className="font-bold text-base flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <ShoppingBag className="text-pink-400" size={18} /> Pet Sanctuary Shop & Select
          </h3>

          <div className="space-y-2">
            <label className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Select Pet Companion:</label>
            <div className="grid grid-cols-3 gap-3">
              {(["cat", "panda", "fox"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setPetType(type)}
                  className={`p-3 rounded-2xl text-2xl glass transition-all border ${
                    petType === type ? "ring-2 ring-pink-400 border-pink-400" : "border-transparent"
                  }`}
                >
                  {petAvatars[type]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
