# Login Page — User Flows

## Flow 1: Sign in to the portal

**Goal:** Authenticate and reach the employee management page.

```
Arrive at login (direct visit / redirect from protected page / after sign out)
  → Enter username and password → Click "Sign In"
    → [Success] Redirect to Employee Management page
    → [Empty fields] Inline errors shown → Fill fields → Submit again
    → [Wrong credentials] Error banner: "Invalid username or password" → Correct and retry
    → [Server error] Error banner: "An error occurred" → Retry
```

## Flow 2: Authenticated user visits login page

**Goal:** Prevent authenticated users from accessing the login page.

```
Authenticated user navigates to /login
  → [Already authenticated] Automatic redirect to Employee Management page
  → User never sees the login form
```

---

## Entry Points

- Direct navigation (unauthenticated)
- Redirect from a protected page
- After signing out

## Exit Points

- Successful login → Employee Management page
