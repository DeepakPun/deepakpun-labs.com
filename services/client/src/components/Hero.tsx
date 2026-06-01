export default function Hero() {
  return (
    <section className='relative overflow-hidden py-20 border-b border-slate-900 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-red-950/20 via-slate-950 to-slate-950'>
      <div className='max-w-4xl mx-auto px-4 text-center relative z-10'>
        <h1 className='text-4xl md:text-6xl font-black tracking-tight text-white mb-6 uppercase'>
          The Ultimate <span className='text-red-500'>Timeline</span> Breakdown
        </h1>
        <p className='text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed'>
          Publishing enterprise-grade predictions, Nexus point theories, and
          deep-dives into the future of the Marvel Cinematic Universe.
        </p>
      </div>
    </section>
  )
}
