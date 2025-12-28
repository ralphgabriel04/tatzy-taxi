import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Header, Footer, Topbar } from '@/components/layout'
import { BackToTop } from '@/components/ui'
import { LocaleUpdater } from '@/components/LocaleUpdater'
import { SplashProvider } from '@/components/providers'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return {
    title: {
      default: 'Tatzy Taxi - Service de taxi professionnel',
      template: '%s | Tatzy Taxi',
    },
    description:
      locale === 'fr'
        ? 'Réservez votre taxi en ligne facilement. Spécialiste de la longue distance.'
        : 'Easily book your taxi online. Long distance specialist.',
    keywords: ['taxi', 'réservation', 'transport', 'longue distance', 'Montréal'],
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  // Vérifier que la locale est valide
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound()
  }

  // Charger les messages pour cette locale
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <LocaleUpdater locale={locale} />
      <SplashProvider duration={2500}>
        <Topbar />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <BackToTop />
      </SplashProvider>
    </NextIntlClientProvider>
  )
}
