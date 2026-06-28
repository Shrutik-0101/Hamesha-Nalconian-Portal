import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRetiredEmployees } from '../services/employeeService';
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
  const [totalRetirees, setTotalRetirees] = useState(0);
  const [retireesThisMonth, setRetireesThisMonth] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRetirees = async () => {
      try {
        const retirees = await getRetiredEmployees();
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        let monthCount = 0;

        retirees.forEach(emp => {
          if (emp.retirementDate) {
            const rDate = new Date(emp.retirementDate);
            if (rDate.getFullYear() === currentYear && rDate.getMonth() === currentMonth) {
              monthCount++;
            }
          }
        });

        setTotalRetirees(retirees.length);
        setRetireesThisMonth(monthCount);
      } catch (error) {
        console.error("Failed to fetch retirees:", error);
      }
    };
    fetchRetirees();

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

          <div className="retiree-stats" style={{ display: 'flex', flexDirection: 'column', gap: '20px', zIndex: 2, minWidth: '220px', marginRight: '5%' }}>
            <div className="stat-box" style={{ background: 'linear-gradient(135deg, rgba(255, 245, 245, 0.95), rgba(255, 255, 255, 0.95))', padding: '25px', borderRadius: '16px', color: '#b71c1c', textAlign: 'center', backdropFilter: 'blur(10px)', border: '1px solid rgba(183, 28, 28, 0.15)', boxShadow: '0 8px 32px rgba(183, 28, 28, 0.08)' }}>
              <h3 style={{ fontSize: '42px', margin: '0 0 5px', fontWeight: 'bold' }}>{totalRetirees}</h3>
              <p style={{ margin: 0, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8, color: '#5a6480', fontWeight: '600' }}>Total Retired Employees</p>
            </div>
            <div className="stat-box" style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 245, 245, 0.95))', padding: '25px', borderRadius: '16px', color: '#b71c1c', textAlign: 'center', backdropFilter: 'blur(10px)', border: '1px solid rgba(183, 28, 28, 0.15)', boxShadow: '0 8px 32px rgba(183, 28, 28, 0.08)' }}>
              <h3 style={{ fontSize: '42px', margin: '0 0 5px', fontWeight: 'bold' }}>{retireesThisMonth}</h3>
              <p style={{ margin: 0, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8, color: '#5a6480', fontWeight: '600' }}>Retired This Month</p>
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
