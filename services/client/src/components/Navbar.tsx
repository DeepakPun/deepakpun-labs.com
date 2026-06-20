export default function Navbar() {
  return (
    <header className='border-b border-slate-800 bg-slate-900 backdrop-blur sticky top-0 z-50'>
      <div className='max-w-6xl mx-auto px-4 h-16 flex items-center justify-between'>
        <a
          href='http://localhost:3000'
          className='flex items-center space-x-3 group outline-none'
        >
          <span className='bg-red-600 text-white font-black px-2.5 py-1 tracking-tighter text-sm uppercase rounded group-hover:bg-red-700 transition-colors'>
            MCU
          </span>
          <span className='font-bold tracking-tight text-lg text-slate-200 group-hover:text-white transition-colors hidden md:inline'>
            Multiverse Labs
          </span>
        </a>
        <div className='flex items-center space-x-4 sm:space-x-6'>
          {/* Changed text-xs to text-sm for better mobile visibility */}
          <nav className='flex items-center space-x-3 sm:space-x-4 text-sm sm:text-xs font-mono font-medium border-r border-slate-800 pr-4 sm:pr-6'>
            <a
              href='http://localhost:3002'
              className='text-slate-400 hover:text-red-500 transition-colors'
              target='_blank'
              rel='noopener noreferrer'
            >
              📖 System Docs
            </a>
            <a
              href='http://localhost:3001/api-docs'
              className='text-slate-400 hover:text-red-500 transition-colors'
              target='_blank'
              rel='noopener noreferrer'
            >
              ⚡ API Feed
            </a>
          </nav>
          {/* Changed text-xs to text-sm for better mobile visibility */}
          <a
            href='https://deepakpun.com'
            className='text-sm sm:text-xs text-slate-400 hover:text-red-500 font-mono transition-colors inline-flex items-center gap-1'
            target='_blank'
            rel='noopener noreferrer'
            title='Visits deepakpun.com (opens in a new tab)'
          >
            <span>💼</span>
            <span className='hidden sm:inline'>Main Portfolio</span>
            <span className='text-[10px] opacity-70'>↗</span>
          </a>
        </div>
      </div>
    </header>
  )
}
