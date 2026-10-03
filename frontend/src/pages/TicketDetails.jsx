import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const NEXT_STATUS = {
  Open: 'In Progress',
  'In Progress': 'Resolved',
};

export default function TicketDetails() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/tickets/${id}`)
      .then(({ data }) => setTicket(data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load ticket'));
  }, [id]);

  const updateStatus = async () => {
    const next = NEXT_STATUS[ticket.status];
    if (!next) return;
    try {
      const { data } = await api.patch(`/tickets/${id}/status`, { status: next });
      setTicket(data);
      setMsg(`Status updated to "${data.status}"`);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Update failed');
    }
  };

  if (error) return <div className="page"><p className="error">{error}</p></div>;
  if (!ticket) return <div className="page"><p>Loading...</p></div>;

  const backPath = role === 'Agent' ? '/agent' : '/customer';
  const nextStatus = NEXT_STATUS[ticket.status];

  return (
    <div className="page">
      <button className="btn-back" onClick={() => navigate(backPath)}>← Back</button>
      <div className="detail-card">
        <h2>{ticket.title}</h2>
        <p><strong>Description:</strong> {ticket.description}</p>
        <p>
          <strong>Priority:</strong>{' '}
          <span className={`badge priority-${ticket.priority.toLowerCase()}`}>{ticket.priority}</span>
        </p>
        <p>
          <strong>Status:</strong>{' '}
          <span className={`badge status-${ticket.status.replace(' ', '-').toLowerCase()}`}>{ticket.status}</span>
        </p>
        <p><strong>Created:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>
        {ticket.createdBy && (
          <p><strong>Created by:</strong> {ticket.createdBy.name} ({ticket.createdBy.email})</p>
        )}

        {role === 'Agent' && nextStatus && (
          <button onClick={updateStatus}>
            Move to "{nextStatus}"
          </button>
        )}
        {role === 'Agent' && !nextStatus && (
          <p><em>Ticket is Resolved. No further transitions.</em></p>
        )}
        {msg && <p className="success">{msg}</p>}
      </div>
    </div>
  );
}
