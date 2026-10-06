import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { ICONS, waLink } from '../lib/config'
import { Img, SectionHead } from './ui'

export default function Services({ services }) {
  return (
    <section id="services" className="scroll-mt-20 mx-auto max-w-6xl px-5 py-24">
      <SectionHead title="Our Services" sub="Everything from a quick trim to full bridal prep. Prices are starting rates and may vary with length, design and products." />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const Icon = ICONS[s.icon] || Sparkles
          return (
            <motion.article
              key={s._id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_40px_-18px_rgba(183,110,121,0.5)]"
            >
              <div className="relative h-56 overflow-hidden">
                <Img src={s.image} alt={s.name} className="h-full w-full transition duration-700 group-hover:scale-105" />
                <span className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-full bg-cream text-rose-gold">
                  <Icon size={20} />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-semibold">{s.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">{s.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="font-medium text-rose-deep">From Rs {Number(s.price).toLocaleString()}</span>
                  <a
                    href={waLink(`Hello Beauty Grace Parlor, I want to book ${s.name}`)}
                    target="_blank" rel="noreferrer"
                    className="text-sm underline decoration-rose-gold underline-offset-4 hover:text-rose-gold"
                  >
                    Book this
                  </a>
                </div>
              </div>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
