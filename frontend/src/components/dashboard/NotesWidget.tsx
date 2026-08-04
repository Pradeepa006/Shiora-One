"use client";

import { motion } from "framer-motion";
import { Widget } from "./Widget";
import { StickyNote, Plus, Pin } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const NOTES = [
  {
    id: "1",
    title: "Spring Boot Security Notes",
    preview: "JWT filter → authenticate → SecurityContext → principal...",
    color: "#d4708a",
    pinned: true,
    emoji: "📝",
    updatedAt: "2m ago",
  },
  {
    id: "2",
    title: "Ideas for Shiora UI",
    preview: "Add floating particles, glassmorphism cards, sakura animations...",
    color: "#8b7fc7",
    pinned: false,
    emoji: "💡",
    updatedAt: "1h ago",
  },
  {
    id: "3",
    title: "Study Plan - August",
    preview: "Week 1: TypeScript generics & patterns. Week 2: System design...",
    color: "#6bbf87",
    pinned: false,
    emoji: "📚",
    updatedAt: "Yesterday",
  },
];

export function NotesWidget() {
  const [notes] = useState(NOTES);

  return (
    <Widget
      title="Recent Notes"
      icon={<StickyNote size={16} />}
      accentColor="#8b7fc7"
      delay={0.35}
      size="lg"
      action={
        <div className="flex items-center gap-2">
          <Link href="/notes">
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>View all →</span>
          </Link>
          <Link href="/notes">
            <motion.button
              className="p-1.5 rounded-lg"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="New note"
            >
              <Plus size={14} />
            </motion.button>
          </Link>
        </div>
      }
    >
      <div className="grid grid-cols-3 gap-3">
        {notes.map((note, i) => (
          <motion.div
            key={note.id}
            className="p-4 rounded-xl cursor-pointer relative overflow-hidden"
            style={{
              background: `${note.color}10`,
              border: `1px solid ${note.color}25`,
              minHeight: 120,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.08, type: "spring" }}
            whileHover={{ scale: 1.03, y: -3, boxShadow: `0 8px 20px ${note.color}25` }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Accent glow */}
            <div
              className="absolute top-0 right-0 w-16 h-16 rounded-full blur-2xl opacity-30 pointer-events-none"
              style={{ background: note.color }}
            />

            {note.pinned && (
              <div className="absolute top-3 right-3">
                <Pin size={12} style={{ color: note.color }} />
              </div>
            )}

            <div className="relative z-10">
              <div className="text-2xl mb-2">{note.emoji}</div>
              <p className="text-sm font-semibold leading-snug mb-1.5" style={{ color: "var(--text-primary)" }}>
                {note.title}
              </p>
              <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-muted)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {note.preview}
              </p>
              <p className="text-xs" style={{ color: note.color, opacity: 0.8 }}>
                {note.updatedAt}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Widget>
  );
}
