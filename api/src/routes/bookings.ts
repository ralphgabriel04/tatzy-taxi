import { Router } from 'express'
import {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking,
} from '../controllers/bookingController.js'

const router = Router()

// Public routes
router.post('/', createBooking)

// Admin routes (TODO: add auth middleware in Phase 2)
router.get('/', getBookings)
router.get('/:id', getBooking)
router.patch('/:id', updateBooking)
router.delete('/:id', deleteBooking)

export default router
