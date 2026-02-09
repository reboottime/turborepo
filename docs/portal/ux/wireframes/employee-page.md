# Employee Page — Wireframe

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

## Elements

| Element        | Placement                 | Notes                          |
| -------------- | ------------------------- | ------------------------------ |
| Nav bar        | Top, full width           | Logo left, user/logout right   |
| Page title     | Below nav, left           | "Employees"                    |
| Add button     | Below nav, right          | Primary, "+ Add Employee"      |
| Toolbar        | Below header              | Search left, dept filter right |
| Employee table | Below toolbar, full width | 5 columns, see below           |
| Pagination     | Below table               | Count left, page buttons right |

### Table Columns

| Column  | Width | Alignment |
| ------- | ----- | --------- |
| #       | 60px  | Center    |
| Name    | flex  | Left      |
| Email   | flex  | Left      |
| Dept    | 120px | Left      |
| Actions | 120px | Center    |

---

## Add/Edit Employee Modal

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

| Element       | Notes                                |
| ------------- | ------------------------------------ |
| Modal         | 480px wide, centered, overlay behind |
| Title         | "Add Employee" or "Edit Employee"    |
| Fields        | 5 fields, \* = required              |
| Department    | Dropdown                             |
| Cancel button | Secondary (outlined)                 |
| Save button   | Primary, "Save" or "Save Changes"    |
| Close         | X button top-right                   |

---

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

| Element       | Notes                |
| ------------- | -------------------- |
| Dialog        | 400px wide, centered |
| Employee name | Bold                 |
| Cancel button | Secondary            |
| Delete button | Destructive (red)    |

---

## Empty / No Results States

```
Empty:       "No employees found. Click '+ Add Employee' to get started."
No match:    "No employees match '{term}'. Try a different search term."
```

Both render centered inside the table area with an icon above the text.

---

## Responsive

| Breakpoint | Layout change                                         |
| ---------- | ----------------------------------------------------- |
| > 1024px   | Full table, all columns                               |
| 768px      | Table, hide Phone column, compact padding             |
| < 480px    | Cards replace table, modals become full-screen sheets |

### Mobile Card Layout

```
+--------------------------------+
| Alice Chen              [E][D] |
| alice@co.com                   |
| Engineering                    |
+--------------------------------+
```
