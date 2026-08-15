import React, { useState, useRef } from 'react';
import { Star, ArrowLeft, Upload, X, CheckCircle2 } from 'lucide-react';

export default function Review({ navigate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    rating: 5,
    review: ''
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingClick = (val) => {
    setFormData(prev => ({ ...prev, rating: val }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Only JPG, JPEG, PNG, and WEBP are supported.');
      return;
    }

    // Validate size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size is too large. Max limit is 5MB.');
      return;
    }

    setError(null);
    setSelectedImage(file);
    
    // Read preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Front-end validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.review.trim()) {
      setError('Name, Email, and Review text are required.');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please provide a valid email address.');
      setLoading(false);
      return;
    }

    // Prepare Multipart Form Data since we have an image upload
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('businessName', formData.businessName);
    data.append('rating', formData.rating);
    data.append('review', formData.review);
    if (selectedImage) {
      data.append('image', selectedImage);
    }

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        body: data // Fetch handles boundary automatically for FormData
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit review.');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Review submission error:', err);
      setError(err.message || 'Error occurred while saving review.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-28 pb-12 flex items-center justify-center bg-bg-light dark:bg-bg-dark px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-8 rounded-3xl shadow-lg text-center space-y-6 animate-fade-in">
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/40 rounded-full flex items-center justify-center mx-auto text-emerald-500">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            THANK YOU!
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Your review has been submitted. To prevent spam, reviews go through a brief moderation check and will appear publicly once approved.
          </p>
          <div className="pt-4">
            <button
              onClick={() => navigate('/')}
              className="w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-sm font-semibold rounded-lg text-white bg-brand hover:bg-brand-dark transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-bg-light dark:bg-bg-dark text-left">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-brand dark:text-gray-400 dark:hover:text-cyan-400 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Home
        </button>

        {/* Title */}
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-brand dark:text-cyan-400">
            Share Feedback
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-1 leading-tight">
            HOW WAS YOUR EXPERIENCE?
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Leave a review detailing our project experience. Your review helps build real client trust.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 rounded-lg text-sm font-semibold border border-red-100 dark:border-red-900/30">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-4 py-3 bg-bg-light dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand text-gray-900 dark:text-white"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Gmail / Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. sarah@gmail.com"
                  className="w-full px-4 py-3 bg-bg-light dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Business / Project Name */}
            <div>
              <label htmlFor="businessName" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Project / Business Name
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="e.g. Raja Transport"
                className="w-full px-4 py-3 bg-bg-light dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand text-gray-900 dark:text-white"
              />
            </div>

            {/* Rating Stars Interface */}
            <div>
              <span className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Project Rating <span className="text-red-500">*</span>
              </span>
              <div className="flex items-center space-x-2" role="radiogroup" aria-label="Rating slider">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleRatingClick(val)}
                    onMouseEnter={() => setHoverRating(val)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 focus:outline-none transition-transform active:scale-95"
                    role="radio"
                    aria-checked={formData.rating === val}
                    aria-label={`${val} Star${val > 1 ? 's' : ''}`}
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        (hoverRating || formData.rating) >= val
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-gray-200 dark:text-slate-700'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-sm font-semibold text-gray-500 ml-2">
                  ({formData.rating} out of 5)
                </span>
              </div>
            </div>

            {/* Review text */}
            <div>
              <label htmlFor="review" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Review Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="review"
                name="review"
                required
                rows={4}
                value={formData.review}
                onChange={handleChange}
                placeholder="Describe your experience working together, what features were built, quality of response..."
                className="w-full px-4 py-3 bg-bg-light dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand text-gray-900 dark:text-white resize-y"
              ></textarea>
            </div>

            {/* Optional screenshot upload */}
            <div>
              <span className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Upload Screenshot / Project Image (Optional)
              </span>
              
              {!imagePreview ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 dark:border-slate-800 hover:border-brand/40 dark:hover:border-cyan-500/30 rounded-xl p-6 text-center cursor-pointer transition-colors"
                >
                  <Upload className="w-8 h-8 mx-auto text-gray-450 mb-2" />
                  <span className="text-xs font-medium text-gray-500 block">
                    Support JPG, JPEG, PNG, WEBP (Max 5MB)
                  </span>
                  <span className="text-xs text-brand font-semibold mt-1 inline-block">
                    Click to select file
                  </span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.webp"
                    className="hidden"
                  />
                </div>
              ) : (
                /* Image preview container */
                <div className="relative inline-block mt-1">
                  <img 
                    src={imagePreview} 
                    alt="Preview of screenshot" 
                    className="max-h-48 rounded-xl border border-gray-200 dark:border-slate-800 object-contain shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute -top-2.5 -right-2.5 p-1 bg-red-500 text-white hover:bg-red-650 rounded-full shadow transition-colors"
                    aria-label="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center px-6 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-brand hover:bg-brand-dark transition-colors disabled:bg-brand/50 disabled:cursor-not-allowed shadow-md"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Submitting Feedback...
                  </>
                ) : (
                  <>
                    Submit Review
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
