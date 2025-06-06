// DonateSomethingElse.jsx
import { useState } from 'react';

const DonateSomethingElse = ({ onBack }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here
    console.log({ title, description, city, category });
  };

  return (
    <div className="custom-donation">
      <h2>Custom Donation</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What are you donating?"
          required
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
        />
        <button type="submit">Submit Donation</button>
        <button type="button" onClick={onBack}>Back</button>
      </form>
    </div>
  );
};

export default DonateSomethingElse;
