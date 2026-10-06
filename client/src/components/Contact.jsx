import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react'
import { BUSINESS, waLink } from '../lib/config'
import { SectionHead, btnPrimary, btnGhost } from './ui'

export default function Contact() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent('P6M2+96G, Spring Valley Society Phulgran, Islamabad')}&output=embed`
  return (
    <section id="contact" className="scroll-mt-20 mx-auto max-w-6xl px-5 py-24">
      <SectionHead title="Visit Us" sub="Walk in or message us on WhatsApp to reserve your slot." />
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-7">
          <div className="flex gap-4">
            <MapPin className="mt-1 shrink-0 text-rose-gold" />
            <div>
              <p className="font-medium">Address</p>
              <p className="text-sm text-ink/70">{BUSINESS.address}</p>
              <a href={BUSINESS.mapsLink} target="_blank" rel="noreferrer" className="mt-1 inline-block text-sm underline decoration-rose-gold underline-offset-4 hover:text-rose-gold">Open in Google Maps</a>
            </div>
          </div>
          <div className="flex gap-4">
            <Phone className="mt-1 shrink-0 text-rose-gold" />
            <div>
              <p className="font-medium">Phone</p>
              <a href={`tel:${BUSINESS.tel}`} className="text-sm text-ink/70 hover:text-rose-gold">{BUSINESS.phone}</a>
            </div>
          </div>
          <div className="flex gap-4">
            <Clock className="mt-1 shrink-0 text-rose-gold" />
            <div>
              <p className="font-medium">Opening hours</p>
              <p className="text-sm text-ink/70">Every day, {BUSINESS.hours}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 pt-2">
            <a href={`tel:${BUSINESS.tel}`} className={btnGhost}><Phone size={16} /> Call Now</a>
            <a href={waLink()} target="_blank" rel="noreferrer" className={btnPrimary}><MessageCircle size={16} /> Chat on WhatsApp</a>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-rose-soft shadow-lg">
          <iframe
            title="Beauty Grace Parlor location on Google Maps" src={mapSrc}
            className="h-80 w-full md:h-full md:min-h-[360px]" loading="lazy"
            referrerPolicy="no-referrer-when-downgrade" allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
