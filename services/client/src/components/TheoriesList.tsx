"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import DatabaseNotice from "./DatabaseNotice"
import TheoryCard from "./TheoryCard"

interface Theory {
  _id: string
  title: string
  targetMovie: string
  content: string
  relatedPastMovies: string[]
  predictionConfidence: number
  createdAt: string
  updatedAt: string
}

interface ApiResponse {
  success: boolean
  theories: Theory[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export default function TheoriesList() {
  const [theories, setTheories] = useState<Theory[]>([])
  const [page, setPage] = useState<number>(1)
  const [pagination, setPagination] = useState<
    ApiResponse["pagination"] | null
  >(null)

  // Start loading as true so both server and client render the loading placeholder first
  const [loading, setLoading] = useState<boolean>(true)
  const ITEMS_PER_PAGE = 2

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    // Set loading to true when changing pages to show structural placeholder gracefully
    setLoading(true)

    // Note: useEffect ONLY runs in the browser. You do not need 'typeof window' checks here.
    fetch(`/api/v1/theories?page=${page}&limit=${ITEMS_PER_PAGE}`, {
      signal,
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => {
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
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Error contacting microservice database:", err)
          setLoading(false)
        }
      })

    return () => {
      controller.abort()
    }
  }, [page])

  // ==========================================
  // RENDER BLOCKS
  // ==========================================
  if (loading) {
    return (
      <div className="space-y-4 w-full max-w-4xl mx-auto p-4 font-mono">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-slate-900/40 border border-slate-900 rounded-xl p-5 animate-pulse space-y-3"
          >
            <div className="h-4 bg-slate-800/60 rounded w-1/3" />
            <div className="h-3 bg-slate-800/40 rounded w-3/4" />
          </div>
        ))}
      </div>
    )
  }

  // 3. FIX THE SUB-HEADER DISPLAY TEXT TO PREVENT HYDRATION BLOCKS
  // Instead of printing the raw dynamic URL string which triggers the mismatch,
  // print a static system title or use an empty state indicator until loaded.
  return (
    <div className="max-w-4xl mx-auto w-full flex-1 min-h-0 flex flex-col">
      <div className="shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-black uppercase tracking-wider text-white font-mono flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />{" "}
            Core Intelligence Archives
          </h2>
          <p className="text-xs text-slate-500 font-mono tracking-tight">
            Secure connection status:{" "}
            <span className="text-emerald-500 font-bold animate-pulse">
              ONLINE
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <Link
            href="/theories/new"
            className="text-xs text-white font-mono bg-red-600 hover:bg-red-700 border border-red-700 hover:border-red-600 px-4 py-2.5 rounded-lg transition-all shadow-md shadow-red-950/40 font-bold uppercase tracking-wider"
          >
            ➕ Transmit Entry
          </Link>
        </div>
      </div>

      <DatabaseNotice />

      {loading ? (
        <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-4">
          <div className="h-5 w-5 border-2 border-t-red-600 border-slate-800 rounded-full animate-spin" />
          <div className="text-slate-500 font-mono text-xs uppercase tracking-widest animate-pulse">
            Decrypting Replicated Multiverse Channels...
          </div>
        </div>
      ) : theories.length === 0 ? (
        <div className="flex-1 min-h-0 flex items-center justify-center py-6">
          <div className="border border-dashed border-slate-800 rounded-xl p-8 text-center bg-slate-900/20 max-w-xl w-full shadow-2xl flex flex-col items-center justify-center gap-4">
            <p className="text-slate-400 font-mono text-sm">
              The database contains no loaded entries.
            </p>
            <Link
              href="/theories/new"
              className="inline-block text-xs text-white font-mono bg-red-600 hover:bg-red-700 border border-red-700 hover:border-red-600 px-6 py-3 rounded-lg transition-all shadow-lg shadow-red-950/50 font-bold uppercase tracking-wider"
            >
              ➕ Log First Core Entry
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex-1 min-h-0 overflow-y-auto pt-6">
          <div className="space-y-6">
            <div className="flex justify-end">
              <span className="bg-slate-900/80 text-slate-500 font-mono text- uppercase tracking-widest px-3 py-1 rounded-md border border-slate-900">
                Page Logs: {(page - 1) * ITEMS_PER_PAGE + 1} -{" "}
                {Math.min(page * ITEMS_PER_PAGE, pagination?.totalItems || 0)}{" "}
                of {pagination?.totalItems} Items
              </span>
            </div>

            <div className="space-y-6">
              {theories.map((theory, index) => (
                <ThemeCardKeyAdjusted
                  key={theory._id}
                  index={index}
                  theory={theory}
                />
              ))}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-between pt-8 border-t border-slate-900 font-mono text-xs">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={!pagination.hasPrevPage}
                  className="px-4 py-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-red-400 hover:border-red-900/30 transition-all shadow-md disabled:opacity-20 disabled:hover:text-slate-400 disabled:hover:border-slate-800 select-none"
                >
                  ← Previous Timeline
                </button>
                <span className="text-slate-400 font-semibold bg-slate-900/40 border border-slate-900 px-4 py-2 rounded-lg backdrop-blur-sm">
                  Sector {pagination.currentPage} / {pagination.totalPages}
                </span>
                <button
                  onClick={() =>
                    setPage((p) => Math.min(p + 1, pagination.totalPages))
                  }
                  disabled={!pagination.hasNextPage}
                  className="px-4 py-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-red-400 hover:border-red-900/30 transition-all shadow-md disabled:opacity-20 disabled:hover:text-slate-400 disabled:hover:border-slate-800 select-none"
                >
                  Next Timeline →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Temporary component reference fixing typography matching
function ThemeCardKeyAdjusted({
  theory,
  index,
}: {
  theory: Theory
  index: number
}) {
  return <TheoryCard index={index} theory={theory} />
}
