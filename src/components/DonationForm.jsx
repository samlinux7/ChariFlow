// DonationForm.jsx
import { useState } from 'react';
import DonateSomethingElse from './DonateSomethingElse';

const DonationForm = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [customDonation, setCustomDonation] = useState(false);
  const presetAmounts = [10, 25, 50, 100];

  if (customDonation) {
    return <DonateSomethingElse />;
  }

  return (
    <div className="donation-container">
      <div className="donation-header">
        <h2>Make a Donation</h2>
      </div>

      <div className="form-section">
        <label>Choose Amount</label>
        <div className="preset-buttons">
          {presetAmounts.map((preset) => (
            <button
              key={preset}
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
        />
      </div>

      <div className="form-section">
        <label>Leave a Message (Optional)</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your message of support..."
        />
      </div>

      <div className="form-actions">
        <button>Proceed to Payment</button>
        <button>Share with Friends</button>
        <button onClick={() => setCustomDonation(true)}>I want to donate something else</button>
      </div>
    </div>
  );
};

export default DonationForm;


