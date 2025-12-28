'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { FaCheck, FaCar } from 'react-icons/fa'

interface PricingCardProps {
  title: string
  price: string
  unit: string
  description: string
  features: string[]
  isPopular?: boolean
  href: string
  ctaText?: string
}

export function PricingCard({
  title,
  price,
  unit,
  description,
  features,
  isPopular = false,
  href,
  ctaText,
}: PricingCardProps) {
  const t = useTranslations('pricing')

  return (
    <div
      className={`relative h-full flex flex-col bg-white rounded-2xl p-8 shadow-lg transition-all duration-500 ${
        isPopular ? 'ring-2 ring-taxi-yellow -mt-4 mb-4 lg:-mt-6 lg:mb-6' : 'hover:shadow-xl card-lift'
      }`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-taxi-yellow text-taxi-black px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
            {t('popular')}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-taxi-yellow rounded-full flex items-center justify-center mx-auto mb-4">
          <FaCar className="w-7 h-7 text-taxi-black" />
        </div>
        <h3 className="text-xl font-heading font-bold text-taxi-black mb-2">
          {title}
        </h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>

      {/* Price */}
      <div className="text-center mb-6 py-4 border-y border-gray-100">
        <span className="text-4xl font-heading font-bold text-taxi-black">{price}</span>
        <span className="text-gray-500 text-sm ml-1">{unit}</span>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-3">
            <span className="w-5 h-5 bg-taxi-yellow/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <FaCheck className="w-2.5 h-2.5 text-taxi-yellow" />
            </span>
            <span className="text-gray-600 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={href}
        className={`w-full inline-flex items-center justify-center py-4 rounded-full font-semibold transition-all duration-300 ${
          isPopular
            ? 'bg-taxi-yellow text-taxi-black hover:bg-yellow-400'
            : 'bg-taxi-black text-white hover:bg-taxi-dark'
        }`}
      >
        {ctaText || t('cta')}
      </Link>
    </div>
  )
}
