'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { FaChevronLeft, FaChevronRight, FaCar, FaMapMarkerAlt } from 'react-icons/fa'

const slideImages = [
  '/images/hero-1.jpg',
  '/images/hero-2.jpg',
  '/images/hero-3.jpg',
]

export function HeroCarousel() {
  const t = useTranslations('hero')
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  ])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const slides = [
    {
      id: 1,
      image: slideImages[0],
      subtitle: t('slide1.subtitle'),
      title: t('slide1.title'),
      titleHighlight: t('slide1.highlight'),
      description: t('slide1.description'),
    },
    {
      id: 2,
      image: slideImages[1],
      subtitle: t('slide2.subtitle'),
      title: t('slide2.title'),
      titleHighlight: t('slide2.highlight'),
      description: t('slide2.description'),
    },
    {
      id: 3,
      image: slideImages[2],
      subtitle: t('slide3.subtitle'),
      title: t('slide3.title'),
      titleHighlight: t('slide3.highlight'),
      description: t('slide3.description'),
    },
  ]

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
      {/* Carousel */}
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {slides.map((slide) => (
            <div key={slide.id} className="embla__slide relative flex-[0_0_100%] min-w-0">
              {/* Background with overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              >
                <div className="absolute inset-0 bg-black/70"></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="container mx-auto px-4">
                  <AnimatePresence mode="wait">
                    {selectedIndex === slide.id - 1 && (
                      <motion.div
                        key={slide.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="max-w-3xl"
                      >
                        {/* Subtitle */}
                        <motion.div
                          initial={{ y: -30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          className="flex items-center space-x-2 mb-4"
                        >
                          <span className="w-10 h-0.5 bg-taxi-yellow"></span>
                          <span className="text-taxi-yellow font-medium uppercase tracking-wider text-sm">
                            {slide.subtitle}
                          </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                          initial={{ y: 50, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4, duration: 0.6 }}
                          className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-6"
                        >
                          {slide.title}{' '}
                          <span className="text-taxi-yellow">{slide.titleHighlight}</span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.6, duration: 0.5 }}
                          className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl"
                        >
                          {slide.description}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.8, duration: 0.5 }}
                          className="flex flex-wrap gap-4"
                        >
                          <Link
                            href="/booking"
                            className="btn-primary btn-hover-fill inline-flex items-center space-x-2 px-8 py-4 rounded-full text-lg font-semibold"
                          >
                            <FaCar className="w-5 h-5" />
                            <span>{t('cta.book')}</span>
                          </Link>
                          <Link
                            href="/services"
                            className="btn-secondary btn-hover-fill-reverse inline-flex items-center space-x-2 px-8 py-4 rounded-full text-lg font-semibold"
                          >
                            <FaMapMarkerAlt className="w-5 h-5" />
                            <span>{t('cta.services')}</span>
                          </Link>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-taxi-yellow text-taxi-black rounded-full flex items-center justify-center hover:bg-yellow-400 hover:scale-110 transition-all duration-300 shadow-lg z-10"
        aria-label="Slide précédent"
      >
        <FaChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-taxi-yellow text-taxi-black rounded-full flex items-center justify-center hover:bg-yellow-400 hover:scale-110 transition-all duration-300 shadow-lg z-10"
        aria-label="Slide suivant"
      >
        <FaChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? 'bg-taxi-yellow w-8'
                : 'bg-white/50 hover:bg-white'
            }`}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Bottom Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-taxi-yellow py-4 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around text-taxi-black">
            <div className="text-center">
              <span className="text-3xl font-heading font-bold">24/7</span>
              <p className="text-sm font-medium">{t('stats.availability')}</p>
            </div>
            <div className="w-px h-12 bg-taxi-black/20"></div>
            <div className="text-center">
              <span className="text-3xl font-heading font-bold">10+</span>
              <p className="text-sm font-medium">{t('stats.drivers')}</p>
            </div>
            <div className="w-px h-12 bg-taxi-black/20"></div>
            <div className="text-center">
              <span className="text-3xl font-heading font-bold">500+</span>
              <p className="text-sm font-medium">{t('stats.trips')}</p>
            </div>
            <div className="w-px h-12 bg-taxi-black/20"></div>
            <div className="text-center">
              <span className="text-3xl font-heading font-bold">4.9★</span>
              <p className="text-sm font-medium">{t('stats.rating')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
