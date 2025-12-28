'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Button, Input, Textarea } from '@/components/ui'

export default function ContactPage() {
  const t = useTranslations('contact')

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl text-gray-600">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">{t('info.title')}</h2>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="bg-taxi-yellow/10 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-taxi-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">{t('info.phone')}</h3>
                    <a href="tel:+15145551234" className="text-gray-600 hover:text-taxi-yellow transition-colors">
                      {t('info.phoneValue')}
                    </a>
                    <p className="text-sm text-gray-500">{t('info.available247')}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="bg-taxi-yellow/10 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-taxi-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">{t('info.email')}</h3>
                    <a href="mailto:info@tatzy.ca" className="text-gray-600 hover:text-taxi-yellow transition-colors">
                      {t('info.emailValue')}
                    </a>
                    <p className="text-sm text-gray-500">{t('info.responseTime')}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-4">
                  <div className="bg-taxi-yellow/10 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-taxi-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">{t('info.serviceArea')}</h3>
                    <p className="text-gray-600">{t('info.serviceAreaValue')}</p>
                    <p className="text-sm text-gray-500">{t('info.longDistance')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-semibold mb-4">{t('hours.title')}</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>{t('hours.weekdays')}</span>
                  <span className="font-medium">{t('hours.allDay')}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('hours.holidays')}</span>
                  <span className="font-medium">{t('hours.open')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">{t('form.title')}</h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label={t('form.name')}
                  name="name"
                  placeholder={t('form.namePlaceholder')}
                  required
                />
                <Input
                  label={t('form.phone')}
                  name="phone"
                  type="tel"
                  placeholder={t('form.phonePlaceholder')}
                  required
                />
              </div>

              <Input
                label={t('form.email')}
                name="email"
                type="email"
                placeholder={t('form.emailPlaceholder')}
              />

              <Textarea
                label={t('form.message')}
                name="message"
                placeholder={t('form.messagePlaceholder')}
                required
              />

              <Button type="submit" className="w-full">
                {t('form.submit')}
              </Button>

              <p className="text-sm text-gray-500 text-center">
                {t('form.privacy')}{' '}
                <Link href="/policies#privacy" className="text-taxi-yellow hover:underline">
                  {t('form.privacyLink')}
                </Link>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
