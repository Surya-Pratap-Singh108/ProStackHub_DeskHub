# DeskHub

## Overview
A simple two-role helpdesk ticketing system built as a MERN stack application.

## Features
- JWT authentication with Customer / Agent role selection at signup
- Customers can create tickets (title, description, priority) and view only their own tickets
- Agents can view all tickets and update ticket status
- Strict status flow: **Open → In Progress → Resolved**
- Server-side enforcement of JWT, role, and ticket ownership

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React, Vite, React Router, Axios, plain CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB (Atlas), Mongoose |
| Auth | JWT, bcryptjs |

## Setup

### Prerequisites
- Node.js ≥ 18
- MongoDB Atlas account

### Backend
```bash
cd backend
npm install
# Fill in .env (see below)
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

**backend/.env**
```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

**frontend/.env**
```
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | None | Register a new user |
| POST | `/api/auth/login` | None | Login, returns JWT |
| POST | `/api/tickets` | Any role | Create a ticket |
| GET | `/api/tickets` | Any role | Customer: own tickets; Agent: all tickets |
| GET | `/api/tickets/:id` | Any role | Get ticket (ownership enforced) |
| PATCH | `/api/tickets/:id/status` | Agent only | Advance ticket status |

## Live Demo
*To be added after deployment to Vercel (frontend) and Render (backend).*

## GitHub
[ProStackHub_DeskHub](https://github.com/YOUR_USERNAME/ProStackHub_DeskHub)
