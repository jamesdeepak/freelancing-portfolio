import React from 'react';
import { Phone, MessageSquare, Mail, Calendar, ArrowRight } from 'lucide-react';

export default function ContactSection({ navigate }) {
  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-950 border-t border-gray-150 dark:border-slate-900 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand dark:text-cyan-400">
            Get in touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-2 leading-tight">
            Let's Build Something.
          </h2>
          <div className="w-16 h-1 bg-brand mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Side: Contact details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Have a project in mind?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Tell me what you're looking to build. I am active and available for freelance roles. Reach out via call, WhatsApp, email, or by filling out the project register form.
              </p>
            </div>

            {/* Micro attention lines */}
            <div className="p-5 bg-bg-light dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 space-y-2">
              <span className="block text-xs font-bold uppercase tracking-wider text-brand dark:text-cyan-400">
                Direct Communication
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                "Good design gets attention. Great websites build trust."
              </p>
            </div>

            {/* Direct actions */}
            <div className="space-y-4">
              <a
                href="tel:9500142806"
                className="flex items-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 hover:border-brand/40 dark:hover:border-cyan-500/30 transition-all group"
              >
                <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-brand dark:text-cyan-400 rounded-lg group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="ml-4">
                  <span className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Call
                  </span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    9500142806
                  </span>
                </div>
              </a>

              <a
                href="https://wa.me/919500142806"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 hover:border-green-500/40 dark:hover:border-green-500/30 transition-all group"
              >
                <div className="p-3 bg-green-50 dark:bg-green-950/40 text-green-500 rounded-lg group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="ml-4">
                  <span className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    WhatsApp
                  </span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    9500142806
                  </span>
                </div>
              </a>

              <a
                href="mailto:jamesdeepak092005@gmail.com"
                className="flex items-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 hover:border-brand/40 dark:hover:border-cyan-500/30 transition-all group"
              >
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 text-amber-500 rounded-lg group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="ml-4">
                  <span className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Email
                  </span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    jamesdeepak092005@gmail.com
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Side: Start project card */}
          <div className="lg:col-span-7 bg-bg-light dark:bg-slate-900 p-8 sm:p-12 rounded-2xl border border-gray-100 dark:border-slate-800 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="p-3 bg-brand/10 dark:bg-cyan-950/40 text-brand dark:text-cyan-400 rounded-xl inline-block">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                Ready to kickstart your project?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg">
                Fill out my structural client registration form to submit your requirements, budget, timeline, and preferred communication. I'll read through your answers and reply with a complete proposed solution.
              </p>
            </div>
            
            <div className="pt-8">
              <button
                onClick={() => navigate('/client-register')}
                className="w-full sm:w-auto px-8 py-4 bg-brand hover:bg-brand-dark text-white font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span>Open Project Inquiry Form</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
