'use client'

import { useTranslations } from 'next-intl'
import { FaPhone, FaEnvelope, FaClock, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

const socialLinks = [
  { icon: FaFacebookF, href: 'https://facebook.com', label: 'Facebook' },
  { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn' },
]

export function Topbar() {
  const t = useTranslations('topbar')

  return (
    <div className="bg-taxi-yellow text-taxi-black py-2 hidden md:block">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Contact Info */}
          <div className="flex items-center space-x-6 text-sm">
            <a
              href={`tel:${t('phone').replace(/\s/g, '')}`}
              className="flex items-center space-x-2 hover:text-taxi-dark transition-colors"
            >
              <FaPhone className="w-3 h-3" />
              <span className="font-medium">{t('phone')}</span>
            </a>
            <a
              href={`mailto:${t('email')}`}
              className="flex items-center space-x-2 hover:text-taxi-dark transition-colors"
            >
              <FaEnvelope className="w-3 h-3" />
              <span>{t('email')}</span>
            </a>
            <div className="flex items-center space-x-2">
              <FaClock className="w-3 h-3" />
              <span>{t('hours')}</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 bg-taxi-black text-taxi-yellow rounded-full flex items-center justify-center hover:bg-taxi-dark hover:scale-110 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
