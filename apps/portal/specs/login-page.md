# Login Page - Test Plan

## Overview

Comprehensive test plan for the Portal app login page UI and interactions. This plan covers form rendering, validation, accessibility, user interactions, and success flows.

**Page URL**: http://localhost:3001/login

**Reference**: Based on wireframe in `docs/ux/login-page.md` and auth implementation in `app/login/page.tsx`

---

## Test Scenarios

### 1. Form Rendering

**Objective**: Verify all form elements render correctly with proper labels, placeholders, and initial state.

**Steps**:

1. Navigate to http://localhost:3001/login
2. Wait for page to fully load

**Expected Outcomes**:

- Logo (letter "P" in a colored square) is visible at the top of the card
- Username field is visible with:
  - Label text "Username"
  - Placeholder text "Enter your username"
  - Input type="text"
  - Empty value
- Password field is visible with:
  - Label text "Password"
  - Placeholder text "Enter your password"
  - Input type="password"
  - Empty value
  - Eye icon button on the right side
- Sign In button is visible with:
  - Text "Sign In"
  - Disabled state (greyed out)
- No error messages are shown
- Form is centered in the viewport
- Card has rounded corners and shadow

---

### 2. Empty Form Submit

**Objective**: Verify validation errors appear when submitting an empty form.

**Steps**:

1. Navigate to http://localhost:3001/login
2. Wait for page to fully load
3. Click the Sign In button (without filling any fields)

**Expected Outcomes**:

- Form does not submit
- Username field shows validation error below the input: "Username is required"
- Password field shows validation error below the input: "Password is required"
- Error messages are styled in red color
- Username field has error styling (red border or visual indicator)
- Password field has error styling (red border or visual indicator)
- Sign In button remains disabled

**Accessibility**:

- Username error message is linked to username input via aria-describedby
- Password error message is linked to password input via aria-describedby
- Both inputs have aria-invalid="true"

---

### 3. Username Only Submit

**Objective**: Verify password validation when only username is provided.

**Steps**:

1. Navigate to http://localhost:3001/login
2. Wait for page to fully load
3. Type "testuser" in the Username field
4. Leave Password field empty
5. Click the Sign In button

**Expected Outcomes**:

- Form does not submit
- Username field shows no error (valid)
- Password field shows validation error: "Password is required"
- Password field has error styling
- Username field has normal styling (no error indicator)
- Sign In button remains disabled or returns to disabled state

---

### 4. Password Only Submit

**Objective**: Verify username validation when only password is provided.

**Steps**:

1. Navigate to http://localhost:3001/login
2. Wait for page to fully load
3. Leave Username field empty
4. Type "testpass" in the Password field
5. Click the Sign In button

**Expected Outcomes**:

- Form does not submit
- Username field shows validation error: "Username is required"
- Password field shows no error (valid)
- Username field has error styling
- Password field has normal styling
- Sign In button remains disabled or returns to disabled state

---

### 5. Password Visibility Toggle

**Objective**: Verify the password visibility toggle works correctly and updates accessibility attributes.

**Steps**:

1. Navigate to http://localhost:3001/login
2. Wait for page to fully load
3. Type "mypassword" in the Password field
4. Observe the password field type attribute
5. Click the eye icon button next to the password field
6. Observe the password field type and aria-label
7. Click the eye icon again

**Expected Outcomes**:

- Initially, password field has type="password" (characters are masked)
- Eye icon button has aria-label="Show password"
- After first click:
  - Password field type changes to type="text" (characters are visible)
  - Eye icon button aria-label changes to "Hide password"
  - The text "mypassword" is visible in plain text
- After second click:
  - Password field type returns to type="password" (characters masked again)
  - Eye icon button aria-label returns to "Show password"
  - The text is masked again

**Accessibility**:

- Eye icon button has appropriate aria-label at all times
- Toggle button is keyboard accessible

---

### 6. Button Disabled State

**Objective**: Verify Sign In button enables/disables based on field values.

**Steps**:

1. Navigate to http://localhost:3001/login
2. Wait for page to fully load
3. Observe Sign In button state (should be disabled)
4. Type "user" in the Username field
5. Observe Sign In button state
6. Type "pass" in the Password field
7. Observe Sign In button state
8. Clear the Username field
9. Observe Sign In button state
10. Type "user" in the Username field again
11. Observe Sign In button state

**Expected Outcomes**:

- Initially: Sign In button is disabled, has reduced opacity
- After step 4 (username only): Button remains disabled
- After step 6 (both fields filled): Button becomes enabled, full opacity
- After step 8 (username cleared): Button becomes disabled again
- After step 10 (both fields filled again): Button becomes enabled again

---

### 7. Successful Login

**Objective**: Verify successful login flow with loading state and redirect.

**Steps**:

1. Navigate to http://localhost:3001/login
2. Wait for page to fully load
3. Type "testuser" in the Username field
4. Type "testpass" in the Password field
5. Click the Sign In button
6. Observe button state immediately
7. Wait for redirect

**Expected Outcomes**:

- After clicking Sign In:
  - Button shows loading state (spinner icon replaces text)
  - Button becomes disabled
  - Username field becomes read-only
  - Password field becomes read-only
- After ~1 second (simulated API delay):
  - Page redirects to /employees
  - URL is http://localhost:3001/employees
  - Employees page content is visible
  - Sign Out button is visible in navigation

**Auth Behavior**:

- Cookie `portal_auth=authenticated` is set
- User can access protected routes

---

### 8. Tab Order

**Objective**: Verify keyboard navigation follows the correct tab order.

**Steps**:

1. Navigate to http://localhost:3001/login
2. Wait for page to fully load
3. Press Tab key
4. Observe focus (should be on Username field)
5. Press Tab key again
6. Observe focus (should be on Password field)
7. Press Tab key again
8. Observe focus (should be on Password visibility toggle button)
9. Press Tab key again
10. Observe focus (should be on Sign In button)

**Expected Outcomes**:

- Tab order: Username → Password → Password Toggle → Sign In
- Focus indicators are clearly visible at each step
- Shift+Tab reverses the order
- No focus traps or unexpected tab stops

---

### 9. Enter Key Submit

**Objective**: Verify pressing Enter in the password field submits the form.

**Steps**:

1. Navigate to http://localhost:3001/login
2. Wait for page to fully load
3. Type "testuser" in the Username field
4. Type "testpass" in the Password field
5. Press Enter key (while focus is in Password field)
6. Wait for redirect

**Expected Outcomes**:

- Form submits (same behavior as clicking Sign In button)
- Loading state appears
- After ~1 second, redirects to /employees
- No console errors

**Alternative Flow**:

1. Navigate to http://localhost:3001/login
2. Type "testuser" in Username field
3. Press Enter (while in Username field, password empty)
4. Observe validation error for password

---

### 10. Accessibility - Labels and ARIA

**Objective**: Verify proper accessibility attributes for screen readers.

**Steps**:

1. Navigate to http://localhost:3001/login
2. Wait for page to fully load
3. Inspect Username field
4. Inspect Password field
5. Submit form with empty fields
6. Inspect error messages
7. Click password visibility toggle
8. Inspect toggle button

**Expected Outcomes**:

**Username Field**:

- Has a `<label>` element with `for` attribute matching input id
- Label text is "Username"
- No aria-invalid initially
- After validation error: aria-invalid="true"
- After validation error: aria-describedby points to error message element

**Password Field**:

- Has a `<label>` element with `for` attribute matching container id
- Label text is "Password"
- No aria-invalid initially
- After validation error: aria-invalid="true"
- After validation error: aria-describedby points to error message element

**Error Messages**:

- Each error message has a unique id
- Error message id matches the aria-describedby on the input
- Error messages are announced by screen readers when they appear

**Password Toggle Button**:

- Has aria-label="Show password" initially
- Changes to aria-label="Hide password" when password is visible
- Button is keyboard accessible

**Sign In Button**:

- Has descriptive text "Sign In"
- Disabled state is properly communicated (disabled attribute)

---

## Test Data

### Valid Credentials (Demo Mode)

- **Username**: Any non-empty string (e.g., "testuser", "admin", "user123")
- **Password**: Any non-empty string (e.g., "testpass", "password", "12345")

### Expected Behavior

- Demo mode accepts any non-empty credentials
- 1 second simulated API delay
- Sets cookie: `portal_auth=authenticated`
- Redirects to: `/employees`

---

## Assumptions

- Tests start from a blank/fresh state (no existing authentication)
- Application is running at http://localhost:3001
- Browser has JavaScript enabled
- No network issues or server errors
- Demo authentication mode is active (as per `lib/auth-context.tsx`)

---

## Out of Scope

The following scenarios are covered in `e2e/auth-flow.spec.ts` and are NOT part of this login page UI test plan:

- Unauthenticated redirect flows (root → login, protected routes → login)
- Authenticated redirect flows (login → app when already logged in)
- Sign out functionality
- Auth persistence across page reloads
- Protected route access control

---

## Success Criteria

All test scenarios pass with:

- Correct visual rendering
- Proper validation behavior
- Accessible form elements and error messages
- Correct keyboard navigation
- Successful login and redirect
- No console errors or warnings

---

## Notes

- Server errors (e.g., invalid credentials from real API) are not tested in demo mode since all non-empty credentials are accepted
- The red error banner for server errors (as shown in wireframe) may need separate testing if/when real API is connected
- Password visibility toggle implementation should maintain security best practices
