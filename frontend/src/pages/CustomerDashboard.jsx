import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function CustomerDashboard() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');
  const name = localStorage.getItem('name');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/tickets')
      .then(({ data }) => setTickets(data))
      .catch(() => setError('Failed to load tickets'));
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="page">
      <div className="header">
        <div>
          <h1>Customer Dashboard</h1>
          <p>Logged in as <strong>{name}</strong> (Customer)</p>
        </div>
        <div className="header-actions">
          <Link to="/customer/create"><button>+ Create Ticket</button></Link>
          <button className="btn-logout" onClick={logout}>Logout</button>
        </div>
      </div>

      {error && <p className="error">{error}</p>}

      {tickets.length === 0 ? (
        <p>No tickets yet. Create your first one!</p>
      ) : (
        <div className="ticket-list">
          {tickets.map((t) => (
            <div key={t._id} className="ticket-card" onClick={() => navigate(`/ticket/${t._id}`)}>
              <h3>{t.title}</h3>
              <span className={`badge priority-${t.priority.toLowerCase()}`}>{t.priority}</span>
              <span className={`badge status-${t.status.replace(' ', '-').toLowerCase()}`}>{t.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
