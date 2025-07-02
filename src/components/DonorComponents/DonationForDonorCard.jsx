// components/DonationCard.jsx
import React from "react";
import charityImage from "../../assets/charity.png";

const DonationForDonorCard = ({ donation }) => {
  const { user, amount, message, appliedUsers = [] } = donation;
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const myId = authUser?.userId || authUser?._id;
  const hasApplied = appliedUsers.includes(myId);

  const handleAssignDonation = async () => {
    try {
      const token = authUser?.token;
      if (!token)
        throw new Error("You must be logged in to assign a donation.");
      const receiverId = user._id || user.id;
      const donationId = donation._id;

      const response = await fetch(
        "http://localhost:3000/api/requests/assign-donation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ receiverId, donationId }),
        }
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to assign donation");
      alert("Donation reqeusted!");
      // Optionally, you may want to refresh the parent list or trigger a re-fetch here
    } catch (err) {
      alert(err.message || "An error occurred while assigning the donation.");
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-xl shadow p-4 m-2 max-w-xs flex flex-col items-stretch text-left">
      <img src={charityImage} alt="Image" className="w-full rounded-xl mb-4" />
      <h2 className="text-lg font-bold mb-2">{user.name}</h2>
      <p className="mb-1">
        <strong>Amount:</strong> Rs. {amount}
      </p>
      <p className="mb-1 truncate overflow-hidden whitespace-nowrap max-w-full">
        <strong>Message:</strong> {message ? message : "No message provided"}
      </p>
      <p className="mb-4">
        <strong>Email:</strong> {user.email}
      </p>
      {hasApplied ? (
        <div className="mt-auto w-full text-green-600 font-semibold text-center py-2 border border-green-200 rounded bg-green-50">
          You have already applied for this donation
        </div>
      ) : (
        <button
          className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
          onClick={handleAssignDonation}
        >
          Request for Donation
        </button>
      )}
    </div>
  );
};

export default DonationForDonorCard;
