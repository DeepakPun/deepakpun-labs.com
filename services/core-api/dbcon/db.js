import mongoose from 'mongoose'
import fs from 'fs'

export const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...')

    const isDocker = fs.existsSync('/.dockerenv')
    let dbUri = process.env.MONGO_URI

    if (isDocker) {
      console.log('🐳 Docker container detected.')
      dbUri =
        dbUri ||
        'mongodb://mcu_admin:multiverse_secure_pass_2026@mongo:27017/mcu_labs?authSource=admin'
    } else {
      dbUri = dbUri || 'mongodb://127.0.0.1:27017/mcu_labs'
      console.log(
        '💻 Local machine runtime detected. Routing network to 127.0.0.1 loopback.',
      )
    }

    console.log(`Connection target resolved to: ${dbUri}`)

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
