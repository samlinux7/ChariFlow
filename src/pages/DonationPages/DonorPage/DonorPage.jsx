import RequestFeedForDonor from "./RequestFeedForDonor";
import DonationForm from "../../../components/DonorComponents/DonationForm";
import DonateSomethingElseForm from "../../../components/DonorComponents/DonateSomethingElseForm";

function DonorPage() {
  return (
    <div className="pt-20 bg-gray-50 min-h-screen w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <RequestFeedForDonor />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <DonationForm />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <DonateSomethingElseForm />
        </div>
      </div>
    </div>
  );
}

export default DonorPage;
