import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import Admin from './models/Admin.js'
import Service from './models/Service.js'
import GalleryImage from './models/GalleryImage.js'
import Review from './models/Review.js'

const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`

const SERVICES = [
  { name: 'Hair Cutting & Styling', icon: 'Scissors', price: 1500, description: 'Precision cuts, blowouts and styles shaped around your face.', image: img('photo-1562322140-8baeececf3df') },
  { name: 'Bridal Makeup', icon: 'Crown', price: 25000, description: 'Long-wear bridal looks with a trial session before your day.', image: img('photo-1487412947147-5cebf100ffc2') },
  { name: 'Party Makeup', icon: 'Sparkles', price: 6000, description: 'Polished, camera-ready makeup for dawats, engagements and nights out.', image: img('photo-1522335789203-aabd1fc54bc9') },
  { name: 'Facials & Skin Care', icon: 'Droplets', price: 3000, description: 'Deep-cleansing and glow facials chosen for your skin type.', image: img('photo-1570172619644-dfd03ed5d881') },
  { name: 'Mehndi Design', icon: 'Flower2', price: 2000, description: 'Fine bridal and festive mehndi, from simple to fully detailed.', image: img('photo-1596462502278-27bfdc403348') },
  { name: 'Hair Coloring', icon: 'Palette', price: 5000, description: 'Global color, highlights and balayage with hair-safe products.', image: img('photo-1492106087820-71f1a00d2b11') },
]

const GALLERY = ['photo-1519415510236-718bdfcd89c8', 'photo-1516975080664-ed2fc6a32937', 'photo-1503236823255-94609f598e71', 'photo-1457972729786-0411a3b2b626', 'photo-1522337360788-8b13dee7a37e', 'photo-1560869713-7d0a29430803']
  .map((id, i) => ({ url: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`, caption: `Beauty work ${i + 1}` }))

const REVIEWS = [
  { name: 'Ayesha K.', event: 'Bride', text: 'My bridal makeup lasted from nikah to rukhsati without a single touch-up. Everyone asked who did it.' },
  { name: 'Sana R.', event: 'Regular client', text: 'Clean salon, calm staff and a haircut that finally suits me. I book here every month now.' },
  { name: 'Hira M.', event: 'Facial client', text: 'The facial cleared my skin before my cousin’s wedding. Fair prices and no pressure to buy extras.' },
]

const { MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env
if (!MONGODB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('Set MONGODB_URI, ADMIN_EMAIL and ADMIN_PASSWORD in .env first.')
  process.exit(1)
}

await mongoose.connect(MONGODB_URI)

// Creates the admin only if missing. Use "npm run seed -- --reset-admin" to overwrite the password from .env
const email = ADMIN_EMAIL.toLowerCase()
const existing = await Admin.findOne({ email })
if (!existing || process.argv.includes('--reset-admin')) {
  await Admin.findOneAndUpdate({ email }, { passwordHash: await bcrypt.hash(ADMIN_PASSWORD, 10) }, { upsert: true })
  console.log(`Admin ready: ${ADMIN_EMAIL}`)
} else {
  console.log(`Admin already exists: ${ADMIN_EMAIL} (password unchanged)`)
}

if ((await Service.countDocuments()) === 0) {
  await Service.insertMany(SERVICES)
  console.log(`Inserted ${SERVICES.length} services`)
} else {
  console.log('Services already exist, skipped')
}

if ((await GalleryImage.countDocuments()) === 0) {
  await GalleryImage.insertMany(GALLERY)
  console.log(`Inserted ${GALLERY.length} gallery images`)
}
if ((await Review.countDocuments()) === 0) {
  await Review.insertMany(REVIEWS)
  console.log(`Inserted ${REVIEWS.length} reviews`)
}

await mongoose.disconnect()
