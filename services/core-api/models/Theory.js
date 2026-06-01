import mongoose from 'mongoose'

const TheorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  targetMovie: { type: String, required: true }, // e.g., "Avengers: Doomsday"
  relatedPastMovies: [{ type: String }],         // e.g., ["Fantastic Four", "Secret Wars"]
  content: { type: String, required: true },     // Your deep-dive thoughts
  predictionConfidence: { type: Number, min: 1, max: 10 },
  createdAt: { type: Date, default: Date.now }
});

const Theory = mongoose.model('Theory', TheorySchema);
export default Theory;
