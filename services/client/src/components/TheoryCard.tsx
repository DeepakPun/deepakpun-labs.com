interface TheoryProps {
  theory: {
    _id: string
    title: string
    targetMovie: string
    relatedPastMovies: string[]
    content: string
    predictionConfidence: number
  }
  index: number // Added index prop
}

export default function TheoryCard({ theory, index }: TheoryProps) {
  // Alternates between bg-slate-900/40 and bg-slate-950/40
  const bgClass = index % 2 === 0 ? 'bg-slate-900/40' : 'bg-slate-950/40'

  return (
    <article
      className={`border border-slate-800 ${bgClass} rounded-xl p-6 md:p-8 hover:border-slate-700 transition-all shadow-xl backdrop-blur-sm`}
    >
      <div className='flex flex-wrap items-center justify-between gap-4 mb-4'>
        <h3 className='text-xl md:text-2xl font-bold tracking-tight text-white'>
          {theory.title}
        </h3>
        <div className='flex items-center gap-2 bg-red-950/40 border border-red-900/60 text-red-400 px-2.5 py-1 rounded-md text-xs font-mono font-bold'>
          CONFIDENCE: {theory.predictionConfidence}/10
        </div>
      </div>

      <p className='text-slate-300 leading-relaxed mb-6 font-normal text-sm md:text-base'>
        {theory.content}
      </p>

      <div className='border-t border-slate-800/60 pt-4 flex flex-wrap gap-y-2 gap-x-6 text-xs font-mono text-slate-400'>
        <div>
          <span className='text-slate-500 uppercase mr-1.5'>Target:</span>
          <span className='text-slate-200'>{theory.targetMovie}</span>
        </div>
        {theory.relatedPastMovies && theory.relatedPastMovies.length > 0 && (
          <div>
            <span className='text-slate-500 uppercase mr-1.5'>References:</span>
            <span className='text-slate-200'>
              {theory.relatedPastMovies.join(', ')}
            </span>
          </div>
        )}
      </div>
    </article>
  )
}
