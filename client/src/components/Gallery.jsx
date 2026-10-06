import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Img, SectionHead } from './ui'

export default function Gallery({ images }) {
  const [open, setOpen] = useState(null)
  const close = () => setOpen(null)
  const step = (d) => setOpen((i) => (i + d + images.length) % images.length)

  useEffect(() => {
    if (open === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, images.length])

  const current = open !== null ? images[open] : null
  const nav = 'absolute top-1/2 -translate-y-1/2 rounded-full bg-cream/90 p-3 text-ink hover:bg-cream'

  return (
    <section id="gallery" className="scroll-mt-20 mx-auto max-w-6xl px-5 py-24">
      <SectionHead title="Our Work" sub="A look at recent makeup, hair and styling from the parlor." />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        {images.map((g, i) => (
          <motion.button
            key={g._id} type="button" onClick={() => setOpen(i)} whileHover={{ y: -4 }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
            className="group overflow-hidden rounded-xl" aria-label={`Open photo: ${g.caption || i + 1}`}
          >
            <Img src={g.url} alt={g.caption || `Beauty work sample ${i + 1}`} className="aspect-square w-full transition duration-700 group-hover:scale-105" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={close}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4"
          >
            <figure onClick={(e) => e.stopPropagation()} className="max-w-4xl text-center">
              <img src={current.url} alt={current.caption || 'Gallery photo'} className="mx-auto max-h-[82vh] max-w-full rounded-lg object-contain" />
              {current.caption && <figcaption className="mt-3 text-sm text-cream/80">{current.caption}</figcaption>}
            </figure>
            <button onClick={close} aria-label="Close" className="absolute right-4 top-4 rounded-full bg-cream/90 p-2 text-ink"><X size={20} /></button>
            {images.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); step(-1) }} aria-label="Previous photo" className={`${nav} left-3`}><ChevronLeft size={22} /></button>
                <button onClick={(e) => { e.stopPropagation(); step(1) }} aria-label="Next photo" className={`${nav} right-3`}><ChevronRight size={22} /></button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
