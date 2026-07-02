"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function NewTheoryPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pastMovieInput, setPastMovieInput] = useState("")
  const [errors, setErrors] = useState<string[]>([])
  const [userApiKey, setUserApiKey] = useState(
    process.env.NEXT_PUBLIC_THEORIES_API_KEY || "",
  )
  const [formData, setFormData] = useState({
    title: "",
    targetMovie: "",
    content: "",
    relatedPastMovies: [] as string[],
    predictionConfidence: 5,
  })

  const validateForm = () => {
    const newErrors: string[] = []
    if (!formData.title.trim()) {
      newErrors.push("Theory title is required")
    } else if (formData.title.trim().length < 3) {
      newErrors.push("Title must be at least 3 characters")
    }
    if (!formData.targetMovie.trim()) {
      newErrors.push("Target movie/show is required")
    }
    if (!formData.content.trim()) {
      newErrors.push("Evidence/content is required")
    } else if (formData.content.trim().length < 20) {
      newErrors.push("Content must be at least 20 characters")
    }
    if (!userApiKey.trim()) {
      newErrors.push("Sandbox API key is required")
    }
    setErrors(newErrors)
    return newErrors.length === 0
  }

  const addPastMovie = () => {
    if (!pastMovieInput.trim()) return
    setFormData({
      ...formData,
      relatedPastMovies: [...formData.relatedPastMovies, pastMovieInput.trim()],
    })
    setPastMovieInput("")
  }

  const removePastMovie = (indexToRemove: number) => {
    setFormData({
      ...formData,
      relatedPastMovies: formData.relatedPastMovies.filter(
        (_, i) => i !== indexToRemove,
      ),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors([])

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    const baseUrl = process.env.NEXT_PUBLIC_API_URL
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1`
      : "http://localhost:3001/api/v1"

    try {
      const response = await fetch(`${baseUrl}/theories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": userApiKey.trim(),
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        let message = "Something went wrong. Please try again."
        try {
          const errorData = await response.json()
          message = errorData.error || errorData.message || message
          console.error("Backend error:", errorData)
        } catch {
          const errorText = await response.text()
          console.error("Backend payload error:", errorText)
          message = errorText || message
        }

        if (response.status === 400) {
          message = message || "Invalid input. Check all fields and try again."
        } else if (response.status === 401) {
          message =
            "Invalid API key. Paste the sample key from the sandbox banner."
        } else if (response.status === 409) {
          message = message || "A theory with this title already exists."
        } else if (response.status >= 500) {
          message =
            "Server error. The timeline servers are down. Try again in a moment."
        }

        setErrors((prev) => [...prev, message])
        setIsSubmitting(false)
        return
      }

      router.push("/theories")
      router.refresh()
    } catch (error: unknown) {
      console.error("Network error:", error)
      setErrors((prev) => [
        ...prev,
        "Network error. Check your connection and try again.",
      ])
      setIsSubmitting(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 selection:bg-red-600 selection:text-white">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-xl p-6 md:p-8 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-red-500">
              Submit New Theory
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">
              Sandbox Testing Node
            </p>
          </div>
          <Link
            href="/theories"
            className="text-sm text-slate-400 hover:text-slate-200 transition"
          >
            Back
          </Link>
        </div>

        {/* Sandbox Public Notice Banner */}
        <div className="bg-amber-950/20 border border-amber-900/40 rounded-xl p-4 mb-6 text-xs font-mono text-amber-400 space-y-2 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-black tracking-wider uppercase text-amber-500">
              🔒 Sandbox Gateway Alert
            </span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            This endpoint requires authentication. Use the credential published
            on your Swagger UI docs to bypass the firewall rules:
          </p>
          <div className="flex items-center gap-2 pt-1">
            <code className="bg-slate-950 px-3 py-1.5 rounded text-slate-100 select-all border border-slate-800 font-bold block">
              {process.env.NEXT_PUBLIC_THEORIES_API_KEY ||
                "your-sample-swagger-key"}
            </code>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {errors.length > 0 && (
            <div className="bg-red-950/30 border border-red-900/40 rounded-lg p-3 mb-4 text-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span className="font-bold text-red-400 uppercase tracking-wider text-xs">
                  Validation Failed
                </span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-red-400">
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* API Key Input */}
          <div>
            <label className="block text-xs uppercase font-semibold text-slate-400 mb-1.5 tracking-wider">
              x-api-key Gateway Credential
            </label>
            <input
              type="text"
              disabled={isSubmitting}
              placeholder="Paste sample api key here..."
              value={userApiKey}
              onChange={(e) => setUserApiKey(e.target.value)}
              className="w-full bg-slate-950 border border-amber-900/30 rounded-lg px-3 py-2 text-sm text-amber-400 font-mono focus:outline-none focus:border-amber-500 disabled:opacity-50 tracking-wide"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs uppercase font-semibold text-slate-400 mb-1.5 tracking-wider">
              Theory Title
            </label>
            <input
              type="text"
              disabled={isSubmitting}
              placeholder="e.g., Secret Wars timeline collision details"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-red-600 disabled:opacity-50"
            />
          </div>

          {/* Target Movie */}
          <div>
            <label className="block text-xs uppercase font-semibold text-slate-400 mb-1.5 tracking-wider">
              Target Movie / Show
            </label>
            <input
              type="text"
              disabled={isSubmitting}
              placeholder="e.g., Avengers: Secret Wars"
              value={formData.targetMovie}
              onChange={(e) =>
                setFormData({ ...formData, targetMovie: e.target.value })
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-red-600 disabled:opacity-50"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs uppercase font-semibold text-slate-400 mb-1.5 tracking-wider">
              The Evidence / Content
            </label>
            <textarea
              rows={4}
              disabled={isSubmitting}
              placeholder="Break down your theory..."
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-red-600 resize-none disabled:opacity-50"
            />
          </div>

          {/* Related Past Movies */}
          <div>
            <label className="block text-xs uppercase font-semibold text-slate-400 mb-1.5 tracking-wider">
              Related Past Movies
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                disabled={isSubmitting}
                placeholder="Type movie name and press Add"
                value={pastMovieInput}
                onChange={(e) => setPastMovieInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addPastMovie())
                }
                className="grow bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-slate-100 focus:outline-none focus:border-red-600 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={addPastMovie}
                disabled={isSubmitting}
                className="bg-slate-800 hover:bg-slate-700 text-xs px-4 rounded-lg transition disabled:opacity-50"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {formData.relatedPastMovies.map((movie, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 bg-slate-950 text-slate-300 border border-slate-800 text-xs px-2.5 py-1 rounded-full"
                >
                  {movie}
                  <button
                    type="button"
                    onClick={() => removePastMovie(idx)}
                    className="text-red-500 hover:text-red-400 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Prediction Confidence */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
                Prediction Confidence
              </label>
              <span className="text-sm font-bold text-red-500">
                {formData.predictionConfidence} / 10
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              disabled={isSubmitting}
              value={formData.predictionConfidence}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  predictionConfidence: parseInt(e.target.value),
                })
              }
              className="w-full accent-red-600 cursor-pointer disabled:opacity-50"
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <Link
              href="/theories"
              className="w-1/3 bg-transparent hover:bg-slate-800 border border-slate-800 text-slate-300 font-medium py-2 rounded-lg text-sm text-center transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-2/3 font-medium py-2 rounded-lg text-sm transition ${
                isSubmitting
                  ? "bg-red-800 cursor-wait"
                  : "bg-red-600 hover:bg-red-700"
              } text-white`}
            >
              {isSubmitting ? "Checking timeline..." : "Post Theory"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
