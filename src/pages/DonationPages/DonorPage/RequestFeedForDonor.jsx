import DonationCard from "../../../components/DonorComponents/DonationCard";
import { useRequests } from "../../../context/RequestsContext";

const RequestFeedForDonor = () => {
  const { requests } = useRequests();

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
};

export default RequestFeedForDonor;
