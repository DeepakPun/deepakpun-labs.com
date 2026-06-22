import mongoose from 'mongoose'

// 1. Remove the old TTL constant and replace it with Capped constraints
// 1048576 bytes = 1MB (MongoDB requires a size limit for capped collections)
export const MAX_COLLECTION_SIZE_BYTES = 1048576
export const MAX_DOCUMENTS_LIMIT = 24

const TheorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Theory title is required'],
    },
    targetMovie: {
      type: String,
      required: [true, 'MCU movie project name is required'],
    },
    content: {
      type: String,
      required: [true, 'Theory description records are required'],
    },
    relatedPastMovies: [{ type: String }],
    predictionConfidence: {
      type: Number,
      min: [1, 'Confidence index must be at least 1'],
      max: [10, 'Confidence index cannot exceed 10'],
      default: 5,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    // 2. Pass the capped configuration directly into the Schema options
    capped: {
      size: MAX_COLLECTION_SIZE_BYTES,
      max: MAX_DOCUMENTS_LIMIT,
    },
  },
)

const Theory = mongoose.model('Theory', TheorySchema)
export default Theory

// import mongoose from 'mongoose'

// // 1. Define the expiration time in seconds (as a shared constant)
// export const THEORY_EXPIRATION_SECONDS = 24 * 60 * 60

// const TheorySchema = new mongoose.Schema(
//   {
//     title: { type: String, required: [true, 'Theory title is required'] },
//     targetMovie: {
//       type: String,
//       required: [true, 'MCU movie project name is required'],
//     },
//     content: {
//       type: String,
//       required: [true, 'Theory description records are required'],
//     },
//     relatedPastMovies: [{ type: String }],
//     predictionConfidence: {
//       type: Number,
//       min: [1, 'Confidence index must be at least 1'],
//       max: [10, 'Confidence index cannot exceed 10'],
//       default: 5,
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
//   },
// )

// // 2. Use the shared constant here for MongoDB
// TheorySchema.index(
//   { createdAt: 1 },
//   {
//     expireAfterSeconds: THEORY_EXPIRATION_SECONDS,
//     name: 'theories_ttl_24h',
//     background: true,
//   },
// )

// const Theory = mongoose.model('Theory', TheorySchema)
// export default Theory
