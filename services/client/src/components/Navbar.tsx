export default function Navbar() {
  return (
    <header className='border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50'>
      <div className='max-w-6xl mx-auto px-4 h-16 flex items-center justify-between'>
        {/* Left Side: Clickable Logo/Home Brand */}
        <a
          href='http://localhost:3000'
          className='flex items-center space-x-3 group outline-none'
        >
          <span className='bg-red-600 text-white font-black px-2.5 py-1 tracking-tighter text-sm uppercase rounded group-hover:bg-red-700 transition-colors'>
            MCU
          </span>
          <span className='font-bold tracking-tight text-lg text-slate-200 group-hover:text-white transition-colors hidden xs:inline'>
            Multiverse Labs
          </span>
        </a>

        {/* Right Side: Navigation Gateway Matrix & Portfolio Flag */}
        <div className='flex items-center space-x-6'>
          {/* Core System Navigation Links */}
          <nav className='flex items-center space-x-4 text-xs font-mono font-medium md:border-r md:border-slate-800 md:pr-6'>
            <a
              href='http://localhost:3002'
              className='text-slate-400 hover:text-red-500 transition-colors'
              target='_blank'
              rel='noopener noreferrer'
            >
              📖 System Docs
            </a>
            <a
              href='http://localhost:3001/api/theories'
              className='text-slate-400 hover:text-red-500 transition-colors'
              target='_blank'
              rel='noopener noreferrer'
            >
              ⚡ API Feed
            </a>
          </nav>

          {/* Updated Link: Points to your main portfolio site */}
          <a
            href='https://deepakpun.com'
            className='text-xs text-slate-400 hover:text-red-500 font-mono transition-colors hidden md:block'
            target='_blank'
            rel='noopener noreferrer'
          >
            deepakpun.com
          </a>
        </div>
      </div>
    </header>
  )
}
