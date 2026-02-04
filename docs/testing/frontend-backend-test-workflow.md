# Frontend & Backend Testing Workflow

How frontend and backend testing fits together, where the two sides converge, and where contract tests sit in the process.

## The Two Convergence Points

Frontend and backend teams develop and test independently. They meet at two points:

1. **Contract tests** — first convergence, verifies API shape agreement
2. **True E2E tests** — final convergence, verifies the full stack works as a user

## Workflow Diagram

```sh
Backend team                         Frontend team
═══════════                          ═══════════════

1. Build API                         1. Build UI
   │                                    │
   ▼                                    ▼
2. Backend tests                     2. Frontend tests
   - Unit (logic, utils)                - Unit (components, hooks)
   - Integration (API + DB)             - Integration (UI + mocked API)
   - API tests (endpoints)              │
   │                                    │
   ▼                                    ▼
3. Deploy to staging                 3. Mocks based on API spec
   │                                    │
   │                                    │
   ╰──────────┐          ┌──────────────╯
              ▼          ▼
        ┌───────────────────────┐
        │   Contract Tests      │  ← first convergence
        │                       │
        │  Frontend says:       │
        │  "I expect GET /users │
        │   to return           │
        │   { id, name, role }" │
        │                       │
        │  Backend says:        │
        │  "I actually return   │
        │   this shape"         │
        │                       │
        │  Match → ✅ continue  │
        │  Mismatch → ❌ block  │
        └─────────┬─────────────┘
                  ▼
        ┌─────────────────────┐
        │    True E2E Tests   │  ← final convergence
        │                     │
        │  Real browser       │
        │  + Real backend     │
        │  + Real database    │
        │                     │
        │  Critical paths only│
        │  (auth, data writes)│
        └─────────┬───────────┘
                  ▼
              Deploy
```

## What Each Layer Catches

| Layer                                          | Owned by | What it catches                                             |
| ---------------------------------------------- | -------- | ----------------------------------------------------------- |
| Backend unit/integration                       | Backend  | Logic bugs, query errors, validation                        |
| Frontend unit/integration                      | Frontend | UI rendering, state management, user interactions           |
| https://docs.pact.io/#what-is-contract-testing | Shared   | API shape mismatches, mock drift, breaking changes          |
| True E2E                                       | Shared   | Full-stack integration failures, auth flows, data integrity |

## Contract Tests: Bridging the Gap

Contract tests answer one question: **does the real API still return what the frontend mocks assume?**

### Consumer-Driven Contracts

The most common approach is **consumer-driven** (e.g., [Pact](https://docs.pact.io/)):

1. **Frontend (consumer) writes the contract** — defines expectations: "I expect `GET /users` to return `{ id, name, role }`"
2. **Backend (provider) verifies against it** — runs the real API and checks: "do I satisfy this contract?"

Frontend defines what it needs, backend proves it delivers.

### Contract Tests vs API Design

Contract tests do **not** replace upfront API design. The timeline:

```sh
1. Both teams agree on API spec (OpenAPI/Swagger, or a shared doc)
   "GET /users returns { id, name, role }"
        │
        ▼
2. Teams go build independently
   - Backend builds the real API to match the spec
   - Frontend builds UI + mocks based on the spec
        │
        ▼
3. Contract tests verify they didn't drift apart
   (the spec said one thing — did both sides actually follow it?)
```

API design is a conversation that happens before coding. Contract tests are the **automated, ongoing verification** that both sides stay aligned after weeks of independent development.

### How They Run in CI

- **Backend CI:** after backend tests pass, run contract tests — "did we break any consumer's expectations?"
- **Frontend CI:** run contract tests — "are my mocks still accurate?"

So here at the CI, we run this contract test to ensure both frontend and backend follows the agreed API contract.

Without contract tests, the first time frontend and backend code meet is at E2E — problems are discovered late and are expensive to debug. With contract tests, mock drift is caught in CI immediately.

## What Happens Without Contract Tests

```sh
Backend tests pass ✅  (API works correctly)
Frontend tests pass ✅  (UI works against mocks)
Deploy together → breaks ❌  (mocks were stale)
```

The gap between "mocks work" and "real API works" is invisible until E2E or production. Contract tests make that gap visible early.
