import React, { useState } from 'react'
import { Plus, Minus, HelpCircle } from 'lucide-react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "Is StreamRip completely free to use?",
      answer: "Yes, StreamRip is 100% free. We do not require any subscription, registration, or software installation. Our server costs are supported by minimal, non-intrusive donations."
    },
    {
      question: "What is the maximum video length I can download?",
      answer: "Currently, we support videos up to 4 hours in length. This covers most movies, podcasts, and streams. For longer videos, processing times may vary."
    },
    {
      question: "Is it safe to download videos from StreamRip?",
      answer: "Absolutely. We do not host any files; we simply convert the stream directly from YouTube to your device. No data is stored on our servers after the download is complete."
    },
    {
      question: "Can I download videos on my iPhone or Android?",
      answer: "Yes! StreamRip is a web-based app (PWA). It works flawlessly on Chrome, Safari, and Firefox on both iOS and Android devices."
    },
    {
      question: "Where are the files saved after downloading?",
      answer: "Files are usually saved in the 'Downloads' folder on your computer or mobile device. You can access them through your browser's download history (Ctrl+J)."
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    
    <section className="w-full max-w-4xl mx-auto px-4 py-24">
      <div className="text-center mb-16 space-y-2">
        <h2 className="text-3xl md:text-4xl font-poppins text-zinc-900 dark:text-zinc-100 tracking-tight">
          Frequently Asked <span className="text-sky-500">Questions</span>
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto text-sm font-inter">
          Everything you need to know about the product and billing.
        </p>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className={`
              group border rounded-2xl overflow-hidden transition-all duration-300
              ${openIndex === index 
                ? 'bg-sky-50/50 border-sky-200 dark:bg-sky-900/10 dark:border-sky-800' 
                : 'bg-white border-zinc-200 hover:border-zinc-300 dark:bg-zinc-900/40 dark:border-zinc-800 dark:hover:border-zinc-700'
              }
            `}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-6 py-4 text-left focus:outline-none"
            >
              <span className={`font-inter text-md transition-colors duration-300 ${openIndex === index ? 'text-sky-600 dark:text-sky-400' : 'text-zinc-800 dark:text-zinc-200'}`}>
                {faq.question}
              </span>
              <div className={`
                p-2 rounded-full transition-all duration-300
                ${openIndex === index 
                  ? 'bg-sky-500 text-white rotate-180' 
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:bg-sky-100 dark:group-hover:bg-zinc-700'
                }
              `}>
                {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </div>
            </button>
<div 
              className={`
                text-sm
                px-6 text-zinc-600 dark:text-zinc-400 font-inter leading-relaxed overflow-hidden transition-all duration-500 ease-in-out
                ${openIndex === index ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}
              `}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-zinc-500 dark:text-zinc-500 font-inter text-sm">
          Still have questions? <a href="#" className="text-sky-500 hover:underline font-medium">Contact our support</a>
        </p>
      </div>

    </section>
  )
}

export default FAQ