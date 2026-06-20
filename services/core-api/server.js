import dotenvx from '@dotenvx/dotenvx'
dotenvx.config({ path: '.env' })
import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import YAML from 'yaml'
import theoryRoutes from './routes/theoryRoutes.js'
import { connectDB } from './dbcon/db.js'
import { globalErrorHandler } from './middleware/errorMiddleware.js'

const app = express()

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json())

// --- Swagger ---
const customOptions = {
  customSiteTitle: 'MCU Multiverse Labs - API Registry Hub',
}
app.use('/api-docs', swaggerUi.serve, (req, res, next) => {
  try {
    const file = fs.readFileSync('./swagger.yaml', 'utf8')
    const swaggerDocument = YAML.parse(file)
    swaggerUi.setup(swaggerDocument, customOptions)(req, res, next)
  } catch (error) {
    console.error('Error loading Swagger document:', error)
    res.status(500).json({
      success: false,
      errors: ['Failed to load API documentation. Please try again later.'],
      message: 'Internal Server Error',
    })
  }
})

// --- Root welcome ---
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    errors: null,
    message: 'Welcome to the Marvel Theory API!',
  })
})

// === NEW: API discovery endpoints ===
// 1. /api lobby
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    name: 'Marvel Theory API',
    versions: ['v1'],
    docs: '/api-docs',
  })
})

// 2. /api/v1 landing
app.get('/api/v1', (req, res) => {
  res.status(200).json({
    success: true,
    version: 'v1',
    resources: ['/theories'],
    status: 'stable',
  })
})

// === Existing v1 resource ===
app.use('/api/v1/theories', theoryRoutes)

// === NEW: catch-alls for unknown API paths ===
// Must come AFTER real routes, BEFORE global error handler

// anything under /api/v1 that isn't matched
app.all('/api/v1/*path', (req, res) => {
  res.status(404).json({
    success: false,
    errors: [`Resource '${req.originalUrl}' not found in API v1`],
    message: 'Not Found',
    code: 'resource_not_found',
    documentation_url: '/api-docs',
  })
})

// anything under /api that isn't v1
app.all('/api/*path', (req, res) => {
  res.status(404).json({
    success: false,
    errors: [`API path '${req.originalUrl}' does not exist`],
    message: 'Not Found',
    code: 'version_or_resource_not_found',
    documentation_url: '/api-docs',
  })
})

app.all('*path', (req, res) => {
  res.status(404).json({
    success: false,
    errors: [`Route '${req.originalUrl}' not found`],
    message: 'Not Found',
    code: 'route_not_found',
  })
})

// --- Global error handler last ---
app.use(globalErrorHandler)

const startServer = async () => {
  try {
    await connectDB()
    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
      console.log(`⚡ API Service online and listening on port ${PORT}`)
    })
  } catch (error) {
    console.error('❌ Critical system failure during boot sequence:', error)
    process.exit(1)
  }
}

startServer()
