'use client'

import { FaStar, FaQuoteLeft } from 'react-icons/fa'

interface TestimonialCardProps {
  name: string
  role: string
  content: string
  rating: number
  image?: string
}

export function TestimonialCard({ name, role, content, rating, image }: TestimonialCardProps) {
  return (
    <div className="h-full flex flex-col bg-white rounded-2xl p-8 pt-10 shadow-lg relative">
      {/* Quote Icon */}
      <div className="absolute -top-4 left-8">
        <div className="w-10 h-10 bg-taxi-yellow rounded-full flex items-center justify-center">
          <FaQuoteLeft className="w-4 h-4 text-taxi-black" />
        </div>
      </div>

      {/* Rating */}
      <div className="flex space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-taxi-yellow' : 'text-gray-300'}`}
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-gray-600 leading-relaxed mb-6 italic flex-1">
        "{content}"
      </p>

      {/* Author */}
      <div className="flex items-center space-x-4 mt-auto">
        <div className="w-14 h-14 rounded-full bg-taxi-yellow flex items-center justify-center overflow-hidden">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xl font-bold text-taxi-black">
              {name.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <h4 className="font-heading font-bold text-taxi-black">{name}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  )
}
