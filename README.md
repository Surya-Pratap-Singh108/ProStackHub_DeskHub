# DeskHub

A simple two-role helpdesk ticketing system built with the MERN stack for the ProStackHub Full Stack Development Internship.

## Overview

DeskHub allows customers to create and track support tickets, while agents can view and manage all tickets.

The application implements JWT authentication, role-based authorization, ticket ownership protection, and a strict ticket status workflow.

## Features

- JWT authentication
- Customer and Agent role selection during registration
- Password hashing with bcryptjs
- Customers can create tickets
- Tickets contain title, description, and priority
- Customers can view only their own tickets
- Agents can view all tickets
- Agents can update ticket status
- Strict status flow:
  - Open → In Progress
  - In Progress → Resolved
- Server-side JWT authentication and authorization
- Server-side ticket ownership protection

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- CSS

### Backend

- Node.js
- Express.js
- Mongoose
- JWT
- bcryptjs
- CORS

### Database

- MongoDB Atlas

## Project Structure

```text
DeskHub/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
│
├── frontend/
│   └── src/
│
├── README.md
└── ARCHITECTURE.md
```

## Setup

### Prerequisites

- Node.js 18+
- MongoDB Atlas account

### Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

## API Endpoints

| Method | Endpoint | Authentication | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Register Customer or Agent |
| POST | `/api/auth/login` | No | Login and receive JWT |
| POST | `/api/tickets` | JWT | Create a ticket |
| GET | `/api/tickets` | JWT | Customer: own tickets; Agent: all tickets |
| GET | `/api/tickets/:id` | JWT | Get ticket with ownership protection |
| PATCH | `/api/tickets/:id/status` | Agent | Update ticket status |

## Authorization

### Customer

- Can create tickets
- Can view only their own tickets
- Cannot update ticket status
- Cannot access another customer's ticket

### Agent

- Can view all tickets
- Can view ticket details
- Can update ticket status

## Status Workflow

```text
Open
  ↓
In Progress
  ↓
Resolved
```

Skipping or reversing status transitions is rejected by the backend.

## Security

- Passwords are hashed using bcryptjs.
- JWT is required for protected API routes.
- Agent-only operations are checked server-side.
- Ticket ownership is checked server-side.
- `createdBy` is taken from the authenticated user's JWT rather than the request body.
- Environment variables are not committed to GitHub.

## Live Demo

https://pro-stack-hub-desk-hub.vercel.app/

## Backend

https://prostackhub-deskhub.onrender.com

## GitHub

https://github.com/Surya-Pratap-Singh108/ProStackHub_DeskHub

## Internship

Developed as part of the **ProStackHub Full Stack Development Internship**.