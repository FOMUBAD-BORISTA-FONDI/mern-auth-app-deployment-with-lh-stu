# MERN Auth Demo — Localhost Academy

A minimal MERN stack app with role-based authentication (Admin / User), built for
classroom deployment testing.

- `backend/` — Express + MongoDB (Atlas) + JWT API
- `frontend/` — React (Vite) client

**Follow the full step-by-step guide** provided alongside this project
(`MERN_Deployment_Guide.md`) for local setup, MongoDB Atlas configuration, and
deployment to Render (backend) + Vercel (frontend).

Quick local start (after configuring `.env` files, see the guide):

```bash
# Backend
cd backend
npm install
npm run seed   # creates demo admin + user accounts
npm run dev    # http://localhost:5000

# Frontend (in a second terminal)
cd frontend
npm install
npm run dev    # http://localhost:5173
```
