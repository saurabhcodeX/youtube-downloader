import React from 'react'
import { Togglebtn } from './themetoggle'
import { RadioReceiver } from 'lucide-react' 


const Navbar = () => {
  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 font-poppins">
      <nav className="flex items-center justify-between w-full max-w-5xl py-3 px-4 sm:px-6 rounded-full border border-zinc-200 bg-white/70 shadow-lg shadow-zinc-200/20 backdrop-blur-md dark:border-zinc-800/50 dark:bg-zinc-900/70 dark:shadow-black/20 transition-all duration-300">
        
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 shadow-inner shadow-sky-300/20">
             <RadioReceiver className="size-5 text-white" />
          </div>
          <div className="text-lg font-poppins tracking-wide text-zinc-900 dark:text-zinc-100">StreamRip</div>
        </div>

        <div className="flex gap-6 items-center text-sm font-inter text-zinc-600 dark:text-zinc-400">
          <a href="#" className="hidden sm:block hover:text-zinc-900 dark:hover:text-zinc-100 text-sm transition duration-300">YouTube to MP3</a>
          <a href="#" className="hidden sm:block hover:text-zinc-900 dark:hover:text-zinc-100 text-sm transition duration-300">YouTube to MP4</a>
          
          <div className="hidden sm:block h-5 w-px bg-zinc-200 dark:bg-zinc-800"></div>
          
          <div className="flex items-center gap-3">
            <Togglebtn /> 
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar