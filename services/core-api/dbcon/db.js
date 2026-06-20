import mongoose from 'mongoose'
import fs from 'fs'

export const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...')

    // 1. Check if the code is executing inside a Docker container
    const isDocker = fs.existsSync('/.dockerenv')

    // 2. Automatically assign the perfect connection target host
    let dbUri = process.env.MONGO_URI

    if (isDocker) {
      // Inside Docker, force it to use the container network name 'mongo'
      dbUri = 'mongodb://mongo:27017/mcu_labs'
      console.log(
        '🐳 Docker container detected. Routing network to internal mongo service.',
      )
    } else {
      // Outside Docker (Local terminal), look at your computer's native interface
      dbUri = dbUri || 'mongodb://127.0.0.1:27017/mcu_labs'
      console.log(
        '💻 Local machine runtime detected. Routing network to 127.0.0.1 loopback.',
      )
    }

    console.log(`Connection target resolved to: ${dbUri}`)

    // 3. Connect to the resolved target string
    const conn = await mongoose.connect(dbUri)

    if (conn.connection.readyState === 1) {
      console.log('📦 MongoDB connected successfully to core datastore')
      return conn
    }
  } catch (error) {
    console.error('MongoDB connection network error:', error)
    process.exit(1)
  }
}
