# Employee Page

Source: `/docs/portal/ux/app.portal/flows/employee-page.md`

## Scenario: Add new employee

**Setup:** Authenticated user on `/employees`

**Steps:**

1. Click "+ Add Employee" button → wait for modal visible
2. Fill name field with unique test name (e.g., `Test User {timestamp}`)
3. Fill email field with unique email (e.g., `test.{timestamp}@example.com`)
4. Select department from dropdown
5. Click "Save" button → wait for modal to close

**Expected:** Success toast displayed, new employee appears in table

**Mocks:** none

---

## Scenario: Edit existing employee

**Setup:** Authenticated user on `/employees` with at least one employee in table

**Steps:**

1. Locate an employee row in table
2. Click edit icon on that row → wait for modal visible with pre-filled data
3. Change name field to new value
4. Click "Save" button → wait for modal to close

**Expected:** Success toast displayed, updated name visible in table row

**Mocks:** none

---

## Scenario: Delete employee

**Setup:** Authenticated user on `/employees` with at least one employee in table

**Steps:**

1. Locate an employee row in table
2. Click delete icon on that row → wait for confirmation dialog visible
3. Click "Confirm" button → wait for dialog to close

**Expected:** Success toast displayed, employee no longer in table

**Mocks:** none
