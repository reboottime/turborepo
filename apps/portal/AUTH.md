# Authentication Flow

## Overview

The portal app implements route protection using Next.js middleware and a React Context-based auth system. This is a demo implementation using cookies for authentication state.

## Implementation

### Components

1. **Auth Context** (`lib/auth-context.tsx`)
   - Client-side React Context providing auth state and methods
   - Uses cookies to persist authentication across page reloads
   - Exports `useAuth()` hook for accessing auth state in components

2. **Middleware** (`middleware.ts`)
   - Server-side route protection
   - Checks auth cookie before rendering routes
   - Handles redirects based on auth state

3. **App Layout** (`app/(app)/layout.tsx`)
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
2. Middleware checks for `portal_auth` cookie
3. If no cookie, redirect to `/login`
4. User enters credentials (any non-empty values work in demo)
5. On successful login:
   - `signIn()` sets auth cookie (7-day expiry)
   - User redirected to `/employees`
6. On sign out:
   - `signOut()` clears auth cookie
   - User redirected to `/login`

## Demo Credentials

Since this is a demo/portfolio project, **any non-empty username and password will authenticate successfully**. The point is demonstrating the routing protection pattern, not implementing real authentication.

## For Production Use

Replace mock implementation with:

- Real API authentication endpoints
- Secure session tokens (JWT, session IDs)
- HTTPS-only, httpOnly cookies
- CSRF protection
- Refresh token mechanism
- Proper error handling and rate limiting
