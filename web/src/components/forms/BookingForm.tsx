'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button, Input, Textarea, AddressAutocomplete } from '@/components/ui'
import { bookingApi, type BookingInput } from '@/lib/api'
import { FaUser, FaCar } from 'react-icons/fa'

interface FormErrors {
  [key: string]: string
}

interface BookingFormProps {
  initialService?: string
  initialDriver?: string
}

interface Driver {
  id: string
  name: string
  role: string
  specialty: string
  vehicle: string
  rating: number
}

// Available services for booking
const serviceKeys = ['regular', 'airport', 'longDistance', 'booster', 'unlock', 'tire', 'taxitaxi']

export function BookingForm({ initialService, initialDriver }: BookingFormProps) {
  const t = useTranslations('services')
  const tDrivers = useTranslations('drivers')
  const tBooking = useTranslations('booking')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [generalError, setGeneralError] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState<string>(initialService || '')
  const [selectedDriver, setSelectedDriver] = useState<string>(initialDriver || '')

  // Get drivers from translations
  const drivers = tDrivers.raw('items') as Driver[]

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrors({})
    setGeneralError(null)

    const formData = new FormData(event.currentTarget)

    // Get datetime from separate date and time inputs
    const date = formData.get('date') as string
    const time = formData.get('time') as string
    const pickupDateTime = date && time ? new Date(`${date}T${time}`).toISOString() : ''

    const data: BookingInput = {
      customerName: formData.get('customerName') as string,
      customerPhone: formData.get('customerPhone') as string,
      customerEmail: formData.get('customerEmail') as string || undefined,
      pickupAddress: formData.get('pickupAddress') as string,
      dropoffAddress: formData.get('dropoffAddress') as string,
      pickupDateTime,
      customerNotes: formData.get('customerNotes') as string || undefined,
      website: formData.get('website') as string || '', // honeypot
    }

    try {
      const response = await bookingApi.create(data)

      if (response.success) {
        setIsSuccess(true)
      } else {
        if (response.errors) {
          const fieldErrors: FormErrors = {}
          response.errors.forEach((err) => {
            fieldErrors[err.field] = err.message
          })
          setErrors(fieldErrors)
        }
        setGeneralError(response.message || 'Une erreur est survenue')
      }
    } catch (error) {
      setGeneralError('Erreur de connexion. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">✓</div>
        <h3 className="text-xl font-semibold text-green-800 mb-2">
          Réservation envoyée!
        </h3>
        <p className="text-green-700 mb-6">
          Nous avons bien reçu votre demande. Un dispatcher vous contactera sous peu pour confirmer.
        </p>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            setIsSuccess(false)
          }}
        >
          Faire une nouvelle réservation
        </Button>
      </div>
    )
  }

  // Get minimum date (today) and time
  const now = new Date()
  const minDate = now.toISOString().split('T')[0]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {generalError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {generalError}
        </div>
      )}

      {/* Service Selection */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center">
          <FaCar className="mr-2 text-taxi-yellow" />
          {tBooking('selectService')}
        </h3>
        <div className="relative">
          <select
            name="service"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-taxi-yellow focus:border-taxi-yellow appearance-none bg-white cursor-pointer"
          >
            <option value="">{tBooking('chooseService')}</option>
            {serviceKeys.map((key) => (
              <option key={key} value={key}>
                {t(`${key}.title`)}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Driver Selection */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center">
          <FaUser className="mr-2 text-taxi-yellow" />
          {tBooking('selectDriver')}
        </h3>
        <div className="relative">
          <select
            name="driver"
            value={selectedDriver}
            onChange={(e) => setSelectedDriver(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-taxi-yellow focus:border-taxi-yellow appearance-none bg-white cursor-pointer"
          >
            <option value="">{tBooking('anyDriver')}</option>
            {drivers.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.name} - {driver.specialty} ({driver.rating}★)
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Vos informations</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Nom complet"
            name="customerName"
            placeholder="Jean Dupont"
            required
            error={errors.customerName}
          />
          <Input
            label="Téléphone"
            name="customerPhone"
            type="tel"
            placeholder="(514) 555-1234"
            required
            error={errors.customerPhone}
          />
        </div>

        <Input
          label="Email"
          name="customerEmail"
          type="email"
          placeholder="jean@exemple.com"
          helpText="Optionnel - pour recevoir une confirmation"
          error={errors.customerEmail}
        />
      </div>

      {/* Route */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Trajet</h3>

        <AddressAutocomplete
          label="Adresse de départ"
          name="pickupAddress"
          placeholder="123 rue Principale, Montréal"
          required
          error={errors.pickupAddress}
        />

        <AddressAutocomplete
          label="Destination"
          name="dropoffAddress"
          placeholder="456 avenue du Parc, Montréal"
          required
          error={errors.dropoffAddress}
        />
      </div>

      {/* DateTime */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Date et heure</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Date"
            name="date"
            type="date"
            min={minDate}
            required
            error={errors.pickupDateTime}
          />
          <Input
            label="Heure"
            name="time"
            type="time"
            required
          />
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-4">
        <Textarea
          label="Notes (optionnel)"
          name="customerNotes"
          placeholder="Nombre de passagers, bagages, demandes spéciales..."
          error={errors.customerNotes}
        />
      </div>

      {/* Honeypot - hidden from users */}
      <input
        type="text"
        name="website"
        autoComplete="off"
        tabIndex={-1}
        className="hidden"
        aria-hidden="true"
      />

      {/* Submit */}
      <div className="pt-4">
        <Button
          type="submit"
          size="lg"
          className="w-full"
          isLoading={isSubmitting}
        >
          Envoyer la demande de réservation
        </Button>

        <p className="text-sm text-gray-500 text-center mt-4">
          En soumettant ce formulaire, vous acceptez notre{' '}
          <a href="/policies#privacy" className="text-taxi-yellow hover:underline">
            politique de confidentialité
          </a>.
        </p>
      </div>
    </form>
  )
}
