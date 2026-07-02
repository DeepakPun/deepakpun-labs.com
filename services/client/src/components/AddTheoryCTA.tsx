import Link from "next/link"

export default function AddTheoryCTA() {
  return (
    <Link
      href="/theories/new"
      className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg text-sm shrink-0 transition"
    >
      Share Theory
    </Link>
  )
}
