import { create } from "zustand";
import type { Task, TaskPriority, TaskStatus } from "@/types/task";

interface CreateTaskInput {
  title: string;
  priority: TaskPriority;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  setTasks: (tasks: Task[]) => void;
  setLoading: (value: boolean) => void;
  addTask: (input: CreateTaskInput) => void;
  deleteTask: (id: string) => void;
  setTaskStatus: (id: string, status: TaskStatus) => void;
  toggleTaskCompleted: (id: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  loading: false,
  setTasks: (tasks) => set({ tasks }),
  setLoading: (value) => set({ loading: value }),
  addTask: (input) =>
    set((state) => ({
      tasks: [
        {
          id: `t_${Date.now()}`,
          title: input.title,
          status: "TODO",
          priority: input.priority,
          dueDate: "Today",
          tags: ["Workspace"],
          subtasks: [],
        },
        ...state.tasks,
      ],
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  setTaskStatus: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, status } : task)),
    })),
  toggleTaskCompleted: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id !== id) {
          return task;
        }

        return {
          ...task,
          status: task.status === "COMPLETED" ? "TODO" : "COMPLETED",
        };
      }),
    })),
}));
