import { useEffect, useState } from 'react'
import { api } from '../api'
import ImageField from './ImageField'

export const input = 'w-full rounded-lg border border-rose-soft bg-white px-3 py-2 text-sm outline-none focus:border-rose-gold'

// Generic admin CRUD tab (services, gallery, reviews), driven by a field list.
// fields: [{ key, label, type: 'text'|'number'|'textarea'|'select'|'image', options?, required?, wide? }]
export default function ResourceTab({ title, endpoint, fields, blank, summary, fail }) {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(blank)
  const [editId, setEditId] = useState(null)

  const load = () => api.get(`/${endpoint}/all`).then(setItems).catch(fail)
  useEffect(() => { load() }, [endpoint])

  const reset = () => { setForm(blank); setEditId(null) }
  const set = (k, v) => setForm({ ...form, [k]: v })

  async function save(e) {
    e.preventDefault()
    const body = { ...form }
    fields.forEach((f) => { if (f.type === 'number') body[f.key] = Number(body[f.key]) })
    try {
      editId ? await api.put(`/${endpoint}/${editId}`, body) : await api.post(`/${endpoint}`, body)
      reset(); load()
    } catch (err) { fail(err) }
  }

  const edit = (item) => {
    setEditId(item._id)
    setForm(Object.fromEntries(Object.keys(blank).map((k) => [k, item[k] ?? blank[k]])))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const remove = (id) => confirm('Delete this item?') &&
    api.del(`/${endpoint}/${id}`).then(() => setItems(items.filter((i) => i._id !== id))).catch(fail)

  return (
    <div className="space-y-6">
      <form onSubmit={save} className="grid gap-3 rounded-2xl bg-white p-5 shadow sm:grid-cols-2">
        <h2 className="font-display text-xl sm:col-span-2">{editId ? `Edit ${title}` : `Add ${title}`}</h2>
        {fields.map((f) => {
          const common = { required: f.required, placeholder: f.label, 'aria-label': f.label, className: `${input} ${f.wide ? 'sm:col-span-2' : ''}`, value: form[f.key], onChange: (e) => set(f.key, e.target.value) }
          if (f.type === 'image') return <ImageField key={f.key} className={input} value={form[f.key]} onChange={(v) => set(f.key, v)} />
          if (f.type === 'textarea') return <textarea key={f.key} rows="2" {...common} />
          if (f.type === 'select') return <select key={f.key} {...common}>{f.options.map((o) => <option key={o}>{o}</option>)}</select>
          return <input key={f.key} type={f.type} min={f.type === 'number' ? 0 : undefined} {...common} />
        })}
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.active} onChange={(e) => set('active', e.target.checked)} /> Show on website</label>
        <div className="flex gap-3 sm:justify-end">
          {editId && <button type="button" onClick={reset} className="text-sm underline">Cancel</button>}
          <button className="rounded-full bg-ink px-6 py-2 text-sm text-cream hover:bg-rose-deep">{editId ? 'Save changes' : 'Add'}</button>
        </div>
      </form>

      <ul className="divide-y divide-rose-soft/40 rounded-2xl bg-white shadow">
        {items.map((s) => (
          <li key={s._id} className="flex flex-wrap items-center justify-between gap-3 p-4 text-sm">
            <div className="min-w-0">{summary(s)}{!s.active && <span className="ml-2 text-xs text-ink/50">(hidden)</span>}</div>
            <div className="flex gap-4"><button onClick={() => edit(s)} className="underline">Edit</button><button onClick={() => remove(s._id)} className="text-red-600 underline">Delete</button></div>
          </li>
        ))}
        {!items.length && <li className="p-6 text-center text-ink/60">Nothing here yet.</li>}
      </ul>
    </div>
  )
}
