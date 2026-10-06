import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { IMAGES } from '../lib/config'
import { Img } from './ui'

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-blush/40 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
          <div className="absolute -bottom-4 -left-4 h-full w-full rounded-2xl border border-rose-gold" aria-hidden="true" />
          <Img src={IMAGES.about} alt="Beauty Grace Parlor interior" className="relative aspect-[4/5] w-full rounded-2xl" />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 className="font-display text-4xl font-semibold md:text-5xl">A calm place to feel like yourself</h2>
          <div className="my-6 h-px w-20 bg-rose-gold" />
          <p className="leading-relaxed text-ink/75">
            Beauty Grace Parlor is a women-focused salon in Spring Valley Society, Phulgran. We keep the space clean, private and unhurried, so you can sit back while we work.
          </p>
          <p className="mt-4 leading-relaxed text-ink/75">
            Whether it’s your wedding, a family function or a monthly refresh, we’ll listen first, suggest what suits you, and tell you the price before we begin.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {['Hygienic tools and trusted products', 'Bridal trials before your event', 'Open daily, 10 AM to 8 PM'].map((t) => (
              <li key={t} className="flex items-center gap-3"><Sparkles size={16} className="text-rose-gold" />{t}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
