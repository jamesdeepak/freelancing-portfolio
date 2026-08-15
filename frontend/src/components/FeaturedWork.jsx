import React from 'react';
import { ArrowUpRight, Globe, Truck } from 'lucide-react';

export default function FeaturedWork({ navigate }) {
  return (
    <section id="work" className="py-20 bg-bg-light dark:bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand dark:text-cyan-400">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-2 leading-tight">
            FEATURED WORK
          </h2>
          <div className="w-16 h-1 bg-brand mx-auto mt-4 rounded-full"></div>
        </div>

        {/* 1. Raja Transport Project Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden mb-16 transition-all duration-300 hover:shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Project Details */}
            <div className="p-8 sm:p-12 lg:col-span-6 flex flex-col justify-center text-left">
              <span className="text-xs font-bold text-brand dark:text-cyan-400 uppercase tracking-widest mb-2">
                Business Website
              </span>
              
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
                Raja Transport
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                A business website created to provide Raja Transport with a professional digital presence and an easy way for customers to learn about the service and get in touch.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-3 py-1 bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded-lg border border-gray-100 dark:border-slate-700">
                  Responsive Web Design
                </span>
                <span className="px-3 py-1 bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded-lg border border-gray-100 dark:border-slate-700">
                  Business Presence
                </span>
                <span className="px-3 py-1 bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded-lg border border-gray-100 dark:border-slate-700">
                  Client Conversion
                </span>
              </div>
              
              <div>
                <a
                  href="https://rajatransport.lovable.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-3 bg-brand hover:bg-brand-dark dark:bg-brand dark:hover:bg-brand-dark text-white font-semibold rounded-xl shadow-md transition-colors"
                >
                  View Live Website
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
            
            {/* Visual Representative Panel */}
            <div className="lg:col-span-6 bg-gradient-to-tr from-brand/5 to-cyan-500/5 dark:from-slate-850 dark:to-slate-800 p-8 sm:p-12 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-gray-100 dark:border-slate-850 min-h-[300px]">
              {/* Elegant Mockup Representation */}
              <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-200/60 dark:border-slate-750 overflow-hidden select-none">
                {/* Browser bar */}
                <div className="bg-gray-50 dark:bg-slate-850 px-4 py-2.5 flex items-center space-x-2 border-b border-gray-100 dark:border-slate-800">
                  <div className="flex space-x-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-green-400 inline-block"></span>
                  </div>
                  <div className="flex-1 bg-white dark:bg-slate-900 rounded-md text-[10px] text-gray-400 dark:text-gray-500 py-1 text-center font-mono truncate max-w-xs mx-auto">
                    rajatransport.lovable.app
                  </div>
                </div>
                
                {/* Browser Content Preview Mock */}
                <div className="p-6 text-left space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-50 dark:border-slate-800/80">
                    <span className="font-bold text-xs text-slate-800 dark:text-white flex items-center">
                      <Truck className="w-3.5 h-3.5 text-brand mr-1" />
                      Raja Transport
                    </span>
                    <span className="text-[10px] text-brand border border-brand/20 rounded px-1.5 font-bold uppercase">
                      Active Live
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-full"></div>
                    <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-5/6"></div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="p-2 border border-slate-100 dark:border-slate-800 rounded bg-slate-50/50 dark:bg-slate-850/50 text-center">
                      <div className="text-[8px] font-bold text-slate-400">Reliable</div>
                      <div className="text-[10px] font-extrabold text-slate-800 dark:text-gray-200 mt-0.5">Services</div>
                    </div>
                    <div className="p-2 border border-slate-100 dark:border-slate-800 rounded bg-slate-50/50 dark:bg-slate-850/50 text-center">
                      <div className="text-[8px] font-bold text-slate-400">Safe</div>
                      <div className="text-[10px] font-extrabold text-slate-800 dark:text-gray-200 mt-0.5">Logistics</div>
                    </div>
                    <div className="p-2 border border-slate-100 dark:border-slate-800 rounded bg-slate-50/50 dark:bg-slate-850/50 text-center">
                      <div className="text-[8px] font-bold text-slate-400">Easy</div>
                      <div className="text-[10px] font-extrabold text-slate-800 dark:text-gray-200 mt-0.5">Contact</div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="h-8 bg-brand/10 dark:bg-brand/20 rounded-lg flex items-center justify-center text-[10px] font-bold text-brand dark:text-cyan-400">
                      Explore Transportation Network
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 2. Your Project Could Be Next Section */}
        <div className="bg-gradient-to-r from-brand to-brand-dark dark:from-slate-900 dark:to-slate-850 text-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-brand-dark/20 dark:border-slate-800 relative overflow-hidden shadow-xl text-center">
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 dark:bg-cyan-500/5 rounded-full translate-x-12 -translate-y-12 blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-light/20 dark:bg-cyan-500/5 rounded-full -translate-x-12 translate-y-12 blur-2xl pointer-events-none"></div>

          <div className="max-w-2xl mx-auto relative z-10 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-300 dark:text-cyan-400">
              Future Work
            </span>
            
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              YOUR PROJECT COULD BE NEXT.
            </h3>
            
            <p className="text-brand-light text-slate-200 dark:text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              I'm currently taking on new freelance projects. If you have a business website, web application or digital idea in mind, let's turn it into something real.
            </p>
            
            <div className="pt-4">
              <button
                onClick={() => navigate('/client-register')}
                className="px-8 py-4 bg-white hover:bg-gray-100 text-brand font-bold rounded-xl shadow-lg transition-colors duration-200 inline-flex items-center justify-center text-base focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand"
              >
                Start Your Project
                <ArrowUpRight className="w-5 h-5 ml-2 text-brand font-bold" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
