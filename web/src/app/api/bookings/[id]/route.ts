import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateBookingSchema } from '@/lib/validation'
import { ZodError } from 'zod'

type RouteParams = {
  params: Promise<{ id: string }>
}

// ===========================================
// GET - Single Booking (Admin)
// ===========================================
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

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
      return NextResponse.json(
        {
          success: false,
          message: 'Réservation non trouvée',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: booking,
    })
  } catch (error) {
    console.error('Error fetching booking:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Erreur lors de la récupération de la réservation',
      },
      { status: 500 }
    )
  }
}

// ===========================================
// PATCH - Update Booking (Admin)
// ===========================================
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()
    const data = updateBookingSchema.parse(body)

    // Check booking exists
    const existing = await prisma.booking.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          message: 'Réservation non trouvée',
        },
        { status: 404 }
      )
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

    return NextResponse.json({
      success: true,
      message: 'Réservation mise à jour',
      data: booking,
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Données invalides',
          errors: error.errors,
        },
        { status: 400 }
      )
    }

    console.error('Error updating booking:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Erreur lors de la mise à jour de la réservation',
      },
      { status: 500 }
    )
  }
}

// ===========================================
// DELETE - Cancel Booking (Admin - soft delete)
// ===========================================
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    const existing = await prisma.booking.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          message: 'Réservation non trouvée',
        },
        { status: 404 }
      )
    }

    // Soft delete by setting status to CANCELLED
    await prisma.booking.update({
      where: { id },
      data: { status: 'CANCELLED' },
    })

    return NextResponse.json({
      success: true,
      message: 'Réservation annulée',
    })
  } catch (error) {
    console.error('Error cancelling booking:', error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de l'annulation de la réservation",
      },
      { status: 500 }
    )
  }
}
