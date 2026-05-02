import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';

import env from './config/env.js';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import scanRoutes from './routes/scanRoutes.js';
import sugarRoutes from './routes/sugarRoutes.js';
import alcoholRoutes from './routes/alcoholRoutes.js';
import waterRoutes from './routes/waterRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express
const app = express();

// ────────────────────────────────────────────────────────────────
// Core Middleware
// ────────────────────────────────────────────────────────────────

// CORS — allow frontend dev server
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://trust-pulse-blue.vercel.app'
  ],
  credentials: true
}));

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use('/api', limiter);

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ────────────────────────────────────────────────────────────────
// API Routes
// ────────────────────────────────────────────────────────────────

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/scan', scanRoutes);
app.use('/api/v1/sugar', sugarRoutes);
app.use('/api/v1/alcohol', alcoholRoutes);
app.use('/api/v1/water', waterRoutes);
app.use('/api/v1/reports', reportRoutes);

// Health check
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'TrustPulse API is running',
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// 404 for unknown API routes
app.all('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ────────────────────────────────────────────────────────────────
// Global Error Handler (MUST be last middleware)
// ────────────────────────────────────────────────────────────────
app.use(errorHandler);

// ────────────────────────────────────────────────────────────────
// Start Server
// ────────────────────────────────────────────────────────────────
const startServer = async () => {
  // Connect to MongoDB
  await connectDB();

  app.listen(env.PORT, () => {
    console.log(`
╔══════════════════════════════════════════════════╗
║                                                  ║
║   🚀 TrustPulse API Server                      ║
║   ─────────────────────────                      ║
║   Port:        ${env.PORT}                            ║
║   Environment: ${env.NODE_ENV.padEnd(16)}             ║
║   API Base:    /api/v1                           ║
║                                                  ║
╚══════════════════════════════════════════════════╝
    `);
  });
};

startServer();

export default app;
