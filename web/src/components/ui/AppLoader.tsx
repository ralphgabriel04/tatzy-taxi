'use client'

import { useEffect, useState } from 'react'

interface AppLoaderProps {
  /** Variante d'animation: 'route' (défaut) ou 'spinner' */
  variant?: 'route' | 'spinner'
  /** Thème: 'light' (défaut), 'dark', ou 'auto' (suit le système) */
  theme?: 'light' | 'dark' | 'auto'
  /** Afficher le texte "Tatzy" */
  showText?: boolean
  /** Texte du slogan (optionnel) */
  slogan?: string
  /** Taille: 'sm', 'md' (défaut), 'lg' */
  size?: 'sm' | 'md' | 'lg'
}

export function AppLoader({
  variant = 'route',
  theme = 'auto',
  showText = true,
  slogan,
  size = 'md'
}: AppLoaderProps) {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Resolve theme
  useEffect(() => {
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      setResolvedTheme(mediaQuery.matches ? 'dark' : 'light')

      const handler = (e: MediaQueryListEvent) => setResolvedTheme(e.matches ? 'dark' : 'light')
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    } else {
      setResolvedTheme(theme)
    }
  }, [theme])

  const isDark = resolvedTheme === 'dark'

  // Size configurations
  const sizes = {
    sm: { container: 'w-48', text: 'text-xl', slogan: 'text-xs', road: 'w-32', dot: 'w-2 h-2' },
    md: { container: 'w-64', text: 'text-3xl', slogan: 'text-sm', road: 'w-48', dot: 'w-3 h-3' },
    lg: { container: 'w-80', text: 'text-4xl', slogan: 'text-base', road: 'w-64', dot: 'w-4 h-4' }
  }

  const s = sizes[size]

  return (
    <div
      className={`
        fixed inset-0 z-50 flex flex-col items-center justify-center
        transition-colors duration-300
        ${isDark ? 'bg-taxi-black' : 'bg-white'}
      `}
      role="status"
      aria-label="Chargement en cours"
    >
      <div className={`${s.container} flex flex-col items-center`}>
        {/* Animation */}
        {variant === 'route' ? (
          <RouteAnimation
            isDark={isDark}
            reducedMotion={reducedMotion}
            roadWidth={s.road}
            dotSize={s.dot}
          />
        ) : (
          <SpinnerAnimation
            isDark={isDark}
            reducedMotion={reducedMotion}
            size={size}
          />
        )}

        {/* Logo Text */}
        {showText && (
          <div
            className={`
              mt-6 font-heading font-bold tracking-tight
              ${s.text}
              ${reducedMotion ? '' : 'animate-fade-in'}
            `}
          >
            <span className="text-taxi-yellow">TATZY</span>
            <span className={isDark ? 'text-white' : 'text-taxi-black'}> Taxi</span>
          </div>
        )}

        {/* Slogan */}
        {slogan && (
          <p
            className={`
              mt-2 font-medium
              ${s.slogan}
              ${isDark ? 'text-gray-400' : 'text-gray-500'}
              ${reducedMotion ? '' : 'animate-fade-in-delayed'}
            `}
          >
            {slogan}
          </p>
        )}
      </div>
    </div>
  )
}

/** Variante A: Route avec point en mouvement */
function RouteAnimation({
  isDark,
  reducedMotion,
  roadWidth,
  dotSize
}: {
  isDark: boolean
  reducedMotion: boolean
  roadWidth: string
  dotSize: string
}) {
  return (
    <div className={`${roadWidth} relative`}>
      {/* Route/Ligne */}
      <div className="relative h-1 w-full overflow-hidden rounded-full">
        {/* Background de la route */}
        <div
          className={`
            absolute inset-0 rounded-full
            ${isDark ? 'bg-gray-700' : 'bg-gray-200'}
          `}
        />

        {/* Pointillés de la route (ligne centrale) */}
        <div
          className={`
            absolute inset-y-0 left-0 right-0 flex items-center justify-around
          `}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`
                w-2 h-0.5 rounded-full
                ${isDark ? 'bg-gray-500' : 'bg-gray-300'}
              `}
            />
          ))}
        </div>

        {/* Point/Taxi qui bouge */}
        <div
          className={`
            absolute top-1/2 -translate-y-1/2 ${dotSize} rounded-full bg-taxi-yellow shadow-lg
            ${reducedMotion ? '' : 'animate-taxi-move'}
          `}
          style={{
            boxShadow: '0 0 10px rgba(251, 191, 36, 0.6)'
          }}
        />
      </div>

      {/* Marqueurs A et B */}
      <div className="flex justify-between mt-3">
        <div className="flex flex-col items-center">
          <div
            className={`
              w-5 h-5 rounded-full border-2 flex items-center justify-center text-[8px] font-bold
              ${isDark
                ? 'border-gray-500 text-gray-400'
                : 'border-gray-300 text-gray-500'
              }
            `}
          >
            A
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div
            className={`
              w-5 h-5 rounded-full border-2 flex items-center justify-center text-[8px] font-bold
              border-taxi-yellow text-taxi-yellow
            `}
          >
            B
          </div>
        </div>
      </div>
    </div>
  )
}

/** Variante B: Spinner stylisé */
function SpinnerAnimation({
  isDark,
  reducedMotion,
  size
}: {
  isDark: boolean
  reducedMotion: boolean
  size: 'sm' | 'md' | 'lg'
}) {
  const spinnerSizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  }

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-9 h-9'
  }

  return (
    <div className="relative">
      {/* Cercle de fond */}
      <div
        className={`
          ${spinnerSizes[size]} rounded-full border-4
          ${isDark ? 'border-gray-700' : 'border-gray-200'}
        `}
      />

      {/* Arc animé */}
      <div
        className={`
          absolute inset-0 ${spinnerSizes[size]} rounded-full border-4 border-transparent border-t-taxi-yellow
          ${reducedMotion ? '' : 'animate-spin'}
        `}
        style={{ animationDuration: '1s' }}
      />

      {/* Icône taxi au centre */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className={`${iconSizes[size]} text-taxi-yellow ${reducedMotion ? '' : 'animate-pulse-subtle'}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          {/* Icône taxi simplifiée */}
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H15V3H9v2H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
        </svg>
      </div>
    </div>
  )
}

/** Export des variantes pour un usage direct */
export function RouteLoader(props: Omit<AppLoaderProps, 'variant'>) {
  return <AppLoader {...props} variant="route" />
}

export function SpinnerLoader(props: Omit<AppLoaderProps, 'variant'>) {
  return <AppLoader {...props} variant="spinner" />
}

export default AppLoader
