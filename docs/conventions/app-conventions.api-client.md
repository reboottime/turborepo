# API Client Organization

OOP-style API client pattern for organizing backend API calls.

## Structure

```
_api/
├── index.ts        # Re-exports all API modules
├── event.ts        # eventApi
├── booking.ts      # bookingApi
└── user.ts         # userApi
```

## Pattern

Each entity gets its own file exporting a namespaced API object:

```ts
// _api/event.ts
export const eventApi = {
  getAll: async () => { ... },
  getById: async (id: string) => { ... },
  create: async (data: CreateEventInput) => { ... },
  update: async (id: string, data: UpdateEventInput) => { ... },
  delete: async (id: string) => { ... },
};
```

## Usage

```ts
import { eventApi } from '@/app/_api'

const events = await eventApi.getAll()
const event = await eventApi.getById('123')
```

## Naming

| File         | Export       | Methods                          |
| ------------ | ------------ | -------------------------------- |
| `event.ts`   | `eventApi`   | `getAll`, `getById`, `create`... |
| `booking.ts` | `bookingApi` | `getAll`, `getById`, `create`... |
| `user.ts`    | `userApi`    | `getCurrent`, `update`...        |

## Benefits

- **Discoverable**: `eventApi.` triggers autocomplete for all event operations
- **Grouped**: Related operations stay together
- **Testable**: Easy to mock entire API object
- **Consistent**: Same pattern across all entities
