import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tatzy Taxi',
  description: 'Service de taxi professionnel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body className="flex flex-col min-h-screen font-body" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
