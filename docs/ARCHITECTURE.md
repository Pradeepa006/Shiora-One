# 🏗️ Shiora One System Architecture

```
[ Frontend: Next.js 15 / React 19 / Framer Motion ]
                     │  (HTTP / REST / JSON)
                     ▼
[ NGINX / Cloudflare Reverse Proxy ]
                     │
                     ▼
[ Backend: Spring Boot 3 REST API ]
   ├── Spring Security Filter (JWT Token Verification)
   ├── Service Layer & MapStruct Mappers
   └── Data Repositories (Spring Data JPA)
                     │
         ┌───────────┴───────────┐
         ▼                       ▼
[ PostgreSQL 16 DB ]     [ Redis Caching Engine ]
 (Flyway Schema DDL)     (Session & Mood Cache)
```

## System Components

1. **Frontend App Router (`/src/app`)**:
   - `(auth)`: Unauthenticated routes (Login, Register, Forgot Password)
   - `(dashboard)`: Authenticated workspace layout with Sidebar, Header, Dock, and Floating Orbs.

2. **Backend Domain Modules (`/com/shiora/one`)**:
   - `auth`: JWT token provider & Spring Security integration
   - `task`: Task management with Kanban status & priorities
   - `note`: Notion-like note hierarchy
   - `alarm`: Wake challenges & schedule management
   - `mood`: Mood logging & Lofi music recommendation engine
   - `pet`: Interactive pet companion XP engine
   - `journey`: Gamification XP calculation & achievement badges

3. **Database Schema (`V1__init_schema.sql`)**:
   - Normalized PostgreSQL schema with UUID keys, foreign keys on delete cascade, and B-tree indexes on frequent queries (`user_id`, `email`, `status`).
