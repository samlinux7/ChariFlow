import DonationCard from "./DonationCard";
import { useRequests } from "../context/RequestsContext"; // adjust path as needed
import { useUserRole } from "../context/UserRoleContext";
import DonationForDonorCard from "./DonationForDonorCard";
import { useDonations } from "../context/DonationsContext";
import { useEffect } from "react";

const RequestFeed = () => {
  const { requests } = useRequests();
  const { role } = useUserRole();
  const { donations, fetchDonations } = useDonations();

  // Fetch donations when not donor
  useEffect(() => {
    if (role !== "donor") {
      const authUser = JSON.parse(localStorage.getItem("authUser"));
      const token = authUser?.token;
      fetchDonations(token);
    }
  }, [role, fetchDonations]);

  if (role === "donor") {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {requests.length === 0 ? (
          <p>No requests available.</p>
        ) : (
          requests.map((request) => (
            <DonationCard key={request.id} request={request} />
          ))
        )}
      </div>
    );
  } else {
    // Render DonationForDonorCard for all donations
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {donations.length === 0 ? (
          <p>No donations available.</p>
        ) : (
          donations.map((donation, idx) => (
            <DonationForDonorCard
              key={donation._id || idx}
              donation={donation}
            />
          ))
        )}
      </div>
    );
  }
};

export default RequestFeed;
