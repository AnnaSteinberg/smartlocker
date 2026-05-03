# Architecture

## Current Structure

The project is currently split into three separate applications:

- `frontend` - React + TypeScript client application
- `backend` - Express + TypeScript API layer
- `lambda` - local TypeScript service that simulates a lambda endpoint

## Current Request Flow

The current implemented flow is:

1. User opens the frontend page
2. User clicks the `Check Health` button
3. Frontend sends a request to the backend
4. Backend sends a request to the lambda service
5. Lambda returns a health response
6. Backend transforms the response and returns it to the frontend
7. Frontend displays the result

## Current Auth Flow

The current implemented authentication and authorization flow is:

1. Client sends credentials to backend (`/api/auth/register` or `/api/auth/login`)
2. Backend returns `accessToken` and `refreshToken`
3. Client calls protected routes with `Authorization: Bearer <accessToken>`
4. Backend middleware validates token and attaches user payload to request
5. Role middleware checks access rights for role-protected endpoints
6. Client can request a new access token via `/api/auth/refresh`

## Current Responsibilities

### Frontend
- renders the health page
- sends the health request
- displays loading, success, and error states

### Backend
- receives the frontend request
- calls the lambda service
- handles success and failure responses
- returns a normalized response to the frontend
- logs incoming requests, completed responses, and errors
- handles JWT-based authentication and token refresh
- validates auth request payloads with Zod schemas at route layer
- stores passwords as hashes (scrypt), not plain text
- public registration assigns `USER` role by default (role escalation through register is blocked)
- enforces role-based access control via middleware
- uses repository abstractions for user access and log persistence (current in-memory implementation)
- provides admin-only monitoring endpoint to read application logs with optional level filter

### Lambda
- exposes a local `/health` endpoint
- returns a simple status payload
- logs incoming requests and completed responses

## Next Planned Expansion

The project will later include:

- authentication
- role-based access
- locker listing
- locker booking
- device open/close flow
- error monitoring
- admin/operator functionality
