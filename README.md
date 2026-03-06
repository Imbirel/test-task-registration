# Fullstack Registration System (Test Task)

Тестовое задание: регистрация в два шага (React + NestJS + Prisma + PostgreSQL).

## Стек технологий
- **Frontend:** React, TypeScript, Tailwind CSS, Vite.
- **Backend:** NestJS, Prisma ORM, Swagger, Zod.
- **Инфраструктура:** Docker (PostgreSQL), Monorepo (pnpm workspaces).

## Требования
- Node.js (v18+)
- pnpm (v8+)
- Docker & Docker Compose

## Быстрый запуск

1. **Клонируйте репозиторий:**

```bash
git clone <url>
cd test-task-registration
```

2. **Настройте переменные окружения:**

В папке packages/database переименуйте файл `.env.example` в `.env`

3. **Запустите автоматическую настройку:**

Эта команда установит зависимости, поднимет базу в Docker.

```bash
pnpm run setup
```

4. **Запустите проект:**

```bash
pnpm run dev
```

Frontend: http://localhost:5173
Backend API: http://localhost:3000/api
Swagger (API Docs): http://localhost:3000/api/docs

## API Эндпоинты

POST /api/users/register — Регистрация пользователя.
GET /api/users — Список зарегистрированных пользователей.
DELETE /api/users/:id — Удаление пользователя.

















