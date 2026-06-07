import React from 'react';
import { Youtube, Twitch, Twitter, Instagram, X } from 'lucide-react';

const Company = () => {
  const companies = [
    {
      name: 'YouTube',
      logo: <Youtube className="size-8" />,
      status: 'Operational',
      className: 'text-red-600'
    },
    {
      name: 'Twitch',
      logo: <Twitch className="size-8" />,
      status: 'Coming Soon',
      className: 'text-purple-600'
    },
    {
      name: 'Instagram',
      logo: <Instagram className="size-8" />,
      status: 'Coming Soon',
      className: 'text-pink-600 font-poppins'
    },
    {
      name: 'X / Twitter',
      logo: <X className="size-8" />,
      status: 'Coming Soon',
      className: 'text-zinc-900 dark:text-zinc-50'
    },
  ];

  return (
    <section className="w-full max-w-4xl mx-auto px-4 pb-24 mt-12">
      <div className="text-center mb-12 space-y-4">
        <h2 className="text-3xl md:text-5xl font-poppins text-zinc-900 dark:text-zinc-100 tracking-tight">
          Supported <span className="text-sky-500">Platforms</span>
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto text-lg font-inter">
          We are constantly expanding our support for other popular video streaming platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        {companies.map((company, index) => (
          <div 
            key={index}
            className="group relative p-8 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden"
          >
            <div className={`flex flex-col items-center space-y-4 transition-all duration-300 group-hover:blur-md group-hover:opacity-50 ${company.className}`}>
              {company.logo}
              <h3 className="text-md font-poppins text-zinc-900 dark:text-zinc-100">
                {company.name}
              </h3>
            </div>

            {/* Overlay Status - Appears on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <div className={`
                px-4 py-2 rounded-full font-poppins text-xs
                ${company.status === 'Operational' 
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                  : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'}
              `}>
                {company.status === 'Operational' ? (
                  <span className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2 text-sm">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Operational
                  </span>
                ) : (
                  <span>Coming Soon</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Company;