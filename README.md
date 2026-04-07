# Toybola Website

B2B Product Catalog Platform for Toybola — a modern, full-stack web application for managing and displaying a B2B product catalog.

## Tech Stack

**Backend:**
- NestJS (TypeScript)
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Swagger/OpenAPI documentation
- Excel import functionality

**Frontend:**
- Vue 3 (Composition API)
- Pinia (state management)
- Vue Router
- Tailwind CSS
- Vite

## Quick Start

### Prerequisites
- Node.js >= 20
- npm >= 9
- PostgreSQL database (or Docker)

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ski2ly/toybola-website.git
   cd toybola-website
   ```

2. **Install dependencies:**
   ```bash
   npm run setup
   ```

3. **Start PostgreSQL (using Docker):**
   ```bash
   npm run docker:up
   ```

4. **Configure environment variables:**
   
   Backend (`backend/.env`):
   ```bash
   cp backend/.env.example backend/.env
   ```
   
   Edit `backend/.env` and set:
   - `DATABASE_URL` — your PostgreSQL connection string
   - `JWT_SECRET` — a strong random string (REQUIRED)
   - `ADMIN_PASSWORD` — password for the default admin user (optional, defaults to `admin123`)
   
   Frontend (`frontend/.env`):
   ```bash
   cp frontend/.env.example frontend/.env
   ```

5. **Run database migrations and seed:**
   ```bash
   npm run prisma:migrate
   npm run prisma:seed
   ```

6. **Start development servers:**
   ```bash
   npm run dev
   ```
   
   - Backend: http://localhost:3000
   - Swagger: http://localhost:3000/api/docs
   - Frontend: http://localhost:5173

### Default Admin Credentials
After running the seed script, login with:
- Email: `admin@toybola.com`
- Password: value of `ADMIN_PASSWORD` env var (default: `admin123`)

> **Security Note:** Change the default admin password in production!

## Project Structure

```
toybola-website/
├── backend/           # NestJS API server
│   ├── src/
│   │   ├── auth/      # Authentication module
│   │   ├── products/  # Products CRUD
│   │   ├── categories/# Categories CRUD
│   │   ├── admin/     # Admin panel API
│   │   ├── import/    # Excel import functionality
│   │   ├── contact-form/
│   │   ├── seo/       # Sitemap, SEO utilities
│   │   └── page-blocks/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   └── uploads/       # Uploaded files
├── frontend/          # Vue 3 SPA
│   ├── src/
│   │   ├── pages/     # Route components
│   │   ├── components/
│   │   ├── stores/    # Pinia stores
│   │   ├── services/  # API clients
│   │   └── router/
│   └── public/
└── docker-compose.yml # PostgreSQL + Adminer
```

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run setup` | Install all dependencies |
| `npm run dev` | Start both backend and frontend |
| `npm run dev:backend` | Start backend only |
| `npm run dev:frontend` | Start frontend only |
| `npm run build` | Build both for production |
| `npm run docker:up` | Start PostgreSQL + Adminer |
| `npm run docker:down` | Stop containers |
| `npm run prisma:studio` | Open Prisma Studio (DB GUI) |
| `npm run prisma:seed` | Seed database with initial data |

## API Documentation

When the backend is running, visit http://localhost:3000/api/docs for interactive Swagger documentation.

## Deployment

### Backend (Vercel)
The backend is configured for Vercel serverless deployment. See `backend/vercel.json`.

### Frontend (Vercel)
The frontend is configured for Vercel static deployment. See `frontend/vercel.json`.

### Environment Variables for Production
Set these in your hosting platform:

**Backend:**
- `DATABASE_URL` (required)
- `JWT_SECRET` (required — use a strong random string)
- `ALLOWED_ORIGINS` (comma-separated list of frontend URLs)

**Frontend:**
- `VITE_API_URL` (required — backend URL)

## License

Private — All rights reserved
