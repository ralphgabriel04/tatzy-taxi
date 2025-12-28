import { z } from 'zod'

// ===========================================
// COMMON SCHEMAS
// ===========================================

// Phone validation (Canadian format)
export const phoneSchema = z
  .string()
  .min(10, 'Le numéro doit contenir au moins 10 chiffres')
  .regex(/^[\d\s\-\(\)\+]+$/, 'Format de numéro invalide')
  .transform((val) => val.replace(/\D/g, '')) // Remove non-digits

// Email validation
export const emailSchema = z
  .string()
  .email('Adresse email invalide')
  .optional()
  .or(z.literal(''))

// Address validation
export const addressSchema = z
  .string()
  .min(5, 'L\'adresse est trop courte')
  .max(500, 'L\'adresse est trop longue')

// ===========================================
// BOOKING SCHEMAS
// ===========================================

export const createBookingSchema = z.object({
  // Customer info
  customerName: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom est trop long'),
  customerPhone: phoneSchema,
  customerEmail: emailSchema,

  // Route
  pickupAddress: addressSchema,
  dropoffAddress: addressSchema,
  pickupLat: z.number().optional(),
  pickupLng: z.number().optional(),
  dropoffLat: z.number().optional(),
  dropoffLng: z.number().optional(),

  // Schedule
  pickupDateTime: z
    .string()
    .datetime({ message: 'Date/heure invalide' })
    .refine(
      (val) => new Date(val) > new Date(),
      'La date doit être dans le futur'
    ),

  // Notes
  customerNotes: z.string().max(1000, 'Notes trop longues').optional(),

  // Honeypot (anti-spam) - must be empty
  website: z
    .string()
    .max(0, 'Formulaire invalide')
    .optional()
    .or(z.literal('')),
})

export type CreateBookingInput = z.infer<typeof createBookingSchema>

export const updateBookingSchema = z.object({
  status: z
    .enum([
      'PENDING',
      'CONFIRMED',
      'ASSIGNED',
      'IN_PROGRESS',
      'COMPLETED',
      'CANCELLED',
      'NO_SHOW',
    ])
    .optional(),
  driverId: z.string().cuid().nullable().optional(),
  dispatcherNotes: z.string().max(2000).optional(),
  finalPrice: z.number().positive().optional(),
})

export type UpdateBookingInput = z.infer<typeof updateBookingSchema>

// ===========================================
// SERVICE REQUEST SCHEMAS
// ===========================================

export const serviceTypeEnum = z.enum([
  'BOOSTER',
  'DOOR_UNLOCK',
  'TIRE_CHANGE',
  'OTHER',
])

export const createServiceRequestSchema = z.object({
  // Customer info
  customerName: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100),
  customerPhone: phoneSchema,
  customerEmail: emailSchema,

  // Service
  serviceType: serviceTypeEnum,
  address: addressSchema,
  addressLat: z.number().optional(),
  addressLng: z.number().optional(),

  // Notes
  customerNotes: z.string().max(1000).optional(),

  // Honeypot
  website: z.string().max(0).optional().or(z.literal('')),
})

export type CreateServiceRequestInput = z.infer<typeof createServiceRequestSchema>

export const updateServiceRequestSchema = z.object({
  status: z
    .enum([
      'PENDING',
      'CONFIRMED',
      'ASSIGNED',
      'IN_PROGRESS',
      'COMPLETED',
      'CANCELLED',
    ])
    .optional(),
  driverId: z.string().cuid().nullable().optional(),
  dispatcherNotes: z.string().max(2000).optional(),
})

export type UpdateServiceRequestInput = z.infer<typeof updateServiceRequestSchema>

// ===========================================
// DRIVER SCHEMAS
// ===========================================

export const createDriverSchema = z.object({
  name: z.string().min(2).max(100),
  phone: phoneSchema,
  email: z.string().email(),
  receiveEmailNotifications: z.boolean().default(true),
})

export type CreateDriverInput = z.infer<typeof createDriverSchema>

export const updateDriverSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  phone: phoneSchema.optional(),
  email: z.string().email().optional(),
  isActive: z.boolean().optional(),
  receiveEmailNotifications: z.boolean().optional(),
})

export type UpdateDriverInput = z.infer<typeof updateDriverSchema>

// ===========================================
// QUERY SCHEMAS
// ===========================================

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
})

export const bookingQuerySchema = paginationSchema.extend({
  status: z
    .enum([
      'PENDING',
      'CONFIRMED',
      'ASSIGNED',
      'IN_PROGRESS',
      'COMPLETED',
      'CANCELLED',
      'NO_SHOW',
    ])
    .optional(),
  driverId: z.string().cuid().optional(),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
})

export type BookingQuery = z.infer<typeof bookingQuerySchema>
