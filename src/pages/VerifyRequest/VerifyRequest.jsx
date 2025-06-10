import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequests } from '../../context/RequestsContext';
import './VerifyRequest.css';

const VerifyRequest = () => {
  const { addRequest } = useRequests();
  const navigate = useNavigate();
  const [nicImage, setNicImage] = useState(null);
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [accounts, setAccounts] = useState([
    { platform: '', accountNumber: '', accountHolderName: '' }
  ]);

  const handleAccountChange = (index, field, value) => {
    const updated = [...accounts];
    updated[index][field] = value;
    setAccounts(updated);
  };

  const addAccountField = () => {
    if (accounts.length < 4) {
      setAccounts([...accounts, { platform: '', accountNumber: '', accountHolderName: '' }]);
    }
  };

  const removeAccountField = (index) => {
    if (accounts.length > 1) {
      const updated = accounts.filter((_, i) => i !== index);
      setAccounts(updated);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const request = JSON.parse(localStorage.getItem('pendingRequest'));
    if (!request) {
      setError("No pending request found.");
      return;
    }

    if (!nicImage || !contact || !address) {
      setError("All fields are required.");
      return;
    }

    const validAccounts = accounts.filter(acc =>
      acc.platform && acc.accountNumber && acc.accountHolderName
    );

    if (validAccounts.length === 0) {
      setError("Please enter at least one valid account for online donations.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64NIC = reader.result;

      const updatedRequest = {
        ...request,
        contact,
        address,
        nicImage: base64NIC,
        verified: false,
        verificationStatus: 'pending',
        submittedAt: new Date().toISOString(),
        accounts: validAccounts,
      };

      const success = addRequest(updatedRequest);
      if (!success) {
        setError("Request already exists or submission failed.");
        return;
      }

      const existing = JSON.parse(localStorage.getItem('pendingVerifications')) || [];
      localStorage.setItem('pendingVerifications', JSON.stringify([...existing, updatedRequest]));

      localStorage.removeItem('pendingRequest');
      alert("Your request has been submitted for verification.");
      navigate('/');
    };

    reader.readAsDataURL(nicImage);
  };

  return (
    <div className="verify-container">
      <h2>Verify Your Request</h2>
      <form onSubmit={handleSubmit}>
        <label>Upload NIC/ID Image:</label>
        <input type="file" accept="image/*" onChange={(e) => setNicImage(e.target.files[0])} required />

        <input type="text" placeholder="Contact Number" value={contact} onChange={(e) => setContact(e.target.value)} required />
        <textarea placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />

        <hr />
        <h4>Online Transaction Accounts (1–4)</h4>
        {accounts.map((account, index) => (
          <div key={index} className="account-field">
            <select
              value={account.platform}
              onChange={(e) => handleAccountChange(index, 'platform', e.target.value)}
              required
            >
              <option value="">Select Platform</option>
              <option value="JazzCash">JazzCash</option>
              <option value="Easypaisa">Easypaisa</option>
              <option value="SadaPay">SadaPay</option>
              <option value="NayaPay">NayaPay</option>
              <option value="Raast ID">Raast ID</option>
              <option value="IBAN">Bank IBAN</option>
            </select>
            <input
              type="text"
              placeholder="Account Number or IBAN"
              value={account.accountNumber}
              onChange={(e) => handleAccountChange(index, 'accountNumber', e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Account Holder Name"
              value={account.accountHolderName}
              onChange={(e) => handleAccountChange(index, 'accountHolderName', e.target.value)}
              required
            />
            {accounts.length > 1 && (
              <button type="button" onClick={() => removeAccountField(index)}>Remove</button>
            )}
          </div>
        ))}
        {accounts.length < 4 && (
          <button type="button" onClick={addAccountField}>+ Add Another Account</button>
        )}
        <hr />

        {error && <p className="error">{error}</p>}
        <button type="submit">Submit for Verification</button>
      </form>
    </div>
  );
};

export default VerifyRequest;
