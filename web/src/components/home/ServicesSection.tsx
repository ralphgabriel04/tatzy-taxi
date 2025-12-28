'use client'

import { FaTaxi, FaPlane, FaRoad, FaCar } from 'react-icons/fa'
import { FaArrowRight } from 'react-icons/fa'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { ServiceCard } from './ServiceCard'
import { AnimatedSection, StaggerContainer, StaggerItem, Button } from '@/components/ui'

// Only show 4 main services on homepage
const serviceIcons = [FaTaxi, FaPlane, FaRoad, FaCar]
const serviceKeys = ['regular', 'airport', 'longDistance', 'taxitaxi']
const serviceHrefs = [
  '/services#regular',
  '/services#airport',
  '/services#longDistance',
  '/services#taxitaxi'
]

export function ServicesSection() {
  const t = useTranslations('services')

  const services = serviceKeys.map((key, index) => ({
    icon: serviceIcons[index],
    title: t(`${key}.title`),
    description: t(`${key}.description`),
    href: serviceHrefs[index],
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

        {/* Services Grid - Only 4 services */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <ServiceCard {...service} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* See All Services Button */}
        <AnimatedSection className="text-center mt-12">
          <Link href="/services">
            <Button className="group">
              {t('viewAllServices')}
              <FaArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
