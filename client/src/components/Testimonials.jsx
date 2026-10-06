import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export default function Testimonials({ reviews }) {
  return (
    <section id="reviews" className="scroll-mt-20 bg-ink py-24 text-cream">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="font-display text-4xl font-semibold md:text-5xl">Words from our clients</h2>
          <div className="mx-auto mt-5 h-px w-20 bg-rose-soft" />
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.figure
              key={r._id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="rounded-2xl border border-rose-gold/40 p-7"
            >
              <div className="mb-4 flex gap-1 text-rose-soft" aria-label={`${r.rating || 5} out of 5 stars`}>
                {[...Array(r.rating || 5)].map((_, n) => <Star key={n} size={16} fill="currentColor" />)}
              </div>
              <blockquote className="font-display text-lg italic leading-relaxed">“{r.text}”</blockquote>
              <figcaption className="mt-5 text-sm text-cream/70">{r.name}{r.event && `, ${r.event}`}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
