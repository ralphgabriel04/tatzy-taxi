const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
  errors?: Array<{ field: string; message: string }>
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Une erreur est survenue',
        errors: data.errors,
      }
    }

    return data
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  async patch<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

export const api = new ApiClient(API_URL)

// ===========================================
// BOOKING API
// ===========================================

export interface BookingInput {
  customerName: string
  customerPhone: string
  customerEmail?: string
  pickupAddress: string
  dropoffAddress: string
  pickupLat?: number
  pickupLng?: number
  dropoffLat?: number
  dropoffLng?: number
  pickupDateTime: string
  customerNotes?: string
  website?: string // honeypot
}

export interface BookingResponse {
  id: string
  status: string
  pickupDateTime: string
}

export const bookingApi = {
  create: (data: BookingInput) =>
    api.post<BookingResponse>('/api/bookings', data),

  getAll: (params?: Record<string, string>) => {
    const query = params ? `?${new URLSearchParams(params)}` : ''
    return api.get<unknown[]>(`/api/bookings${query}`)
  },

  getById: (id: string) =>
    api.get<unknown>(`/api/bookings/${id}`),

  update: (id: string, data: Partial<BookingInput>) =>
    api.patch<unknown>(`/api/bookings/${id}`, data),

  cancel: (id: string) =>
    api.delete<unknown>(`/api/bookings/${id}`),
}
