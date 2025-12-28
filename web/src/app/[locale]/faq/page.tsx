'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui'

interface FAQItem {
  question: string
  answer: string
}

const categoryKeys = ['booking', 'pricing', 'services', 'safety'] as const

function FAQItemComponent({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        type="button"
        className="w-full py-4 flex items-center justify-between text-left hover:text-taxi-yellow transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-medium pr-4">{question}</span>
        <svg
          className={`w-5 h-5 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-600">
          {answer}
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  const t = useTranslations('faq')

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

        {/* FAQ Categories */}
        <div className="max-w-3xl mx-auto space-y-8">
          {categoryKeys.map((categoryKey) => {
            const items = t.raw(`items.${categoryKey}`) as FAQItem[]

            return (
              <div key={categoryKey} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-6 py-4">
                  <h2 className="text-lg font-semibold">{t(`categories.${categoryKey}`)}</h2>
                </div>
                <div className="px-6">
                  {items.map((faq: FAQItem, index: number) => (
                    <FAQItemComponent key={index} question={faq.question} answer={faq.answer} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            {t('notFound')}
          </p>
          <Link href="/contact">
            <Button>{t('contactUs')}</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
