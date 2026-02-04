# Employee Management Page E2E Test Plan

## Application Overview

The Employee Management Page is a full-featured CRUD interface for managing employee records. Users can view a paginated table of employees, search by name or email, filter by department, and perform add/edit/delete operations. The page includes 24 mock employees displayed 5 per page, with real-time filtering, comprehensive form validation, and toast notifications for user feedback.

## Test Scenarios

### 1. Initial Page Load and Table Rendering

**Seed:** `e2e/seed.spec.ts`

#### 1.1. should display the employee table with correct structure

**File:** `e2e/employee-page/table-rendering.spec.ts`

**Steps:**

1. Navigate to /employees page
   - expect: Page URL is /employees
   - expect: Page title contains 'Portal'

2. Check the page heading
   - expect: Page displays 'Employees' heading

3. Verify table structure
   - expect: Table has 5 column headers: #, Name, Email, Dept, Actions
   - expect: Table displays exactly 5 employee rows
   - expect: Each row contains employee data in correct columns
   - expect: Each row has Edit and Delete buttons in Actions column

#### 1.2. should display correct employee count and pagination info

**File:** `e2e/employee-page/table-rendering.spec.ts`

**Steps:**

1. Check pagination text
   - expect: Text shows 'Showing 1-5 of 24 employees'

2. Verify pagination controls
   - expect: Previous button is disabled
   - expect: Page 1 button is active/selected
   - expect: Page 2-5 buttons are clickable
   - expect: Next button is enabled

#### 1.3. should display the search and filter controls

**File:** `e2e/employee-page/table-rendering.spec.ts`

**Steps:**

1. Check search input
   - expect: Search box is visible with placeholder 'Search by name or email...'

2. Check department filter
   - expect: Department dropdown is visible
   - expect: 'All Departments' is selected by default
   - expect: Dropdown contains options: Engineering, Sales, Design, HR, Marketing, Finance

3. Check Add Employee button
   - expect: 'Add Employee' button is visible and enabled

### 2. Search Functionality

**Seed:** `e2e/seed.spec.ts`

#### 2.1. should search employees by name

**File:** `e2e/employee-page/search.spec.ts`

**Steps:**

1. Type 'Alice' in the search box
   - expect: Table shows only 1 employee: Alice Chen
   - expect: Pagination text shows 'Showing 1-1 of 1 employees'
   - expect: Both Previous and Next buttons are disabled
   - expect: Only page 1 button is shown

#### 2.2. should search employees by email

**File:** `e2e/employee-page/search.spec.ts`

**Steps:**

1. Type 'bob@company.com' in the search box
   - expect: Table shows only 1 employee: Bob Smith
   - expect: Email displayed matches the search term
   - expect: Pagination shows 1 employee

#### 2.3. should show partial match results

**File:** `e2e/employee-page/search.spec.ts`

**Steps:**

1. Type 'chen' (lowercase) in the search box
   - expect: Search is case-insensitive
   - expect: Table shows Alice Chen
   - expect: Result count is updated

#### 2.4. should clear search and restore all employees

**File:** `e2e/employee-page/search.spec.ts`

**Steps:**

1. Type 'Alice' in the search box
   - expect: Table shows only Alice Chen

2. Clear the search box
   - expect: Table shows 5 employees again (first page)
   - expect: Pagination shows 'Showing 1-5 of 24 employees'
   - expect: All pagination controls are restored

#### 2.5. should display no results message when search has no matches

**File:** `e2e/employee-page/search.spec.ts`

**Steps:**

1. Type 'nonexistentname123' in the search box
   - expect: Table is hidden
   - expect: Message displays: 'No employees match "nonexistentname123".'
   - expect: Suggestion text shows: 'Try a different search term.'
   - expect: Pagination is hidden

#### 2.6. should show empty state when searching returns no results

**File:** `e2e/employee-page/search.spec.ts`

**Steps:**

1. Type 'zzz' in the search box
   - expect: No results message is displayed
   - expect: No employee rows are visible
   - expect: Empty state icon is shown

### 3. Department Filter

**Seed:** `e2e/seed.spec.ts`

#### 3.1. should filter employees by Engineering department

**File:** `e2e/employee-page/department-filter.spec.ts`

**Steps:**

1. Select 'Engineering' from the department dropdown
   - expect: Table shows only Engineering employees
   - expect: All visible employees have 'Engineering' in Dept column
   - expect: Pagination text updates to show filtered count

#### 3.2. should filter employees by Sales department

**File:** `e2e/employee-page/department-filter.spec.ts`

**Steps:**

1. Select 'Sales' from the department dropdown
   - expect: Table shows only Sales employees (4 total)
   - expect: Pagination shows 'Showing 1-4 of 4 employees'
   - expect: Only page 1 is shown, no pagination needed
   - expect: Previous and Next buttons are disabled

#### 3.3. should filter by each department option

**File:** `e2e/employee-page/department-filter.spec.ts`

**Steps:**

1. Iterate through each department: Design, HR, Marketing, Finance
   - expect: Each selection shows only employees from that department
   - expect: Dept column matches the selected filter
   - expect: Employee count is updated correctly

#### 3.4. should reset to all departments

**File:** `e2e/employee-page/department-filter.spec.ts`

**Steps:**

1. Select 'Sales' department
   - expect: Table shows filtered results

2. Select 'All Departments' from dropdown
   - expect: Table shows all 24 employees (5 per page)
   - expect: Pagination shows 'Showing 1-5 of 24 employees'
   - expect: All pagination controls are restored

#### 3.5. should combine department filter with search

**File:** `e2e/employee-page/department-filter.spec.ts`

**Steps:**

1. Select 'Engineering' department
   - expect: Table shows Engineering employees

2. Type 'David' in the search box
   - expect: Table shows only David Park (Engineering)
   - expect: Both filters are applied simultaneously
   - expect: Result shows employee matching both criteria

3. Change department to 'Sales' while search is active
   - expect: If 'David' is not in Sales, show no results message
   - expect: Search term remains in search box

### 4. Pagination

**Seed:** `e2e/seed.spec.ts`

#### 4.1. should navigate to page 2 and show correct employees

**File:** `e2e/employee-page/pagination.spec.ts`

**Steps:**

1. Click on page 2 button
   - expect: URL updates or page content changes
   - expect: Table shows employees 6-10
   - expect: Pagination text shows 'Showing 6-10 of 24 employees'
   - expect: Page 2 button is now active/selected
   - expect: Previous button is now enabled
   - expect: Next button remains enabled

#### 4.2. should navigate through all pages sequentially

**File:** `e2e/employee-page/pagination.spec.ts`

**Steps:**

1. Click Next button from page 1
   - expect: Navigates to page 2
   - expect: Shows employees 6-10

2. Click Next button repeatedly until last page
   - expect: Each click advances to next page
   - expect: Employee numbers increment correctly
   - expect: On page 5: shows 'Showing 21-24 of 24 employees'
   - expect: On last page: Next button is disabled

#### 4.3. should navigate backwards using Previous button

**File:** `e2e/employee-page/pagination.spec.ts`

**Steps:**

1. Navigate to page 3
   - expect: Page 3 is active

2. Click Previous button
   - expect: Navigates to page 2
   - expect: Shows employees 6-10
   - expect: Previous button still enabled

3. Click Previous button again
   - expect: Navigates to page 1
   - expect: Shows employees 1-5
   - expect: Previous button is now disabled

#### 4.4. should jump to specific page by clicking page number

**File:** `e2e/employee-page/pagination.spec.ts`

**Steps:**

1. Click on page 5 button directly
   - expect: Jumps directly to page 5
   - expect: Shows employees 21-24
   - expect: Page 5 button is active
   - expect: Next button is disabled

#### 4.5. should disable Previous on first page

**File:** `e2e/employee-page/pagination.spec.ts`

**Steps:**

1. Verify initial state on page 1
   - expect: Previous button is disabled (not clickable)
   - expect: Clicking has no effect

#### 4.6. should disable Next on last page

**File:** `e2e/employee-page/pagination.spec.ts`

**Steps:**

1. Navigate to page 5 (last page)
   - expect: Shows employees 21-24 (only 4 employees)
   - expect: Next button is disabled
   - expect: Clicking has no effect

#### 4.7. should reset pagination when search reduces results

**File:** `e2e/employee-page/pagination.spec.ts`

**Steps:**

1. Navigate to page 3
   - expect: Page 3 is active

2. Search for 'Alice'
   - expect: Pagination resets to page 1
   - expect: Shows 1 result
   - expect: Only page 1 button visible

3. Clear search
   - expect: Returns to page 1 with all 24 employees

### 5. Add Employee Modal

**Seed:** `e2e/seed.spec.ts`

#### 5.1. should open Add Employee modal

**File:** `e2e/employee-page/add-employee.spec.ts`

**Steps:**

1. Click 'Add Employee' button
   - expect: Modal opens with title 'Add Employee'
   - expect: Modal contains 5 form fields: First Name*, Last Name*, Email*, Department*, Phone
   - expect: Department dropdown shows 'Select department' as default
   - expect: All text fields are empty
   - expect: Cancel and Save buttons are visible
   - expect: Save button is disabled

#### 5.2. should close modal when clicking Cancel

**File:** `e2e/employee-page/add-employee.spec.ts`

**Steps:**

1. Open Add Employee modal
   - expect: Modal is visible

2. Click Cancel button
   - expect: Modal closes
   - expect: Returns to employee table
   - expect: No changes are made to the employee list

#### 5.3. should close modal when clicking outside (if applicable)

**File:** `e2e/employee-page/add-employee.spec.ts`

**Steps:**

1. Open Add Employee modal
   - expect: Modal is visible

2. Click on the backdrop/overlay outside the modal
   - expect: Modal closes
   - expect: No data is saved

#### 5.4. should successfully add a new employee with all fields

**File:** `e2e/employee-page/add-employee.spec.ts`

**Steps:**

1. Open Add Employee modal
   - expect: Modal opens

2. Fill in First Name: 'John'
   - expect: Field accepts input

3. Fill in Last Name: 'Doe'
   - expect: Field accepts input

4. Fill in Email: 'john.doe@company.com'
   - expect: Field accepts input

5. Select Department: 'Engineering'
   - expect: Engineering is selected

6. Fill in Phone: '+1-555-9999'
   - expect: Field accepts input
   - expect: Save button becomes enabled

7. Click Save button
   - expect: Modal closes
   - expect: Success toast notification appears: 'Employee added successfully' (or similar)
   - expect: New employee 'John Doe' appears in the table
   - expect: Total employee count increases to 25
   - expect: Pagination updates to 'Showing 1-5 of 25 employees'

#### 5.5. should add employee without optional phone number

**File:** `e2e/employee-page/add-employee.spec.ts`

**Steps:**

1. Open Add Employee modal
   - expect: Modal opens

2. Fill only required fields: First Name, Last Name, Email, Department
   - expect: Save button becomes enabled even without Phone

3. Click Save
   - expect: Employee is added successfully
   - expect: Toast notification appears
   - expect: New employee appears in table

#### 5.6. should show validation errors for required fields

**File:** `e2e/employee-page/add-employee.spec.ts`

**Steps:**

1. Open Add Employee modal
   - expect: Save button is disabled

2. Fill only First Name
   - expect: Save button remains disabled

3. Click Save button (if enabled)
   - expect: Validation errors appear for empty required fields
   - expect: Modal does not close
   - expect: No employee is added

#### 5.7. should validate email format

**File:** `e2e/employee-page/add-employee.spec.ts`

**Steps:**

1. Open Add Employee modal and fill all fields
   - expect: Form is ready

2. Enter invalid email: 'notanemail'
   - expect: Email validation error appears: 'Invalid email format' (or similar)
   - expect: Save button is disabled or shows error on click

3. Enter valid email: 'test@company.com'
   - expect: Validation error clears
   - expect: Save button becomes enabled

#### 5.8. should require department selection

**File:** `e2e/employee-page/add-employee.spec.ts`

**Steps:**

1. Fill all fields except Department (leave as 'Select department')
   - expect: Save button is disabled

2. Select a department
   - expect: Save button becomes enabled

### 6. Edit Employee Modal

**Seed:** `e2e/seed.spec.ts`

#### 6.1. should open Edit Employee modal with pre-populated data

**File:** `e2e/employee-page/edit-employee.spec.ts`

**Steps:**

1. Click Edit button for 'Alice Chen' (first employee)
   - expect: Modal opens with title 'Edit Employee'
   - expect: First Name field shows 'Alice'
   - expect: Last Name field shows 'Chen'
   - expect: Email field shows 'alice@company.com'
   - expect: Department dropdown shows 'Engineering' selected
   - expect: Phone field shows '+1-555-0101'
   - expect: Save button is labeled 'Save Changes' and is enabled

#### 6.2. should close edit modal when clicking Cancel

**File:** `e2e/employee-page/edit-employee.spec.ts`

**Steps:**

1. Open Edit modal for any employee
   - expect: Modal opens with employee data

2. Change First Name to 'Modified'
   - expect: Field is updated

3. Click Cancel button
   - expect: Modal closes
   - expect: No changes are saved
   - expect: Employee data in table remains unchanged

#### 6.3. should successfully update employee information

**File:** `e2e/employee-page/edit-employee.spec.ts`

**Steps:**

1. Click Edit button for 'Bob Smith'
   - expect: Modal opens with Bob's data

2. Change First Name to 'Robert'
   - expect: Field updates

3. Change Department to 'Marketing'
   - expect: Department updates

4. Change Phone to '+1-555-8888'
   - expect: Phone updates

5. Click 'Save Changes' button
   - expect: Modal closes
   - expect: Success toast appears: 'Employee updated successfully' (or similar)
   - expect: Table shows updated data: 'Robert Smith', 'Marketing', new phone
   - expect: Email remains unchanged

#### 6.4. should validate email format in edit mode

**File:** `e2e/employee-page/edit-employee.spec.ts`

**Steps:**

1. Open Edit modal for any employee
   - expect: Modal opens

2. Clear email field and enter 'invalidemail'
   - expect: Validation error appears
   - expect: Save button is disabled or shows error on click

3. Enter valid email
   - expect: Error clears
   - expect: Save button is enabled

#### 6.5. should not allow empty required fields in edit mode

**File:** `e2e/employee-page/edit-employee.spec.ts`

**Steps:**

1. Open Edit modal
   - expect: Modal opens with data

2. Clear First Name field
   - expect: Validation error appears or Save button disables

3. Clear Last Name field
   - expect: Validation error appears

4. Attempt to save
   - expect: Cannot save with empty required fields
   - expect: Modal remains open

#### 6.6. should allow clearing optional phone number

**File:** `e2e/employee-page/edit-employee.spec.ts`

**Steps:**

1. Open Edit modal for employee with phone number
   - expect: Phone field is populated

2. Clear Phone field
   - expect: Save button remains enabled

3. Click Save Changes
   - expect: Update succeeds
   - expect: Toast appears
   - expect: Phone is removed or empty in table

### 7. Delete Employee Confirmation

**Seed:** `e2e/seed.spec.ts`

#### 7.1. should open delete confirmation dialog

**File:** `e2e/employee-page/delete-employee.spec.ts`

**Steps:**

1. Click Delete button for 'Alice Chen'
   - expect: Confirmation dialog opens with title 'Delete Employee'
   - expect: Dialog shows message: 'Are you sure you want to delete Alice Chen?'
   - expect: Warning text: 'This action cannot be undone.'
   - expect: Cancel and Delete buttons are visible

#### 7.2. should cancel delete operation

**File:** `e2e/employee-page/delete-employee.spec.ts`

**Steps:**

1. Open delete confirmation for any employee
   - expect: Dialog opens

2. Click Cancel button
   - expect: Dialog closes
   - expect: Employee is NOT deleted
   - expect: Employee still appears in table
   - expect: Employee count remains unchanged

#### 7.3. should successfully delete an employee

**File:** `e2e/employee-page/delete-employee.spec.ts`

**Steps:**

1. Note the current employee count (24)
   - expect: Count is visible in pagination

2. Click Delete button for 'Carol Wu'
   - expect: Confirmation dialog opens

3. Click Delete button in dialog
   - expect: Dialog closes
   - expect: Success toast appears: 'Employee deleted successfully' (or similar)
   - expect: Carol Wu is removed from the table
   - expect: Employee count decreases to 23
   - expect: Pagination updates to 'Showing 1-5 of 23 employees'
   - expect: Remaining employees shift up to fill the gap

#### 7.4. should delete employee from different pages

**File:** `e2e/employee-page/delete-employee.spec.ts`

**Steps:**

1. Navigate to page 2
   - expect: Page 2 shows employees 6-10

2. Delete an employee from page 2
   - expect: Employee is deleted
   - expect: If page 2 now has <5 employees, pagination adjusts
   - expect: User stays on page 2 (or redirects to page 1 if page 2 becomes empty)

#### 7.5. should handle deleting the last employee on a page

**File:** `e2e/employee-page/delete-employee.spec.ts`

**Steps:**

1. Navigate to last page (page 5) showing employees 21-24
   - expect: Page 5 has 4 employees

2. Delete all 4 employees one by one
   - expect: After each delete, count decreases
   - expect: After deleting the last employee on page 5, user is redirected to page 4
   - expect: Total count reaches 20
   - expect: Pagination adjusts accordingly

### 8. Form Validation and Error Handling

**Seed:** `e2e/seed.spec.ts`

#### 8.1. should show required field indicators

**File:** `e2e/employee-page/form-validation.spec.ts`

**Steps:**

1. Open Add Employee modal
   - expect: Required fields show asterisk: First Name*, Last Name*, Email*, Department*
   - expect: Optional field does not: Phone

#### 8.2. should validate email format with various invalid inputs

**File:** `e2e/employee-page/form-validation.spec.ts`

**Steps:**

1. Open Add/Edit modal and test invalid emails: 'test', 'test@', '@company.com', 'test @company.com'
   - expect: Each invalid email shows validation error
   - expect: Save button is disabled or prevents submission

2. Enter valid email: 'valid@company.com'
   - expect: Validation passes
   - expect: Error clears

#### 8.3. should prevent submission with empty required fields

**File:** `e2e/employee-page/form-validation.spec.ts`

**Steps:**

1. Open Add Employee modal
   - expect: Save is disabled

2. Try to click Save without filling any fields
   - expect: Save button is disabled and cannot be clicked
   - expect: Or validation errors appear for all required fields

#### 8.4. should enable Save button only when all required fields are valid

**File:** `e2e/employee-page/form-validation.spec.ts`

**Steps:**

1. Open Add Employee modal
   - expect: Save is disabled

2. Fill First Name
   - expect: Save still disabled

3. Fill Last Name
   - expect: Save still disabled

4. Fill Email (valid format)
   - expect: Save still disabled

5. Select Department
   - expect: Save button becomes enabled

#### 8.5. should trim whitespace from text inputs

**File:** `e2e/employee-page/form-validation.spec.ts`

**Steps:**

1. Open Add Employee modal
   - expect: Modal opens

2. Enter First Name with leading/trailing spaces: ' John '
   - expect: Input accepts the value

3. Fill other required fields and save
   - expect: Employee is added
   - expect: Name in table displays as 'John' (whitespace trimmed) or as entered (depending on implementation)

### 9. Toast Notifications

**Seed:** `e2e/seed.spec.ts`

#### 9.1. should show success toast after adding employee

**File:** `e2e/employee-page/toast-notifications.spec.ts`

**Steps:**

1. Add a new employee successfully
   - expect: Toast notification appears with success message
   - expect: Toast contains text like 'Employee added successfully' or 'John Doe has been added'
   - expect: Toast is visible for a few seconds
   - expect: Toast auto-dismisses or has a close button

#### 9.2. should show success toast after editing employee

**File:** `e2e/employee-page/toast-notifications.spec.ts`

**Steps:**

1. Edit an employee and save changes
   - expect: Toast notification appears
   - expect: Message indicates success: 'Employee updated successfully' or similar
   - expect: Toast auto-dismisses

#### 9.3. should show success toast after deleting employee

**File:** `e2e/employee-page/toast-notifications.spec.ts`

**Steps:**

1. Delete an employee
   - expect: Toast appears with deletion confirmation
   - expect: Message like 'Employee deleted successfully' or 'Alice Chen has been deleted'
   - expect: Toast auto-dismisses

#### 9.4. should display multiple toasts if multiple actions are performed quickly

**File:** `e2e/employee-page/toast-notifications.spec.ts`

**Steps:**

1. Add an employee
   - expect: First toast appears

2. Immediately edit another employee
   - expect: Second toast appears
   - expect: Both toasts are visible (stacked) or second replaces first (depending on implementation)
