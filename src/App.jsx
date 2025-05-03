import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import AboutUsPage from './pages/AboutUsPage/AboutUsPage.jsx';
import Contact from './pages/ContactPage/Contact.jsx';
import SuccessStories from './pages/SuccessStoriesPage/SuccessStories.jsx';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/Login';
import LayoutWithNav from './components/LayoutWithNav.jsx';

function App() {
  return (
    <Routes>
      {/* Public/auth routes without navbar */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* Routes wrapped with navbar */}
      <Route element={<LayoutWithNav />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/success-stories" element={<SuccessStories />} />
      </Route>

      {/* Catch-all 404 */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
