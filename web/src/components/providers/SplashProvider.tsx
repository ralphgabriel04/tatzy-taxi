'use client'

import { useState } from 'react'
import { SplashScreen } from '@/components/ui/SplashScreen'

interface SplashProviderProps {
  children: React.ReactNode
  /** Durée du splash en ms (défaut: 2500ms) */
  duration?: number
  /** Désactiver le splash (pour dev) */
  disabled?: boolean
}

export function SplashProvider({
  children,
  duration = 2500,
  disabled = false
}: SplashProviderProps) {
  const [splashComplete, setSplashComplete] = useState(disabled)

  return (
    <>
      {!splashComplete && (
        <SplashScreen
          minDuration={duration}
          onComplete={() => setSplashComplete(true)}
        />
      )}
      <div
        className={`
          transition-opacity duration-300
          ${splashComplete ? 'opacity-100' : 'opacity-0'}
        `}
      >
        {children}
      </div>
    </>
  )
}

export default SplashProvider
