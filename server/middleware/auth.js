import jwt from 'jsonwebtoken'
import { httpError } from '../utils.js'

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return next(httpError(401, 'Not authorized'))
  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    next(httpError(401, 'Session expired, please log in again'))
  }
}
