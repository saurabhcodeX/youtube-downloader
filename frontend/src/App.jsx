import React from 'react'
import Hero from './Hero'
import Navbar from './components/Navbar'
import Features from './components/Features'
import Howitworks from './components/Howitworks'
import FAQ from './components/FAQ'
import {MinimalFooter} from './components/minimal-footer'
import Company from './components/Company'

const App = () => {
  return (
    <div className="relative min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 selection:bg-red-500/20 dark:selection:bg-red-500/30 text-zinc-900 dark:text-zinc-50 overflow-hidden font-sans antialiased transition-colors duration-300">
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar/>
        <main className="flex-grow flex flex-col items-center justify-start pt-20 sm:pt-32 pb-12 px-4 sm:px-6">
           <Hero />
        </main>
        <Company />
        <Features />
        <Howitworks />
        <FAQ />
        <MinimalFooter />
      </div>
    </div>
  )
}

export default App