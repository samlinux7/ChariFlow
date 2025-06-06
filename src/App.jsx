import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import AboutUsPage from './pages/AboutUsPage/AboutUsPage.jsx';
import Contact from './pages/ContactPage/Contact.jsx';
import SuccessStories from './pages/SuccessStoriesPage/SuccessStories.jsx';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/Login';
import LayoutWithNav from './components/LayoutWithNav.jsx';
import DonationPage from './pages/DonorPage/DonorPage.jsx'; // <-- make sure this exists

function App() {
  return (
    <Routes>
      {/* Temporarily start from HomePage instead of Login */}
      <Route element={<LayoutWithNav />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/success-stories" element={<SuccessStories />} />
        <Route path="/donate" element={<DonationPage />} />
      </Route>

      {/* Auth routes if needed later */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* Catch-all */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
