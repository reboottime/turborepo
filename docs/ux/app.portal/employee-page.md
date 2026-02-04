# Employee Management Page - Wireframe

## Overview

A data-driven page for managing employees in the apps/portal app. Supports viewing all employees in a table, adding new employees, editing existing ones, and deleting employees.

---

## Main Layout

```
+------------------------------------------------------------------+
|  [Logo]    Employee Management               [User] [Logout]     |
+------------------------------------------------------------------+
|                                                                  |
|  Employees                              [ + Add Employee ]       |
|                                                                  |
|  +--------------------------------------------------------------+|
|  | Search: [___________________]    Filter by Dept: [All    v]  ||
|  +--------------------------------------------------------------+|
|                                                                  |
|  +--------------------------------------------------------------+|
|  | #  | Name          | Email             | Dept    | Actions   ||
|  |----|---------------|-------------------|---------|-----------|  |
|  | 1  | Alice Chen    | alice@co.com      | Eng     | [E] [D]  ||
|  | 2  | Bob Smith     | bob@co.com        | Sales   | [E] [D]  ||
|  | 3  | Carol Wu      | carol@co.com      | Design  | [E] [D]  ||
|  | 4  | David Park    | david@co.com      | Eng     | [E] [D]  ||
|  | 5  | Emma Jones    | emma@co.com       | HR      | [E] [D]  ||
|  |    |               |                   |         |           ||
|  +--------------------------------------------------------------+|
|                                                                  |
|  Showing 1-5 of 24 employees     [ < ]  1  2  3  4  5  [ > ]    |
|                                                                  |
+------------------------------------------------------------------+
```

**Legend:** `[E]` = Edit button, `[D]` = Delete button

---

## Component Specification

### Top Navigation Bar
- Left: App logo
- Center/Left: Page title "Employee Management"
- Right: Username display + Logout button
- Background: white, bottom border 1px #E5E7EB
- Height: 56px

### Page Header
- Title: "Employees" (24px, bold)
- "Add Employee" button: right-aligned, primary blue, icon `+` prefix
- Margin-bottom: 16px

### Toolbar
- Search input: 300px wide, placeholder "Search by name or email..."
- Department filter: dropdown, default "All Departments"
- Background: #F9FAFB, padding 12px, rounded 8px

### Employee Table
- Full width
- Header row: bold, background #F9FAFB
- Columns:

| Column   | Width | Alignment | Sortable |
|----------|-------|-----------|----------|
| #        | 60px  | Center    | Yes      |
| Name     | flex  | Left      | Yes      |
| Email    | flex  | Left      | Yes      |
| Dept     | 120px | Left      | Yes      |
| Actions  | 120px | Center    | No       |

- Row height: 48px
- Hover state: light blue background (#F0F7FF)
- Alternating row colors optional (white / #FAFAFA)

### Action Buttons (per row)
- Edit: icon button (pencil icon), tooltip "Edit employee"
- Delete: icon button (trash icon), tooltip "Delete employee", red on hover

### Pagination
- Bottom of table
- Shows: "Showing X-Y of Z employees"
- Page buttons: numbered, max 5 visible
- Previous/Next arrows
- Active page: blue background

---

## Add Employee - Modal

Triggered by clicking "+ Add Employee" button.

```
+------------------------------------------------------------------+
|                                                                  |
|         +--------------------------------------+                 |
|         |  Add Employee                    [X] |                 |
|         |                                      |                 |
|         |  First Name *                        |                 |
|         |  +----------------------------------+|                 |
|         |  |                                  ||                 |
|         |  +----------------------------------+|                 |
|         |                                      |                 |
|         |  Last Name *                         |                 |
|         |  +----------------------------------+|                 |
|         |  |                                  ||                 |
|         |  +----------------------------------+|                 |
|         |                                      |                 |
|         |  Email *                             |                 |
|         |  +----------------------------------+|                 |
|         |  |                                  ||                 |
|         |  +----------------------------------+|                 |
|         |                                      |                 |
|         |  Department *                        |                 |
|         |  +----------------------------------+|                 |
|         |  | Select department           v   ||                 |
|         |  +----------------------------------+|                 |
|         |                                      |                 |
|         |  Phone                               |                 |
|         |  +----------------------------------+|                 |
|         |  |                                  ||                 |
|         |  +----------------------------------+|                 |
|         |                                      |                 |
|         |         [ Cancel ]  [ Save ]         |                 |
|         +--------------------------------------+                 |
|                                                                  |
+------------------------------------------------------------------+
```

### Modal Specification
- Width: 480px, centered
- Background overlay: black at 50% opacity
- Close: X button or Cancel button or click overlay
- Border-radius: 12px

### Form Fields

| Field      | Type     | Required | Validation                 |
|------------|----------|----------|----------------------------|
| First Name | text     | Yes      | Min 1 char, max 50         |
| Last Name  | text     | Yes      | Min 1 char, max 50         |
| Email      | email    | Yes      | Valid email format, unique  |
| Department | dropdown | Yes      | Must select one             |
| Phone      | tel      | No       | Valid phone format if given |

### Buttons
- Cancel: secondary style (outlined), closes modal
- Save: primary blue, submits form
- Save disabled until all required fields valid

---

## Edit Employee - Modal

Same layout as Add Employee modal, with these differences:

```
|         |  Edit Employee                  [X] |                 |
```

- Title: "Edit Employee"
- Fields pre-populated with existing data
- Save button text: "Save Changes"
- Same validation rules apply

---

## Delete Employee - Confirmation Dialog

Triggered by clicking the delete (trash) icon on a row.

```
         +--------------------------------------+
         |  Delete Employee                 [X] |
         |                                      |
         |  Are you sure you want to delete     |
         |  "Alice Chen"?                       |
         |                                      |
         |  This action cannot be undone.        |
         |                                      |
         |         [ Cancel ]  [ Delete ]       |
         +--------------------------------------+
```

### Dialog Specification
- Width: 400px, centered
- Employee name in bold
- Warning text: #6B7280 (gray)
- Cancel: secondary style
- Delete: red background (#EF4444), white text
- Escape key or overlay click cancels

---

## States & Behavior

### Empty State (no employees)

```
|  +--------------------------------------------------------------+|
|  |                                                              ||
|  |              [illustration / icon]                           ||
|  |                                                              ||
|  |           No employees found.                                ||
|  |           Click "+ Add Employee" to get started.             ||
|  |                                                              ||
|  +--------------------------------------------------------------+|
```

### Search - No Results

```
|  +--------------------------------------------------------------+|
|  |                                                              ||
|  |           No employees match "xyz".                          ||
|  |           Try a different search term.                       ||
|  |                                                              ||
|  +--------------------------------------------------------------+|
```

### Loading State
- Table body shows skeleton rows (5 rows of animated placeholders)
- Toolbar and header remain visible

### Success Feedback
- After Add: green toast notification "Employee added successfully"
- After Edit: green toast notification "Employee updated successfully"
- After Delete: green toast notification "Employee deleted successfully"
- Toast: bottom-right, auto-dismiss after 3 seconds

### Error Feedback
- API errors: red toast notification with error message
- Form validation: inline errors below each field (same pattern as login page)

---

## Responsive Behavior

| Breakpoint      | Behavior                                      |
|-----------------|-----------------------------------------------|
| Desktop (>1024) | Full table, all columns visible               |
| Tablet (768)    | Hide Phone column, compact padding            |
| Mobile (<480)   | Card layout instead of table (see below)      |

### Mobile Card Layout

```
+--------------------------------+
| Alice Chen              [E][D] |
| alice@co.com                   |
| Engineering                    |
+--------------------------------+
| Bob Smith               [E][D] |
| bob@co.com                     |
| Sales                          |
+--------------------------------+
```

- Each employee renders as a card
- Actions top-right of card
- Modal becomes full-screen sheet on mobile

---

## Accessibility Notes

- Table uses proper `<table>`, `<thead>`, `<tbody>` semantics
- Sort buttons have `aria-sort` attributes
- Modal traps focus when open
- Delete confirmation requires explicit action (no accidental deletes)
- All interactive elements keyboard-accessible
- Screen reader announces toast notifications via `aria-live="polite"`
