import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getContent } from '../services/contentService';
import sl1 from '../assets/sl1.jpg';
import sl2 from '../assets/sl2.png';
import sl3 from '../assets/sl3.jpg';
import sl4 from '../assets/sl4.jpg';

const heroItems = [
  { bg: `url("${sl1}") center/cover no-repeat` },
  { bg: `url("${sl2}") center/cover no-repeat` },
  { bg: `url("${sl3}") center/cover no-repeat` },
  { bg: `url("${sl4}") center/cover no-repeat` },
];

export default function Hero() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [announcements, setAnnouncements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const content = await getContent().catch(() => null);

        if (content && content.announcements) {
          setAnnouncements(content.announcements);
        }
      } catch (error) {
        console.error("Failed to fetch hero data:", error);
      }
    };
    fetchData();

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
        <div className="hero-overlay" style={{ background: 'linear-gradient(135deg, rgba(29, 2, 2, 0.35), rgba(64, 0, 7, 0.5))', backdropFilter: 'blur(2px)' }}></div>

        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
            {announcements.length > 0 ? (
              <>
                {announcements.map((text, i) => <span key={`a1-${i}`}>{text}</span>)}
                {announcements.map((text, i) => <span key={`a2-${i}`}>{text}</span>)}
              </>
            ) : (
              <span>No announcements right now</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
