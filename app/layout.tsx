import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Providers from '@/components/providers/providers'

export const metadata: Metadata = {
  title: 'ICT CDS - Jos North',
  description: 'The official website for the Jos North chapter of the ICT Community Development Society (CDS), dedicated to promoting technology and innovation in the region.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable}`}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
