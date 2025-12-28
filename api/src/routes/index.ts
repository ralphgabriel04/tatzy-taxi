import { Router } from 'express'
import bookingsRouter from './bookings.js'
// import serviceRequestsRouter from './service-requests.js'
// import driversRouter from './drivers.js'

const router = Router()

// API routes
router.use('/bookings', bookingsRouter)
// router.use('/service-requests', serviceRequestsRouter)
// router.use('/drivers', driversRouter)

export default router
