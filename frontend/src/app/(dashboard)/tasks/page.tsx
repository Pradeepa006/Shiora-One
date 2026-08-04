"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  CheckSquare, List, LayoutGrid, Calendar as CalendarIcon, Clock, Plus,
  Search, Filter, Tag, Check, MoreVertical, Trash2, Edit2, AlertCircle,
} from "lucide-react";
import { priorityColors } from "@/lib/utils";
import { toast } from "sonner";

type TaskView = "list" | "kanban" | "timeline";

interface Subtask {
  id: string;
  title: string;
  done: boolean;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  priority: "URGENT" | "HIGH" | "MEDIUM" | "LOW";
  dueDate: string;
  tags: string[];
  subtasks: Subtask[];
  estTime?: string;
}

const INITIAL_TASKS: Task[] = [
  {
    id: "t1",
    title: "Implement Spring Boot JWT Security Filter",
    description: "Validate access tokens and generate refresh tokens for endpoints.",
    status: "IN_PROGRESS",
    priority: "HIGH",
    dueDate: "Today",
    tags: ["Backend", "Security"],
    estTime: "2h",
    subtasks: [
      { id: "s1", title: "Create JwtTokenProvider", done: true },
      { id: "s2", title: "Configure SecurityFilterChain", done: false },
    ],
  },
  {
    id: "t2",
    title: "Design Sakura Glassmorphism Design System",
    description: "Tailwind tokens and responsive CSS glass containers.",
    status: "COMPLETED",
    priority: "URGENT",
    dueDate: "Yesterday",
    tags: ["Frontend", "Design"],
    estTime: "4h",
    subtasks: [
      { id: "s3", title: "Set color CSS variables", done: true },
      { id: "s4", title: "Add backdrop blur rules", done: true },
    ],
  },
  {
    id: "t3",
    title: "Virtual Pet Interactive Animations",
    description: "Support feeding, petting speech bubbles, and XP growth.",
    status: "TODO",
    priority: "MEDIUM",
    dueDate: "Tomorrow",
    tags: ["Feature", "Pet"],
    estTime: "3h",
    subtasks: [
      { id: "s5", title: "SVG Pet Expressions", done: false },
    ],
  },
  {
    id: "t4",
    title: "PostgreSQL Database Schema & Flyway",
    description: "Write DDL migration script for all 18 tables with UUID keys.",
    status: "IN_PROGRESS",
    priority: "HIGH",
    dueDate: "Aug 5",
    tags: ["Database", "Backend"],
    estTime: "1.5h",
    subtasks: [],
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [view, setView] = useState<TaskView>("list");
  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState<string>("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<Task["priority"]>("MEDIUM");

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    const matchesPriority = filterPriority === "ALL" || t.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === "COMPLETED" ? "TODO" : "COMPLETED";
          if (nextStatus === "COMPLETED") {
            toast.success(`Task Completed! +50 XP 🌸`);
          }
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const handleCreateTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask: Task = {
      id: `t_${Date.now()}`,
      title: newTaskTitle,
      status: "TODO",
      priority: newTaskPriority,
      dueDate: "Today",
      tags: ["Workspace"],
      subtasks: [],
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle("");
    setIsModalOpen(false);
    toast.success("Task Created! 🌸");
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    toast.info("Task deleted");
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <CheckSquare className="text-pink-400" /> Task Management
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Organize your goals peacefully with calm list and Kanban views.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Switcher */}
          <div className="flex p-1 rounded-xl glass" style={{ background: "var(--bg-card)" }}>
            <button
              onClick={() => setView("list")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                view === "list" ? "bg-pink-400 text-white shadow" : "text-muted hover:text-primary"
              }`}
            >
              <List size={14} /> List
            </button>
            <button
              onClick={() => setView("kanban")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                view === "kanban" ? "bg-pink-400 text-white shadow" : "text-muted hover:text-primary"
              }`}
            >
              <LayoutGrid size={14} /> Kanban
            </button>
          </div>

          <motion.button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-lg"
            style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Plus size={16} /> New Task
          </motion.button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl glass-card">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <Search size={16} style={{ color: "var(--text-muted)" }} />
          <input
            type="text"
            placeholder="Search tasks or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-none text-sm outline-none"
            style={{ color: "var(--text-primary)" }}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={14} style={{ color: "var(--text-muted)" }} />
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>Priority:</span>
          {["ALL", "URGENT", "HIGH", "MEDIUM", "LOW"].map((p) => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                filterPriority === p ? "bg-pink-400/20 text-pink-500 font-bold" : "text-muted hover:text-primary"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW: List View */}
      {view === "list" && (
        <div className="space-y-3">
          <AnimatePresence>
            {filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-4 rounded-2xl glass-card flex items-start justify-between gap-4 group"
              >
                <div className="flex items-start gap-3 flex-1">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      task.status === "COMPLETED" ? "bg-green-500 border-green-500 text-white" : "border-slate-300 hover:border-pink-400"
                    }`}
                  >
                    {task.status === "COMPLETED" && <Check size={12} strokeWidth={3} />}
                  </button>

                  <div className="space-y-1">
                    <h3 className={`font-semibold text-sm ${task.status === "COMPLETED" ? "line-through opacity-50" : ""}`} style={{ color: "var(--text-primary)" }}>
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

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => deleteTask(task.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-400">
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* VIEW: Kanban Board */}
      {view === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(["TODO", "IN_PROGRESS", "COMPLETED"] as const).map((status) => {
            const columnTasks = filteredTasks.filter((t) => t.status === status);
            const titles = { TODO: "To Do 📌", IN_PROGRESS: "In Progress ⚡", COMPLETED: "Completed ✨" };

            return (
              <div key={status} className="p-4 rounded-3xl glass-card space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                    {titles[status]} ({columnTasks.length})
                  </h3>
                </div>

                <div className="space-y-3">
                  {columnTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      whileHover={{ y: -2 }}
                      className="p-3.5 rounded-xl glass border space-y-2 cursor-pointer"
                      style={{ background: "var(--bg-card)" }}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white"
                          style={{ background: priorityColors[task.priority] }}
                        >
                          {task.priority}
                        </span>
                        <button onClick={() => toggleTask(task.id)} className="text-muted hover:text-primary">
                          <Check size={14} className={task.status === "COMPLETED" ? "text-green-500" : ""} />
                        </button>
                      </div>
                      <p className="font-medium text-xs" style={{ color: "var(--text-primary)" }}>
                        {task.title}
                      </p>
                      <div className="flex items-center justify-between text-[10px]" style={{ color: "var(--text-muted)" }}>
                        <span>{task.dueDate}</span>
                        <span>{task.tags.join(", ")}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md p-6 rounded-3xl glass-card space-y-4"
          >
            <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>Create New Task 🌸</h3>
            <input
              type="text"
              placeholder="Task Title..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="w-full p-3 rounded-xl border text-sm outline-none"
              style={{ background: "var(--bg-card)", color: "var(--text-primary)" }}
            />
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold">Priority:</span>
              {(["LOW", "MEDIUM", "HIGH", "URGENT"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setNewTaskPriority(p)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold text-white transition-transform ${
                    newTaskPriority === p ? "scale-110 ring-2 ring-pink-400" : "opacity-60"
                  }`}
                  style={{ background: priorityColors[p] }}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-muted"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTask}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-pink-400 hover:bg-pink-500"
              >
                Save Task
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
