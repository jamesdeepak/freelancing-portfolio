import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle.jsx';

export default function Navbar({ currentPath, navigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Work', id: 'work' },
    { label: 'Process', id: 'process' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id) => {
    setIsOpen(false);
    if (currentPath !== '/') {
      navigate('/');
      // Allow react rendering then scroll
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-md border-b border-gray-200/50 dark:border-slate-800/50 shadow-sm py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
            <span className="font-bold text-xl tracking-tight text-charcoal dark:text-white">
              D.<span className="text-brand">Deepak</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-sm font-medium text-gray-600 hover:text-brand dark:text-gray-300 dark:hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Actions & Theme toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => navigate('/client-register')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg text-white bg-brand hover:bg-brand-dark transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand dark:focus:ring-offset-bg-dark"
            >
              Start a Project
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800 transition-colors focus:outline-none"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <div className={`md:hidden fixed top-[60px] left-0 w-full h-[calc(100vh-60px)] bg-bg-light dark:bg-bg-dark border-t border-gray-200 dark:border-slate-800 px-4 py-6 transition-all duration-300 ease-in-out transform ${
        isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="text-left text-lg font-medium py-2 border-b border-gray-100 dark:border-slate-800 text-gray-700 hover:text-brand dark:text-gray-200 dark:hover:text-cyan-400"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setIsOpen(false);
              navigate('/client-register');
            }}
            className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent text-base font-semibold rounded-lg text-white bg-brand hover:bg-brand-dark transition-colors mt-4"
          >
            Start a Project
            <ArrowUpRight className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>
    </nav>
  );
}
