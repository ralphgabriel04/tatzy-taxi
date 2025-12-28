'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useTranslations } from 'next-intl'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { TestimonialCard } from './TestimonialCard'
import { AnimatedSection } from '@/components/ui'

const testimonialRatings = [5, 5, 5, 4]

export function TestimonialCarousel() {
  const t = useTranslations('testimonials')
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  )
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const testimonials = [0, 1, 2, 3].map((index) => ({
    name: t(`items.${index}.name`),
    role: t(`items.${index}.role`),
    content: t(`items.${index}.content`),
    rating: testimonialRatings[index],
  }))

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
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
    <section className="section-padding bg-taxi-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23F7C600\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}></div>
      </div>

      <div className="container-padding relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="w-10 h-0.5 bg-taxi-yellow"></span>
            <span className="text-taxi-yellow font-medium uppercase tracking-wider text-sm">
              {t('subtitle')}
            </span>
            <span className="w-10 h-0.5 bg-taxi-yellow"></span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            {t('title')} <span className="text-taxi-yellow">{t('highlight')}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {t('description')}
          </p>
        </AnimatedSection>

        {/* Carousel */}
        <div className="relative">
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex -ml-4">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="embla__slide flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4"
                >
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 bg-taxi-yellow text-taxi-black rounded-full flex items-center justify-center hover:bg-yellow-400 hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Témoignage précédent"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 bg-taxi-yellow text-taxi-black rounded-full flex items-center justify-center hover:bg-yellow-400 hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Témoignage suivant"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
