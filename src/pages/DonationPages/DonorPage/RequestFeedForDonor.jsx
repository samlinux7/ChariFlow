import DonationCard from "../../../components/DonationCard";
import { useRequests } from "../../../context/RequestsContext";
import { useUserRole } from "../../../context/UserRoleContext";

const RequestFeedForDonor = () => {
  const { requests } = useRequests();
  const { role } = useUserRole();

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
    return null;
  }
};

export default RequestFeedForDonor;
