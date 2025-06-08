import { useState, useEffect } from 'react';

const DonationForm = ({ onCustomDonationClick, onInteract }) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const presetAmounts = [10, 25, 50, 100];

  useEffect(() => {
    if (!hasInteracted && (amount || message)) {
      onInteract();
      setHasInteracted(true);
    }
  }, [amount, message, onInteract, hasInteracted]);

  return (
    <div className="donation-container">
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
