import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import GamesSection from "@/components/games-section"
import LeaderboardSection from "@/components/leaderboard-section"
import NewsSection from "@/components/news-section"
import CommunitySection from "@/components/community-section"
import FAQSection from "@/components/faq-section"
import ContactSection from "@/components/contact-section"
import ReviewsSection from "@/components/reviews-section"
import Footer from "@/components/footer"
import AboutSectionPortal from "@/components/about-section-portal"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-dark-bg-primary">
      <Navbar />
      <main className="flex-1">
  <HeroSection />
  <AboutSectionPortal />
  <GamesSection />
  <LeaderboardSection />
  <ReviewsSection />
  <NewsSection />
  <CommunitySection />
  <FAQSection />
  <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
