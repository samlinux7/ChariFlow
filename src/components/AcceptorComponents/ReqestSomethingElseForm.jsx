// TakerForm.jsx
import { useState } from "react";
import { useUserRole } from "../../context/UserRoleContext";
import { useNavigate } from "react-router-dom";

const accountOptions = [
  "JazzCash",
  "Easypaisa",
  "SadaPay",
  "NayaPay",
  "Raast ID",
  "IBAN",
  "Meezan Bank",
  "UBL",
  "HBL",
  "Bank Alfalah",
  "Other",
];

const RequestSomethingElseForm = ({ onBack }) => {
  const { userId } = useUserRole();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [urgency, setUrgency] = useState("");
  const [timeline, setTimeline] = useState("");
  const [beneficiaries, setBeneficiaries] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [organizerRole, setOrganizerRole] = useState("");
  const [accounts, setAccounts] = useState([
    { type: "", number: "", holder: "" },
  ]);
  const [error, setError] = useState("");

  const generateUniqueId = () => Date.now() + Math.floor(Math.random() * 1000);

  const handleAccountChange = (index, field, value) => {
    const updated = [...accounts];
    updated[index][field] = value;
    setAccounts(updated);
  };

  const handleAddAccount = () => {
    if (accounts.length < 4)
      setAccounts([...accounts, { type: "", number: "", holder: "" }]);
  };

  const handleRemoveAccount = (index) => {
    const updated = [...accounts];
    updated.splice(index, 1);
    setAccounts(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (accounts.some((acc) => !acc.type || !acc.number || !acc.holder)) {
      setError("Please provide at least one complete account.");
      return;
    }

    const id = generateUniqueId();

    const requestData = {
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
      supporters: [],
      accounts,
      takerId: userId,
    };

    fetch("http://localhost:3000/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
      .then(async (res) => {
        const text = await res.text();
        const data = text ? JSON.parse(text) : {};
        if (res.ok && data.success) {
          alert("Request submitted successfully!");
          setTitle("");
          setCity("");
          setCategory("");
          setDescription("");
          setGoal("");
          setUrgency("");
          setTimeline("");
          setBeneficiaries("");
          setOrganizer("");
          setOrganizerRole("");
          setAccounts([{ type: "", number: "", holder: "" }]);
          onBack();
        } else {
          setError(data.message || "Submission failed.");
        }
      })
      .catch(() => setError("Something went wrong."));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Request Something Else
      </h1>
      <input
        className="w-full border rounded p-2"
        placeholder="Title of request"
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
        placeholder="Detailed description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        className="w-full border rounded p-2"
        placeholder="Goal amount"
        type="number"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        required
      />
      <input
        className="w-full border rounded p-2"
        placeholder="Urgency (High, Medium, Low)"
        value={urgency}
        onChange={(e) => setUrgency(e.target.value)}
        required
      />
      <input
        className="w-full border rounded p-2"
        placeholder="Timeline or deadline"
        value={timeline}
        onChange={(e) => setTimeline(e.target.value)}
        required
      />
      <input
        className="w-full border rounded p-2"
        placeholder="Beneficiaries"
        value={beneficiaries}
        onChange={(e) => setBeneficiaries(e.target.value)}
        required
      />
      <input
        className="w-full border rounded p-2"
        placeholder="Organizer name"
        value={organizer}
        onChange={(e) => setOrganizer(e.target.value)}
        required
      />
      <input
        className="w-full border rounded p-2"
        placeholder="Organizer role"
        value={organizerRole}
        onChange={(e) => setOrganizerRole(e.target.value)}
        required
      />

      <div>
        <h4 className="text-lg font-semibold mb-2">Online Donation Accounts</h4>
        {accounts.map((acc, index) => (
          <div key={index} className="border p-4 rounded mb-4">
            <select
              className="w-full border p-2 mb-2"
              value={acc.type}
              onChange={(e) =>
                handleAccountChange(index, "type", e.target.value)
              }
              required
            >
              <option value="">Select Account Type</option>
              {accountOptions.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <input
              className="w-full border rounded p-2 mb-2"
              placeholder="Account Number or IBAN"
              value={acc.number}
              onChange={(e) =>
                handleAccountChange(index, "number", e.target.value)
              }
              required
            />
            <input
              className="w-full border rounded p-2 mb-2"
              placeholder="Account Holder Name"
              value={acc.holder}
              onChange={(e) =>
                handleAccountChange(index, "holder", e.target.value)
              }
              required
            />
            {accounts.length > 1 && (
              <button
                type="button"
                className="text-red-600 hover:underline"
                onClick={() => handleRemoveAccount(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        {accounts.length < 4 && (
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleAddAccount}
          >
            Add Another Account
          </button>
        )}
      </div>

      {error && <p className="text-red-600 font-medium">{error}</p>}

      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-2 rounded w-full"
      >
        Submit Request
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

export default RequestSomethingElseForm;
