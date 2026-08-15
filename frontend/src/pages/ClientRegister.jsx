import React, { useState } from 'react';
import { CheckCircle2, ArrowLeft, Send } from 'lucide-react';

export default function ClientRegister({ navigate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    businessName: '',
    projectType: 'Business Website',
    requirement: '',
    budget: '$500 - $1,500',
    timeline: '2-4 weeks',
    preferredContact: 'Email',
    additionalDetails: '',
    referenceWebsite: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Frontend validations
    if (!formData.name.trim() || !formData.email.trim() || !formData.address.trim() || !formData.requirement.trim()) {
      setError('Please fill in all required fields (Name, Email, Address, and Project Requirements).');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/clients/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit inquiry.');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
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
            Your project details have been received. I'll read through your requirements and get back to you soon.
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-brand dark:text-gray-400 dark:hover:text-cyan-400 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Home
        </button>

        {/* Title Block */}
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-brand dark:text-cyan-400">
            Get Started
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-1 leading-tight">
            LET'S TALK ABOUT YOUR PROJECT.
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Tell me a little about your project so I can understand what you need.
          </p>
        </div>

        {/* Form Container */}
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
                  placeholder="e.g. John Doe"
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
                  placeholder="e.g. john@gmail.com"
                  className="w-full px-4 py-3 bg-bg-light dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand text-gray-900 dark:text-white"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phone" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 9876543210"
                  className="w-full px-4 py-3 bg-bg-light dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand text-gray-900 dark:text-white"
                />
              </div>

              {/* Business Name */}
              <div>
                <label htmlFor="businessName" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="e.g. Acme Corp"
                  className="w-full px-4 py-3 bg-bg-light dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Address / Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g. Chennai, India"
                className="w-full px-4 py-3 bg-bg-light dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand text-gray-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Project Type */}
              <div>
                <label htmlFor="projectType" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-bg-light dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand text-gray-900 dark:text-white"
                >
                  <option>Business Website</option>
                  <option>Web Application</option>
                  <option>AI-Powered Solution</option>
                  <option>Website Redesign</option>
                  <option>Other / Integration</option>
                </select>
              </div>

              {/* Budget Range */}
              <div>
                <label htmlFor="budget" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-bg-light dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand text-gray-900 dark:text-white"
                >
                  <option>Under $500</option>
                  <option>$500 - $1,500</option>
                  <option>$1,500 - $3,000</option>
                  <option>$3,000+</option>
                  <option>Flexible / Discuss</option>
                </select>
              </div>

              {/* Timeline */}
              <div>
                <label htmlFor="timeline" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Expected Timeline
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-bg-light dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand text-gray-900 dark:text-white"
                >
                  <option>Less than 2 weeks</option>
                  <option>2-4 weeks</option>
                  <option>1-2 months</option>
                  <option>Flexible</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Preferred Contact Method */}
              <div>
                <label htmlFor="preferredContact" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Preferred Contact
                </label>
                <select
                  id="preferredContact"
                  name="preferredContact"
                  value={formData.preferredContact}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-bg-light dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand text-gray-900 dark:text-white"
                >
                  <option>Email</option>
                  <option>WhatsApp</option>
                  <option>Phone Call</option>
                </select>
              </div>

              {/* Reference Website */}
              <div>
                <label htmlFor="referenceWebsite" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Reference Website (if any)
                </label>
                <input
                  type="url"
                  id="referenceWebsite"
                  name="referenceWebsite"
                  value={formData.referenceWebsite}
                  onChange={handleChange}
                  placeholder="e.g. https://google.com"
                  className="w-full px-4 py-3 bg-bg-light dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Requirement */}
            <div>
              <label htmlFor="requirement" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Project Requirement <span className="text-red-500">*</span>
              </label>
              <textarea
                id="requirement"
                name="requirement"
                required
                rows={4}
                value={formData.requirement}
                onChange={handleChange}
                placeholder="Please describe what you need to build, what pages you have in mind, and what features are required..."
                className="w-full px-4 py-3 bg-bg-light dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand text-gray-900 dark:text-white resize-y"
              ></textarea>
            </div>

            {/* Additional Details */}
            <div>
              <label htmlFor="additionalDetails" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Additional Details (Optional)
              </label>
              <textarea
                id="additionalDetails"
                name="additionalDetails"
                rows={3}
                value={formData.additionalDetails}
                onChange={handleChange}
                placeholder="Any special integration, domain details, or notes..."
                className="w-full px-4 py-3 bg-bg-light dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand text-gray-900 dark:text-white resize-y"
              ></textarea>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center px-6 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-brand hover:bg-brand-dark transition-colors disabled:bg-brand/50 disabled:cursor-not-allowed shadow-md"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Registering Inquiry...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Project Inquiry
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
