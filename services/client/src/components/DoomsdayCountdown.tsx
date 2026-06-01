import { useEffect, useState } from 'react'

const DOOMSDAY_TARGET = new Date('2026-12-17T14:45:00-05:00').getTime()
// const DOOMSDAY_TARGET = new Date('2026-05-31T22:50:00-04:00').getTime()

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
    <div className='bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto my-8 backdrop-blur-sm shadow-2xl relative overflow-hidden'>
      <div className='absolute -right-10 -bottom-10 text-9xl font-black text-slate-900/10 pointer-events-none tracking-tighter uppercase font-mono select-none'>
        DOOM
      </div>

      <div className='flex flex-col md:flex-row items-center justify-between gap-6 relative z-10'>
        <div className='text-center md:text-left space-y-1.5'>
          <div className='flex items-center justify-center md:justify-start gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest'>
            <span className='h-2 w-2 rounded-full bg-red-600 animate-ping' />
            Temporal Convergence Warning
          </div>
          <h3 className='text-lg md:text-xl font-bold tracking-tight text-white uppercase'>
            Countdown to Avengers: Doomsday
          </h3>
          <p className='text-xs text-slate-400 font-mono'>
            Target Reality Horizon: December 18, 2026
          </p>
        </div>

        <div className='grid grid-cols-4 gap-3 md:gap-4 max-w-xs md:max-w-none w-full md:w-auto font-mono'>
          {[
            { value: timeLeft.days, label: 'DAYS' },
            { value: timeLeft.hours, label: 'HRS' },
            { value: timeLeft.minutes, label: 'MIN' },
            { value: timeLeft.seconds, label: 'SEC' },
          ].map((block, i) => (
            <div
              key={i}
              className='bg-slate-950/80 border border-slate-800 rounded-xl p-3 min-w-16.25 md:min-w-20 text-center flex flex-col items-center justify-center'
            >
              <span className='text-xl md:text-3xl font-black text-red-500 tracking-tight'>
                {String(block.value).padStart(2, '0')}
              </span>
              <span className='text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1'>
                {block.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
