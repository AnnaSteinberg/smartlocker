# Changelog

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