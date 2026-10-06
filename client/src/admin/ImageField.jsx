import { useRef, useState } from 'react'
import { api } from '../api'

// Paste an image URL, or upload a file (needs Cloudinary configured on the server)
export default function ImageField({ value, onChange, className }) {
  const file = useRef(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  async function pick(e) {
    const f = e.target.files[0]
    if (!f) return
    setBusy(true); setErr('')
    try { onChange((await api.upload(f)).url) } catch (e2) { setErr(e2.message) }
    setBusy(false); file.current.value = ''
  }

  return (
    <div className="space-y-2 sm:col-span-2">
      <div className="flex gap-2">
        <input className={className} placeholder="Image URL (or upload)" value={value} onChange={(e) => onChange(e.target.value)} />
        <button type="button" disabled={busy} onClick={() => file.current.click()} className="shrink-0 rounded-lg border border-rose-gold px-4 text-sm text-rose-deep hover:bg-rose-gold hover:text-cream disabled:opacity-60">
          {busy ? 'Uploading…' : 'Upload'}
        </button>
        <input ref={file} type="file" accept="image/*" hidden onChange={pick} />
      </div>
      {err && <p role="alert" className="text-xs text-red-600">{err}</p>}
      {value && <img src={value} alt="Preview" className="h-20 w-20 rounded-lg object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} onLoad={(e) => (e.currentTarget.style.display = '')} />}
    </div>
  )
}
