import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV, waLink } from '../lib/config'
import { btnPrimary } from './ui'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rose-soft/50 bg-cream/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="font-display text-2xl font-semibold tracking-wide">
          Beauty <span className="italic text-rose-gold">Grace</span>
        </a>
        <ul className="hidden items-center gap-8 text-sm md:flex">
          {NAV.map(([label, href]) => (
            <li key={href}><a href={href} className="transition hover:text-rose-gold">{label}</a></li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a href={waLink()} target="_blank" rel="noreferrer" className={`${btnPrimary} !px-5 !py-2.5`}>Book Now</a>
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-rose-soft/50 bg-cream px-5 md:hidden"
          >
            {NAV.map(([label, href]) => (
              <li key={href} className="py-3">
                <a href={href} onClick={() => setOpen(false)} className="block text-sm">{label}</a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
