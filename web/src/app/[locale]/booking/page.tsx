'use client'

import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { BookingForm } from '@/components/forms/BookingForm'

export default function BookingPage() {
  const searchParams = useSearchParams()
  const t = useTranslations('booking')

  // Get pre-selected service and driver from URL params
  const selectedService = searchParams.get('service') || undefined
  const selectedDriver = searchParams.get('driver') || undefined

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">Réserver un taxi</h1>
          <p className="text-xl text-gray-600">
            Remplissez le formulaire ci-dessous et nous vous contacterons rapidement pour confirmer votre réservation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8">
              <BookingForm
                initialService={selectedService}
                initialDriver={selectedDriver}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info Card */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Comment ça marche?</h3>
              <ol className="space-y-4">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-taxi-yellow text-taxi-black rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    1
                  </span>
                  <span className="text-gray-600">
                    Remplissez le formulaire avec vos informations et votre trajet
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-taxi-yellow text-taxi-black rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    2
                  </span>
                  <span className="text-gray-600">
                    Un dispatcher vous contacte pour confirmer la réservation
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-taxi-yellow text-taxi-black rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    3
                  </span>
                  <span className="text-gray-600">
                    Votre chauffeur arrive à l'heure convenue
                  </span>
                </li>
              </ol>
            </div>

            {/* Contact Card */}
            <div className="bg-taxi-black text-white rounded-xl p-6">
              <h3 className="font-semibold mb-4">Besoin d'aide?</h3>
              <p className="text-gray-300 text-sm mb-4">
                Pour une réservation urgente ou des questions, appelez-nous directement.
              </p>
              <a
                href="tel:+15145551234"
                className="flex items-center text-taxi-yellow hover:text-yellow-400 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (514) 555-1234
              </a>
            </div>

            {/* Long Distance Card */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">🚗</span>
                <h3 className="font-semibold text-yellow-800">Longue distance?</h3>
              </div>
              <p className="text-yellow-700 text-sm">
                Nous sommes spécialistes des trajets longue distance avec des tarifs compétitifs.
                N'hésitez pas à nous contacter pour un devis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
