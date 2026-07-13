import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function Investments() {
  return (
    <div className="page active" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      <div className="container" style={{ flex: 1, padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ color: '#b71c1c', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px' }}>Investments</h1>
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '16px', fontWeight: '600', color: '#1e293b' }}>SL No.</th>
                <th style={{ padding: '16px', fontWeight: '600', color: '#1e293b' }}>Name</th>
                <th style={{ padding: '16px', fontWeight: '600', color: '#1e293b' }}>Description</th>
                <th style={{ padding: '16px', fontWeight: '600', color: '#1e293b' }}>Date</th>
                <th style={{ padding: '16px', fontWeight: '600', color: '#1e293b' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '16px', color: '#475569' }}>1</td>
                <td style={{ padding: '16px', color: '#475569' }}>Investment</td>
                <td style={{ padding: '16px', color: '#475569' }}>Articles on Investments and Finances after Retirement</td>
                <td style={{ padding: '16px', color: '#475569' }}>2017-07-19</td>
                <td style={{ padding: '16px' }}>
                  <button style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    View / Download
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}
