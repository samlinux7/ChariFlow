import React, { createContext, useContext, useState } from 'react';

const DonationsContext = createContext();

export const useDonations = () => useContext(DonationsContext);

export const DonationsProvider = ({ children }) => {
  const [donations, setDonations] = useState([]);

  const addDonation = (newDonation) => {
    if (donations.some(d => d.id === newDonation.id)) {
      console.warn('Donation ID already exists:', newDonation.id);
      return false;
    }
    setDonations(prev => [...prev, newDonation]);
    return true;
  };

  return (
    <DonationsContext.Provider value={{ donations, addDonation }}>
      {children}
    </DonationsContext.Provider>
  );
};
