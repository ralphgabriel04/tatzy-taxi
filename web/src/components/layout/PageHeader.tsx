'use client'

import Link from 'next/link'
import { FaHome, FaChevronRight } from 'react-icons/fa'
import { motion } from 'framer-motion'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeaderProps {
  title: string
  subtitle?: string
  breadcrumbs?: BreadcrumbItem[]
  backgroundImage?: string
}

export function PageHeader({
  title,
  subtitle,
  breadcrumbs = [],
  backgroundImage = '/images/page-header-bg.jpg',
}: PageHeaderProps) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="absolute inset-0 bg-taxi-black/80"></div>
      </div>

      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23F7C600\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          {/* Title */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-4"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-6"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Breadcrumbs */}
          <motion.nav
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            aria-label="Fil d'Ariane"
            className="flex items-center justify-center space-x-2 text-sm"
          >
            <Link
              href="/"
              className="flex items-center space-x-1 text-taxi-yellow hover:text-yellow-400 transition-colors"
            >
              <FaHome className="w-4 h-4" />
              <span>Accueil</span>
            </Link>
            {breadcrumbs.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <FaChevronRight className="w-3 h-3 text-gray-500" />
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-taxi-yellow hover:text-yellow-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-gray-400">{item.label}</span>
                )}
              </div>
            ))}
          </motion.nav>
        </div>
      </div>

      {/* Bottom Yellow Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-taxi-yellow"></div>
    </section>
  )
}
