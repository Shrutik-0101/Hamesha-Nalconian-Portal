import appStoreImg from '../assets/app-store.png';
import appImg from '../assets/app.png';

export default function DownloadApp() {
  return (
    <div className="side-card">
      <div className="side-hd">
        <div className="side-hd-title">Download App</div>
      </div>
      <div className="side-body">
        <p style={{ fontSize: '12.5px', color: 'var(--muted)', marginBottom: '14px' }}>
          Access your portal anytime, anywhere on your mobile device.
        </p>
        <a href="https://apps.apple.com/in/app/hamesha-nalconian/id1266585848" className="app-b">
          <img src={appStoreImg} height="27" width="27" alt="Apple" />
          <div>
            <div className="sm">Available on the</div>
            <div className="lg">App Store</div>
          </div>
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.nalcoindia.hameshanalco&hl=en_IN" className="app-b">
          <img src={appImg} height="25" width="25" alt="Google Play" />
          <div>
            <div className="sm">Android App on</div>
            <div className="lg">Google Play</div>
          </div>
        </a>
      </div>
    </div>
  );
}
