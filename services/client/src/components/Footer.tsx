export default function Footer() {
  return (
    <footer className='border-t border-slate-900 bg-slate-950 py-8'>
      <div className='max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-slate-500'>
        <div className='flex flex-col gap-1 text-center md:text-left'>
          <p>
            © {new Date().getFullYear()} deepakpun-labs.com. All variants
            reserved.
          </p>
          <p className='text-[10px] text-slate-600 tracking-wide'>
            Prime Variant Admin Profile Mode
          </p>
        </div>

        {/* Footer Gateway Mapping Links */}
        <div className='flex items-center space-x-6 text-[11px] font-medium'>
          <a
            href='http://localhost:3002'
            className='hover:text-slate-300 transition-colors'
            target='_blank'
            rel='noopener noreferrer'
          >
            Architecture Wiki
          </a>
          <span className='text-slate-800'>|</span>
          <a
            href='http://localhost:3001/api/theories'
            className='hover:text-slate-300 transition-colors'
            target='_blank'
            rel='noopener noreferrer'
          >
            Core REST Nodes
          </a>
          <span className='text-slate-800'>|</span>
          <p className='tracking-widest uppercase text-[10px] text-slate-600 font-bold'>
            MERN + Docker
          </p>
        </div>
      </div>
    </footer>
  )
}
