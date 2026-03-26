# Claude Code Skills

This directory contains custom skills that extend Claude Code's capabilities for this project.

## Available Skills

| Skill                         | Description                                             | Source      |
| ----------------------------- | ------------------------------------------------------- | ----------- |
| `vercel-react-best-practices` | 57 performance optimization rules for React and Next.js | Vercel Labs |
| `vercel-composition-patterns` | Component architecture patterns that scale              | Vercel Labs |

## Usage

Skills can be invoked manually via slash commands:

```
/vercel-react-best-practices
/vercel-composition-patterns
```

Or referenced by agents (e.g., `staff-frontend-engineer`) for automatic guidance during code reviews
and implementation.

## Attribution

The React and Next.js best practices skills are sourced from **Vercel Labs**:

> **[vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills)**
>
> A collection of agent skills maintained by Vercel Engineering, providing performance optimization
> guidelines and component architecture patterns for modern React applications.

### Included Skills

- **[react-best-practices](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices)**
  — Comprehensive performance rules covering waterfalls, bundle optimization, server-side rendering,
  client-side data fetching, re-render optimization, and more.

- **[composition-patterns](https://github.com/vercel-labs/agent-skills/tree/main/skills/composition-patterns)**
  — Scalable component patterns including compound components, render props, context providers, and
  React 19 API updates.

## License

The Vercel agent skills are used in accordance with their original license. See the
[vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) repository for licensing
details.
