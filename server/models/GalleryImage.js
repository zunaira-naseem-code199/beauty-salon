import mongoose from 'mongoose'

const gallerySchema = new mongoose.Schema(
  {
    url: { type: String, required: true, trim: true },
    caption: { type: String, trim: true, maxlength: 120, default: '' },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.model('GalleryImage', gallerySchema)
