"use client";

import { motion } from "framer-motion";
import { Widget } from "./Widget";
import { Quote, RefreshCw, Heart } from "lucide-react";
import { useState } from "react";

const QUOTES = [
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
    category: "Motivation",
  },
  {
    text: "In the middle of every difficulty lies opportunity.",
    author: "Albert Einstein",
    category: "Life",
  },
  {
    text: "花は桜木、人は武士。 — Among flowers, the cherry blossom; among men, the warrior.",
    author: "Japanese Proverb",
    category: "Japanese",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "Coding",
  },
  {
    text: "七転び八起き — Fall seven times, stand up eight.",
    author: "Japanese Proverb",
    category: "Life",
  },
  {
    text: "One does not accumulate but eliminate. It is not daily increase but daily decrease.",
    author: "Bruce Lee",
    category: "Mindfulness",
  },
];

const categoryColors: Record<string, string> = {
  Motivation: "#d4708a",
  Life: "#8b7fc7",
  Japanese: "#e9a84c",
  Coding: "#6bbf87",
  Mindfulness: "#4fb3d8",
};

export function QuoteWidget() {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [liked, setLiked] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const quote = QUOTES[quoteIdx];
  const categoryColor = categoryColors[quote.category] || "var(--color-primary)";

  const nextQuote = () => {
    setQuoteIdx((i) => (i + 1) % QUOTES.length);
    setLiked(false);
    setAnimKey((k) => k + 1);
  };

  return (
    <Widget
      title="Daily Quote"
      icon={<Quote size={16} />}
      accentColor={categoryColor}
      delay={0.35}
      action={
        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => setLiked(!liked)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.85 }}
            aria-label="Like quote"
          >
            <Heart
              size={14}
              style={{
                color: liked ? "#d4708a" : "var(--text-muted)",
                fill: liked ? "#d4708a" : "none",
              }}
            />
          </motion.button>
          <motion.button
            onClick={nextQuote}
            style={{ color: "var(--text-muted)" }}
            whileHover={{ scale: 1.1, color: "var(--text-primary)", rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            aria-label="Next quote"
          >
            <RefreshCw size={14} />
          </motion.button>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Category badge */}
        <motion.div
          animate={{ backgroundColor: `${categoryColor}18`, borderColor: `${categoryColor}30` }}
          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border"
          style={{ color: categoryColor }}
        >
          {quote.category}
        </motion.div>

        {/* Quote text */}
        <motion.div
          key={animKey}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div
            className="text-3xl font-bold leading-none mb-3"
            style={{ color: categoryColor, opacity: 0.4 }}
          >
            ❝
          </div>
          <p
            className="text-sm leading-relaxed italic"
            style={{ color: "var(--text-secondary)" }}
          >
            {quote.text}
          </p>
          <p className="text-xs mt-3 font-semibold" style={{ color: "var(--text-muted)" }}>
            — {quote.author}
          </p>
        </motion.div>

        {/* Progress dots */}
        <div className="flex gap-1">
          {QUOTES.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => { setQuoteIdx(i); setAnimKey((k) => k + 1); }}
              className="rounded-full transition-all"
              style={{
                width: i === quoteIdx ? 16 : 5,
                height: 5,
                background: i === quoteIdx ? categoryColor : "var(--border-soft)",
              }}
              whileHover={{ scale: 1.3 }}
              aria-label={`Quote ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </Widget>
  );
}
