'use client'

import React, { useEffect, useState, type JSX, type MouseEvent } from 'react'

export default function Hero(): JSX.Element {
  const [showAppeal, setShowAppeal] = useState<boolean>(true)

  useEffect((): void => {
    try {
      const dismissed = window.localStorage.getItem('mcu-appeal-dismissed')
      if (dismissed === '1') {
        setShowAppeal(false)
      }
    } catch {
      // ignore if storage is blocked
    }
  }, [])

  const dismiss = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    setShowAppeal(false)
    try {
      window.localStorage.setItem('mcu-appeal-dismissed', '1')
    } catch {
      // ignore
    }
  }

  return (
    <section className='relative overflow-hidden py-20 border-slate-900 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-red-950/20 via-slate-950 to-slate-950'>
      <div className='max-w-4xl mx-auto px-4 text-center relative z-10'>
        <h1 className='text-4xl md:text-6xl font-black tracking-tight text-white mb-6 uppercase'>
          The Ultimate <span className='text-red-500'>Timeline</span> Breakdown
        </h1>
        <p className='text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed'>
          Publishing enterprise-grade predictions, Nexus point theories, and
          deep-dives into the future of the Marvel Cinematic Universe.
        </p>

        {/* {showAppeal && (
          <div className='mt-12 max-w-2xl mx-auto text-left'>
            <div className='relative border border-red-900/40 bg-slate-900/70 backdrop-blur-md rounded-xl p-5 pr-12 shadow-lg shadow-red-950/20'>
              <button
                type='button'
                onClick={dismiss}
                aria-label='Dismiss appeal'
                className='absolute top-3 right-3 text-slate-500 hover:text-white transition'
              >
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path d='M18 6L6 18M6 6l12 12' />
                </svg>
              </button>

              <p className='text-[10px] uppercase tracking-widest text-red-400 font-semibold mb-2'>
                Appeal to Marvel
              </p>
              <p className='text-slate-200 text-sm leading-relaxed'>
                Don't copy Infinity War and Endgame. Let{' '}
                <span className='text-white'>Doomsday</span> end with a real
                Avengers victory. Then make{' '}
                <span className='text-white'>Secret Wars</span> brutal — worlds
                fall — until we learn Doom faked his defeat.
              </p>
            </div>
          </div>
        )} */}
      </div>
    </section>
  )
}
