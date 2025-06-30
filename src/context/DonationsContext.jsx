import React, { createContext, useState, useContext, useEffect } from "react";
const DonationsContext = createContext();

export const DonationsProvider = ({ children }) => {
  const [donations, setDonations] = useState([]);

  // Fetch donations from backend with a configurable limit
  const fetchDonations = async (token, limit = 15) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/donations/?limit=${limit}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setDonations(data);
      } else {
        setDonations([]);
      }
    } catch (error) {
      console.error("Error fetching donations:", error);
      setDonations([]);
    }
  };

  const addDonation = async ({ userId, amount, message, requestId, token }) => {
    try {
      const res = await fetch("http://localhost:3000/api/donations/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          amount: parseFloat(amount),
          message,
          ...(requestId && { requestId }), // only add requestId if it exists
        }),
      });

      if (res.status === 201) {
        const newDonation = await res.json();
        setDonations((prev) => [...prev, newDonation]);
        // Optionally refresh all donations from backend
        // await fetchDonations(token);
        return { success: true, message: "Donation successful!" };
      } else {
        return {
          success: false,
          message: "Donation failed. Please try again.",
        };
      }
    } catch (error) {
      console.error("Error:", error);
      return {
        success: false,
        message: "An error occurred. Please try again later.",
      };
    }
  };

  // Fetch all donations on mount (if needed, pass token from storage)
  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const token = authUser?.token;
    fetchDonations(token);
  }, []);

  return (
    <DonationsContext.Provider
      value={{ donations, addDonation, fetchDonations }}
    >
      {children}
    </DonationsContext.Provider>
  );
};

// Custom hook to use DonationsContext
export const useDonations = () => useContext(DonationsContext);
