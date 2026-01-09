import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createBookingSchema, bookingQuerySchema } from '@/lib/validation'
import { ZodError } from 'zod'

// ===========================================
// POST - Create Booking (Public)
// ===========================================
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const data = createBookingSchema.parse(body)

    // Check honeypot (anti-spam)
    if (data.website && data.website.length > 0) {
      // Silently reject spam
      return NextResponse.json(
        {
          success: true,
          message: 'Réservation créée avec succès',
        },
        { status: 201 }
      )
    }

    // Get client IP and user agent
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const userAgent = request.headers.get('user-agent') || undefined

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
        isLongDistance: false, // Placeholder until Maps integration
        ipAddress,
        userAgent,
        source: 'web',
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Réservation créée avec succès',
        data: {
          id: booking.id,
          status: booking.status,
          pickupDateTime: booking.pickupDateTime,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Données invalides',
          errors: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      )
    }

    console.error('Error creating booking:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Erreur lors de la création de la réservation',
      },
      { status: 500 }
    )
  }
}

// ===========================================
// GET - List Bookings (Admin)
// ===========================================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const queryParams = Object.fromEntries(searchParams.entries())

    const query = bookingQuerySchema.parse(queryParams)
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

    return NextResponse.json({
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
      return NextResponse.json(
        {
          success: false,
          message: 'Paramètres invalides',
          errors: error.errors,
        },
        { status: 400 }
      )
    }

    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Erreur lors de la récupération des réservations',
      },
      { status: 500 }
    )
  }
}
