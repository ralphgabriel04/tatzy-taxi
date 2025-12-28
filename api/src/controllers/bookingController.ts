import { Request, Response, NextFunction } from 'express'
import { prisma } from '../services/db.js'
import {
  createBookingSchema,
  updateBookingSchema,
  bookingQuerySchema,
  type CreateBookingInput,
} from '../services/validation.js'
import { ZodError } from 'zod'

// Long distance threshold (configurable via env)
const LONG_DISTANCE_THRESHOLD_KM = Number(process.env.LONG_DISTANCE_THRESHOLD_KM) || 40

// ===========================================
// CREATE BOOKING (Public)
// ===========================================
export async function createBooking(req: Request, res: Response, next: NextFunction) {
  try {
    // Validate input
    const data = createBookingSchema.parse(req.body)

    // Check honeypot (anti-spam)
    if (data.website && data.website.length > 0) {
      // Silently reject spam
      return res.status(201).json({
        success: true,
        message: 'Réservation créée avec succès',
      })
    }

    // Determine if long distance (will be calculated properly with Maps API later)
    const isLongDistance = false // Placeholder until Maps integration

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail || null,
        pickupAddress: data.pickupAddress,
        dropoffAddress: data.dropoffAddress,
        pickupLat: data.pickupLat,
        pickupLng: data.pickupLng,
        dropoffLat: data.dropoffLat,
        dropoffLng: data.dropoffLng,
        pickupDateTime: new Date(data.pickupDateTime),
        customerNotes: data.customerNotes,
        isLongDistance,
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
      },
    })

    // TODO: Send notification emails (Sprint 3)

    res.status(201).json({
      success: true,
      message: 'Réservation créée avec succès',
      data: {
        id: booking.id,
        status: booking.status,
        pickupDateTime: booking.pickupDateTime,
      },
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Données invalides',
        errors: error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      })
    }
    next(error)
  }
}

// ===========================================
// GET BOOKINGS (Admin)
// ===========================================
export async function getBookings(req: Request, res: Response, next: NextFunction) {
  try {
    const query = bookingQuerySchema.parse(req.query)
    const { page, limit, status, driverId, fromDate, toDate } = query

    // Build where clause
    const where: Record<string, unknown> = {}
    if (status) where.status = status
    if (driverId) where.driverId = driverId
    if (fromDate || toDate) {
      where.pickupDateTime = {}
      if (fromDate) (where.pickupDateTime as Record<string, unknown>).gte = new Date(fromDate)
      if (toDate) (where.pickupDateTime as Record<string, unknown>).lte = new Date(toDate)
    }

    // Get total count
    const total = await prisma.booking.count({ where })

    // Get bookings with pagination
    const bookings = await prisma.booking.findMany({
      where,
      include: {
        assignedDriver: {
          select: {
            id: true,
            name: true,
            phone: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    })

    res.json({
      success: true,
      data: bookings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Paramètres invalides',
        errors: error.errors,
      })
    }
    next(error)
  }
}

// ===========================================
// GET SINGLE BOOKING (Admin)
// ===========================================
export async function getBooking(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        assignedDriver: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
          },
        },
      },
    })

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Réservation non trouvée',
      })
    }

    res.json({
      success: true,
      data: booking,
    })
  } catch (error) {
    next(error)
  }
}

// ===========================================
// UPDATE BOOKING (Admin)
// ===========================================
export async function updateBooking(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    const data = updateBookingSchema.parse(req.body)

    // Check booking exists
    const existing = await prisma.booking.findUnique({ where: { id } })
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Réservation non trouvée',
      })
    }

    // Update booking
    const booking = await prisma.booking.update({
      where: { id },
      data: {
        status: data.status,
        driverId: data.driverId,
        dispatcherNotes: data.dispatcherNotes,
        finalPrice: data.finalPrice,
      },
      include: {
        assignedDriver: {
          select: {
            id: true,
            name: true,
            phone: true,
          },
        },
      },
    })

    res.json({
      success: true,
      message: 'Réservation mise à jour',
      data: booking,
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Données invalides',
        errors: error.errors,
      })
    }
    next(error)
  }
}

// ===========================================
// DELETE BOOKING (Admin - soft delete via status)
// ===========================================
export async function deleteBooking(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params

    const existing = await prisma.booking.findUnique({ where: { id } })
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Réservation non trouvée',
      })
    }

    // Soft delete by setting status to CANCELLED
    await prisma.booking.update({
      where: { id },
      data: { status: 'CANCELLED' },
    })

    res.json({
      success: true,
      message: 'Réservation annulée',
    })
  } catch (error) {
    next(error)
  }
}
