import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import g1 from '../assets/g1.jpg';
import g2 from '../assets/g2.jpg';

export default function ContactUs() {
  return (
    <div className="page active" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      <div className="container" style={{ flex: 1, padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' }}>
          <img src={g1} alt="Nalco Building" style={{ flex: '1 1 400px', width: '100%', height: '250px', objectFit: 'cover', borderRadius: '8px' }} />
          <img src={g2} alt="Nalco Entrance" style={{ flex: '1 1 400px', width: '100%', height: '250px', objectFit: 'cover', borderRadius: '8px' }} />
        </div>
        
        <div style={{ padding: '0 20px', color: '#1e293b', fontSize: '16px', lineHeight: '1.8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span style={{ color: '#b71c1c' }}>👤</span>
            <strong>Mr. Kedar Nath Singh,</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span style={{ color: '#b71c1c' }}>@</span>
            <span>DM(HR) & TO to D(HR) ,</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span style={{ color: '#b71c1c' }}>📞</span>
            <span>Phone (Official): 0674-2300430</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span style={{ color: '#b71c1c' }}>✉️</span>
            <span>EMail Id: kedar.singh@nalcoindia.co.in</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
