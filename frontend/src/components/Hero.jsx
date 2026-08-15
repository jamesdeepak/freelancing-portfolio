import React from 'react';
import { ArrowUpRight, Phone, MessageSquare, Mail } from 'lucide-react';
import deepakImg from '../assets/deepak.png';

export default function Hero({ navigate }) {
  return (
    <section id="home" className="relative min-h-screen pt-28 flex items-center overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand/10 dark:bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-light/10 dark:bg-brand/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-12">
          
          {/* Left Column: Heading and copy */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left order-2 lg:order-1 animate-slide-up">
            
            {/* Status Badge */}
            <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400 px-3 py-1.5 rounded-full text-xs font-semibold self-start border border-emerald-100 dark:border-emerald-900/50 shadow-sm">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <span>AVAILABLE FOR FREELANCE PROJECTS</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
              YOUR IDEA DESERVES A WEBSITE THAT FEELS <span className="text-brand dark:text-cyan-400">PROFESSIONAL.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl">
              Freelance Web Developer helping businesses, professionals and individuals build modern, responsive and practical digital experiences.
            </p>

            {/* Main CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => navigate('/client-register')}
                className="px-6 py-3.5 bg-brand hover:bg-brand-dark dark:bg-brand dark:hover:bg-brand-dark text-white font-semibold rounded-xl inline-flex items-center shadow-lg hover:shadow-xl transition-all"
              >
                Start a Project
                <ArrowUpRight className="w-5 h-5 ml-1.5" />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('work');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-white hover:bg-gray-50 border border-gray-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800 text-gray-900 dark:text-white font-semibold rounded-xl inline-flex items-center shadow-sm transition-all"
              >
                View My Work
              </button>
            </div>

            {/* Quick Contact Links */}
            <div className="pt-6 border-t border-gray-100 dark:border-slate-800">
              <span className="block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
                Or Connect Instantly
              </span>
              <div className="flex flex-wrap gap-4 text-sm">
                <a
                  href="tel:9500142806"
                  className="inline-flex items-center text-gray-600 hover:text-brand dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
                >
                  <span className="p-2 bg-gray-50 dark:bg-slate-800 rounded-lg mr-2 border border-gray-100 dark:border-slate-700/50">
                    <Phone className="w-4 h-4 text-brand dark:text-cyan-400" />
                  </span>
                  +91 9500142806
                </a>
                <a
                  href="https://wa.me/919500142806"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                >
                  <span className="p-2 bg-gray-50 dark:bg-slate-800 rounded-lg mr-2 border border-gray-100 dark:border-slate-700/50">
                    <MessageSquare className="w-4 h-4 text-green-500" />
                  </span>
                  WhatsApp
                </a>
                <a
                  href="mailto:jamesdeepak092005@gmail.com"
                  className="inline-flex items-center text-gray-600 hover:text-brand dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
                >
                  <span className="p-2 bg-gray-50 dark:bg-slate-800 rounded-lg mr-2 border border-gray-100 dark:border-slate-700/50">
                    <Mail className="w-4 h-4 text-brand dark:text-cyan-400" />
                  </span>
                  jamesdeepak092005@gmail.com
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Professional Portrait */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2 animate-fade-in">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Decorative Circle Gradients */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand/20 to-cyan-500/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
              
              {/* Outer accent circle */}
              <div className="absolute inset-4 border border-dashed border-brand/30 dark:border-cyan-500/30 rounded-full"></div>
              
              {/* Inner wrapper for image */}
              <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-white dark:border-slate-900 shadow-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <img
                  src={deepakImg}
                  alt="Deepak - Freelance Web Developer"
                  className="w-full h-full object-cover object-top filter contrast-[1.02] saturate-[1.05]"
                  loading="eager"
                />
              </div>

              {/* Float badge 1 */}
              <div className="absolute top-10 -left-6 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 flex items-center space-x-2 text-xs font-semibold">
                <span className="text-brand dark:text-cyan-400 font-bold">&lt;/&gt;</span>
                <span className="text-gray-700 dark:text-gray-200">Web Developer</span>
              </div>

              {/* Float badge 2 */}
              <div className="absolute bottom-10 -right-6 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 flex items-center space-x-2 text-xs font-semibold">
                <span className="text-cyan-500 font-bold">🤖</span>
                <span className="text-gray-700 dark:text-gray-200">AI Specialist</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
