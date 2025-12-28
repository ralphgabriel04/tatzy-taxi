'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { FaTaxi, FaPlane, FaRoad, FaCar, FaCarBattery, FaKey, FaCircle, FaCheck } from 'react-icons/fa'
import { PageHeader } from '@/components/layout'
import { AnimatedSection, Button } from '@/components/ui'

// Service categories with their services
const serviceCategories = [
  {
    categoryKey: 'taxi',
    services: ['regular', 'airport', 'longDistance']
  },
  {
    categoryKey: 'roadside',
    services: ['booster', 'unlock', 'tire']
  },
  {
    categoryKey: 'special',
    services: ['taxitaxi']
  }
] as const

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  regular: FaTaxi,
  airport: FaPlane,
  longDistance: FaRoad,
  booster: FaCarBattery,
  unlock: FaKey,
  tire: FaCircle,
  taxitaxi: FaCar,
}

export default function ServicesPage() {
  const t = useTranslations('services')

  return (
    <>
      <PageHeader
        title={t('pageTitle')}
        subtitle={t('pageSubtitle')}
        breadcrumbs={[{ label: t('pageTitle') }]}
      />

      {/* Services List by Category */}
      <section className="section-padding">
        <div className="container-padding">
          {serviceCategories.map((category, catIndex) => (
            <div key={category.categoryKey} className={catIndex > 0 ? 'mt-20' : ''}>
              {/* Category Header */}
              <AnimatedSection className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-taxi-black">
                  <span className="text-taxi-yellow">{t(`categories.${category.categoryKey}`)}</span>
                </h2>
                <div className="w-20 h-1 bg-taxi-yellow mx-auto mt-4"></div>
              </AnimatedSection>

              {/* Services in this category */}
              <div className="space-y-16">
                {category.services.map((serviceKey, index) => {
                  const Icon = serviceIcons[serviceKey]
                  const features = t.raw(`${serviceKey}.features`) as string[]
                  const globalIndex = catIndex * 3 + index

                  return (
                    <AnimatedSection
                      key={serviceKey}
                      animation={globalIndex % 2 === 0 ? 'fadeInLeft' : 'fadeInRight'}
                    >
                      <div
                        id={serviceKey}
                        className="scroll-mt-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                      >
                        {/* Icon Side */}
                        <div className={`${globalIndex % 2 === 1 ? 'lg:order-2' : ''}`}>
                          <div className="relative">
                            <div className="w-48 h-48 md:w-64 md:h-64 bg-taxi-yellow rounded-2xl mx-auto flex items-center justify-center">
                              <Icon className="w-24 h-24 md:w-32 md:h-32 text-taxi-black" />
                            </div>
                            {/* Decorative dots */}
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-taxi-black/5 rounded-full -z-10"></div>
                            <div className="absolute -top-4 -left-4 w-16 h-16 bg-taxi-yellow/20 rounded-full -z-10"></div>
                          </div>
                        </div>

                        {/* Content Side */}
                        <div className={`${globalIndex % 2 === 1 ? 'lg:order-1' : ''}`}>
                          <span className="text-taxi-yellow font-medium uppercase tracking-wider text-sm">
                            {t(`categories.${category.categoryKey}`)}
                          </span>
                          <h3 className="text-3xl md:text-4xl font-heading font-bold text-taxi-black mt-2 mb-4">
                            {t(`${serviceKey}.title`)}
                          </h3>
                          <p className="text-gray-600 text-lg mb-6">
                            {t(`${serviceKey}.longDescription`)}
                          </p>

                          <ul className="space-y-3 mb-8">
                            {features.map((feature: string) => (
                              <li key={feature} className="flex items-start space-x-3">
                                <span className="w-5 h-5 bg-taxi-yellow/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <FaCheck className="w-2.5 h-2.5 text-taxi-yellow" />
                                </span>
                                <span className="text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="flex flex-wrap items-center gap-4">
                            <span className="bg-taxi-light px-4 py-2 rounded-full text-taxi-black font-semibold">
                              {t(`${serviceKey}.pricing`)}
                            </span>
                            <Link href={`/booking?service=${serviceKey}`}>
                              <Button>{t('bookService')}</Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-taxi-black">
        <div className="container-padding text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              {t('ctaTitle')} <span className="text-taxi-yellow">{t('ctaHighlight')}</span>?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
              {t('ctaDescription')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button>{t('contactUs')}</Button>
              </Link>
              <Link href="/booking">
                <Button variant="secondary">{t('bookService')}</Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
