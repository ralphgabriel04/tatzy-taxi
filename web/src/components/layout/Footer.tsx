'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheck, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaArrowRight } from 'react-icons/fa'

const socialLinks = [
  { icon: FaFacebookF, href: 'https://facebook.com', label: 'Facebook' },
  { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn' },
]

export function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  const tServices = useTranslations('services')
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: tNav('home'), href: '/' },
    { name: tNav('booking'), href: '/booking' },
    { name: tNav('faq'), href: '/faq' },
    { name: tNav('contact'), href: '/contact' },
  ]

  const serviceLinks = [
    { name: tServices('regular.title'), href: '/services#regular' },
    { name: tServices('airport.title'), href: '/services#airport' },
    { name: tServices('longDistance.title'), href: '/services#longDistance' },
    { name: tServices('taxitaxi.title'), href: '/services#taxitaxi' },
  ]

  return (
    <footer className="relative">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/footer-bg.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-taxi-black/95"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            {/* About Column */}
            <div className="space-y-6">
              <Link href="/" className="inline-block">
                <span className="text-3xl font-heading font-extrabold text-taxi-yellow">TATZY</span>
                <span className="text-sm text-gray-500 ml-2">Taxi</span>
              </Link>
              <p className="text-gray-400 leading-relaxed">
                {t('about')}
              </p>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-taxi-yellow hover:text-taxi-black transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="text-xl font-heading font-bold text-white mb-6 relative">
                {t('quickLinks')}
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-taxi-yellow -mb-2"></span>
              </h3>
              <ul className="space-y-3 mt-4">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center space-x-2 text-gray-400 hover:text-taxi-yellow transition-colors group"
                    >
                      <FaCheck className="w-3 h-3 text-taxi-yellow" />
                      <span>{link.name}</span>
                      <FaArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column */}
            <div>
              <h3 className="text-xl font-heading font-bold text-white mb-6 relative">
                {t('ourServices')}
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-taxi-yellow -mb-2"></span>
              </h3>
              <ul className="space-y-3 mt-4">
                {serviceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center space-x-2 text-gray-400 hover:text-taxi-yellow transition-colors group"
                    >
                      <FaCheck className="w-3 h-3 text-taxi-yellow" />
                      <span>{link.name}</span>
                      <FaArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="text-xl font-heading font-bold text-white mb-6 relative">
                {t('contact')}
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-taxi-yellow -mb-2"></span>
              </h3>
              <ul className="space-y-4 mt-4">
                <li>
                  <a
                    href="tel:+15145551234"
                    className="flex items-start space-x-3 text-gray-400 hover:text-taxi-yellow transition-colors"
                  >
                    <span className="w-10 h-10 bg-taxi-yellow/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaPhone className="w-4 h-4 text-taxi-yellow" />
                    </span>
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wider">{t('phone')}</span>
                      <p className="font-medium text-white">+1 (514) 555-TAXI</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contact@tatzy-taxi.com"
                    className="flex items-start space-x-3 text-gray-400 hover:text-taxi-yellow transition-colors"
                  >
                    <span className="w-10 h-10 bg-taxi-yellow/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaEnvelope className="w-4 h-4 text-taxi-yellow" />
                    </span>
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wider">{t('email')}</span>
                      <p className="font-medium text-white">contact@tatzy-taxi.com</p>
                    </div>
                  </a>
                </li>
                <li className="flex items-start space-x-3 text-gray-400">
                  <span className="w-10 h-10 bg-taxi-yellow/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="w-4 h-4 text-taxi-yellow" />
                  </span>
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">{t('address')}</span>
                    <p className="font-medium text-white">{t('addressValue')}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 text-sm">
                {t('copyright', { year: currentYear })}
              </p>
              <div className="flex items-center space-x-6 text-sm">
                <Link href="/policies#privacy" className="text-gray-500 hover:text-taxi-yellow transition-colors">
                  {t('privacy')}
                </Link>
                <Link href="/policies#terms" className="text-gray-500 hover:text-taxi-yellow transition-colors">
                  {t('terms')}
                </Link>
                <Link href="/policies#cookies" className="text-gray-500 hover:text-taxi-yellow transition-colors">
                  {t('cookies')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
