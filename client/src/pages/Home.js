import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../api';
import './Home.css';

const plans = [
  {
    name: 'Mini', price: '₹149', quality: 'SD', devices: 1,
    color: '#00a8e1', icon: '📱',
    features: ['1 Screen at a time', 'SD Quality', 'Mobile only', '2 Watchlist items'],
  },
  {
    name: 'Family', price: '₹299', quality: 'Full HD', devices: 3,
    color: '#ff9900', icon: '👨‍👩‍👧‍👦', popular: true,
    features: ['3 Screens at a time', 'Full HD Quality', 'TV + Mobile', '3 Watchlist items'],
  },
  {
    name: 'Ultra', price: '₹599', quality: '4K Ultra HD', devices: 6,
    color: '#8b5cf6', icon: '👑',
    features: ['6 Screens at a time', '4K Ultra HD + HDR', 'All Devices', '4 Watchlist items'],
  },
];

// Hero banner slides
const heroSlides = [
  {
    title: 'The Boys',
    subtitle: 'Season 4',
    desc: 'A group of vigilantes set out to take down corrupt superheroes.',
    badge: '#2 in India',
    rating: '★★★★★',
    bg: 'linear-gradient(to right, #0a0a0a 30%, transparent 100%), url(https://image.tmdb.org/t/p/original/mY7SeH4HFFxW1hiI6cWuwCRKptN.jpg)',
    genre: 'Action',
  },
  {
    title: 'Top Gun: Maverick',
    subtitle: 'Now Streaming',
    desc: 'After thirty years, Maverick is still pushing the envelope as a top naval aviator.',
    badge: '#1 in India',
    rating: '★★★★★',
    bg: 'linear-gradient(to right, #0a0a0a 30%, transparent 100%), url(https://image.tmdb.org/t/p/original/62HCnUTziyWcpDaBO2i1DX17ljH.jpg)',
    genre: 'Action',
  },
  {
    title: 'The Dark Knight',
    subtitle: 'Christopher Nolan',
    desc: 'Batman faces the Joker, a criminal mastermind who wants to plunge Gotham into anarchy.',
    badge: 'IMDb Top 10',
    rating: '★★★★★',
    bg: 'linear-gradient(to right, #0a0a0a 30%, transparent 100%), url(https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg)',
    genre: 'Action',
  },
  {
    title: 'Frozen',
    subtitle: 'Disney Classic',
    desc: 'A fearless princess sets off on an epic journey to find her estranged sister.',
    badge: 'Kids Favourite',
    rating: '★★★★☆',
    bg: 'linear-gradient(to right, #0a0a0a 30%, transparent 100%), url(https://image.tmdb.org/t/p/original/kgwjIb2JDHRhNk13lmSxiClFjVk.jpg)',
    genre: 'Kids',
  },
  {
    title: 'The Conjuring',
    subtitle: 'Horror',
    desc: 'Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence.',
    badge: 'Top Horror',
    rating: '★★★★☆',
    bg: 'linear-gradient(to right, #0a0a0a 30%, transparent 100%), url(https://image.tmdb.org/t/p/original/wVYREutTvI2tmxr6ujrHT704wGF.jpg)',
    genre: 'Horror',
  },
];

const categories = [
  {
    name: 'Kids', icon: '🧒', color: '#ff9900',
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
    name: 'Horror', icon: '👻', color: '#ff4444',
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
    name: 'Drama', icon: '🎭', color: '#8b5cf6',
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
    name: 'Action', icon: '💥', color: '#00a8e1',
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

// Horizontal scrollable category row component
function CategoryRow({ cat, handleAddToWatchlist }) {
  const rowRef = useRef(null);

  const scroll = (dir) => {
    rowRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  return (
    <div className="category-block">
      <div className="category-header" style={{ '--cat-color': cat.color }}>
        <span className="cat-icon">{cat.icon}</span>
        <h3>{cat.name}</h3>
        <span className="cat-count">{cat.movies.length} titles</span>
      </div>
      <div className="row-wrapper">
        <button className="scroll-btn scroll-left" onClick={() => scroll(-1)}>&#8249;</button>
        <div className="movies-row" ref={rowRef}>
          {cat.movies.map((movie) => (
            <div key={movie.title} className="movie-card">
              <div className="movie-thumb">
                <img
                  src={movie.img}
                  alt={movie.title}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.querySelector('.movie-placeholder').style.display = 'flex';
                  }}
                />
                <div className="movie-placeholder" style={{ background: `linear-gradient(135deg, ${cat.color}33, #0d1b2a)`, color: cat.color }}>
                  {movie.title[0]}
                </div>
                <div className="movie-overlay">
                  <span className="movie-genre" style={{ background: cat.color }}>{cat.name}</span>
                  <button className="btn-watchlist" onClick={() => handleAddToWatchlist(movie.title, cat.name)}>
                    + Watchlist
                  </button>
                </div>
              </div>
              <p className="movie-title">{movie.title}</p>
            </div>
          ))}
        </div>
        <button className="scroll-btn scroll-right" onClick={() => scroll(1)}>&#8250;</button>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleAddToWatchlist = async (title, genre) => {
    if (!token) {
      toast.info('Please login to add to watchlist');
      navigate('/login');
      return;
    }
    try {
      await API.post('/watchlist/add', { title, genre });
      toast.success(`"${title}" added to watchlist! 🎬`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add to watchlist');
    }
  };

  const slide = heroSlides[currentSlide];

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
                Join Prime
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Slider */}
      <section className="hero-slider">
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className={`slide ${i === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: s.bg, backgroundSize: 'cover', backgroundPosition: 'center right' }}
          />
        ))}
        <div className="slide-content">
          <div className="slide-badge">
            <span className="badge-icon">🔥</span> {slide.badge}
          </div>
          <div className="slide-rating">{slide.rating}</div>
          <h1 className="slide-title">{slide.title}</h1>
          <p className="slide-subtitle">{slide.subtitle}</p>
          <p className="slide-desc">{slide.desc}</p>
          <div className="slide-actions">
            <button className="btn-watch" onClick={() => navigate(token ? '/dashboard' : '/register')}>
              ▶ Watch Now
            </button>
            <button className="btn-add" onClick={() => handleAddToWatchlist(slide.title, slide.genre)}>
              + Watchlist
            </button>
            <button className="btn-info">ℹ</button>
          </div>
          <p className="slide-note">🔒 Watch with a Prime membership</p>
        </div>

        {/* Dots */}
        <div className="slide-dots">
          {heroSlides.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(i)}
            />
          ))}
        </div>

        {/* Arrow buttons */}
        <button className="slide-arrow left" onClick={() => setCurrentSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)}>&#8249;</button>
        <button className="slide-arrow right" onClick={() => setCurrentSlide((currentSlide + 1) % heroSlides.length)}>&#8250;</button>
      </section>

      {/* Plans Section */}
      <section className="plans-section" id="plans">
        <h2 className="section-title">Choose Your Plan</h2>
        <p className="section-subtitle">All plans include a 30-day free trial</p>
        <div className="plans-grid">
          {plans.map((plan) => (
            <div key={plan.name} className={`plan-card ${plan.popular ? 'popular' : ''}`} style={{ '--plan-color': plan.color }}>
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              <div className="plan-icon">{plan.icon}</div>
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price">{plan.price}<span>/month</span></div>
              <div className="plan-quality">{plan.quality}</div>
              <ul className="plan-features">
                {plan.features.map((f, i) => <li key={i}>✓ {f}</li>)}
              </ul>
              <button className="btn-plan" onClick={() => navigate(token ? '/dashboard' : '/register')}>
                {token ? 'Subscribe Now' : 'Start Free Trial'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="movies-section" id="movies">
        <h2 className="section-title">Browse by Category</h2>
        <p className="section-subtitle">Something for everyone in the family</p>
        {categories.map((cat) => (
          <CategoryRow key={cat.name} cat={cat} handleAddToWatchlist={handleAddToWatchlist} />
        ))}
      </section>

      {/* Features */}
      <section className="features-section">
        <h2 className="section-title">Why Prime Video?</h2>
        <div className="features-grid">
          <div className="feature-card"><span>📺</span><h4>Watch on Any Device</h4><p>Stream on your TV, laptop, phone, or tablet.</p></div>
          <div className="feature-card"><span>⬇️</span><h4>Download & Watch</h4><p>Download titles to watch offline, anywhere.</p></div>
          <div className="feature-card"><span>🚫</span><h4>No Ads</h4><p>Enjoy uninterrupted streaming with no ads.</p></div>
          <div className="feature-card"><span>🔄</span><h4>Cancel Anytime</h4><p>No commitments. Cancel your plan anytime.</p></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo"><span className="prime-text">prime</span><span className="video-text">video</span></div>
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
