import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, default: '' },
    service: { type: String, required: true, trim: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    time: { type: String, required: true }, // HH:MM
    notes: { type: String, trim: true, maxlength: 500, default: '' },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
    slotTaken: { type: Boolean, default: true }, // false once cancelled, frees the slot
  },
  { timestamps: true }
)

// Database-level guard against double booking (one booking per date+time while active)
appointmentSchema.index({ date: 1, time: 1 }, { unique: true, partialFilterExpression: { slotTaken: true } })

export default mongoose.model('Appointment', appointmentSchema)
