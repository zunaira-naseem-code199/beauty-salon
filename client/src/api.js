// All backend calls go through here.
// Dev: '/api' is proxied to http://localhost:5000 (see vite.config.js).
// Production: set VITE_API_URL to your deployed API, e.g. https://api.example.com/api
const BASE = import.meta.env.VITE_API_URL || '/api'

async function request(method, path, body, form) {
  const token = localStorage.getItem('adminToken')
  const headers = { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(form ? {} : { 'Content-Type': 'application/json' }) }
  let res
  try {
    res = await fetch(BASE + path, { method, headers, body: form ? body : body ? JSON.stringify(body) : undefined })
  } catch {
    throw new Error('Cannot reach the server. Is the backend running?')
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw Object.assign(new Error(data.message || 'Request failed'), { status: res.status })
  return data
}

export const api = {
  get: (p) => request('GET', p),
  post: (p, b) => request('POST', p, b),
  put: (p, b) => request('PUT', p, b),
  patch: (p, b) => request('PATCH', p, b),
  del: (p) => request('DELETE', p),
  upload: (file) => {
    const fd = new FormData()
    fd.append('image', file)
    return request('POST', '/uploads', fd, true)
  },
}
