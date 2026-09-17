import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';
import registrationRoutes from './routes/registration.routes.js';
import adminRegistrationRoutes from './routes/adminRegistration.routes.js';
import adminAuthRoutes from './routes/adminAuth.routes.js';
import studentAuthRoutes from './routes/studentAuth.routes.js';
import studentRoutes from './routes/student.routes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Apply Helmet for HTTP Security Headers (keep CSP off for decoupled API)
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));

// Configure CORS
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173,http://localhost:5174')
  .split(',')
  .map((origin) => origin.trim().replace(/\/$/, ''))
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or server tests)
    if (!origin) return callback(null, true);

    const isAllowed = allowedOrigins.some(
      (allowed) => origin.toLowerCase() === allowed.toLowerCase()
    );

    if (isAllowed) {
      callback(null, true);
    } else {
      // In local dev, allow localhost variants safely
      if (/^http:\/\/localhost:\d+$/.test(origin) || /^http:\/\/127\.0\.0\.1:\d+$/.test(origin)) {
        return callback(null, true);
      }
      callback(new Error(`Origin ${origin} is not allowed by CORS policy.`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

/**
 * Health Check API Endpoint
 * GET /api/health
 */
app.get('/api/health', (req, res) => {
  const dbStateMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  const dbState = dbStateMap[mongoose.connection.readyState] || 'unknown';

  res.status(200).json({
    success: true,
    message: 'NIELIT Tech Clubs backend is running.',
    database: dbState,
    timestamp: new Date().toISOString()
  });
});

/**
 * Public Student Registration API
 * /api/registrations
 */
app.use('/api/registrations', registrationRoutes);

/**
 * Admin Authentication API (Phase 5)
 * /api/admin/auth/login, /api/admin/auth/logout, /api/admin/auth/me
 */
app.use('/api/admin/auth', adminAuthRoutes);

/**
 * Protected Admin Registration, Decision & Directory API (Phase 4, 5, 6)
 * /api/admin/registrations, /stats, /:id, /approve, /reject, /students, /notifications
 */
app.use('/api/admin', adminRegistrationRoutes);

/**
 * Student Authentication API (Phase 5)
 * /api/auth/login, /api/auth/logout, /api/auth/me
 */
app.use('/api/auth', studentAuthRoutes);

/**
 * Protected Student Portal API (Phase 6)
 * /api/student/profile, /api/student/application, /api/student/notifications
 */
app.use('/api/student', studentRoutes);

// Centralized Error Handling Middleware
app.use(errorHandler);


/**
 * Start Server & Establish Database Connection
 */
async function startServer() {
  console.log('----------------------------------------------------');
  console.log('🚀 Initializing NIELIT Tech Clubs Backend (Phase 5)');
  console.log('----------------------------------------------------');

  // Establish MongoDB Atlas connection
  await connectDB();

  // Start HTTP Listener
  app.listen(PORT, () => {
    console.log(`✓ NIELIT Tech Clubs backend running on port ${PORT}`);
    console.log(`✓ Health endpoint available at http://localhost:${PORT}/api/health`);
    console.log(`✓ Registrations API available at http://localhost:${PORT}/api/registrations`);
    console.log(`✓ Admin API available at http://localhost:${PORT}/api/admin/registrations`);
    console.log(`✓ Student Auth API available at http://localhost:${PORT}/api/auth`);
    console.log('----------------------------------------------------');
  });
}

startServer();
