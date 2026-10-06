import { Router } from 'express'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import { requireAuth } from '../middleware/auth.js'
import { wrap, httpError } from '../utils.js'

const router = Router()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) =>
    file.mimetype.startsWith('image/') ? cb(null, true) : cb(httpError(400, 'Only image files are allowed')),
})

// POST /api/uploads (multipart field "image") -> { url }
router.post('/', requireAuth, upload.single('image'), wrap(async (req, res) => {
  const { CLOUDINARY_CLOUD_NAME: cloud_name, CLOUDINARY_API_KEY: api_key, CLOUDINARY_API_SECRET: api_secret } = process.env
  if (!cloud_name || !api_key || !api_secret)
    throw httpError(503, 'Image upload is not configured. Paste an image URL instead.')
  if (!req.file) throw httpError(400, 'No image received')

  cloudinary.config({ cloud_name, api_key, api_secret })
  const result = await new Promise((resolve, reject) =>
    cloudinary.uploader
      .upload_stream({ folder: 'beauty-grace', resource_type: 'image' }, (err, r) => (err ? reject(err) : resolve(r)))
      .end(req.file.buffer)
  )
  res.status(201).json({ url: result.secure_url })
}))

export default router
