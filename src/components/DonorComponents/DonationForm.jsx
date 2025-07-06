import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserRole } from "../../context/UserRoleContext"; // adjust path as needed
import { useDonations } from "../../context/DonationsContext";

// Optional: Example DonationCard (not used in this component)
const DonationCard = ({ donation }) => (
  <div className="bg-white shadow rounded-lg p-4 mb-4">
    <h3 className="text-lg font-semibold">{donation.title}</h3>
    <p className="text-gray-600">{donation.description}</p>
    <p className="text-gray-800 font-bold">Amount: ${donation.amount}</p>
  </div>
);

const DonationForm = ({
  onCustomDonationClick,
  availableDonations,
  requestId = null, // If this is None means it's a normal donation but if we pass id then it means the donation is to support a case.
}) => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const presetAmounts = [10, 25, 50, 100];

  const navigate = useNavigate();
  const { setRole } = useUserRole();
  const { addDonation } = useDonations();

  const handleBack = () => {
    setRole(null);
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <button
        onClick={handleBack}
        className="mb-4 text-blue-600 hover:underline flex items-center"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-4 text-gray-800">Make a Donation</h2>

      <label className="block text-gray-700 mb-2">Choose Amount</label>
      <div className="flex flex-wrap gap-3 mb-4">
        {presetAmounts.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => setAmount(preset.toString())}
            className={`px-4 py-2 rounded border ${
              amount === preset.toString()
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
            } transition`}
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
        className="text-black w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label htmlFor="donation-message" className="block text-gray-700 mb-2">
        Leave a Message (Optional)
      </label>
      <textarea
        id="donation-message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Your message of support..."
        className="w-full mb-4 p-2 border rounded h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />

      <div className="flex flex-col gap-3">
        <button
          onClick={async () => {
            const authUser = JSON.parse(localStorage.getItem("authUser"));
            const token = authUser.token;
            const userId = authUser.userId;

            const donationResult = await addDonation({
              userId,
              token,
              amount,
              message,
              requestId,
            });

            alert(donationResult.message);

            if (donationResult.success) {
              setAmount("");
              setMessage("");
            }

            // reload the page
            // window.location.reload();
          }}
          type="button"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Proceed to Payment
        </button>

        <button
          type="button"
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
        >
          Share with Friends
        </button>
      </div>
    </div>
  );
};

export default DonationForm;
