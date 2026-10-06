import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import serviceRoutes from './routes/services.js'
import galleryRoutes from './routes/gallery.js'
import reviewRoutes from './routes/reviews.js'
import appointmentRoutes from './routes/appointments.js'
import uploadRoutes from './routes/uploads.js'

const { MONGODB_URI, JWT_SECRET, PORT = 5000, CLIENT_URL = 'http://localhost:5173', NODE_ENV } = process.env
if (!MONGODB_URI || !JWT_SECRET) {
  console.error('Missing MONGODB_URI or JWT_SECRET. Copy .env.example to .env and fill it in.')
  process.exit(1)
}

const app = express()
if (NODE_ENV === 'production') app.set('trust proxy', 1) // correct client IPs behind Render/Railway etc.

const limiter = (windowMs, max, message) =>
  rateLimit({ windowMs, max, standardHeaders: true, legacyHeaders: false, message: { message } })

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
app.use(cors({ origin: CLIENT_URL.split(',') }))
app.use(express.json({ limit: '100kb' }))

app.use('/api', limiter(15 * 60 * 1000, 600, 'Too many requests. Please slow down.'))
app.use('/api/auth/login', limiter(15 * 60 * 1000, 10, 'Too many login attempts. Try again in 15 minutes.'))
app.post('/api/appointments', limiter(60 * 60 * 1000, 8, 'Too many booking requests. Please call us to book.'))

app.get('/api/health', (req, res) => res.json({ ok: true }))
app.use('/api/auth', authRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/uploads', uploadRoutes)

app.use((req, res) => res.status(404).json({ message: 'Not found' }))
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'MulterError') err.status = 400
  if (err.name === 'CastError') { err.status = 400; err.message = 'Invalid id' }
  if (!err.status) console.error(err)
  res.status(err.status || 500).json({ message: err.status ? err.message : 'Server error' })
})

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message)
    process.exit(1)
  })
