# API Integration Guide

## Overview

The portal app now integrates with the NestJS API service running at `http://localhost:3002`.

## Setup

1. **Environment Configuration**
   - Copy `.env.example` to `.env.local`
   - Default API URL is `http://localhost:3002`

2. **Start the API Service**

   ```bash
   # In apps/api directory
   pnpm dev
   ```

3. **Start the Portal App**
   ```bash
   # In apps/portal directory or from root
   pnpm --filter @repo/portal dev
   ```

## Authentication Flow

### Login Process

1. User enters email and password on `/login` page
2. `auth-context.tsx` calls `POST /auth/login` via `api-client.ts`
3. On success, JWT token is stored in:
   - `localStorage` (key: `auth_token`) - for API calls
   - Cookie (key: `portal_auth`) - for middleware route protection
4. API client sets the JWT token in `Authorization` header for all subsequent requests
5. User is redirected to `/employees`

### Credentials

- **Admin**: `admin@demo.com` / `admin123`

### Logout Process

1. User clicks logout in app header
2. `auth-context.tsx` clears both localStorage and cookie
3. User is redirected to `/login`

## API Client

**File**: `lib/api-client.ts`

### Features

- Typed endpoints for all API operations
- Automatic JWT token injection in request headers
- Error handling with typed error responses
- Request/response type safety

### Available Methods

**Authentication:**

- `login(data: LoginRequest): Promise<LoginResponse>`

**Employees:**

- `getEmployees(params?): Promise<EmployeesResponse>`
  - Supports: `search`, `department`, `page`, `limit` query params
- `getEmployee(id: string): Promise<Employee>`
- `createEmployee(data: EmployeeFormData): Promise<Employee>`
- `updateEmployee(id: string, data: EmployeeFormData): Promise<Employee>`
- `deleteEmployee(id: string): Promise<void>`

## Employee Management Flow

### List Employees

1. Page loads and calls `apiClient.getEmployees()` with current filters/pagination
2. API returns paginated response with metadata
3. Results displayed in table, pagination updated from metadata

### Create Employee

1. User clicks "Add Employee" button
2. Form dialog opens
3. On submit, calls `apiClient.createEmployee(data)`
4. On success, refetches employee list to show new entry
5. Success toast notification displayed

### Update Employee

1. User clicks edit icon on employee row
2. Form dialog opens with pre-filled data
3. On submit, calls `apiClient.updateEmployee(id, data)`
4. On success, refetches employee list to show updates
5. Success toast notification displayed

### Delete Employee

1. User clicks delete icon on employee row
2. Confirmation dialog opens
3. On confirm, calls `apiClient.deleteEmployee(id)`
4. On success, refetches employee list
5. Success toast notification displayed

## Error Handling

All API errors are caught and displayed to users via toast notifications:

- Login errors: shown in login form error banner
- CRUD errors: shown as error toast notifications
- Network errors: gracefully handled with user-friendly messages

## File Changes

### New Files

- `lib/api-client.ts` - API client with typed endpoints
- `.env.local` - Environment variables (gitignored)
- `.env.example` - Environment variables template

### Modified Files

- `lib/auth-context.tsx` - Updated to use JWT authentication
- `app/login/page.tsx` - Changed from username to email field
- `app/(app)/employees/page.tsx` - Replaced mock data with API calls
- `app/(app)/employees/_lib/types.ts` - Added `createdAt` and `updatedAt` fields
- `app/(app)/employees/_components/employee-form-dialog.tsx` - Added loading state for async saves
- `app/(app)/employees/_components/employee-delete-dialog.tsx` - Added loading state for async deletes

### Removed Files

- `app/(app)/employees/_lib/mock-data.ts` - No longer needed with real API

## Type Safety

All API responses are typed:

```typescript
interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: Department;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

interface EmployeesResponse {
  data: Employee[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
```

## Testing the Integration

1. Start both API and portal apps
2. Navigate to `http://localhost:3001`
3. Login with `admin@demo.com` / `admin123`
4. Test CRUD operations:
   - View employee list
   - Search and filter employees
   - Add new employee
   - Edit existing employee
   - Delete employee
5. Test logout and re-login

## Notes

- Pagination is server-side (API handles filtering and pagination)
- JWT token stored in localStorage for API calls
- Auth cookie set for Next.js middleware route protection
- All operations include proper loading states
- Error messages are user-friendly and actionable
