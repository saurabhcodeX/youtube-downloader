import React from 'react'
import { Copy, ArrowRight, Download, Search, Youtube, MousePointerClick } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Copy the URL",
      desc: "Navigate to YouTube, find the video you want to save, and copy its link from the address bar or share button.",
      icon: <Copy className="w-6 h-6" />,
      badge: <Youtube className="w-4 h-4" />
    },
    {
      id: 2,
      title: "Paste & Analyze",
      desc: "Return to StreamRip, paste the link into the search bar, and hit the 'Analyze' button to process the video info.",
      icon: <Search className="w-6 h-6" />,
      badge: <MousePointerClick className="w-4 h-4" />
    },
    {
      id: 3,
      title: "Select & Download",
      desc: "Choose your preferred quality (1080p, 4K) or format (MP3), then click the download button to save your file.",
      icon: <Download className="w-6 h-6" />,
      badge: <ArrowRight className="w-4 h-4 -rotate-45" />
    }
  ]

  return (
    <section className="w-full py-24 relative overflow-hidden">
        
      {/* Background Decor: Subtle gradient blobs */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-zinc-500/5 rounded-full blur-3xl translate-y-1/3 translate-x-1/3 pointer-events-none"></div>

      <div className="w-full max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900/30 dark:bg-sky-900/10 dark:text-sky-400 text-xs font-medium font-inter">
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
             </span>
             Simple Workflow
          </div>
          <h2 className="text-3xl md:text-5xl font-poppins text-zinc-900 dark:text-zinc-100 tracking-tight">
            Download in <span className="text-sky-500">3 Easy Steps</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto text-lg font-inter leading-snug">
            No complicated settings or software to install. Just follow these simple steps to get your media offline.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-zinc-200 dark:border-zinc-800 z-0"></div>

          {steps.map((step, index) => (
            <div key={step.id} className="relative z-10 group">
              
              {/* Card Container */}
              <div className="h-full flex flex-col items-center text-center bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-xl ">
                
                {/* Step Number Badge */}
                <div className="absolute -top-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500 text-xs font-mono font-bold px-3 py-1 rounded-full shadow-sm">
                   STEP 0{step.id}
                </div>

                {/* Icon Circle */}
                <div className="relative mb-6">
                   {/* Glow behind icon */}
                   <div className="absolute inset-0 bg-sky-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                   
                   <div className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-100 to-white dark:from-zinc-800 dark:to-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-inner group-hover:scale-110 transition-transform duration-300">
                      <div className="text-sky-500 dark:text-sky-400">
                        {step.icon}
                      </div>
                      
                      {/* Small floating badge icon */}
                      <div className="absolute -bottom-2 -right-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 p-1.5 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800">
                         {step.badge}
                      </div>
                   </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-poppins text-zinc-900 dark:text-zinc-100 mb-3">
                  {step.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-normal font-inter">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pro Tip Box */}
        <div className="mt-16 mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-sky-50 dark:bg-sky-900/10 border border-sky-100 dark:border-sky-800/30 text-sm text-zinc-700 dark:text-zinc-300">
                <div className="bg-sky-500 text-white p-1 rounded-full">
                    <ArrowRight className="w-4 h-4" />
                </div>
                <span className="font-medium">
                    <span className="font-poppins text-sky-600 dark:text-sky-400">Pro Tip:</span> Add "rip" after "youtube" in the URL for instant redirection!
                </span>
            </div>
        </div>

      </div>
    </section>
  )
}

export default HowItWorks