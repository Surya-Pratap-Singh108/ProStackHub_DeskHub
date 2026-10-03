# DeskHub — Architecture

## Frontend / Backend

```
frontend/   (React + Vite, served on :5173)
    └── Axios → HTTP requests with Bearer token
backend/    (Express, served on :5000)
    └── MongoDB Atlas (Mongoose ODM)
```

## MongoDB

Two collections:
- **users** — `name`, `email`, `password` (bcrypt hash), `role`
- **tickets** — `title`, `description`, `priority`, `status`, `createdBy` (ref → User), timestamps

## JWT Authentication

On login the server signs a JWT containing `{ userId, role }` with `JWT_SECRET`.  
The client stores it in `localStorage` and attaches it via `Authorization: Bearer <token>` on every request.  
The `auth` middleware verifies the token on every protected route and populates `req.user`.

## Customer vs Agent Authorization

| Operation | Middleware | Logic |
|-----------|-----------|-------|
| Create ticket | `auth` | `createdBy` set from `req.user.userId` — never from request body |
| GET /tickets | `auth` | Customers get `{ createdBy: userId }` filter; Agents get all |
| GET /tickets/:id | `auth` | Customers blocked if `ticket.createdBy !== req.user.userId` |
| PATCH status | `auth` + `agentOnly` | Agents only; transition validated server-side |

## Ticket Ownership Protection

On `GET /api/tickets/:id`, after fetching the ticket the server compares  
`ticket.createdBy.toString()` with `req.user.userId`.  
A mismatch returns `403 Not authorized`.  
This check cannot be bypassed from the frontend.

## Status Transition Logic

```js
const VALID_TRANSITIONS = {
  'Open':        'In Progress',
  'In Progress': 'Resolved',
  // 'Resolved' key absent → any transition from Resolved is rejected
};
```

The requested `status` must exactly match `VALID_TRANSITIONS[currentStatus]`.  
Any other value, including skipping states, returns `400 Invalid status transition`.
