# 🚀 Deployment Guide for Shiora One

## 1. Deploy Frontend to Vercel

1. Push your repository to GitHub.
2. Import project in Vercel.
3. Set root directory to `frontend`.
4. Configure environment variables:
   - `NEXT_PUBLIC_API_URL`: Your Railway/Render backend deployment URL.
5. Deploy! Next.js 15 App Router will automatically build.

## 2. Deploy Backend to Railway / Render

1. Create a PostgreSQL database on Neon PostgreSQL or Railway PostgreSQL.
2. Create a Redis instance on Redis Cloud.
3. Deploy `backend` directory using the provided `backend/Dockerfile`.
4. Configure Environment Variables:
   - `DATABASE_URL`: `jdbc:postgresql://<neon-host>:5432/<db_name>?sslmode=require`
   - `DATABASE_USERNAME`: `<db_username>`
   - `DATABASE_PASSWORD`: `<db_password>`
   - `REDIS_HOST`: `<redis_host>`
   - `JWT_SECRET`: `<your_secure_256bit_secret>`
