Add a new component to the design system (`packages/ui`).

Component name: $ARGUMENTS

## Workflow

Execute these steps sequentially:

### Step 1: Create Component

Use the Task tool to spawn a `design-system-architect` agent. Pass the component name and let the agent create the component with tests and Storybook stories.

### Step 2: Accessibility Review Loop

After the design-system-architect completes, start an iterative review loop:

1. **Review**: Spawn an `accessibility-expert` agent to review the generated component files
2. **Evaluate**: Check the review result
   - If **no issues** or only MINOR issues → proceed to Step 3
   - If **CRITICAL or MAJOR issues** → continue to fix
3. **Fix**: Spawn `design-system-architect` again with the accessibility issues to fix
4. **Repeat**: Go back to step 1 of this loop

Continue this loop until the accessibility-expert reports no CRITICAL or MAJOR issues.

### Step 3: Complete

Report the final component status and any MINOR accessibility notes for future improvement.
