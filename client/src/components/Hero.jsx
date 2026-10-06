import { motion } from 'framer-motion'
import { IMAGES, waLink } from '../lib/config'
import { Img, btnPrimary, btnGhost } from './ui'

export default function Hero() {
  const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-petal to-cream pt-28 md:pt-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 md:grid-cols-2 md:pb-28">
        <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.18 }}>
          <motion.p variants={item} className="mb-5 text-sm text-rose-deep">
            Beauty parlour in Spring Valley, Islamabad
          </motion.p>
          <motion.h1 variants={item} className="font-display text-5xl font-semibold leading-[1.1] md:text-6xl lg:text-7xl">
            Unleash Your Inner Glow
          </motion.h1>
          <motion.p variants={item} className="mt-6 max-w-md text-base leading-relaxed text-ink/70">
            Bridal and party makeup, hair, skin care and mehndi, done by a team that treats every appointment like it’s your big day.
          </motion.p>
          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <a href={waLink()} target="_blank" rel="noreferrer" className={btnPrimary}>Book Appointment</a>
            <a href="#services" className={btnGhost}>View Services</a>
          </motion.div>
        </motion.div>

        {/* Arched hero image with an offset rose-gold frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }} className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -right-4 top-4 h-full w-full rounded-t-full border border-rose-gold" aria-hidden="true" />
          <Img src={IMAGES.hero} alt="Inside Beauty Grace Parlor salon" className="relative aspect-[3/4] w-full rounded-t-full" />
        </motion.div>
      </div>
    </section>
  )
}
