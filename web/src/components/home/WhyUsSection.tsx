'use client'

import { useTranslations } from 'next-intl'
import { AnimatedSection } from '@/components/ui'
import { FaClock, FaShieldAlt, FaCreditCard, FaHeadset } from 'react-icons/fa'

const whyUsItems = [
  { key: 'punctuality', icon: FaClock },
  { key: 'security', icon: FaShieldAlt },
  { key: 'pricing', icon: FaCreditCard },
  { key: 'support', icon: FaHeadset },
]

export function WhyUsSection() {
  const t = useTranslations('whyUs')

  return (
    <section className="section-padding bg-white">
      <div className="container-padding">
        <AnimatedSection className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="w-10 h-0.5 bg-taxi-yellow"></span>
            <span className="text-taxi-yellow font-medium uppercase tracking-wider text-sm">
              {t('subtitle')}
            </span>
            <span className="w-10 h-0.5 bg-taxi-yellow"></span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-taxi-black">
            {t('title')} <span className="text-taxi-yellow">{t('highlight')}</span>?
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyUsItems.map((item, index) => (
            <AnimatedSection key={item.key} delay={index * 0.1} className="text-center">
              <div className="w-20 h-20 bg-taxi-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-8 h-8 text-taxi-black" />
              </div>
              <h3 className="text-xl font-heading font-bold text-taxi-black mb-2">
                {t(`${item.key}.title`)}
              </h3>
              <p className="text-gray-600">{t(`${item.key}.description`)}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
