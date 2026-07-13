import { useState, useEffect } from 'react';
import userImg from '../assets/user.jpg';
import { getRetiredEmployees, getRetiredCount } from '../services/employeeService';

export default function PeopleGrid() {
  const [retirees, setRetirees] = useState([]);
  const [retireesCount, setRetireesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRetireesData = async () => {
      try {
        const [employeesData, countData] = await Promise.all([
          getRetiredEmployees(),
          getRetiredCount()
        ]);
        setRetirees(employeesData);
        setRetireesCount(employeesData.length); 
      } catch (error) {
        console.error('Error fetching retirees data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRetireesData();
  }, []);

  return (
    <div>
      <div className="section-title">
        <div className="title-accent"></div>
        <h2>Superannuation – This Month </h2>
        <div className="title-bar"></div>
      </div>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>Loading retirees...</div>
      ) : (
        <div className="people-grid" id="peopleGrid">
          {retirees.length > 0 ? (
            retirees.map((p, i) => (
              <div className="person card" key={p._id || i}>
                <div className="avatar" style={{ background: `url('./src/assets/user.jpg') center/cover no-repeat` }}></div>
                <div className="person-info">
                  <h4>{p.name}</h4>
                  <p>{p.position}</p>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '20px', color: '#666' }}>
              No superannuation records found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
