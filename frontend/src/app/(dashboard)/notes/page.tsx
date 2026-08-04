"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  StickyNote, Folder, Plus, Search, Tag, Pin, Trash2, Edit3, Save,
  FileText, Code, CheckSquare, Sparkles, BookOpen,
} from "lucide-react";
import { toast } from "sonner";

interface Note {
  id: string;
  title: string;
  content: string;
  folder: string;
  tags: string[];
  pinned: boolean;
  color: string;
  updatedAt: string;
}

const INITIAL_NOTES: Note[] = [
  {
    id: "n1",
    title: "Shiora Architecture & Design Guidelines",
    content: `# 🌸 Shiora One System Architecture

A peaceful Japanese digital workspace built with:
- **Next.js 15 App Router**
- **Spring Boot 3 REST APIs**
- **PostgreSQL & Redis Caching**

## Core Philosophy
1. Wabi-Sabi Aesthetics
2. Smooth Framer Motion interactions
3. Drag & drop modularity`,
    folder: "Architecture",
    tags: ["Dev", "Design"],
    pinned: true,
    color: "#d4708a",
    updatedAt: "Just now",
  },
  {
    id: "n2",
    title: "Daily Reflections & Mindfulness Journal",
    content: `Today felt calm and productive. Completed the full frontend component tree for Shiora.
Remember to take short 5-minute tea breaks between coding sessions! 🍵`,
    folder: "Journal",
    tags: ["Mindfulness", "Personal"],
    pinned: false,
    color: "#6bbf87",
    updatedAt: "2h ago",
  },
];

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);
  const [selectedNoteId, setSelectedNoteId] = useState<string>("n1");
  const [search, setSearch] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<string>("ALL");

  const selectedNote = notes.find((n) => n.id === selectedNoteId) || notes[0];

  const handleUpdateContent = (content: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === selectedNoteId ? { ...n, content, updatedAt: "Just now" } : n))
    );
  };

  const handleUpdateTitle = (title: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === selectedNoteId ? { ...n, title } : n))
    );
  };

  const createNote = () => {
    const newNote: Note = {
      id: `n_${Date.now()}`,
      title: "Untitled Note",
      content: "# New Note\n\nStart writing here...",
      folder: "General",
      tags: ["Draft"],
      pinned: false,
      color: "#8b7fc7",
      updatedAt: "Just now",
    };
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
    toast.success("New Note Created 🌸");
  };

  return (
    <div className="h-[calc(100vh-100px)] grid grid-cols-1 md:grid-cols-12 gap-4 overflow-hidden">
      {/* Left Folder & Notes List Panel */}
      <div className="md:col-span-4 rounded-3xl glass-card flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b space-y-3" style={{ borderColor: "var(--border-subtle)" }}>
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
              <StickyNote className="text-pink-400" size={20} /> Notes
            </h2>
            <button
              onClick={createNote}
              className="p-2 rounded-xl bg-pink-400 text-white hover:bg-pink-500 transition-transform active:scale-95"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs outline-none glass"
              style={{ background: "var(--bg-card)", color: "var(--text-primary)" }}
            />
          </div>
        </div>

        {/* Note List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {notes.map((note) => (
            <motion.div
              key={note.id}
              onClick={() => setSelectedNoteId(note.id)}
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

      {/* Right Notion-Style Editor Panel */}
      <div className="md:col-span-8 rounded-3xl glass-card p-6 flex flex-col overflow-hidden">
        {selectedNote ? (
          <div className="flex-1 flex flex-col space-y-4">
            {/* Note Header Title */}
            <input
              type="text"
              value={selectedNote.title}
              onChange={(e) => handleUpdateTitle(e.target.value)}
              className="text-2xl font-bold bg-transparent outline-none w-full"
              style={{ color: "var(--text-primary)" }}
              placeholder="Note Title..."
            />

            <div className="flex items-center gap-2 border-b pb-3" style={{ borderColor: "var(--border-subtle)" }}>
              <span className="tag text-[10px]">📁 {selectedNote.folder}</span>
              {selectedNote.tags.map((t) => (
                <span key={t} className="tag text-[10px]">
                  #{t}
                </span>
              ))}
              <span className="text-xs ml-auto" style={{ color: "var(--text-muted)" }}>
                Autosaved
              </span>
            </div>

            {/* Content Textarea */}
            <textarea
              value={selectedNote.content}
              onChange={(e) => handleUpdateContent(e.target.value)}
              className="flex-1 w-full bg-transparent outline-none resize-none font-mono text-sm leading-relaxed p-2"
              style={{ color: "var(--text-primary)" }}
              placeholder="Write your peaceful thoughts here..."
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted">
            Select or create a note to start writing.
          </div>
        )}
      </div>
    </div>
  );
}
