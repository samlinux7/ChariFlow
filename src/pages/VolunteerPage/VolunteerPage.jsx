import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequests } from '../../context/RequestsContext';
import './VolunteerPage.css';

const VolunteerDashboard = () => {
  const { verificationRequests, approveRequest, rejectRequest } = useRequests();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleApprove = (id) => {
    const success = approveRequest(id);
    if (!success) {
      setError('Error approving request.');
    } else {
      setError('');
      alert('Request approved!');
    }
  };

  const handleReject = (id) => {
    const success = rejectRequest(id);
    if (!success) {
      setError('Error rejecting request.');
    } else {
      setError('');
      alert('Request rejected!');
    }
  };

  const handleJoinChat = (id) => {
    navigate(`/chat/${id}`);
  };

  if (!verificationRequests || verificationRequests.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '20px' }}>No requests pending verification.</p>;
  }

  return (
    <div className="volunteer-container">
      <h2>Volunteer Dashboard - Verify Requests</h2>
      {error && <p className="error">{error}</p>}

      {verificationRequests.map((req) => (
        <div key={req.id} className="request-card">
          <h3>{req.title}</h3>
          <p><strong>City:</strong> {req.city}</p>
          <p><strong>Category:</strong> {req.category}</p>
          <p><strong>Description:</strong> {req.desc}</p>
          <p><strong>Goal:</strong> {req.goal}</p>
          <p><strong>Urgency:</strong> {req.urgency}</p>
          <p><strong>Timeline:</strong> {req.timeline}</p>
          <p><strong>Beneficiaries:</strong> {req.beneficiaries}</p>

          <h4>Verification Details:</h4>
          <p><strong>Organizer:</strong> {req.verificationData?.organizer}</p>
          <p><strong>Organizer Role:</strong> {req.verificationData?.organizerRole}</p>
          <p><strong>NIC Number:</strong> {req.verificationData?.nicNumber}</p>
          {req.verificationData?.nicImage && (
            <img
              src={req.verificationData.nicImage}
              alt="NIC document"
              className="nic-image"
            />
          )}
          <p><strong>Contact Number:</strong> {req.verificationData?.contactNumber}</p>
          <p><strong>Address:</strong> {req.verificationData?.address}</p>

          <div className="buttons">
            <button onClick={() => handleApprove(req.id)}>Approve</button>
            <button onClick={() => handleReject(req.id)}>Reject</button>
            {/* Chat Access */}
            <button onClick={() => handleJoinChat(req.id)}>Join Chat</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VolunteerDashboard;
