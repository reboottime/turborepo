# Employee Page — User Flows

## Flow 1: Add a new employee

**Goal:** Register a new team member in the system.

```
Login → Land on employee table → Click "+ Add Employee"
  → Fill out form → Save
    → [Valid] Modal closes, toast confirms, employee appears in table
    → [Invalid] Inline errors shown → Fix fields → Save again
    → [Cancel] Modal closes, nothing changes
```

---

## Flow 2: Find and update an employee

**Goal:** Locate a specific employee and change their information.

```
Land on employee table → Search by name/email OR filter by department
  → [Found] Click edit icon on row → Modal opens with current data
    → Change fields → Save
      → [Success] Modal closes, toast confirms, table reflects changes
      → [Failure] Error toast, modal stays open, retry
  → [Not found] Adjust search/filter and try again
```

---

## Flow 3: Remove an employee

**Goal:** Delete an employee record that's no longer needed.

```
Land on employee table → Find employee (search/filter or browse)
  → Click delete icon → Confirmation dialog: "Are you sure?"
    → [Confirm] Employee removed, toast confirms, table refreshes
    → [Cancel] Dialog closes, nothing changes
```

---

## Flow 4: Browse the employee directory

**Goal:** Review who's in the system, optionally narrowed by department.

```
Land on employee table → Scan table
  → [Too many results] Filter by department and/or search
  → [Multiple pages] Paginate through results
  → [Empty state] "No employees found" — prompted to add one
```

---

## Entry Points

- Redirect after login
- Click "Employees" in navigation header
- Direct URL navigation

## Exit Points

- Sign Out → Login page
