import React, { createContext, useState, useContext } from 'react';

const RequestsContext = createContext();

export const RequestsProvider = ({ children }) => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      title: "Need Books for Students",
      city: "Sukkur City",
      desc: "Help provide essential school books for Grade 5 students from low-income families.",
      category: "Education",
      image: "https://images.pexels.com/photos/256517/pexels-photo-256517.jpeg",
      fullDescription: "Our local elementary school is facing a critical shortage of textbooks...",
      goal: 1000,
      raised: 650,
      supporters: 23,
      organizer: "Sarah Johnson",
      organizerRole: "School Principal",
      urgency: "High",
      beneficiaries: "40 Grade 5 students",
      timeline: "Books needed by next month"
    },
    // ... add your other initial requests here ...
  ]);

  const addRequest = (newRequest) => {
    if (requests.some(req => req.id === newRequest.id)) {
      console.warn('Request ID already exists:', newRequest.id);
      return false;
    }
    setRequests(prev => [...prev, newRequest]);
    return true;
  };

  return (
    <RequestsContext.Provider value={{ requests, addRequest }}>
      {children}
    </RequestsContext.Provider>
  );
};

// Custom hook for easy access to RequestsContext
export const useRequests = () => useContext(RequestsContext);
