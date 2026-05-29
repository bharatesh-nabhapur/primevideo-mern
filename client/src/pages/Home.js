import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const plans = [
  {
    name: 'Mini',
    price: '₹149',
    quality: 'SD',
    devices: 1,
    watchlist: 10,
    color: '#00a8e1',
    icon: '📱',
    features: ['1 Screen at a time', 'SD Quality', 'Mobile only', '2 Watchlist items'],
  },
  {
    name: 'Family',
    price: '₹299',
    quality: 'Full HD',
    devices: 3,
    watchlist: 3,
    color: '#ff9900',
    icon: '👨‍👩‍👧‍👦',
    features: ['3 Screens at a time', 'Full HD Quality', 'TV + Mobile', '3 Watchlist items'],
    popular: true,
  },
  {
    name: 'Ultra',
    price: '₹599',
    quality: '4K Ultra HD',
    devices: 6,
    watchlist: 4,
    color: '#8b5cf6',
    icon: '👑',
    features: ['6 Screens at a time', '4K Ultra HD + HDR', 'All Devices', '4 Watchlist items'],
  },
];

const categories = [
  {
    name: 'Kids',
    icon: '🧒',
    color: '#ff9900',
    movies: [
      { title: 'Moana', img: 'https://image.tmdb.org/t/p/w300/6KErczPBROQty7QoIsaa6wJYXZi.jpg' },
      { title: 'Kung Fu Panda', img: 'https://image.tmdb.org/t/p/w300/wWt4JCx7ck53YvIOyOQdNRMBJAr.jpg' },
      { title: 'The Lion King', img: 'https://image.tmdb.org/t/p/w300/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg' },
      { title: 'Frozen', img: 'https://image.tmdb.org/t/p/w300/kgwjIb2JDHRhNk13lmSxiClFjVk.jpg' },
      { title: 'Toy Story', img: 'https://image.tmdb.org/t/p/w300/uXDfjJbdP4ijW5hWSBrPl9KcertP.jpg' },
      { title: 'Finding Nemo', img: 'https://image.tmdb.org/t/p/w300/eHuGQ10FUzK1mdOY69wF5pGgEf5.jpg' },
    ],
  },
  {
    name: 'Horror',
    icon: '👻',
    color: '#ff4444',
    movies: [
      { title: 'The Conjuring', img: 'https://image.tmdb.org/t/p/w300/wVYREutTvI2tmxr6ujrHT704wGF.jpg' },
      { title: 'It', img: 'https://image.tmdb.org/t/p/w300/9E2y5Q7WlCVNEhP5GkVComRqLZP.jpg' },
      { title: 'A Quiet Place', img: 'https://image.tmdb.org/t/p/w300/nAU74GmpUk7t5iklEp3bufwDq4n.jpg' },
      { title: 'Get Out', img: 'https://image.tmdb.org/t/p/w300/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg' },
      { title: 'Hereditary', img: 'https://image.tmdb.org/t/p/w300/4O1e0pBMkPMSLSydnknSbHqFnmm.jpg' },
      { title: 'The Nun', img: 'https://image.tmdb.org/t/p/w300/sFC1ElvoKGdHJIWRpNB3xWJ9lJA.jpg' },
    ],
  },
  {
    name: 'Drama',
    icon: '🎭',
    color: '#8b5cf6',
    movies: [
      { title: 'The Godfather', img: 'https://image.tmdb.org/t/p/w300/3bhkrj58Vtu7enYsLegHnDmni2.jpg' },
      { title: 'Forrest Gump', img: 'https://image.tmdb.org/t/p/w300/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg' },
      { title: 'Schindlers List', img: 'https://image.tmdb.org/t/p/w300/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg' },
      { title: 'The Shawshank', img: 'https://image.tmdb.org/t/p/w300/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg' },
      { title: 'Titanic', img: 'https://image.tmdb.org/t/p/w300/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg' },
      { title: 'Good Will Hunting', img: 'https://image.tmdb.org/t/p/w300/bABCBKYBK7A5G2Bao4OHOtHoGmP.jpg' },
    ],
  },
  {
    name: 'Action',
    icon: '💥',
    color: '#00a8e1',
    movies: [
      { title: 'John Wick', img: 'https://image.tmdb.org/t/p/w300/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg' },
      { title: 'Mad Max Fury Road', img: 'https://image.tmdb.org/t/p/w300/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg' },
      { title: 'Top Gun Maverick', img: 'https://image.tmdb.org/t/p/w300/62HCnUTziyWcpDaBO2i1DX17ljH.jpg' },
      { title: 'The Dark Knight', img: 'https://image.tmdb.org/t/p/w300/qJ2tW6WMUDux911r6m7haRef0WH.jpg' },
      { title: 'Avengers Endgame', img: 'https://image.tmdb.org/t/p/w300/or06FN3Dka5tukK1e9sl16pB3iy.jpg' },
      { title: 'Mission Impossible', img: 'https://image.tmdb.org/t/p/w300/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg' },
    ],
  },
];

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="home">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-logo">
          <span className="prime-text">prime</span>
          <span className="video-text">video</span>
        </div>
        <div className="nav-links">
          <a href="#plans">Plans</a>
          <a href="#movies">Categories</a>
          {token ? (
            <>
              <span className="nav-user">👤 {user?.name}</span>
              <button className="btn-nav" onClick={() => navigate('/dashboard')}>Dashboard</button>
              <button className="btn-nav btn-outline" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button className="btn-nav" onClick={() => navigate('/login')}>Sign In</button>
              <button className="btn-nav btn-primary" onClick={() => navigate('/register')}>
                Start Free Trial
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">🎬 Amazon Prime Video</div>
          <h1 className="hero-title">
            Unlimited Movies,<br />
            <span className="highlight">TV Shows & More</span>
          </h1>
          <p className="hero-subtitle">
            Watch anywhere. Cancel anytime. Start your 30-day free trial today.
          </p>
          <div className="hero-actions">
            {token ? (
              <button className="btn-hero" onClick={() => navigate('/dashboard')}>
                Go to Dashboard →
              </button>
            ) : (
              <>
                <button className="btn-hero" onClick={() => navigate('/register')}>
                  Get Started Free
                </button>
                <button className="btn-hero-outline" onClick={() => navigate('/login')}>
                  Sign In
                </button>
              </>
            )}
          </div>
          <div className="hero-stats">
            <div className="stat"><span>200M+</span><p>Subscribers</p></div>
            <div className="stat"><span>50K+</span><p>Titles</p></div>
            <div className="stat"><span>240+</span><p>Countries</p></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card-stack">
            <div className="floating-card card1">🎬 The Boys S4</div>
            <div className="floating-card card2">🏆 Award Winner</div>
            <div className="floating-card card3">📺 4K Ultra HD</div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="plans-section" id="plans">
        <h2 className="section-title">Choose Your Plan</h2>
        <p className="section-subtitle">All plans include a 30-day free trial</p>
        <div className="plans-grid">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`plan-card ${plan.popular ? 'popular' : ''}`}
              style={{ '--plan-color': plan.color }}
            >
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              <div className="plan-icon">{plan.icon}</div>
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price">
                {plan.price}<span>/month</span>
              </div>
              <div className="plan-quality">{plan.quality}</div>
              <ul className="plan-features">
                {plan.features.map((f, i) => (
                  <li key={i}>✓ {f}</li>
                ))}
              </ul>
              <button
                className="btn-plan"
                onClick={() => navigate(token ? '/dashboard' : '/register')}
              >
                {token ? 'Subscribe Now' : 'Start Free Trial'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Categories & Movies Section */}
      <section className="movies-section" id="movies">
        <h2 className="section-title">Browse by Category</h2>
        <p className="section-subtitle">Something for everyone in the family</p>

        {categories.map((cat) => (
          <div key={cat.name} className="category-block">
            <div className="category-header" style={{ '--cat-color': cat.color }}>
              <span className="cat-icon">{cat.icon}</span>
              <h3>{cat.name}</h3>
              <span className="cat-count">{cat.movies.length} titles</span>
            </div>
            <div className="movies-grid">
              {cat.movies.map((movie) => (
                <div key={movie.title} className="movie-card">
                  <div className="movie-thumb" style={{ '--cat-color': cat.color }}>
                    <img
                      src={movie.img}
                      alt={movie.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.querySelector('.movie-placeholder').style.display = 'flex';
                      }}
                    />
                    <div className="movie-placeholder" style={{ display: 'none', background: `linear-gradient(135deg, ${cat.color}22, #0d1b2a)`, color: cat.color, fontSize: '2rem', fontWeight: '700' }}>
                      {movie.title[0]}
                    </div>
                    <div className="movie-overlay">
                      <span className="movie-genre" style={{ background: cat.color }}>{cat.name}</span>
                      <button
                        className="btn-watchlist"
                        onClick={() => navigate(token ? '/dashboard' : '/login')}
                      >
                        + Watchlist
                      </button>
                    </div>
                  </div>
                  <p className="movie-title">{movie.title}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Prime Video?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span>📺</span>
            <h4>Watch on Any Device</h4>
            <p>Stream on your TV, laptop, phone, or tablet.</p>
          </div>
          <div className="feature-card">
            <span>⬇️</span>
            <h4>Download & Watch</h4>
            <p>Download titles to watch offline, anywhere.</p>
          </div>
          <div className="feature-card">
            <span>🚫</span>
            <h4>No Ads</h4>
            <p>Enjoy uninterrupted streaming with no ads.</p>
          </div>
          <div className="feature-card">
            <span>🔄</span>
            <h4>Cancel Anytime</h4>
            <p>No commitments. Cancel your plan anytime.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">
          <span className="prime-text">prime</span>
          <span className="video-text">video</span>
        </div>
        <p>© 2024 Amazon Prime Video. All rights reserved.</p>
        <div className="footer-links">
          <a href="#plans">Plans</a>
          <a href="#movies">Movies</a>
          <a href="#features">Help</a>
        </div>
      </footer>
    </div>
  );
}
