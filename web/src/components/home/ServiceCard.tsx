'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { IconType } from 'react-icons'
import { FaArrowRight } from 'react-icons/fa'

interface ServiceCardProps {
  icon: IconType
  title: string
  description: string
  href: string
}

export function ServiceCard({ icon: Icon, title, description, href }: ServiceCardProps) {
  const t = useTranslations('services')

  return (
    <div className="group h-full flex flex-col bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 card-lift">
      {/* Icon Container */}
      <div className="relative w-[130px] h-[130px] mx-auto mb-6 flex-shrink-0">
        {/* Background circle */}
        <div className="absolute inset-0 bg-taxi-black rounded-full transition-all duration-500"></div>

        {/* Yellow expanding circle on hover */}
        <div className="icon-circle-expand"></div>

        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="w-12 h-12 text-taxi-yellow group-hover:text-taxi-black icon-rotate-hover z-10 relative" />
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-heading font-bold text-taxi-black text-center mb-4 group-hover:text-taxi-yellow transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 text-center mb-6 leading-relaxed flex-1">
        {description}
      </p>

      {/* CTA */}
      <div className="text-center mt-auto">
        <Link
          href={href}
          className="inline-flex items-center space-x-2 text-taxi-black font-semibold hover:text-taxi-yellow transition-colors group/link"
        >
          <span>{t('learnMore')}</span>
          <FaArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  )
}
