import React, { createContext, useState, useContext, useEffect } from "react";

const DonationsContext = createContext();

export const DonationsProvider = ({ children }) => {
  const [donations, setDonations] = useState([]);

  // Fetch donations from backend with a configurable limit
  const fetchDonations = async (token, limit = 15) => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE; // ✅ moved here
    try {
      const res = await fetch(`${apiBaseUrl}/api/donations/?limit=${limit}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        console.log("Response from donations API:", res);
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
    const apiBaseUrl = import.meta.env.VITE_API_BASE; // ✅ moved here too
    try {
      const res = await fetch(`${apiBaseUrl}/api/donations/`, {
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

export const useDonations = () => useContext(DonationsContext);
