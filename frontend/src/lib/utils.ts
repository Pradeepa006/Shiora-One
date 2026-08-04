import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", options ?? { month: "short", day: "numeric", year: "numeric" });
}

export function formatTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHrs = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHrs / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHrs < 24) return `${diffHrs}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(d);
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 5) return "Good Night";
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  if (hour < 21) return "Good Evening";
  return "Good Night";
}

export function getGreetingEmoji(): string {
  const hour = new Date().getHours();
  if (hour < 5) return "🌙";
  if (hour < 12) return "🌸";
  if (hour < 17) return "☀️";
  if (hour < 21) return "🌅";
  return "🌙";
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "…";
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 11);
}

export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export const priorityColors: Record<string, string> = {
  URGENT: "#e05c5c",
  HIGH: "#e9a84c",
  MEDIUM: "#8b7fc7",
  LOW: "#6bbf87",
};

export const moodEmojis: Record<string, string> = {
  AMAZING: "😄",
  HAPPY: "🙂",
  NEUTRAL: "😐",
  SAD: "😔",
  VERY_SAD: "😭",
  ANGRY: "😡",
};

export const moodColors: Record<string, string> = {
  AMAZING: "#50a33f",
  HAPPY: "#8b7fc7",
  NEUTRAL: "#e9a84c",
  SAD: "#d4708a",
  VERY_SAD: "#e05c5c",
  ANGRY: "#c0392b",
};
