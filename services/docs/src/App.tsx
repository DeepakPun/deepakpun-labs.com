'use client'
import { useState, useEffect, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import { motion } from 'framer-motion'
import { SIDEBAR_NAV_ITEMS } from './constants/sidebarNav'
import rawKanbanData from './constants/kanbandata.json'

interface KanbanItem {
  id: string
  title: string
  service: string
  description: string
}

interface PipelineStages {
  queued: KanbanItem[]
  executing: KanbanItem[]
  stable: KanbanItem[]
}

interface KanbanData {
  controlPlane: PipelineStages
  edgeLayer: PipelineStages
}

export default function App() {
  const [activeDoc, setActiveDoc] = useState<string>('architecture')
  const [markdownContent, setMarkdownContent] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  const kanbanData = rawKanbanData as unknown as KanbanData

  useEffect(() => {
    let cancelled = false
    if (activeDoc !== 'kanban') {
      import(`./docs/${activeDoc}.md?raw`)
        .then(res => {
          if (!cancelled) setMarkdownContent(res.default)
        })
        .catch(err => {
          if (!cancelled) {
            console.error(`Failed to load markdown file: ${activeDoc}`, err)
            setMarkdownContent(
              '# Error\nFailed to load documentation asset from disk.',
            )
          }
        })
    }
    return () => {
      cancelled = true
    }
  }, [activeDoc])

  const filteredNavItems = useMemo(() => {
    return SIDEBAR_NAV_ITEMS.filter(item =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [searchQuery])

  const renderPipelineGrid = (stages: PipelineStages) => {
    const stageColors = {
      queued: {
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        text: 'text-amber-400',
        heading: 'text-amber-500',
      },
      executing: {
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        heading: 'text-blue-500',
      },
      stable: {
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        text: 'text-emerald-400',
        heading: 'text-emerald-500',
      },
    }

    const StageColumn = ({
      title,
      type,
      items,
    }: {
      title: string
      type: 'queued' | 'executing' | 'stable'
      items: KanbanItem[]
    }) => {
      const colors = stageColors[type]

      return (
        <div className='bg-slate-900/40 border border-slate-800 rounded-xl p-4 flex flex-col gap-4'>
          <div className='flex items-center justify-between border-b border-slate-800 pb-2'>
            <h3
              className={`font-semibold tracking-wide uppercase text-sm ${colors.heading}`}
            >
              {title}
            </h3>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} font-medium`}
            >
              {items.length}
            </span>
          </div>

          <div className='flex flex-col gap-3 overflow-y-auto max-h-150 pr-1'>
            {items.map(item => (
              <motion.div
                key={item.id}
                layoutId={item.id}
                className={`p-4 rounded-lg border ${colors.bg} ${colors.border} flex flex-col gap-2`}
              >
                <div className='flex justify-between items-start gap-2'>
                  <h4 className='font-medium text-slate-200 text-sm leading-snug'>
                    {item.title}
                  </h4>
                  <span
                    className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded font-mono ${colors.text} bg-slate-950/40 border ${colors.border}`}
                  >
                    {item.service}
                  </span>
                </div>
                <p className='text-xs text-slate-400 leading-relaxed'>
                  {item.description}
                </p>
              </motion.div>
            ))}
            {items.length === 0 && (
              <div className='text-center py-8 text-xs text-slate-600 border border-dashed border-slate-800/60 rounded-lg'>
                No items in this stage
              </div>
            )}
          </div>
        </div>
      )
    }

    return (
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full'>
        <StageColumn title='Queued' type='queued' items={stages.queued} />
        <StageColumn
          title='Executing'
          type='executing'
          items={stages.executing}
        />
        <StageColumn title='Stable' type='stable' items={stages.stable} />
      </div>
    )
  }

  return (
    <div className='h-screen flex flex-col font-sans select-none bg-slate-950 text-slate-100 overflow-hidden'>
      <header className='h-16 border-b border-slate-900 bg-slate-900/40 flex items-center px-4 md:px-6 justify-between shrink-0 z-50'>
        <div className='flex items-center space-x-3'>
          <span className='bg-red-600 text-white font-black px-2 py-0.5 text-xs uppercase rounded'>
            Docs
          </span>
          <span className='font-bold text-slate-200 text-sm md:text-base'>
            Engineering Workspace
          </span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className='md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs'
          aria-label='Toggle navigation menu'
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </header>

      <div className='flex flex-1 relative overflow-hidden'>
        <aside
          className={`absolute md:static top-0 bottom-0 left-0 w-64 border-r border-slate-900 bg-slate-900/95 md:bg-slate-900/90 p-4 md:p-6 flex flex-col space-y-4 shadow-2xl z-40 transition-transform duration-300 ease-in-out shrink-0 ${
            isMobileMenuOpen
              ? 'translate-x-0'
              : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className='space-y-2 shrink-0'>
            <div className='text- font-bold tracking-widest text-slate-500 uppercase'>
              Blueprints Matrix
            </div>
            <input
              type='text'
              placeholder='Search systems...'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className='w-full bg-slate-950 border border-slate-800 focus:border-red-900/60 rounded-lg px-3 py-2 text-xs font-mono text-slate-300 outline-none placeholder-slate-600 transition-all shadow-inner'
            />
          </div>
          <nav className='flex-1 overflow-y-auto space-y-1 pr-1 border-t border-slate-950 pt-2 custom-scrollbar'>
            {filteredNavItems.length === 0 ? (
              <div className='text- text-slate-600 font-mono text-center pt-4'>
                No matching sectors found.
              </div>
            ) : (
              filteredNavItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveDoc(item.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`w-full text-left text-xs md:text-sm px-3 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2.5 ${
                    activeDoc === item.id
                      ? 'bg-red-950/40 text-red-400 border border-red-900/30 font-semibold shadow-inner'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                  }`}
                >
                  <span className='shrink-0'>{item.icon}</span>
                  <span className='truncate'>{item.label}</span>
                </button>
              ))
            )}
          </nav>
        </aside>

        {isMobileMenuOpen && (
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className='absolute inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden'
          />
        )}

        <main className='flex-1 p-6 md:p-12 overflow-y-auto w-full selection:bg-red-600 selection:text-white bg-slate-950 z-10'>
          <div
            className={`${activeDoc === 'kanban' ? 'max-w-6xl' : 'max-w-4xl'} mx-auto w-full`}
          >
            <motion.div
              key={activeDoc}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              {activeDoc === 'kanban' ? (
                <div className='space-y-8'>
                  <div>
                    <h1 className='text-2xl font-bold text-slate-100 mb-2'>
                      Deployment Pipeline
                    </h1>
                    <p className='text-sm text-slate-400'>
                      Real-time system deployment updates across active
                      portfolio components.
                    </p>
                  </div>

                  <div className='bg-blue-950/30 border border-blue-900/40 p-4 rounded-xl'>
                    <div className='flex items-start gap-3'>
                      <div className='h-2 w-2 rounded-full bg-blue-400 mt-1.5 animate-pulse shrink-0' />
                      <div>
                        <h3 className='text-sm font-bold text-blue-300'>
                          Infrastructure Update
                        </h3>
                        <h4 className='text-xs font-semibold text-slate-300 mt-1'>
                          API Gateway Integration In Progress
                        </h4>
                        <p className='text- text-slate-400 mt-1 leading-relaxed'>
                          We are actively implementing a unified API Gateway
                          layer to streamline cross-service communication, load
                          balancing, and rate limiting across all downstream
                          microservices.
                        </p>
                        <span className='inline-block mt-2 text- font-mono bg-blue-900/40 border border-blue-800/60 px-2 py-0.5 rounded text-blue-300'>
                          Status: Deploying
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className='space-y-6'>
                    <div>
                      <h2 className='text-xs font-bold font-mono uppercase tracking-wider text-slate-500 mb-3'>
                        Layer 01 — Control Plane (Core APIs)
                      </h2>
                      {renderPipelineGrid(kanbanData.controlPlane)}
                    </div>

                    <div>
                      <h2 className='text-xs font-bold font-mono uppercase tracking-wider text-slate-500 mb-3'>
                        Layer 02 — Edge Layer (User Interfaces)
                      </h2>
                      {renderPipelineGrid(kanbanData.edgeLayer)}
                    </div>
                  </div>
                </div>
              ) : (
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className='text-2xl font-bold text-slate-100 mb-4'>
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className='text-xl font-semibold text-slate-200 mt-6 mb-3'>
                        {children}
                      </h2>
                    ),
                    p: ({ children }) => (
                      <p className='text-sm text-slate-300 leading-relaxed mb-4'>
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className='list-disc list-inside text-sm text-slate-300 space-y-1 mb-4'>
                        {children}
                      </ul>
                    ),
                    li: ({ children }) => <li>{children}</li>,
                    code: ({ children }) => (
                      <code className='bg-slate-900 text-red-400 text-xs font-mono px-1.5 py-0.5 rounded border border-slate-800'>
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre className='bg-slate-900 border border-slate-800 p-4 rounded-lg overflow-x-auto text-xs mb-4'>
                        {children}
                      </pre>
                    ),
                  }}
                >
                  {markdownContent}
                </ReactMarkdown>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
