import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/requests/assigned-donations?status=pending"
      );
      const requestsWithDetails = await Promise.all(
        res.data.map(async (req) => {
          // Fetch receiver (user) info
          let receiver = null;
          try {
            const userRes = await axios.get(
              `http://localhost:3000/api/user/${req.receiverId}`
            );
            receiver = userRes.data;
          } catch (e) {
            receiver = { name: "Unknown", email: "N/A" };
          }
          // Fetch donation info
          let donation = null;
          try {
            const donationRes = await axios.get(
              `http://localhost:3000/api/donations/${req.donationId}`
            );
            donation = donationRes.data;
          } catch (e) {
            donation = { amount: "N/A", message: "N/A" };
          }
          return { ...req, receiver, donation };
        })
      );
      setRequests(requestsWithDetails);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    try {
      await axios.post("http://localhost:3000/api/requests/accept-request", {
        requestId: id,
      });
      setRequests((prev) => prev.filter((req) => req._id !== id)); // remove from list
    } catch (error) {
      console.error("Accept error:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post("http://localhost:3000/api/requests/reject-request", {
        requestId: id,
      });
      setRequests((prev) => prev.filter((req) => req._id !== id)); // remove from list
    } catch (error) {
      console.error("Reject error:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (requests.length === 0)
    return (
      <div className="text-center mt-10">No assigned donations found.</div>
    );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Assigned Donation Requests
      </h1>
      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request._id}
            className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <p className="text-gray-700">
                <strong>Receiver Name:</strong>{" "}
                {request.receiver?.name || request.receiverId}
              </p>
              <p className="text-gray-700">
                <strong>Receiver Email:</strong>{" "}
                {request.receiver?.email || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>Donation Amount:</strong> Rs.{" "}
                {request.donation?.amount || request.donationId}
              </p>
              <p className="text-gray-700">
                <strong>Donation Message:</strong>{" "}
                {request.donation?.message || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>Donation ID:</strong> {request.donationId}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleAccept(request._id)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Accept
              </button>
              <button
                onClick={() => handleReject(request._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
