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
git clone https://github.com/Imbirel/test-task-registration.git
cd test-task-registration
```

2. **Настройте переменные окружения:**

Создайте файл .env на основе .env.example:

```bash
cp .env.example .env
```

3. **Запустите автоматическую настройку:**

Эта команда установит зависимости, поднимет базу в Docker.

```bash
pnpm run setup
```

4. **Запустите проект:**

```bash
pnpm run dev
```


## Доступ к сервисам

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000/api/v1
- Swagger Docs: http://localhost:3000/api/docs


## API Эндпоинты (v1)

- POST /api/v1/users/register — Регистрация пользователя.
- GET /api/v1/users — Список зарегистрированных пользователей.
- DELETE /api/v1/users/:id — Удаление пользователя по UUID.












