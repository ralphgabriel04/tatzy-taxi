'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { useParams } from 'next/navigation'
import { FaUser, FaStar, FaCar, FaGlobe, FaArrowLeft, FaBriefcase } from 'react-icons/fa'
import { PageHeader } from '@/components/layout'
import { AnimatedSection, Button } from '@/components/ui'

interface Driver {
  id: string
  name: string
  role: string
  experience: number
  specialty: string
  vehicle: string
  languages: string[]
  rating: number
  bio: string
  image: string
}

export default function DriverDetailPage() {
  const params = useParams()
  const t = useTranslations('drivers')

  const drivers = t.raw('items') as Driver[]
  const driver = drivers.find(d => d.id === params.id)

  if (!driver) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-taxi-black mb-4">Chauffeur non trouvé</h1>
          <Link href="/drivers">
            <Button>{t('backToDrivers')}</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <PageHeader
        title={driver.name}
        subtitle={driver.role}
        breadcrumbs={[
          { label: t('pageTitle'), href: '/drivers' },
          { label: driver.name }
        ]}
      />

      <section className="section-padding">
        <div className="container-padding">
          {/* Back button */}
          <AnimatedSection className="mb-8">
            <Link
              href="/drivers"
              className="inline-flex items-center text-taxi-black hover:text-taxi-yellow transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              {t('backToDrivers')}
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Driver Photo & Quick Info */}
            <AnimatedSection animation="fadeInLeft" className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Photo */}
                <div className="relative h-80 bg-gray-200 flex items-center justify-center">
                  <FaUser className="w-32 h-32 text-gray-300" />
                </div>

                {/* Name & Role */}
                <div className="bg-taxi-yellow text-center py-4">
                  <h2 className="text-2xl font-heading font-bold text-taxi-black">
                    {driver.name}
                  </h2>
                  <p className="text-taxi-black/70">{driver.role}</p>
                </div>

                {/* Quick Stats */}
                <div className="p-6 space-y-4">
                  {/* Rating */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{t('rating')}</span>
                    <div className="flex items-center">
                      <FaStar className="w-5 h-5 text-taxi-yellow mr-1" />
                      <span className="font-bold text-taxi-black">{driver.rating}/5</span>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{t('experience')}</span>
                    <span className="font-bold text-taxi-black">{driver.experience} ans</span>
                  </div>

                  {/* Specialty */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{t('specialty')}</span>
                    <span className="font-bold text-taxi-black">{driver.specialty}</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Driver Details */}
            <AnimatedSection animation="fadeInRight" className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                {/* Bio */}
                <div className="mb-8">
                  <h3 className="text-xl font-heading font-bold text-taxi-black mb-4 flex items-center">
                    <FaBriefcase className="mr-3 text-taxi-yellow" />
                    {t('bio')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {driver.bio}
                  </p>
                </div>

                {/* Vehicle */}
                <div className="mb-8">
                  <h3 className="text-xl font-heading font-bold text-taxi-black mb-4 flex items-center">
                    <FaCar className="mr-3 text-taxi-yellow" />
                    {t('vehicle')}
                  </h3>
                  <div className="bg-taxi-light rounded-xl p-4">
                    <p className="text-taxi-black font-semibold text-lg">{driver.vehicle}</p>
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-8">
                  <h3 className="text-xl font-heading font-bold text-taxi-black mb-4 flex items-center">
                    <FaGlobe className="mr-3 text-taxi-yellow" />
                    {t('languages')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {driver.languages.map((lang) => (
                      <span
                        key={lang}
                        className="bg-taxi-yellow/20 text-taxi-black px-4 py-2 rounded-full font-medium"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Book Button */}
                <div className="pt-6 border-t border-gray-100">
                  <Link href={`/booking?driver=${driver.id}`}>
                    <Button className="w-full text-lg py-4">
                      {t('bookWith')} {driver.name.split(' ')[0]}
                    </Button>
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
