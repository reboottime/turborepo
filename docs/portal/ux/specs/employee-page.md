# Employee Page — Spec

## Main Layout

```
+------------------------------------------------------------------+
|  [Logo]    Employee Management               [User] [Sign Out]   |
+------------------------------------------------------------------+
|                                                                   |
|  Employees                              [ + Add Employee ]        |
|                                                                   |
|  +---------------------------------------------------------------+|
|  | Search: [___________________]    Filter by Dept: [All    v]   ||
|  +---------------------------------------------------------------+|
|                                                                   |
|  +---------------------------------------------------------------+|
|  | #  | Name          | Email             | Dept    | Actions    ||
|  |----|---------------|-------------------|---------|------------|  |
|  | 1  | Alice Chen    | alice@co.com      | Eng     | [E] [D]   ||
|  | 2  | Bob Smith     | bob@co.com        | Sales   | [E] [D]   ||
|  | 3  | Carol Wu      | carol@co.com      | Design  | [E] [D]   ||
|  | 4  | David Park    | david@co.com      | Eng     | [E] [D]   ||
|  | 5  | Emma Jones    | emma@co.com       | HR      | [E] [D]   ||
|  +---------------------------------------------------------------+|
|                                                                   |
|  Showing 1-5 of 24 employees     [ < ]  1  2  3  4  5  [ > ]    |
|                                                                   |
+------------------------------------------------------------------+
```

**Legend:** `[E]` = Edit (pencil icon), `[D]` = Delete (trash icon)

## Navigation Bar

- Logo left, page title "Employee Management" center-left, username + Sign Out button right
- White background, 1px #E5E7EB bottom border, 56px height

## Page Header

- Title: "Employees" — 24px, bold
- "+ Add Employee" button: right-aligned, primary blue, icon prefix
- 16px margin-bottom

## Toolbar

- Search input: 300px, placeholder "Search by name or email..."
- Department filter: dropdown, default "All Departments"
- Search and department filter can be combined
- Background: #F9FAFB, 12px padding, 8px radius

## Employee Table

- Full width, proper `<table>/<thead>/<tbody>` semantics
- Header row: bold, #F9FAFB background
- Row height: 48px
- Row hover: #F0F7FF

| Column  | Width | Alignment |
| ------- | ----- | --------- |
| #       | 60px  | Center    |
| Name    | flex  | Left      |
| Email   | flex  | Left      |
| Dept    | 120px | Left      |
| Actions | 120px | Center    |

## Action Buttons

- Edit: pencil icon button, tooltip "Edit employee"
- Delete: trash icon button, tooltip "Delete employee", red on hover

## Pagination

- "Showing X-Y of Z employees" left-aligned
- Numbered page buttons, max 5 visible, Previous/Next arrows
- Active page: blue background

---

## Add Employee Modal

```
         +--------------------------------------+
         |  Add Employee                    [X] |
         |                                      |
         |  First Name *                        |
         |  +----------------------------------+|
         |  |                                  ||
         |  +----------------------------------+|
         |                                      |
         |  Last Name *                         |
         |  +----------------------------------+|
         |  |                                  ||
         |  +----------------------------------+|
         |                                      |
         |  Email *                             |
         |  +----------------------------------+|
         |  |                                  ||
         |  +----------------------------------+|
         |                                      |
         |  Department *                        |
         |  +----------------------------------+|
         |  | Select department           v   ||
         |  +----------------------------------+|
         |                                      |
         |  Phone                               |
         |  +----------------------------------+|
         |  |                                  ||
         |  +----------------------------------+|
         |                                      |
         |         [ Cancel ]  [ Save ]         |
         +--------------------------------------+
```

- Trigger: "+ Add Employee" button
- Width: 480px, centered, overlay black 50% opacity, 12px radius
- Close: X button, Cancel button, or click overlay

### Form Fields

| Field      | Type     | Required | Validation                  |
| ---------- | -------- | -------- | --------------------------- |
| First Name | text     | Yes      | 1–50 chars                  |
| Last Name  | text     | Yes      | 1–50 chars                  |
| Email      | email    | Yes      | Valid email format, unique  |
| Department | dropdown | Yes      | Must select one             |
| Phone      | tel      | No       | Valid phone format if given |

- Inline errors below invalid fields: red (#EF4444), 14px
- Cancel: secondary (outlined), closes modal
- Save: primary blue, disabled until all required fields valid

### Success / Failure

- Success: modal closes, toast "Employee added successfully", table refreshes
- Failure: error toast, modal stays open, user can retry

## Edit Employee Modal

- Trigger: edit icon on employee row
- Same layout and validation as Add modal
- Title: "Edit Employee"
- Fields pre-populated with existing data
- Save button text: "Save Changes"

### Success / Failure

- Success: modal closes, toast "Employee updated successfully", table refreshes
- Failure: error toast, modal stays open, user can retry

## Delete Confirmation Dialog

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

- Trigger: delete icon on employee row
- Width: 400px, centered
- Employee name in bold
- Warning: "This action cannot be undone." — #6B7280
- Cancel: secondary style
- Delete: red background (#EF4444), white text
- Close: Escape key, X button, or overlay click

### Success / Failure

- Success: dialog closes, toast "Employee deleted successfully", table refreshes
- Failure: error toast, dialog closes

---

## Toast Notifications

- Position: bottom-right
- Auto-dismiss: 3 seconds
- Success: green
- Error: red
- Announced via `aria-live="polite"`

## Empty State

- No employees: "No employees found. Click '+ Add Employee' to get started." with icon
- No search results: "No employees match '{term}'. Try a different search term."

## Loading State

- Table body: 5 skeleton rows with animated placeholders
- Toolbar and header remain visible

## Responsive

| Breakpoint | Behavior                                              |
| ---------- | ----------------------------------------------------- |
| > 1024px   | Full table, all columns                               |
| 768px      | Hide Phone column, compact padding                    |
| < 480px    | Card layout replaces table, modals become full-screen |

### Mobile Card Layout

```
+--------------------------------+
| Alice Chen              [E][D] |
| alice@co.com                   |
| Engineering                    |
+--------------------------------+
```

## Accessibility

- Table uses `<table>/<thead>/<tbody>` semantics
- Modal traps focus when open
- Delete requires explicit confirmation
- All interactive elements keyboard-accessible
- Toast announced via `aria-live="polite"`
