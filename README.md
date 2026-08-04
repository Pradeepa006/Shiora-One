# 🌸 Shiora One — Your Peaceful Digital Life Companion

> "A calm digital sanctuary where productivity, wellness, organization, and personal growth come together beautifully."

---

## 🌌 Overview

**Shiora One** is an enterprise-grade Japanese digital workspace designed to replace stressful task managers with a serene, rewarding digital operating system. Inspired by **Japanese Minimalism, Wabi-Sabi, Soft Glassmorphism, and Anime UI**, Shiora One combines:

- **15+ Interconnected Modules**: Tasks, Notion-style Notes, Wake Challenge Alarms, Mood Tracker, Habit Heatmaps, Pomodoro Sanctuary, Virtual Pet Companion, Life Journey XP, Calendar, Quotes, and Analytics.
- **Glassmorphism & Spring Animations**: Custom design tokens, cherry blossom particles, and framer-motion micro-interactions.
- **Production Tech Stack**: Next.js 15 App Router, React 19, TailwindCSS, Spring Boot 3, PostgreSQL, Redis, and JWT Authentication.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router) & React 19
- **Styling**: TailwindCSS with Custom CSS Tokens & Glass Utilities
- **Animations**: Framer Motion
- **State & Data**: Zustand, TanStack Query (React Query)
- **Forms & Validation**: React Hook Form, Zod
- **Charts**: Recharts
- **UI Components**: Extended Radix UI & Shadcn UI
- **Toast Notifications**: Sonner

### Backend
- **Framework**: Spring Boot 3.3 (Java 21)
- **Security**: Spring Security & Stateless JWT Authentication
- **Database ORM**: Hibernate / Spring Data JPA
- **Database & Migration**: PostgreSQL 16 & Flyway
- **Caching**: Redis & Spring Cache
- **API Documentation**: OpenAPI 3 & Swagger UI

---

## 📁 Architecture & Structure

```
Shiora-One/
├── frontend/                 # Next.js 15 Application
│   ├── src/app/              # App Router Pages & Layouts
│   │   ├── (auth)/           # Login, Register, Forgot Password
│   │   └── (dashboard)/      # Workspace Modules
│   ├── src/components/       # UI, Layout & Feature Components
│   └── src/styles/           # Global Design System CSS
├── backend/                  # Spring Boot 3 REST API
│   ├── src/main/java/        # Domain Packages (auth, task, mood, pet, etc.)
│   └── src/main/resources/   # YAML Config & Flyway Migration DDL
└── docker-compose.yml        # Orchestration (Postgres + Redis + Spring + Next)
```

---

## ⚡ Quick Start with Docker

```bash
# Clone repository
git clone https://github.com/shiora/shiora-one.git
cd shiora-one

# Spin up entire stack (Database, Redis, Backend & Frontend)
docker-compose up --build
```

Access the app at:
- **Frontend Workspace**: [http://localhost:3000](http://localhost:3000)
- **Swagger API Docs**: [http://localhost:8080/api/swagger-ui.html](http://localhost:8080/api/swagger-ui.html)

---

## 🌸 Key Features

1. **Integrated Workspace**: Draggable floating widgets (Weather, Mood, Lofi Player, Alarms, Tasks, Pet).
2. **Wake Challenge Alarms**: Math & typing challenge dismiss options.
3. **Virtual Pet Companion**: Gain XP by completing real-world tasks to level up your pet.
4. **Notion-Style Notes**: Rich text, markdown support, folders, and tags.
5. **Mood & Music Recommendations**: Automatically recommends Lofi playlists tailored to your mood.

---

## 📜 License

Designed with care by the Shiora One Engineering & UI/UX Team.
