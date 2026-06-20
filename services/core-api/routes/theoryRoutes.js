import express from 'express'
import {
  createTheory,
  getAllTheories,
  getSingleTheoryById,
  updateTheory,
  deleteTheory,
} from '../controllers/theoryControllers.js'
import { protectRoute } from '../middleware/authMiddleware.js'
import { checkProfanity } from '../middleware/profanityMiddleware.js'

const router = express.Router()

router
  .route('/')
  .get(getAllTheories)
  .post(
    protectRoute,
    checkProfanity(['title', 'content', 'relatedPastMovies']),
    createTheory,
  )
router
  .route('/:theoryId')
  .get(getSingleTheoryById)
  .put(protectRoute, updateTheory)
  .delete(protectRoute, deleteTheory)

export default router
