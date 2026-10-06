import { useState, useEffect } from 'react'
import { api } from '../api'
import { MOCK_SERVICES, MOCK_GALLERY, MOCK_REVIEWS } from '../lib/config'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import Gallery from '../components/Gallery'
import Testimonials from '../components/Testimonials'
import Booking from '../components/Booking'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  const [services, setServices] = useState(MOCK_SERVICES)
  const [gallery, setGallery] = useState(MOCK_GALLERY)
  const [reviews, setReviews] = useState(MOCK_REVIEWS)

  // Load content from the API; keep the built-in defaults if the server is offline or a list is empty
  useEffect(() => {
    const load = (path, set) => api.get(path).then((d) => d.length && set(d)).catch(() => {})
    load('/services', setServices)
    load('/gallery', setGallery)
    load('/reviews', setReviews)
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services services={services} />
        <About />
        <Gallery images={gallery} />
        <Testimonials reviews={reviews} />
        <Booking services={services} />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
