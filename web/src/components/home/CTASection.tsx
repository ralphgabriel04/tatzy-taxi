'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { FaPhone, FaCar } from 'react-icons/fa'
import { AnimatedSection } from '@/components/ui'

export function CTASection() {
  const t = useTranslations('cta')

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/cta-bg.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-taxi-yellow/95"></div>
      </div>

      {/* Content */}
      <div className="container-padding relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Text */}
          <AnimatedSection animation="fadeInLeft" className="lg:w-2/3">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-taxi-black mb-4">
              {t('title')}
            </h2>
            <p className="text-taxi-black/80 text-lg max-w-xl">
              {t('description')}
            </p>
          </AnimatedSection>

          {/* Buttons */}
          <AnimatedSection animation="fadeInRight" className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center space-x-2 bg-taxi-black text-taxi-yellow px-8 py-4 rounded-full font-semibold hover:bg-taxi-dark hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <FaCar className="w-5 h-5" />
              <span>{t('bookOnline')}</span>
            </Link>
            <a
              href="tel:+15145551234"
              className="inline-flex items-center justify-center space-x-2 bg-white text-taxi-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <FaPhone className="w-5 h-5" />
              <span>{t('callNow')}</span>
            </a>
          </AnimatedSection>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-taxi-black/10 rounded-full"></div>
      <div className="absolute -top-10 -right-10 w-60 h-60 bg-taxi-black/10 rounded-full"></div>
    </section>
  )
}
