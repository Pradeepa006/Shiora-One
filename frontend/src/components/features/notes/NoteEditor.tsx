"use client";

import type { Note } from "@/types/note";

interface NoteEditorProps {
  note: Note | null;
  onChangeTitle: (value: string) => void;
  onChangeContent: (value: string) => void;
}

export function NoteEditor({ note, onChangeTitle, onChangeContent }: NoteEditorProps) {
  if (!note) {
    return (
      <div className="md:col-span-8 rounded-3xl glass-card p-6 flex items-center justify-center" style={{ color: "var(--text-muted)" }}>
        Select or create a note to start writing.
      </div>
    );
  }

  return (
    <div className="md:col-span-8 rounded-3xl glass-card p-6 flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col space-y-4">
        <input
          type="text"
          value={note.title}
          onChange={(e) => onChangeTitle(e.target.value)}
          className="text-2xl font-bold bg-transparent outline-none w-full"
          style={{ color: "var(--text-primary)" }}
          placeholder="Note Title..."
        />

        <div className="flex items-center gap-2 border-b pb-3" style={{ borderColor: "var(--border-subtle)" }}>
          <span className="tag text-[10px]">Folder: {note.folder}</span>
          {note.tags.map((tag) => (
            <span key={tag} className="tag text-[10px]">
              #{tag}
            </span>
          ))}
          <span className="text-xs ml-auto" style={{ color: "var(--text-muted)" }}>
            Autosaved
          </span>
        </div>

        <textarea
          value={note.content}
          onChange={(e) => onChangeContent(e.target.value)}
          className="flex-1 w-full bg-transparent outline-none resize-none font-mono text-sm leading-relaxed p-2"
          style={{ color: "var(--text-primary)" }}
          placeholder="Write your peaceful thoughts here..."
        />
      </div>
    </div>
  );
}
