# NIELIT Tech Clubs — Full Stack Platform

Official web platform, automated registration workflows, transactional email systems, and administrative approval center for the NIELIT Tech Clubs ecosystem.

---

## 1. Project Directory Structure

```
NIELIT CLUBS/
├── frontend/                     # React + Vite Client Application
│   ├── src/
│   │   ├── assets/              # Icons, club badges, 3D assets & illustrations
│   │   ├── components/          # Reusable UI & 3D ThreeCanvas components
│   │   ├── context/             # AdminAuthContext & AuthContext providers
│   │   ├── pages/               # Public, Student Portal, & Admin Dashboard pages
│   │   ├── sections/            # Club landing page sections & Register form
│   │   ├── services/            # API services (adminApi, authApi, registration)
│   │   └── styles/              # Design tokens & CSS styles
│   ├── public/                  # Static assets & 3D GLB models
│   ├── index.html               # Entry HTML
│   ├── vite.config.js           # Vite configuration
│   └── package.json             # Frontend dependencies & scripts
│
├── backend/                      # Node.js + Express + MongoDB Atlas Service
│   ├── src/
│   │   ├── config/              # MongoDB Atlas connection manager (db.js)
│   │   ├── controllers/         # Admin, Student & Registration controllers
│   │   ├── middleware/          # JWT auth middleware & rate limiters
│   │   ├── models/              # Registration & User Mongoose models
│   │   ├── routes/              # Express API routers
│   │   ├── services/            # Transactional Resend email service
│   │   ├── templates/           # Responsive HTML email templates
│   │   └── server.js            # Express server initialization
│   ├── test-phase5.js           # Full Phase 5 integration test suite
│   ├── test-phase4.js           # Admin inspection test suite
│   ├── test-phase3.js           # Automated email test suite
│   ├── test-registration.js     # Registration validation test suite
│   ├── .env                     # Backend secrets (ignored by git)
│   ├── .env.example             # Clean environment template
│   └── package.json             # Backend dependencies & scripts
│
├── docs/                         # Project Documentation & Design References
│   └── design/                  # UI Wireframes, initial mockups & SVGs
│
├── .gitignore                   # Workspace gitignore rules
├── package.json                 # Monorepo root script orchestrator
└── README.md                    # Project documentation
```

---

## 2. Quick Start

### A. Install Dependencies
```bash
# Install root orchestration tools
npm install

# Install frontend dependencies
npm --prefix frontend install

# Install backend dependencies
npm --prefix backend install
```

### B. Environment Setup
Configure `backend/.env` based on `backend/.env.example`:
```bash
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/nielit_tech_clubs?retryWrites=true&w=majority
FRONTEND_URL=http://localhost:5173,http://localhost:5174
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=1d
ADMIN_EMAIL=admin@nielit.edu.in
ADMIN_PASSWORD_HASH=$2b$10$...
RESEND_API_KEY=re_...
EMAIL_FROM=NIELIT Tech Clubs <onboarding@resend.dev>
```

---

## 3. Running Locally

### Run Both Frontend & Backend Concurrently:
```bash
npm run dev
```

### Or Run Individually:
```bash
# Start Frontend Only (http://localhost:5173)
npm run dev:frontend

# Start Backend Only (http://localhost:5000)
npm run dev:backend
```

---

## 4. Running Backend Integration Tests:
```bash
npm test
```
Or run individual phase test suites:
```bash
cd backend
node test-phase5.js
node test-phase4.js
node test-phase3.js
node test-registration.js
```

---

## 5. Build for Production
```bash
npm run build
```
The compiled frontend bundle will be generated in `frontend/dist/`.
