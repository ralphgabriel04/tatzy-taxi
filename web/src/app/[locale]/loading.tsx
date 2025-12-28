'use client'

import { TaxiAnimation } from '@/components/ui/TaxiAnimation'

/**
 * Loading component for page transitions
 * S'affiche pendant la navigation entre pages
 * Durée = temps réel de chargement de la page
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        {/* Animation taxi */}
        <TaxiAnimation size="md" dark={false} showText={true} text="Chargement de la page..." />
      </div>
    </div>
  )
}
