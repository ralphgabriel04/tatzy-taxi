'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { PageHeader } from '@/components/layout'
import { AnimatedSection } from '@/components/ui'
import {
  FaShieldAlt,
  FaFileContract,
  FaCookieBite,
  FaUserShield,
  FaDatabase,
  FaShare,
  FaUserCog,
  FaEnvelope,
  FaCheckCircle,
  FaCreditCard,
  FaUsers,
  FaExclamationTriangle,
  FaEdit,
  FaPhone
} from 'react-icons/fa'

interface PolicySection {
  id: string
  icon: React.ReactNode
  title: string
  content: React.ReactNode
}

export default function PoliciesPage() {
  const t = useTranslations('policies')
  const [activeSection, setActiveSection] = useState('privacy')

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['privacy', 'terms', 'cookies']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'privacy', icon: <FaShieldAlt />, label: t('nav.privacy') },
    { id: 'terms', icon: <FaFileContract />, label: t('nav.terms') },
    { id: 'cookies', icon: <FaCookieBite />, label: t('nav.cookies') },
  ]

  return (
    <>
      <PageHeader
        title={t('pageTitle')}
        subtitle={t('pageSubtitle')}
        breadcrumbs={[{ label: t('pageTitle') }]}
      />

      <section className="section-padding">
        <div className="container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sticky Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <nav className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="font-heading font-bold text-taxi-black mb-4">
                    {t('tableOfContents')}
                  </h3>
                  <ul className="space-y-2">
                    {navItems.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={(e) => {
                            e.preventDefault()
                            document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                            setActiveSection(item.id)
                          }}
                          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                            activeSection === item.id
                              ? 'bg-taxi-yellow text-taxi-black font-semibold'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <span className={activeSection === item.id ? 'text-taxi-black' : 'text-taxi-yellow'}>
                            {item.icon}
                          </span>
                          <span>{item.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>

                  {/* Contact Card */}
                  <div className="mt-6 p-4 bg-taxi-light rounded-xl">
                    <p className="text-sm text-gray-600 mb-3">
                      {t('contactPrompt')}
                    </p>
                    <Link
                      href="/contact"
                      className="flex items-center text-taxi-yellow hover:text-yellow-600 font-semibold text-sm"
                    >
                      <FaPhone className="mr-2" />
                      {t('contactUs')}
                    </Link>
                  </div>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-12">
              {/* Privacy Policy */}
              <AnimatedSection>
                <div id="privacy" className="scroll-mt-24 bg-white rounded-2xl shadow-lg overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-taxi-black to-gray-800 p-6 md:p-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-taxi-yellow rounded-xl flex items-center justify-center">
                        <FaShieldAlt className="w-7 h-7 text-taxi-black" />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">
                          {t('privacy.title')}
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">
                          {t('privacy.lastUpdate')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 space-y-8">
                    {/* Section 1 */}
                    <PolicyBlock
                      icon={<FaDatabase className="w-5 h-5" />}
                      title={t('privacy.section1.title')}
                    >
                      <p className="text-gray-600 mb-4">{t('privacy.section1.intro')}</p>
                      <ul className="space-y-2">
                        {['name', 'phone', 'email', 'addresses', 'datetime'].map((item) => (
                          <li key={item} className="flex items-center space-x-3">
                            <FaCheckCircle className="w-4 h-4 text-taxi-yellow flex-shrink-0" />
                            <span className="text-gray-700">{t(`privacy.section1.items.${item}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </PolicyBlock>

                    {/* Section 2 */}
                    <PolicyBlock
                      icon={<FaUserCog className="w-5 h-5" />}
                      title={t('privacy.section2.title')}
                    >
                      <p className="text-gray-600 mb-4">{t('privacy.section2.intro')}</p>
                      <ul className="space-y-2">
                        {['process', 'contact', 'improve', 'respond'].map((item) => (
                          <li key={item} className="flex items-center space-x-3">
                            <FaCheckCircle className="w-4 h-4 text-taxi-yellow flex-shrink-0" />
                            <span className="text-gray-700">{t(`privacy.section2.items.${item}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </PolicyBlock>

                    {/* Section 3 */}
                    <PolicyBlock
                      icon={<FaUserShield className="w-5 h-5" />}
                      title={t('privacy.section3.title')}
                    >
                      <p className="text-gray-600">{t('privacy.section3.content')}</p>
                    </PolicyBlock>

                    {/* Section 4 */}
                    <PolicyBlock
                      icon={<FaShare className="w-5 h-5" />}
                      title={t('privacy.section4.title')}
                    >
                      <p className="text-gray-600 mb-4">{t('privacy.section4.intro')}</p>
                      <ul className="space-y-2">
                        {['drivers', 'authorities'].map((item) => (
                          <li key={item} className="flex items-center space-x-3">
                            <FaCheckCircle className="w-4 h-4 text-taxi-yellow flex-shrink-0" />
                            <span className="text-gray-700">{t(`privacy.section4.items.${item}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </PolicyBlock>

                    {/* Section 5 */}
                    <PolicyBlock
                      icon={<FaUsers className="w-5 h-5" />}
                      title={t('privacy.section5.title')}
                    >
                      <p className="text-gray-600 mb-4">{t('privacy.section5.intro')}</p>
                      <ul className="space-y-2">
                        {['access', 'correct', 'delete', 'withdraw'].map((item) => (
                          <li key={item} className="flex items-center space-x-3">
                            <FaCheckCircle className="w-4 h-4 text-taxi-yellow flex-shrink-0" />
                            <span className="text-gray-700">{t(`privacy.section5.items.${item}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </PolicyBlock>

                    {/* Contact */}
                    <PolicyBlock
                      icon={<FaEnvelope className="w-5 h-5" />}
                      title={t('privacy.section6.title')}
                    >
                      <p className="text-gray-600">
                        {t('privacy.section6.content')}{' '}
                        <a href="mailto:privacy@tatzy.ca" className="text-taxi-yellow hover:underline font-semibold">
                          privacy@tatzy.ca
                        </a>
                      </p>
                    </PolicyBlock>
                  </div>
                </div>
              </AnimatedSection>

              {/* Terms of Service */}
              <AnimatedSection>
                <div id="terms" className="scroll-mt-24 bg-white rounded-2xl shadow-lg overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-taxi-black to-gray-800 p-6 md:p-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-taxi-yellow rounded-xl flex items-center justify-center">
                        <FaFileContract className="w-7 h-7 text-taxi-black" />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">
                          {t('terms.title')}
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">
                          {t('terms.lastUpdate')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 space-y-8">
                    {/* Section 1 */}
                    <PolicyBlock
                      icon={<FaCheckCircle className="w-5 h-5" />}
                      title={t('terms.section1.title')}
                    >
                      <p className="text-gray-600">{t('terms.section1.content')}</p>
                    </PolicyBlock>

                    {/* Section 2 */}
                    <PolicyBlock
                      icon={<FaFileContract className="w-5 h-5" />}
                      title={t('terms.section2.title')}
                    >
                      <p className="text-gray-600">{t('terms.section2.content')}</p>
                    </PolicyBlock>

                    {/* Section 3 */}
                    <PolicyBlock
                      icon={<FaCheckCircle className="w-5 h-5" />}
                      title={t('terms.section3.title')}
                    >
                      <ul className="space-y-2">
                        {['confirm', 'accurate', 'cancel'].map((item) => (
                          <li key={item} className="flex items-center space-x-3">
                            <FaCheckCircle className="w-4 h-4 text-taxi-yellow flex-shrink-0" />
                            <span className="text-gray-700">{t(`terms.section3.items.${item}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </PolicyBlock>

                    {/* Section 4 */}
                    <PolicyBlock
                      icon={<FaCreditCard className="w-5 h-5" />}
                      title={t('terms.section4.title')}
                    >
                      <ul className="space-y-2">
                        {['communicated', 'due', 'methods'].map((item) => (
                          <li key={item} className="flex items-center space-x-3">
                            <FaCheckCircle className="w-4 h-4 text-taxi-yellow flex-shrink-0" />
                            <span className="text-gray-700">{t(`terms.section4.items.${item}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </PolicyBlock>

                    {/* Section 5 */}
                    <PolicyBlock
                      icon={<FaUsers className="w-5 h-5" />}
                      title={t('terms.section5.title')}
                    >
                      <p className="text-gray-600 mb-4">{t('terms.section5.intro')}</p>
                      <ul className="space-y-2">
                        {['present', 'respect', 'illegal', 'pay'].map((item) => (
                          <li key={item} className="flex items-center space-x-3">
                            <FaCheckCircle className="w-4 h-4 text-taxi-yellow flex-shrink-0" />
                            <span className="text-gray-700">{t(`terms.section5.items.${item}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </PolicyBlock>

                    {/* Section 6 */}
                    <PolicyBlock
                      icon={<FaExclamationTriangle className="w-5 h-5" />}
                      title={t('terms.section6.title')}
                    >
                      <p className="text-gray-600">{t('terms.section6.content')}</p>
                    </PolicyBlock>

                    {/* Section 7 */}
                    <PolicyBlock
                      icon={<FaEdit className="w-5 h-5" />}
                      title={t('terms.section7.title')}
                    >
                      <p className="text-gray-600">{t('terms.section7.content')}</p>
                    </PolicyBlock>

                    {/* Contact */}
                    <PolicyBlock
                      icon={<FaEnvelope className="w-5 h-5" />}
                      title={t('terms.section8.title')}
                    >
                      <p className="text-gray-600">
                        {t('terms.section8.content')}{' '}
                        <a href="mailto:info@tatzy.ca" className="text-taxi-yellow hover:underline font-semibold">
                          info@tatzy.ca
                        </a>
                      </p>
                    </PolicyBlock>
                  </div>
                </div>
              </AnimatedSection>

              {/* Cookies Policy */}
              <AnimatedSection>
                <div id="cookies" className="scroll-mt-24 bg-white rounded-2xl shadow-lg overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-taxi-black to-gray-800 p-6 md:p-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-taxi-yellow rounded-xl flex items-center justify-center">
                        <FaCookieBite className="w-7 h-7 text-taxi-black" />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">
                          {t('cookies.title')}
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">
                          {t('cookies.lastUpdate')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 space-y-8">
                    <PolicyBlock
                      icon={<FaCookieBite className="w-5 h-5" />}
                      title={t('cookies.section1.title')}
                    >
                      <p className="text-gray-600">{t('cookies.section1.content')}</p>
                    </PolicyBlock>

                    <PolicyBlock
                      icon={<FaDatabase className="w-5 h-5" />}
                      title={t('cookies.section2.title')}
                    >
                      <ul className="space-y-2">
                        {['essential', 'preferences', 'analytics'].map((item) => (
                          <li key={item} className="flex items-start space-x-3">
                            <FaCheckCircle className="w-4 h-4 text-taxi-yellow flex-shrink-0 mt-1" />
                            <div>
                              <span className="text-gray-700 font-medium">{t(`cookies.section2.items.${item}.name`)}</span>
                              <p className="text-gray-500 text-sm">{t(`cookies.section2.items.${item}.desc`)}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </PolicyBlock>

                    <PolicyBlock
                      icon={<FaUserCog className="w-5 h-5" />}
                      title={t('cookies.section3.title')}
                    >
                      <p className="text-gray-600">{t('cookies.section3.content')}</p>
                    </PolicyBlock>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// Reusable Policy Block Component
function PolicyBlock({
  icon,
  title,
  children
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="border-l-4 border-taxi-yellow pl-6">
      <div className="flex items-center space-x-3 mb-3">
        <span className="text-taxi-yellow">{icon}</span>
        <h3 className="text-lg font-heading font-bold text-taxi-black">{title}</h3>
      </div>
      <div className="ml-8">{children}</div>
    </div>
  )
}
