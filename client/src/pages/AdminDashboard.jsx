import { useEffect, useState } from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { api } from '../api'
import AppointmentsTab from '../admin/AppointmentsTab'
import ResourceTab from '../admin/ResourceTab'
import SettingsTab from '../admin/SettingsTab'

const ICONS = ['Scissors', 'Crown', 'Sparkles', 'Droplets', 'Flower2', 'Palette']

const SERVICE_FIELDS = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'price', label: 'Starting price (Rs)', type: 'number', required: true },
  { key: 'icon', label: 'Icon', type: 'select', options: ICONS },
  { key: 'image', label: 'Image', type: 'image' },
  { key: 'description', label: 'Short description', type: 'textarea', wide: true },
]
const GALLERY_FIELDS = [
  { key: 'url', label: 'Photo', type: 'image' },
  { key: 'caption', label: 'Caption (optional)', type: 'text', wide: true },
]
const REVIEW_FIELDS = [
  { key: 'name', label: 'Client name', type: 'text', required: true },
  { key: 'event', label: 'Label (e.g. Bride)', type: 'text' },
  { key: 'rating', label: 'Rating (1-5)', type: 'number', required: true },
  { key: 'text', label: 'Review text', type: 'textarea', required: true, wide: true },
]

export default function AdminDashboard() {
  const nav = useNavigate()
  const token = localStorage.getItem('adminToken')
  const [tab, setTab] = useState('appointments')
  const [appts, setAppts] = useState([])
  const [error, setError] = useState('')

  const logout = () => { localStorage.removeItem('adminToken'); nav('/admin/login') }
  const fail = (e) => (e.status === 401 ? logout() : setError(e.message))

  useEffect(() => {
    if (token) api.get('/appointments').then((a) => { setAppts(a); setError('') }).catch(fail)
  }, [])
  if (!token) return <Navigate to="/admin/login" replace />

  const tabs = [['appointments', `Appointments (${appts.length})`], ['services', 'Services'], ['gallery', 'Gallery'], ['reviews', 'Reviews'], ['settings', 'Settings']]

  return (
    <main className="min-h-screen bg-cream px-4 py-8 sm:px-5">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-3xl font-semibold">Dashboard</h1>
          <div className="flex gap-4 text-sm">
            <Link to="/" className="underline">View site</Link>
            <button onClick={logout} className="underline">Log out</button>
          </div>
        </header>
        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {tabs.map(([id, label]) => (
            <button key={id} onClick={() => { setTab(id); setError('') }} className={`shrink-0 rounded-full px-5 py-2 text-sm ${tab === id ? 'bg-ink text-cream' : 'border border-rose-gold text-rose-deep'}`}>{label}</button>
          ))}
        </div>
        {error && <p role="alert" className="mb-4 text-sm text-red-600">{error}</p>}

        {tab === 'appointments' && <AppointmentsTab appts={appts} setAppts={setAppts} fail={fail} />}
        {tab === 'services' && (
          <ResourceTab title="service" endpoint="services" fields={SERVICE_FIELDS} fail={fail}
            blank={{ name: '', price: '', icon: 'Sparkles', image: '', description: '', active: true }}
            summary={(s) => <><p className="font-medium">{s.name}</p><p className="text-ink/60">From Rs {Number(s.price).toLocaleString()}</p></>} />
        )}
        {tab === 'gallery' && (
          <ResourceTab title="photo" endpoint="gallery" fields={GALLERY_FIELDS} fail={fail}
            blank={{ url: '', caption: '', active: true }}
            summary={(g) => <div className="flex items-center gap-3"><img src={g.url} alt="" className="h-12 w-12 rounded-lg object-cover" /><span>{g.caption || 'Untitled'}</span></div>} />
        )}
        {tab === 'reviews' && (
          <ResourceTab title="review" endpoint="reviews" fields={REVIEW_FIELDS} fail={fail}
            blank={{ name: '', event: '', rating: 5, text: '', active: true }}
            summary={(r) => <><p className="font-medium">{r.name}{r.event && `, ${r.event}`} · {r.rating}★</p><p className="truncate text-ink/60">{r.text}</p></>} />
        )}
        {tab === 'settings' && <SettingsTab />}
      </div>
    </main>
  )
}
