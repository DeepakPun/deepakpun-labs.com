import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { motion, AnimatePresence } from 'framer-motion'

const docFiles = {
  architecture: `# System Architecture Matrix

Welcome to the internal engineering logs for \`deepakpun-labs.com\`. This entire blueprint is containerized and managed via microservices.

## Microservices Blueprint
- \`client\` (Port 3000): Next.js/Tailwind MCU Theory Vault
- \`core-api\` (Port 3001): Node.js/Express Database Controller
- \`docs\` (Port 3002): Pure React + Vite System Docs

## Local Cold Boot Command
To spin up the ecosystem locally with volumes active, use the script wrapper:
\`\`\`bash
./run.sh dev
\`\`\``,

  deployment: `# CI/CD Deployment Strategy

Every time a push event hits the main repository branch, automated workflows trigger a multi-stage compilation pipeline.

## Multi-Cloud Strategy
1. **Sandbox Phase:** Multi-tier infrastructure deployment on AWS via automated pipelines.
2. **Teardown Phase:** Programmatic cleanup to eliminate continuous AWS runtime costs.
3. **Production Phase:** Permanent container orchestration on a DigitalOcean Droplet.`,
}

type DocKey = keyof typeof docFiles

export default function App() {
  const [activeDoc, setActiveDoc] = useState<DocKey>('architecture')

  return (
    <div className='h-screen flex flex-col font-sans select-none bg-slate-950 text-slate-100'>
      <header className='h-16 border-b border-slate-900 bg-slate-900/40 flex items-center px-6 justify-between'>
        <div className='flex items-center space-x-3'>
          <span className='bg-red-600 text-white font-black px-2 py-0.5 text-xs uppercase rounded'>
            Docs
          </span>
          <span className='font-bold text-slate-200'>
            Engineering Workspace
          </span>
        </div>
      </header>

      <div className='flex flex-1 overflow-hidden'>
        <aside className='w-64 border-r border-slate-900 bg-slate-900/10 p-6 space-y-4'>
          <div className='text-[10px] font-bold tracking-widest text-slate-500 uppercase'>
            Blueprints
          </div>
          <nav className='flex flex-col space-y-1'>
            <button
              onClick={() => setActiveDoc('architecture')}
              className={`text-left text-sm px-3 py-2 rounded-lg font-medium transition-colors ${activeDoc === 'architecture' ? 'bg-red-950/40 text-red-400 border border-red-900/30' : 'text-slate-400 hover:text-slate-200'}`}
            >
              📐 System Architecture
            </button>
            <button
              onClick={() => setActiveDoc('deployment')}
              className={`text-left text-sm px-3 py-2 rounded-lg font-medium transition-colors ${activeDoc === 'deployment' ? 'bg-red-950/40 text-red-400 border border-red-900/30' : 'text-slate-400 hover:text-slate-200'}`}
            >
              🚀 CI/CD Pipelines
            </button>
          </nav>
        </aside>

        <main className='flex-1 p-12 overflow-y-auto max-w-4xl mx-auto w-full selection:bg-red-600 selection:text-white'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeDoc}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <ReactMarkdown
                children={docFiles[activeDoc]}
                components={{
                  h1: ({ children }) => (
                    <h1 className='text-3xl font-black text-white mb-6 uppercase border-b border-slate-900 pb-3 tracking-tight'>
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className='text-xl font-bold text-red-500 mt-8 mb-3 uppercase tracking-wide'>
                      {children}
                    </h2>
                  ),
                  p: ({ children }) => (
                    <p className='text-slate-300 leading-relaxed mb-4 text-sm md:text-base font-normal'>
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className='list-disc pl-5 space-y-2 mb-4 text-slate-300 text-sm'>
                      {children}
                    </ul>
                  ),
                  code: ({ children }) => (
                    <code className='bg-slate-900 text-red-400 px-1.5 py-0.5 rounded font-mono text-xs border border-slate-800/80'>
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className='bg-slate-900 border border-slate-900 rounded-xl p-4 my-4 overflow-x-auto font-mono text-xs text-slate-300 leading-relaxed'>
                      {children}
                    </pre>
                  ),
                }}
              />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
