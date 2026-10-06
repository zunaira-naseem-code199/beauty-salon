import { useState } from 'react'
import { api } from '../api'
import { fmt12, toWaNumber } from '../lib/config'
import { input } from './ResourceTab'

const STATUSES = ['pending', 'confirmed', 'cancelled']
const VIEWS = [['upcoming', 'Upcoming'], ['today', 'Today'], ['pending', 'Pending'], ['all', 'All']]
const badge = { pending: 'bg-amber-100 text-amber-800', confirmed: 'bg-green-100 text-green-800', cancelled: 'bg-red-100 text-red-700' }

export default function AppointmentsTab({ appts, setAppts, fail }) {
  const [view, setView] = useState('upcoming')
  const [q, setQ] = useState('')
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Karachi' })

  const setStatus = (id, status) =>
    api.patch(`/appointments/${id}`, { status }).then((u) => setAppts(appts.map((a) => (a._id === id ? u : a)))).catch(fail)
  const remove = (id) => confirm('Delete this appointment?') &&
    api.del(`/appointments/${id}`).then(() => setAppts(appts.filter((a) => a._id !== id))).catch(fail)

  const wa = (a) => `https://wa.me/${toWaNumber(a.phone)}?text=${encodeURIComponent(
    `Hello ${a.name}, this is Beauty Grace Parlor. Your ${a.service} appointment on ${a.date} at ${fmt12(a.time)} is ${a.status}.`)}`

  const needle = q.trim().toLowerCase()
  const rows = appts
    .filter((a) => ({
      today: a.date === today, pending: a.status === 'pending',
      upcoming: a.date >= today && a.status !== 'cancelled', all: true,
    })[view])
    .filter((a) => !needle || [a.name, a.phone, a.service, a.email].some((v) => (v || '').toLowerCase().includes(needle)))
    .sort((x, y) => (x.date + x.time).localeCompare(y.date + y.time))

  const stat = (label, n) => <div className="rounded-xl bg-white px-4 py-3 shadow"><p className="text-xs text-ink/60">{label}</p><p className="font-display text-2xl">{n}</p></div>
  const Status = ({ a }) => (
    <select value={a.status} onChange={(e) => setStatus(a._id, e.target.value)} aria-label="Status" className={input}>
      {STATUSES.map((s) => <option key={s}>{s}</option>)}
    </select>
  )
  const Actions = ({ a }) => (
    <div className="flex flex-wrap gap-3 text-sm">
      <a href={wa(a)} target="_blank" rel="noreferrer" className="underline">WhatsApp</a>
      <a href={`tel:${a.phone}`} className="underline">Call</a>
      <button onClick={() => remove(a._id)} className="text-red-600 underline">Delete</button>
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {stat('Pending', appts.filter((a) => a.status === 'pending').length)}
        {stat('Today', appts.filter((a) => a.date === today && a.status !== 'cancelled').length)}
        {stat('Upcoming', appts.filter((a) => a.date >= today && a.status !== 'cancelled').length)}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {VIEWS.map(([id, label]) => (
          <button key={id} onClick={() => setView(id)} className={`rounded-full px-4 py-1.5 text-sm ${view === id ? 'bg-ink text-cream' : 'border border-rose-gold text-rose-deep'}`}>{label}</button>
        ))}
        <input className={`${input} sm:ml-auto sm:max-w-xs`} placeholder="Search name, phone, service…" aria-label="Search" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      {/* Desktop: table */}
      <div className="hidden overflow-x-auto rounded-2xl bg-white shadow md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-rose-soft/60 bg-petal text-rose-deep">
            <tr><th className="p-3">Client</th><th className="p-3">Service</th><th className="p-3">When</th><th className="p-3">Status</th><th className="p-3">Actions</th></tr>
          </thead>
          <tbody>
            {rows.map((a) => (
              <tr key={a._id} className="border-b border-rose-soft/30 align-top">
                <td className="p-3"><p className="font-medium">{a.name}</p><p className="text-xs text-ink/60">{a.phone}{a.email && ` · ${a.email}`}</p>{a.notes && <p className="text-xs text-ink/60">“{a.notes}”</p>}</td>
                <td className="p-3">{a.service}</td>
                <td className="p-3 whitespace-nowrap">{a.date}<br />{fmt12(a.time)}</td>
                <td className="p-3 w-40"><Status a={a} /></td>
                <td className="p-3"><Actions a={a} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: cards */}
      <div className="space-y-3 md:hidden">
        {rows.map((a) => (
          <article key={a._id} className="space-y-3 rounded-2xl bg-white p-4 shadow">
            <div className="flex items-start justify-between gap-3">
              <div><p className="font-medium">{a.name}</p><p className="text-xs text-ink/60">{a.phone}{a.email && ` · ${a.email}`}</p></div>
              <span className={`rounded-full px-3 py-1 text-xs ${badge[a.status]}`}>{a.status}</span>
            </div>
            <p className="text-sm">{a.service}<br /><span className="text-ink/60">{a.date} at {fmt12(a.time)}</span></p>
            {a.notes && <p className="text-xs text-ink/60">“{a.notes}”</p>}
            <Status a={a} />
            <Actions a={a} />
          </article>
        ))}
      </div>
      {!rows.length && <p className="rounded-2xl bg-white p-6 text-center text-sm text-ink/60 shadow">No appointments match.</p>}
    </div>
  )
}
