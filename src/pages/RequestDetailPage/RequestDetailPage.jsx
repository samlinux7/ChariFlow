import { useParams, Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Tag, Heart, Share2, Users, Target } from 'lucide-react';
import DonationForm from '../../components/DonationForm';
import { useRequests } from '../../context/RequestsContext'; // adjust path as needed
import './RequestDetailPage.css';

const RequestDetailPage = () => {
  const { id } = useParams();
  const { requests } = useRequests(); // get requests from context
  const request = requests.find(req => req.id === parseInt(id));
  const progressPercentage = request ? (request.raised / request.goal) * 100 : 0;

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleStartChat = () => {
    navigate(`/chat/${id}`);
  };

  if (!request) {
    return (
      <div className="not-found">
        <h1>Request Not Found</h1>
        <Link to="/donate" className="back-link">Back to Donations</Link>
      </div>
    );
  }

  return (
    <div className="request-detail">
      <div className="container">
        <Link to="/donate" className="back-button">
          <ArrowLeft size={16} /> Back to Donations
        </Link>

        <div className="main-grid">
          {/* LEFT CONTENT */}
          <div className="left-section">
            <div className="card">
              <img src={request.image} alt={request.title} className="hero-image" />
              <div className="card-content">
                <div className="category-row">
                  <Tag size={16} />
                  <span className="category">{request.category}</span>
                  <span className={`urgency ${request.urgency?.toLowerCase() || ''}`}>
                    {request.urgency} Priority
                  </span>
                </div>
                <h1>{request.title}</h1>
                <div className="meta">
                  <span><MapPin size={16} /> {request.city}</span>
                  <span><Calendar size={16} /> Posted today</span>
                  <span><Users size={16} /> {request.supporters} supporters</span>
                </div>

                {/* Progress Bar */}
                <div className="progress-box">
                  <div className="progress-info">
                    <strong>${request.raised}</strong> of ${request.goal} goal
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${Math.min(progressPercentage, 100)}%` }}></div>
                  </div>
                  <div className="progress-percent">{progressPercentage.toFixed(0)}% funded</div>
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="card">
              <h2>About This Request</h2>
              <p>{request.fullDescription}</p>
              <div className="info-grid">
                <div>
                  <h4><Target size={16} /> Beneficiaries</h4>
                  <p>{request.beneficiaries}</p>
                </div>
                <div>
                  <h4><Calendar size={16} /> Timeline</h4>
                  <p>{request.timeline}</p>
                </div>
                <div>
                  <h4><Heart size={16} /> Organizer</h4>
                  <p>{request.organizer}</p>
                  <small>{request.organizerRole}</small>
                </div>
              </div>
            </div>

            {/* SHARE */}
            <div className="card">
              <h3>Help Spread the Word</h3>
              <p>Share this request with your friends and family to help us reach our goal faster.</p>
              <button className="share-button">
                <Share2 size={16} /> Share This Request
              </button>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="right-section">
            <DonationForm />

            <div className="item-donate-section">
              <button className="item-donate-btn" onClick={() => setShowModal(true)}>
                I have an item to donate
              </button>
            </div>

            {showModal && (
              <div className="modal-overlay">
                <div className="modal-box">
                  <h3>Start a Chat?</h3>
                  <p>This will start a chat with the requestor and a volunteer. Do you want to continue?</p>
                  <div className="modal-buttons">
                    <button onClick={handleStartChat}>Yes, Start Chat</button>
                    <button onClick={() => setShowModal(false)}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailPage;
