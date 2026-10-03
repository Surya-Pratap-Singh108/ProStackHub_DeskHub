import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function AgentDashboard() {
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
          <h1>Agent Dashboard</h1>
          <p>Logged in as <strong>{name}</strong> (Agent)</p>
        </div>
        <button className="btn-logout" onClick={logout}>Logout</button>
      </div>

      {error && <p className="error">{error}</p>}

      {tickets.length === 0 ? (
        <p>No tickets in the system.</p>
      ) : (
        <table className="ticket-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Created By</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t._id} onClick={() => navigate(`/ticket/${t._id}`)} style={{ cursor: 'pointer' }}>
                <td>{t.title}</td>
                <td><span className={`badge priority-${t.priority.toLowerCase()}`}>{t.priority}</span></td>
                <td><span className={`badge status-${t.status.replace(' ', '-').toLowerCase()}`}>{t.status}</span></td>
                <td>{t.createdBy?.name || '—'}</td>
                <td>{new Date(t.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
