"use client";

import { motion } from "framer-motion";
import { Pin, Plus, Search, StickyNote } from "lucide-react";
import type { Note } from "@/types/note";

interface NotesSidebarProps {
  notes: Note[];
  selectedNoteId: string | null;
  search: string;
  onSearchChange: (value: string) => void;
  onSelect: (id: string) => void;
  onCreateNote: () => void;
}

export function NotesSidebar({
  notes,
  selectedNoteId,
  search,
  onSearchChange,
  onSelect,
  onCreateNote,
}: NotesSidebarProps) {
  return (
    <div className="md:col-span-4 rounded-3xl glass-card flex flex-col overflow-hidden">
      <div className="p-4 border-b space-y-3" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <StickyNote className="text-pink-400" size={20} /> Notes
          </h2>
          <button
            onClick={onCreateNote}
            className="p-2 rounded-xl bg-pink-400 text-white hover:bg-pink-500 transition-transform active:scale-95"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs outline-none glass"
            style={{ background: "var(--bg-card)", color: "var(--text-primary)" }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {notes.map((note) => (
          <motion.div
            key={note.id}
            onClick={() => onSelect(note.id)}
            whileHover={{ x: 3 }}
            className={`p-3 rounded-2xl cursor-pointer transition-all ${
              selectedNoteId === note.id ? "glass ring-2 ring-pink-400/50" : "hover:bg-black/5 dark:hover:bg-white/5"
            }`}
            style={{ background: selectedNoteId === note.id ? `${note.color}15` : "transparent" }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-xs truncate max-w-[180px]" style={{ color: "var(--text-primary)" }}>
                {note.title}
              </span>
              {note.pinned && <Pin size={12} className="text-pink-400" />}
            </div>
            <p className="text-[11px] line-clamp-2" style={{ color: "var(--text-muted)" }}>
              {note.content.replace(/[#*`]/g, "")}
            </p>
            <div className="flex items-center justify-between text-[10px] mt-2" style={{ color: "var(--text-muted)" }}>
              <span>{note.folder}</span>
              <span>{note.updatedAt}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
