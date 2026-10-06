import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../api'

export default function AdminLogin() {
  const nav = useNavigate()
  const [f, setF] = useState({ email: '', password: '' })
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setBusy(true)
    setErr('')
    try {
      const { token } = await api.post('/auth/login', f)
      localStorage.setItem('adminToken', token)
      nav('/admin')
    } catch (e2) {
      setErr(e2.message)
    } finally {
      setBusy(false)
    }
  }

  const input = 'w-full rounded-xl border border-rose-soft bg-white px-4 py-3 text-sm outline-none focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30'
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-petal to-cream px-5">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="font-display text-3xl font-semibold">Admin Login</h1>
        <input required type="email" className={input} placeholder="Email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
        <input required type="password" className={input} placeholder="Password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
        {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
        <button disabled={busy} className="w-full rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream hover:bg-rose-deep disabled:opacity-60">
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
        <Link to="/" className="block text-center text-sm text-rose-deep underline">Back to website</Link>
      </form>
    </main>
  )
}
