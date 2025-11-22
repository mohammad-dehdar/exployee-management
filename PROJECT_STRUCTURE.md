# Project Structure Conventions

## lib vs utils
- **`src/lib`**: Only for initialization, configuration, or wrappers around third-party/platform APIs (e.g., HTTP clients, token helpers around `js-cookie`, logging facades). Anything that talks to the outside world or owns a client instance belongs here.
- **`src/utils`**: Strictly for small, pure helper functions (formatters, parsers, validators) with no side effects, I/O, or dependency on runtime state.
- If a helper touches network/storage, manages tokens, or configures an SDK, move it to `src/lib` instead of `src/utils`.

## services vs features
- **`src/services`**: Data Access Layer only. Implement CRUD and transport calls to databases or external APIs. Use clients from `src/lib` here. Do **not** place business rules, UI state, or validation in this layer.
- **`src/features`**: UI and business logic live alongside the components they support (state machines, calculations, validation, orchestration). Features call `services` for persistence/queries but must not perform direct data access themselves.

## Environment safety
- Sensitive secrets (e.g., `MONGODB_URI`, `JWT_SECRET`) must never use the `NEXT_PUBLIC_` prefix and must only be read in server-side code (`src/config/env.server.ts`, API routes, or Server Components).
- Client bundles should only consume whitelisted public variables (e.g., `NEXT_PUBLIC_API_URL`) defined in `src/config/env.client.ts`.
