import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import VerifyRequest from "./pages/VerifyRequest/VerifyRequest";

import HomePage from "./pages/HomePage/HomePage.jsx";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage.jsx";
import Contact from "./pages/ContactPage/Contact.jsx";
import SignUpPage from "./components/SignUpPage.jsx";
import LoginPage from "./components/Login.jsx";
import LayoutWithNav from "./components/LayoutWithNav.jsx";
import RequestDetailPage from "./pages/RequestDetailPage/RequestDetailPage.jsx";
import VolunteerDashboard from "./pages/VolunteerPage/VolunteerPage.jsx";
import ChatPage from "./pages/ChatPage/ChatPage.jsx";
import { RequestsProvider } from "./context/RequestsContext.jsx";
import { UserRoleProvider } from "./context/UserRoleContext.jsx";
import { DonationsProvider } from "./context/DonationsContext.jsx";
import { ChatProvider } from "./context/ChatContext";
import AcceptorPage from "./pages/DonationPages/AcceptorPage/AccpetorPage.jsx";
import DonorPage from "./pages/DonationPages/DonorPage/DonorPage.jsx";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminPage from "./pages/Admin/AdminPage";

function App() {
  return (
    <AuthProvider>
      <UserRoleProvider>
        <RequestsProvider>
          <ChatProvider>
            <DonationsProvider>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/adminpage" element={<AdminPage />} />

                {/* Protected Routes */}
                <Route
                  element={
                    <ProtectedRoute>
                      <LayoutWithNav />
                    </ProtectedRoute>
                  }
                >
                  <Route path="/" element={<HomePage />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/about" element={<AboutUsPage />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/donate" element={<DonorPage />} />
                  <Route path="/accept" element={<AcceptorPage />} />
                  <Route path="/requests/:id" element={<RequestDetailPage />} />
                  <Route path="/verify-request" element={<VerifyRequest />} />
                  <Route path="/volunteer" element={<VolunteerDashboard />} />
                  <Route path="/chat/:requestId" element={<ChatPage />} />
                </Route>

                <Route path="*" element={<div>404 Not Found</div>} />
              </Routes>
            </DonationsProvider>
          </ChatProvider>
        </RequestsProvider>
      </UserRoleProvider>
    </AuthProvider>
  );
}

export default App;
