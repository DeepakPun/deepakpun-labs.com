import app from "./app.js"
import { connectDB } from "./dbcon/db.js"

const startServer = async () => {
  try {
    await connectDB()
    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
      console.log(`⚡ API Service online and listening on port ${PORT}`)
    })
  } catch (error) {
    console.error("❌ Critical system failure during boot sequence:", error)
    process.exit(1)
  }
}

startServer()
