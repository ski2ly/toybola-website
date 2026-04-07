# Quick Start Guide

## 1. Installation

```bash
npm run setup
```

## 2. Configure Environment

Copy `.env.example` to `.env` in both `backend/` and `frontend/` directories:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

**Required variables:**
- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET` — strong random string (REQUIRED for security)

## 3. Start Database

```bash
npm run docker:up
```

## 4. Initialize Database

```bash
npm run prisma:migrate
npm run prisma:seed
```

## 5. Start Development

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Swagger Docs: http://localhost:3000/api/docs

## Default Admin

After seeding, login with:
- Email: `admin@toybola.com`
- Password: value of `ADMIN_PASSWORD` (default: `admin123`)

## Troubleshooting

- **"JWT_SECRET environment variable is required"** — Set `JWT_SECRET` in `backend/.env`
- **Database connection error** — Ensure PostgreSQL is running (`npm run docker:up`)
- **Port already in use** — Check if ports 3000, 5173, or 5432 are occupied
