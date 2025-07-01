// DonorForm.jsx
import { useState } from "react";
import { useDonations } from "../../context/DonationsContext";

const DonateSomethingElseForm = ({ onBack }) => {
  const { addDonation } = useDonations();

  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [organizerRole, setOrganizerRole] = useState("");
  const [error, setError] = useState("");

  const generateUniqueId = () => Date.now() + Math.floor(Math.random() * 1000);

  const handleSubmit = (e) => {
    e.preventDefault();
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
      setError("Failed to add donation: Duplicate ID detected.");
    } else {
      alert("Donation submitted successfully!");
      onBack();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Donate Something Else
      </h1>
      <input
        className="w-full border rounded p-2"
        placeholder="What are you donating?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        className="w-full border rounded p-2"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <input
        className="w-full border rounded p-2"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <textarea
        className="w-full border rounded p-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        className="w-full border rounded p-2"
        placeholder="Organizer name (optional)"
        value={organizer}
        onChange={(e) => setOrganizer(e.target.value)}
      />
      <input
        className="w-full border rounded p-2"
        placeholder="Organizer role (optional)"
        value={organizerRole}
        onChange={(e) => setOrganizerRole(e.target.value)}
      />

      {error && <p className="text-red-600 font-medium">{error}</p>}

      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-2 rounded w-full"
      >
        Submit Donation
      </button>
      <button
        type="button"
        className="bg-gray-300 text-gray-800 px-6 py-2 rounded w-full"
        onClick={onBack}
      >
        Back
      </button>
    </form>
  );
};

export default DonateSomethingElseForm;
