import { useState } from 'react';
import { useUserRole } from '../context/UserRoleContext';
import { useRequests } from '../context/RequestsContext';  // adjust path
import { useDonations } from '../context/DonationsContext'; // adjust path


const DonateSomethingElse = ({ onBack }) => {
  const { role } = useUserRole();
  const { requests, addRequest } = useRequests();
  const { addDonation } = useDonations();


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
  const [error, setError] = useState('');

  const generateUniqueId = () => {
    let newId;
    do {
      newId = Date.now() + Math.floor(Math.random() * 1000); // timestamp + random 0-999
    } while (requests.some(req => req.id === newId));
    return newId;
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
    image: "", // You can add file upload or default image
    organizer,
    organizerRole,
    // Optional: add date, availableUntil, etc.
  };
  const success = addDonation(newDonation);
  if (!success) {
    setError('Failed to add donation: Duplicate ID detected.');
  } else {
    alert('Donation submitted successfully!');
    onBack();
  }
}
 else if (role === 'taker') {
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
        raised: 0, // initial raised amount
        supporters: 0, // initial count
        // You can add more default fields if needed
      };

      const success = addRequest(newRequest);
      if (!success) {
        setError('Failed to add request: Duplicate ID detected.');
      } else {
        // Optionally clear form or navigate away
        alert('Request submitted successfully!');
        onBack();
      }
    }
  };

  return (
    <div className="custom-donation">
      <h2>{role === 'donor' ? 'Custom Donation' : 'Request Something Else'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={role === 'donor' ? 'What are you donating?' : 'Title of request'}
          required
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          required
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={role === 'donor' ? 'Description' : 'Detailed description of your request'}
          required
        />

        {role === 'taker' && (
          <>
            <input
              type="number"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Goal amount (e.g. 1000)"
              required
              min="1"
            />
            <input
              type="text"
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              placeholder="Urgency (e.g. High, Medium, Low)"
              required
            />
            <input
              type="text"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              placeholder="Timeline or deadline"
              required
            />
            <input
              type="text"
              value={beneficiaries}
              onChange={(e) => setBeneficiaries(e.target.value)}
              placeholder="Beneficiaries (e.g. 40 Grade 5 students)"
              required
            />
            <input
              type="text"
              value={organizer}
              onChange={(e) => setOrganizer(e.target.value)}
              placeholder="Organizer name"
              required
            />
            <input
              type="text"
              value={organizerRole}
              onChange={(e) => setOrganizerRole(e.target.value)}
              placeholder="Organizer role (e.g. School Principal)"
              required
            />
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
