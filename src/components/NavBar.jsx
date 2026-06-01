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
          <Link to="/" className="active">Home</Link>
          <a href="https://mudira.nalcoindia.co.in:444/nalco/?p=investment">Investments</a>
          <a href="https://mudira.nalcoindia.co.in:444/nalco/?p=wellness">Wellness</a>
          <a href="https://mudira.nalcoindia.co.in:444/nalco/?p=press-releases">Press Releases</a>
          <a href="https://mudira.nalcoindia.co.in:444/nalco/?p=faq">Faq</a>
          <a href="https://mudira.nalcoindia.co.in:444/nalco/?p=contact-us">Contact us</a>
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
