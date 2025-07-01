import DonationForDonorCard from "../../../components/DonorComponents/DonationForDonorCard";
import { useDonations } from "../../../context/DonationsContext";
import { useEffect } from "react";

const RequestFeedForAcceptor = () => {
  const { donations, fetchDonations } = useDonations();

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const token = authUser?.token;
    fetchDonations(token);
  }, [fetchDonations]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      {donations.length === 0 ? (
        <p>No donations available.</p>
      ) : (
        donations.map((donation, idx) => (
          <DonationForDonorCard key={donation._id || idx} donation={donation} />
        ))
      )}
    </div>
  );
};

export default RequestFeedForAcceptor;
