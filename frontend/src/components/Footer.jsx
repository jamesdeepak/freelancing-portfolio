import React from 'react';
import { Phone, MessageSquare, Linkedin } from 'lucide-react';

export default function Footer({ currentPath, navigate }) {
  const handleLinkClick = (id) => {
    if (currentPath !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-light dark:bg-bg-dark border-t border-gray-200/50 dark:border-slate-900/80 py-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-8 border-b border-gray-200/40 dark:border-slate-800/60">
          
          {/* Logo & Description */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-bold text-xl tracking-tight text-charcoal dark:text-white">
              D.<span className="text-brand">Deepak</span>
            </span>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Freelance Web Developer & AI Enthusiast
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed max-w-sm">
              Building modern, high-converting digital experiences for businesses, professionals, and individuals with clean code and AI integration.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <button 
                onClick={() => handleLinkClick('home')} 
                className="text-left text-gray-600 hover:text-brand dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => handleLinkClick('about')} 
                className="text-left text-gray-600 hover:text-brand dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => handleLinkClick('services')} 
                className="text-left text-gray-600 hover:text-brand dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
              >
                Services
              </button>
              <button 
                onClick={() => handleLinkClick('work')} 
                className="text-left text-gray-600 hover:text-brand dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
              >
                Work
              </button>
              <button 
                onClick={() => handleLinkClick('process')} 
                className="text-left text-gray-600 hover:text-brand dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
              >
                Process
              </button>
              <button 
                onClick={() => handleLinkClick('testimonials')} 
                className="text-left text-gray-600 hover:text-brand dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
              >
                Testimonials
              </button>
              <button 
                onClick={() => handleLinkClick('contact')} 
                className="text-left text-gray-600 hover:text-brand dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Social connections */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
              Social Links
            </h4>
            <div className="flex flex-col space-y-3 text-sm">
              <a
                href="https://www.linkedin.com/in/deepak-ai-tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-gray-600 hover:text-brand dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn Profile
              </a>
              <a
                href="tel:9500142806"
                className="inline-flex items-center text-gray-600 hover:text-brand dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                +91 9500142806
              </a>
              <a
                href="https://wa.me/919500142806"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                WhatsApp Chat
              </a>
            </div>
          </div>

        </div>

        {/* Footer bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 text-xs text-gray-400 dark:text-gray-500">
          <span>
            &copy; {currentYear} Deepak. All rights reserved.
          </span>
          <div className="mt-2 sm:mt-0 space-x-4">
            <span>B.Tech AI & Data Science Student</span>
            <span>&bull;</span>
            <span>Based in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
