import type { Task } from "@/types/task";

const MOCK_TASKS: Task[] = [
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
    subtasks: [],
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
    subtasks: [],
  },
];

export const taskService = {
  async list(): Promise<Task[]> {
    return Promise.resolve(MOCK_TASKS);
  },
};
