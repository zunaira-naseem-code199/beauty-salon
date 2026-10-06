export const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
export const pick = (obj = {}, keys) =>
  Object.fromEntries(keys.filter((k) => obj[k] !== undefined).map((k) => [k, obj[k]]))
export const httpError = (status, message) => Object.assign(new Error(message), { status })

// Bookable time slots: every 30 minutes, 10:00 to 19:30 (closing at 20:00)
export const SLOTS = Array.from({ length: 20 }, (_, i) => {
  const mins = 600 + i * 30
  return `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`
})
export const toMinutes = (t) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3))

// Current date (YYYY-MM-DD) and minutes-since-midnight in the salon's timezone
export function salonNow() {
  const tz = process.env.TIMEZONE || 'Asia/Karachi'
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', {
      timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    }).formatToParts(new Date()).map((x) => [x.type, x.value])
  )
  return { date: `${p.year}-${p.month}-${p.day}`, minutes: Number(p.hour) * 60 + Number(p.minute) }
}
