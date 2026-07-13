import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import facebookImg from '../assets/facebook.png';
import xImg from '../assets/x.png';

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <div className="brand">
          <div className="brand-wordmark">
            <img src={logoImg} alt="NALCO Logo" className="brand-logo" />
          </div>
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/investments">Investments</Link>
          <Link to="/wellness">Wellness</Link>
          <Link to="https://nalcoindia.com/news-media/press-releases/">Press Releases</Link>
          <Link to="/faq">Faq</Link>
          <Link to="/contact-us">Contact us</Link>
          
        </div>

        <div className="socials">
          <a className="social-chip" href="https://www.facebook.com/nalcoindia" target="_blank" rel="noreferrer">
            Facebook
            <img src={facebookImg} height="20" width="20" alt="Facebook" />
          </a>
          <div className="social-divider"></div>
          <a className="social-chip" href="https://x.com/NALCO_India" target="_blank" rel="noreferrer">
            @NALCO_India
            <img src={xImg} height="20" width="20" alt="Twitter" />
          </a>
          <a className="social-chip" href="https://x.com/cmdnalco" target="_blank" rel="noreferrer">
            @cmdnalco
            <img src={xImg} height="20" width="20" alt="Twitter" />
          </a>
        </div>
      </div>
    </nav>
  );
}
