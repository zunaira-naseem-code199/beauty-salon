import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    description: { type: String, trim: true, maxlength: 300, default: '' },
    price: { type: Number, required: true, min: 0 }, // PKR, shown as "From Rs X"
    icon: { type: String, default: 'Sparkles' }, // Scissors | Crown | Sparkles | Droplets | Flower2 | Palette
    image: { type: String, default: '' },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.model('Service', serviceSchema)
