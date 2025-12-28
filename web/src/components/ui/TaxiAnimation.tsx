'use client'

interface TaxiAnimationProps {
  /** Taille: 'sm', 'md', 'lg' */
  size?: 'sm' | 'md' | 'lg'
  /** Thème sombre */
  dark?: boolean
  /** Afficher le texte */
  showText?: boolean
  /** Texte personnalisé */
  text?: string
}

export function TaxiAnimation({
  size = 'md',
  dark = true,
  showText = true,
  text = 'Chargement...'
}: TaxiAnimationProps) {
  const sizes = {
    sm: { road: 'w-40', car: 'w-8 h-4', text: 'text-xs', markers: 'w-5 h-5 text-[7px]' },
    md: { road: 'w-56', car: 'w-12 h-6', text: 'text-sm', markers: 'w-6 h-6 text-[8px]' },
    lg: { road: 'w-72', car: 'w-16 h-8', text: 'text-base', markers: 'w-8 h-8 text-[10px]' }
  }

  const s = sizes[size]

  return (
    <div className="flex flex-col items-center">
      {/* Route avec voiture */}
      <div className={`${s.road} relative`}>
        {/* Route */}
        <div className={`relative h-3 w-full rounded-full overflow-hidden ${dark ? 'bg-gray-800' : 'bg-gray-200'}`}>
          {/* Ligne centrale pointillée */}
          <div className="absolute inset-0 flex items-center justify-around px-2">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-0.5 rounded-full ${dark ? 'bg-gray-600' : 'bg-gray-400'}`}
              />
            ))}
          </div>

          {/* Voiture taxi animée */}
          <div className="absolute top-1/2 -translate-y-1/2 animate-taxi-drive">
            <TaxiCar size={size} />
          </div>
        </div>

        {/* Marqueurs A et B */}
        <div className="flex justify-between mt-3">
          {/* Point A */}
          <div className="flex flex-col items-center">
            <div className={`
              ${s.markers} rounded-full border-2 flex items-center justify-center font-bold
              ${dark ? 'border-gray-600 text-gray-500' : 'border-gray-400 text-gray-500'}
            `}>
              A
            </div>
            <span className={`${dark ? 'text-gray-600' : 'text-gray-400'} text-[10px] mt-1`}>
              Départ
            </span>
          </div>

          {/* Point B avec pulse */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className={`
                ${s.markers} rounded-full border-2 flex items-center justify-center font-bold
                border-taxi-yellow text-taxi-yellow
              `}>
                B
              </div>
              {/* Pulse effect */}
              <div className="absolute inset-0 rounded-full border-2 border-taxi-yellow animate-ping opacity-30" />
            </div>
            <span className={`${dark ? 'text-gray-600' : 'text-gray-400'} text-[10px] mt-1`}>
              Arrivée
            </span>
          </div>
        </div>
      </div>

      {/* Texte de chargement */}
      {showText && (
        <p className={`
          mt-4 font-medium ${s.text}
          ${dark ? 'text-gray-400' : 'text-gray-500'}
        `}>
          {text}
        </p>
      )}
    </div>
  )
}

/** Composant voiture taxi SVG */
function TaxiCar({ size }: { size: 'sm' | 'md' | 'lg' }) {
  const carSizes = {
    sm: { width: 32, height: 16 },
    md: { width: 48, height: 24 },
    lg: { width: 64, height: 32 }
  }

  const { width, height } = carSizes[size]

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      {/* Phares arrière (rouge) */}
      <circle cx="4" cy="20" r="2" fill="#ef4444" className="animate-pulse" />

      {/* Corps de la voiture */}
      <rect x="6" y="14" width="52" height="14" rx="3" fill="#F7C600" />

      {/* Toit */}
      <path
        d="M16 14 L20 6 L44 6 L48 14"
        fill="#F7C600"
        stroke="#e5b000"
        strokeWidth="1"
      />

      {/* Fenêtres */}
      <rect x="21" y="7" width="10" height="6" rx="1" fill="#1a1a1a" opacity="0.8" />
      <rect x="33" y="7" width="10" height="6" rx="1" fill="#1a1a1a" opacity="0.8" />

      {/* Signe TAXI sur le toit */}
      <rect x="26" y="2" width="12" height="4" rx="1" fill="#1a1a1a" />
      <text x="32" y="5.5" fontSize="3" fill="#F7C600" textAnchor="middle" fontWeight="bold">
        TAXI
      </text>

      {/* Ligne décorative */}
      <rect x="8" y="20" width="48" height="2" fill="#1a1a1a" opacity="0.3" />

      {/* Roues */}
      <circle cx="18" cy="28" r="5" fill="#1a1a1a" />
      <circle cx="18" cy="28" r="2" fill="#4a4a4a" />
      <circle cx="46" cy="28" r="5" fill="#1a1a1a" />
      <circle cx="46" cy="28" r="2" fill="#4a4a4a" />

      {/* Phares avant (jaune brillant) */}
      <ellipse cx="59" cy="18" rx="3" ry="4" fill="#fef08a" className="animate-pulse" />
      <ellipse cx="59" cy="22" rx="2" ry="3" fill="#fef08a" opacity="0.8" />

      {/* Faisceau lumineux phares */}
      <ellipse cx="62" cy="20" rx="4" ry="6" fill="url(#headlightGradient)" opacity="0.4" />

      {/* Gradient pour les phares */}
      <defs>
        <radialGradient id="headlightGradient" cx="0%" cy="50%" r="100%">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export default TaxiAnimation
