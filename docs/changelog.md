# Changelog

## 2026-05-24

### Added
- Zod validation for monitoring logs query parameters
- paginated monitoring logs response with `total`, `count`, `limit`, and `offset`

### Changed
- `GET /api/monitoring/logs` now supports `level`, `limit`, and `offset` query parameters
- monitoring logs are returned newest first

## 2026-05-23

### Added
- backend environment validation with Zod
- backend `.env.example` with required local configuration values

### Changed
- backend startup now fails early when required environment variables are missing or invalid

## 2026-05-21

### Added
- refresh token lifecycle management with in-memory repository
- `tokenId` (`jti`-style identifier) inside refresh token payload
- `POST /api/auth/logout` endpoint for refresh token revocation
- centralized token lifetime settings (`backend/src/constants/token.constants.ts`)

### Changed
- refresh flow now checks stored token state before issuing a new access token
- revoked refresh tokens can no longer be used for `/api/auth/refresh`

### Notes
- refresh token storage is currently in-memory and should later move to persistent storage or Redis

## 2026-05-18

### Added
- login rate limiting for `POST /api/auth/login`
- account lockout protection after repeated failed login attempts
- centralized login security constants for rate limiting and lockout settings

### Notes
- login protection currently uses in-memory counters and should later move to Redis or persistent storage for production-like behavior

## 2026-05-10

### Added
- admin-only endpoint `POST /api/auth/assign-role` for controlled role assignment
- role assignment validation via Zod (`userId` as UUID, `role` from allowed roles)

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
