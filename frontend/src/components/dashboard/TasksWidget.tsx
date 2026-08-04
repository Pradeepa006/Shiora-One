"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Widget } from "./Widget";
import { CheckSquare, Plus, Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const MOCK_TASKS = [
  { id: "1", title: "Review pull request for auth module", priority: "HIGH", done: false },
  { id: "2", title: "Daily standup at 10 AM", priority: "MEDIUM", done: true },
  { id: "3", title: "Write Pomodoro session notes", priority: "LOW", done: false },
  { id: "4", title: "Study TypeScript generics", priority: "HIGH", done: false },
  { id: "5", title: "Update README documentation", priority: "LOW", done: true },
];

const priorityDot: Record<string, string> = {
  HIGH: "#e05c5c",
  MEDIUM: "#e9a84c",
  LOW: "#6bbf87",
  URGENT: "#b22222",
};

export function TasksWidget() {
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [newTask, setNewTask] = useState("");
  const [adding, setAdding] = useState(false);

  const toggle = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now().toString(), title: newTask, priority: "MEDIUM", done: false },
    ]);
    setNewTask("");
    setAdding(false);
  };

  const completed = tasks.filter((t) => t.done).length;
  const total = tasks.length;

  return (
    <Widget
      title="Today's Tasks"
      icon={<CheckSquare size={16} />}
      accentColor="var(--color-primary)"
      delay={0.15}
      size="lg"
      action={
        <Link href="/tasks">
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            View all →
          </span>
        </Link>
      }
    >
      <div className="space-y-3">
        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              Progress
            </span>
            <span className="text-xs font-semibold" style={{ color: "var(--color-primary)" }}>
              {completed}/{total}
            </span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary))" }}
              initial={{ width: 0 }}
              animate={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
          <AnimatePresence>
            {tasks.map((task, i) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10, height: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-3 p-2.5 rounded-xl group cursor-pointer"
                style={{
                  background: task.done ? "rgba(107,191,135,0.06)" : "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                  opacity: task.done ? 0.65 : 1,
                }}
                onClick={() => toggle(task.id)}
                whileHover={{ scale: 1.01 }}
              >
                {/* Checkbox */}
                <motion.div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border-2"
                  style={{
                    borderColor: task.done ? "#6bbf87" : "var(--border-soft)",
                    background: task.done ? "#6bbf87" : "transparent",
                  }}
                  whileTap={{ scale: 0.85 }}
                >
                  {task.done && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <Check size={10} color="white" strokeWidth={3} />
                    </motion.div>
                  )}
                </motion.div>

                {/* Priority dot */}
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: priorityDot[task.priority] }}
                />

                {/* Title */}
                <span
                  className="text-sm flex-1 truncate"
                  style={{
                    color: "var(--text-secondary)",
                    textDecoration: task.done ? "line-through" : "none",
                  }}
                >
                  {task.title}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Quick Add */}
        <AnimatePresence>
          {adding ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex gap-2"
            >
              <input
                autoFocus
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                placeholder="New task…"
                className="flex-1 text-sm px-3 py-2 rounded-xl outline-none"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--color-primary)",
                  color: "var(--text-primary)",
                }}
              />
              <motion.button
                onClick={addTask}
                className="px-3 py-2 rounded-xl text-sm font-medium text-white"
                style={{ background: "var(--color-primary)" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add
              </motion.button>
            </motion.div>
          ) : (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setAdding(true)}
              className="flex items-center gap-2 text-sm w-full p-2 rounded-xl"
              style={{ color: "var(--text-muted)", border: "1px dashed var(--border-soft)" }}
              whileHover={{ color: "var(--color-primary)", borderColor: "var(--color-primary)" }}
            >
              <Plus size={14} />
              Quick add task
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </Widget>
  );
}
