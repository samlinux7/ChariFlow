import React, { createContext, useState, useContext, useEffect } from "react";

const RequestsContext = createContext();

export const RequestsProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true); // Optional: loading indicator
  const [error, setError] = useState(null); // Optional: error tracking

  useEffect(() => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE;
    const fetchRequests = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/requests`);
        const data = await response.json();
        if (response.ok) {
          setRequests(data);
        } else {
          setError(data.message || "Failed to fetch requests");
        }
      } catch (err) {
        console.error("Failed to fetch requests:", err);
        setError("Server error while fetching requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const addRequest = (newRequest) => {
    if (requests.some((req) => req.id === newRequest.id)) {
      console.warn("Request ID already exists:", newRequest.id);
      return false;
    }
    setRequests((prev) => [...prev, newRequest]);
    return true;
  };

  return (
    <RequestsContext.Provider value={{ requests, addRequest, loading, error }}>
      {children}
    </RequestsContext.Provider>
  );
};

// Custom hook
export const useRequests = () => useContext(RequestsContext);
