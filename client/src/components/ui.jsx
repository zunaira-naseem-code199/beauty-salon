import { useState } from 'react'
import { motion } from 'framer-motion'

// Falls back to a soft pink gradient if an Unsplash image fails to load
export function Img({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <div role="img" aria-label={alt} className={`bg-gradient-to-br from-blush to-rose-soft ${className}`} />
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />
}

export function SectionHead({ title, sub }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6 }}
      className="mx-auto mb-14 max-w-2xl text-center"
    >
      <h2 className="font-display text-4xl font-semibold md:text-5xl">{title}</h2>
      <div className="mx-auto my-5 h-px w-20 bg-rose-gold" />
      <p className="text-sm leading-relaxed text-ink/70 md:text-base">{sub}</p>
    </motion.div>
  )
}

export const btnPrimary = 'inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-medium text-cream transition hover:bg-rose-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-gold'
export const btnGhost = 'inline-flex items-center justify-center gap-2 rounded-full border border-rose-gold px-7 py-3 text-sm font-medium text-rose-deep transition hover:bg-rose-gold hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-gold'
