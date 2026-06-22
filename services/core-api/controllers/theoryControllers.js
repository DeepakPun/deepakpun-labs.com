import Theory from '../models/Theory.js'
import { catchAsync } from '../middleware/catchAsync.js'
import ErrorHandler from '../utils/ErrorHandler.js'

// @desc Get all theories from the database
// @route GET /api/v1/theories
// @access Public
const getAllTheories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const [theories, totalItems] = await Promise.all([
      Theory.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Theory.countDocuments(),
    ])

    const TTL_MS = THEORY_EXPIRATION_SECONDS * 1000
    const now = Date.now()

    const detailedTheories = theories.map(theory => {
      const ageMs = now - new Date(theory.createdAt).getTime()
      const msLeft = Math.max(0, TTL_MS - ageMs)

      return {
        ...theory.toObject(),
        msLeft: msLeft,
      }
    })

    const totalPages = Math.ceil(totalItems / limit)

    return res.status(200).json({
      success: true,
      statusCode: res.statusCode,
      message: 'Theories retrieved successfully.',
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      theories: detailedTheories,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Failed to retrieve theories.',
      error: error.message,
    })
  }
}

// @desc Fetch a single theory document by its unique ID
// @route GET /api/v1/theories/:theoryId
// @access Public
const getSingleTheoryById = catchAsync(async (req, res, next) => {
  const theory = await Theory.findById(req.params.theoryId)
  console.log(req.params.theoryId)

  if (!theory) {
    return next(
      new ErrorHandler(
        'No intelligence log found matching that registry coordinate.',
        404,
      ),
    )
  }

  return res.status(200).json({
    success: true,
    statusCode: 200,
    theory,
  })
})

// @desc Create a new theory entry in the database
// @route POST /api/v1/theories
// @access Private (API key required)
const createTheory = async (req, res) => {
  try {
    const {
      title,
      targetMovie,
      content,
      predictionConfidence,
      relatedPastMovies,
    } = req.body || {}

    // 1. Check if a theory with the exact same title already exists
    const existingTheory = await Theory.findOne({ title })
    if (existingTheory) {
      return res.status(409).json({
        success: false,
        statusCode: 409,
        error: `A theory with the title "${title}" already exists.`,
      })
    }

    // 2. Create the new theory if no duplicate was found
    const newTheory = await Theory.create({
      title,
      targetMovie,
      content,
      predictionConfidence,
      relatedPastMovies: relatedPastMovies || [],
    })

    return res
      .status(201)
      .json({ success: true, statusCode: 201, theory: newTheory })
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, statusCode: 400, error: error.message })
  }
}

// @desc Update an existing theory entry in the database
// @route PUT /api/v1/theories/:theoryId
// @access Private (API key required)
const updateTheory = async (req, res) => {
  try {
    const { theoryId } = req.params
    const updatedTheory = await Theory.findByIdAndUpdate(theoryId, req.body, {
      new: true,
      runValidators: true,
    })

    if (!updatedTheory) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Theory document not found.',
      })
    }

    return res
      .status(200)
      .json({ success: true, statusCode: 200, theory: updatedTheory })
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, statusCode: 400, error: error.message })
  }
}

// @desc Delete a theory entry from the database
// @route DELETE /api/v1/theories/:theoryId
// @access Private (API key required)
const deleteTheory = async (req, res) => {
  try {
    const { theoryId } = req.params
    const deletedTheory = await Theory.findByIdAndDelete(theoryId)

    if (!deletedTheory) {
      return res.status(404).json({
        theory_id: theoryId,
        success: false,
        statusCode: 404,
        message: 'Theory document not found.',
      })
    }

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Theory pruned successfully.',
    })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, statusCode: 500, error: error.message })
  }
}

export {
  getAllTheories,
  getSingleTheoryById,
  createTheory,
  updateTheory,
  deleteTheory,
}
