'use client'
import Link from 'next/link'
import Hero from '@/components/Hero'
import DoomsdayCountdown from '@/components/DoomsdayCountdown'

export default function Home() {
  return (
    <div className='bg-slate-950 text-slate-100 flex flex-col selection:bg-red-600 selection:text-white'>
      <Hero />

      <main className='max-w-6xl mx-auto px-4 w-full grow grid grid-cols-1 md:grid-cols-6 gap-6 pt-2 pb-8 relative z-10 items-start'>
        <div className='col-span-1 md:col-span-4 flex flex-col space-y-4 w-full justify-start'>
          <div className='w-full transform transition-all duration-300'>
            <DoomsdayCountdown />
          </div>

          <div className='bg-slate-900/40 border border-slate-900 rounded-xl p-8 flex flex-col justify-between gap-6 shadow-2xl relative overflow-hidden backdrop-blur-sm min-h-55'>
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(220,38,38,0.04)_0%,transparent_50%)] pointer-events-none' />
            <div className='space-y-3 relative z-10'>
              <h3 className='font-bold text-xl text-slate-100 tracking-tight font-sans md:text-2xl'>
                Multiverse Intelligence Registry
              </h3>
              <p className='text-sm text-slate-400 max-w-xl leading-relaxed font-normal md:text-base'>
                Access live logs tracking MCU phase timelines, Anchor Being
                structural integrity, and subatomic genetic transformations
                directly from the core service datastore.
              </p>
            </div>
            <div className='pt-2 relative z-10 w-full'>
              <Link
                href='/theories'
                className='inline-block w-full bg-red-600 hover:bg-red-700 text-white font-mono font-bold text-sm uppercase px-6 py-4 rounded-xl tracking-wider transition-all shadow-lg shadow-red-900/30 text-center hover:scale-[1.01] active:scale-[0.99]'
              >
                🔎 Enter Database Vault
              </Link>
            </div>
          </div>
        </div>

        <div className='col-span-1 md:col-span-2 flex flex-col space-y-4 w-full h-full justify-start'>
          <div className='bg-slate-900/30 border border-slate-900/90 rounded-xl p-5 flex flex-col justify-between space-y-4 relative overflow-hidden shadow-xl group backdrop-blur-sm hover:border-red-900/30 transition-all w-full'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-[10px] font-mono font-bold tracking-widest text-red-500 uppercase bg-red-950/40 border border-red-900/30 px-2 py-0.5 rounded'>
                  Phase 6 Core
                </span>
              </div>
              <h4 className='font-bold text-base text-slate-100 font-sans tracking-tight group-hover:text-red-400 transition-colors'>
                Spider-Man: Brand New Day
              </h4>
              <p className='text-xs text-slate-400 leading-relaxed font-normal'>
                Peter Parker navigates isolated city monitoring following
                complete memory erasure protocols.
              </p>
            </div>
            <div className='border-t border-slate-900/80 pt-3 flex items-center justify-between'>
              <span className='text-[11px] text-slate-500 font-mono uppercase tracking-wider'>
                Release Target:
              </span>
              <span className='text-xs font-bold font-mono text-slate-200 bg-slate-950 px-2.5 py-1 rounded border border-slate-900'>
                July 31, 2026
              </span>
            </div>
          </div>

          <div className='bg-slate-900/30 border border-slate-900/90 rounded-xl p-5 flex flex-col justify-between space-y-4 relative overflow-hidden shadow-xl group backdrop-blur-sm hover:border-blue-900/30 transition-all w-full'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-[10px] font-mono font-bold tracking-widest text-blue-400 uppercase bg-blue-950/40 border border-blue-900/30 px-2 py-0.5 rounded'>
                  Saga Finale
                </span>
              </div>
              <h4 className='font-bold text-base text-slate-100 font-sans tracking-tight group-hover:text-blue-400 transition-colors'>
                Avengers: Secret Wars
              </h4>
              <p className='text-xs text-slate-400 leading-relaxed font-normal'>
                The ultimate multiversal culmination point directed by the Russo
                brothers.
              </p>
            </div>
            <div className='border-t border-slate-900/80 pt-3 flex items-center justify-between'>
              <span className='text-[11px] text-slate-500 font-mono uppercase tracking-wider'>
                Release Target:
              </span>
              <span className='text-xs font-bold font-mono text-slate-200 bg-slate-950 px-2.5 py-1 rounded border border-slate-900'>
                December 17, 2027
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
