import { Router } from 'express'
import Appointment from '../models/Appointment.js'
import { requireAuth } from '../middleware/auth.js'
import { notifyNewBooking, notifyStatus } from '../mailer.js'
import { wrap, pick, httpError, SLOTS, toMinutes, salonNow } from '../utils.js'

const router = Router()
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const slotTakenMsg = 'That time was just booked. Please choose another slot.'

// Public: which slots are free on a date
router.get('/slots', wrap(async (req, res) => {
  const date = String(req.query.date || '')
  if (!DATE_RE.test(date) || Number.isNaN(Date.parse(date))) throw httpError(400, 'Invalid date')
  const now = salonNow()
  if (date < now.date) return res.json([])
  const taken = new Set((await Appointment.find({ date, status: { $ne: 'cancelled' } }).select('time')).map((a) => a.time))
  res.json(SLOTS.map((time) => ({
    time,
    available: !taken.has(time) && !(date === now.date && toMinutes(time) <= now.minutes),
  })))
}))

// Public: customers send a booking request from the website
router.post('/', wrap(async (req, res) => {
  const d = pick(req.body, ['name', 'phone', 'email', 'service', 'date', 'time', 'notes'])
  for (const k of ['name', 'phone', 'email', 'service', 'date', 'time', 'notes']) d[k] = String(d[k] || '').trim()

  if (!d.name || !d.service) throw httpError(400, 'Name and service are required')
  if (!/^[+\d][\d\s-]{8,15}$/.test(d.phone)) throw httpError(400, 'Please enter a valid phone number')
  if (d.email && !/^\S+@\S+\.\S+$/.test(d.email)) throw httpError(400, 'Please enter a valid email address')
  const now = salonNow()
  if (!DATE_RE.test(d.date) || Number.isNaN(Date.parse(d.date)) || d.date < now.date)
    throw httpError(400, 'Please choose a valid future date')
  if (!SLOTS.includes(d.time)) throw httpError(400, 'Please pick one of the available time slots')
  if (d.date === now.date && toMinutes(d.time) <= now.minutes) throw httpError(400, 'That time has already passed today')

  if (await Appointment.exists({ date: d.date, time: d.time, status: { $ne: 'cancelled' } }))
    throw httpError(409, slotTakenMsg)

  let doc
  try {
    doc = await Appointment.create(d)
  } catch (e) {
    if (e.code === 11000) throw httpError(409, slotTakenMsg) // two people clicked at the same moment
    throw e
  }
  notifyNewBooking(doc)
  res.status(201).json({ id: doc._id, message: 'Appointment request received' })
}))

// Admin only below
router.get('/', requireAuth, wrap(async (req, res) => res.json(await Appointment.find().sort('-createdAt'))))

router.patch('/:id', requireAuth, wrap(async (req, res) => {
  const { status } = req.body
  if (!['pending', 'confirmed', 'cancelled'].includes(status)) throw httpError(400, 'Invalid status')
  const doc = await Appointment.findById(req.params.id)
  if (!doc) throw httpError(404, 'Appointment not found')
  doc.status = status
  doc.slotTaken = status !== 'cancelled'
  try {
    await doc.save()
  } catch (e) {
    if (e.code === 11000) throw httpError(409, 'Another booking already holds this time slot')
    throw e
  }
  notifyStatus(doc)
  res.json(doc)
}))

router.delete('/:id', requireAuth, wrap(async (req, res) => {
  const doc = await Appointment.findByIdAndDelete(req.params.id)
  if (!doc) throw httpError(404, 'Appointment not found')
  res.json({ ok: true })
}))

export default router
