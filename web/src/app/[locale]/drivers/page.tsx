'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { FaUser, FaStar, FaCar, FaArrowRight } from 'react-icons/fa'
import { PageHeader } from '@/components/layout'
import { AnimatedSection, StaggerContainer, StaggerItem, Button } from '@/components/ui'

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

export default function DriversPage() {
  const t = useTranslations('drivers')

  const drivers = t.raw('items') as Driver[]

  return (
    <>
      <PageHeader
        title={t('pageTitle')}
        subtitle={t('pageSubtitle')}
        breadcrumbs={[{ label: t('pageTitle') }]}
      />

      {/* Drivers Section */}
      <section className="section-padding">
        <div className="container-padding">
          {/* Section Header */}
          <AnimatedSection className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="w-10 h-0.5 bg-taxi-yellow"></span>
              <span className="text-taxi-yellow font-medium uppercase tracking-wider text-sm">
                {t('subtitle')}
              </span>
              <span className="w-10 h-0.5 bg-taxi-yellow"></span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-taxi-black mb-4">
              {t('title')} <span className="text-taxi-yellow">{t('highlight')}</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {t('description')}
            </p>
          </AnimatedSection>

          {/* Drivers Grid */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {drivers.map((driver) => (
              <StaggerItem key={driver.id}>
                <Link href={`/drivers/${driver.id}`}>
                  <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                    {/* Driver Image */}
                    <div className="relative h-72 bg-gray-200 overflow-hidden">
                      {/* Placeholder with icon if no image */}
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <FaUser className="w-24 h-24 text-gray-300" />
                      </div>
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-taxi-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-center text-white p-4">
                          <p className="text-sm mb-2">{t('specialty')}</p>
                          <p className="font-semibold text-taxi-yellow mb-3">{driver.specialty}</p>
                          <span className="inline-flex items-center text-taxi-yellow text-sm font-medium">
                            {t('viewProfile')}
                            <FaArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Driver Info */}
                    <div className="bg-taxi-yellow text-center py-4 px-4">
                      <h3 className="text-xl font-heading font-bold text-taxi-black">
                        {driver.name}
                      </h3>
                      <p className="text-taxi-black/70 text-sm mb-2">{driver.role}</p>
                      <div className="flex items-center justify-center space-x-3 text-taxi-black/80">
                        <div className="flex items-center space-x-1">
                          <FaStar className="w-3 h-3 text-taxi-black" />
                          <span className="text-sm font-medium">{driver.rating}</span>
                        </div>
                        <span className="text-taxi-black/40">•</span>
                        <span className="text-sm font-medium">
                          {driver.experience} {t('experience')}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-taxi-black">
        <div className="container-padding text-center">
          <AnimatedSection>
            <div className="flex items-center justify-center mb-6">
              <FaCar className="w-12 h-12 text-taxi-yellow" />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              {t('ctaTitle')} <span className="text-taxi-yellow">{t('ctaHighlight')}</span>?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
              {t('ctaDescription')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button>{t('applyNow')}</Button>
              </Link>
              <Link href="/drivers">
                <Button variant="secondary">{t('pageTitle')}</Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
