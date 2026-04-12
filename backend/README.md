# Backend

## Purpose

This backend receives HTTP requests from the client and calls the lambda service to get the health status.

## Tech Stack

- Node.js
- Express
- TypeScript

## Environment Variables

Create a `.env` file in the `backend` folder:

```env
PORT=3001
LAMBDA_URL=http://localhost:4000
Install Dependencies
npm install
Run in Development Mode
npm run dev
The backend will run on:
http://localhost:3001
Health Endpoint
GET /api/health
Example:
http://localhost:3001/api/health
Expected Successful Response
{
  "status": "ok",
  "source": "lambda"
}
Notes
•
The lambda service must be running before testing the backend health endpoint.
•
If lambda is unavailable, the backend returns a 502 error.