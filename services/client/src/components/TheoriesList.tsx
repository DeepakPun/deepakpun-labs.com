'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import TheoryCard from '@/components/TheoryCard'

interface Theory {
  _id: string
  title: string
  targetMovie: string
  relatedPastMovies: string[]
  content: string
  predictionConfidence: number
  msLeft: number
}

interface ApiResponse {
  success: boolean
  statusCode: number
  message: string
  pagination: {
    totalItems: number
    totalPages: number
    currentPage: number
    itemsPerPage: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
  theories: Theory[]
}

export default function TheoriesList() {
  const [theories, setTheories] = useState<Theory[]>([])
  const [page, setPage] = useState<number>(1)
  const [pagination, setPagination] = useState<
    ApiResponse['pagination'] | null
  >(null)
  const [loading, setLoading] = useState<boolean>(true)

  const ITEMS_PER_PAGE = 2
  const resolvedUrl = process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1`
    : 'http://localhost:3001/api/v1'

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    fetch(`${resolvedUrl}/theories?page=${page}&limit=${ITEMS_PER_PAGE}`, {
      signal,
      cache: 'no-store',
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP network error code: ${res.status}`)
        return res.json()
      })
      .then((data: ApiResponse) => {
        if (data.success) {
          setTheories(data.theories)
          setPagination(data.pagination)
          setLoading(false)
        }
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error('Error contacting microservice database:', err)
          setLoading(false)
        }
      })

    return () => {
      controller.abort()
      setLoading(true)
    }
  }, [page, resolvedUrl])

  return (
    <main className='max-w-4xl mx-auto px-4 py-12 grow w-full space-y-8 bg-slate-950'>
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-6'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-black uppercase tracking-wider text-white font-mono flex items-center gap-3'>
            <span className='h-2 w-2 rounded-full bg-red-500 animate-pulse' />
            Core Intelligence Archives
          </h2>
          <p className='text-xs text-slate-500 font-mono tracking-tight'>
            Secure connection established:{' '}
            <span className='text-slate-400'>{resolvedUrl}</span>
          </p>
        </div>

        <Link
          href='/'
          className='self-start sm:self-center text-xs text-slate-400 hover:text-white font-mono bg-slate-900/60 border border-slate-800 hover:border-slate-700 px-4 py-2.5 rounded-lg transition-all shadow-md shadow-black/40'
        >
          ← Return Home
        </Link>
      </div>

      {loading ? (
        <div className='flex flex-col items-center justify-center py-32 space-y-4'>
          <div className='h-5 w-5 border-2 border-t-red-600 border-slate-800 rounded-full animate-spin' />
          <div className='text-slate-500 font-mono text-xs uppercase tracking-widest animate-pulse'>
            Decrypting Replicated Multiverse Channels...
          </div>
        </div>
      ) : theories.length === 0 ? (
        <div className='border border-dashed border-slate-800 rounded-xl p-16 text-center bg-slate-900/20 max-w-xl mx-auto shadow-2xl'>
          <p className='text-slate-400 font-mono text-sm mb-4'>
            The database contains no loaded entries.
          </p>
          <code className='bg-slate-950 text-red-400 px-3 py-2 rounded text-xs font-mono border border-slate-900 block truncate shadow-inner'>
            POST {resolvedUrl}/theories
          </code>
        </div>
      ) : (
        <div className='space-y-8'>
          <div className='flex justify-end'>
            <span className='bg-slate-900/80 text-slate-500 font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-md border border-slate-900'>
              Page Logs: {(page - 1) * ITEMS_PER_PAGE + 1} -{' '}
              {Math.min(page * ITEMS_PER_PAGE, pagination?.totalItems || 0)} of{' '}
              {pagination?.totalItems} Items
            </span>
          </div>

          <div className='space-y-6'>
            {theories.map(theory => (
              <TheoryCard key={theory._id} theory={theory} />
            ))}
          </div>

          {pagination && pagination.totalPages > 1 && (
            <div className='flex items-center justify-between pt-8 border-t border-slate-900 font-mono text-xs'>
              <button
                onClick={() => setPage(p => Math.max(p - 1, 1))}
                disabled={!pagination.hasPrevPage}
                className='px-4 py-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-red-400 hover:border-red-900/30 transition-all shadow-md disabled:opacity-20 disabled:hover:text-slate-400 disabled:hover:border-slate-800 select-none'
              >
                ← Previous Timeline
              </button>

              <span className='text-slate-400 font-semibold bg-slate-900/40 border border-slate-900 px-4 py-2 rounded-lg backdrop-blur-sm'>
                Sector {pagination.currentPage} / {pagination.totalPages}
              </span>

              <button
                onClick={() =>
                  setPage(p => Math.min(p + 1, pagination.totalPages))
                }
                disabled={!pagination.hasNextPage}
                className='px-4 py-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-red-400 hover:border-red-900/30 transition-all shadow-md disabled:opacity-20 disabled:hover:text-slate-400 disabled:hover:border-slate-800 select-none'
              >
                Next Timeline →
              </button>
            </div>
          )}
        </div>
      )}
    </main>
  )
}
