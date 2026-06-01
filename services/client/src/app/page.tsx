'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import DoomsdayCountdown from '@/components/DoomsdayCountdown'
import TheoryCard from '@/components/TheoryCard'
import Footer from '@/components/Footer'

interface Theory {
  _id: string
  title: string
  targetMovie: string
  relatedPastMovies: string[]
  content: string
  predictionConfidence: number
}

export default function Home() {
  const [theories, setTheories] = useState<Theory[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetch('http://localhost:3001/api/theories')
      .then(res => res.json())
      .then((data: Theory[]) => {
        setTheories(data)
        setLoading(false)
        console.log('Fetched theories:', data)
      })
      .catch(err => {
        console.error('Error fetching theories:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div className='min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-red-600 selection:text-white'>
      <Navbar />
      <Hero />

      <div className='max-w-4xl mx-auto px-4 w-full'>
        <DoomsdayCountdown />
      </div>

      <main className='max-w-4xl mx-auto px-4 py-8 grow w-full'>
        <h2 className='text-xl font-bold uppercase tracking-wider text-slate-400 mb-8 flex items-center gap-3'>
          <span className='h-2 w-2 rounded-full bg-red-500 animate-pulse' />
          Active Intelligence Reports
        </h2>

        {loading ? (
          <div className='text-center py-12 text-slate-500 font-mono text-sm animate-pulse'>
            Scanning timelines...
          </div>
        ) : theories.length === 0 ? (
          <div className='border border-dashed border-slate-800 rounded-xl p-12 text-center bg-slate-900/20'>
            <p className='text-slate-400 font-medium mb-3'>
              No active theories in this reality.
            </p>
            <p className='text-xs text-slate-500 font-mono mb-4'>
              Initialize the local mock database to see sample data:
            </p>
            <code className='bg-slate-950 text-red-400 px-3 py-1.5 rounded text-xs font-mono border border-slate-800 inline-block'>
              curl -X POST http://localhost:3001/api/theories/seed
            </code>
          </div>
        ) : (
          <div className='space-y-6'>
            {theories.map(theory => (
              <TheoryCard key={theory._id} theory={theory} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
