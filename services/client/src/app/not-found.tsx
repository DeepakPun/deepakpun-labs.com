import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center px-4 selection:bg-red-600 selection:text-white relative overflow-hidden'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05)_0%,transparent_70%)] pointer-events-none' />

      <div className='max-w-md w-full text-center space-y-6 relative z-10'>
        <div className='space-y-2'>
          <span className='bg-red-950/50 text-red-500 font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-red-900/30 inline-block animate-pulse'>
            ⚠️ Timeline Displacement Detected
          </span>
          <h1 className='text-8xl font-black tracking-tighter text-slate-800 font-mono select-none'>
            404
          </h1>
        </div>

        <div className='space-y-2'>
          <h2 className='text-xl font-bold tracking-tight text-slate-200 uppercase font-mono'>
            Reality Not Found
          </h2>
          <p className='text-sm text-slate-400 leading-relaxed max-w-sm mx-auto'>
            The timeline coordinate you are trying to reach has been pruned from
            the Sacred Timeline or does not exist in this sector.
          </p>
        </div>

        <div className='pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 font-mono text-xs'>
          <Link
            href='/'
            className='w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold uppercase px-5 py-3 rounded-lg tracking-wider transition-all text-center shadow-lg shadow-red-900/20'
          >
            🏠 Return Home
          </Link>

          <Link
            href='/theories'
            className='w-full sm:w-auto bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 px-5 py-3 rounded-lg transition-all text-center'
          >
            🔎 View Vault Archives
          </Link>
        </div>
      </div>

      <div className='absolute bottom-6 font-mono text-[10px] text-slate-600 tracking-widest uppercase pointer-events-none'>
        Ecosystem Core: Ref_Err_3000_Null
      </div>
    </div>
  )
}
