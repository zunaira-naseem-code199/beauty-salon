import { useEffect, useState } from 'react'
import { api } from '../api'
import { fmt12 } from '../lib/config'
import { SectionHead, btnPrimary } from './ui'

const empty = { name: '', phone: '', email: '', service: '', date: '', time: '', notes: '' }
const field = 'w-full rounded-xl border border-rose-soft bg-white px-4 py-3 text-sm outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30'

export default function Booking({ services }) {
  const [f, setF] = useState(empty)
  const [slots, setSlots] = useState([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [refresh, setRefresh] = useState(0)
  const [state, setState] = useState({ status: 'idle', msg: '' })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Karachi' })

  // Load free slots whenever the date changes (or after a failed booking)
  useEffect(() => {
    if (!f.date) { setSlots([]); return }
    let live = true
    setLoadingSlots(true)
    api.get(`/appointments/slots?date=${f.date}`)
      .then((d) => { if (live) { setSlots(d); setF((p) => (d.some((s) => s.time === p.time && s.available) ? p : { ...p, time: '' })) } })
      .catch(() => live && setSlots([]))
      .finally(() => live && setLoadingSlots(false))
    return () => { live = false }
  }, [f.date, refresh])

  async function submit(e) {
    e.preventDefault()
    setState({ status: 'loading', msg: '' })
    try {
      await api.post('/appointments', f)
      setState({ status: 'ok', msg: 'Request received! We will confirm your slot by phone or WhatsApp shortly.' })
      setF(empty)
    } catch (err) {
      setState({ status: 'error', msg: err.message })
      setRefresh((n) => n + 1)
    }
  }

  const free = slots.filter((s) => s.available).length
  return (
    <section id="book" className="scroll-mt-20 bg-blush/40 py-24">
      <div className="mx-auto max-w-3xl px-5">
        <SectionHead title="Book an Appointment" sub="Choose your service, date and a free time slot. We are open 10 AM to 8 PM and will confirm by phone or WhatsApp." />
        <form onSubmit={submit} className="grid gap-4 rounded-2xl bg-white p-6 shadow-[0_10px_40px_-18px_rgba(183,110,121,0.5)] sm:grid-cols-2 md:p-8">
          <input required className={field} placeholder="Full name" aria-label="Full name" value={f.name} onChange={set('name')} />
          <input required type="tel" className={field} placeholder="Phone (e.g. 03XXXXXXXXX)" aria-label="Phone" value={f.phone} onChange={set('phone')} />
          <input type="email" className={`${field} sm:col-span-2`} placeholder="Email (optional)" aria-label="Email" value={f.email} onChange={set('email')} />
          <select required className={`${field} sm:col-span-2`} aria-label="Service" value={f.service} onChange={set('service')}>
            <option value="">Select a service</option>
            {services.map((s) => <option key={s._id} value={s.name}>{s.name}</option>)}
          </select>
          <input required type="date" min={today} className={field} aria-label="Date" value={f.date} onChange={set('date')} />
          <select required className={field} aria-label="Time slot" value={f.time} onChange={set('time')} disabled={!f.date || loadingSlots}>
            <option value="">{!f.date ? 'Pick a date first' : loadingSlots ? 'Loading slots…' : 'Select a time'}</option>
            {slots.map((s) => (
              <option key={s.time} value={s.time} disabled={!s.available}>{fmt12(s.time)}{!s.available && ' (unavailable)'}</option>
            ))}
          </select>
          {f.date && !loadingSlots && slots.length > 0 && free === 0 && (
            <p className="text-sm text-rose-deep sm:col-span-2">No free slots on this date. Please choose another day.</p>
          )}
          <textarea rows="3" className={`${field} sm:col-span-2`} placeholder="Notes (optional)" aria-label="Notes" value={f.notes} onChange={set('notes')} />
          <button disabled={state.status === 'loading'} className={`${btnPrimary} sm:col-span-2 disabled:opacity-60`}>
            {state.status === 'loading' ? 'Sending…' : 'Request Appointment'}
          </button>
          {state.msg && <p role="status" className={`text-sm sm:col-span-2 ${state.status === 'ok' ? 'text-green-700' : 'text-red-600'}`}>{state.msg}</p>}
        </form>
      </div>
    </section>
  )
}
