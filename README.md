# KMSTUDIO — BOSS Foundation

KMSTUDIO is a tailoring ERP/CRM frontend built with Vite, React and TypeScript.
This branch adds the independent BOSS backend (Express + Prisma + PostgreSQL)
without changing the existing screens or seed data.

## Prerequisites

- Node.js 22+
- A PostgreSQL database (the project is developed against Neon)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the environment template and fill in the values:
   ```bash
   cp .env.example .env
   ```
3. Apply the database migrations:
   ```bash
   npm run db:migrate:deploy
   ```
4. Generate the Prisma client (also runs on `npm install`):
   ```bash
   npm run db:generate
   ```

## Environment variables

| Variable | Purpose | Default |
| --- | --- | --- |
| `DATABASE_URL` | PostgreSQL connection string for Prisma | required |
| `API_PORT` | Port the BOSS API listens on | `4000` |
| `NODE_ENV` | `development`, `test` or `production` | `development` |
| `CORS_ORIGIN` | Allowed origins, comma separated (or `*`) | `*` |
| `GEMINI_API_KEY` | Existing frontend Gemini key | — |
| `APP_URL` | Existing frontend app URL | — |

Environment variables are validated with Zod when the API starts. Invalid or
missing required values stop startup with a descriptive error.

## Development

| Command | Description |
| --- | --- |
| `npm run dev` | Vite frontend on port 3001 |
| `npm run dev:api` | BOSS API with watch mode on `API_PORT` |
| `npm run dev:all` | Frontend and API together |
| `npm run start:api` | BOSS API without watch mode |
| `npm run build` | Production build of the frontend |
| `npm run lint` | TypeScript checks for frontend and API |
| `npm test` | API, database and environment tests |

The frontend still runs on `http://localhost:3001`; the API runs independently
on `http://localhost:4000`.

## API

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/` | Service metadata |
| `GET` | `/api/v1/health` | Liveness + PostgreSQL connectivity |

Example health response:

```json
{
  "status": "ok",
  "service": "kmstudio-boss-api",
  "version": "0.1.0",
  "timestamp": "2026-11-12T00:00:00.000Z",
  "uptimeSeconds": 12,
  "database": { "status": "up", "latencyMs": 4 }
}
```

Returns `503` with `status: "degraded"` if PostgreSQL cannot be reached.

## Database

The initial schema lives in `prisma/schema.prisma` and covers clients,
measurements, photos, suppliers, inventory, sales orders, invoices, purchase
orders and activity logs. The first migration is in
`prisma/migrations/`.

| Command | Description |
| --- | --- |
| `npm run db:migrate` | Create/apply a migration in development |
| `npm run db:migrate:deploy` | Apply committed migrations (CI/production) |
| `npm run db:generate` | Regenerate the Prisma client |
| `npm run db:studio` | Open Prisma Studio |

## Tests

```bash
npm test
```

The suite verifies environment validation, the health endpoint and real
PostgreSQL connectivity, including that a migration has been applied.

## Baseline

Before the BOSS changes the repository passed `npm run lint` and `npm run build`.
Both are still expected to pass on this branch.
