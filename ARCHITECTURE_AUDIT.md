# Architecture & Quality Review

## Overview
- **Stack**: Next.js 16 app with app router, API routes under `src/app/api`, MongoDB via `mongodb` driver, state managed with Zustand/React Query, validation via Zod, Tailwind for styling.
- **Structure**: Feature folders for components, services, schemas, and API routes; direct MongoDB access from API handlers without service layer abstraction.

## Strengths
- Uses Zod validation for auth and profile payloads to constrain inputs before DB writes.
- Centralized environment handling with required fallbacks (`src/config/env.ts`).
- API authentication uses signed JWT stored in httpOnly cookie with 7d expiry.

## Key Risks / Issues
1. **Lack of route-level authorization & audit trails**
   - API handlers don’t check roles/permissions beyond token existence; any authenticated user can read/update any profile document by manipulating `userId` in the token. No logging of sensitive operations. (See `src/app/api/profile/route.ts` usage of `jwt.verify` and direct DB calls.)

2. **Missing input normalization for nested arrays on write**
   - `sanitizePayload` defaults empty arrays but does not strip unexpected properties or limit maximum lengths, risking oversized documents and injection of arbitrary fields. The PUT handler writes `updateDoc` directly. (`src/app/api/profile/route.ts` lines 94-150.)

3. **Direct DB access from API routes**
   - Routes reach into collections via `getEmployeeProfilesCollection` and `getUsersCollection` without a domain/service layer, making cross-cutting concerns (auditing, rate limiting, caching) difficult to enforce. (`src/utils/db.ts`, API route implementations.)

4. **Password storage & allowed users**
   - Login uses an in-memory allowed list (`@/config/allowed-users`) with pre-hashed passwords; creates DB users with that hash, mixing seeding logic inside runtime login path. Real user signup path exists but may conflict with this bootstrap approach. (`src/app/api/auth/login/route.ts`.)

5. **No migrations or schema versioning**
   - Mongo collections are created implicitly; there is no migration strategy or index definitions (e.g., unique email). (`src/utils/db.ts`.)

6. **Testing gaps**
   - Only lint script exists; no unit/integration tests or API contract tests configured. (`package.json` scripts.)

7. **Security hardening**
   - JWT secret fallback to `change-me-jwt-secret` in non-prod; `.env.example` not reflecting secure defaults for production. Cookies use `sameSite: 'lax'` and lack CSRF token checks on state-changing routes. (`src/config/env.ts`, `src/app/api/auth/login/route.ts`.)

## Recommendations
- Introduce application services for auth/profile operations to centralize authorization, input shaping, and logging; have API routes call those services.
- Enforce role-based access control on profile routes (e.g., ensure users can only act on their own profile; admins/managers may read others via scoped endpoints).
- Add input whitelisting and size constraints (max items, string lengths) in Zod schemas for experiences/certifications/attachments; strip unknown keys.
- Implement migration/index setup (unique email on `users`, userId index on `employee_profiles`).
- Replace bootstrap login seed with proper seeding script; ensure bcrypt hashing occurs on signup with configurable cost.
- Add CSRF protection for mutating routes (double-submit cookie or token header) and increase cookie security in production (`sameSite=strict`, `secure=true`).
- Add automated tests: unit tests for validation/services, integration tests for API auth/profile flows, and contract tests against frontend types.

## Quick Wins
- Define indexes via an init script to enforce uniqueness and query performance.
- Extract DB calls into repository layer to isolate persistence from API handlers.
- Harden environment defaults by removing weak JWT fallback and documenting required secrets in `.env.example`.

