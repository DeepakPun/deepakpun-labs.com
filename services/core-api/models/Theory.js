import mongoose from "mongoose"

// 1. Remove the old TTL constant and replace it with Capped constraints
// 1048576 bytes = 1MB (MongoDB requires a size limit for capped collections)
export const MAX_COLLECTION_SIZE_BYTES = 1048576
export const MAX_DOCUMENTS_LIMIT = 24

const TheorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Theory title is required"],
    },
    targetMovie: {
      type: String,
      required: [true, "MCU movie project name is required"],
    },
    content: {
      type: String,
      required: [true, "Theory description records are required"],
    },
    relatedPastMovies: [{ type: String }],
    predictionConfidence: {
      type: Number,
      min: [1, "Confidence index must be at least 1"],
      max: [10, "Confidence index cannot exceed 10"],
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

const Theory = mongoose.model("Theory", TheorySchema)
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

// Cursor based implementation
// const getAllTheoriesCursor = async (req, res) => {
//   try {
//     const limit = parseInt(req.query.limit) || 3
//     const { nextCursor } = req.query // The _id of the last item from the FE

//     // If a cursor is provided, only fetch items older (less than) that ID
//     const query = nextCursor ? { _id: { $lt: nextCursor } } : {}

//     // Fetch one extra item (limit + 1) to determine if there is a next page
//     const theories = await Theory.find(query)
//       .sort({ _id: -1 })
//       .limit(limit + 1)

//     // Check if there are more items beyond this batch
//     const hasNextPage = theories.length > limit

//     // If there is a next page, remove the extra item we fetched for checking
//     if (hasNextPage) {
//       theories.pop()
//     }

//     // The new cursor is the ID of the last item in our filtered array
//     const newCursor = hasNextPage ? theories[theories.length - 1]._id : null

//     return res.status(200).json({
//       success: true,
//       theories,
//       pagination: {
//         nextCursor: newCursor,
//         hasNextPage,
//       },
//     })
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to retrieve theories.",
//       error: error.message,
//     })
//   }
// }

// Frontend
// import { useState, useEffect } from 'react';

// export default function TheoriesList() {
//   const [theories, setTheories] = useState([]);
//   const [nextCursor, setNextCursor] = useState(null);
//   const [hasNextPage, setHasNextPage] = useState(true);
//   const [loading, setLoading] = useState(false);

//   const fetchTheories = async (cursor = null) => {
//     setLoading(true);
//     try {
//       // Construct URL appending the cursor if it exists
//       let url = `/api/theories?limit=3`;
//       if (cursor) url += `&nextCursor=${cursor}`;

//       const res = await fetch(url);
//       const data = await res.json();

//       if (data.success) {
//         // APPEND new theories to the existing ones instead of replacing them
//         setTheories((prev) => [...prev, ...data.theories]);
//         setNextCursor(data.pagination.nextCursor);
//         setHasNextPage(data.pagination.hasNextPage);
//       }
//     } catch (error) {
//       console.error("Error fetching theories:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initial fetch on component mount
//   useEffect(() => {
//     fetchTheories();
//   }, []);

//   return (
//     <div>
//       <div className="theories-grid">
//         {theories.map((theory) => (
//           <div key={theory._id} className="theory-card">
//             <h3>{theory.title}</h3>
//             <p>{theory.description}</p>
//           </div>
//         ))}
//       </div>

//       {/* Show the button only if there is a next page to load */}
//       {hasNextPage && (
//         <button
//           onClick={() => fetchTheories(nextCursor)}
//           disabled={loading}
//           className="load-more-btn"
//         >
//           {loading ? 'Loading...' : 'Load More'}
//         </button>
//       )}
//     </div>
//   );
// }
