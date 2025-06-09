import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage.jsx';
import AboutUsPage from './pages/AboutUsPage/AboutUsPage.jsx';
import Contact from './pages/ContactPage/Contact.jsx';
import SuccessStories from './pages/SuccessStoriesPage/SuccessStories.jsx';
import SignUpPage from './components/SignUpPage.jsx';
import LoginPage from './components/Login.jsx';
import LayoutWithNav from './components/LayoutWithNav.jsx';
import DonationPage from './pages/DonorPage/DonorPage.jsx';
import RequestDetailPage from './pages/RequestDetailPage/RequestDetailPage.jsx';

import { RequestsProvider } from './context/RequestsContext.jsx';
import { UserRoleProvider } from './context/UserRoleContext.jsx';
import { DonationsProvider } from './context/DonationsContext.jsx'; // ✅ Added import

function App() {
  return (
    <UserRoleProvider>
      <RequestsProvider>
        <DonationsProvider> {/* ✅ Added wrapper */}
          <Routes>
            <Route element={<LayoutWithNav />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/donate" element={<DonationPage />} />
              <Route path="/requests/:id" element={<RequestDetailPage />} />
            </Route>

            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </DonationsProvider>
      </RequestsProvider>
    </UserRoleProvider>
  );
}

export default App;
