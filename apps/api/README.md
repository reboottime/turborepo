# Employee API

REST API for employee management with JWT authentication.

## Quick Start

```bash
docker-compose up -d  # Start PostgreSQL
cp .env.example .env  # Edit DATABASE_URL if needed
pnpm dev              # Runs on http://localhost:3002
```

## Environment Variables

| Variable       | Required | Default      | Description                  |
| -------------- | -------- | ------------ | ---------------------------- |
| `DATABASE_URL` | Yes      | -            | PostgreSQL connection string |
| `JWT_SECRET`   | No       | `dev-secret` | JWT signing secret           |
| `PORT`         | No       | `3002`       | Server port                  |

## Authentication

Login to get a JWT token (use credentials from `E2E_TEST_EMAIL` and `E2E_TEST_PASSWORD` env vars):

```bash
curl -X POST http://localhost:3002/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "$E2E_TEST_EMAIL", "password": "$E2E_TEST_PASSWORD"}'
```

Response:

```json
{ "access_token": "eyJhbG..." }
```

Use the token in subsequent requests:

```bash
curl http://localhost:3002/employees \
  -H "Authorization: Bearer <token>"
```

## Endpoints

All employee endpoints require authentication.

### List Employees

```
GET /employees?page=1&limit=10&search=john&department=Engineering
```

Query parameters:

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `search` - Search by name or email
- `department` - Filter by department

### Get Employee

```
GET /employees/:id
```

### Create Employee

```
POST /employees
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  "department": "Engineering",
  "phone": "+1234567890"  // optional
}
```

### Update Employee

```
PATCH /employees/:id
Content-Type: application/json

{
  "firstName": "Jane",
  "department": "Design"
}
```

### Delete Employee

```
DELETE /employees/:id
```

## Departments

Valid values: `Engineering`, `Sales`, `Design`, `HR`, `Marketing`, `Finance`
