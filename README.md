# JobFlow

A full-stack job application tracking platform that helps job seekers organize applications, track interview progress, and manage offers in one place.

## 🚀 Live Demo

**Frontend:** https://job-flow-brown.vercel.app/

**Backend API:** https://jobflow-production-3aac.up.railway.app/

**API Documentation:** https://jobflow-production-3aac.up.railway.app/docs

## Overview

JobFlow was built to solve a simple problem: job searching becomes difficult to manage when applications, interview stages, companies, and offers are scattered across different places.

The application provides a centralized dashboard where users can securely manage their job applications and track their progress.

## Features

* 🔐 User registration and JWT authentication
* 👤 User-specific application data
* ➕ Create job applications
* ✏️ Edit existing applications
* 🗑️ Delete applications
* 🔎 Filter applications by company and status
* 📊 Application statistics dashboard
* 🎯 Interview tracking
* 💼 Offer tracking
* 💰 Salary tracking
* 📅 Application date tracking
* 🌙 Dark SaaS-style dashboard
* 📱 Responsive frontend
* 🔒 Protected API endpoints
* 🌐 React frontend connected to FastAPI backend

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* Python
* FastAPI
* SQLAlchemy
* JWT Authentication
* Passlib / bcrypt

### Database

* MySQL

### Development Tools

* Git
* GitHub
* VS Code
* MySQL Workbench

## Architecture

```text
                    ┌─────────────────────┐
                    │      React UI       │
                    │      Vite           │
                    └──────────┬──────────┘
                               │
                               │ HTTP / JSON
                               ▼
                    ┌─────────────────────┐
                    │      FastAPI        │
                    │      REST API       │
                    └──────────┬──────────┘
                               │
                     JWT Authentication
                               │
                               ▼
                    ┌─────────────────────┐
                    │     SQLAlchemy      │
                    │        ORM          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       MySQL         │
                    └─────────────────────┘
```

## Authentication

JobFlow uses JWT-based authentication.

Users can:

1. Register an account.
2. Log in with their credentials.
3. Receive an access token.
4. Use the token to access protected endpoints.
5. Manage only their own applications.

Passwords are hashed before being stored in the database.

## Application Workflow

```text
Register
   ↓
Login
   ↓
Receive JWT
   ↓
Access Dashboard
   ↓
Create Application
   ↓
Track Status
   ↓
Interview
   ↓
Offer / Rejection
```

## API Endpoints

| Method | Endpoint              | Description                   |
| ------ | --------------------- | ----------------------------- |
| POST   | `/register`           | Register a new user           |
| POST   | `/login`              | Authenticate user             |
| GET    | `/me`                 | Get current user              |
| GET    | `/`                   | API health/authenticated home |
| POST   | `/applications`       | Create application            |
| GET    | `/applications`       | Get user's applications       |
| GET    | `/applications/{id}`  | Get one application           |
| PUT    | `/applications/{id}`  | Update application            |
| DELETE | `/applications/{id}`  | Delete application            |
| GET    | `/applications/stats` | Get application statistics    |

## Project Structure

```text
JobFlow/
│
├── backend/
│   ├── main.py
│   ├── auth.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── Login.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

> `.env` contains local secrets and is intentionally excluded from GitHub.

## Running Locally

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd JobFlow
```

### 2. Backend

```bash
cd backend
```

Create and activate a virtual environment:

```bash
python -m venv venv
```

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file:

```env
SECRET_KEY=your-secret-key
```

Configure your MySQL database in the project's database configuration.

Start the API:

```bash
uvicorn main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```

### 3. Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## Deployment

JobFlow is deployed using:

- **Frontend:** Vercel
- **Backend:** Railway
- **Database:** MySQL

The React frontend communicates with the deployed FastAPI backend through HTTP/JSON requests.

Production CORS configuration allows the deployed frontend to securely communicate with the backend API.


## Security

Sensitive configuration is stored in environment variables rather than committed directly to the repository.

The `.gitignore` prevents local environment files and Python virtual environments from being uploaded.

## What I Learned

Building JobFlow involved working across the complete application stack:

* Designing REST APIs
* Building CRUD operations
* Working with relational databases
* Using SQLAlchemy ORM
* Implementing JWT authentication
* Hashing passwords securely
* Connecting React to a FastAPI backend
* Handling authentication tokens on the frontend
* Managing application state in React
* Debugging frontend/backend integration issues
* Using Git and GitHub for version control
* Preparing a project for deployment

## Future Improvements

* Email notifications for interview reminders
* Advanced application search
* Resume management
* Job description tracking
* Interview calendar
* Analytics and application success rates
* Automated job-board integrations
* AI-powered application insights

## Author

**Jaswanth**

Built as a full-stack portfolio project focused on solving a practical job-search problem.
