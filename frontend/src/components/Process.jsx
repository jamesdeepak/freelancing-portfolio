import React from 'react';
import { Search, Compass, Code, Eye, Rocket } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      step: '01',
      title: 'Discovery & Consultation',
      desc: 'We start with a detailed chat about your goals. We align on what your business needs, analyze your competition, and define the exact scope, requirements, and budget.',
      icon: Search,
    },
    {
      step: '02',
      title: 'Design & Architecture',
      desc: 'I structure the layout, user flows, and wireframes in Figma. This ensures we agree on the visual hierarchy, content structure, and aesthetics before writing code.',
      icon: Compass,
    },
    {
      step: '03',
      title: 'Development & Build',
      desc: 'I write clean, optimized code using modern best practices (React, Tailwind CSS, or Java/Spring Boot). I build with accessibility, performance, and responsive grids in mind.',
      icon: Code,
    },
    {
      step: '04',
      title: 'Testing & Optimization',
      desc: 'We review the live private preview. I optimize SEO tags, cross-browser compatibility, loading speeds, and form validations. Any requested adjustments are implemented here.',
      icon: Eye,
    },
    {
      step: '05',
      title: 'Launch & Support',
      desc: 'I deploy your website to production, connect your domain name, configure secure API keys, verify notifications, and hand over all files with clear documentation.',
      icon: Rocket,
    }
  ];

  return (
    <section id="process" className="py-20 bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand dark:text-cyan-400">
            Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-2 leading-tight">
            How I Work
          </h2>
          <div className="w-16 h-1 bg-brand mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Timeline Path */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line helper on desktop */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-gray-150 dark:bg-slate-800 -translate-x-1/2 hidden md:block"></div>

          <div className="space-y-12 relative">
            {steps.map((stepData, index) => {
              const StepIcon = stepData.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={stepData.step} className="flex flex-col md:flex-row md:items-center relative">
                  
                  {/* Left Column (Desktop spacing) */}
                  <div className={`flex-1 text-left md:text-right ${isEven ? 'md:pr-12' : 'md:order-3 md:pl-12 md:text-left'}`}>
                    <div className="bg-bg-light dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800/80 shadow-sm">
                      <div className="flex items-center space-x-3 md:hidden mb-3">
                        <span className="text-xs font-bold text-brand dark:text-cyan-400 bg-brand/10 dark:bg-cyan-950/50 px-2 py-1 rounded">
                          Phase {stepData.step}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {stepData.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {stepData.desc}
                      </p>
                    </div>
                  </div>

                  {/* Timeline Badge Center */}
                  <div className="absolute left-0 md:left-1/2 top-2 md:top-auto md:order-2 md:-translate-x-1/2 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-brand dark:bg-cyan-500 border-4 border-white dark:border-slate-950 shadow-md flex items-center justify-center text-white z-10">
                      <StepIcon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Right Column Spacer (Desktop spacing) */}
                  <div className={`flex-1 hidden md:block ${isEven ? 'md:order-3' : ''}`}></div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
