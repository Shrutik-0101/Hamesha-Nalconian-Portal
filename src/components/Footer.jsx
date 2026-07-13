export default function Footer() {
  return (
    <footer className="footer">           
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <div className="footer-brand-text">
                <h4>Hamesha Nalconian</h4>
                <span>NALCO RETIRED EMPLOYEES PORTAL</span>
              </div>
            </div>
            <p>
              A dedicated portal for retired employees of National Aluminium Company Limited.
            </p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h4 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Download Our App</h4>
            <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>
              Access your portal anytime, anywhere on your mobile device.
            </p>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <a href="https://apps.apple.com/in/app/hamesha-nalconian/id1266585848" className="app-b" style={{ width: '180px', height: '56px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: '#334155', borderRadius: '8px', textDecoration: 'none', color: 'white' }}>
                <img src="/src/assets/app-store.png" height="28" width="28" alt="Apple" />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '10px', lineHeight: 1.2, opacity: 0.9 }}>Available on the</span>
                  <span style={{ fontSize: '15px', fontWeight: 'bold', lineHeight: 1.2 }}>App Store</span>
                </div>
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.nalcoindia.hameshanalco&hl=en_IN" className="app-b" style={{ width: '180px', height: '56px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: '#334155', borderRadius: '8px', textDecoration: 'none', color: 'white' }}>
                <img src="/src/assets/app.png" height="28" width="28" alt="Google Play" />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '10px', lineHeight: 1.2, opacity: 0.9 }}>Android App on</span>
                  <span style={{ fontSize: '15px', fontWeight: 'bold', lineHeight: 1.2 }}>Google Play</span>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 National Aluminium Company Limited (NALCO)</span>
        </div>
      </div>
    </footer>
  );
}
