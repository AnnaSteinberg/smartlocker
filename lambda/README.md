# Lambda Service

## Purpose

This service simulates a local lambda endpoint for development and learning purposes.

## Tech Stack

- Node.js
- Express
- TypeScript

## Environment Variables

Create a `.env` file in the `lambda` folder:

```env
PORT=4000
Install Dependencies
npm install
Run in Development Mode
npm run dev
The service will run on:
http://localhost:4000
Health Endpoint
GET /health
Example:
http://localhost:4000/health
Expected Response
{
  "status": "ok",
  "service": "lambda"
}
Notes
•
This service is used by the backend through HTTP.
•
It is a local development substitute for a real AWS Lambda integration.