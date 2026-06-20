'use client'

import { useEffect, useState } from 'react'

const DOOMSDAY_TARGET = new Date('2026-12-17T14:45:00-05:00').getTime()

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isReleased: boolean
}

export default function DoomsdayCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = DOOMSDAY_TARGET - now

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isReleased: true,
        })
        return
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isReleased: false,
      })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!timeLeft || timeLeft.isReleased) return null

  return (
    <div className='bg-slate-900/30 border border-slate-900 rounded-2xl p-5 md:p-6 w-full backdrop-blur-sm shadow-2xl relative overflow-hidden'>
      {/* BACKGROUND DECORATIVE TEXT */}
      <div className='absolute -right-6 -bottom-8 text-7xl font-black text-slate-900/10 pointer-events-none tracking-tighter uppercase font-mono select-none hidden lg:block'>
        DOOM
      </div>

      <div className='flex flex-col xl:flex-row xl:items-center justify-between gap-5 relative z-10'>
        {/* TEXT LOG MATRIX */}
        <div className='text-center xl:text-left space-y-1 shrink-0'>
          <div className='flex items-center justify-center xl:justify-start gap-2 text-[10px] font-mono font-bold text-red-500 uppercase tracking-widest'>
            <span className='h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse' />{' '}
            Temporal Convergence Warning
          </div>
          <h3 className='text-sm md:text-base font-bold tracking-tight text-white uppercase font-sans'>
            Countdown to Avengers: Doomsday
          </h3>
          <p className='text-[10px] text-slate-500 font-mono'>
            Target Reality Horizon: December 18, 2026
          </p>
        </div>

        {/* REPAIRED FLEX-1 CONTAINER SHIFT */}
        <div className='grid grid-cols-4 gap-2 sm:gap-3 w-full xl:w-auto font-mono max-w-sm xl:max-w-none mx-auto xl:mx-0 shrink-0'>
          {[
            { value: timeLeft.days, label: 'DAYS' },
            { value: timeLeft.hours, label: 'HRS' },
            { value: timeLeft.minutes, label: 'MIN' },
            { value: timeLeft.seconds, label: 'SEC' },
          ].map((block, i) => (
            <div
              key={i}
              className='bg-slate-950/80 border border-slate-900 rounded-xl py-3 px-1 text-center flex flex-col items-center justify-center min-w-[65px] sm:min-w-[75px] xl:w-[72px] transition-all'
            >
              <span className='text-xl sm:text-2xl md:text-3xl font-black text-red-500 tracking-tight block whitespace-nowrap'>
                {String(block.value).padStart(2, '0')}
              </span>
              <span className='text-[10px] sm:text-[10px] md:text-[11px] font-bold text-slate-600 uppercase tracking-wider mt-0.5 block whitespace-nowrap'>
                {block.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
