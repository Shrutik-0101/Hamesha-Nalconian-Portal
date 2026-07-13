import { useState, useEffect } from 'react';
import { getRetiredEmployees } from '../services/employeeService';

export default function RetireeStats() {
  const [totalRetirees, setTotalRetirees] = useState(0);
  const [retireesThisMonth, setRetireesThisMonth] = useState(0);

  useEffect(() => {
    const fetchRetirees = async () => {
      try {
        const retirees = await getRetiredEmployees();
        if (retirees) {
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
        }
      } catch (error) {
        console.error("Failed to fetch retirees:", error);
      }
    };
    fetchRetirees();
  }, []);

  return (
    <div className="side-card" style={{ display: 'flex', gap: '20px', flexDirection: 'row', background: 'transparent', boxShadow: 'none', padding: 0 }}>
      <div className="stat-box" style={{ flex: 1, background: 'linear-gradient(135deg, rgba(86, 15, 15, 0.95), rgba(203, 21, 21, 0.95))', padding: '55px', borderRadius: '16px', color: '#ffffff', textAlign: 'center', boxShadow: '0 8px 32px rgba(183, 28, 28, 0.08)' }}>
        <h3 style={{ fontSize: '42px', margin: '0 0 5px', fontWeight: 'bold' }}>{totalRetirees}</h3>
        <p style={{ margin: 0, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8, color: '#ffc5c5', fontWeight: '600' }}>Total Retired Employees</p>
      </div>
      <div className="stat-box" style={{ flex: 1, background: 'linear-gradient(135deg, rgba(109, 26, 26, 0.95), rgba(218, 2, 2, 0.95))', padding: '55px', borderRadius: '16px', color: '#ffffff', textAlign: 'center', boxShadow: '0 8px 32px rgba(183, 28, 28, 0.08)' }}>
        <h3 style={{ fontSize: '42px', margin: '0 0 5px', fontWeight: 'bold' }}>{retireesThisMonth}</h3>
        <p style={{ margin: 0, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8, color: '#ffc2c2', fontWeight: '600' }}>Retired This Month</p>
      </div>
    </div>
  );
}
