import { useState } from 'react';
import { useUserRole } from '../context/UserRoleContext';
import { useRequests } from '../context/RequestsContext';
import { useDonations } from '../context/DonationsContext';
import { useNavigate } from 'react-router-dom';

const DonateSomethingElse = ({ onBack }) => {
  const { role } = useUserRole();
  const { requests, addRequest } = useRequests();
  const { addDonation } = useDonations();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [urgency, setUrgency] = useState('');
  const [timeline, setTimeline] = useState('');
  const [beneficiaries, setBeneficiaries] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [organizerRole, setOrganizerRole] = useState('');
  const [accounts, setAccounts] = useState([
    { type: '', number: '', holder: '' }
  ]);
  const [error, setError] = useState('');

  const accountOptions = [
    'JazzCash', 'Easypaisa', 'SadaPay', 'NayaPay', 'Raast ID', 'IBAN', 'Meezan Bank', 'UBL', 'HBL', 'Bank Alfalah', 'Other'
  ];

  const generateUniqueId = () => {
    let newId;
    do {
      newId = Date.now() + Math.floor(Math.random() * 1000);
    } while (requests.some(req => req.id === newId));
    return newId;
  };

  const handleAddAccount = () => {
    if (accounts.length < 4) {
      setAccounts([...accounts, { type: '', number: '', holder: '' }]);
    }
  };

  const handleRemoveAccount = (index) => {
    const updated = [...accounts];
    updated.splice(index, 1);
    setAccounts(updated);
  };

  const handleAccountChange = (index, field, value) => {
    const updated = [...accounts];
    updated[index][field] = value;
    setAccounts(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (role === 'donor') {
      const id = generateUniqueId();
      const newDonation = {
        id,
        title,
        city,
        category,
        desc: description,
        image: "",
        organizer,
        organizerRole,
      };
      const success = addDonation(newDonation);
      if (!success) {
        setError('Failed to add donation: Duplicate ID detected.');
      } else {
        alert('Donation submitted successfully!');
        onBack();
      }
    } else if (role === 'taker') {
      if (accounts.length === 0 || accounts.some(acc => !acc.type || !acc.number || !acc.holder)) {
        setError('Please provide at least one complete account for receiving donations.');
        return;
      }

      const id = generateUniqueId();
      const newRequest = {
        id,
        title,
        city,
        category,
        desc: description,
        goal: Number(goal),
        urgency,
        timeline,
        beneficiaries,
        organizer,
        organizerRole,
        raised: 0,
        supporters: 0,
        accounts, // attach online donation accounts
      };

      localStorage.setItem('pendingRequest', JSON.stringify(newRequest));
      navigate('/verify-request');
    }
  };

  return (
    <div className="custom-donation">
      <h2>{role === 'donor' ? 'Custom Donation' : 'Request Something Else'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={role === 'donor' ? 'What are you donating?' : 'Title of request'} required />
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required />
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder={role === 'donor' ? 'Description' : 'Detailed description of your request'} required />

        {role === 'taker' && (
          <>
            <input type="number" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Goal amount (e.g. 1000)" required min="1" />
            <input type="text" value={urgency} onChange={(e) => setUrgency(e.target.value)} placeholder="Urgency (e.g. High, Medium, Low)" required />
            <input type="text" value={timeline} onChange={(e) => setTimeline(e.target.value)} placeholder="Timeline or deadline" required />
            <input type="text" value={beneficiaries} onChange={(e) => setBeneficiaries(e.target.value)} placeholder="Beneficiaries (e.g. 40 Grade 5 students)" required />
            <input type="text" value={organizer} onChange={(e) => setOrganizer(e.target.value)} placeholder="Organizer name" required />
            <input type="text" value={organizerRole} onChange={(e) => setOrganizerRole(e.target.value)} placeholder="Organizer role (e.g. School Principal)" required />

            <h4>Online Donation Accounts (1–4)</h4>
            {accounts.map((acc, index) => (
              <div key={index} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
                <select value={acc.type} onChange={(e) => handleAccountChange(index, 'type', e.target.value)} required>
                  <option value="">Select Account Type</option>
                  {accountOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={acc.number}
                  onChange={(e) => handleAccountChange(index, 'number', e.target.value)}
                  placeholder="Account Number or IBAN"
                  required
                />
                <input
                  type="text"
                  value={acc.holder}
                  onChange={(e) => handleAccountChange(index, 'holder', e.target.value)}
                  placeholder="Account Holder Name"
                  required
                />
                {accounts.length > 1 && (
                  <button type="button" onClick={() => handleRemoveAccount(index)}>Remove</button>
                )}
              </div>
            ))}
            {accounts.length < 4 && (
              <button type="button" onClick={handleAddAccount}>Add Another Account</button>
            )}
          </>
        )}

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">{role === 'donor' ? 'Submit Donation' : 'Submit Request'}</button>
        <button type="button" onClick={onBack}>Back</button>
      </form>
    </div>
  );
};

export default DonateSomethingElse;
