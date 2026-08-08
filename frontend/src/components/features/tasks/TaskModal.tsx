"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { TaskPriority } from "@/types/task";

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (title: string, priority: TaskPriority) => void;
}

const priorities: TaskPriority[] = ["URGENT", "HIGH", "MEDIUM", "LOW"];

export function TaskModal({ open, onClose, onCreate }: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("MEDIUM");

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm p-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-5 rounded-3xl glass-card"
      >
        <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
          Create a peaceful task
        </h3>

        <div className="mt-4 space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="w-full input"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
            className="w-full input"
          >
            {priorities.map((entry) => (
              <option key={entry} value={entry}>
                {entry}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2">
          <button onClick={onClose} className="btn-ghost">
            Cancel
          </button>
          <button
            onClick={() => {
              onCreate(title, priority);
              setTitle("");
              setPriority("MEDIUM");
            }}
            className="btn-primary"
          >
            Create Task
          </button>
        </div>
      </motion.div>
    </div>
  );
}
