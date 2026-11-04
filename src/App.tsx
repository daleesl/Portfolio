import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { useTheme } from '@/hooks/useTheme'
import Archive from '@/sections/Archive'
import Contact from '@/sections/Contact'
import Education from '@/sections/Education'
import Experience from '@/sections/Experience'
import Footer from '@/sections/Footer'
import Hero from '@/sections/Hero'
import Navbar from '@/sections/Navbar'
import Toolkit from '@/sections/Toolkit'
import Work from '@/sections/Work'

function App() {
  const { darkMode, toggleTheme } = useTheme()
  useRevealOnScroll()

  return (
    <div className="min-h-screen overflow-hidden border-t-4 border-slate-800 bg-white text-slate-950 transition-colors dark:bg-[#111318] dark:text-slate-100">
      <Navbar darkMode={darkMode} onToggleTheme={toggleTheme} />

      <main id="top" className="pt-16">
        <Hero darkMode={darkMode} />
        <Experience />
        <Work />
        <Toolkit />
        <Education />
        <Archive />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
