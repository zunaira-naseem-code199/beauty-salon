import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 60 },
    event: { type: String, trim: true, maxlength: 60, default: '' },
    text: { type: String, required: true, trim: true, maxlength: 400 },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.model('Review', reviewSchema)
