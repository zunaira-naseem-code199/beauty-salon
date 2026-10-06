import { useState } from 'react'
import { api } from '../api'
import { input } from './ResourceTab'

export default function SettingsTab() {
  const [f, setF] = useState({ currentPassword: '', newPassword: '', confirm: '' })
  const [msg, setMsg] = useState({ ok: false, text: '' })

  async function submit(e) {
    e.preventDefault()
    if (f.newPassword !== f.confirm) return setMsg({ ok: false, text: 'New passwords do not match' })
    try {
      await api.post('/auth/change-password', { currentPassword: f.currentPassword, newPassword: f.newPassword })
      setF({ currentPassword: '', newPassword: '', confirm: '' })
      setMsg({ ok: true, text: 'Password updated.' })
    } catch (err) { setMsg({ ok: false, text: err.message }) }
  }

  return (
    <form onSubmit={submit} className="max-w-md space-y-3 rounded-2xl bg-white p-5 shadow">
      <h2 className="font-display text-xl">Change password</h2>
      <input required type="password" className={input} placeholder="Current password" value={f.currentPassword} onChange={(e) => setF({ ...f, currentPassword: e.target.value })} />
      <input required minLength={8} type="password" className={input} placeholder="New password (min 8 characters)" value={f.newPassword} onChange={(e) => setF({ ...f, newPassword: e.target.value })} />
      <input required type="password" className={input} placeholder="Confirm new password" value={f.confirm} onChange={(e) => setF({ ...f, confirm: e.target.value })} />
      {msg.text && <p role="status" className={`text-sm ${msg.ok ? 'text-green-700' : 'text-red-600'}`}>{msg.text}</p>}
      <button className="rounded-full bg-ink px-6 py-2 text-sm text-cream hover:bg-rose-deep">Update password</button>
    </form>
  )
}
