# Notes App - Backend
This repository contains the backend API for the Notes application.
It handles authentication, authorization, and CRUD operations for notes using JWT-based authentication stored in HTTP-only cookies.

## 🚀 Features
🔐 Authentication

- User registration and login

- JWT-based authentication

- JWT stored in httpOnly cookies

- Authentication middleware for protected routes

- Secure logout

🗒 Notes API

- Create notes

- Fetch user-specific notes

- Delete notes

- All note routes are protected

---
## 🧠 Authentication Strategy
- JWT is generated on login

- Token is stored in an httpOnly cookie

- Browser automatically sends the cookie on every request

- Backend validates JWT via middleware

- Frontend never accesses or stores the token

This approach prevents XSS-based token theft and follows modern security practices.

---
## Project Structure
```text
src/
|-controllers
    |-auth.controller.ts
    |-notes.controller.ts
|-middlewares
    |- auth.middleware.ts
|-models
    |-noteModel.ts
    |-userModel.ts
|-routes
    |-auth.routes.ts
    |-notes.routes.ts
|-types
    |-express.d.ts
|-db.ts
|-env.ts
|-index.ts
```

---
## API Endpoints

### Auth
- POST /auth/register
- POST /auth/login
- GET /auth/me
- POST /auth/logout

### Notes(Protected)
- GET /notes
- POST /notes
- DELETE /notes/:id

---
## 🛠 Tech Stack
- Node.js

- Express

- TypeScript

- MongoDB + Mongoose

- JWT

- bcrypt

- Zod

- Cookie-parser

- CORS
---

## Running The Backend
```bash
npm install
npm run dev
```

Create a .env file with:
```env
MONGODB_URL=your_mongodb_url
JWT_SECRET=your_secret
PORT=3000
```
---
## Notes
- CORS is configured to allow credentials

- JWT is validated via middleware

- Passwords are hashed before storage

- Input validation handled using Zod