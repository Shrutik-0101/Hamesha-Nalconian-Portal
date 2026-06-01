import { useState } from 'react';

export default function UpdatesSection() {
  const [activeTab, setActiveTab] = useState('notifications');

  return (
    <div className="card">
      <div className="updates-header">Latest Updates</div>
      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
        <button
          className={`tab-btn ${activeTab === 'links' ? 'active' : ''}`}
          onClick={() => setActiveTab('links')}
        >
          Important Links
        </button>
      </div>
      <div className="tab-content-wrapper">
        <div className="tab-content" id="notifications" style={{ display: activeTab === 'notifications' ? 'block' : 'none' }}>
          <div className="news-item">
            Empanelled Hospitals valid upto 30-09-2026 <span className="tag-new">New</span>
          </div>
          <div className="news-item">
            PRMBS session recording uploaded <span className="tag-new">New</span>
          </div>
          <div className="news-item">Superannuation list for May 2026 published</div>
          <div className="news-item">Medical reimbursement form updated</div>
        </div>
        <div className="tab-content" id="links" style={{ display: activeTab === 'links' ? 'block' : 'none' }}>
          <div className="news-item">Indian Rail Info - http://www.indianrail.gov.in/</div>
          <div className="news-item">Railway Ticket Booking - https://www.irctc.co.in</div>
          <div className="news-item">Life Insurance Corporation of India LIC - https://www.licindia.in/</div>
          <div className="news-item">Nalco website - https://www.nalcoindia.com/</div>
          <div className="news-item">Flight Booking - https://www.makemytrip.com/flights/</div>
          <div className="news-item">State Bank Of India - https://www.onlinesbi.com/</div>
          <div className="news-item">Indian Government - https://india.gov.in/</div>
          <div className="news-item">The Gazette of India - http://egazette.nic.in</div>
          <div className="news-item">OLD AGE SOLUTIONS - An initiative of Ministry of Science & Technology(GoI) - https://www.oldagesolutions.org/</div>
        </div>
      </div>
    </div>
  );
}
