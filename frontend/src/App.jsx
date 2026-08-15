import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import ClientRegister from './pages/ClientRegister.jsx';
import Review from './pages/Review.jsx';
import Confidential from './pages/Confidential.jsx';
import { Phone, MessageSquare, Calendar } from 'lucide-react';

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigate = (to) => {
    window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Render correct page view
  const renderPage = () => {
    switch (path) {
      case '/':
      case '':
        return <Home navigate={navigate} />;
      case '/client-register':
        return <ClientRegister navigate={navigate} />;
      case '/review':
        return <Review navigate={navigate} />;
      case '/confidential':
        return <Confidential navigate={navigate} />;
      default:
        // Accessible Fallback 404 page
        return (
          <div className="min-h-screen pt-28 pb-12 flex flex-col items-center justify-center bg-bg-light dark:bg-bg-dark text-center px-4">
            <span className="text-4xl font-extrabold text-brand mb-4">404</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
              Page Not Found
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
              The page you are looking for does not exist or has been moved.
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-5 py-2.5 bg-brand hover:bg-brand-dark text-white font-bold rounded-lg text-sm shadow transition-colors"
            >
              Go Back Home
            </button>
          </div>
        );
    }
  };

  // Check if we should display the mobile bottom bar
  // Only display on home page or contact routes to avoid cluttering forms
  const showMobileBar = path === '/';

  return (
    <div className="flex flex-col min-h-screen bg-bg-light dark:bg-bg-dark text-charcoal dark:text-gray-100 transition-colors duration-300">
      
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand text-white px-4 py-2.5 rounded-lg z-50 font-bold shadow-md">
        Skip to main content
      </a>

      {/* Sticky Header Navbar */}
      <Navbar currentPath={path} navigate={navigate} />

      {/* Main Page Area */}
      <main id="main-content" className={`flex-grow ${showMobileBar ? 'pb-16 md:pb-0' : ''}`}>
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer currentPath={path} navigate={navigate} />

      {/* Sticky Mobile Contact Bar */}
      {showMobileBar && (
        <div className="md:hidden fixed bottom-0 left-0 w-full z-45 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-gray-200/50 dark:border-slate-800/80 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] px-4 py-3 flex items-center justify-between gap-3 animate-fade-in select-none">
          <a
            href="tel:9500142806"
            className="flex-1 inline-flex items-center justify-center py-2.5 px-3 rounded-xl bg-blue-50 text-brand border border-blue-100 dark:bg-blue-950/30 dark:text-cyan-400 dark:border-blue-900/30 text-xs font-bold transition-all active:scale-95"
          >
            <Phone className="w-4 h-4 mr-1.5" />
            Call
          </a>
          <a
            href="https://wa.me/919500142806"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center py-2.5 px-3 rounded-xl bg-green-50 text-green-600 border border-green-100 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900/30 text-xs font-bold transition-all active:scale-95"
          >
            <MessageSquare className="w-4 h-4 mr-1.5" />
            WhatsApp
          </a>
          <button
            onClick={() => navigate('/client-register')}
            className="flex-1 inline-flex items-center justify-center py-2.5 px-3 rounded-xl bg-brand hover:bg-brand-dark text-white text-xs font-bold shadow-sm transition-all active:scale-95"
          >
            <Calendar className="w-4 h-4 mr-1.5" />
            Start Project
          </button>
        </div>
      )}

    </div>
  );
}
