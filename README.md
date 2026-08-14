# Smart Task Management System

A full-stack task management application built with React, Node.js, Express, MongoDB, and Gemini AI.

The application allows users to securely register and log in, create and manage tasks, search and filter tasks, and use AI to generate task descriptions.

## Live Demo

- Frontend: https://smart-task-manager-ten-topaz.vercel.app/
- Backend: https://smart-task-manager-backend-0s79.onrender.com

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Protected task and AI API routes
- Password hashing using bcrypt
- Logout functionality

### Task Management
- Create tasks
- View tasks
- Edit tasks
- Delete tasks
- Set task status
- Set task priority
- Form validation
- Newly created tasks appear at the top

### Search and Filtering
- Search tasks by title
- Filter tasks by status
- Combined search and status filtering

### AI-Powered Feature
- Generate task descriptions using Gemini AI
- Available while creating a task
- Available while editing a task
- Generated descriptions can be manually edited before saving

### User Experience
- Responsive interface
- Dark mode
- Collapsible create-task form
- Edit task modal
- Loading and error states
- Empty-state messaging
- Personalized welcome message

## Tech Stack

### Frontend
- React
- JavaScript
- Vite
- CSS
- Fetch API

### Backend
- Node.js
- Express.js
- JWT
- bcrypt
- REST APIs

### Database
- MongoDB
- Mongoose
- MongoDB Atlas

### AI
- Google Gemini API

## Project Structure

```
smart-task-manager/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── taskController.js
│   │   └── aiController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   │
│   └── src/
│       ├── routes/
│       │   ├── authRoutes.js
│       │   ├── taskRoutes.js
│       │   └── aiRoutes.js
│       └── server.js
│
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Dashboard.jsx
│       │   ├── EditTaskForm.jsx
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── TaskCard.jsx
│       │   └── TaskForm.jsx
│       │
│       ├── services/
│       │   ├── authService.js
│       │   └── taskService.js
│       │
│       ├── App.jsx
│       ├── App.css
│       └── index.css
│
└── README.md
```

## API Overview

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Authenticate a user |

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get user's tasks |
| POST | /api/tasks | Create a task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

### AI

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/ai/generate-description | Generate a task description |

Protected endpoints require:

```
Authorization: Bearer <JWT_TOKEN>
```

## Running Locally

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd smart-task-manager
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure backend environment variables

Create:

```
backend/.env
```

Add:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Start the backend

```bash
npm run dev
```

The backend will run locally using the development server.

### 5. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 6. Configure frontend environment variables

Create:

```
frontend/.env
```

Add:

```
VITE_API_URL=http://localhost:5000/api
```

Replace the port if your backend uses a different one.

### 7. Start the frontend

```bash
npm run dev
```

The Vite development server will provide the local frontend URL.

## Environment Variables

### Backend

| Variable | Purpose |
|----------|---------|
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret used to sign JWTs |
| GEMINI_API_KEY | Gemini API authentication |

### Frontend

| Variable | Purpose |
|----------|---------|
| VITE_API_URL | Base URL of the backend API |

Never commit `.env` files or API keys to the repository.

## Authentication Flow

```
User
  |
  v
Login / Register
  |
  v
Express Authentication API
  |
  v
MongoDB
  |
  v
JWT generated during login
  |
  v
Frontend stores JWT
  |
  v
JWT sent with protected API requests
  |
  v
Authentication middleware verifies JWT
  |
  v
Controller handles request
```

## AI Description Generation

The AI feature is intentionally lightweight.

When the user enters a task title and selects Generate Description:

```
React Frontend
      |
      v
POST /api/ai/generate-description
      |
      v
Express Backend
      |
      v
Gemini API
      |
      v
Generated Description
      |
      v
Description field in React
```

The Gemini API key is kept on the backend and is never exposed to the frontend.

## Security Considerations

- Passwords are hashed using bcrypt.
- JWT authentication protects private API routes.
- Gemini API credentials are stored as backend environment variables.
- Environment files are excluded from Git.
- Users can only access and modify their own tasks.

## Deployment

The application is deployed using separate frontend and backend services.

### Frontend

Deployed on Vercel.

```
React + Vite
     ↓
Vercel
```

### Backend

Deployed on Render.

```
Node.js + Express
     ↓
Render
```

### Database

MongoDB Atlas is used as the production database.

### AI

Gemini API is used for AI-powered task description generation.
