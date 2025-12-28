import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import apiRoutes from './routes/index.js'

// Load environment variables
dotenv.config({ path: '../.env.local' })

const app = express()
const PORT = process.env.API_PORT || 4000

// ===========================================
// MIDDLEWARES
// ===========================================

// Security headers
app.use(helmet())

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}))

// Logging
app.use(morgan('dev'))

// Body parsing
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rate limiting for public endpoints
const publicLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute
  message: {
    success: false,
    message: 'Trop de requêtes, veuillez réessayer plus tard',
  },
  standardHeaders: true,
  legacyHeaders: false,
})

// Apply rate limiting to booking creation
app.use('/api/bookings', (req, res, next) => {
  if (req.method === 'POST') {
    return publicLimiter(req, res, next)
  }
  next()
})

// ===========================================
// ROUTES
// ===========================================

// Health check
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  })
})

// API info
app.get('/api', (_req, res) => {
  res.json({
    name: 'Tatzy Taxi API',
    version: '0.1.0',
    endpoints: {
      health: 'GET /health',
      bookings: {
        create: 'POST /api/bookings',
        list: 'GET /api/bookings',
        get: 'GET /api/bookings/:id',
        update: 'PATCH /api/bookings/:id',
        delete: 'DELETE /api/bookings/:id',
      },
    },
  })
})

// API routes
app.use('/api', apiRoutes)

// ===========================================
// ERROR HANDLING
// ===========================================

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint non trouvé',
  })
})

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err.message)
  console.error(err.stack)

  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'Erreur serveur'
      : err.message,
  })
})

// ===========================================
// SERVER
// ===========================================

app.listen(PORT, () => {
  console.log(`
  🚕 Tatzy Taxi API running!

  → Local:      http://localhost:${PORT}
  → Health:     http://localhost:${PORT}/health
  → API Info:   http://localhost:${PORT}/api
  → Bookings:   http://localhost:${PORT}/api/bookings

  Environment: ${process.env.NODE_ENV || 'development'}
  `)
})

export default app
