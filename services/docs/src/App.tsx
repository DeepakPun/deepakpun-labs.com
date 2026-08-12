import { useState } from "react"
import ReactMarkdown from "react-markdown"
import { motion, AnimatePresence } from "framer-motion"
import rawKanbanData from "./constants/kanbanData.json" with { type: "json" }

import architectureMd from "./docs/architecture.md?raw"
import blogBuildingMd from "./docs/building-event-driven-backends.md?raw"
import blogEdgeMd from "./docs/nextjs-edge-caching-strategies.md?raw"

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
interface BlogPostIndex {
  slug: string
  title: string
  date: string
  excerpt: string
}

const BLOG_POSTS_REGISTRY: BlogPostIndex[] = [
  {
    slug: "building-event-driven-backends",
    title: "Designing Event-Driven Microservices",
    date: "July 24, 2026",
    excerpt:
      "Deep dive into decoupled message patterns with Node.js and MongoDB Change Streams.",
  },
  {
    slug: "nextjs-edge-caching-strategies",
    title: "Edge Caching in Next.js Frontends",
    date: "July 18, 2026",
    excerpt:
      "How to cut down downstream backend API latency down to sub-10ms ranges globally.",
  },
]

const BLOG_CONTENT_MAP: Record<string, string> = {
  "building-event-driven-backends": blogBuildingMd,
  "nextjs-edge-caching-strategies": blogEdgeMd,
}

export default function App() {
  const [viewMode, setViewMode] = useState<"hub" | "blog-post">("hub")
  const [activeBlogSlug, setActiveBlogSlug] = useState<string>("")

  const kanbanData = rawKanbanData as unknown as KanbanData
  const blogContent = activeBlogSlug ? BLOG_CONTENT_MAP[activeBlogSlug] : ""

  const stageColors = {
    queued: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      text: "text-amber-400",
      heading: "text-amber-500",
    },
    executing: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      text: "text-blue-400",
      heading: "text-blue-500",
    },
    stable: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      text: "text-emerald-400",
      heading: "text-emerald-500",
    },
  }

  const StageColumn = ({
    title,
    type,
    items,
  }: {
    title: string
    type: keyof typeof stageColors
    items: KanbanItem[]
  }) => {
    const colors = stageColors[type]
    return (
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <h3
            className={`font-semibold tracking-wide uppercase text-xs ${colors.heading}`}
          >
            {title}
          </h3>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} font-medium`}
          >
            {items.length}
          </span>
        </div>
        <div className="flex flex-col gap-3 max-h-96 overflow-y-auto pr-1">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              className={`p-3 rounded-lg border ${colors.bg} ${colors.border} flex flex-col gap-1.5`}
            >
              <div className="flex justify-between items-start gap-2">
                <h4 className="font-medium text-slate-200 text-xs leading-snug">
                  {item.title}
                </h4>
                <span
                  className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded font-mono ${colors.text} bg-slate-950/40 border ${colors.border}`}
                >
                  {item.service}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
          {items.length === 0 && (
            <div className="text-center py-6 text-xs text-slate-600 border border-dashed border-slate-800/60 rounded-lg">
              Empty pipeline stage
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderPipelineGrid = (stages: PipelineStages) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      <StageColumn title="Queued" type="queued" items={stages.queued} />
      <StageColumn
        title="Executing"
        type="executing"
        items={stages.executing}
      />
      <StageColumn title="Stable" type="stable" items={stages.stable} />
    </div>
  )

  const hubMd = {
    h1: ({ children }: any) => (
      <h1 className="text-xl font-bold text-slate-100 mb-3 border-b border-slate-900 pb-1">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-base font-semibold text-slate-200 mt-5 mb-2">
        {children}
      </h2>
    ),
    p: ({ children }: any) => (
      <p className="text-xs text-slate-400 leading-relaxed mb-3">{children}</p>
    ),
    ul: ({ children }: any) => (
      <ul className="list-disc list-inside text-xs text-slate-400 space-y-1 mb-3">
        {children}
      </ul>
    ),
    li: ({ children }: any) => (
      <li className="text-xs text-slate-400 leading-relaxed">{children}</li>
    ),
    code: ({ children }: any) => (
      <code className="bg-slate-900 text-red-400 text-[11px] font-mono px-1 py-0.5 rounded border border-slate-800">
        {children}
      </code>
    ),
    pre: ({ children }: any) => (
      <pre className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-lg overflow-x-auto text-[11px] font-mono text-slate-300 mb-3">
        {children}
      </pre>
    ),
  }

  const blogMd = {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold tracking-tight text-slate-100 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-xl font-semibold text-slate-100 mt-8 mb-3">
        {children}
      </h2>
    ),
    p: ({ children }: any) => (
      <p className="text-[15px] leading-7 text-slate-300 mb-4">{children}</p>
    ),
    ul: ({ children }: any) => (
      <ul className="list-disc list-inside text-[15px] text-slate-300 space-y-2 mb-4">
        {children}
      </ul>
    ),
    li: ({ children }: any) => <li className="text-slate-300">{children}</li>,
    code: ({ children }: any) => (
      <code className="bg-slate-900 text-amber-300 text-sm font-mono px-1.5 py-0.5 rounded">
        {children}
      </code>
    ),
    pre: ({ children }: any) => (
      <pre className="bg-slate-900 border border-slate-800 p-4 rounded-xl overflow-x-auto text-sm font-mono text-slate-200 mb-6">
        {children}
      </pre>
    ),
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-950 text-slate-100 selection:bg-red-600 selection:text-white">
      <header className="h-16 border-b border-slate-900 bg-slate-900/20 backdrop-blur-md flex items-center px-4 md:px-8 justify-between sticky top-0 z-50">
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => setViewMode("hub")}
        >
          <span className="bg-red-600 text-white font-black px-2 py-0.5 text-[10px] uppercase rounded tracking-wider">
            Core
          </span>
          <span className="font-bold text-slate-200 text-sm">
            Microservices Cluster Workspace
          </span>
        </div>
        {viewMode === "blog-post" && (
          <button
            onClick={() => setViewMode("hub")}
            className="text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-300 hover:text-white transition-colors"
          >
            ← Back to Dashboard
          </button>
        )}
      </header>

      <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
        <AnimatePresence mode="wait">
          {viewMode === "hub" ? (
            <motion.div
              key="hub-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
            >
              <div className="lg:col-span-2 space-y-8">
                <section className="bg-slate-900/20 border border-slate-900 p-6 rounded-2xl">
                  <ReactMarkdown components={hubMd}>
                    {architectureMd}
                  </ReactMarkdown>
                </section>
                <section className="space-y-6 pt-4 border-t border-slate-900">
                  <div>
                    <h2 className="text-sm font-bold text-slate-200">
                      Deployment Pipeline Matrix
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Active health status and components validation layer.
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-[10px] font-bold font-mono uppercase tracking-widest text-slate-500 mb-2">
                        Layer 01 — Control Plane
                      </h3>
                      {renderPipelineGrid(kanbanData.controlPlane)}
                    </div>
                    <div>
                      <h3 className="text-[10px] font-bold font-mono uppercase tracking-widest text-slate-500 mb-2">
                        Layer 02 — Edge Layer
                      </h3>
                      {renderPipelineGrid(kanbanData.edgeLayer)}
                    </div>
                  </div>
                </section>
              </div>

              <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 sticky top-24 space-y-4">
                <div>
                  <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-red-500">
                    Engineering Changelog
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Internal system development insights.
                  </p>
                </div>
                <div className="flex flex-col gap-3 pt-2">
                  {BLOG_POSTS_REGISTRY.map((post) => (
                    <div
                      key={post.slug}
                      onClick={() => {
                        setActiveBlogSlug(post.slug)
                        setViewMode("blog-post")
                      }}
                      className="p-3.5 bg-slate-950/60 border border-slate-800/80 hover:border-red-900/40 rounded-xl cursor-pointer transition-all group"
                    >
                      <h3 className="text-xs font-semibold text-slate-200 group-hover:text-red-400 transition-colors line-clamp-1">
                        {post.title}
                      </h3>
                      <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                        {post.date}
                      </span>
                      <p className="text-[11px] text-slate-400 leading-relaxed mt-2 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="blog-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-2xl mx-auto py-4"
            >
              <ReactMarkdown components={blogMd}>{blogContent}</ReactMarkdown>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
