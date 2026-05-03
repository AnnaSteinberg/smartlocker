# Changelog

## 2026-05-03

### Added
- secure password hashing via `scrypt` in backend auth flow
- shared password utility module (`backend/src/lib/password.ts`)
- Zod-based request validation for auth endpoints (`register`, `login`, `refresh`)

### Changed
- public registration now always assigns role `USER`
- auth routes now validate and normalize request payloads before calling services
- seed users are now stored with hashed passwords instead of plain text

### Notes
- user and log storage remain in-memory (temporary foundation stage)

## 2026-04-26

### Added
- JWT authentication endpoints: register, login, refresh, me
- Role-based protected routes for ADMIN and OPERATOR/ADMIN access
- Authentication and role middlewares
- User repository abstraction (in-memory implementation)
- Log types and log repository abstraction (in-memory implementation)

### Changed
- backend config now validates JWT secrets
- logger now persists log entries via repository in addition to console output
- backend routing now includes auth router under `/api`

## 2026-04-27

### Added
- admin-only endpoint `GET /api/monitoring/logs`
- optional `level` query filter (`info|warn|error`)
- monitoring service layer for log retrieval
- centralized log level constants in backend constants

## Current Stage

### Implemented
- created separate `frontend`, `backend`, and `lambda` applications
- configured TypeScript in the backend and lambda services
- created a local health-check flow through all layers
- added backend error handling for lambda failures
- added basic frontend state management for loading, success, error, and reset
- organized frontend code into `api`, `constants`, `types`, `utils`, `hooks`, and `components`
- added basic logging foundation in backend and lambda services with startup, request, response, and error logs
### Notes
- current implementation is a foundation and not the final business domain
- health-check flow was used to validate architecture and project structure
- next focus is logging, documentation discipline, git, and then business features
