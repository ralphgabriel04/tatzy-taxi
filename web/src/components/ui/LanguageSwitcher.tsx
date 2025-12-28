'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/routing'
import { useTransition } from 'react'

const locales = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
] as const

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const handleLocaleChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale })
    })
  }

  return (
    <div className="flex items-center space-x-1 bg-white/10 rounded-full p-1">
      {locales.map((loc) => (
        <button
          key={loc.code}
          onClick={() => handleLocaleChange(loc.code)}
          disabled={isPending}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
            locale === loc.code
              ? 'bg-taxi-yellow text-taxi-black'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          } ${isPending ? 'opacity-50 cursor-wait' : ''}`}
        >
          {loc.label}
        </button>
      ))}
    </div>
  )
}
