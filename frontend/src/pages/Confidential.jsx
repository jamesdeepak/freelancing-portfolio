import React, { useEffect, useState } from 'react';
import { Lock, Eye, Trash2, Check, X, ShieldAlert, LogOut, FileText, Star, Calendar } from 'lucide-react';

export default function Confidential({ navigate }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState('clients');
  const [clients, setClients] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  
  // Edit client states
  const [editStatus, setEditStatus] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [editFollowUp, setEditFollowUp] = useState('');
  const [updatingClient, setUpdatingClient] = useState(false);

  // Check auth status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const res = await fetch('/api/auth/check');
      const data = await res.json();
      if (data.authenticated) {
        setAuthenticated(true);
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Auth check failed:', err);
    } finally {
      setCheckingAuth(false);
    }
  };

  const fetchDashboardData = async () => {
    try {
      // Fetch clients
      const clientsRes = await fetch('/api/admin/clients');
      if (clientsRes.ok) {
        const clientsData = await clientsRes.json();
        setClients(clientsData);
      }

      // Fetch reviews
      const reviewsRes = await fetch('/api/admin/reviews');
      if (reviewsRes.ok) {
        const reviewsData = await reviewsRes.json();
        setReviews(reviewsData);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setAuthenticated(true);
      fetchDashboardData();
    } catch (err) {
      setLoginError(err.message || 'Incorrect password.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setAuthenticated(false);
      setClients([]);
      setReviews([]);
      setSelectedClient(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Client actions
  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setEditStatus(client.status || 'New');
    setEditNotes(client.notes || '');
    setEditFollowUp(client.followUpDate || '');
  };

  const handleUpdateClient = async (e) => {
    e.preventDefault();
    if (!selectedClient) return;
    setUpdatingClient(true);

    try {
      const res = await fetch(`/api/admin/clients/${selectedClient.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: editStatus,
          notes: editNotes,
          followUpDate: editFollowUp
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update client');
      
      // Update local state list
      setClients(prev => prev.map(c => c.id === selectedClient.id ? data.client : c));
      setSelectedClient(data.client);
      alert('Client details updated successfully.');
    } catch (err) {
      alert(err.message || 'Error updating client');
    } finally {
      setUpdatingClient(false);
    }
  };

  // Review actions
  const handleReviewStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/admin/reviews/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to moderate review');

      setReviews(prev => prev.map(r => r.id === id ? data.review : r));
    } catch (err) {
      alert(err.message || 'Error updating review status');
    }
  };

  const handleDeleteReview = async (id) => {
    if (!confirm('Are you sure you want to delete this review permanently?')) return;
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete review');

      setReviews(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      alert(err.message || 'Error deleting review');
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-light dark:bg-bg-dark">
        <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // LOGGED OUT VIEW: Login Panel
  if (!authenticated) {
    return (
      <div className="min-h-screen pt-28 pb-12 flex items-center justify-center bg-bg-light dark:bg-bg-dark px-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-8 rounded-2xl shadow-lg space-y-6 text-left">
          <div className="flex items-center space-x-2 text-brand dark:text-cyan-400">
            <Lock className="w-6 h-6" />
            <h1 className="text-xl font-bold uppercase tracking-wider">
              Admin Login
            </h1>
          </div>
          
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            This dashboard is private and protected by server-side verification. Enter credentials to manage registered clients and review details.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 rounded-lg text-xs font-semibold border border-red-100 dark:border-red-900/30">
                {loginError}
              </div>
            )}
            
            <div>
              <label htmlFor="adminPassword" className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">
                Password
              </label>
              <input
                type="password"
                id="adminPassword"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full px-4 py-3 bg-bg-light dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand text-gray-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 bg-brand hover:bg-brand-dark text-white font-bold rounded-xl transition-colors text-sm shadow-sm flex items-center justify-center"
            >
              {loginLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Unlock Dashboard'
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // LOGGED IN VIEW: Admin Dashboard
  return (
    <div className="min-h-screen pt-28 pb-20 bg-bg-light dark:bg-bg-dark text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 dark:border-slate-800 pb-6 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand dark:text-cyan-400 flex items-center">
              <ShieldAlert className="w-3.5 h-3.5 mr-1" />
              Confidential Area
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
              Admin Control Panel
            </h1>
          </div>
          
          <button
            onClick={handleLogout}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-gray-200 dark:border-slate-700 text-xs font-semibold rounded-lg text-gray-700 dark:text-gray-300 bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-1.5" />
            Logout
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex space-x-2 mb-8 bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-gray-150 dark:border-slate-800/80 inline-flex">
          <button
            onClick={() => { setActiveTab('clients'); setSelectedClient(null); }}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'clients'
                ? 'bg-brand text-white'
                : 'text-gray-600 hover:text-brand dark:text-gray-300 dark:hover:text-cyan-400'
            }`}
          >
            Clients ({clients.length})
          </button>
          <button
            onClick={() => { setActiveTab('reviews'); setSelectedClient(null); }}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'reviews'
                ? 'bg-brand text-white'
                : 'text-gray-600 hover:text-brand dark:text-gray-300 dark:hover:text-cyan-400'
            }`}
          >
            Testimonial Moderation ({reviews.filter(r => r.status === 'pending').length} pending)
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* TAB 1: CLIENTS TABLE & DETAILS */}
          {activeTab === 'clients' && (
            <>
              {/* Clients List Panel */}
              <div className={`bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm overflow-hidden ${
                selectedClient ? 'lg:col-span-7' : 'lg:col-span-12'
              }`}>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-brand" />
                  Client Inquiries
                </h3>

                {clients.length === 0 ? (
                  <p className="text-sm text-gray-500 py-6 text-center">No registered client records found.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs uppercase bg-gray-50 dark:bg-slate-850 text-gray-600 dark:text-gray-400">
                        <tr>
                          <th className="px-4 py-3">Date</th>
                          <th className="px-4 py-3">Name</th>
                          <th className="px-4 py-3">Business</th>
                          <th className="px-4 py-3">Type</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                        {clients.map((c) => (
                          <tr 
                            key={c.id} 
                            onClick={() => handleSelectClient(c)}
                            className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-850/50 transition-colors ${
                              selectedClient?.id === c.id ? 'bg-brand/5 dark:bg-cyan-950/20' : ''
                            }`}
                          >
                            <td className="px-4 py-3 text-xs whitespace-nowrap">
                              {new Date(c.date).toLocaleDateString('en-IN')}
                            </td>
                            <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                              {c.name}
                            </td>
                            <td className="px-4 py-3 text-xs truncate max-w-[120px]">
                              {c.businessName || 'N/A'}
                            </td>
                            <td className="px-4 py-3 text-xs whitespace-nowrap">
                              {c.projectType}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                c.status === 'New' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' :
                                c.status === 'Discussion' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                                c.status === 'In Progress' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300' :
                                c.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                                'bg-gray-100 text-gray-800 dark:bg-slate-800 dark:text-gray-300'
                              }`}>
                                {c.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <button className="text-brand text-xs font-semibold hover:underline">
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Client Detail Sidebar */}
              {selectedClient && (
                <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6 text-left">
                  <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-3">
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      Inquiry Details
                    </h3>
                    <button onClick={() => setSelectedClient(null)} className="text-gray-400 hover:text-gray-650">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <span className="text-gray-400 block uppercase font-bold tracking-wider">Client Info</span>
                      <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">{selectedClient.name}</p>
                      <p className="text-gray-600 dark:text-gray-400">{selectedClient.email} &bull; {selectedClient.phone || 'No phone'}</p>
                      <p className="text-gray-500 mt-0.5">Address: {selectedClient.address}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-gray-400 block uppercase font-bold tracking-wider">Budget</span>
                        <p className="font-semibold text-gray-900 dark:text-white">{selectedClient.budget}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 block uppercase font-bold tracking-wider">Timeline</span>
                        <p className="font-semibold text-gray-900 dark:text-white">{selectedClient.timeline}</p>
                      </div>
                    </div>

                    <div>
                      <span className="text-gray-400 block uppercase font-bold tracking-wider">Project Type</span>
                      <p className="font-semibold text-gray-900 dark:text-white">{selectedClient.projectType}</p>
                    </div>

                    <div>
                      <span className="text-gray-400 block uppercase font-bold tracking-wider">Requirements</span>
                      <p className="text-gray-700 dark:text-gray-300 mt-1 whitespace-pre-line bg-gray-50 dark:bg-slate-850 p-3 rounded-lg border border-gray-100 dark:border-slate-800 leading-relaxed text-[13px]">
                        {selectedClient.requirement}
                      </p>
                    </div>

                    {selectedClient.additionalDetails && (
                      <div>
                        <span className="text-gray-400 block uppercase font-bold tracking-wider">Additional details</span>
                        <p className="text-gray-600 dark:text-gray-400 mt-1 whitespace-pre-line bg-gray-50 dark:bg-slate-850 p-3 rounded-lg border border-gray-100 dark:border-slate-800 leading-relaxed">
                          {selectedClient.additionalDetails}
                        </p>
                      </div>
                    )}

                    {selectedClient.referenceWebsite && (
                      <div>
                        <span className="text-gray-400 block uppercase font-bold tracking-wider">Reference Link</span>
                        <a href={selectedClient.referenceWebsite} target="_blank" rel="noreferrer" className="text-brand dark:text-cyan-400 hover:underline mt-0.5 block truncate">
                          {selectedClient.referenceWebsite}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Private update form */}
                  <form onSubmit={handleUpdateClient} className="border-t border-gray-100 dark:border-slate-800 pt-6 space-y-4">
                    <span className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                      Admin Management (Confidential)
                    </span>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                        Inquiry Status
                      </label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-xs text-gray-900 dark:text-white"
                      >
                        <option>New</option>
                        <option>Contacted</option>
                        <option>Discussion</option>
                        <option>Proposal Sent</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                        <option>Closed</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                        Follow-Up Date
                      </label>
                      <input
                        type="date"
                        value={editFollowUp}
                        onChange={(e) => setEditFollowUp(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-xs text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                        Private Notes
                      </label>
                      <textarea
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        rows={3}
                        placeholder="Add private meeting notes, quotes, or agreements here. (Never shown to client)"
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-xs text-gray-900 dark:text-white resize-y"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={updatingClient}
                      className="w-full inline-flex items-center justify-center py-2.5 bg-brand hover:bg-brand-dark text-white font-bold rounded-lg text-xs transition-colors"
                    >
                      {updatingClient ? 'Saving notes...' : 'Save Private Changes'}
                    </button>
                  </form>
                </div>
              )}
            </>
          )}

          {/* TAB 2: REVIEWS MODERATION */}
          {activeTab === 'reviews' && (
            <div className="lg:col-span-12 space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-brand" />
                  Testimonial Moderation
                </h3>

                {reviews.length === 0 ? (
                  <p className="text-sm text-gray-500 py-6 text-center">No reviews have been submitted yet.</p>
                ) : (
                  <div className="space-y-6">
                    {reviews.map((rev) => (
                      <div 
                        key={rev.id} 
                        className={`p-6 rounded-xl border flex flex-col md:flex-row justify-between md:items-start gap-4 text-xs ${
                          rev.status === 'pending' ? 'bg-amber-50/20 dark:bg-amber-950/10 border-amber-250 dark:border-amber-900/30' :
                          rev.status === 'approved' ? 'bg-white dark:bg-slate-850/20 border-gray-100 dark:border-slate-800' :
                          'bg-red-50/10 dark:bg-red-950/5 border-red-200/30 dark:border-red-900/20'
                        }`}
                      >
                        <div className="space-y-3 max-w-3xl text-left">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-sm text-gray-900 dark:text-white">
                              {rev.name}
                            </span>
                            <span className="text-gray-400">({rev.email})</span>
                            {rev.businessName && (
                              <span className="text-gray-400 font-semibold bg-gray-50 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                                {rev.businessName}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-1 text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400' : 'text-gray-200 dark:text-slate-850'}`} 
                              />
                            ))}
                            <span className="text-[10px] text-gray-400 font-medium ml-1.5">
                              Submitted: {new Date(rev.date).toLocaleString('en-IN')}
                            </span>
                          </div>

                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm bg-white/40 dark:bg-slate-900/40 p-3 rounded border border-gray-50 dark:border-slate-800/50">
                            "{rev.review}"
                          </p>

                          {rev.imagePath && (
                            <div className="pt-2">
                              <span className="text-gray-400 block font-bold uppercase tracking-wider mb-1.5">Attached Image</span>
                              <a href={rev.imagePath} target="_blank" rel="noreferrer" className="inline-block relative overflow-hidden rounded-lg border border-gray-200 dark:border-slate-700 aspect-video w-32 shadow-sm hover:opacity-90 transition-opacity">
                                <img src={rev.imagePath} alt="Uploaded review screenshot" className="w-full h-full object-cover" />
                              </a>
                            </div>
                          )}
                        </div>

                        {/* Control Actions */}
                        <div className="flex flex-row md:flex-col md:space-y-2 gap-2 justify-end self-end md:self-start md:min-w-[120px]">
                          {rev.status !== 'approved' && (
                            <button
                              onClick={() => handleReviewStatus(rev.id, 'approved')}
                              className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg text-[10px] uppercase shadow-sm"
                            >
                              <Check className="w-3.5 h-3.5 mr-1" />
                              Approve
                            </button>
                          )}
                          
                          {rev.status !== 'rejected' && (
                            <button
                              onClick={() => handleReviewStatus(rev.id, 'rejected')}
                              className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-amber-500 hover:bg-amber-650 text-white font-bold rounded-lg text-[10px] uppercase shadow-sm"
                            >
                              <X className="w-3.5 h-3.5 mr-1" />
                              Reject
                            </button>
                          )}

                          <button
                            onClick={() => handleDeleteReview(rev.id)}
                            className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-red-650 hover:bg-red-700 text-white font-bold rounded-lg text-[10px] uppercase shadow-sm"
                          >
                            <Trash2 className="w-3.5 h-3.5 mr-1" />
                            Delete
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
