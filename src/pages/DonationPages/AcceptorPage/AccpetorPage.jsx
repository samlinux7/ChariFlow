import RequestFeedForAcceptor from "./RequestFeedForAcceptor";
import RequestSomethingElse from "../../../components/AcceptorComponents/ReqestSomethingElseForm";

function AcceptorPage() {
  return (
    <div className="pt-20 bg-gray-50 min-h-screen w-full px-2 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto space-y-12 flex flex-col items-center">
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-6xl flex justify-center">
          <RequestFeedForAcceptor />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-6xl flex justify-center">
          <RequestSomethingElse />
        </div>
      </div>
    </div>
  );
}

export default AcceptorPage;
