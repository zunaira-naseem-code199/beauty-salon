import { Scissors, Crown, Sparkles, Droplets, Flower2, Palette } from 'lucide-react'

export const BUSINESS = {
  name: 'Beauty Grace Parlor',
  phone: '0300 0000000',
  tel: '+923000000000',
  whatsapp: '923000000000',
  address: '123 Rose Avenue, Sample Colony, Islamabad, Pakistan',
  mapsLink: 'https://www.google.com/maps/search/?api=1&query=Islamabad%2C+Pakistan',
  mapQuery: 'Islamabad, Pakistan',
  hours: '10:00 AM – 8:00 PM',
}

export const waLink = (text = 'Hello Beauty Grace Parlor, I want to book an appointment') =>
  `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}`

// 03XXXXXXXXX or +92... -> 92XXXXXXXXXX (for wa.me links to a client)
export const toWaNumber = (p = '') => {
  const d = p.replace(/\D/g, '')
  return d.startsWith('92') ? d : d.startsWith('0') ? `92${d.slice(1)}` : d
}

// "14:30" -> "2:30 PM"
export const fmt12 = (t = '') => {
  const [h, m] = t.split(':').map(Number)
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`
}

export const img = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const IMAGES = {
  hero: img('photo-1560066984-138dadb4c035', 1200),
  about: img('photo-1521590832167-7bcbfaa6381f', 1000),
}

export const ICONS = { Scissors, Crown, Sparkles, Droplets, Flower2, Palette }

export const NAV = [
  ['Services', '#services'], ['About', '#about'], ['Gallery', '#gallery'],
  ['Reviews', '#reviews'], ['Book', '#book'], ['Contact', '#contact'],
]

// Shown until the API responds (or if the server is offline). Same shape as the database documents.
export const MOCK_SERVICES = [
  { _id: 'm1', name: 'Hair Cutting & Styling', icon: 'Scissors', price: 1500, description: 'Precision cuts, blowouts and styles shaped around your face.', image: img('photo-1562322140-8baeececf3df') },
  { _id: 'm2', name: 'Bridal Makeup', icon: 'Crown', price: 25000, description: 'Long-wear bridal looks with a trial session before your day.', image: img('photo-1487412947147-5cebf100ffc2') },
  { _id: 'm3', name: 'Party Makeup', icon: 'Sparkles', price: 6000, description: 'Polished, camera-ready makeup for dawats, engagements and nights out.', image: img('photo-1522335789203-aabd1fc54bc9') },
  { _id: 'm4', name: 'Facials & Skin Care', icon: 'Droplets', price: 3000, description: 'Deep-cleansing and glow facials chosen for your skin type.', image: img('photo-1570172619644-dfd03ed5d881') },
  { _id: 'm5', name: 'Mehndi Design', icon: 'Flower2', price: 2000, description: 'Fine bridal and festive mehndi, from simple to fully detailed.', image: img('photo-1596462502278-27bfdc403348') },
  { _id: 'm6', name: 'Hair Coloring', icon: 'Palette', price: 5000, description: 'Global color, highlights and balayage with hair-safe products.', image: img('photo-1492106087820-71f1a00d2b11') },
]

export const MOCK_GALLERY = [
  'photo-1519415510236-718bdfcd89c8', 'photo-1516975080664-ed2fc6a32937', 'photo-1503236823255-94609f598e71',
  'photo-1457972729786-0411a3b2b626', 'photo-1522337360788-8b13dee7a37e', 'photo-1560869713-7d0a29430803',
].map((id, i) => ({ _id: `g${i}`, url: img(id, 800), caption: `Beauty work ${i + 1}` }))

export const MOCK_REVIEWS = [
  { _id: 'r1', name: 'Ayesha K.', event: 'Bride', rating: 5, text: 'My bridal makeup lasted from nikah to rukhsati without a single touch-up. Everyone asked who did it.' },
  { _id: 'r2', name: 'Sana R.', event: 'Regular client', rating: 5, text: 'Clean salon, calm staff and a haircut that finally suits me. I book here every month now.' },
  { _id: 'r3', name: 'Hira M.', event: 'Facial client', rating: 5, text: 'The facial cleared my skin before my cousin’s wedding. Fair prices and no pressure to buy extras.' },
]
