"use client";

import { motion } from "framer-motion";
import { Quote, Plus, Heart, Share2, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function QuotesPage() {
  const [quotes, setQuotes] = useState([
    { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci", cat: "Design" },
    { text: "千里の行も足下に始まる — A journey of a thousand miles begins with a single step.", author: "Japanese Proverb", cat: "Japanese" },
    { text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", author: "Buddha", cat: "Mindfulness" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <Quote className="text-pink-400" /> Daily Quotes & Wisdom Sanctuary
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Collect and reflect upon peaceful Japanese proverbs and daily inspiration.
          </p>
        </div>

        <button
          onClick={() => toast.info("Quote creation modal coming soon!")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-pink-400 hover:bg-pink-500 shadow"
        >
          <Plus size={16} /> Add Quote
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quotes.map((q, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -3 }}
            className="p-6 rounded-3xl glass-card space-y-4 relative overflow-hidden"
          >
            <span className="tag text-xs">#{q.cat}</span>
            <p className="text-base font-semibold italic leading-relaxed" style={{ color: "var(--text-primary)" }}>
              "{q.text}"
            </p>
            <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: "var(--border-subtle)" }}>
              <span className="text-xs font-bold text-pink-400">— {q.author}</span>
              <button onClick={() => toast.success("Added to favorites ❤️")} className="text-muted hover:text-pink-400">
                <Heart size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
