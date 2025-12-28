'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { PricingCard } from './PricingCard'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui'

const pricingKeys = ['short', 'long', 'airport']
const pricingHrefs = ['/booking?type=short', '/booking?type=long', '/booking?type=airport']

export function PricingSection() {
  const t = useTranslations('pricing')

  const pricingPlans = pricingKeys.map((key, index) => ({
    title: t(`${key}.title`),
    price: t(`${key}.price`),
    unit: t(`${key}.unit`),
    description: t(`${key}.description`),
    features: [
      t(`${key}.features.0`),
      t(`${key}.features.1`),
      t(`${key}.features.2`),
      t(`${key}.features.3`),
      ...(key === 'long' ? [t(`${key}.features.4`)] : []),
    ],
    isPopular: key === 'long',
    href: pricingHrefs[index],
    ctaText: t('cta'),
  }))

  return (
    <section className="section-padding bg-taxi-light">
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

        {/* Pricing Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6 items-stretch">
          {pricingPlans.map((plan) => (
            <StaggerItem key={plan.title}>
              <PricingCard {...plan} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Additional Info */}
        <AnimatedSection delay={0.6} className="text-center mt-12">
          <p className="text-gray-500">
            {t('disclaimer')}{' '}
            <Link href="/contact" className="text-taxi-yellow hover:underline">
              {t('contactUs')}
            </Link>{' '}
            {t('forQuote')}
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
