import React from 'react'
import { Zap, Smartphone, Shield, FileAudio, MonitorPlay, MousePointerClick } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning-Fast Engine",
      desc: "Experience ultra-fast video and audio extraction using advanced server-side technology. Get your files instantly without waiting.",
      className: "bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-white"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Universal Support",
      desc: "Functions perfectly on all internet-enabled devices. Access our service from any smartphone, tablet, or computer flawlessly.",
      className: "bg-sky-100 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 group-hover:bg-sky-500 group-hover:text-white"
    },
    {
      icon: <FileAudio className="w-6 h-6" />,
      title: "Format Flexibility",
      desc: "Complete flexibility in your downloads. Choose between MP3 and MP4 formats with multiple quality options to suit your needs.",
      className: "bg-violet-100 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 group-hover:bg-violet-500 group-hover:text-white"
    },
    {
      icon: <MonitorPlay className="w-6 h-6" />,
      title: "Superior Quality",
      desc: "We provide superior download quality while maintaining efficient file sizes, ensuring the perfect balance for your library.",

      className: "bg-rose-100 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 group-hover:bg-rose-500 group-hover:text-white"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy First",
      desc: "We never store your download history or request personal information. Enjoy a completely distraction-free, private environment.",

      className: "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white"
    },
    {
      icon: <MousePointerClick className="w-6 h-6" />,
      title: "No Registration",
      desc: "Start downloading instantly without creating an account. No software installation required—just paste and go.",

      className: "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white"
    }
  ]

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-20 relative z-10">
      
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-5xl font-poppins font-inter text-zinc-900 dark:text-zinc-100 tracking-tight">
          Why choose <span className="text-sky-500">StreamRip?</span>
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto text-lg">
          We combine rapid download speeds with format versatility, making us the preferred choice for media enthusiasts.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => {
          const gradientId = `raycast-gradient-${i}`;
          
          return (
          <div 
            key={i} 
            className="group relative p-8  border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/40 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/5 hover:-translate-y-1"
          >
            <svg className="absolute inset-0 h-full w-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="#0ea5e9" /> 
                        <stop offset="100%" stopColor="transparent" />
                        <animate attributeName="x1" values="-100%;100%" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="x2" values="0%;200%" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="y1" values="0%;100%" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="y2" values="0%;100%" dur="2s" repeatCount="indefinite" />
                    </linearGradient>
                </defs>
                <rect 
                    x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" 
           
                    fill="none" stroke={`url(#${gradientId})`} strokeWidth="2" 
                />
            </svg>
            <div className="relative z-10 flex flex-col items-start h-full">
               <div className={`mb-6 p-3 rounded-2xl transition-all duration-300 shadow-sm group-hover:scale-110 ${feature.className}`}>
                {feature.icon}
              </div>

              <h3 className="text-xl font-poppins text-zinc-900 dark:text-zinc-100 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm font-inter">
                {feature.desc}
              </p>
            </div>
          </div>
        )})}
      </div>
    </div>
  )
}

export default Features















