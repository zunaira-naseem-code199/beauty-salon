import { Link } from 'react-router-dom'
import { Instagram, Facebook } from 'lucide-react'
import { BUSINESS } from '../lib/config'

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 py-10 md:flex-row md:justify-between">
        <p className="font-display text-xl">Beauty <span className="italic text-rose-soft">Grace</span></p>
        <div className="flex gap-4">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full border border-rose-gold/50 p-2.5 transition hover:bg-rose-gold"><Instagram size={18} /></a>
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" className="rounded-full border border-rose-gold/50 p-2.5 transition hover:bg-rose-gold"><Facebook size={18} /></a>
        </div>
        <p className="text-xs text-cream/60">© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved. <Link to="/admin" className="ml-2 underline hover:text-rose-soft">Admin</Link></p>
      </div>
    </footer>
  )
}

/* ---------------------------------------------------------------
   APP
---------------------------------------------------------------- */
