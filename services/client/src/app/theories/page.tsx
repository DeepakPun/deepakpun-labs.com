export const dynamic = 'force-dynamic'
import TheoriesList from '@/components/TheoriesList'

export default function TheoriesPage() {
  return (
    <div className='min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-red-600 selection:text-white'>
      <TheoriesList />
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
