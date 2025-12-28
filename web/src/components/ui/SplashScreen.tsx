'use client'

import { useEffect, useState } from 'react'

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
      }, 500) // Durée du fade-out
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
      {/* Container principal */}
      <div className="flex flex-col items-center">

        {/* Animation Route */}
        <div className="w-64 relative mb-8">
          {/* Ligne de route */}
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-gray-700">
            {/* Pointillés */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-around">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-3 h-0.5 rounded-full bg-gray-600" />
              ))}
            </div>

            {/* Point taxi animé */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-taxi-yellow animate-taxi-move"
              style={{
                boxShadow: '0 0 20px rgba(247, 198, 0, 0.8), 0 0 40px rgba(247, 198, 0, 0.4)'
              }}
            />
          </div>

          {/* Marqueurs A → B */}
          <div className="flex justify-between mt-4">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full border-2 border-gray-600 flex items-center justify-center">
                <span className="text-gray-400 text-xs font-bold">A</span>
              </div>
              <span className="text-gray-500 text-xs mt-1">Départ</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full border-2 border-taxi-yellow flex items-center justify-center">
                <span className="text-taxi-yellow text-xs font-bold">B</span>
              </div>
              <span className="text-gray-500 text-xs mt-1">Arrivée</span>
            </div>
          </div>
        </div>

        {/* Logo */}
        <div className="text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tight">
            <span className="text-taxi-yellow">TATZY</span>
            <span className="text-white"> Taxi</span>
          </h1>
          <p className="text-gray-400 mt-3 text-lg animate-fade-in-delayed">
            Votre trajet, notre priorité
          </p>
        </div>

        {/* Indicateur de chargement */}
        <div className="mt-10 flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-taxi-yellow rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-taxi-yellow rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-taxi-yellow rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <span className="text-gray-500 text-sm ml-2">Chargement...</span>
        </div>
      </div>

      {/* Footer discret */}
      <div className="absolute bottom-8 text-gray-600 text-xs">
        © 2024 Tatzy Taxi - Service professionnel
      </div>
    </div>
  )
}

export default SplashScreen
