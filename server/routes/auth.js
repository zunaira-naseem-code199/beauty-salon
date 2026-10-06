import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'
import { requireAuth } from '../middleware/auth.js'
import { wrap, httpError } from '../utils.js'

const router = Router()

// POST /api/auth/login  { email, password } -> { token }
router.post('/login', wrap(async (req, res) => {
  const email = String(req.body.email || '').toLowerCase().trim()
  const password = String(req.body.password || '')
  const admin = await Admin.findOne({ email })
  const ok = admin && (await bcrypt.compare(password, admin.passwordHash))
  if (!ok) throw httpError(401, 'Invalid email or password')
  const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.json({ token })
}))

// POST /api/auth/change-password  { currentPassword, newPassword }
router.post('/change-password', requireAuth, wrap(async (req, res) => {
  const currentPassword = String(req.body.currentPassword || '')
  const newPassword = String(req.body.newPassword || '')
  if (newPassword.length < 8) throw httpError(400, 'New password must be at least 8 characters')
  const admin = await Admin.findById(req.admin.id)
  // 400 (not 401) so a wrong current password does not log the admin out
  if (!admin || !(await bcrypt.compare(currentPassword, admin.passwordHash)))
    throw httpError(400, 'Current password is incorrect')
  admin.passwordHash = await bcrypt.hash(newPassword, 10)
  await admin.save()
  res.json({ ok: true })
}))

export default router
