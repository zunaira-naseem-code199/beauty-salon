import nodemailer from 'nodemailer'

let transporter
function getTransporter() {
  const { SMTP_HOST, SMTP_PORT = '587', SMTP_USER, SMTP_PASS } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null
  transporter ||= nodemailer.createTransport({
    host: SMTP_HOST, port: Number(SMTP_PORT), secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
  return transporter
}

// Never blocks or breaks a request: failures are only logged.
async function send(to, subject, text) {
  const t = getTransporter()
  if (!t || !to) return
  try {
    await t.sendMail({ from: process.env.MAIL_FROM || process.env.SMTP_USER, to, subject, text })
  } catch (e) {
    console.error('Email failed:', e.message)
  }
}

const details = (a) =>
  `Service: ${a.service}\nDate: ${a.date}\nTime: ${a.time}\nName: ${a.name}\nPhone: ${a.phone}${a.notes ? `\nNotes: ${a.notes}` : ''}`

export function notifyNewBooking(a) {
  send(process.env.OWNER_EMAIL, `New booking request: ${a.name} - ${a.service}`, details(a))
  if (a.email)
    send(a.email, 'We received your booking request - Beauty Grace Parlor',
      `Hello ${a.name},\n\nThank you for your request. We will confirm your appointment shortly.\n\n${details(a)}\n\nBeauty Grace Parlor`)
}

export function notifyStatus(a) {
  if (!a.email || !['confirmed', 'cancelled'].includes(a.status)) return
  send(a.email, `Your appointment is ${a.status} - Beauty Grace Parlor`,
    `Hello ${a.name},\n\nYour appointment has been ${a.status}.\n\n${details(a)}\n\nBeauty Grace Parlor`)
}
