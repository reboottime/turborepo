# Employee API Service Specification

Minimal NestJS backend to support frontend demo and E2E tests.

## Architecture

```sh
apps/
├── portal/          # Frontend (existing)
└── api/             # NestJS API service
```

---

## Tech Stack

| Layer      | Technology          | Reason                       |
| ---------- | ------------------- | ---------------------------- |
| Framework  | NestJS              | Standard, batteries-included |
| Database   | PostgreSQL + Prisma | Production-ready             |
| Auth       | JWT (passport)      | NestJS native integration    |
| Validation | class-validator     | NestJS native                |

---

## Database Schema

```sh
// apps/api/prisma/schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Employee {
  id         String   @id @default(uuid())
  firstName  String
  lastName   String
  email      String   @unique
  department String   // Engineering|Sales|Design|HR|Marketing|Finance
  phone      String?
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

---

## Auth

Predefined admin user (no registration, no User table).

Credentials configured via environment variables:

- `E2E_TEST_EMAIL` - admin email
- `E2E_TEST_PASSWORD` - admin password

---

## Endpoints

### Auth

```
POST /auth/login     { email, password } → { accessToken }
```

### Employees (protected)

```
GET    /employees         → { data: Employee[], meta: { total, page, limit, totalPages } }
GET    /employees/:id     → Employee
POST   /employees         → Employee
PATCH  /employees/:id     → Employee
DELETE /employees/:id     → 204
```

Query params for list: `?search=&department=&page=1&limit=10`

---

## Environment

### Local Database (Docker)

```yaml
# apps/api/docker-compose.yml
services:
  db:
    image: postgres:16-alpine
    ports:
      - "5433:5432"
    environment:
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: dev
      POSTGRES_DB: employee_db
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Environment Variables

```bash
# apps/api/.env
DATABASE_URL="postgresql://dev:dev@localhost:5433/employee_db"
JWT_SECRET="dev-secret"
PORT=3002
E2E_TEST_EMAIL="admin@example.com"
E2E_TEST_PASSWORD="your-secure-password"
```

```bash
# apps/api/.env.test
DATABASE_URL="postgresql://dev:dev@localhost:5433/employee_db_test"
JWT_SECRET="test-secret"
PORT=3003
E2E_TEST_EMAIL="admin@example.com"
E2E_TEST_PASSWORD="your-secure-password"
```

### CI Database (GitHub Actions)

```yaml
# In .github/workflows CI job
services:
  postgres:
    image: postgres:16
    env:
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: dev
      POSTGRES_DB: employee_db_test
    ports:
      - 5432:5432
    options: >-
      --health-cmd pg_isready
      --health-interval 10s
      --health-timeout 5s
      --health-retries 5
```

---

## Commands

Run from `apps/api/`:

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start:prod       # Start production server

# Database
pnpm db:up            # Start PostgreSQL (docker compose up -d)
pnpm db:down          # Stop PostgreSQL (docker compose down)
pnpm db:migrate       # Run migrations (deploy)
pnpm db:migrate:dev   # Run migrations (dev, creates migration files)
pnpm db:seed          # Seed mock data
pnpm db:reset         # Drop + migrate + seed
pnpm db:generate      # Regenerate Prisma client
```
