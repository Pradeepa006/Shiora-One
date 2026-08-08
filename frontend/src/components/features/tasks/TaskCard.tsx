"use client";

import { Check, Clock, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { priorityColors } from "@/lib/utils";
import type { Task } from "@/types/task";

interface TaskCardProps {
  task: Task;
  onToggleDone: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export function TaskCard({ task, onToggleDone, onDelete }: TaskCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-2xl glass-card flex items-start justify-between gap-4 group"
    >
      <div className="flex items-start gap-3 flex-1">
        <button
          onClick={() => onToggleDone(task.id)}
          className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
            task.status === "COMPLETED"
              ? "bg-green-500 border-green-500 text-white"
              : "border-slate-300 hover:border-pink-400"
          }`}
        >
          {task.status === "COMPLETED" && <Check size={12} strokeWidth={3} />}
        </button>

        <div className="space-y-1">
          <h3
            className={`font-semibold text-sm ${task.status === "COMPLETED" ? "line-through opacity-50" : ""}`}
            style={{ color: "var(--text-primary)" }}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
              style={{ background: priorityColors[task.priority] }}
            >
              {task.priority}
            </span>
            <span className="flex items-center gap-1 text-[11px]" style={{ color: "var(--text-muted)" }}>
              <Clock size={11} /> {task.dueDate}
            </span>
            {task.tags.map((tag) => (
              <span key={tag} className="tag text-[10px]">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-500/10 text-red-400 transition-all"
      >
        <Trash2 size={16} />
      </button>
    </motion.div>
  );
}
