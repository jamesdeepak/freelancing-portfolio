import React, { useEffect, useState } from 'react';
import { Star, MessageSquare, X, Maximize2 } from 'lucide-react';

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    fetch('/api/reviews/active')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch reviews');
        return res.json();
      })
      .then(data => {
        setReviews(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching testimonials:', err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-bg-light dark:bg-bg-dark border-t border-gray-150 dark:border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand dark:text-cyan-400">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-2 leading-tight">
            CLIENT REVIEWS
          </h2>
          <div className="w-16 h-1 bg-brand mx-auto mt-4 rounded-full"></div>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : reviews.length === 0 ? (
          /* Elegant Empty State */
          <div className="max-w-md mx-auto text-center bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-brand/5 dark:bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto text-brand dark:text-cyan-400">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              No Client Reviews Yet
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              I have just launched my freelancing journey. If we work together on a project, your feedback will appear in this section.
            </p>
            <div className="text-xs font-semibold text-brand dark:text-cyan-400 italic">
              "Your feedback could appear here."
            </div>
          </div>
        ) : (
          /* Testimonials Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((rev) => (
              <div 
                key={rev.id}
                className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col justify-between text-left"
              >
                <div>
                  {/* Star Rating */}
                  <div className="flex space-x-1 text-amber-400 mb-4" aria-label={`Rating: ${rev.rating} out of 5 stars`}>
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < rev.rating ? 'fill-amber-400' : 'text-gray-200 dark:text-slate-700'}`} 
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed italic mb-6">
                    "{rev.review}"
                  </p>
                </div>

                <div>
                  {/* Screenshot Thumbnail */}
                  {rev.imagePath && (
                    <div className="relative group overflow-hidden rounded-lg border border-gray-100 dark:border-slate-800 mb-4 cursor-pointer max-w-[120px] aspect-video">
                      <img 
                        src={rev.imagePath} 
                        alt="Project screenshot thumbnail"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <button
                        type="button"
                        onClick={() => setLightboxImage(rev.imagePath)}
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                        aria-label="Enlarge image"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Client Info */}
                  <div className="border-t border-gray-50 dark:border-slate-800/80 pt-4 flex justify-between items-end">
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                        {rev.name}
                      </h4>
                      {rev.businessName && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {rev.businessName}
                        </p>
                      )}
                    </div>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                      {new Date(rev.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Accessible Lightbox Modal */}
        {lightboxImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
            role="dialog"
            aria-modal="true"
            onClick={() => setLightboxImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh]">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="absolute -top-12 right-0 p-2 bg-slate-900/50 hover:bg-slate-800/50 border border-slate-700 text-white rounded-full focus:outline-none transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Image */}
              <img 
                src={lightboxImage} 
                alt="Enlarged screenshot" 
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border border-slate-800"
                onClick={(e) => e.stopPropagation()} // Stop closing click
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
