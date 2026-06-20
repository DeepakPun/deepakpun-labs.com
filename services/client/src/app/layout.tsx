import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Deepak's MCU Multiverse Labs",
  description:
    'Enterprise-grade microservices portfolio featuring advanced MCU theories, predictions, and timeline breakdowns.',
  metadataBase: new URL('https://deepakpun-labs.com'),
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className='flex flex-col bg-slate-900 text-slate-100 font-sans'>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
