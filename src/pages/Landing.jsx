import { useTheme } from '../hooks/useTheme'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import ProblemSection from '../components/ProblemSection'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'
import Pricing from '../components/Pricing'
import PostPurchaseSteps from '../components/PostPurchaseSteps'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'

function Landing() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background text-textPrimary">
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <Testimonials />
      <PostPurchaseSteps />
      <Pricing />
      <FAQ />
      <Footer theme={theme} />
    </div>
  )
}

export default Landing
