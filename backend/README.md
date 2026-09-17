# NIELIT Tech Clubs Backend (Phase 5)

Full-stack Node.js + Express backend service, Registration API, Automated Resend Email workflows, Admin Authentication, Decision Review Hub (`APPROVE` / `REJECT`), and Student Account Activation for the NIELIT Tech Clubs ecosystem.

---

## 1. Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or higher)
- [MongoDB Atlas](https://www.mongodb.com/atlas) Cluster account (Cluster0)
- [Resend](https://resend.com/) API account and key
- Whitelisted IP address in MongoDB Atlas Network Access

---

## 2. Installation

Navigate to the `backend` directory and install runtime & development dependencies:

```bash
cd backend
npm install
```

---

## 3. Environment Configuration

Create a `.env` file inside the `backend/` directory based on `.env.example`:

```bash
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.ntkfbbi.mongodb.net/nielit_tech_clubs?retryWrites=true&w=majority&appName=Cluster0
FRONTEND_URL=http://localhost:5173,http://localhost:5174

# JWT Authentication
JWT_SECRET=your_long_random_jwt_secret_here
JWT_EXPIRES_IN=1d

# Admin Credentials
ADMIN_EMAIL=admin@nielit.edu.in
ADMIN_PASSWORD_HASH=$2b$10$generated_bcrypt_hash_here

# Resend Email Configuration
RESEND_API_KEY=re_your_api_key_here
EMAIL_FROM=NIELIT Tech Clubs <onboarding@resend.dev>
```

> **Security Note:** Never commit `.env` to version control. The `.gitignore` file automatically excludes all `.env` files.

---

## 4. Running the Server

### Development Mode (with hot-reload via nodemon):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

### Running Automated Integration Tests:
```bash
# Phase 2: Registration Submission & Validation Tests (8/8 Passed)
node test-registration.js

# Phase 3: Automated Registration Received Email Tests (4/4 Passed)
node test-phase3.js

# Phase 4: Admin Registration Inspection & Filter Tests (10/10 Passed)
node test-phase4.js

# Phase 5: Admin Auth, Decision Workflow & Student Auth Tests (14/14 Passed)
node test-phase5.js
```

---

## 5. API Endpoints & Workflows

### A. Public Registration API
- **`POST /api/registrations`**: Student submits an application. Saved in MongoDB with `status = 'PENDING'` and triggers **Registration Received** email.

### B. Admin Authentication API
- **`POST /api/admin/auth/login`**: Authenticates against `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH`. Sets HTTP-only `nielit_admin_token` cookie. Rate limited.
- **`POST /api/admin/auth/logout`**: Clears `nielit_admin_token` cookie.
- **`GET /api/admin/auth/me`**: Returns current administrator session (guarded by `requireAdmin`).

### C. Admin Registration Management & Decision API (Protected)
- **`GET /api/admin/registrations`**: Paginated, filtered, searched list of registrations (`status`, `club`, `semester`, `search`, `page`, `limit`).
- **`GET /api/admin/registrations/stats`**: Live aggregation counts (Total, Pending, Approved, Rejected, and Club breakdown).
- **`GET /api/admin/registrations/:id`**: Full registration details by MongoDB ObjectId.
- **`PATCH /api/admin/registrations/:id/approve`**: 
  - Validates `status == 'PENDING'`.
  - Generates secure temporary password and bcrypt hash.
  - Creates active student in `User` collection.
  - Updates `Registration.status = 'APPROVED'`.
  - Sends **Application Approved** email with credentials.
- **`PATCH /api/admin/registrations/:id/reject`**:
  - Validates `status == 'PENDING'`.
  - Updates `Registration.status = 'REJECTED'` and records reason.
  - Does NOT create a student User.
  - Sends **Application Update** email.

### D. Student Authentication API
- **`POST /api/auth/login`**: Authenticates active student (`role = 'STUDENT'`, `accountStatus = 'ACTIVE'`). Sets HTTP-only `nielit_student_token` cookie.
- **`POST /api/auth/logout`**: Clears `nielit_student_token` cookie.
- **`GET /api/auth/me`**: Returns safe authenticated student profile (password hash omitted).

---

## 6. Directory Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                            # MongoDB Atlas connection manager
│   ├── controllers/
│   │   ├── registration.controller.js       # Student registration submission
│   │   ├── adminRegistration.controller.js  # Phase 4 & 5 inspection and approve/reject
│   │   ├── adminAuth.controller.js          # Admin login/logout & cookie management
│   │   └── studentAuth.controller.js        # Student login/logout & /me profile
│   ├── middleware/
│   │   ├── auth.js                          # requireAdmin & requireStudent JWT middleware
│   │   ├── errorHandler.js                  # Centralized sanitized error handler
│   │   └── rateLimiter.js                   # Brute-force protection for login routes
│   ├── models/
│   │   ├── Registration.js                  # Registration schema & decisionEmailStatus
│   │   └── User.js                          # Active student account schema (bcrypt hashed)
│   ├── routes/
│   │   ├── registration.routes.js           # /api/registrations routes
│   │   ├── adminRegistration.routes.js      # /api/admin/registrations protected routes
│   │   ├── adminAuth.routes.js              # /api/admin/auth routes
│   │   └── studentAuth.routes.js            # /api/auth routes
│   ├── services/
│   │   └── email.service.js                 # Resend SDK wrapper for all 3 email types
│   ├── templates/
│   │   ├── registrationReceived.js          # Phase 3 HTML receipt email template
│   │   ├── applicationApproved.js           # Phase 5 HTML approval & credentials template
│   │   └── applicationRejected.js           # Phase 5 HTML polite update template
│   └── server.js                            # Express app, CORS & cookie-parser setup
├── test-registration.js                     # Phase 2 test suite
├── test-phase3.js                           # Phase 3 test suite
├── test-phase4.js                           # Phase 4 test suite
├── test-phase5.js                           # Phase 5 test suite
├── .env                                     # Local environment secrets (ignored)
├── .env.example                             # Clean environment template
├── .gitignore                               # Ignores node_modules, .env, and logs
├── package.json                             # Dependencies & scripts
└── README.md                                # Documentation
```
