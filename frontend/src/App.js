import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }, []);

  const isValidUrl = (url) => {
    const regex = /^(https?:\/\/)[^\s$.?#].[^\s]*$/gm;
    return regex.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShortUrl('');
    setError('');
    setCopied(false);

    if (!originalUrl.trim() || !isValidUrl(originalUrl)) {
      setError('❌ Please enter a valid URL (starting with http/https)');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/shorten', {
        originalUrl: originalUrl.trim(),
      });

      const result = response.data.shortUrl;
      setShortUrl(result);
      setOriginalUrl('');
      setHistory([result, ...history.slice(0, 4)]);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="app-container">
      {/* 🔗 Header Section */}
      <header className="header">
        <div className="header-content">
          <div className="branding">
            <span className="icon">🔗</span>
            <div>
              <h1>SmartURL</h1>
              <p className="tagline">Shorten your links. Share smarter.</p>
            </div>
          </div>
          <div className="header-decoration">
            <div className="wave"></div>
          </div>
        </div>
      </header>

      {/* 📦 Main Content */}
      <main className="main-content">
        <div className="card url-shortener">
          <form onSubmit={handleSubmit} className="url-form" autoComplete="off">
            <label htmlFor="url-input">Paste your long URL</label>
            <div className="input-group">
              <input
                id="url-input"
                type="url"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="e.g. https://example.com/very/long/url"
                disabled={loading}
              />
              <button type="submit" disabled={loading || !originalUrl.trim()}>
                {loading ? <span className="spinner" /> : 'Shorten'}
              </button>
            </div>
            {error && <p className="error-msg">{error}</p>}
          </form>

          {shortUrl && (
            <div className="result fade-in">
              <h3>🔗 Shortened URL</h3>
              <div className="short-url-container">
                <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                  {shortUrl}
                </a>
                <button onClick={copyToClipboard} className="copy-btn">
                  {copied ? '✅ Copied!' : '📋 Copy'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Recent URLs */}
        {history.length > 0 && (
          <div className="card history-section">
            <h3>🕘 Recent Shortened URLs</h3>
            <ul className="history-list">
              {history.map((url, index) => (
                <li key={index}>
                  <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      {/* 💎 Why Choose Section */}
      <section className="features-section">
        <div className="section-header" data-aos="fade-up">
          <h2>Why Choose SmartURL?</h2>
          <p className="section-subtitle">
            Our platform offers powerful features to enhance your link management experience
          </p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card" data-aos="fade-up">
            <div className="feature-icon">
              <LightningIcon />
            </div>
            <h3>Lightning Fast</h3>
            <p>
              Generate shortened URLs instantly with our high-performance infrastructure.
              Average response time under 200ms.
            </p>
          </div>
          
          <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
            <div className="feature-icon">
              <ShieldIcon />
            </div>
            <h3>Enterprise Security</h3>
            <p>
              Military-grade encryption and 99.99% uptime ensure your links are always secure and available.
            </p>
          </div>
          
          <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
            <div className="feature-icon">
              <AnalyticsIcon />
            </div>
            <h3>Advanced Analytics</h3>
            <p>
              Real-time tracking of clicks, locations, devices, and referral sources.
            </p>
          </div>
        </div>
      </section>

      {/* 📌 Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="https://github.com/ShivamJuyal24" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.instagram.com/_.juyaljii._/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.linkedin.com/in/shivamjuyal24/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <div className="footer-info">
            <p>&copy; {new Date().getFullYear()} SmartURL — All rights reserved.</p>
            <p className="tech-stack">
              Designed with <span className="heart">💙</span> by <strong>Shivam Juyal</strong>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// SVG Icon Components
const LightningIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

export default App;