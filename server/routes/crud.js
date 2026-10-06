import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { wrap, pick, httpError } from '../utils.js'

// Shared CRUD routes: public list (active only) + admin create/update/delete.
export function crudRouter(Model, fields, sort = 'createdAt') {
  const router = Router()
  const label = Model.modelName

  router.get('/', wrap(async (req, res) => res.json(await Model.find({ active: true }).sort(sort))))
  router.get('/all', requireAuth, wrap(async (req, res) => res.json(await Model.find().sort(sort))))
  router.post('/', requireAuth, wrap(async (req, res) => res.status(201).json(await Model.create(pick(req.body, fields)))))
  router.put('/:id', requireAuth, wrap(async (req, res) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, pick(req.body, fields), { new: true, runValidators: true })
    if (!doc) throw httpError(404, `${label} not found`)
    res.json(doc)
  }))
  router.delete('/:id', requireAuth, wrap(async (req, res) => {
    const doc = await Model.findByIdAndDelete(req.params.id)
    if (!doc) throw httpError(404, `${label} not found`)
    res.json({ ok: true })
  }))
  return router
}
