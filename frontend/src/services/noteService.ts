import type { Note } from "@/types/note";

const MOCK_NOTES: Note[] = [
  {
    id: "n1",
    title: "Shiora Architecture & Design Guidelines",
    content: `# Shiora One System Architecture\n\nA peaceful Japanese digital workspace built with:\n- Next.js 15 App Router\n- Spring Boot 3 REST APIs\n- PostgreSQL and Redis Caching`,
    folder: "Architecture",
    tags: ["Dev", "Design"],
    pinned: true,
    color: "#d4708a",
    updatedAt: "Just now",
  },
  {
    id: "n2",
    title: "Daily Reflections",
    content: "Today felt calm and productive. Remember to take tea breaks.",
    folder: "Journal",
    tags: ["Mindfulness"],
    pinned: false,
    color: "#6bbf87",
    updatedAt: "2h ago",
  },
];

export const noteService = {
  async list(): Promise<Note[]> {
    return Promise.resolve(MOCK_NOTES);
  },
};
