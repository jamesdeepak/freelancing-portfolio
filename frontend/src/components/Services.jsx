import React from 'react';
import { Globe, LayoutGrid, Brain, RefreshCw, Server } from 'lucide-react';

export default function Services() {
  const servicesList = [
    {
      title: 'BUSINESS WEBSITES',
      desc: 'Professional, highly-optimized, and responsive websites for businesses, professionals, and service providers to build credibility and acquire customers.',
      icon: Globe,
    },
    {
      title: 'WEB APPLICATIONS',
      desc: 'Custom interactive web applications designed and built from scratch around your specific business requirements, workflows, and tools.',
      icon: LayoutGrid,
    },
    {
      title: 'AI-POWERED SOLUTIONS',
      desc: 'Smart AI assistants, RAG-based search, document query interfaces, and intelligent automation integrations built on LangChain and LangGraph.',
      icon: Brain,
    },
    {
      title: 'WEBSITE REDESIGN',
      desc: 'Modernize outdated layouts, optimize load times, fix user experience flaws, and ensure full responsiveness across all modern screen resolutions.',
      icon: RefreshCw,
    },
    {
      title: 'DEPLOYMENT & SUPPORT',
      desc: 'End-to-end guidance with custom domain configuration, hosting setup (Netlify, Vercel, VPS), SSL installation, and reliable ongoing support.',
      icon: Server,
    }
  ];

  return (
    <section id="services" className="py-20 bg-white dark:bg-slate-950 border-y border-gray-100 dark:border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand dark:text-cyan-400">
            Services Offered
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-2 leading-tight">
            WHAT I CAN BUILD FOR YOU
          </h2>
          <div className="w-16 h-1 bg-brand mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => {
            const IconComponent = service.icon;
            
            // Adjust styling for the 5th service card to fit well in the grid
            const isLast = index === servicesList.length - 1;
            const cardColSpan = isLast ? 'md:col-span-2 lg:col-span-1' : '';

            return (
              <div 
                key={index}
                className={`bg-bg-light dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 hover:border-brand/30 dark:hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col items-start text-left ${cardColSpan}`}
              >
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-750 text-brand dark:text-cyan-400 mb-6">
                  <IconComponent className="w-6 h-6" />
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-wide mb-3">
                  {service.title}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
