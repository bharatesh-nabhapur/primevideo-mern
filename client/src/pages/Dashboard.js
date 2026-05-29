import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../api';
import './Dashboard.css';

const PLANS = [
  {
    name: 'Mini',
    price: '₹149/mo',
    quality: 'SD',
    devices: 1,
    watchlistLimit: 2,
    color: '#00a8e1',
    icon: '📱',
  },
  {
    name: 'Family',
    price: '₹299/mo',
    quality: 'Full HD',
    devices: 3,
    watchlistLimit: 3,
    color: '#ff9900',
    icon: '👨‍👩‍👧‍👦',
  },
  {
    name: 'Ultra',
    price: '₹599/mo',
    quality: '4K Ultra HD',
    devices: 6,
    watchlistLimit: 4,
    color: '#8b5cf6',
    icon: '👑',
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [movieInput, setMovieInput] = useState('');
  const [genreInput, setGenreInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [watchlistCount, setWatchlistCount] = useState(0);

  // Fetch subscription and watchlist on mount
  useEffect(() => {
    fetchSubscription();
    fetchWatchlist();
  }, []);

  const fetchSubscription = async () => {
    try {
      const { data } = await API.get('/subscriptions');
      if (data.length > 0) {
        setSubscription(data[0]);
      }
    } catch (err) {
      console.error('Error fetching subscription:', err);
    }
  };

  const fetchWatchlist = async () => {
    try {
      const { data } = await API.get('/watchlist');
      setWatchlist(data.movies || []);
      setWatchlistCount(data.watchlistCount || 0);
    } catch (err) {
      console.error('Error fetching watchlist:', err);
    }
  };

  const handleSubscribe = async () => {
    if (!selectedPlan) {
      toast.error('Please select a plan first.');
      return;
    }
    setLoading(true);
    try {
      const { data } = await API.post('/subscribe', { planName: selectedPlan });
      toast.success(data.message);
      setSubscription(data.subscription);
      setSelectedPlan(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Subscription failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleRenew = async () => {
    setLoading(true);
    try {
      const { data } = await API.put('/subscription/renew');
      toast.success(data.message);
      setSubscription(data.subscription);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Renewal failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWatchlist = async () => {
    if (!movieInput.trim()) {
      toast.error('Please enter a movie title.');
      return;
    }
    try {
      const { data } = await API.post('/watchlist/add', {
        title: movieInput.trim(),
        genre: genreInput.trim() || 'Unknown',
      });
      toast.success(data.message);
      setWatchlist((prev) => [...prev, { title: movieInput.trim(), genre: genreInput.trim() || 'Unknown' }]);
      setWatchlistCount(data.watchlistCount);
      setMovieInput('');
      setGenreInput('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add movie.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const isExpired = subscription && new Date(subscription.expiryDate) < new Date();

  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="dash-nav">
        <div className="nav-logo" onClick={() => navigate('/')}>
          <span className="prime-text">prime</span>
          <span className="video-text">video</span>
        </div>
        <div className="dash-nav-right">
          <span className="dash-user">👤 {user.name}</span>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="dash-content">
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <div>
            <h1>Welcome back, {user.name}! 🎬</h1>
            <p>Manage your subscription and watchlist below.</p>
          </div>
          <div className="watchlist-badge">
            <span>🎞️</span>
            <div>
              <strong>{watchlistCount}</strong>
              <p>Watchlist Movies</p>
            </div>
          </div>
        </div>

        {/* Subscription Status */}
        {subscription && (
          <div className={`sub-status ${isExpired ? 'expired' : 'active'}`}>
            <div className="sub-status-left">
              <span className={`status-dot ${isExpired ? 'red' : 'green'}`}></span>
              <div>
                <h3>{subscription.planName} Plan</h3>
                <p>
                  {isExpired
                    ? '⚠️ Subscription Expired — Please renew'
                    : `✅ Active until ${new Date(subscription.expiryDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`}
                </p>
              </div>
            </div>
            <div className="sub-status-right">
              <span className="sub-detail">📺 {subscription.streamingQuality}</span>
              <span className="sub-detail">📱 {subscription.maxDevices} Devices</span>
              <span className="sub-detail">💰 ₹{subscription.monthlyCost}/mo</span>
              <button className="btn-renew" onClick={handleRenew} disabled={loading}>
                🔄 Renew
              </button>
            </div>
          </div>
        )}

        <div className="dash-grid">
          {/* Plans Section */}
          <div className="dash-section">
            <h2>📋 Subscription Plans</h2>
            <p className="dash-section-sub">
              {subscription ? 'Upgrade or change your plan' : 'Choose a plan to get started'}
            </p>
            <div className="dash-plans">
              {PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className={`dash-plan-card ${selectedPlan === plan.name ? 'selected' : ''}`}
                  style={{ '--plan-color': plan.color }}
                  onClick={() => setSelectedPlan(plan.name)}
                >
                  <div className="dp-icon">{plan.icon}</div>
                  <div className="dp-info">
                    <h4>{plan.name}</h4>
                    <span>{plan.price}</span>
                  </div>
                  <div className="dp-details">
                    <span>{plan.quality}</span>
                    <span>{plan.devices} screens</span>
                  </div>
                  {selectedPlan === plan.name && <div className="dp-check">✓</div>}
                </div>
              ))}
            </div>
            <button
              className="btn-subscribe"
              onClick={handleSubscribe}
              disabled={loading || !selectedPlan}
            >
              {loading ? 'Processing...' : `Subscribe to ${selectedPlan || '...'}`}
            </button>
          </div>

          {/* Watchlist Section */}
          <div className="dash-section">
            <h2>🎞️ My Watchlist</h2>
            <p className="dash-section-sub">
              {watchlistCount} movie{watchlistCount !== 1 ? 's' : ''} in your watchlist
              {subscription && ` (limit: ${subscription.watchlistLimit})`}
            </p>

            {/* Add Movie */}
            <div className="add-movie-form">
              <input
                type="text"
                placeholder="Movie title..."
                value={movieInput}
                onChange={(e) => setMovieInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddToWatchlist()}
              />
              <input
                type="text"
                placeholder="Genre (optional)"
                value={genreInput}
                onChange={(e) => setGenreInput(e.target.value)}
              />
              <button onClick={handleAddToWatchlist}>+ Add</button>
            </div>

            {/* Watchlist Items */}
            <div className="watchlist-items">
              {watchlist.length === 0 ? (
                <div className="empty-watchlist">
                  <span>🎬</span>
                  <p>No movies yet. Add some above!</p>
                </div>
              ) : (
                watchlist.map((movie, idx) => (
                  <div key={idx} className="watchlist-item">
                    <div className="wi-num">{idx + 1}</div>
                    <div className="wi-info">
                      <strong>{movie.title}</strong>
                      <span>{movie.genre}</span>
                    </div>
                    <div className="wi-badge">{movie.genre}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
