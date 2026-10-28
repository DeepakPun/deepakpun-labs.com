import Link from "next/link"

export default function Footer() {
  return (
    <footer className="mt-auto sticky top- border-t border-slate-900 bg-slate-950 py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-slate-500">
        <div className="flex flex-col gap-1 text-center md:text-left">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} deepakpun-labs.com. All variants
            reserved.
          </p>
          <p className="text- text-slate-600 tracking-wide">
            Prime Variant Admin Profile Mode
          </p>
        </div>

        <div className="flex items-center space-x-4 text- font-medium">
          <Link
            href="/health"
            className="hover:text-slate-300 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Health
          </Link>
          <span className="text-slate-800">|</span>
          <Link
            href="/api/v1/theories"
            className="hover:text-slate-300 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Core REST Nodes
          </Link>
          <span className="text-slate-800">|</span>
          <p className="tracking-widest uppercase text- text-slate-600 font-bold">
            MERN + Docker
          </p>
        </div>
      </div>
    </footer>
  )
}
