# Authentication Flow

## Overview

The portal app implements route protection using Next.js middleware and a React Context-based auth system. Authentication tokens are obtained from a backend API and stored in localStorage.

## Implementation

### Components

1. **Auth Context** (`lib/auth-context.tsx`)
   - Client-side React Context providing auth state and methods
   - Stores JWT access token in localStorage (`portal_token`)
   - Sets a sync cookie (`portal_token_exists`) for middleware to detect auth state
   - Exports `useAuth()` hook for accessing auth state in components

2. **API Client** (`lib/api-client.ts`)
   - Handles API requests with Bearer token authentication
   - `login()` method calls `/auth/login` endpoint
   - Sets Authorization header on all authenticated requests

3. **Middleware** (`middleware.ts`)
   - Server-side route protection
   - Checks for `portal_token_exists` sync cookie (cannot access localStorage)
   - Handles redirects based on auth state

4. **App Layout** (`app/(app)/layout.tsx`)
   - Provides navigation header with sign-out button
   - Wraps all authenticated routes

### Route Protection Rules

| User State      | Route                            | Action                   |
| --------------- | -------------------------------- | ------------------------ |
| Unauthenticated | `/`                              | Redirect to `/login`     |
| Unauthenticated | `/login`                         | Allow access             |
| Unauthenticated | `/employees` or other app routes | Redirect to `/login`     |
| Authenticated   | `/`                              | Redirect to `/employees` |
| Authenticated   | `/login`                         | Redirect to `/employees` |
| Authenticated   | `/employees` or other app routes | Allow access             |

### Auth Flow

1. User visits portal
2. Middleware checks for `portal_token_exists` sync cookie
3. If no cookie, redirect to `/login`
4. User enters email and password
5. On form submit:
   - `signIn()` calls `apiClient.login({ email, password })`
   - Backend validates credentials, returns `accessToken`
   - Token stored in localStorage (`portal_token`)
   - Sync cookie set (`portal_token_exists=true`)
   - API client configured with token for subsequent requests
   - User redirected to `/employees`
6. On sign out:
   - Token removed from localStorage
   - Sync cookie cleared
   - API client token cleared
   - User redirected to `/login`

## Storage Strategy

- **Token storage**: localStorage for persistent cross-tab access
- **Middleware sync**: Cookie (`portal_token_exists`) because middleware can't access localStorage
- **API authentication**: Bearer token in Authorization header

## For Production Use

Current implementation could be enhanced with:

- Refresh token mechanism for token expiry
- HTTPS-only, httpOnly cookies for token storage (more secure than localStorage)
- CSRF protection
- Rate limiting on login attempts
