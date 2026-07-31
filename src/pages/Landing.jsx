import { useTheme } from '../hooks/useTheme'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import ProblemSection from '../components/ProblemSection'
import PromiseSection from '../components/PromiseSection'
import HowItWorks from '../components/HowItWorks'
import ProofSection from '../components/ProofSection'
import CTAButton from '../components/CTAButton'
import Pricing from '../components/Pricing'
import PostPurchaseSteps from '../components/PostPurchaseSteps'
import Objections from '../components/Objections'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'

function Landing() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background text-textPrimary">
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <ProblemSection />
      <PromiseSection />
      <HowItWorks />
      <ProofSection />
      <section className="mx-auto max-w-6xl px-6 py-12 text-center md:py-16">
        <CTAButton />
      </section>
      <Pricing />
      <PostPurchaseSteps />
      <Objections />
      <FAQ />
      <Footer theme={theme} />
    </div>
  )
}

export default Landing
