'use client'

import { useEffect, useState } from 'react'
import { TaxiAnimation } from './TaxiAnimation'

interface SplashScreenProps {
  /** Durée minimum d'affichage en ms (défaut: 2500ms) */
  minDuration?: number
  /** Callback quand le splash est terminé */
  onComplete?: () => void
}

export function SplashScreen({ minDuration = 2500, onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Vérifier si c'est la première visite de la session
    const hasSeenSplash = sessionStorage.getItem('tatzy-splash-seen')

    if (hasSeenSplash) {
      setIsVisible(false)
      onComplete?.()
      return
    }

    // Afficher le splash pour la durée minimum
    const timer = setTimeout(() => {
      setIsExiting(true)

      // Attendre la fin de l'animation de sortie
      setTimeout(() => {
        setIsVisible(false)
        sessionStorage.setItem('tatzy-splash-seen', 'true')
        onComplete?.()
      }, 500)
    }, minDuration)

    return () => clearTimeout(timer)
  }, [minDuration, onComplete])

  if (!isVisible) return null

  return (
    <div
      className={`
        fixed inset-0 z-[100] flex flex-col items-center justify-center
        bg-taxi-black transition-opacity duration-500
        ${isExiting ? 'opacity-0' : 'opacity-100'}
      `}
    >
      <div className="flex flex-col items-center">
        {/* Logo */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tight">
            <span className="text-taxi-yellow">TATZY</span>
            <span className="text-white"> Taxi</span>
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Votre trajet, notre priorité
          </p>
        </div>

        {/* Animation voiture */}
        <TaxiAnimation size="lg" dark={true} showText={false} />

        {/* Indicateur de chargement */}
        <div className="mt-8 flex items-center space-x-3">
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 bg-taxi-yellow rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2.5 h-2.5 bg-taxi-yellow rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2.5 h-2.5 bg-taxi-yellow rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <span className="text-gray-500 text-sm">Chargement de l'application...</span>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-gray-600 text-xs">
        © 2024 Tatzy Taxi - Service professionnel
      </div>
    </div>
  )
}

export default SplashScreen
