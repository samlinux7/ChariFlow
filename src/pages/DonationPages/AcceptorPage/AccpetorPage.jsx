import RequestFeedForAcceptor from "./RequestFeedForAcceptor";
import RequestSomethingElse from "../../../components/AcceptorComponents/ReqestSomethingElseForm";

function AcceptorPage() {
  return (
    <div className="pt-20 bg-gray-50 min-h-screen w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <RequestFeedForAcceptor />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <RequestSomethingElse />
        </div>
      </div>
    </div>
  );
}

export default AcceptorPage;
