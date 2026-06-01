import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import sl1 from '../assets/sl1.jpg';
import sl2 from '../assets/sl2.png';
import sl3 from '../assets/sl3.jpg';
import sl4 from '../assets/sl4.jpg';

const heroItems = [
  { bg: `linear-gradient(135deg, rgba(183, 28, 28, 0.65), rgba(230, 74, 25, 0.75)), url("${sl1}") center/cover no-repeat` },
  { bg: `linear-gradient(135deg, rgba(183, 28, 28, 0.65), rgba(230, 74, 25, 0.75)), url("${sl2}") center/cover no-repeat` },
  { bg: `linear-gradient(135deg, rgba(183, 28, 28, 0.65), rgba(230, 74, 25, 0.75)), url("${sl3}") center/cover no-repeat` },
  { bg: `linear-gradient(135deg, rgba(183, 28, 28, 0.65), rgba(230, 74, 25, 0.75)), url("${sl4}") center/cover no-repeat` },
];

export default function Hero() {
  const [heroIdx, setHeroIdx] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIdx((prev) => (prev + 1) % heroItems.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-slides" id="heroSlides">
          {heroItems.map((item, i) => (
            <div
              key={i}
              className={`hero-slide ${i === heroIdx ? 'visible' : ''}`}
              style={{ background: item.bg }}
            ></div>
          ))}
        </div>
        <div className="hero-overlay"></div>

        <div className="container">
          <div className="hero-content">
            <div className="pill">Portal for Retired Employees</div>

            <h2>
              Welcome to<br />Hamesha Nalconian
            </h2>

            <p>
              Stay connected with NALCO's retired family.<br />
              Access benefits, wellness schemes, circulars,<br />
              announcements and community updates all in one place.
            </p>

            <div className="hero-actions" style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
              <button className="btn btn-primary" onClick={() => navigate('/login')} style={{ padding: '12px 32px', fontSize: '15px' }}>
                Login
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/register')} style={{ padding: '12px 32px', fontSize: '15px' }}>
                Sign Up
              </button>
            </div>

            <div className="hero-dots" id="heroDots">
              {heroItems.map((_, i) => (
                <div
                  key={i}
                  className={`hero-dot ${i === heroIdx ? 'active' : ''}`}
                  onClick={() => setHeroIdx(i)}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="ticker">
        <div className="ticker-label">
          🟢 Announcements
        </div>
        <div className="ticker-scroll">
          <div className="ticker-track">
            <span>Medical reimbursement deadline: 30 June 2026</span>
            <span>Pension revision circular now available</span>
            <span>Welfare Camp – Bhubaneswar – 15 June 2026</span>
            <span>Updated empanelled hospitals list uploaded</span>
            <span>Superannuation list for May 2026 published</span>
            <span>PRMBS session recording uploaded</span>
            <span>Medical reimbursement deadline: 30 June 2026</span>
            <span>Pension revision circular now available</span>
            <span>Welfare Camp – Bhubaneswar – 15 June 2026</span>
            <span>Updated empanelled hospitals list uploaded</span>
          </div>
        </div>
      </div>
    </>
  );
}
