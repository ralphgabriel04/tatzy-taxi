'use client'

/**
 * Loading component for page transitions
 * S'affiche pendant la navigation entre pages (basé sur la vitesse réelle)
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        {/* Spinner simple et rapide */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-gray-200" />
          <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-t-taxi-yellow animate-spin" />
        </div>

        {/* Texte */}
        <p className="mt-4 text-gray-500 text-sm font-medium">
          Chargement...
        </p>
      </div>
    </div>
  )
}
