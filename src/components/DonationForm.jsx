import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserRole } from '../context/UserRoleContext'; // adjust path as needed

// Example DonationCard component — replace with your actual one
const DonationCard = ({ donation }) => (
  <div className="donation-card">
    <h3>{donation.title}</h3>
    <p>{donation.description}</p>
    <p><strong>Amount:</strong> ${donation.amount}</p>
  </div>
);

const DonationForm = ({ onCustomDonationClick, onInteract, availableDonations }) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const presetAmounts = [10, 25, 50, 100];

  const navigate = useNavigate();
  const { role, setRole } = useUserRole();

  useEffect(() => {
    if (!hasInteracted && (amount || message)) {
      onInteract();
      setHasInteracted(true);
    }
  }, [amount, message, onInteract, hasInteracted]);

  const handleBack = () => {
    setRole(null);       // reset role context
    navigate('/');       // go back to homepage
  };

  if (role === 'taker') {
    return (
      <div className="donation-container">
        <button onClick={handleBack} className="back-button">← Back</button>

        {/* Button to request something else */}
        <button type="button" onClick={onCustomDonationClick}>
          I want to request something else
        </button>

       
      </div>
    );
  }

  // role is donor - show full donation form
  return (
    <div className="donation-container">
      <button onClick={handleBack} className="back-button">← Back</button>

      <h2>Make a Donation</h2>

      <label htmlFor="preset-amounts">Choose Amount</label>
      <div id="preset-amounts" className="preset-buttons">
        {presetAmounts.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => setAmount(preset.toString())}
            className={`preset-button ${amount === preset.toString() ? 'active' : ''}`}
          >
            ${preset}
          </button>
        ))}
      </div>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter custom amount"
        aria-label="Custom donation amount"
        min="1"
      />

      <label htmlFor="donation-message">Leave a Message (Optional)</label>
      <textarea
        id="donation-message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Your message of support..."
      />

      <div className="form-actions">
        <button type="button">Proceed to Payment</button>
        <button type="button">Share with Friends</button>
        <button type="button" onClick={onCustomDonationClick}>
          I want to donate something else
        </button>
      </div>
    </div>
  );
};

export default DonationForm;
