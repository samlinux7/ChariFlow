// components/DonationCard.jsx
import React from "react";
import charityImage from "../assets/charity.png";

const DonationForDonorCard = ({ donation }) => {
  const { user, amount, message } = donation;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        margin: "10px",
        borderRadius: "10px",
        maxWidth: "300px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <img
        src={charityImage}
        alt={"Image"}
        style={{ width: "100%", borderRadius: "10px" }}
      />
      <h2>{user.name}</h2>
      <p>
        <strong>Amount:</strong> Rs. {amount}
      </p>
      <p>
        <strong>message:</strong> {message || "No message provided"}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  );
};

export default DonationForDonorCard;
