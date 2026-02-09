# Login Page

Source: `/docs/portal/ux/app.portal/flows/login-page.md`

## Scenario: Successful login redirects to Employee Management

**Setup:** Fresh test user with valid credentials

**Steps:**

1. Navigate to `/login`
2. Enter email in email field
3. Enter password in password field
4. Click "Sign In" button → wait for navigation away from `/login`

**Expected:** URL is `/employees`, Employee Management page content visible

**Mocks:** none

---

## Scenario: Invalid credentials shows error

**Setup:** None (using invalid credentials intentionally)

**Steps:**

1. Navigate to `/login`
2. Enter `wrong@email.com` in email field
3. Enter `wrongpassword` in password field
4. Click "Sign In" button → wait for error banner visible

**Expected:** Error banner with "Invalid username or password" text displayed, user remains on `/login`

**Mocks:** none

---

## Scenario: Authenticated user redirected away from login

**Setup:** User already authenticated (logged in via previous scenario or auth state injection)

**Steps:**

1. Complete login flow (or inject auth state)
2. Navigate directly to `/login` → wait for navigation

**Expected:** Automatically redirected to `/employees`, login form never displayed

**Mocks:** none
