import { useEffect } from 'react'
import ClickSpark from '@/components/ClickSpark'
import { useProjectRoute } from '@/hooks/useProjectRoute'
import { useTheme } from '@/hooks/useTheme'
import { startSmoothScroll } from '@/lib/smoothScroll'
import AllProjects from '@/sections/AllProjects'
import CaseStudy from '@/sections/CaseStudy'
import Certifications from '@/sections/Certifications'
import Contact from '@/sections/Contact'
import Education from '@/sections/Education'
import EventDetail from '@/sections/EventDetail'
import Events from '@/sections/Events'
import EventsPage from '@/sections/EventsPage'
import Experience from '@/sections/Experience'
import Footer from '@/sections/Footer'
import FullToolkit from '@/sections/FullToolkit'
import GitHubActivity from '@/sections/GitHubActivity'
import Hero from '@/sections/Hero'
import Navbar from '@/sections/Navbar'
import Toolkit from '@/sections/Toolkit'
import Work from '@/sections/Work'

function App() {
  const { darkMode, toggleTheme } = useTheme()
  const route = useProjectRoute()

  useEffect(() => startSmoothScroll(), [])

  return (
    <div className="min-h-screen overflow-hidden border-t-4 border-slate-800 bg-white text-slate-950 transition-colors dark:bg-[#111318] dark:text-slate-100">
      <Navbar darkMode={darkMode} onToggleTheme={toggleTheme} />
      <ClickSpark color={darkMode ? '#e2e8f0' : '#334155'} />

      <main id="top" className="pt-16">
        {route.page === 'case-study' ? (
          <CaseStudy slug={route.slug} />
        ) : route.page === 'projects' ? (
          <AllProjects />
        ) : route.page === 'toolkit' ? (
          <FullToolkit />
        ) : route.page === 'events' ? (
          <EventsPage />
        ) : route.page === 'event' ? (
          <EventDetail slug={route.slug} />
        ) : (
          <>
            <Hero darkMode={darkMode} />
            <Experience />
            <Work />
            <Toolkit />
            <Education />
            <Certifications />
            <Events />
            <GitHubActivity />
            <Contact />
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
