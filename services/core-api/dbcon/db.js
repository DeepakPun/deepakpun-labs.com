import mongoose from "mongoose"
import fs from "fs"

export const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...")

    const isDocker = fs.existsSync("/.dockerenv")
    let dbUri = process.env.MONGO_URI

    // console.log(`*********************************`)
    // console.log(`Database uri is: ${dbUri}`)
    // console.log(`*********************************`)

    if (!dbUri) {
      // Fallback fallback if no variable is loaded anywhere
      const host = isDocker ? "mongo" : "127.0.0.1"
      dbUri = `mongodb://mcu_admin:multiverse_secure_pass_2026@${host}:27017/mcu_labs?authSource=admin`
    } else {
      // DYNAMIC FIX: If MONGO_URI is loaded but you are running locally,
      // swap out '@mongo:' with '@127.0.0.1:' so local scripts can connect.
      if (!isDocker && dbUri.includes("@mongo:")) {
        console.log(
          "🔄 Swapping Docker container hostname for local loopback address...",
        )
        dbUri = dbUri.replace("@mongo:", "@127.0.0.1:")
      }
    }

    console.log(`🐳 Docker container status: ${isDocker}`)
    console.log(`Connection target resolved to: ${dbUri}`)

    const conn = await mongoose.connect(dbUri)

    if (conn.connection.readyState === 1) {
      console.log("📦 MongoDB connected successfully to core datastore")
      return conn
    }
  } catch (error) {
    console.error("MongoDB connection network error:", error)
    process.exit(1)
  }
}
