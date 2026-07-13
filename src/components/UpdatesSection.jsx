import { useState, useEffect } from 'react';
import { getContent } from '../services/contentService';

export default function UpdatesSection() {
  const [activeTab, setActiveTab] = useState('notifications');
  const [notifications, setNotifications] = useState([]);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const content = await getContent();
        if (content) {
          if (content.notifications) setNotifications(content.notifications);
          if (content.importantLinks) setLinks(content.importantLinks);
        }
      } catch (error) {
        console.error("Failed to load updates content:", error);
      }
    };
    fetchContent();
  }, []);

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
          {notifications.length > 0 ? notifications.map((notif, i) => (
            <div key={i} className="news-item">
              {notif.text} {notif.isNewTag && <span className="tag-new">New</span>}
            </div>
          )) : (
            <div className="news-item" style={{ color: '#64748b' }}>No notifications available.</div>
          )}
        </div>
        <div className="tab-content" id="links" style={{ display: activeTab === 'links' ? 'block' : 'none' }}>
          {links.length > 0 ? links.map((link, i) => (
            <div key={i} className="news-item">
              <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                {link.text} - {link.url}
              </a>
            </div>
          )) : (
             <div className="news-item" style={{ color: '#64748b' }}>No important links available.</div>
          )}
        </div>
      </div>
    </div>
  );
}
