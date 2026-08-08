"use client";

import { Filter, Search } from "lucide-react";
import type { TaskPriority } from "@/types/task";

interface TaskFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  activePriority: "ALL" | TaskPriority;
  onPriorityChange: (value: "ALL" | TaskPriority) => void;
}

const priorities: Array<"ALL" | TaskPriority> = ["ALL", "URGENT", "HIGH", "MEDIUM", "LOW"];

export function TaskFilters({
  search,
  onSearchChange,
  activePriority,
  onPriorityChange,
}: TaskFiltersProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl glass-card">
      <div className="flex items-center gap-2 flex-1 min-w-[240px]">
        <Search size={16} style={{ color: "var(--text-muted)" }} />
        <input
          type="text"
          placeholder="Search tasks or tags..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-transparent border-none text-sm outline-none"
          style={{ color: "var(--text-primary)" }}
        />
      </div>

      <div className="flex items-center gap-2">
        <Filter size={14} style={{ color: "var(--text-muted)" }} />
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          Priority:
        </span>
        {priorities.map((priority) => (
          <button
            key={priority}
            onClick={() => onPriorityChange(priority)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              activePriority === priority
                ? "bg-pink-400/20 text-pink-500 font-bold"
                : "text-muted hover:text-primary"
            }`}
          >
            {priority}
          </button>
        ))}
      </div>
    </div>
  );
}
