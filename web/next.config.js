const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Activer le mode strict React
  reactStrictMode: true,

  // Configuration des variables d'environnement publiques
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  },

  // Optimisation des images (désactivé pour l'instant)
  images: {
    unoptimized: true,
  },
}

module.exports = withNextIntl(nextConfig)
