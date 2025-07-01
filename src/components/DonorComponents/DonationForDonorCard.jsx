// components/DonationCard.jsx
import React from "react";
import charityImage from "../../assets/charity.png";

const DonationForDonorCard = ({ donation }) => {
  const { user, amount, message } = donation;

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
      <button className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full">
        Request for Donation
      </button>
    </div>
  );
};

export default DonationForDonorCard;
