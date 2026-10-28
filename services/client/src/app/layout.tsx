import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Deepak's MCU Multiverse Labs",
  description:
    "Enterprise-grade microservices portfolio featuring advanced MCU theories, predictions, and timeline breakdowns.",
  metadataBase: new URL("https://deepakpun-labs.com"),
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 h-dvh flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
