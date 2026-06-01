import dotenvx from '@dotenvx/dotenvx'
dotenvx.config({ path: '.env' })
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import Theory from './models/Theory.js'

const app = express()
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use(express.json())

app.post('/api/theories/seed', async (req, res) => {
  const sampleTheory = {
    title: "Robert Downey Jr.'s Doctor Doom is a Stark Variant",
    targetMovie: 'Avengers: Doomsday',
    relatedPastMovies: ['Avengers: Endgame', 'The Fantastic Four: First Steps'],
    content:
      'My prediction is that Victor von Doom in Doomsday is not Victor from the main timeline. He is a Tony Stark variant from a dying universe who conquered his world to save it, eventually crossing paths with the Fantastic Four.',
    predictionConfidence: 8,
  }

  await Theory.deleteMany({})
  const saved = await Theory.create(sampleTheory)
  res.json(saved)
})

app.get('/api/theories', async (req, res) => {
  const theories = await Theory.find().sort({ createdAt: -1 })
  res.json(theories)
})

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`Backend live on port ${process.env.PORT}`),
  )
})
