import HeroSection from '@/components/HeroSection'
import CardStackSection from '@/components/CardStackSection'
import ReviewsSection from '@/components/ReviewsSection'
import SlideshowSection from '@/components/SlideshowSection'
import CashCascadeGame from '@/components/CashCascadeGame'
import LocationSection from '@/components/LocationSection'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <CardStackSection />
      <ReviewsSection />
      <SlideshowSection />
      <CashCascadeGame />
      <LocationSection />
      <Footer />
    </main>
  )
}
