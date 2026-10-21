export const dynamic = "force-dynamic"

import TheoriesList from "@/components/TheoriesList"

export default function TheoriesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-red-600 selection:text-white">
      <main className="flex-1 w-full px-6 md:px-12 py-6 md:py-12 flex flex-col">
        <TheoriesList />
      </main>
    </div>
  )
}

// my-cpp-webserver/
// ├── .github/workflows/ci.yml  # GitHub Actions for automated building/testing
// ├── src/                      # Source files (.cpp)
// ├── include/                  # Header files (.h)
// ├── tests/                    # Unit tests (using GoogleTest or Catch2)
// ├── Dockerfile                # Multi-stage production build
// ├── CMakeLists.txt            # Industry-standard C++ build configuration
// └── README.md                 # Your project's resume
