import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { OpenSource } from '@/components/sections/OpenSource'
import { Writing } from '@/components/sections/Writing'
import { Experience } from '@/components/sections/Experience'
import { Collaborate } from '@/components/sections/Collaborate'

export default function App() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <OpenSource />
        <Writing />
        <Experience />
        <Collaborate />
      </main>
      <Footer />
    </>
  )
}
