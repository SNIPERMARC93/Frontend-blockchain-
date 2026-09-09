# Nexus ID frontend

A React + TypeScript + React Router + Tailwind application for organisation, identity, access, and asset management. This is a frontend demo: data, authentication, verification, and transaction references are simulated locally.

## Run locally

Use Node 22.12+ and pnpm 11.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:5173. The landing page is `/`; the workspace begins at `/login`.

```sh
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm preview
```

The project uses Vite 7, with official WebAssembly variants of Rollup and Lightning CSS for compatibility with this Windows host's application-control policy. `pnpm-workspace.yaml` records these overrides. Use the pnpm lockfile for reproducible installations.

## Demo accounts

The login screen includes one-click role previews. Existing demo emails open their corresponding employee; any other valid email and nonempty password opens the demo administrator. Passwords are never stored or checked against a backend.

| Role | Email | Scope |
| --- | --- | --- |
| Administrator | ananya.sharma@acme.example | Entire organisation |
| Manager | vikram.rao@acme.example | Technology and descendant units |
| Auditor | maya.iyer@acme.example | Read and audit access |
| Employee | aarav.shah@acme.example | Own records and assets |

Signup supports either creating an empty organisation or joining ACME with invitation code `ACME-2026`. Sessions expire after eight hours. Data and notifications persist in this browser. Browser storage keys start with `nexus_`; clearing this demo site's storage resets it to the seed data.

## Implemented flows

- Protected routes, onboarding, role-specific dashboards, responsive navigation and notification center.
- An arbitrary-depth organisation tree with search, expansion, unit details and guarded mutations.
- Employee search/filters, add/edit/delete, profiles, manager links, identities, activity, and CSV/XLSX import with preview, validation, confirmation, and partial results.
- Physical and digital asset trees, registration, filters, details, assignment, transfer, return, verification, and append-only history.
- Role creation, permission matrix, membership assignment/revocation and system-role protections.
- Filterable audit history, simulated identity/asset/authorization verification, and all settings sections with local preference forms or explicit demo actions.
- Table skeletons, empty states, retryable errors, success toasts, confirmation dialogs and responsive table scrolling.

The landing page retains its original structure, copy and animations. The active global stylesheet restores its intended Geist / Geist Mono fonts and Tailwind theme tokens; existing login controls now navigate to the frontend login page.

## Structure and integration boundary

`src/main.tsx` and `src/App.tsx` are the active Vite entry and route tree. Pages compose feature components from `src/components`; shared types live in `src/types`, seed records in `src/mock`, and async services in `src/services`. Earlier `src/app` and `src/lib/auth-context.tsx` scaffolding is retained but excluded from the active application and checks.

Services use promises with a 400 ms delay (login uses 800 ms), enforce mock role scopes, and update related records together. Assets, employee profiles and organisation lists share the same records. Deletion retains historical records so assignment/audit references remain resolvable.

To connect a backend, keep service signatures and replace local implementations with API requests. Implement real session management, authorization, server validation, transactional assignment changes, durable audit records, and server-side import validation at that boundary. Frontend permission checks and localStorage sessions are demonstration behavior, not a production security boundary. Settings integrations, exports and verification currently simulate their outcomes; no external messages or real transactions are sent.

## Verification

`tests/domain.test.ts` checks seed relationships, deep trees/cycle rejection, employee and manager scope, assignment/transfer/return consistency, stale-transfer rejection, maintenance rules, import validation, role/unit deletion history, verification outcomes, offline/expired sessions and workspace isolation. It uses an isolated in-memory store and does not modify browser demo data.

`tests/fixtures/employees.csv` and `employees.xlsx` contain synthetic valid/invalid rows for exercising the upload wizard. Importing each sample once produces a partial result; repeated imports detect duplicates.

The original landing page's 3D dependency chunk produces Vite's large-chunk advisory. Routes are lazy loaded so authenticated screens do not load that landing chunk.
