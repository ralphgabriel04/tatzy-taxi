import {
  HeroCarousel,
  ServicesSection,
  TestimonialCarousel,
  PricingSection,
  CTASection,
  WhyUsSection,
} from '@/components/home'

export default function Home() {
  return (
    <>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Why Choose Us Section */}
      <WhyUsSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Testimonials */}
      <TestimonialCarousel />

      {/* CTA Section */}
      <CTASection />
    </>
  )
}
