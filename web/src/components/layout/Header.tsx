'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { FaChevronDown, FaBars, FaTimes } from 'react-icons/fa'
import { LanguageSwitcher } from '@/components/ui'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = useTranslations('nav')
  const tServices = useTranslations('services')

  const navigation = [
    { name: t('home'), href: '/' },
    {
      name: t('services'),
      href: '/services',
      dropdown: [
        { name: tServices('regular.title'), href: '/services#regular' },
        { name: tServices('airport.title'), href: '/services#airport' },
        { name: tServices('longDistance.title'), href: '/services#longDistance' },
        { name: tServices('booster.title'), href: '/services#booster' },
        { name: tServices('unlock.title'), href: '/services#unlock' },
        { name: tServices('tire.title'), href: '/services#tire' },
        { name: tServices('taxitaxi.title'), href: '/services#taxitaxi' },
      ],
    },
    { name: t('drivers'), href: '/drivers' },
    { name: t('faq'), href: '/faq' },
    { name: t('contact'), href: '/contact' },
  ]

  return (
    <header className="bg-taxi-black text-white sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <span className="text-3xl font-heading font-extrabold text-taxi-yellow group-hover:text-yellow-400 transition-colors">
                TATZY
              </span>
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-taxi-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </div>
            <span className="text-sm text-gray-400 font-body">Taxi</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center space-x-1 px-4 py-6 text-gray-300 hover:text-taxi-yellow transition-colors font-medium"
                >
                  <span>{item.name}</span>
                  {item.dropdown && (
                    <FaChevronDown className="w-3 h-3 transform group-hover:rotate-180 transition-transform duration-300" />
                  )}
                </Link>

                {/* Dropdown Menu with 3D Rotation */}
                {item.dropdown && (
                  <div className="absolute left-0 top-full w-56 bg-white rounded-lg shadow-xl dropdown-3d">
                    <div className="py-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-3 text-taxi-black hover:bg-taxi-yellow hover:text-taxi-black transition-colors font-medium"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Language Switcher + CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSwitcher />
            <Link
              href="/booking"
              className="btn-primary btn-hover-fill px-6 py-3 rounded-full font-semibold inline-block"
            >
              {t('bookNow')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-gray-400 hover:text-taxi-yellow transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-800 animate-fade-in-up">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block py-3 text-gray-300 hover:text-taxi-yellow transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <div className="pl-4 space-y-2 mt-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block py-2 text-gray-400 hover:text-taxi-yellow transition-colors text-sm"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Language Switcher */}
              <div className="py-3">
                <LanguageSwitcher />
              </div>

              <Link
                href="/booking"
                className="bg-taxi-yellow text-taxi-black px-4 py-3 rounded-full font-semibold text-center hover:bg-yellow-500 transition-colors mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('bookNow')}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
